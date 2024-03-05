import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hwnkucfptcbnpbmbmtec.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3bmt1Y2ZwdGNibnBibWJtdGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzODExNzEsImV4cCI6MjAyNDk1NzE3MX0.QTCWf1l7vkryMi6DPWDckOLU5ft8tzclpSkZr3zzxQU'
const supabase = createClient(supabaseUrl, supabaseKey)
import { NextResponse } from "next/server"


export const GET = async(req,res)=>{
     
    //getAllUsers
    const {data,error} = await supabase.from('Users').select('*')
    
    if(error){
        return NextResponse.json({error},{status:500})
    }
    else{
        return NextResponse.json({data},{status:200})
    }
}


export const POST = async(req,res)=>{

    //addUser
    const values = await req.json()

    const tupple = {
        fname : values.fname,
        lname : values.lname,
        password : values.password,
        email : values.email
    }

    const {data,error} = await supabase.from('Users').insert(tupple)

    if(error){
        return NextResponse.json({error},{status:500})
    }
    else{
        return NextResponse.json({msg:"User added"},{status:200})
    }

}

