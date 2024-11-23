import { paperClipIcon } from '@/image'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useState } from 'react'

function ChatControl({messageBox,setMessageBox,  sendMessage}:{
    messageBox:string,
    setMessageBox:Dispatch<SetStateAction<string>>,
    sendMessage:() => void

}) {
   
    
    //handle message
    const handleMessage = (e:any)=>{
        setMessageBox(e.target.value)
    }
  return (
    <div className="flex items-center gap-x-[2rem] px-[1rem] py-[2rem] ">
          <div>
            <Image src={paperClipIcon} alt="" width={24} height={24} />
          </div>
          <div className="px-[2rem] py-[1.6rem] gap-[5px] rounded-[1rem] bg-astraGreyBg flex items-center justify-between w-[100%]">
            <textarea
              value={messageBox}
              onChange={handleMessage}
              placeholder="Type a message..."
              className="text-[1.4rem] bg-transparent outline-none w-[100%]"
            />
            {messageBox.length > 0 ?  <button onClick={()=>{
                sendMessage()
            }} className="border  w-[200px] rounded-full text-[1.4rem] py-[1.5rem] px-[1.2rem] border-black min-w-[max-content]">
              Send
            </button>  :  <button className="border w-[200px] rounded-full text-[1.4rem] py-[1.5rem] px-[1.2rem] border-black min-w-[max-content]">
              Milestone Completed
            </button>
               }
          </div>
        </div>
  )
}

export default ChatControl