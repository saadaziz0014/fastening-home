import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";
export const POST = async (request) => {
    try {
        let body = await request.json()
        let fileName = body.fileName
        fileName = fileName ? fileName.toLowerCase() : "untitled"
        let data = body.data
        let exist = await prisma.workFile.findFirst({
            where: {
                name: fileName
            }
        })
        if (exist) {
            await prisma.workFile.update({
                where: {
                    id: exist.id
                },
                data: {
                    name: fileName,
                    data: data
                }
            })
            return NextResponse.json({ message: "successfuly updated" }, { status: 200 })
        } else {
            await prisma.workFile.create({
                data: {
                    name: fileName,
                    data: data
                }
            })
            return NextResponse.json({ message: "successfuly created" }, { status: 200 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error, status: 500 })
    }
}

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url)
        let page = searchParams.get("page")
        let tab = searchParams.get("tab")
        let limit = 8
        let skip = (page - 1) * limit
        if (tab == "1") {
            let total = await prisma.workFile.count()
            let totalPages = Math.ceil(total / limit)
            totalPages = totalPages > 0 ? totalPages : 1
            let data = await prisma.workFile.findMany({
                take: limit,
                skip: skip
            })
            return NextResponse.json({ data, total, totalPages, status: 200 })
        } else {
            let total = 0;
            let totalPages = 0;
            let data = []
            return NextResponse.json({ data, total, totalPages, status: 200 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error, status: 500 })
    }
}