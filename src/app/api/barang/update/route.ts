import client from "@/lib/prisma";
import { NextResponse } from "next/server";
import { URL } from "url";

export async function POST(req: Request) {
  if (req.method === "POST") {
    const body = await req.json();

    // console.log(body);

    const res = await client.barang.update({
      where: {
        id: body.id,
      },
      data: {
        namaBarang: body.namaBarang,
        harga: Number(body.harga),
      },
    });

    return NextResponse.json({ status: 201, message: "Success" });
    // return new Response("message: Success", { status: 201 });
  } else {
    return NextResponse.json({ status: 204, message: "Error" });
  }
}
