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

export default function Dashboard() {
    const [vendors, setVendors] = useState([])
    const fetchVendors = async () => {
        try {
            const resp = await axios.get("/api/vendor-overview")
            if (resp.data.status === 200) {
                setVendors(resp.data.vendors)
            }
        } catch (error) {
            toast.error("Something went wrong in vendor overview")
        }
    }

    useEffect(() => {
        fetchVendors()
    }, [])
    return (
        <div className="bg-[#F8F9FB] h-screen">
            <div className="mt-2 mb-10">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-md">Welcome to your dashboard</p>
                </div>
            </div>
            <div className="flex flex-col gap-10">
                <div className="flex gap-44">
                    <AttentionCard />
                    <OpenPriceCard data={vendors ? vendors : null} />
                    <UpcomingPriceCard />
                </div>
                <div className="flex gap-44">
                    <ProductFixCard />
                    <TempSKUCard />
                    <ReportCard />
                </div>
            </div>
        </div>
    )
}