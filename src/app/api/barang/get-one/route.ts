import client from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET(req: Request){
    const data = req.url
    const {searchParams} = new URL(data)
    const id = searchParams.get("id")
    // console.log(id)
    const res = await client.barang.findUnique({
        where: {
            id: id as any
        }
    })

    return NextResponse.json(res)

}