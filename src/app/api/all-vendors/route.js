import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    const { searchParams } = new URL(request.url)
    const PRDLIN = searchParams.get("PRDLIN")
    try {
        let vendorsData = await prisma.phocas_Prdmst.findMany({ where: { PRDLIN: PRDLIN }, select: { VENDNO: true } });
        let vendors = []
        for (let i = 0; i < vendorsData.length; i++) {
            let keys = Object.keys(vendors[i])
            for (let j = 0; j < keys.length; j++) {
                vendorsData[i][keys[j]] = vendorsData[i][keys[j]] ? vendorsData[i][keys[j]].toString() : null
                vendors.push(vendorsData[i][keys[j]])
            }
        }
        //unique vendors
        vendors = [...new Set(vendors)]
        return NextResponse.json({ vendors, status: 200 })
    } catch (error) {
        return NextResponse.json({ error, status: 500 })
    }
}