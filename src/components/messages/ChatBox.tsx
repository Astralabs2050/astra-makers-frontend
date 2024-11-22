import React, { useEffect, useRef } from 'react';
import Message from './Message';

function ChatBox({ messages }: { 
  messages: { 
    message: string; 
    sender: boolean; 
  }[] 
}) {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={chatBoxRef} 
      className="h-[65vh] bg-[#ffffff00] overflow-y-auto"
    >
      {messages.map((message, index) => (
        <Message 
          message={message.message} 
          sender={message.sender} 
          key={index} 
        />
      ))}
    </div>
  );
}

export default ChatBox;
