'use client'
import React, { useEffect, useState } from 'react'
import LectureCard from '@/components/lecture'

const page = () => {

  const [data,setData] = useState(null)
  
  useEffect(()=>{
    const code = localStorage.getItem('lecture')
    fetch(`http://localhost:3000/api/post/?id=${code}`)
    .then(res=>res.json()).then(data=>setData(data.data))
  })
  
  return (
    <div>
      {
        data && data.map((k)=>{
          return(<div className='m-5'> <LectureCard item={k}></LectureCard></div>)
        })
      }
        
    </div>
  )
}

export default page