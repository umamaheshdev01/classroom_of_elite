import React from 'react'


import { BackgroundBeams } from '../../../components/ui/Beams'
import { LoginFormDemo } from '../login/Login'
const page = () => {
  return (

    <div className="h-[100vh] w-full r bg-neutral-950 relative flex flex-col items-center justify-center antialized">
    
    <div className='w-[50%] z-50'>

    {/* <SignupFormDemo ></SignupFormDemo> */}
    <LoginFormDemo></LoginFormDemo>
    </div>
    

    

    <BackgroundBeams ></BackgroundBeams>
      </div>
  )
}

export default page