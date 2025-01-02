import { NextResponse } from "next/server";
import prisma from "@/db/prismaClient";

export const GET = async (request) => {
    try {
        let url = request.url;
        let key = url.split("?")[1];
        key = key.split("=")[0];
        let value = url.split("=")[1];
        let pline = null;
        let vendor = null;
        if (key == "pline") {
            pline = value;
        } else if (key == "vendor") {
            vendor = value;
        }
        let prdmaster = [];
        if (!pline && !vendor) {
            return NextResponse.json({ error: "Please enter a search term", status: 400 })
        } else if (pline && !vendor) {
            prdmaster = await prisma.phocas_Prdmst.count({
                where: {
                    PRDLIN: pline,
                },
            }
            )
        } else if (!pline && vendor) {
            prdmaster = await prisma.phocas_Prdmst.count({
                where: {
                    VENDNO: Number(vendor),
                }
            })
        }
        return NextResponse.json({ prdmaster, status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error, status: 500 })
    }
}