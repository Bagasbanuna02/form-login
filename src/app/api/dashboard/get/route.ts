import client from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await client.user.findMany();
  return NextResponse.json(data);
}
