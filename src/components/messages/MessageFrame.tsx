"use client";

import { paymentIcon, searchIcon } from "@/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Socket } from "@/network/socket";
import ChatBox from "./ChatBox";
import User from "./User";
import { USER_PROFILE } from "@/network/constant";
import ChatControl from "./ChatControl";
import LoaderSvg from "@/shared/LoaderSvg";
import { useQuery } from "@tanstack/react-query";
import { getWalletBalance } from "@/network/messaging";
import { UserP } from "./MessageTypes";
interface Media {
  link: string;
}

interface User {
  media: Media;
}

interface Message {
  message: string;
  senderId: string;
  receiver: User;
  sender: User;
}
export default function MessageFrame() {
  const [isConnected, setIsConnected] = useState(false);
  console.log(isConnected);
  const [messageBox, setMessageBox] = useState("");
  const [chatMessages, setChatMessages] = useState<
    {
      message: string;
      receiverProfile?: string;
      senderProfile?: string;
      sender: boolean;
    }[]
  >([]);
  const [brands, setBrands] = useState<UserP[]>([]);
  const [brandId, setBrandId] = useState<UserP | null>(null);
  const getUserId = () => {
    try {
      const userProfile = window && sessionStorage.getItem(USER_PROFILE);
      return userProfile ? JSON.parse(userProfile)?.id : null;
    } catch (error) {
      console.error("Error parsing USER_PROFILE from sessionStorage:", error);
      return null;
    }
  };

  const userId = getUserId();
  const isCreator = brandId?.user?.id === userId;

  useEffect(() => {
    // Connect to socket instance
    Socket.emit("connection");

    // Check if socket is connected
    Socket.on("connection_status", (data: boolean) => {
      setIsConnected(data);
    });
    //get previous message
    Socket.on("privateMessage", () => {
      console.log("reaching here priveate");
      // Fetch previous messages
      Socket.emit("get_previous_messages", {
        senderId: userId,
        receiverId:
          brandId?.maker?.id === userId ? brandId?.userId : brandId?.maker?.id,
      });
    });
    // Fetch previous messages
    Socket.emit("get_previous_messages", {
      senderId: userId,
      receiverId:
        brandId?.maker?.id === userId ? brandId?.userId : brandId?.maker?.id,
    });

    Socket.on("previous_messages", (data: Message[]) => {
      console.log(" ", data[0]);
      const allMessages = data.map((allMessage) => ({
        message: allMessage?.message,
        sender: allMessage?.senderId === userId,
        receiverProfile: allMessage?.receiver?.media?.link,
        senderProfile: allMessage?.sender?.media?.link,
      }));
      setChatMessages(allMessages);
    });

    // Clean up on component unmount
    return () => {
      Socket.off("connection_status");
      Socket.off("get_brands");
      Socket.off("previous_messages");
    };
  }, [brandId]);

  useEffect(() => {
    Socket.emit("get_brands");

    Socket.on("brands", (data) => {
      console.log("datadata from the brands", data);
      setBrands(data);
    });
  }, []);
  console.log("brandId?.maker?.id", brandId);
  const sendMessage = () => {
    refetch();
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
        receiverId:
          brandId?.maker?.id === userId ? brandId?.userId : brandId?.maker?.id,
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

  const shopperAddress =
    "GDL5LVUDI2GEA765TFFMEHH3KVLR63IE3OCRIJAZM7N3LM6NYADAYKBG";

  // const [balance, setBalance] = useState<string | null>(null);
  // Function to fetch escrow balance
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["balance", shopperAddress],
    queryFn: () => getWalletBalance(shopperAddress),
    // enabled: Boolean(shopperAddress), // Only run query if address exists
    // refetchInterval: 30000, // Refetch every 30 seconds (optional)
  });
  const walletBalance =
    data && !error === true && !("error" in data) ? data.balance : null;

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
          {brands?.map((a, i) => {
            return (
              <User
                key={i}
                user={a}
                brandId={brandId}
                setBrandId={setBrandId}
              />
            );
          })}
        </div>
      </div>
      {brandId && (
        <div className="w-[75%] flex h-[100%] flex-col ">
          <div className="flex items-center justify-between px-[3.2rem] py-[1.6rem] border-b">
            <div className="flex items-center ">
              <Image
                src={
                  isCreator
                    ? brandId?.user?.media[0]?.link
                    : brandId?.maker?.media?.link ?? ""
                }
                alt=""
                width={56}
                height={56}
                className="rounded-full mr-[1.2rem]"
              />
              <div>
                <p className="font-bold text-[1.8rem]">
                  {isCreator
                    ? brandId?.user?.creator?.fullName ||
                      brandId?.user?.brand?.username
                    : brandId?.maker?.creator?.fullName ||
                      brandId?.maker?.brand?.username}
                </p>
                <p className="text-[1.4rem]">
                  {isCreator
                    ? brandId?.user?.creator?.category[0] || "Creator"
                    : brandId?.maker?.creator?.category[0] || "Brand"}
                </p>
              </div>
            </div>
            <div className="flex px-[2rem] py-[1rem] items-center bg-[radial-gradient(44.96%_391.37%_at_49.64%_50%,_#3F37C9_2.67%,_#4361EE_100%)] rounded-full w-[max-content]">
              <Image
                src={paymentIcon}
                alt=""
                width={24}
                height={24}
                className="rounded-full mr-[1.2rem]"
              />
              {isPending ? (
                <LoaderSvg color="#ffffff" />
              ) : (
                <p className="text-[1.8rem] text-white">${walletBalance}</p>
              )}
            </div>
          </div>
          <ChatBox messages={chatMessages} />
          <div className="flex items-center justify-between px-[3rem] py-[1.6rem] border-t">
            <ChatControl
              sendMessage={sendMessage}
              messageBox={messageBox}
              setMessageBox={setMessageBox}
            />
          </div>
        </div>
      )}
    </div>
  );
}
