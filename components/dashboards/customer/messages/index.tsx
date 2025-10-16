"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/shadcn/card";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import NoData from "@/components/ui/custom/noAavaialbleData";
import { MessageSkeleton } from "@/components/ui/custom/DashboardsSkeleton";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface Message {
  id?: string;
  message: string;
  timestamp: string;
  attachment: string;
  senderImageUrl: string;
  sender?: string;
  userId?: string;
}

interface Conversation {
  reference: string;
  userName: string;
  messages: Message[];
  unreadCount?: number;
  lastActivity?: string;
  isOnline?: boolean;
}

interface ApiResponse {
  description: string;
  responseBody: Conversation[];
}

interface ApiError {
  message: string;
}

interface WebSocketMessage {
  type:
    | "conversation_updated"
    | "new_conversation"
    | "user_online"
    | "user_offline"
    | "typing_status";
  data: any;
  conversationId?: string;
}

export default function CustomerMessages() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isWsConnected, setIsWsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());

  const messagesPerPage = 10;
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const { data: session } = useSession();

  const currentUserId = session?.user?.id;

  const { data, isError, error, isLoading, refetch } = useFetch<
    ApiResponse,
    ApiError
  >({
    key: ["customerMessages"],
    url: "/user-service/messages/fetch-conversations",
  });

  useEffect(() => {
    if (data?.responseBody) {
      setConversations(data.responseBody);
    }
  }, [data]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  const connectWebSocket = () => {
    // Replace with your WebSocket server URL for general chat updates
    const wsUrl = `ws://localhost:3001/chat-list/${currentUserId}`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Chat list WebSocket connected");
      setIsWsConnected(true);

      ws.send(
        JSON.stringify({
          type: "authenticate",
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
      console.log("Chat list WebSocket disconnected:", event.code);
      setIsWsConnected(false);

      // Attempt to reconnect after 3 seconds
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log("Attempting to reconnect chat list WebSocket...");
        connectWebSocket();
      }, 3000);
    };

    ws.onerror = (error) => {
      console.error("Chat list WebSocket error:", error);
    };
  };

  const handleWebSocketMessage = (wsMessage: WebSocketMessage) => {
    switch (wsMessage.type) {
      case "conversation_updated":
        // Update existing conversation with new message
        const { conversationId, newMessage, unreadCount } = wsMessage.data;
        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.reference === conversationId) {
              return {
                ...conv,
                messages: [...conv.messages, newMessage],
                unreadCount: unreadCount || (conv.unreadCount || 0) + 1,
                lastActivity: newMessage.timestamp,
              };
            }
            return conv;
          })
        );

        // Sort conversations by last activity (most recent first)
        setConversations((prev) =>
          [...prev].sort(
            (a, b) =>
              new Date(
                b.lastActivity ||
                  b.messages[b.messages.length - 1]?.timestamp ||
                  0
              ).getTime() -
              new Date(
                a.lastActivity ||
                  a.messages[a.messages.length - 1]?.timestamp ||
                  0
              ).getTime()
          )
        );
        break;

      case "new_conversation":
        // Add new conversation to the list
        const newConv = wsMessage.data;
        setConversations((prev) => [newConv, ...prev]);
        break;

      case "user_online":
        // Update user online status
        const { userId: onlineUserId } = wsMessage.data;
        setConversations((prev) =>
          prev.map((conv) =>
            conv.userName === onlineUserId ? { ...conv, isOnline: true } : conv
          )
        );
        break;

      case "user_offline":
        // Update user offline status
        const { userId: offlineUserId } = wsMessage.data;
        setConversations((prev) =>
          prev.map((conv) =>
            conv.userName === offlineUserId
              ? { ...conv, isOnline: false }
              : conv
          )
        );
        break;

      case "typing_status":
        // Handle typing indicators
        const {
          conversationId: typingConvId,
          userId: typingUserId,
          isTyping,
        } = wsMessage.data;
        if (isTyping) {
          setTypingUsers((prev) =>
            new Set(prev).add(`${typingConvId}-${typingUserId}`)
          );
        } else {
          setTypingUsers((prev) => {
            const newSet = new Set(prev);
            newSet.delete(`${typingConvId}-${typingUserId}`);
            return newSet;
          });
        }
        break;

      default:
        console.log("Unknown WebSocket message type:", wsMessage.type);
    }
  };

  // Mark conversation as read when user clicks on it
  const markAsRead = async (conversationId: string) => {
    // Update local state immediately
    setConversations((prev) =>
      prev.map((conv) =>
        conv.reference === conversationId ? { ...conv, unreadCount: 0 } : conv
      )
    );

    // Send read status to server
    if (wsRef.current && isWsConnected) {
      wsRef.current.send(
        JSON.stringify({
          type: "mark_as_read",
          data: { conversationId, userId: currentUserId },
        })
      );
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full mx-auto rounded-3xl shadow-sm">
        <div className="px-5 py-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-base lg:text-xl font-semibold tracking-extra-wide text-kv-semi-black">
              All Messages
            </h2>
            <div
              className={`w-2 h-2 rounded-full ${
                isWsConnected ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>
        </div>
        <div>
          {Array.from({ length: 5 }).map((_, index) => (
            <MessageSkeleton key={index} />
          ))}
        </div>

        <div className="px-4 py-4 bg-gray-50 flex items-center justify-center space-x-1">
          <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </Card>
    );
  }

  if (isError || error) {
    return (
      <Card className="w-full mx-auto rounded-3xl shadow-sm">
        <div className="px-5 py-4 border-b">
          <h2 className="text-base lg:text-xl font-semibold tracking-extra-wide text-kv-semi-black">
            All Messages
          </h2>
        </div>
        <div className="p-5">
          <p className="text-red-600">{error?.message}</p>
          <button
            onClick={() => refetch()}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </Card>
    );
  }

  if (!conversations || conversations.length === 0) {
    return (
      <Card className="w-full mx-auto rounded-3xl shadow-sm">
        <div className="px-5 py-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-base lg:text-xl font-semibold tracking-extra-wide text-kv-semi-black">
              All Messages
            </h2>
            <div
              className={`w-2 h-2 rounded-full ${
                isWsConnected ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>
        </div>
        <NoData />
      </Card>
    );
  }

  const totalPages = Math.ceil(conversations.length / messagesPerPage);

  const currentConversations = conversations.slice(
    (currentPage - 1) * messagesPerPage,
    currentPage * messagesPerPage
  );

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pageNumbers.push("...");
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (end < totalPages - 1) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const navigateToChat = (reference: string) => {
    markAsRead(reference);
    router.push(`/customer/messages/${reference}`);
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const getLatestMessagePreview = (conversation: Conversation) => {
    if (conversation.messages.length === 0) return "No messages yet";

    // Check if someone is typing
    const isTyping = typingUsers.has(
      `${conversation.reference}-${conversation.userName}`
    );
    if (isTyping) return "Typing...";

    const latestMessage =
      conversation.messages[conversation.messages.length - 1];
    return latestMessage.message.length > 30
      ? `${latestMessage.message.substring(0, 30)}...`
      : latestMessage.message;
  };

  const getLatestTimestamp = (messages: Message[]) => {
    if (messages.length === 0) return "";
    return messages[messages.length - 1].timestamp;
  };

  return (
    <Card className="w-full mx-auto rounded-3xl shadow-sm">
      <div className="px-5 py-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-base lg:text-xl font-semibold tracking-extra-wide text-kv-semi-black">
            All
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {isWsConnected ? "Connected" : "Connecting..."}
            </span>
            <div
              className={`w-2 h-2 rounded-full ${
                isWsConnected ? "bg-green-500" : "bg-yellow-400 animate-pulse"
              }`}
            />
          </div>
        </div>
      </div>

      <div>
        {currentConversations.map((conversation, index) => {
          const isTyping = typingUsers.has(
            `${conversation.reference}-${conversation.userName}`
          );
          const hasUnread = (conversation.unreadCount || 0) > 0;

          return (
            <div
              key={conversation.reference}
              onClick={() => navigateToChat(conversation.reference)}
              className={`px-5 py-3 flex items-center hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors ${
                hasUnread ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex-shrink-0 mr-3 relative">
                <Image
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    conversation.userName
                  )}&background=6366f1&color=fff&size=40`}
                  alt={conversation.userName}
                  width={40}
                  height={40}
                  className="h-10 w-10 text-sm rounded-full object-cover"
                />
                {conversation.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p
                    className={`font-medium text-sm truncate ${
                      hasUnread
                        ? "text-gray-900 font-semibold"
                        : "text-gray-900"
                    }`}
                  >
                    {conversation.userName}
                  </p>
                  {conversation.isOnline && (
                    <span className="text-xs text-green-600">Online</span>
                  )}
                </div>
                <p
                  className={`text-xs truncate mt-1 ${
                    isTyping
                      ? "text-blue-600 italic"
                      : hasUnread
                      ? "text-gray-700 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {getLatestMessagePreview(conversation)}
                </p>
              </div>

              <div className="flex flex-col items-end ml-3">
                <span className="text-xs text-gray-500">
                  {conversation.messages.length > 0
                    ? formatTimeAgo(getLatestTimestamp(conversation.messages))
                    : ""}
                </span>
                {hasUnread && (
                  <span className="mt-1 flex items-center justify-center h-5 w-5 rounded-full bg-blue-500 text-white text-xs font-medium">
                    {conversation.unreadCount! > 99
                      ? "99+"
                      : conversation.unreadCount}
                  </span>
                )}
                {!hasUnread && conversation.messages.length > 0 && (
                  <span className="mt-1 flex items-center justify-center h-5 w-5 rounded-full bg-gray-200 text-gray-600 text-xs">
                    {conversation.messages.length > 99
                      ? "99+"
                      : conversation.messages.length}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* {totalPages > 1 && ( */}
      <div className="px-5 py-4 bg-gray-50 flex items-center justify-center space-x-1">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="p-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </button>

        {getPageNumbers().map((number, index) =>
          number === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={`page-${number}`}
              onClick={() => setCurrentPage(Number(number))}
              aria-label={`Page ${number}`}
              aria-current={currentPage === number ? "page" : undefined}
              className={`h-8 w-8 rounded-md flex items-center justify-center text-sm ${
                currentPage === number
                  ? "bg-gray-800 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {number}
            </button>
          )
        )}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="p-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      {/* )} */}
    </Card>
  );
}
