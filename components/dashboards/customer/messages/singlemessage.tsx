/** @format */

"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Camera, Link2 } from "lucide-react";
import CustomButton from "@/components/ui/custom/button";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { useSession } from "next-auth/react";

interface Message {
  id?: string;
  message: string;
  timestamp: string;
  attachment?: string;
  sender?: string;
  content?: string;
  userId?: string;
  pending?: boolean;
}

interface ConversationData {
  userName: string;
  location: string;
  messages: Message[];
}

interface ApiResponse {
  description: string;
  responseBody: ConversationData;
}

interface ApiError {
  message: string;
}

// WebSocket message types
interface WebSocketMessage {
  type:
    | "new_message"
    | "message_delivered"
    | "user_typing"
    | "user_stopped_typing"
    | "error"
    | "connection_established";
  data: any;
  conversationId: string;
}

export default function MessageDetail() {
  const [conversationData, setConversationData] =
    useState<ConversationData | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const params = useParams();
  const reference = params.reference as string;

  const { data: session } = useSession()
  const currentUserId = session?.user?.id

  const { data, isError, error, isLoading } = useFetch<ApiResponse, ApiError>({
    key: ["conversation", reference],
    url: `/user-service/messages/fetch-conversations?request_reference=${reference}`,
  });

  useEffect(() => {
    if (data?.responseBody) {
      setConversationData(data.responseBody);
    }
  }, [data]);

  useEffect(() => {
    if (!reference) return;

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [reference]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationData?.messages]);

  const connectWebSocket = () => {
    const wsUrl = `ws://localhost:3001/chat/${reference}`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);

      ws.send(
        JSON.stringify({
          type: "join_conversation",
          conversationId: reference,
          userId: currentUserId,
        })
      );
    };

    ws.onmessage = (event) => {
      try {
        const wsMessage: WebSocketMessage = JSON.parse(event.data);
        handleWebSocketMessage(wsMessage);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = (event) => {
      console.log("WebSocket disconnected:", event.code, event.reason);
      setIsConnected(false);

      reconnectTimeoutRef.current = setTimeout(() => {
        console.log("Attempting to reconnect...");
        connectWebSocket();
      }, 3000);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      toast({
        title: "Connection Error",
        description:
          "Lost connection to chat server. Attempting to reconnect...",
        variant: "destructive",
      });
    };
  };

  const handleWebSocketMessage = (wsMessage: WebSocketMessage) => {
    switch (wsMessage.type) {
      case "new_message":
        const newMsg: Message = wsMessage.data;
        setConversationData((prev) =>
          prev
            ? {
                ...prev,
                messages: [...prev.messages, newMsg],
              }
            : null
        );
        break;

      case "message_delivered":
        const { messageId } = wsMessage.data;
        setConversationData((prev) =>
          prev
            ? {
                ...prev,
                messages: prev.messages.map((msg) =>
                  msg.id === messageId ? { ...msg, pending: false } : msg
                ),
              }
            : null
        );
        break;

      case "user_typing":
        if (wsMessage.data.userId !== currentUserId) {
          setOtherUserTyping(true);
        }
        break;

      case "user_stopped_typing":
        if (wsMessage.data.userId !== currentUserId) {
          setOtherUserTyping(false);
        }
        break;

      case "error":
        console.error("WebSocket error:", wsMessage.data);
        toast({
          title: "Error",
          description: wsMessage.data.message,
          variant: "destructive",
        });
        break;

      case "connection_established":
        console.log(
          "Connection established for conversation:",
          wsMessage.data.conversationId
        );
        break;

      default:
        console.log("Unknown WebSocket message type:", wsMessage.type);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !wsRef.current || !isConnected || isSending)
      return;

    const messageToSend = newMessage.trim();
    setNewMessage("");
    setIsSending(true);

    // Stop typing indicator
    sendTypingStatus(false);

    const tempMessage: Message = {
      id: `temp_${Date.now()}`,
      message: messageToSend,
      timestamp: new Date().toISOString(),
      sender: currentUserId,
      userId: currentUserId,
      attachment: "",
      pending: true,
    };

    try {
      wsRef.current.send(
        JSON.stringify({
          type: "send_message",
          data: {
            message: messageToSend,
            conversationId: reference,
            userId: currentUserId,
            timestamp: tempMessage.timestamp,
          },
        })
      );

      setConversationData((prev) =>
        prev
          ? {
              ...prev,
              messages: [...prev.messages, tempMessage],
            }
          : null
      );
    } catch (error) {
      console.error("Failed to send message:", error);
      setNewMessage(messageToSend); // Restore message
      toast({
        title: "Message failed",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    // Send typing status
    if (!isTyping) {
      sendTypingStatus(true);
      setIsTyping(true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      sendTypingStatus(false);
      setIsTyping(false);
    }, 1000);
  };

  const sendTypingStatus = (typing: boolean) => {
    if (wsRef.current && isConnected) {
      wsRef.current.send(
        JSON.stringify({
          type: typing ? "start_typing" : "stop_typing",
          data: {
            userId: currentUserId,
            conversationId: reference,
          },
        })
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading conversation...</p>
      </div>
    );
  }

  if (isError || error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error: {error?.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 bg-white flex flex-col">
        {/* Header with connection status */}
        <div className="px-4 py-3 border-b bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={"/newimages/avatar2.png"}
              alt="vendor"
              width={40}
              height={40}
            />
            <div>
              <h3 className="font-medium text-gray-900">
                {conversationData?.userName || "Vendor Chat"}
              </h3>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">
                  {conversationData?.location !== "NA"
                    ? conversationData?.location
                    : "Online"}
                </p>
                <div
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className="text-xs text-gray-400">
                  {isConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-2xl mx-auto">
            {conversationData?.messages &&
            conversationData.messages.length > 0 ? (
              <div className="space-y-4">
                {conversationData.messages.map((message, index) => {
                  const isCurrentUser =
                    message.sender === currentUserId ||
                    message.userId === currentUserId;

                  return (
                    <div
                      key={message.id || index}
                      className={`flex ${
                        isCurrentUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isCurrentUser && (
                        <div className="flex items-start space-x-3">
                          <Image
                            src="/newimages/avatar2.png"
                            alt="Vendor"
                            width={30}
                            height={30}
                          />
                          <div>
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 max-w-xs">
                              <p className="text-sm">
                                {message.content || message.message}
                              </p>
                            </div>
                            {message.timestamp && (
                              <span className="text-xs text-gray-400 mt-1 block">
                                {formatTime(message.timestamp)}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {isCurrentUser && (
                        <div className="flex items-end space-x-2">
                          <div className="bg-kv-primary text-white rounded-2xl py-3 px-4 max-w-xs relative">
                            <p className="text-sm">
                              {message.content || message.message}
                            </p>
                            {message.pending && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full animate-pulse" />
                            )}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-kv-primary overflow-hidden flex-shrink-0">
                            <Image
                              src="/newimages/avater3.png"
                              alt="Customer"
                              className="w-full h-full object-cover"
                              width={30}
                              height={30}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Typing indicator */}
                {otherUserTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <Image
                        src="/newimages/avatar2.png"
                        alt="Vendor"
                        width={30}
                        height={30}
                      />
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Start your conversation...</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t bg-white p-4">
          <div className="flex items-center space-x-3">
            <button type="button" className="text-gray-400 hover:text-gray-600">
              <Camera size={20} />
            </button>
            <button type="button" className="text-gray-400 hover:text-gray-600">
              <Link2 size={20} />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={isConnected ? "Send a Message" : "Connecting..."}
                className="w-full border border-gray-300 rounded-full py-3 px-4 disabled:bg-gray-100"
                disabled={!isConnected || isSending}
              />
            </div>
            <button
              type="button"
              onClick={handleSendMessage}
              className="bg-kv-primary text-white rounded-full p-3 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newMessage.trim() || !isConnected || isSending}
            >
              {isSending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 p-4">
        {/* Vendor Info */}
        {conversationData && (
          <div className="mb-6 p-4 border rounded-3xl">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src={"/newimages/avatar2.png"}
                alt="vendor"
                width={50}
                height={50}
              />
              <div>
                <h3 className="font-medium text-gray-900">
                  {conversationData.userName}
                </h3>
                <p className="text-sm text-gray-500">
                  {conversationData.location !== "NA"
                    ? conversationData.location
                    : "Online"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mb-8 p-4 border rounded-3xl">
          <h4 className="font-semibold text-xl tracking-extra-wide text-primary mb-4">
            Actions
          </h4>
          <p className="text-base font-normal leading-6 tracking-extra-wide text-[#374151] mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna
          </p>

          <div className="space-y-3">
            <CustomButton children="Book Vendor" className="w-full" />
            <CustomButton
              children="Rate Supplier"
              className="bg-[#F3F4F6] hover:bg-[#F3F4F6] hover:text-[#374151] text-[#374151] w-full border "
            />
            <CustomButton
              children="File a Complaint"
              className="bg-[#F3F4F6] hover:bg-[#F3F4F6] hover:text-[#374151] text-[#374151] w-full border "
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-transparent border p-4 rounded-3xl">
          <h4 className="font-medium text-gray-900 mb-3">Disclaimer</h4>
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>
                Phone number, email and any other form of contact sharing isn't
                allowed.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>Only PDFs can be shared.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
