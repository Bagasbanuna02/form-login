"use server"

import client from "@/lib/prisma"

export async function loadDataDashboard() {
    const data = await client.user.findMany()

    return data
}