'use client'
import {useEffect} from 'react'
import { SiteHeader } from '../../components/navbar/Navbar'
import { docsConfig } from "../../config/docs"
import { DocsSidebarNav } from "../../../@/components/sidebar"
import { ScrollArea, ScrollBar } from "../../../@/components/scrollarea"

interface DocsLayoutProps {
  children: React.ReactNode
}


const page = ({ children }: DocsLayoutProps) => {

  return (
    <div vaul-drawer-wrapper="">
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">



       



    {children}







      </main>
    </div>
  </div>
  )
}

export default page








