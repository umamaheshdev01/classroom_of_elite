'use client'
import { cn } from "@/lib/utils";
import React, { use, useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/bento";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import { HoverEffect } from "@/components/cardhover";

const page = () => {

  const[user,setUser] = useState(null)
  const[data,setData] = useState(null)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false); 
  const [fine,setFine] = useState(false)
  const [code,setCode] = useState('')
  const [naam,setNaam] = useState('')
   
  useEffect(()=>{
    const email = localStorage.getItem('user');
    const code = localStorage.getItem('class')
    const url1 = `http://localhost:3000/api/user/${email}`;
    fetch(url1)
      .then((res) => res.json())
      .then((file) => {
        const dam = file.data[0];
        setUser(dam);

        const url = `http://localhost:3000/api/subject?id=${code}`;
        fetch(url)
          .then((res) => res.json())
          .then((parcel) => setData(parcel.data));
      });
  
  },[])







  return (
    <div className='max-w-5xl mx-auto px-8'>
      <br />
      <br />
      <h1 className='text-xl ml-4 mr-3 inline'>Subjects</h1>

      
      
      
    <Button variant="outline"  onClick={()=>setFine(true)} className="mr-6 ml-1">Add</Button>
       

      

{fine && (
          <div className="z-50 fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 flex items-center justify-center">
            <Card className="w-[350px] p-5 bg-black">
              <CardHeader className="m-2">
                <CardTitle>Add subject</CardTitle>
              </CardHeader>
              <CardContent className="m-2 mt-4 mb-4">
                <form>
                  <div className="grid w-full items-center gap-4 ">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name" className="ml-1">
                        Name
                      </Label>
                      <Input id="name" placeholder="Name of the subject" value={naam} onChange={e=>setNaam(e.target.value)} />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between m-2">
                <Button variant="outline" onClick={()=>setFine(false)}>
                  Cancel
                </Button>
                <Button >Add</Button>
              </CardFooter>
            </Card>
          </div>
        )}
    




     {data &&  <HoverEffect items={data} className={undefined} />}
   

    </div>
  )
}

export default page