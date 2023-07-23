import client from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await client.barang.findMany();

  // console.log(data);
  return NextResponse.json(data);
}
