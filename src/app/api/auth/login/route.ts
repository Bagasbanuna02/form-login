import client from "@/lib/prisma";
import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";
import {sealData} from "iron-session/edge"

export async function POST(req: Request) {
  const body = await req.json();
  // console.log(body)
  const data = await client.user.findFirst({
    where: {
      OR: [
        {
          AND: {
            email: body.email,
            password: body.password,
          },
        },
        {
          AND: {
            username: body.email,
            password: body.password,
          },
        },
      ],
    },
    select: {
      id: true,
      email: true,
      username: true,
    },
  });

  if(data){
    const res = await sealData(JSON.stringify({
      email: data.email,
      username: data.username
    }),{
      password:process.env.PASSWORD as string
    })

    // console.log(res)
    cookies().set({
      name: "session",
      value: res,
      maxAge: 60
      // untuk satu minggu 60 * 60 * 24 * 7
    })

    return NextResponse.json({data, status: 200})
  } else {
    return NextResponse.json({message: "Email & Password Salah"})
  }
}
