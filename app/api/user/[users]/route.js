import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hwnkucfptcbnpbmbmtec.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3bmt1Y2ZwdGNibnBibWJtdGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzODExNzEsImV4cCI6MjAyNDk1NzE3MX0.QTCWf1l7vkryMi6DPWDckOLU5ft8tzclpSkZr3zzxQU'
const supabase = createClient(supabaseUrl, supabaseKey)

import { NextResponse } from "next/server"

export const  GET = async(req,{params},res)=>{

    const email = params.users

    const {data,error} = await supabase.from('Users').select('*').eq('email',email)

    console.log(data)

    if(data.length == 0){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
    else{
        return NextResponse.json(data,{status:200})
    }
    
}

