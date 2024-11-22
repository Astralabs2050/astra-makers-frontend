import React from 'react'

function User({user}:any) {
    console.log("this is the brand info", user)
  return (
    <div className="mt-[3rem]">
    <div className="bg-astraGreyBg rounded-[1rem] py-[1.5rem] px-[2rem] mb-[2rem]">
      <div className="flex items-center justify-between ">
        <p className="text-[1.5rem]">{user?.maker?.email}</p>
        <p className="text-[1.5rem] text-astraTextGrey">2:28PM</p>
      </div>
      <p className="text-[1.5rem] text-black font-bold mt-[.8rem] mb-[1rem]">
        AstroWRLD Summer II
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