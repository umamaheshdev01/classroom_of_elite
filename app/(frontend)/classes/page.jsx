'use client'
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
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


export default function BentoGridDemo() {
  const [data, setData] = useState(null);
  const [user,setUser] = useState(null)
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false); 
  const [fine,setFine] = useState(false)
  const[naam,setNaam] = useState('')


  useEffect(()=>{
    const email = localStorage.getItem('user');
    const url1 = `http://localhost:3000/api/user/${email}`;
    fetch(url1)
      .then((res) => res.json())
      .then((file) => {
        const dam = file.data[0];
        setUser(dam);

        const url = `http://localhost:3000/api/class?id=${dam.uid}`;
        fetch(url)
          .then((res) => res.json())
          .then((parcel) => setData(parcel.data));
      });
  
  },[])


  const router = useRouter()

  const [code,setCode]=useState('')

  const openJoinModal = () => {
    setIsJoinModalOpen(true);
  };

  const closeJoinModal = () => {
    setIsJoinModalOpen(false);
  };

  const makeRequest = async()=>{

    const url = 'http://localhost:3000/api/class';
    const datap = {
     name: naam ,
     admin: user.uid,
     };

      fetch(url, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(datap),
      })

      setFine(false);
      router.refresh()

  }

  const sendRequest = async()=>{
  

    const url = 'http://localhost:3000/api/member';
    const datap = {
     class: code ,
     user: user.uid,
     };

      fetch(url, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(datap),
      })

      setIsJoinModalOpen(false);

  }


  const updater = (hr)=>{

   localStorage.setItem('class',hr)
   router.push('/class/lecture')

  }

   

  return (


    
    
    <>
    <div className="ml-[220px] mt-4">
    <Button variant="outline" onClick={()=>setFine(true)} className="mr-6 ml-1">Create</Button>
        <Button  onClick={openJoinModal}>Join</Button>

        {isJoinModalOpen && (
          <div className="z-50  fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 flex items-center justify-center">
            <Card className="w-[350px] p-5 bg-black rounded-xl ">
              <CardHeader className="m-2">
                <CardTitle>Join Class</CardTitle>
              </CardHeader>
              <CardContent className="m-2 mt-4 mb-4">
                <form>
                  <div className="grid w-full items-center gap-4 ">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name" className="ml-1">
                        Code
                      </Label>
                      <Input id="name" value={code} onChange={(e)=>setCode(e.target.value)} placeholder="Class Code" />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between m-2">
                <Button variant="outline" onClick={closeJoinModal}>
                  Cancel
                </Button>
                <Button onClick={()=>{sendRequest() }}>Join</Button>
              </CardFooter>
            </Card>
          </div>
        )}


{fine && (
          <div className="z-50 fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 flex items-center justify-center">
            <Card className="w-[350px] p-5 bg-black">
              <CardHeader className="m-2">
                <CardTitle>Create Class</CardTitle>
              </CardHeader>
              <CardContent className="m-2 mt-4 mb-4">
                <form>
                  <div className="grid w-full items-center gap-4 ">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name" className="ml-1">
                        Name
                      </Label>
                      <Input id="name" placeholder="Name of your class" value={naam} onChange={e=>setNaam(e.target.value)} />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between m-2">
                <Button variant="outline" onClick={()=>setFine(false)}>
                  Cancel
                </Button>
                <Button onClick={()=>makeRequest()}>Create</Button>
              </CardFooter>
            </Card>
          </div>
        )}


























     


    </div>

    
    {data && <BentoGrid className="max-w-4xl mx-auto my-4">
    {data.map((item,i) => (
      <BentoGridItem
        key={i}
        title={item.name.name}
        description={item.role == 0? 'Admin':item.role==1? 'Teacher':'Student'}
        header=<Skeleton url={item.name.url} hr={`${item.class}`} cb={updater} />
        icon= <IconTableColumn className="h-4 w-4 text-neutral-500" />
        // className={i === 3 || i === 6 ? "md:col-span-2" : ""}
      />
    ))}
  </BentoGrid>}</>
  );
}
const Skeleton = ({url,hr,cb}) => (
  <div className="cursor-pointer flex flex-1 w-full h-full min-h-[6rem] rounded-xl">
  <a onClick={()=>cb(hr)}>  <img className="rounded w-full" src={url}  alt={""}></img> </a>
  </div>
);