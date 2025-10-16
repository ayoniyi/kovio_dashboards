"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft, Send, Paperclip } from "lucide-react";
import CustomButton from "@/components/ui/custom/button";
import Link from "next/link";
import useMutateData from "@/hooks/useMutateData";
import { toast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import Loader from "@/components/ui/custom/loader";
import NoData from "@/components/ui/custom/noAavaialbleData";

interface Message {
  message: string;
  sender: string;
  attachment: string;
  date: string;
}

interface Support {
  reference: string;
  message: string;
  status: string;
  date: string;
  messages: Message[];
}

interface ResponseBody {
  description: string;
  responseBody: Support;
}

interface ApiError {
  message: string;
}

export default function CustomerSupportID() {
  const params = useParams();
  const reference = params.reference as string;
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<string | null>(null);

  const { data, isLoading, isError, error, refetch } = useFetch<
    ResponseBody,
    ApiError
  >({
    key: ["fetch-support-requests"],
    url: `/user-service/support/fetch-support-requests?request_reference=KVS-1758515136335`,
  });

  console.log(data);

  const { mutate, isLoading: isSubmitting } = useMutateData({
    url: `/user-service/support/reply-support-request?request_reference=${reference}`,
    method: "POST",
    onSuccess: (data: any) => {
      toast({
        title: "Success",
        description: "Response submitted successfully!",
      });
      setMessage("");
      setAttachment(null);
      setShowReplyForm(false);
      refetch();
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        title: "Error",
        description: error?.message || "Failed to submit response.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-red-500 p-4">
        {error?.message || "Sorry an error occurred"}
      </div>
    );
  }

  if (!data?.responseBody) {
    return <NoData />;
  }

  const handleSendReply = () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message before sending",
        variant: "destructive",
      });
      return;
    }

    const requestBody = {
      message: message.trim(),
      ...(attachment && { attachment: attachment }),
    };

    mutate(requestBody);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAttachment(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const ticketData = data?.responseBody;

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl text-kv-venue-header font-semibold mb-6 tracking-extra-wide text-gray-800">
        Ticket Details
      </h1>
      {ticketData && (
        <>
          <div>{ticketData.date}kk</div>
          <br />
          <div>{ticketData.message}</div>
          <br />
          <div>{ticketData.reference}</div>
          <br />
          <div>{ticketData.status}</div>
        </>
      )}
      {/* <div className="flex justify-between items-center mb-4">
        <div>
          <Link 
            href={'/customer/support'} 
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft size={20} className="mr-1" />
            <span className="text-sm font-medium">Go back</span>
          </Link>
        </div>

        <div>
          <CustomButton 
            className="px-4 py-2 text-white"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            Reply
          </CustomButton>
        </div>
      </div>

      {/* Ticket Information */}
      {/* <div className='border rounded-lg mt-4 p-4'>
        <div className="flex justify-between items-center mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            ticketData.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
            ticketData.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
            ticketData.status === 'CANCEL' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {ticketData.status}
          </span>
          <span className="text-sm text-gray-600">
            Ref: {ticketData.reference}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          Created: {new Date(ticketData.date).toLocaleString()}
        </p>
        <p className="text-sm text-gray-800">
          {ticketData.message}
        </p>
      </div>

      {/* Messages */}
      {/* <div className='border rounded-lg mt-4 p-4'>
        <h3 className="text-lg font-medium mb-4">Messages</h3>
        {ticketData.messages && ticketData.messages.length > 0 ? (
          <div className="space-y-4">
            {ticketData.messages.map((msg, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-gray-800">{msg.sender}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(msg.date).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{msg.message}</p>
                {msg.attachment && msg.attachment !== "string" && (
                  <div className="text-sm text-blue-600">
                    📎 Attachment included
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center text-gray-500'>
            No messages yet.
          </div>
        )}
      </div> */}

      {/* Reply Form Modal */}
      {/* {showReplyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md relative">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Reply Support Ticket</h2>
              <button
                onClick={() => setShowReplyForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div> */}

      {/* <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your reply..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-kv-primary focus:border-kv-primary resize-none"
                  rows={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachment (Optional)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                  >
                    <Paperclip size={16} className="mr-2" />
                    Choose File
                  </label>
                  {attachment && (
                    <span className="text-sm text-green-600">File attached</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <CustomButton
                onClick={() => setShowReplyForm(false)}
                className="text-gray-600 hover:text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </CustomButton>
              <CustomButton
                onClick={handleSendReply}
                disabled={isSubmitting || !message.trim()}
                className="flex items-center"
              >
                {isSubmitting && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                )}
                {isSubmitting ? 'Sending...' : 'Send Reply'}
              </CustomButton>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
