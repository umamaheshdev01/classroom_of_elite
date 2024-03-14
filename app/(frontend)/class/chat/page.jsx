import Link from "next/link"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/component/vercel"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center px-4 py-2 border-b border-gray-200 dark:border-gray-800">
        <Link className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="#">
          <ChevronLeftIcon className="w-6 h-6" />
          <span className="sr-only">Back to chats</span>
        </Link>
        <h1 className="text-xl font-semibold ml-2">Support</h1>
      </div>
      <div className="flex-1 flex flex-col justify-end p-4">
        <div className="grid gap-4">
          <div className="flex items-end gap-4">
            <Avatar className="w-8 h-8 order-1">
              <AvatarImage alt="User" className="border" src="/placeholder-user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="rounded-xl p-4 bg-gray-100 dark:bg-gray-800">
              <div className="text-sm leading-none">Hi there! How can I help you today?</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">2:14 PM</div>
            </div>
          </div>
          <div className="flex items-end gap-4">
            <Avatar className="w-8 h-8 order-1">
              <AvatarImage alt="User" className="border" src="/placeholder-user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="rounded-xl p-4 bg-gray-100 dark:bg-gray-800">
              <div className="text-sm leading-none">I'm having trouble with my account. Can you help me?</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">2:15 PM</div>
            </div>
          </div>
          <div className="flex items-end gap-4">
            <Avatar className="w-8 h-8 order-1">
              <AvatarImage alt="User" className="border" src="/placeholder-user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="rounded-xl p-4 bg-gray-100 dark:bg-gray-800">
              <div className="text-sm leading-none">
                Of course! Please provide me with your email address, and I'll look into it for you.
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">2:16 PM</div>
            </div>
          </div>
          <div className="flex items-end gap-4">
            <Avatar className="w-8 h-8 order-1">
              <AvatarImage alt="User" className="border" src="/placeholder-user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="rounded-xl p-4 bg-gray-100 dark:bg-gray-800">
              <div className="text-sm leading-none">
                Sure, let me assist you with that. Could you please share your email address?
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">2:17 PM</div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <form className="flex gap-2">
            <Input className="flex-1" placeholder="Type a message" type="text" />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}
