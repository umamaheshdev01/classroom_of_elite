'use client'
import React, { use, useEffect, useState } from 'react'
import { HoverEffect } from "./hover";
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

const page = () => {

    const[project,setProjects]= useState([])
    const { data: sessionData, status: sessionStatus } = useSession();

    const {code} = useParams()


    useEffect(() => {

        const fetchClassData = async () => {
          try {
            const response = await fetch(`http://localhost:3000/api/subject?id=${code}`);
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const fetchedData = await response.json();
            setProjects(fetchedData.data);
          } catch (error) {
            console.error('Error fetching class data:', error);
          }
        };
    
        if (sessionStatus === 'authenticated') {
          const id = sessionData?.user?.email;
          if (id) {
            fetchClassData();
          }
        }
      }, [sessionData, sessionStatus]);
   




  return (
    
    <div className="max-w-5xl mx-auto px-8">
      { project &&  <p className='text-3xl text-bold  mt-6 ml-5'>Subjects</p>}
        
  {  project &&  <HoverEffect items={project} />}
    </div>
    
  )
}

export default page





