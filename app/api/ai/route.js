import { NextResponse } from "next/server";

export const GET = async(req,res)=>{

   const data = await req.json()

    return NextResponse.json({msg:data},{status:500})

}