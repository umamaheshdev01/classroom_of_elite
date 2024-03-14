'use client'
import {useEffect} from 'react'
import { SiteHeader } from '@/components/navbar/navbar'
import { DocsSidebarNav } from "@/components/sidebar.jsx"
import { ScrollArea, ScrollBar } from "@/components/scrollarea"

interface DocsLayoutProps {
  children: React.ReactNode
}

const page = ({ children }: DocsLayoutProps) => {

  return (
    <div vaul-drawer-wrapper="">
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">


   <DocsLayout>
    {children}
   </DocsLayout>


      </main>
    </div>
  </div>
  )
}

export default page




export  function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="border-b">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 ml-4 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-6 lg:py-8">
            <DocsSidebarNav items={sideNav} />

                    
          
    
          </ScrollArea>
          <div className="h-screen border-l border-solid border-gray-450 fixed top-14 left-[17rem]"></div>

        </aside>
        {children}
      </div>
    </div>
  )
}

const sideNav= [
    {
      title: "",
      items: [
        {
          title: "Lectures",
          href: "lecture",
          disabled : false,
          label : '11'
        },
        {
          title : 'Member list',
          href :'/members',
          disabled : false,
          label : '20'
         },
        {
          title: "Leaderboard",
          href: "/leader",
          disabled : false,
          label : '1'
        },
        

      ],
    },
   
  ]