import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hwnkucfptcbnpbmbmtec.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3bmt1Y2ZwdGNibnBibWJtdGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzODExNzEsImV4cCI6MjAyNDk1NzE3MX0.QTCWf1l7vkryMi6DPWDckOLU5ft8tzclpSkZr3zzxQU'
const supabase = createClient(supabaseUrl, supabaseKey)
import { NextResponse } from "next/server"



export const POST = async(req,res)=>{
    
    // create Class
    const data1 = await req.json()

    const {error} = await supabase.from('Class').insert(data1)

    const {data} = await supabase.from('Class').select('').eq('name',data1.name).eq('admin',data1.admin)


    const pack = {
        class : data[0].code,
        user : data1.admin,
        role : 0
    }

    const {dat1,err1} = await supabase.from('Member').insert(pack)

    if(error)
    {
        return NextResponse.json({error},{status:500})
    }
    else
    {
        return NextResponse.json({msg:'Class created and Admin set'},{status:200})
    }

}


export const GET = async(req,res)=>{
    
    //allClassesofaperson
    const {id} = Object.fromEntries(new URL(req.url).searchParams.entries());

    const {data,error} = await supabase.from('Member').select('*,name:Class(*)').eq('user',id)

    if(error)
    {
        return NextResponse.json({error},{status:500})
    }
    else
    {
        return NextResponse.json({data},{status:200})
    }
}


