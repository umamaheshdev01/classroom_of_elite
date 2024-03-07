"use client";
import React, { useEffect, useState } from 'react'

function page() {
    const demoUser = {
        name:"saksham",
    }
    const [currUser, setUser] = useState(demoUser);
  return (
    <div className='flex flex-row w-3/4 h-full justify-evenly'>
        <div className='w-1/4'>
            {/* side menu */}
            asggasg
        </div>
        <div className='border border-l-4 w-3/4'>
            {/* chat box */}
            <div className='border-b-4 sticky m-4'>
                {/* <span>{currUser.image}</span> */}
                <span>{currUser.name}</span>
            </div>
        </div>
    </div>
  )
}

export default page