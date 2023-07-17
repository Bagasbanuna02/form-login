import client from "@/lib/prisma";
import { NextResponse } from "next/server";
import { URL } from "url";

export async function DELETE(req: Request) {
  const data: any = req.url;
  const { searchParams } = new URL(data);
  const id = searchParams.get("id");
  //   console.log(id);

  const res = await client.barang.delete({
    where: {
      id: id as string,
    },
  });

  return NextResponse.json({"message": "Delete Data"});
}
