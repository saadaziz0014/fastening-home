'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import AttentionCard from "../components/AttentionCard";
import OpenPriceCard from "../components/OpenPriceCard";
import ProductFixCard from "../components/ProductFixCard";
import ReportCard from "../components/ReportCard";
import TempSKUCard from "../components/TempSKUCard";
import UpcomingPriceCard from "../components/UpcomingPriceCard";
import { toast } from "react-toastify";
import LockLandFix from "../components/LockLandCost";
import ListPrice from "../components/ListPrice";
import OverideCost from "../components/OverideCost";
import Card from "../components/Card";

export default function Dashboard() {
    const [vendors, setVendors] = useState([])
    const fetchVendors = async () => {
        try {
            const resp = await axios.get("/api/vendor-overview")
            if (resp.data.status === 200) {
                setVendors(resp.data.price)
            }
        } catch (error) {
            toast.error("Something went wrong in vendor overview")
        }
    }

    useEffect(() => {
        fetchVendors()
    }, [])
    return (
        <div className="bg-[#f7f8fa] font-inter">
            <div className="mt-5">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl">Dashboard</h1>
                    <p className="text-sm">Welcome to your dashboard</p>
                </div>
            </div>
            <div className="flex flex-col gap-10 my-4">
                <div className="flex gap-10">
                    <AttentionCard />
                    <OpenPriceCard data={vendors ? vendors : null} />
                    <UpcomingPriceCard />
                </div>
                <div className="flex gap-10">
                    <ProductFixCard />
                    <TempSKUCard />
                    <ReportCard />
                </div>
                <div className="flex gap-10">
                    <LockLandFix />
                    <ListPrice />
                    <OverideCost />
                </div>
                <div className="flex gap-10">
                    <Card value={'$1,000,000'} title={'Total Order Value'} />
                    <Card value={'$1,000,000'} title={'Total Order Value'} />
                    <Card value={'$1,000,000'} title={'Total Order Value'} />
                    <Card value={'$1,000,000'} title={'Total Order Value'} />
                </div>
            </div>
        </div>
    )
}