'use client';
import React, { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import SpreadSheetData from "../components/SpreadSheetData";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

export default function WorkFile() {
    const router = useRouter();
    const [pline, setPline] = useState("");
    const [vline, setVline] = useState("");
    const [prdline, setPrdline] = useState("");
    const [vcode, setVcode] = useState(0);
    const [data, setData] = useState([[{ value: "Pr. Line" }, { value: "Part Number" }, { value: "Description" }, { value: "Vendor" }]]);
    const [plines, setPlines] = useState([]);
    const [vlines, setVlines] = useState([]);
    const [flagPrdline, setFlagPrdline] = useState(false);
    const [flagVline, setFlagVline] = useState(false);
    const [lines, setLines] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [vendorsFlag, setVendorsFlag] = useState("hidden");
    const [linesFlag, setLinesFlag] = useState("hidden");
    const fetchPlines = async () => {
        try {
            const resp = await axios.get("/api/product-lines?txt=" + pline);
            if (resp.data.status === 200) {
                setPlines(resp.data.plines);
            }
        } catch (err) {
            toast.error("Something went wrong in product lines")
        }
    }

    const fetchVlines = async () => {
        try {
            const resp = await axios.get("/api/vendor-lines?txt=" + vline);
            if (resp.data.status === 200) {
                setVlines(resp.data.vlines);
            }
        } catch (err) {
            toast.error("Something went wrong in vendor lines")
        }
    }
    const generateFile = async () => {
        try {
            setData([[{ value: "Pr. Line" }, { value: "Part Number" }, { value: "Description" }, { value: "Vendor" }]]);
            if (prdline.length > 0 || vcode != 0) {
                if (prdline.length > 0) {
                    let resp = await axios.get("/api/product-master?pline=" + prdline);
                    if (resp.data.status === 200) {
                        let array = [];
                        let length = resp.data.prdmaster.length > 10 ? 10 : resp.data.prdmaster.length
                        for (let i = 0; i < length; i++) {
                            array.push([{ value: resp.data.prdmaster[i].PRDLIN }, { value: resp.data.prdmaster[i].PRODNO }, { value: resp.data.prdmaster[i].DTEPRC }, { value: resp.data.prdmaster[i].VENDNO }]);
                        }
                        setData((prevData) => [...prevData, ...array]);
                        let allVendorsResp = await axios.get("/api/all-vendors");
                        if (allVendorsResp.data.status === 200) {
                            setVendors(allVendorsResp.data.vendors);
                        }
                        setLines([{ PRDLIN: prdline }]);
                    } else {
                        toast.error("Something went wrong in generating file")
                    }
                }
                else if (vcode != 0) {
                    let resp = await axios.get("/api/product-master?vendor=" + String(vcode));
                    console.log(resp.data)
                    if (resp.data.status === 200) {
                        let array = [];
                        let length = resp.data.prdmaster.length > 10 ? 10 : resp.data.prdmaster.length
                        for (let i = 0; i < length; i++) {
                            array.push([{ value: resp.data.prdmaster[i].PRDLIN }, { value: resp.data.prdmaster[i].PRODNO }, { value: resp.data.prdmaster[i].DTEPRC }, { value: resp.data.prdmaster[i].VENDNO }]);
                        }
                        setData((prevData) => [...prevData, ...array]);
                        let allPlinesResp = await axios.get("/api/all-productlines");
                        if (allPlinesResp.data.status === 200) {
                            setLines(allPlinesResp.data.plines);
                        }
                        setVendors([{ VNAME: vline }]);
                    } else {
                        toast.error("Something went wrong in generating file")
                    }
                }
            } else {
                toast.error("Please select a product line or a vendor line")
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong in generating file")
        }
    }
    useEffect(() => {
        setPlines([])
        setVlines([])
        if (!flagPrdline && pline.length > 2) {
            fetchPlines();
        }
        if (!flagVline && vline.length > 2) {
            fetchVlines();
        }
    }, [pline, vline])

    const plineSelected = (item) => {
        setPrdline(item);
        setPline(item);
        setFlagPrdline(true);
        setPlines([]);
    }
    const vlineSelected = (item, item2) => {
        console.log(item, item2)
        setVcode(item);
        setFlagVline(true);
        setVline(item2);
        setVlines([]);
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                    <div>
                        <Dropdown label="Pr. Lines" onClick={() => setLinesFlag(linesFlag === "visible" ? "hidden" : "visible")} />
                        {linesFlag === "visible" && plines.length > 0 ? (
                            plines.map((item) => (
                                <option value={item.P1LIN}> {item.P1LIN} </option>
                            ))
                        ) : null}
                    </div>
                    <div>
                        <Dropdown label="Vendors" onClick={() => setVendorsFlag(vendorsFlag === "visible" ? "hidden" : "visible")} />
                        {vendorsFlag === "visible" && vendors.length > 0 ? (
                            vendors.map((item) => (
                                <option value={item.VNAME}> {item.VNAME} </option>
                            ))
                        ) : null}
                    </div>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                    </button>
                    <div className="w-64 px-2">
                        <div className="relative">
                            <span className="absolute text-black top-5 left-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>

                            </span>
                            <input type="text" placeholder="Search for Trades" className="bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer" name />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-8 items-center">
                <div className="flex gap-3 items-center">
                    <label className="text-gray-900 font-medium">Pr. Lines</label>
                    <div>
                        <input id="prlines" value={pline} onChange={(e) => { setPline(e.target.value); setVline(''); setFlagPrdline(false) }} class="w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />
                        {plines.length > 0 && (
                            <div className="border border-black p-2 bg-gray-300 absolute mt-1 z-50">
                                {plines.map((item) => {
                                    return (
                                        <option value={item.id} onClick={() => { plineSelected(item.P1LIN) }} className="text-gray-900 border-b-1 border-gray-300 p-1 hover:bg-blue-900 hover:text-white">{item.P1LIN} {item.P1COD}</option>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                    <label className="text-gray-900 font-medium">Vendors</label>
                    <div>
                        <input id="vendors" value={vline} onChange={(e) => { setVline(e.target.value); setPline(''); setFlagVline(false) }} class="w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />
                        {vlines.length > 0 && (
                            <div className="border border-black p-2 bg-gray-300 absolute mt-1 z-50">
                                {vlines.map((item) => {
                                    return (
                                        <option value={item.id} onClick={() => { vlineSelected(item.VENDOR, item.VNAME) }} className="text-gray-900 border-b-1 border-gray-300 p-1 hover:bg-blue-900 hover:text-white">{item.VNAME} {item.VCODE}</option>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                    <label className="text-gray-900 font-medium">Purchasers</label>
                    <input type="text" className="w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />
                </div>
                <div className="flex gap-3 items-center mr-2">
                    <button onClick={generateFile} className="bg-[#9843D0] text-white px-3 py-2 rounded-lg">Generate File</button>
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