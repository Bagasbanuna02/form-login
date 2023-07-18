import client from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();
    // console.log("body", JSON.stringify(body));
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

    if (data) {
      return NextResponse.json({ status: 200, message: "Berhasil Login" });
    }
    return NextResponse.json({
      status: 204,
      message: "Email dan Password Salah",
    });
  }
  return NextResponse.json({ status: 204, messaage: "Data tidak terdaftar" });
}
