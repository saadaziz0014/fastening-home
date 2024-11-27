import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";
export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url)
        const name = searchParams.get("name")
        let data = await prisma.workFile.findFirst({
            where: {
                name: name
            },
            select: {
                data: true
            }
        })
        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error, status: 500 })
    }
}