import prisma from "@/db/prismaClient"
import { NextResponse } from "next/server"
export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const txt = searchParams.get("txt");
    try {
        let vlines = await prisma.phocas_Venlin.findMany({
            where: {
                OR: [
                    {
                        VENDOR: Number(txt)
                    }
                ]
            }
        });
        console.log(vlines, "vlines")
        vlines = vlines.sort((a, b) => a.VNAME > b.VNAME ? 1 : -1)
        for (let i = 0; i < vlines.length; i++) {
            let keys = Object.keys(vlines[i])
            for (let j = 0; j < keys.length; j++) {
                vlines[i][keys[j]] = vlines[i][keys[j]] && vlines[i][keys[j]].toString()
            }
        }
        return NextResponse.json({ vlines, status: 200 })
    } catch (error) {
        console.log(error, "error")
        return NextResponse.json({ error, status: 500 })
    }
}