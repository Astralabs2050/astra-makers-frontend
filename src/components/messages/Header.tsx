import { paymentIcon, profilePicture } from '@/image'
import Image from 'next/image'
import React from 'react'

function Header({brandId}:any) {
  console.log("brandId from header",brandId?.maker?.media[0])
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
const isCreator = brandId?.user?.id === userId 
  return (
    <div className="flex items-center justify-between px-[3.2rem] py-[1.6rem] border-b">
    <div className="flex items-center ">
      <Image
        src={isCreator ? brandId?.user?.media[0]?.link :  brandId?.maker?.media[0]?.link || brandId?.maker?.media?.link}
        alt=""
        width={56}
        height={56}
        className="rounded-full mr-[1.2rem]"
      />
      <div>
        <p className="font-bold text-[1.8rem]">{isCreator ?brandId?.user?.creator?.fullName || brandId?.user?.brand?.username :
        brandId?.maker?.creator?.fullName || brandId?.maker?.brand?.username
        }</p>
        <p className="text-[1.4rem]">{isCreator ? brandId?.user?.creator?.category[0] || "Creator" :  brandId?.maker?.creator?.category[0] || "Brand" }</p>
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