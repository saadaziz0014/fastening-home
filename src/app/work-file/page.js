'use client';
import React, { useState } from "react";
import Dropdown from "../components/Dropdown";
import SpreadSheetData from "../components/SpreadSheetData";
import { useRouter } from "next/navigation";

export default function WorkFile() {
    const router = useRouter();
    const [data, setData] = useState([
        [{ value: "A1" }, { value: "B1" }],
        [{ value: "A2" }, { value: "B2" }],
    ]);
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                    <Dropdown label="Pr. Lines" />
                    <Dropdown label="Vendors" />
                    <Dropdown label="Measures" />
                    <Dropdown label="Company" />
                    <Dropdown label="Database" />
                    <button className="underline py-1 text-[#9843D0]">Remove Filters</button>
                </div>
                <div className="flex gap-1 items-center mr-2">
                    <div className="relative inline-block w-11 h-5">
                        <input defaultChecked id="switch-component" type="checkbox" className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300" />
                        <label htmlFor="switch-component" className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer">
                        </label>
                    </div>
                    <h1>Stock</h1>
                    <button className="bg-white px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                    </button>
                    <div className="w-64 px-2">
                        <div className="relative">
                            <span className="absolute text-black top-5 left-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>

                            </span>
                            <input type="text" placeholder="Search for Trades" className="bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer" name />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-8 items-center">
                <div className="flex gap-3 items-center">
                    <label className="text-gray-900 font-medium">Pr. Lines</label>
                    <select id="prlines" class="w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                        <option selected></option>
                    </select>
                    <label className="text-gray-900 font-medium">Vendors</label>
                    <select id="vendors" class="w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                        <option selected></option>
                    </select>
                    <label className="text-gray-900 font-medium">Purchasers</label>
                    <input type="text" className="w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />
                </div>
                <div className="flex gap-3 items-center mr-2">
                    <button className="bg-[#9843D0] text-white px-3 py-2 rounded-lg">Generate File</button>
                    <button onClick={() => { router.push('/tab-production') }} className="bg-[#9843D0] text-white px-3 py-2 rounded-lg">Post Tab to Production</button>
                    <button className="bg-[#9843D0] text-white px-3 py-2 rounded-lg">Save</button>
                </div>
            </div>
            <div className="mt-12">
                <ul className="flex gap-4">
                    <li><h1>Pricing</h1></li>
                    <li><h1>Code/Class</h1></li>
                    <li><h1>UOM</h1></li>
                    <li><h1>Vendor File</h1></li>
                    <li><h1>Discount Table</h1></li>
                    <li><h1>ISC</h1></li>
                    <li><h1>Database</h1></li>
                    <li><h1>Other</h1></li>
                </ul>
                <hr className="border-gray-300 mt-1" />
            </div>
            <div className="mt-12">
                <SpreadSheetData data={data} setData={setData} />
            </div>
        </div>
    )
}