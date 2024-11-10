import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    const { searchParams } = new URL(request.url)
    const VENDNO = searchParams.get("VENDNO")
    try {
        let plinesData = await prisma.phocas_Prdmst.findMany({ where: { VENDNO: Number(VENDNO) }, select: { PRDLIN: true } });
        let plines = []
        for (let i = 0; i < plinesData.length; i++) {
            let keys = Object.keys(plinesData[i])
            for (let j = 0; j < keys.length; j++) {
                plinesData[i][keys[j]] = plinesData[i][keys[j]] ? plinesData[i][keys[j]].toString() : null
                plines.push(plinesData[i][keys[j]])
            }
        }
        //unique plines
        plines = [...new Set(plines)]
        return NextResponse.json({ plines, status: 200 })
    } catch (error) {
        return NextResponse.json({ error, status: 500 })
    }
}