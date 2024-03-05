import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hwnkucfptcbnpbmbmtec.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3bmt1Y2ZwdGNibnBibWJtdGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzODExNzEsImV4cCI6MjAyNDk1NzE3MX0.QTCWf1l7vkryMi6DPWDckOLU5ft8tzclpSkZr3zzxQU'
const supabase = createClient(supabaseUrl, supabaseKey)
import { NextResponse } from "next/server"


export const POST = async(req,res)=>{

    //createSubject
    const tupple = await req.json()


    const {data,error} = await supabase.from('Subject').insert(tupple)

    if(error){
        return NextResponse.json({error},{status:500})
    }
    else{
        return NextResponse.json({msg:"Subject added"},{status:200})
    }

}


export const DELETE = async(req,res)=>{

    //deleteSubject
    const {id} = Object.fromEntries(new URL(req.url).searchParams.entries());


    const {data,error} = await supabase.from('Subject').delete().eq('id',id)

    if(error){
        return NextResponse.json({error},{status:500})
    }
    else{
        return NextResponse.json({msg:"Subject deleted"},{status:200})
    }

}


export const PATCH = async(req,res)=>{

    //updateSubject
    const {id} = Object.fromEntries(new URL(req.url).searchParams.entries());
    
    const matter = await req.json()

    const {data,error} = await supabase.from('Subject').update(matter).eq('id',id)

    if(error){
        return NextResponse.json({error},{status:500})
    }
    else{
        return NextResponse.json({msg:"Subject updated"},{status:200})
    }

}




export const GET = async(req,res)=>{

    //getAllsubjectsofclass
    const {id} = Object.fromEntries(new URL(req.url).searchParams.entries());

    const {data,error} = await supabase.from('Subject').select('*,Users(*)').eq('class',id)

    if(error){
        return NextResponse.json({error},{status:500})
    }
    else{
        return NextResponse.json({data},{status:200})
    }

}