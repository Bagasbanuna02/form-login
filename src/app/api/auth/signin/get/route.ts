import client from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET(req: Request) {
  if (req.method === "GET") {
    const body = req.url;
    const { searchParams } = new URL(body);
    const username = searchParams.get("username");
    const password = searchParams.get("password")

    const cekUsername = await client.user.findUnique({
      where: {
        username: username as string,
      },
    });

    console.log(body);

    if (cekUsername == null)
      return NextResponse.json({
        status: 209,
        message: "Username tidak terdaftar",
      });

    return NextResponse.json({ status: 201, message: "Berhasil" });
  } else {
    return NextResponse.json({ status: 204, message: "Anda belum terdaftar" });
  }
}
