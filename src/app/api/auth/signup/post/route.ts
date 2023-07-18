import client from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    // console.log(body.username)

    const userName = await client.user.findUnique({
      where: {
        username: body.username,
      },
    });
    if(userName)return NextResponse.json({status: 209, message: "Username telah digunakan"})

    const userEmail = await client.user.findUnique({
        where: { email: body.email},
    })
    if(userEmail)return NextResponse.json({status: 209, message: "Email telah digunakan"})

    await client.user.create({
      data: body,
    });
    return NextResponse.json({ status: 201 });
  } else {
    return NextResponse.json({ status: 204 });
  }
}
