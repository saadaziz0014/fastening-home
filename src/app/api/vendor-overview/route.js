import prisma from "@/db/prismaClient"
import { NextResponse } from "next/server"
export const GET = async () => {
    try {
        //limit in prisma
        let price = await prisma.workFile.findMany({
            orderBy: {
                created_at: "desc"
            },
            take: 3
        })
        return NextResponse.json({ price, status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error, status: 500 })
    }
}