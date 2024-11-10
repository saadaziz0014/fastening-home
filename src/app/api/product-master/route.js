import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const pline = searchParams.get("pline");
        const vendor = searchParams.get("vendor");
        const line = searchParams.get("line");
        const vname = searchParams.get("vname");
        let vendorData = {};
        if (vname != '') {
            vendorData = await prisma.phocas_Venlin.findFirst({
                where: {
                    VNAME: vname
                }
            })
        }
        let prdmaster = [];
        if (!pline && !vendor) {
            return NextResponse.json({ error: "Please enter a search term", status: 400 })
        } else if (pline && !vendor) {
            if (vname != '') {
                prdmaster = await prisma.phocas_Prdmst.findMany({
                    where: {
                        PRDLIN: pline,
                        VENDNO: vendorData.VENDOR
                    },
                    select: {
                        PRDLIN: true,
                        PRODNO: true,
                        VENDNO: true,
                        PRDSCE: true,
                        VEVCST: true
                    },
                    take: 50
                }
                )
            }
            else {
                prdmaster = await prisma.phocas_Prdmst.findMany({
                    where: {
                        PRDLIN: pline,
                    },
                    select: {
                        PRDLIN: true,
                        PRODNO: true,
                        VENDNO: true,
                        PRDSCE: true,
                        VEVCST: true
                    },
                    take: 50
                }
                )
            }
        } else if (!pline && vendor) {
            if (line != '') {
                prdmaster = await prisma.phocas_Prdmst.findMany({
                    where: {
                        VENDNO: Number(vendor),
                        PRDLIN: {
                            contains: line,
                            mode: "insensitive"
                        }
                    },
                    select: {
                        PRDLIN: true,
                        PRODNO: true,
                        VENDNO: true,
                        PRDSCE: true,
                        VEVCST: true
                    },
                    take: 50
                })
            }
            else {
                prdmaster = await prisma.phocas_Prdmst.findMany({
                    where: {
                        VENDNO: Number(vendor),
                    },
                    select: {
                        PRDLIN: true,
                        PRODNO: true,
                        VENDNO: true,
                        PRDSCE: true,
                        VEVCST: true
                    },
                    take: 50
                })
            }
        }
        for (let i = 0; i < prdmaster.length; i++) {
            let hist = await prisma.phocas_Split_Ordhst_2025_FHI.findFirst({
                where: {
                    PRDLIN: prdmaster[i].PRDLIN,
                    PRODNO: prdmaster[i].PRODNO
                }
            })
            if (hist) {
                let cost = hist.COST ? hist.COST : 0
                prdmaster[i].NEWCST = cost
                prdmaster[i].VRD = cost - prdmaster[i].VEVCST
                prdmaster[i].VRDPER = ((cost - prdmaster[i].VEVCST) / cost) * 100
            } else {
                prdmaster[i].NEWCST = 0
                prdmaster[i].VRD = 0
                prdmaster[i].VRDPER = 0
            }
            let warehouse = await prisma.phocas_Whsprd.findMany({
                where: {
                    PRDLIN: prdmaster[i].PRDLIN,
                    PRODNO: prdmaster[i].PRODNO
                },
                orderBy: {
                    AVGCST: "desc"
                }
            })
            if (warehouse.length > 0) {
                prdmaster[i].AVGCST = warehouse[0].AVGCST
            } else {
                prdmaster[i].AVGCST = 0
            }
            let oh = await prisma.phocas_Whsprd.findMany({
                where: {
                    PRDLIN: prdmaster[i].PRDLIN,
                    PRODNO: prdmaster[i].PRODNO
                },
                orderBy: {
                    QTYOHD: "desc"
                }
            })
            if (oh.length > 0) {
                prdmaster[i].QTYOHD = oh[0].QTYOHD
            } else {
                prdmaster[i].QTYOHD = 0
            }
        }
        for (let i = 0; i < prdmaster.length; i++) {
            let keys = Object.keys(prdmaster[i])
            for (let j = 0; j < keys.length; j++) {
                prdmaster[i][keys[j]] = prdmaster[i][keys[j]] ? prdmaster[i][keys[j]].toString() : null
            }
        }
        return NextResponse.json({ prdmaster, status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error, status: 500 })
    }
}