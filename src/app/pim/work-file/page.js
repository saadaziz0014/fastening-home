'use client';
import React, { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import SpreadSheetData from "../../components/SpreadSheetData";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import TableComponent from "@/app/components/TableComponent";
import DropdownMeasure from "@/app/components/DropdownMeasure";

const columns = [
    { key: "prLine", label: "Pr. Line" },
    { key: "partNumber", label: "Part Number" },
    { key: "description", label: "Description" },
    { key: "xRef", label: "X-Ref" },
    { key: "cost", label: "Cost" },
    { key: "newCost", label: "New Cost" },
    { key: "dollarChange", label: "$ Change" },
    { key: "percentChange", label: "% Change" },
    { key: "avgCost", label: "Avg Cost" },
    { key: "regionalPrice", label: "Regional Price" },
    { key: "list", label: "List" },
    { key: "dollarChangeList", label: "$ Change" },
    { key: "percentChangeList", label: "% Change" },
    { key: "zo9", label: "ZO9" },
    { key: "qtyOH", label: "Qty OH" },
    { key: "isc", label: "ISC" },
    { key: "stockPer", label: "Stock %" },
    { key: "purchPer", label: "Purch %" },
    { key: "landedCost", label: "Landed Cost" },
    { key: "pMult", label: "Purchase Multiple" },
    { key: "sMult", label: "Sell Multiple" },
    { key: "pToStock", label: "P to Stock" },
    { key: "sellUnit", label: "Sell Unit" },
    { key: "stkUnit", label: "STK Unit" },
    { key: "purUnit", label: "Pur Unit" },
    { key: "boxQty", label: "Box Quantity" },
];

export default function WorkFile() {
    const router = useRouter();
    const [visibleColumns, setVisibleColumns] = useState(
        columns.map((col) => col.key)
    );
    const [pline, setPline] = useState("");
    const [vline, setVline] = useState("");
    const [initialData, setInitialData] = useState([]);
    const [prdline, setPrdline] = useState("");
    const [vcode, setVcode] = useState(0);
    const [data, setData] = useState([[{ value: "Pr. Line" }, { value: "Part Number" }, { value: "Description" }, { value: "Vendor" }, { value: "Cost" }, { value: "New Cost" }, { value: "Variance$" }, { value: "Variance%" }]]);
    const [dataU, setDataU] = useState([[{ value: "Pr. Line" }, { value: "Part Number" }, { value: "Description" }, { value: "Cost" }, { value: "New Cost" }, { value: "Average Cost" }, { value: "Qty OH" }]]);
    const [dataI, setDataI] = useState([[{ value: "Pr. Line" }, { value: "Part Number" }, { value: "Description" }, { value: "ISC" }, { value: "Qty OH" }]]);
    const [plines, setPlines] = useState([]);
    const [vlines, setVlines] = useState([]);
    const [flagPrdline, setFlagPrdline] = useState(false);
    const [flagVline, setFlagVline] = useState(false);
    const [lines, setLines] = useState([]);
    const [tab, setTab] = useState(0);
    const [vendors, setVendors] = useState([]);
    const [measures, setMeasures] = useState(["Pr. Line", "Part Number", "Description", "Vendor", "Cost", "New Cost", "Variance$", "Variance%"]);
    const [measuresU, setMeasuresU] = useState(["Pr. Line", "Part Number", "Description", "Cost", "New Cost", "Average Cost", "Qty OH"]);
    const [baseMeasures, setBaseMeasures] = useState(measures);
    const [vendorsFlag, setVendorsFlag] = useState("hidden");
    const [linesFlag, setLinesFlag] = useState("hidden");
    const [measuresFlag, setMeasuresFlag] = useState("hidden");
    const [databaseFlag, setDatabaseFlag] = useState("hidden");
    const [companyFlag, setCompanyFlag] = useState("hidden");
    const [filterLine, setFilterLine] = useState("");
    const [filterVendor, setFilterVendor] = useState("");
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
            console.log(prdline, vcode);
            setData([[{ value: "Pr. Line" }, { value: "Part Number" }, { value: "Description" }, { value: "Vendor" }, { value: "Cost" }, { value: "New Cost" }, { value: "Variance$" }, { value: "Variance%" }]]);
            setDataU([{ value: "Pr. Line" }, { value: "Part Number" }, { value: "Description" }, { value: "Cost" }, { value: "New Cost" }, { value: "Average Cost" }, { value: "Qty OH" }]);
            if (prdline.length > 0 || vcode != 0) {
                if (prdline.length > 0) {
                    let resp = await axios.get("/api/product-master?pline=" + prdline);
                    if (resp.data.status === 200) {
                        let array = [];
                        let arrayU = [];
                        let length = resp.data.prdmaster.length;
                        for (let i = 0; i < length; i++) {
                            array.push([{ value: resp.data.prdmaster[i].PRDLIN }, { value: resp.data.prdmaster[i].PRODNO }, { value: resp.data.prdmaster[i].PRDSCE }, { value: resp.data.prdmaster[i].VENDNO }, { value: resp.data.prdmaster[i].VEVCST }, { value: resp.data.prdmaster[i].NEWCST }, { value: resp.data.prdmaster[i].VRD }, { value: resp.data.prdmaster[i].VRDPER }]);
                            arrayU.push([{ value: resp.data.prdmaster[i].PRDLIN }, { value: resp.data.prdmaster[i].PRODNO }, { value: resp.data.prdmaster[i].PRDSCE }, { value: resp.data.prdmaster[i].VENDNO }, { value: resp.data.prdmaster[i].VEVCST }, { value: resp.data.prdmaster[i].NEWCST }, { value: resp.data.prdmaster[i].AVGCST }, { value: resp.data.prdmaster[i].QTYOHD }]);
                        }
                        if (length > 0) {
                            setData([...data, ...array]);
                            setDataU([...dataU, ...arrayU]);
                        }
                        let allVendorsResp = await axios.get("/api/all-vendors?PRDLIN=" + prdline);
                        if (allVendorsResp.data.status === 200) {
                            setVendors(allVendorsResp.data.vendors);
                        }
                        setLines([prdline]);
                    } else {
                        toast.error("Something went wrong in generating file")
                    }
                }
                else if (vcode != 0) {
                    let resp = await axios.get("/api/product-master?vendor=" + String(vcode));
                    if (resp.data.status === 200) {
                        let array = [];
                        let arrayU = [];
                        let length = resp.data.prdmaster.length;
                        for (let i = 0; i < length; i++) {
                            initialData.push({ prLine: resp.data.prdmaster[i].PRDLIN, partNumber: resp.data.prdmaster[i].PRODNO });
                            array.push([{ value: resp.data.prdmaster[i].PRDLIN }, { value: resp.data.prdmaster[i].PRODNO }, { value: resp.data.prdmaster[i].PRDSCE }, { value: resp.data.prdmaster[i].VENDNO }, { value: resp.data.prdmaster[i].VEVCST }, { value: resp.data.prdmaster[i].NEWCST }, { value: resp.data.prdmaster[i].VRD }, { value: resp.data.prdmaster[i].VRDPER }]);
                            arrayU.push([{ value: resp.data.prdmaster[i].PRDLIN }, { value: resp.data.prdmaster[i].PRODNO }, { value: resp.data.prdmaster[i].PRDSCE }, { value: resp.data.prdmaster[i].VENDNO }, { value: resp.data.prdmaster[i].VEVCST }, { value: resp.data.prdmaster[i].NEWCST }, { value: resp.data.prdmaster[i].AVGCST }, { value: resp.data.prdmaster[i].QTYOHD }]);
                        }
                        let allPlinesResp = await axios.get("/api/all-productlines?VENDNO=" + vcode);
                        if (allPlinesResp.data.status === 200) {
                            setLines(allPlinesResp.data.plines);
                        }
                        setVendors([vline]);
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
        // if (prdline.length > 0 || vcode != 0) {
        //     generateFile();
        // }
    }, [pline, vline, filterLine, filterVendor]);

    const plineSelected = (item) => {
        setPrdline(item);
        setPline(item);
        setFlagPrdline(true);
        setPlines([]);
    }
    const vlineSelected = (item, item2) => {
        setVcode(item);
        setFlagVline(true);
        setVline(item2);
        setVlines([]);
    }
    return (
        <div>
            <div className="flex justify-between items-center font-inter mt-3">
                <div className="flex gap-10 items-center">
                    <div>
                        <Dropdown label="Pr. Lines" data={lines} display={linesFlag} setDisplay={setLinesFlag} setFilter={setFilterLine} />
                    </div>
                    <div>
                        <Dropdown label="Vendors" data={vendors} display={vendorsFlag} setDisplay={setVendorsFlag} setFilter={setFilterVendor} />
                    </div>
                    <DropdownMeasure visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} label="Measures" data={columns} display={measuresFlag} setDisplay={setMeasuresFlag} setFilter={() => { }} />
                    <Dropdown label="Company" data={[]} display="hidden" setDisplay={setCompanyFlag} setFilter={() => { }} />
                    <Dropdown label="Database" data={[]} display="hidden" setDisplay={setDatabaseFlag} setFilter={() => { }} />
                    <button className="underline py-1 text-[#614d87]">Remove Filters</button>
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
                    <label className="text-gray-900 text-sm">Pr. Lines</label>
                    <div>
                        <input id="prlines" value={pline} onChange={(e) => { setPline(e.target.value); setVline(''); setFlagPrdline(false); setFilterLine(''); setFilterVendor(''); setVcode(0); }} class="w-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />
                        {plines.length > 0 && (
                            <div className="shadow-lg p-2 bg-white text-black rounded-lg absolute mt-1 z-50">
                                {plines.map((item) => {
                                    return (
                                        <div>
                                            <option value={item.id} onClick={() => { plineSelected(item.P1LIN) }} className="text-black mt-1 text-xs cursor-pointer px-2 py-1 hover:bg-gray-100">{item.P1LIN}</option>
                                            <hr className="border-gray-300" />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                    <label className="text-gray-900 text-sm">Vendors</label>
                    <div>
                        <input id="vendors" value={vline} onChange={(e) => { setVline(e.target.value); setPline(''); setPrdline(''); setFlagVline(false); setFilterVendor(''); setFilterLine('') }} class="w-60 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />
                        {vlines.length > 0 && (
                            <div className="shadow-lg p-2 bg-white text-black rounded-lg absolute mt-1 z-50">
                                {vlines.map((item) => {
                                    return (
                                        <div>
                                            <option value={item.id} onClick={() => { vlineSelected(item.VENDOR, item.VNAME) }} className="text-black mt-1 text-xs cursor-pointer px-2 py-1 hover:bg-gray-100">{item.VNAME} {item.VCODE}</option>
                                            <hr className="border-gray-300" />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                    <label className="text-gray-900 text-sm">Purchasers</label>
                    <input type="text" className="w-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />
                </div>
                <div className="flex gap-3 items-center mr-2">
                    <button onClick={generateFile} className="bg-[#614d87] text-white px-2 py-1 text-md rounded-lg">Generate File</button>
                    <button onClick={() => { router.push('/tab-production') }} className="bg-[#614d87] text-white px-2 py-1 text-md rounded-lg">Post Tab to Production</button>
                    <button className="bg-[#614d87] text-white px-2 py-1 text-md rounded-lg">Save</button>
                </div>
            </div>
            <div className="mt-12">
                <ul className="flex gap-4">
                    <li onClick={() => { setTab(0); setBaseMeasures(measures) }}><h1 className={`${tab == 0 && 'bg-[#efedf2] text-[#8576a3] border-b-2 border-[#8576a3]'} px-3 py-2 cursor-pointer`}>Pricing</h1></li>
                    <li><h1 className={`${tab == 1 && 'bg-[#9843D0] text-white rounded-lg'} px-3 py-2 cursor-pointer`}>Code/Class</h1></li>
                    <li onClick={() => { setTab(2); setBaseMeasures(measuresU) }}><h1 className={`${tab == 2 && 'bg-[#9843D0] text-white rounded-lg'} px-3 py-2 cursor-pointer`}>UOM</h1></li>
                    <li><h1 className={`${tab == 3 && 'bg-[#9843D0] text-white rounded-lg'} px-3 py-2 cursor-pointer`}>Vendor File</h1></li>
                    <li><h1 className={`${tab == 4 && 'bg-[#9843D0] text-white rounded-lg'} px-3 py-2 cursor-pointer`}>Discount Table</h1></li>
                    <li><h1 className={`${tab == 5 && 'bg-[#9843D0] text-white rounded-lg'} px-3 py-2 cursor-pointer`}>ISC</h1></li>
                    <li><h1 className="px-3 py-2">Database</h1></li>
                    <li><h1 className="px-3 py-2">Other</h1></li>
                </ul>
                <hr className="border-gray-300" />
            </div>
            <div className="mt-10">
                {/* {tab == 0 ? <SpreadSheetData data={data} setData={setData} /> : tab == 2 ? <SpreadSheetData data={dataU} setData={setDataU} /> : null} */}
                <TableComponent initialData={initialData} visibleColumns={visibleColumns} />
            </div>
        </div>
    )
}