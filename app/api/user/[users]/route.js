
import supabase from "@/app/db/supabase"
import { NextResponse,NextRequest } from "next/server"

export const  GET = async(req,{params},res)=>{

    const uid = params.users

    const {data,error} = await supabase.from('Users').select('*').eq('uid',uid)

    if(error){
        return NextResponse.json({msg:'Error'})
    }
    else{
        return NextResponse.json({msg:data})
    }
    
}

