import client from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method == "POST") {
    const data = await req.json();
    // console.log(data);
    const result = await client.barang.create({
      data: {
        namaBarang: data.namaBarang,
        harga: Number(data.harga),
      },
    });

    return NextResponse.json(result, { status: 200 });
  }
}
