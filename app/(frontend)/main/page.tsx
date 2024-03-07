'use client'
import { cn } from "../../components/ui/cn";
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "../../components/bento";
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

export default function BentoGridDemo() {
  const [data, setData] = useState(null);
  const { data: sessionData, status: sessionStatus } = useSession();

  useEffect(() => {

    const fetchClassData = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/api/class?id=${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const fetchedData = await response.json();
        setData(fetchedData.data);
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };

    if (sessionStatus === 'authenticated') {
      const id = sessionData?.user?.email;
      if (id) {
        fetchClassData(id);
      }
    }
  }, [sessionData, sessionStatus]);

  return (


    
    
    <>
    <div className="ml-[220px] mt-4">
    <button className="relative inline-flex mr-5 h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          Create
        </span>
      </button>
      <button className="relative  inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute pl-4 pr-4 inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          Join
        </span>
      </button>
    </div>
    {data && <BentoGrid className="max-w-4xl mx-auto my-4">
    {data.map((item,i) => (
      <BentoGridItem
        key={i}
        title={item.name.name}
        description={item.role == 0? 'Admin':item.role==1? 'Teacher':'Student'}
        header=<Skeleton url={item.name.url} hr={`class/${item.class}`} />
        icon= <IconTableColumn className="h-4 w-4 text-neutral-500" />
        // className={i === 3 || i === 6 ? "md:col-span-2" : ""}
      />
    ))}
  </BentoGrid>}</>
  );
}
const Skeleton = ({url,hr}) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl">
  <Link href={hr}>  <img className="rounded w-full" src={url}  alt={""}></img> </Link>
  </div>
);
