"use client"
import './globals.css'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hwnkucfptcbnpbmbmtec.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3bmt1Y2ZwdGNibnBibWJtdGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzODExNzEsImV4cCI6MjAyNDk1NzE3MX0.QTCWf1l7vkryMi6DPWDckOLU5ft8tzclpSkZr3zzxQU'
const supabase = createClient(supabaseUrl, supabaseKey)
import md5 from 'md5';
import { useSocket } from "../../../context/SocketProvider";
import { useEffect,useState } from "react";
import { Input } from "../../../../@/components/ui/input";
import { Button } from "../../../../@/components/ui/button";
import { useSession } from 'next-auth/react'
import {toast} from 'react-toastify'

const Chat = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkc = localStorage.getItem('class')
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const { data: session } = useSession();
    const { sendMessage } = useSocket();
    const [profilePicture, setProfilePicture] = useState('');
      // const messageTextIsEmpty = message.trim().length === 0;
    useEffect(() => {
      if (session && session.user && session.user.email) {
        const email = session.user.email;
        const gravatarURL = `https://www.gravatar.com/avatar/${md5(email)}`;
        setProfilePicture(gravatarURL);
      }
    }, [session]);
  
    useEffect(() => {
      const chatContainer = document.getElementById('chat-container');
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [messages]);

    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const { data: messages, error } = await supabase
            .from('messages')
            .select('*,Users(*)')
            .eq('chat_id',checkc)
            .order('created_at', { ascending: true }); // Adjust this according to your schema
          
          if (error) {
            throw error;
          }
  
          setMessages(messages);
          console.log(messages)
        } catch (error) {
          console.error('Error fetching messages:', error.message);
        }
      };
  
      fetchMessages();
    }, []);
  
    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
  
      return `${hours}:${minutes}`;
    };

  

    const handleSubmit = (event) => {
      const classc = localStorage.getItem('class')
      event.preventDefault();

      fetch('http://127.0.0.1:8000/check',{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({msg:message}) 
      }).then(res=>res.json()).then(data=>{
        if(data.msg==='1')
        {
            setIsVisible(true)
            toast.error("XP decreased by 20")
        }
        else
        {
          const newMessage = {
            content: message,
            id: session.user.email ,
            code : classc
    
          };
    
          sendMessage(JSON.stringify(newMessage));
          
        }
      })
 
      
      // setMessages((prevMessages) => [...prevMessages, message]);
      
      setMessage('');
    };

    
supabase
.channel('room1')
.on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, async (payload) => {
  const id = payload.new.id
  
  const {data,error} = await supabase.from('messages').select('*,Users(*)').eq('id',id)

  console.log(data[0])
  setMessages(prev=>[...prev,data[0]])
})
.subscribe()
  
    return (


  <>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={()=>setIsVisible(prev=>!prev)}>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md border-4 border-red-500 ring-4 ring-red-500 ring-opacity-50">
            <button className="absolute top-0 right-0 mt-2 mr-2 text-white text-2xl" onClick={()=>setIsVisible(prev=>!prev)}>
              &times;
            </button>
            <p className="text-white text-lg text-center">Bullying Detected!<br></br>
            Please refrain from making any offensive comment
            </p>
          </div>
        </div>
      )}
 


 





      <div className="flex flex-col ml-[7rem] h-screen">
      {1 && (<div id="chat-container" className="flex-grow overflow-y-auto p-4">
          <ul className="space-y-2">
            {messages.map((msg, index) => (
             <li key={index} className={msg.author_id === session?.user.email ? 'justify-end' : 'justify-start'}>
                <div className={`flex items-center ${msg.author_id === session?.user.email ? 'justify-end' : 'justify-start'}`}>
                  <div className={`bg-gradient-to-br ${msg.author_id === session?.user.email ? 'from-blue-500 to-purple-500' : 'from-gray-900 to-gray-700'} p-4 rounded-lg mr-4 max-w-md min-w-60 relative`}>
                    <p className="m-1 p-1 text-white">{msg.content}</p>
                    <span className="text-xs absolute  bottom-1 right-1">{formatTimestamp(msg.created_at)}</span>
                    <span className="text-xs absolute font-bold top-1 left-2">{msg.Users.fname}</span>
                  </div>
                  {msg.author_id !== session.user.email && (
                    <img src={msg.Users.image} alt="Profile Picture" className="rounded-full w-10 h-10" />
                  )}
                </div>
              </li> 
            ))}
          </ul>
        </div>)}
        <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full text-white-900 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button type="submit" className="ml-2">Send</Button>
        </div>
      </form>
      </div>
      </>
    );
  };
  
  export default Chat;



