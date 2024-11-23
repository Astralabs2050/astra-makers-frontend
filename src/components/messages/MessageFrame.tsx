"use client";

import {
  paperClipIcon,
  paymentIcon,
  profilePicture,
  searchIcon,
} from "@/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Socket } from "@/network/socket";
import Header from "./Header";
import ChatControl from "./ChatControl";
import ChatBox from "./ChatBox";
import User from "./User";
import { USER_PROFILE } from "@/network/constant";

export default function MessageFrame() {
  const [isConnected, setIsConnected] = useState(false);
  const [messageBox, setMessageBox] = useState("");
  const [chatMessages, setChatMessages] = useState<
    {
      message: string,
      sender: boolean, 
      receiverProfile?: string | null,
      senderProfile?: string | null
    }[]
  >([]);
  const [brands, setBrands] = useState([])
  const [brandId, setBrandId] = useState(null)
  const getUserId = () => {
    try {
        const userProfile = window && sessionStorage.getItem('USER_PROFILE');
        return userProfile ? JSON.parse(userProfile)?.id : null;
    } catch (error) {
        console.error("Error parsing USER_PROFILE from sessionStorage:", error);
        return null;
    }
};

const userId = getUserId();

  useEffect(() => {
    // Connect to socket instance
    Socket.emit("connection");

    // Check if socket is connected
    Socket.on("connection_status", (data: boolean) => {
      setIsConnected(data);
    });
    //get previous message 
    Socket.on("privateMessage",(data)=>{
      console.log("reaching here priveate")
        // Fetch previous messages
      Socket.emit("get_previous_messages", {
      senderId: userId,
      receiverId: brandId?.maker?.id === userId ? brandId?.userId : brandId?.maker?.id,
    });
    })
    // Fetch previous messages
    Socket.emit("get_previous_messages", {
      senderId: userId,
      receiverId: brandId?.maker?.id === userId ? brandId?.userId : brandId?.maker?.id,
    });

    Socket.on("previous_messages", (data: any) => {
      console.log(" ",data[0])
      const allMessages = data.map((allMessage: any) => ({
        message: allMessage?.message,
        sender: allMessage?.senderId === userId,
        receiverProfile: allMessage?.receiver?.media[0]?.link || allMessage?.receiver?.media?.link,
        senderProfile: allMessage?.sender?.media[0]?.link || allMessage?.sender?.media?.link
      }));
      setChatMessages(allMessages);
    });

    

    // Clean up on component unmount
    return () => {
      Socket.off("connection_status");
      Socket.off("get_brands")
      Socket.off("previous_messages");
    };
  }, [brandId]);


useEffect(()=>{
  Socket.emit("get_brands")

  Socket.on("brands",(data:any)=>{
    console.log("datadata from the brands",data)
    setBrands(data)
  })
},[])
console.log("brandId?.maker?.id",brandId)
  const sendMessage = () => {
    const tempMessage = {
      message: messageBox,
      sender: true, // Assume the current user is the sender
    };

    // Optimistically update the UI
    setChatMessages((prevMessages) => [...prevMessages, tempMessage]);

    // Clear the input box
    setMessageBox("");

    // Emit the message to the server
    Socket.emit(
      "privateMessage",
      {
        receiverId: brandId?.maker?.id === userId ? brandId?.userId : brandId?.maker?.id,
        senderId: userId,
        createdAt: Date.now(),
        type: "text",
        message: tempMessage.message,
      },
      (response: { success: boolean; error?: string }) => {
        if (!response.success) {
          // Revert the optimistic update if the message fails to send
          setChatMessages((prevMessages) =>
            prevMessages.filter((msg) => msg !== tempMessage)
          );
          console.error("Failed to send message:", response.error);
        }
      }
    );
  };

  return (
    <div className="flex w-[100%] bg-white">
      <div className="w-[25%] px-[2rem] py-[4rem] border-r">
        <div className="px-[2rem] py-[1.6rem] rounded-full border flex items-center justify-between w-[100%]">
          <input
            placeholder="Search Messages"
            className="text-[1.6rem] bg-transparent outline-none"
          />
          <Image src={searchIcon} alt="" width={24} height={24} />
        </div>

      <div className="h-[80vh] mt-2 overflow-y-auto">
       {
        brands?.map((a,i)=>{
          return  <User user={a} brandId={brandId} setBrandId={setBrandId}/>
        })
       
       }
      </div>
      </div>
      {brandId && <div className="w-[75%] flex h-[100%] flex-col ">
        <Header brandId={brandId}/>
        <ChatBox messages={chatMessages} />
        <ChatControl
          sendMessage={sendMessage}
          messageBox={messageBox}
          setMessageBox={setMessageBox}
        />
      </div>}
    </div>
  );
}
