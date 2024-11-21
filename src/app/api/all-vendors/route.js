import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    const { searchParams } = new URL(request.url)
    const PRDLIN = searchParams.get("PRDLIN")
    try {
        let vendorsData = await prisma.phocas_Prdmst.findMany({ where: { PRDLIN: PRDLIN }, select: { VENDNO: true } });
        let vendors = []
        for (let i = 0; i < vendorsData.length; i++) {
            let keys = Object.keys(vendorsData[i])
            for (let j = 0; j < keys.length; j++) {
                vendorsData[i][keys[j]] = vendorsData[i][keys[j]] && vendorsData[i][keys[j]] != null && vendorsData[i][keys[j]] != undefined ? vendorsData[i][keys[j]].toString() : ''
                if (vendorsData[i][keys[j]] != '') {
                    let vendor = await prisma.phocas_Venlin.findFirst({ where: { VENDOR: vendorsData[i][keys[j]] }, select: { VNAME: true } });
                    vendors.push(vendor.VNAME)
                }
            }
        }
        //unique vendors
        vendors = [...new Set(vendors)]
        console.log(vendors, "vendors")
        return NextResponse.json({ vendors, status: 200 })
    } catch (error) {
        console.log(error, "error in vendors")
        return NextResponse.json({ error, status: 500 })
    }
}