import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        let vendors = await prisma.phocas_Venlin.findMany({ select: { VNAME: true } });
        for (let i = 0; i < vendors.length; i++) {
            let keys = Object.keys(vendors[i])
            for (let j = 0; j < keys.length; j++) {
                vendors[i][keys[j]] = vendors[i][keys[j]] ? vendors[i][keys[j]].toString() : null
            }
        }
        return NextResponse.json({ vendors, status: 200 })
    } catch (error) {
        return NextResponse.json({ error, status: 500 })
    }
}