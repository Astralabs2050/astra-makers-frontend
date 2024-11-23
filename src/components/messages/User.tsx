import React from 'react'

interface USERFUNCTION {
  user: any,
  brandId: any,
  setBrandId: any,
}
function User({user,brandId,setBrandId}: USERFUNCTION) {
    console.log("this is the brand info", user?.id)
  return (
    <div style={{
      border: user?.id === brandId?.id ? '1px solid #eee' : '0px'
    }} onClick={()=>{
      setBrandId(user)
    }} className="mt-[3rem] rounded-lg cursor-pointer ">
    <div className="bg-astraGreyBg rounded-[1rem] py-[1.5rem] px-[2rem] ">
      <div className="flex items-center justify-between ">
        <p className="text-[1.5rem]">{user?.maker?.creator?.fullName || user?.maker?.brand?.username}</p>
        <p className="text-[1.5rem] text-astraTextGrey">2:28PM</p>
      </div>
      <p className="text-[1.5rem] text-black font-bold mt-[.8rem] mb-[1rem]">
       {user?.design?.outfitName}
      </p>
      <p className="text-[1.5rem] text-astraTextGrey">
        {
            user?.description
        }
      </p>
    </div>
  </div>
  )
}

export default User