import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const pline = searchParams.get("pline");
        const vendor = searchParams.get("vendor");
        if (!pline && !vendor) {
            return NextResponse.json({ error: "Please enter a search term", status: 400 })
        } else if (pline && !vendor) {
            let prdmaster = await prisma.phocas_Prdmst.findMany({
                where: {
                    PRDLIN: pline
                },
                select: {
                    PRDLIN: true,
                    PRODNO: true,
                    VENDNO: true,
                    DTEPRC: true,
                },
                take: 50
            }
            )
            for (let i = 0; i < prdmaster.length; i++) {
                let keys = Object.keys(prdmaster[i])
                for (let j = 0; j < keys.length; j++) {
                    prdmaster[i][keys[j]] = prdmaster[i][keys[j]] ? prdmaster[i][keys[j]].toString() : null
                }
            }
            return NextResponse.json({ prdmaster, status: 200 })
        } else if (!pline && vendor) {
            let prdmaster = await prisma.phocas_Prdmst.findMany({
                where: {
                    VENDNO: Number(vendor),
                },
                select: {
                    PRDLIN: true,
                    PRODNO: true,
                    VENDNO: true,
                    DTEPRC: true,
                },
                take: 50
            })
            for (let i = 0; i < prdmaster.length; i++) {
                let keys = Object.keys(prdmaster[i])
                for (let j = 0; j < keys.length; j++) {
                    prdmaster[i][keys[j]] = prdmaster[i][keys[j]] ? prdmaster[i][keys[j]].toString() : null
                }
            }
            return NextResponse.json({ prdmaster, status: 200 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error, status: 500 })
    }
}