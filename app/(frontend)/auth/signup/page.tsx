'use client'
import React, { useEffect, useState } from 'react'
import { SignupFormDemo } from './Signup'

import { BackgroundBeams } from '../../../components/ui/Beams'
import { LoginFormDemo } from '../login/Login'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Page = () => {
  const router = useRouter()
  const { status } = useSession()
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/main')
    }

    setLoad(true)
  }, [status, router])

  return (
    <div className="h-[100vh] w-full bg-opacity-60 bg-black relative flex flex-col items-center justify-center antialized">
      <div className='w-[50%] z-50'>
        {load && <SignupFormDemo />}
      </div>
      <BackgroundBeams />
    </div>
  )
}

export default Page;
