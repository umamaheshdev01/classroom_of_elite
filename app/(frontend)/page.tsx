"use client";
import React, { useEffect } from "react";
import { TypewriterEffectSmooth } from "../components/ui/typewriter";
import { BackgroundBeams } from "../components/ui/Beams";
import Link from "next/link";


export default function TypewriterEffectSmoothDemo() {

  useEffect(()=>{
     document.documentElement.classList.add('dark')
  },[])

  const words = [
    {
      text: "Learn",
    },
    {
      text: "Teach",
    },
    {
      text: "Collaborate",
    },
    {
      text: "Level Up!",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
<>



    {/* < div className="h-[100vh] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center"> */}

{/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}

<div className="h-[100vh] w-full r bg-neutral-950 relative flex flex-col items-center justify-center antialized">

    <div className="flex flex-col items-center z-20 justify-center h-[100vh]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        The Next Generation Classroom
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
      <Link href='/auth/signup'>    <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
        Join Now
        </button></Link>
        <Link  href='/auth/login'>    <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
         Sign in
        </button></Link>
      </div>
    </div>

 <BackgroundBeams ></BackgroundBeams>

</div>
    </>
  );
}
