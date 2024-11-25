import { NextResponse } from "next/server";
import prisma from "@/db/prismaClient";
export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const txt = searchParams.get("txt");
    try {
        let plines = await prisma.priceTracker.findMany({
            where: {
                prdline: {
                    startsWith: txt,
                    mode: "insensitive"
                }
            },
            select: {
                prdline: true
            }
        });
        plines = plines.sort((a, b) => a.prdline > b.prdline ? 1 : -1)
        for (let i = 0; i < plines.length; i++) {
            let keys = Object.keys(plines[i])
            for (let j = 0; j < keys.length; j++) {
                plines[i][keys[j]] = plines[i][keys[j]] && plines[i][keys[j]].toString()
            }
        }
        // console.log(plines, "plines")
        return NextResponse.json({ plines, status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error, status: 500 })
    }
}