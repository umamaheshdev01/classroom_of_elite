"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../../../../@/components/ui/input";
import { Button } from "../../../../@/components/ui/button";
import { useSession } from 'next-auth/react'
import { createClient } from '@supabase/supabase-js'
import "./globals.css"
const supabaseUrl = 'https://hwnkucfptcbnpbmbmtec.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3bmt1Y2ZwdGNibnBibWJtdGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzODExNzEsImV4cCI6MjAyNDk1NzE3MX0.QTCWf1l7vkryMi6DPWDckOLU5ft8tzclpSkZr3zzxQU'
const supabase = createClient(supabaseUrl, supabaseKey)

const Chat = () => {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {

    const email = localStorage.getItem('user')
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('chatgpt')
          .select('*').eq('user_id',email)
          .order('created_at', { ascending: true });

        if (error) {
          throw error;
        }

        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error.message);
      }
    };

    fetchMessages();
  }, []);

  const em = localStorage.getItem('user')

  const handleSubmit = async (event) => {
 

    event.preventDefault();
    if (!message.trim()) return; // Prevent sending empty messages

    try {
      const { data: newMessage, error } = await supabase
        .from('chatgpt')
        .insert([{ content: message, user_id: em,role:0 }]);

      if (error) {
        throw error;
      }

    

    
      

   const msg = message
   setMessage('');

      fetch('http://127.0.0.1:8000/answer',{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({question : msg , user : em}) 
      })

      


    } catch (error) {
      console.error('Error inserting message:', error.message);
    }
  };

  supabase
.channel('room2')
.on('postgres_changes', { event: '*', schema: 'public', table: 'chatgpt' }, async (payload) => {
  const id = payload.new.id
  const em = localStorage.getItem('user');
  const {data,error} = await supabase.from('chatgpt').select('*').eq('id',id);

  console.log(data[0])
  setMessages(prev=>[...prev,data[0]])
})
.subscribe()
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  return (
    <div className="flex flex-col ml-[7rem] h-screen">
    <div id="chat-container" className="flex-grow overflow-y-auto p-4">
      <ul className="space-y-2">
        {messages.map((msg, index) => (
          msg.user_id === localStorage.getItem('user') && (
            <li key={index} className={msg.role === 0 ? 'justify-end' : 'justify-start'}>
              <div className={`flex items-center ${msg.role === 0 ? 'justify-end' : 'justify-start'}`}>
                <div className={`bg-gradient-to-br ${msg.role === 0 ? 'from-blue-500 to-purple-500' : 'from-gray-900 to-gray-700'} p-4 rounded-lg mr-4 max-w-md min-w-60 relative`}>
                  <p className="m-1 p-1 text-white">{msg.content}</p>
                </div>
              </div>
            </li>
          )
        ))}
      </ul>
    </div>
  
  
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full text-white-900 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button type="submit" className="ml-2">Send</Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
