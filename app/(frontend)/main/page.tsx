'use client'
import {useEffect} from 'react'
import { SiteHeader } from '../../components/navbar/Navbar'

const page = () => {

    useEffect(()=>{
        document.documentElement.classList.add('dark')
     },[])

  return (
    <SiteHeader></SiteHeader>
  )
}

export default page