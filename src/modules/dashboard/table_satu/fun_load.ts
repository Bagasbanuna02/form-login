"use server";
import client from "@/lib/prisma";

export async function loadDataBarang() {
  const data = await client.barang.findMany();

  return data;
}
