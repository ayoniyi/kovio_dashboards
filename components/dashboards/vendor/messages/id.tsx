"use client"

import { useState, useEffect } from 'react';
import { ChevronLeft, Send, Paperclip } from 'lucide-react';
import {Camera, Link2 } from 'lucide-react';
import Image from 'next/image';
import CustomButton from '@/components/ui/custom/button';

const fetchChatById = async (id: string | string[]) => {
 
  return {
    id,
    vendorName: "Amazing Catering Service",
    vendorLogo: "/newimages/avater3.png",
    location: "Ikeja, Lagos",
    messages: [
      {
        id: 1,
        sender: "customer",
        content: "Hello, I would like to make enquiries for 200 guest for a wedding.",
        timestamp: "2020-06-01T10:30:00",
        read: true
      },
      {
        id: 2,
        sender: "vendor",
        content: "Hello, I am Karen from Amazing Catering Service",
        timestamp: "2020-06-01T10:35:00",
        read: true
      },
      {
        id: 3,
        sender: "vendor",
        content: "What kind of meals are do you have in mind?",
        timestamp: "2020-06-01T10:40:00",
        read: true
      }
    ]
  };
};

export default function ChatDetail() {
  const [chatData, setChatData] = useState<{
    id: string | string[];
    vendorName: string;
    vendorLogo: string;
    location: string;
    messages: {
      id: number;
      sender: string;
      content: string;
      timestamp: string;
      read: boolean;
    }[];
  } | null>(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    async function loadChatData() {
      try {
        const data = await fetchChatById("1");
        setChatData(data);
      } catch (error) {
        console.error("Failed to load chat:", error);
      }
    }
    loadChatData();
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !chatData) return;
    
    const newMsg = {
      id: chatData.messages.length + 1,
      sender: "customer",
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setChatData({
      ...chatData,
      messages: [...chatData.messages, newMsg]
    });
    
    setNewMessage('');
  };

  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!chatData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading chat...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Chat Section */}
      <div className="flex-1 bg-white flex flex-col">
        {/* Header */}
        <div className="px-4  border-b bg-white flex items-center">
          
          {/* <h1 className="text-lg font-medium text-gray-900">Chat</h1> */}

           {/* Vendor Info */}
          <div className="flex items-center gap-3 mb-4">
           <Image src={'/newimages/avatar2.png'} alt='icon' width={40} height={40}/>
          <div>
          <h3 className="font-medium text-gray-900">{chatData.vendorName}</h3>
          <p className="text-sm text-gray-500">{chatData.location}</p>

          </div>
         
        </div>
        </div>

       

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-2xl mx-auto">
            {/* Conversation Start Notice */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 mb-2">Your conversation with Daniel starts here</p>
              <div className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                {formatDate(chatData.messages[0]?.timestamp)}
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4">
              {chatData.messages.map((message) => {
                const isVendor = message.sender === 'vendor';
                
                return (
                  <div key={message.id} className={`flex ${isVendor ? 'justify-start' : 'justify-end'}`}>
                    {isVendor && (
                      <div className="flex items-start space-x-3">
                        <Image 
                            src="/newimages/avatar2.png" 
                            alt="Customer"
                            width={30}
                            height={30}
                          />
                        <div>
                          <div className="bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 max-w-xs">
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <span className="text-xs text-gray-400 mt-1 block">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {!isVendor && (
                      <div className="flex items-end space-x-2">
                        <div className="bg-kv-primary text-white rounded-2xl py-3 px-4 max-w-xs">
                          <p className="text-sm">{message.content}</p>
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
            </div>
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
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Send a Message"
                className="w-full border border-gray-300 rounded-full py-3 px-4"
              />
            </div>
            <button 
              type="button"
              onClick={handleSendMessage}
              className="bg-kv-primary text-white rounded-full p-3 disabled:opacity-50"
              disabled={!newMessage.trim()}
            >
              <Send className='bg-kv-primary' size={18} />
            </button>
          </div>
        </div>
      </div>



      <div className="w-80">

        {/* Actions */}
        <div className="mb-8 p-4 border rounded-3xl">
          <h4 className="font-semibold text-xl tracking-extra-wide text-primary mb-4">Actions</h4>
          <p className="text-base font-normal leading-6 tracking-extra-wide text-[#374151] mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna
          </p>
          
          <div className="space-y-3">
            <CustomButton children='Book Vendor' className="w-full"/>
   
            <CustomButton children="Rate Supplier" className='bg-[#F3F4F6] hover:bg-[#F3F4F6] hover:text-[#374151] text-[#374151] w-full border '/>            
             
             <CustomButton children="File a Complaint" className='bg-[#F3F4F6] hover:bg-[#F3F4F6] hover:text-[#374151] text-[#374151] w-full border '/>            

          </div>
        </div>

        {/* Disclaimer */}
        <div className='bg-transparent border p-4 rounded-3xl'>
          <h4 className="font-medium text-gray-900 mb-3">Disclaimer</h4>
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <p>Phone number, email and any other form of contact sharing isn't allowed.</p>
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