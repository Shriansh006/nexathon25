import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const {previewUrl} = await req.json();

    try{
        await axios.get(`${previewUrl.substring(0,previewUrl.lastIndexOf("/"))}/success.txt`);
        return NextResponse.json({done : true} , {status : 200});
    }catch(error){
        return NextResponse.json({done : false} , {status : 404});
    }

    
}