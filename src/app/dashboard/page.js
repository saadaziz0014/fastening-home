import AttentionCard from "../components/AttentionCard";
import OpenPriceCard from "../components/OpenPriceCard";
import ProductFixCard from "../components/ProductFixCard";
import ReportCard from "../components/ReportCard";
import TempSKUCard from "../components/TempSKUCard";
import UpcomingPriceCard from "../components/UpcomingPriceCard";

export default function Dashboard() {
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
                    <OpenPriceCard />
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