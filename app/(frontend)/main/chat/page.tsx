'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const page = () => {


    const data = useSession()

    console.log(data)

  return (
    <div>

    <button onClick={()=>signOut()}>Logout</button>

    </div>
  )
}

export default page