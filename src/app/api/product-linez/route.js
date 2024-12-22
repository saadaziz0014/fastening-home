import { NextResponse } from "next/server";
import prisma from "@/db/prismaClient";
import connectDB from "@/app/db/connectDB";
import models from "@/app/db/mongodb_models";
export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const txt = searchParams.get("txt");
    try {
        let plines = await prisma.phocas_Prdln.findMany({
            where: {
                PRDLIN: {
                    startsWith: txt,
                    mode: "insensitive"
                }
            },
            select: {
                PRDLIN: true
            }
        });
        plines = plines.sort((a, b) => a.PRDLIN > b.PRDLIN ? 1 : -1)
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
    // try {
    //     await connectDB();
    //     const plines = await models.PrLine.find({ PRDLIN: { $regex: new RegExp(txt, "i") } }).sort({ PRDLIN: 1 });
    //     return NextResponse.json({ plines, status: 200 })
    // } catch (error) {
    //     console.log(error)
    //     return NextResponse.json({ error, status: 500 })
    // }
}