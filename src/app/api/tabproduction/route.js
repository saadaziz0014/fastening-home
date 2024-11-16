import { NextResponse } from "next/server";
import prisma from "@/db/prismaClient";
export const POST = async (request) => {
    try {
        let body = await request.json()
        let exist = await prisma.tabProduction.findFirst({
            where: {
                prdline: body.prdline,
            }
        })
        if (exist) {
            await prisma.tabProduction.update({
                where: {
                    id: exist.id,
                },
                data: {
                    prdline: body.prdline,
                    vcode: body.vcode,
                    status: body.status,
                    effectivedate: body.effectivedate,
                    promofile: body.promofile,
                    quotefile: body.quotefile,
                    deadstock: body.deadstock,
                    prlinevsvendor: body.prlinevsvendor,
                    customervalueprice: body.customervalueprice,
                    vendornumber: body.vendornumber,
                    specialvendor: body.specialvendor,
                    punchcomparison: body.punchcomparison,
                    freight: body.freight,
                    searchkey: body.searchkey,
                    pricelistform: body.pricelistform,
                    sabreinfo: body.sabreinfo,
                    notes: body.notes
                }
            })
            return NextResponse.json({ message: "updated" }, { status: 200 })
        } else {
            await prisma.tabProduction.create({
                data: {
                    prdline: body.prdline,
                    vcode: body.vcode,
                    status: body.status,
                    effectivedate: body.effectivedate,
                    promofile: body.promofile,
                    quotefile: body.quotefile,
                    deadstock: body.deadstock,
                    prlinevsvendor: body.prlinevsvendor,
                    customervalueprice: body.customervalueprice,
                    vendornumber: body.vendornumber,
                    specialvendor: body.specialvendor,
                    punchcomparison: body.punchcomparison,
                    freight: body.freight,
                    searchkey: body.searchkey,
                    pricelistform: body.pricelistform,
                    sabreinfo: body.sabreinfo,
                    notes: body.notes
                }
            })
            return NextResponse.json({ message: "created" }, { status: 200 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error" }, { status: 500 })
    }
}

export const PUT = async (request) => {
    try {
        let body = await request.json()
        await prisma.tabProduction.update({
            where: {
                prdline: body.prdline,
            },
            data: {
                prdline: body.prdline,
                vcode: body.vcode,
                status: body.status,
                effectivedate: body.effectivedate,
                promofile: body.promofile,
                quotefile: body.quotefile,
                deadstock: body.deadstock,
                prlinevsvendor: body.prlinevsvendor,
                customervalueprice: body.customervalueprice,
                vendornumber: body.vendornumber,
                specialvendor: body.specialvendor,
                punchcomparison: body.punchcomparison,
                freight: body.freight,
                searchkey: body.searchkey,
                pricelistform: body.pricelistform,
                sabreinfo: body.sabreinfo,
                notes: body.notes
            }
        })
        return NextResponse.json({ message: "updated" }, { status: 200 })
    } catch (error) {

    }
}

export const GET = async (request,) => {
    try {
        const { searchParams } = new URL(request.url)
        const prdline = searchParams.get("prdline")
        let data = await prisma.tabProduction.findFirst({
            where: {
                prdline: prdline
            }
        })
        if (!data) return NextResponse.json({ data: { message: "not found" } }, { status: 200 })
        return NextResponse.json(data, { status: 200 })
    } catch (error) {

    }
}

export const DELETE = async (request) => {
    try {
        const { searchParams } = new URL(request.url)
        const prdline = searchParams.get("prdline")
        let data = await prisma.tabProduction.findFirst({
            where: {
                prdline: prdline
            }
        })
        if (!data) return NextResponse.json({ message: "not found" }, { status: 200 })
        await prisma.tabProduction.delete({
            where: {
                id: data.id
            }
        })
        return NextResponse.json({ message: "deleted" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error" }, { status: 500 })
    }
}