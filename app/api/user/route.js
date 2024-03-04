import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hwnkucfptcbnpbmbmtec.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3bmt1Y2ZwdGNibnBibWJtdGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzODExNzEsImV4cCI6MjAyNDk1NzE3MX0.QTCWf1l7vkryMi6DPWDckOLU5ft8tzclpSkZr3zzxQU'
const supabase = createClient(supabaseUrl, supabaseKey)

import { NextResponse } from "next/server"

export const  GET = async(req,res)=>{

    const {data,error} = await supabase.from('Users').select('*')
    if(error){
        return NextResponse.json({msg:'Error'})
    }
    else{
        return NextResponse.json({msg:data})
    }
    
}


export const  POST= async(req,res)=>{
    
    const data = await req.json()

    const data1 ={
        Lname : data.lname,
        email : data.email,
        name : data.name,
        password : data.password
    }

    const { error } = await supabase.from('Users').insert(data1)

    if(error){
        return NextResponse.json({msg:error},{status:500})
    }
    else{
        return NextResponse.json({msg:'Done'},{status:200})
    }
    
}