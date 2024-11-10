'use client';
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export default function TabProduction() {
    const [pline, setPline] = useState("");
    const [vline, setVline] = useState("");
    const [plines, setPlines] = useState([]);
    const [vlines, setVlines] = useState([]);
    const [vcode, setVcode] = useState(0);
    const [form, setForm] = useState({
        prdline: "",
        status: "",
        effectivedate: "",
        promofile: "",
        quotefile: "",
        deadstock: "",
        prlinevsvendor: "",
        customervalueprice: "",
        vendornumber: "",
        specialvendor: "",
        punchcomparison: "",
        freight: "",
        searchkey: "",
        pricelistform: "",
        sabreinfo: "",
    });
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
    const plineSelected = (item) => {
        setPline(item);
        setPlines([]);
    }
    const vlineSelected = (item, item2) => {
        setVcode(item);
        setVline(item2);
        setVlines([]);
    }
    useEffect(() => {
        if (pline !== "") fetchPlines();
        if (vline !== "") fetchVlines();
    }, [pline, vline])
    return (
        <div>
            <div className="flex justify-between mt-1 items-center">
                <div className="flex gap-3 items-center">
                    <label className="text-gray-900 font-medium">Pr. Line</label>
                    <div>
                        <input id="prlines" onChange={(e) => { setPline(e.target.value); setVlines([]); setVline("") }} value={pline} className="w-64 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />
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
                    <label className="text-gray-900 font-medium">Vendor Name</label>
                    <div>
                        <input id="vendors" onChange={(e) => { setVline(e.target.value); setPlines([]); setPline(""); }} value={vline} className="w-64 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />
                        {vlines.length > 0 && (
                            <div className="border border-black p-2 bg-gray-300 absolute mt-1 z-50">
                                {vlines.map((item) => {
                                    return (
                                        <option value={item.id} onClick={() => { vlineSelected(item.VENDOR, item.VNAME) }} className="text-gray-900 border-b-1 border-gray-300 p-1 hover:bg-blue-900 hover:text-white">{item.P1LIN} {item.P1COD}</option>
                                    )
                                })}
                            </div>
                        )}

                    </div>
                </div>
                <div className="flex gap-3 items-center mr-2">
                    <button className="bg-[#9843D0] text-white px-3 py-2 rounded-lg">Save</button>
                    <button className="bg-[#9843D0] text-white px-3 py-2 rounded-lg">Delete</button>
                    <button className="bg-[#9843D0] text-white px-3 py-2 rounded-lg">Create New</button>
                </div>
            </div>
            <div className="flex justify-between mt-2 mr-2">
                <div className="w-[66%]">
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h1 className="text-lg font-bold">Field Name</h1>
                        <h1 className="text-lg font-bold">Progress</h1>
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-sm">Product Line</h2>
                        <input type="text" value={form.prdline} onChange={(e) => { setForm({ ...form, prdline: e.target.value }) }} name="prdline" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[40%]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-sm">Status</h2>
                        <input type="text" value={form.status} onChange={(e) => { setForm({ ...form, status: e.target.value }) }} name="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[40%]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-sm">Effective Date</h2>
                        <input type="text" value={form.effectivedate} onChange={(e) => { setForm({ ...form, effectivedate: e.target.value }) }} name="effectivedate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[40%]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-sm">Promo File</h2>
                        <input type="text" value={form.promofile} onChange={(e) => { setForm({ ...form, promofile: e.target.value }) }} name="promofile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[40%]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-sm">Quote File</h2>
                        <input type="text" value={form.quotefile} onChange={(e) => { setForm({ ...form, quotefile: e.target.value }) }} name="quotefile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[40%]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-sm">Dead Stock</h2>
                        <input type="text" value={form.deadstock} onChange={(e) => { setForm({ ...form, deadstock: e.target.value }) }} name="deadstock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[40%]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-sm">Pr Line vs Vendor#</h2>
                        <input type="text" value={form.prlinevsvendor} onChange={(e) => { setForm({ ...form, prlinevsvendor: e.target.value }) }} name="prlinevsvendor" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[40%]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-sm">Customer Volume Price</h2>
                        <input type="text" value={form.customervalueprice} onChange={(e) => { setForm({ ...form, customervalueprice: e.target.value }) }} name="customervalueprice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[40%]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-sm">Vendor #</h2>
                        <input type="text" value={form.vendornumber} onChange={(e) => setForm({ ...form, vendornumber: e.target.value })} name="vendornumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[40%]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-sm">Special/Volume Vendor</h2>
                        <input type="text" value={form.specialvendor} onChange={(e) => setForm({ ...form, specialvendor: e.target.value })} name="specialvendor" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[40%]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-sm">Punch Comparison $$</h2>
                        <input type="text" value={form.punchcomparison} onChange={(e) => setForm({ ...form, punchcomparison: e.target.value })} name="punchcomparison" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[40%]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-sm">Frieght</h2>
                        <input type="text" value={form.freight} onChange={(e) => setForm({ ...form, freight: e.target.value })} name="freight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[40%]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-sm">Search Key</h2>
                        <input type="text" value={form.searchkey} onChange={(e) => setForm({ ...form, searchkey: e.target.value })} name="searchkey" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[40%]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-sm">Price List Form</h2>
                        <input type="text" name="pricelistform" value={form.pricelistform} onChange={(e) => { setForm({ ...form, pricelistform: e.target.value }) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[40%]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-sm">Sabre Info</h2>
                        <input type="text" name="sabreinfo" value={form.sabreinfo} onChange={(e) => { setForm({ ...form, sabreinfo: e.target.value }) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[40%]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-sm">Last Update</h2>
                        <input type="text" name="lastupdate" value={form.lastupdate} onChange={(e) => { setForm({ ...form, lastupdate: e.target.value }) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[40%]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                </div>
                <div className="w-[33%] bg-white">
                    <h1 className="text-lg p-3">Notes</h1>
                    <hr className="border-gray-300" />
                    <p className="p-2">lorem ipsum</p>
                </div>
            </div>
            <div className="mt-3 w-[33%]">
                <h1 className="text-lg font-bold">Target List</h1>
            </div>
            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max text-slate-800">
                    <thead>
                        <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Code
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Description
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    FHI
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Sabre
                                </p>
                            </th>
                            <th className="p-4">
                                <p className="text-sm leading-none font-normal">
                                    Updated Date
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-slate-50">
                            <td className="p-4">
                                <p className="text-sm font-bold">
                                    Project Alpha
                                </p>
                            </td>
                            <td className="p-4">
                                <p className="text-sm">
                                    01/01/2024
                                </p>
                            </td>
                            <td className="p-4">
                                <p className="text-sm">
                                    30/06/2024
                                </p>
                            </td>
                            <td className="p-4">
                                <p className="text-sm">
                                    John Michael
                                </p>
                            </td>
                            <td className="p-4">
                                <p className="text-sm">
                                    $50,000
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}