import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        let plines = await prisma.phocas_Prdln.findMany({ select: { P1LIN: true } });
        for (let i = 0; i < plines.length; i++) {
            let keys = Object.keys(plines[i])
            for (let j = 0; j < keys.length; j++) {
                plines[i][keys[j]] = plines[i][keys[j]] ? plines[i][keys[j]].toString() : null
            }
        }
        return NextResponse.json({ plines, status: 200 })
    } catch (error) {
        return NextResponse.json({ error, status: 500 })
    }
}