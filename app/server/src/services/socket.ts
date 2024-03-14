import {Server} from 'socket.io';
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hwnkucfptcbnpbmbmtec.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3bmt1Y2ZwdGNibnBibWJtdGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzODExNzEsImV4cCI6MjAyNDk1NzE3MX0.QTCWf1l7vkryMi6DPWDckOLU5ft8tzclpSkZr3zzxQU'
const supabase = createClient(supabaseUrl, supabaseKey)
class SocketService
{
    private _io:Server;
    constructor()
    {
        console.log("Init socket service...");
        this._io=new Server(
            {
                cors:{
                    allowedHeaders:['*'],
                    origin:'*'
                }
            }
        );
    }
    public initListeners()
    {
        const io = this.io;
        console.log("Init socket listeners");
        io.on("connect", (socket) => {
            console.log(`New Socket Connected`, socket.id);
            socket.on("event:message", async ({ message }: { message: string }) => {
                console.log("New Message received", message);
                try {
                  // Parse the message string to JSON object
                  const parsedMessage = JSON.parse(message);
                  
                  // Check if parsed message has id and content properties
                  if (parsedMessage && parsedMessage.id && parsedMessage.content) {
                    const { data, error } = await supabase.from('messages').insert([
                      {
                        author_id: parsedMessage.id,
                        content: parsedMessage.content
                      }
                    ]);
              
                    if (error) {
                      console.error('Error inserting message:', error.message);
                      return;
                    }
              
                    console.log('Message inserted successfully:', data);
                  } else {
                    console.error('Parsed message does not have id and content properties.');
                  }
                } catch (error) {
                  console.error('Error handling message:', error);
                }
              });
          });
    }

    get io()
    {
        return this._io;
    }
}
export default SocketService; 
    

  