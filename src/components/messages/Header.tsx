import { paymentIcon, profilePicture } from '@/image'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className="flex items-center justify-between px-[3.2rem] py-[1.6rem] border-b">
    <div className="flex items-center ">
      <Image
        src={profilePicture}
        alt=""
        width={56}
        height={56}
        className="rounded-full mr-[1.2rem]"
      />
      <div>
        <p className="font-bold text-[1.8rem]">Takehiro Tomiyasu</p>
        <p className="text-[1.4rem]">3D Artist, Designer</p>
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
      <p className="text-[1.8rem] text-white">$500</p>
    </div>
  </div>
  )
}

export default Header