import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hwnkucfptcbnpbmbmtec.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3bmt1Y2ZwdGNibnBibWJtdGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzODExNzEsImV4cCI6MjAyNDk1NzE3MX0.QTCWf1l7vkryMi6DPWDckOLU5ft8tzclpSkZr3zzxQU'
const supabase = createClient(supabaseUrl, supabaseKey)
import { NextResponse } from "next/server"


export const POST = async(req,res)=>{

    //joinClass
    const values = await req.json()
    
    const {data,error} = await supabase.from('Member').insert(values)

    if(error){
        return NextResponse.json({error},{status:500})
    }
    else{
        return NextResponse.json({msg:"Joined Class"},{status:200})
    }

}


export const DELETE = async(req,res)=>{

    //leave class

    const {clas,user} = Object.fromEntries(new URL(req.url).searchParams.entries());

    const {data,error} = await supabase.from('Member').delete().eq('class',clas).eq('user',user)

    if(error){
        return NextResponse.json({error},{status:500})
    }
    else{
        return NextResponse.json({msg:"Left Class"},{status:200})
    }
}




export const GET = async(req,res)=>{

    //getAllsubjectsofclass
    const {id} = Object.fromEntries(new URL(req.url).searchParams.entries());

    const {data,error} = await supabase.from('Member').select('*,Users(*)').eq('class',id)

    if(error){
        return NextResponse.json({error},{status:500})
    }
    else{
        return NextResponse.json({data},{status:200})
    }

}