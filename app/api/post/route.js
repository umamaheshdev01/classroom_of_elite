import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hwnkucfptcbnpbmbmtec.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3bmt1Y2ZwdGNibnBibWJtdGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzODExNzEsImV4cCI6MjAyNDk1NzE3MX0.QTCWf1l7vkryMi6DPWDckOLU5ft8tzclpSkZr3zzxQU'
const supabase = createClient(supabaseUrl, supabaseKey)
import { NextResponse } from "next/server"


export const POST = async(req,res)=>{

    //createPost
    const tupple = await req.json()


    const {data,error} = await supabase.from('Post').insert(tupple)

    if(error){
        return NextResponse.json({error},{status:500})
    }
    else{
        return NextResponse.json({msg:"Post added"},{status:200})
    }

}


export const DELETE = async(req,res)=>{

    //deletePOST
    const {id} = Object.fromEntries(new URL(req.url).searchParams.entries());


    const {data,error} = await supabase.from('Post').delete().eq('id',id)

    if(error){
        return NextResponse.json({error},{status:500})
    }
    else{
        return NextResponse.json({msg:"Post deleted"},{status:200})
    }

}


export const PATCH = async(req,res)=>{

    //updatePost
    const {id} = Object.fromEntries(new URL(req.url).searchParams.entries());
    
    const matter = await req.json()

    const {data,error} = await supabase.from('Post').update(matter).eq('id',id)

    if(error){
        return NextResponse.json({error},{status:500})
    }
    else{
        return NextResponse.json({msg:"Post updated"},{status:200})
    }

}




export const GET = async(req,res)=>{

    //getAllPostsofsubject
    const {id} = Object.fromEntries(new URL(req.url).searchParams.entries());

    const {data,error} = await supabase.from('Post').select('*,Users(*)').eq('subject_id',id)

    if(error){
        return NextResponse.json({error},{status:500})
    }
    else{
        return NextResponse.json({data},{status:200})
    }

}