import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        let url = request.url;
        let key = url.split("?")[1];
        key = key.split("=")[0];
        let value = url.split("=")[1];
        console.log(key, value)
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
            prdmaster = await prisma.phocas_Prdmst.findMany({
                where: {
                    PRDLIN: pline,
                },
                orderBy: {
                    id: "asc"
                },
                take: 5
            }
            )
        } else if (!pline && vendor) {
            prdmaster = await prisma.phocas_Prdmst.findMany({
                where: {
                    VENDNO: Number(vendor),
                },
                orderBy: {
                    id: "asc"
                },
                // take: 5
            })
        }
        for (let i = 0; i < prdmaster.length; i++) {
            prdmaster[i].srNo = i + 1
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
            let warehouse = await prisma.phocas_Whsprd.findFirst({
                where: {
                    PRDLIN: prdmaster[i].PRDLIN,
                    PRODNO: prdmaster[i].PRODNO
                }
            })
            // console.log(warehouse[0], "warehouse");
            if (warehouse) {
                let avgCostAll = 0
                let avgCostFhi = 0
                let avgCostSabre = 0
                if (Number(warehouse.WHSCOD) == 3 || Number(warehouse.WHSCOD) == 7 || Number(warehouse.WHSCOD) == 10 || Number(warehouse.WHSCOD) == 11 || Number(warehouse.WHSCOD) == 12) {
                    avgCostFhi += warehouse.AVGCST
                } else if (Number(warehouse.WHSCOD) == 50 || Number(warehouse.WHSCOD) == 51) {
                    avgCostSabre += warehouse.AVGCST
                }
                avgCostAll += warehouse.AVGCST
                prdmaster[i].AVGCST = avgCostAll
                prdmaster[i].AVGCSTFHI = avgCostFhi
                prdmaster[i].AVGCSTSABRE = avgCostSabre
                // console.log(Number(warehouse.WHSCOD), "warehouse.WHSCOD", warehouse.id, "warehouse.id");
                prdmaster[i].BRANCH = warehouse.WHSCOD ? Number(warehouse.WHSCOD) : 0
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
            if (prdmaster[i].BRANCH == 3 || prdmaster[i].BRANCH == 7 || prdmaster[i].BRANCH == 10 || prdmaster[i].BRANCH == 11 || prdmaster[i].BRANCH == 12) {
                let fhi = await prisma.phocas_Split_Ordhst_2025_FHI.aggregate({
                    where: {
                        BRANCH: prdmaster[i].BRANCH,
                    },
                    _sum: {
                        QS: true
                    }
                })
                prdmaster[i].salesFHI = fhi._sum.QS
            }
            else if (prdmaster[i].BRANCH == 50 || prdmaster[i].BRANCH == 51) {
                let sabre = await prisma.phocas_Split_Ordhst_2025_SABRE.aggregate({
                    where: {
                        BRANCH: prdmaster[i].BRANCH,
                    },
                    _sum: {
                        QS: true
                    }
                })
                prdmaster[i].salesSabre = sabre._sum.QS
            }
            let oh = await prisma.phocas_Whsprd.findFirst({
                where: {
                    PRDLIN: prdmaster[i].PRDLIN,
                    PRODNO: prdmaster[i].PRODNO
                },
                orderBy: {
                    QTYOHD: "desc"
                },
            })
            if (oh) {
                prdmaster[i].QTYOHD = oh.QTYOHD
            }
            let qtyCom = await prisma.phocas_Whsprd.findFirst({
                where: {
                    PRDLIN: prdmaster[i].PRDLIN,
                    PRODNO: prdmaster[i].PRODNO
                },
                orderBy: {
                    QTYCOM: "desc"
                },
            })
            if (qtyCom) {
                prdmaster[i].QTYCOM = qtyCom.QTYCOM
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