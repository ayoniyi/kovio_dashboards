
'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/shadcn/card';
import { useRouter } from "next/navigation";

interface Message {
  id: number;
  senderName: string;
  preview: string;
  timeAgo: string;
  unreadCount: number;
  avatar: string;
}

export default function VendorMessages() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 10;
  
  const allMessages: Message[] = [
    {
      id: 1,
      senderName: "Amazing Catering Service",
      preview: "What kind of meals are you...",
      timeAgo: "3 Mins",
      unreadCount: 3,
      avatar: "/newimages/avater3.png"
    },
    {
      id: 2,
      senderName: "Gusto",
      preview: "What kind of meals are you...",
      timeAgo: "3 Mins",
      unreadCount: 5,
      avatar: "/newimages/avatar2.png"
    },
    {
      id: 3,
      senderName: "Sam Photos",
      preview: "What kind of meals are you...",
      timeAgo: "3 Mins",
      unreadCount: 3,
      avatar: "/newimages/avatar2.png"
    },
    {
      id: 4,
      senderName: "Pillars Event Center",
      preview: "What kind of meals are you...",
      timeAgo: "3 Mins",
      unreadCount: 3,
      avatar: "/newimages/avater3.png"
    },
    {
      id: 5,
      senderName: "Pillars Event Center",
      preview: "What kind of meals are you...",
      timeAgo: "3 Mins",
      unreadCount: 5,
      avatar: "/newimages/avatar2.png"
    },
    {
      id: 6,
      senderName: "Pillars Event Center",
      preview: "What kind of meals are you...",
      timeAgo: "3 Mins",
      unreadCount: 3,
      avatar: "/newimages/avater3.png"
    },
    {
      id: 7,
      senderName: "Pillars Event Center",
      preview: "What kind of meals are you...",
      timeAgo: "3 Mins",
      unreadCount: 3,
      avatar: "/newimages/avatar2.png"
    },
    {
      id: 8,
      senderName: "Pillars Event Center",
      preview: "What kind of meals are you...",
      timeAgo: "3 Mins",
      unreadCount: 5,
      avatar: "/newimages/avater3.png"
    },
    {
      id: 9,
      senderName: "Amazing Catering Service",
      preview: "What kind of meals are you...",
      timeAgo: "3 Mins",
      unreadCount: 3,
      avatar: "/newimages/avatar2.png"
    },
    {
      id: 10,
      senderName: "Gusto",
      preview: "What kind of meals are you...",
      timeAgo: "3 Mins",
      unreadCount: 5,
      avatar: "/newimages/avater3.png"
    },
    {
      id: 11,
      senderName: "Sam Photos",
      preview: "What kind of meals are you...",
      timeAgo: "3 Mins",
      unreadCount: 3,
      avatar: "/newimages/avatar2.png"
    },
    {
      id: 12,
      senderName: "Pillars Event Center",
      preview: "What kind of meals are you...",
      timeAgo: "3 Mins",
      unreadCount: 3,
      avatar: "/newimages/avater3.png"
    },
    {
      id: 13,
      senderName: "Pillars Event Center",
      preview: "What kind of meals are you...",
      timeAgo: "3 Mins",
      unreadCount: 5,
      avatar: "/newimages/avatar2.png"
    },
    {
      id: 14,
      senderName: "Pillars Event Center",
      preview: "What kind of meals are you...",
      timeAgo: "3 Mins",
      unreadCount: 3,
      avatar: "/newimages/avatar2.png"
    },
    {
      id: 15,
      senderName: "Pillars Event Center",
      preview: "What kind of meals are you...",
      timeAgo: "3 Mins",
      unreadCount: 3,
      avatar: "/newimages/avatar2.png"
    },
    {
      id: 16,
      senderName: "Pillars Event Center",
      preview: "What kind of meals are you...",
      timeAgo: "3 Mins",
      unreadCount: 5,
      avatar: "/newimages/avater3.png"
    },
  ];
  
  const totalPages = Math.ceil(allMessages.length / messagesPerPage);
  
  const currentMessages = allMessages.slice(
    (currentPage - 1) * messagesPerPage,
    currentPage * messagesPerPage
  );
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max to show, display all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate start and end of page numbers to show
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if at start or end
      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pageNumbers.push('...');
      }
      
      // Add page numbers
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always include last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };


  const navigateToChat = (messageId: string | number) => {
    router.push(`/vendor/messages/${messageId}`);
  };

  return (
    <Card className="w-full mx-auto rounded-3xl shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 border-b">
        <h2 className="text-base lg:text-xl font-semibold tracking-extra-wide text-kv-semi-black">All Messages</h2>
      </div>
      
      {/* Message List */}
      <div>
        {currentMessages.map(message => (
          <div 
            key={message.id} 
            onClick={() => navigateToChat(message.id)}

            className="px-5 py-3 flex items-center hover:bg-gray-50 cursor-pointer border-b border-gray-50"
          >
            {/* Avatar */}
            <div className="flex-shrink-0 mr-3">
              <img 
                src={message.avatar} 
                alt={message.senderName} 
                className="h-10 w-10 rounded-full object-cover" 
              />
            </div>
            
            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-gray-900 truncate">{message.senderName}</p>
              <p className="text-xs text-gray-500 truncate mt-1">{message.preview}</p>
            </div>
            
            {/* Time and Notification */}
            <div className="flex flex-col items-end ml-3">
              <span className="text-xs text-gray-500">{message.timeAgo}</span>
              <span className="mt-1 flex items-center justify-center h-6 w-6 rounded-full bg-red-500 text-white text-xs font-medium">
                {message.unreadCount}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="px-5 py-4 bg-gray-50 flex items-center justify-center space-x-1">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="p-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </button>
        
        {getPageNumbers().map((number, index) => (
          number === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
          ) : (
            <button
              key={`page-${number}`}
              onClick={() => setCurrentPage(Number(number))}
              aria-label={`Page ${number}`}
              aria-current={currentPage === number ? 'page' : undefined}
              className={`h-8 w-8 rounded-md flex items-center justify-center text-sm ${
                currentPage === number 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {number}
            </button>
          )
        ))}
        
        <button 
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="p-1 rounded-md hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </Card>
  );
}
  