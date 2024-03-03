import React from 'react'

const Bckground = ({children}) => {
  return (
    <div className="h-[100vh]  w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2]  flex items-center justify-center">
    {children}
<div className="fixed pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
</div>
  )
}

export default Bckground