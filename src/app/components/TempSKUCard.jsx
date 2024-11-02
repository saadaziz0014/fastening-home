"use client";
import Link from "next/link";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TempSKUCard() {
  const data = {
    labels: ["81-100", "61-80", "41-60"],
    datasets: [
      {
        data: [32, 23, 54],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow-md">
      <div className="mb-2">
        <div className="flex justify-between">
          <h1 className="text-lg font-bold">Temp SKU's</h1>
          <button className="px-3 py-1 border border-gray-300 rounded-lg">
            View all
          </button>
        </div>
        <div>
          <p className="text-md">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit
          </p>
        </div>
      </div>
      <div>
        <hr className="border-black" />
        <div className="flex justify-center">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
}
