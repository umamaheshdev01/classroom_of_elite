'use client'
import { useEffect, useState } from 'react';
import Board from './board';
export default function App() {
   
    const [data,setData] = useState(null)

    useEffect(()=>{
        
        const code = localStorage.getItem('class')
      
        fetch(`http://localhost:3000/api/member?id=${code}`)
        .then(res=>res.json()).then(data=>{
            const k =data.data
            // const arr = k.filter((item)=>item.role==0)
         const arr = k
        setData(arr)
        })

 
        

    })



  return (
    <div>
     {data && <Board users={data} />}
    </div>
  );
}
