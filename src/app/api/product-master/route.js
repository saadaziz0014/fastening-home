import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const pline = searchParams.get("pline");
        const vendor = searchParams.get("vendor");
        let prdmaster = [];
        if (!pline && !vendor) {
            return NextResponse.json({ error: "Please enter a search term", status: 400 })
        } else if (pline && !vendor) {
            prdmaster = await prisma.phocas_Prdmst.findMany({
                where: {
                    PRDLIN: pline,
                },
                take: 5
            }
            )
        } else if (!pline && vendor) {
            prdmaster = await prisma.phocas_Prdmst.findMany({
                where: {
                    VENDNO: Number(vendor),
                },
                take: 5
            })
        }
        for (let i = 0; i < prdmaster.length; i++) {
            let prdCls = await prisma.phocas_Prdcls.findFirst({
                where: {
                    PTCLAS: String(prdmaster[i].PMCLAS)
                }
            })
            if (prdCls) {
                prdmaster[i].PMCLSDESC = prdCls.PTDESC
            }
            else {
                prdmaster[i].PMCLSDESC = ""
            }
            let prdGrp = await prisma.groups.findFirst({
                where: {
                    Group: Number(prdmaster[i].PMGRP)
                }
            })
            if (prdGrp) {
                prdmaster[i].PMGRPDESC = prdGrp.Description
            }
            else {
                prdmaster[i].PMGRPDESC = ""
            }
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
                prdmaster[i].VRDPER = Math.round(((cost - prdmaster[i].VEVCST) / prdmaster[i].VEVCST) * 100)
            } else {
                prdmaster[i].NEWCST = 0
                prdmaster[i].VRD = 0
                prdmaster[i].VRDPER = 0
            }
            let vendor = await prisma.phocas_Venlin.findFirst({
                where: {
                    VENDOR: Number(prdmaster[i].VENDNO)
                },
                select: {
                    VNAME: true
                }
            })
            if (vendor) {
                prdmaster[i].VNAME = vendor.VNAME
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
            // console.log(warehouse[0], "warehouse");
            if (warehouse.length > 0) {
                prdmaster[i].AVGCST = warehouse[0].AVGCST
                prdmaster[i].BRANCH = warehouse[0].WHSCOD ? warehouse[0].WHSCOD : 0
                if (prdmaster[i].BRANCH == 3 || prdmaster[i].BRANCH == 7 || prdmaster[i].BRANCH == 10 || prdmaster[i].BRANCH == 11 || prdmaster[i].BRANCH == 12) {
                    prdmaster[i].COMPANY = "FHI"
                } else {
                    prdmaster[i].COMPANY = "Sabre"
                }
            } else {
                prdmaster[i].AVGCST = 0
                prdmaster[i].COMPANY = "FHI"
            }
            // console.log(prdmaster[i].BRANCH, "prdmaster[i].BRANCH");
            // console.log(prdmaster[i].COMPANY);
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
                prdmaster[i][keys[j]] = prdmaster[i][keys[j]] && prdmaster[i][keys[j]] != null && prdmaster[i][keys[j]] != undefined ? prdmaster[i][keys[j]].toString() : null
            }
        }
        //send 5 
        // prdmaster = prdmaster.slice(0, 5)
        return NextResponse.json({ prdmaster, status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error, status: 500 })
    }
}