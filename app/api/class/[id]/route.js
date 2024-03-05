import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hwnkucfptcbnpbmbmtec.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3bmt1Y2ZwdGNibnBibWJtdGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzODExNzEsImV4cCI6MjAyNDk1NzE3MX0.QTCWf1l7vkryMi6DPWDckOLU5ft8tzclpSkZr3zzxQU'
const supabase = createClient(supabaseUrl, supabaseKey)
import { NextResponse } from "next/server"


export const GET = async(req,{params},res)=>{
     
    //getClasswithcode
    const id = params.id
    const {data,error} = await supabase.from('Class').select('*').eq('code',id)
    
    if(error){
        return NextResponse.json({error},{status:500})
    }
    else{
        return NextResponse.json({data},{status:200})
    }
}


export const DELETE = async(req,{params},res)=>{

    //deleteClassWithCode
    const id = params.id
    const {data,error} = await supabase.from('Class').delete().eq('code',id)

    if(error){
        return NextResponse.json({error},{status:500})
    }
    else{
        return NextResponse.json({mgs:'Class Deleted'},{status:200})
    }
}


export const PATCH = async(req,{params},res)=>{

    //updateClasswithcode
    const id = params.id
    const value = await req.json()
    const {data,error} = await supabase.from('Class').update(value).eq('code',id)

    if(error){
        return NextResponse.json({error},{status:500})
    }
    else{
        return NextResponse.json({mgs:'Class Updated'},{status:200})
    }

}

