import { NextResponse } from "next/server";
import prisma from "@/db/prismaClient";
export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const txt = searchParams.get("txt");
    try {
        let plines = await prisma.phocas_Prdln.findMany({
            where: {
                OR: [
                    {
                        P1LIN: {
                            contains: txt,
                            mode: "insensitive"
                        }
                    },
                    {
                        P1COD: Number(txt)
                    }
                ]
            }
        });
        for (let i = 0; i < plines.length; i++) {
            let keys = Object.keys(plines[i])
            for (let j = 0; j < keys.length; j++) {
                plines[i][keys[j]] = plines[i][keys[j]].toString()
            }
        }
        return NextResponse.json({ plines, status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error, status: 500 })
    }
}