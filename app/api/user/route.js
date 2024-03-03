import supabase from "@/app/db/supabase"
import { NextResponse,NextRequest } from "next/server"

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
        uid : data.uid,
        email : data.email,
        name : data.name
    }

    const { error } = await supabase.from('Users').insert(data)

    if(error){
        return NextResponse.json({msg:error})
    }
    else{
        return NextResponse.json({msg:'Done'})
    }
    
}