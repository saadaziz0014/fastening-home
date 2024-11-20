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
        vendor: "",
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
        notes: "",
    });
    const fetchPlines = async () => {
        try {
            const resp = await axios.get("/api/product-lines?txt=" + pline);
            if (resp.data.status === 200) {
                if (resp.data.plines.length == 1) {
                    setForm({ ...form, prdline: resp.data.plines[0].prdline });
                    setPline(resp.data.plines[0].prdline);
                    fetchData();
                    setPlines([]);
                }
                else
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
        setForm({ ...form, prdline: item });
        setVlines([]);
        setVline("");
        fetchData();
    }

    const fetchData = async () => {
        try {
            let resp = await axios.get(`/api/pricetracker?prdline=${pline}`);
            console.log(resp);
            if (resp.status === 200) {
                if (!resp.data.id) {
                    return
                }
                let data = resp.data;
                console.log(data);
                setForm({ ...form, ...data });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteData = async () => {
        try {
            if (form.prdline == "") {
                toast.error("Please select product line");
                return
            }
            let resp = await axios.delete(`/api/pricetracker?prdline=${form.prdline}`);
            if (resp.status == 200) {
                toast.success(resp.data.message);
                setPline("");
                setForm({
                    prdline: "",
                    vendor: "",
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
                    notes: "",
                });
            }
        } catch (error) {

        }
    }

    const addData = async () => {
        try {
            if (form.prdline == "") {
                toast.error("Please select product line");
                return
            }
            let resp = await axios.post("/api/pricetracker", form);
            if (resp.status == 200) {
                toast.success(resp.data.message);
                setPline("");
                setForm({
                    prdline: "",
                    vendor: "",
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
                    notes: "",
                });
            }
        } catch (error) {

        }
    }

    const vlineSelected = (item, item2) => {
        setVcode(item);
        setVline(item2);
        setVlines([]);
    }
    useEffect(() => {
        if (pline !== "") fetchPlines();
        // if (vline !== "") fetchVlines();
    }, [pline, vline])
    return (
        <div className="font-inter text-xs">
            <div className="flex justify-between mt-3 items-center">
                <div className="flex gap-3 items-center">
                    <label className="text-[#667085]">Pr. Line:</label>
                    <div>
                        <input id="prlines" onChange={(e) => { setPline(e.target.value); setForm({ ...form, prdline: e.target.value }) }} value={pline} className="w-64 bg-white rounded-lg border border-[#667085] block p-1.5" />
                        {plines.length > 0 && (
                            <div className="shadow-lg p-2 bg-white text-black rounded-lg absolute mt-1 z-50">
                                {plines.map((item) => {
                                    return (
                                        <div>
                                            <option value={item.id} onClick={() => { plineSelected(item.prdline) }} className="text-black mt-1 text-xs cursor-pointer px-2 py-1 hover:bg-gray-100">{item.prdline}</option>
                                            <hr className="border-gray-300" />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                    <label className="text-[#667085]">Vendor Name:</label>
                    <div>
                        <input id="vendors" onChange={(e => { setForm({ ...form, vendor: e.target.value }) })} value={form.vendor} className="w-64 bg-white rounded-lg border border-[#667085] block p-1.5" />
                        {vlines.length > 0 && (
                            <div className="shadow-lg p-2 bg-white text-black rounded-md absolute mt-1 z-50">
                                {/* {vlines.map((item) => {
                                    return (
                                        // <option value={item.id} onClick={() => { vlineSelected(item.VENDOR, item.VNAME) }} className="text-gray-900 border-b-1 border-gray-300 p-1 hover:bg-blue-900 hover:text-white">{item.P1LIN} {item.P1COD}</option>
                                    )
                                })} */}
                            </div>
                        )}

                    </div>
                </div>
                <div className="flex gap-3 items-center mr-2">
                    <button onClick={() => { addData() }} className="bg-[#614d87] text-white px-3 py-2 rounded-lg">Save</button>
                    <button onClick={() => { deleteData() }} className="bg-[#614d87] text-white px-3 py-2 rounded-lg">Delete</button>
                    <button onClick={() => {
                        setForm({
                            prdline: "",
                            status: "",
                            vendor: "",
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
                            notes: "",
                        })
                        setPline("");
                    }} className="bg-[#614d87] text-white px-3 py-2 rounded-lg">Create New</button>
                </div>
            </div>
            <div className="flex justify-between mt-8 mr-2">
                <div className="w-[66%]">
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h1 className="text-xl font-bold">Field Name</h1>
                        <h1 className="text-xl font-bold">Progress</h1>
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-lg text-[#667085]">Product Line</h2>
                        <input type="text" value={form.prdline} onChange={(e) => { setForm({ ...form, prdline: e.target.value }) }} name="prdline" className="border-0 p-1 text-lg w-[18%] bg-[#f7f8fa]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-lg text-[#667085]">Status</h2>
                        <input type="text" value={form.status} onChange={(e) => { setForm({ ...form, status: e.target.value }) }} name="status" className="border-0 p-1 w-[18%] text-lg bg-[#f7f8fa]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-lg text-[#667085]">Effective Date</h2>
                        <input type="text" value={form.effectivedate} onChange={(e) => { setForm({ ...form, effectivedate: e.target.value }) }} name="effectivedate" className="border-0 p-1 w-[18%] text-lg bg-[#f7f8fa]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-lg text-[#667085]">Promo File</h2>
                        <input type="text" value={form.promofile} onChange={(e) => { setForm({ ...form, promofile: e.target.value }) }} name="promofile" className="border-0 p-1 w-[18%] text-lg bg-[#f7f8fa]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-lg text-[#667085]">Quote File</h2>
                        <input type="text" value={form.quotefile} onChange={(e) => { setForm({ ...form, quotefile: e.target.value }) }} name="quotefile" className="border-0 p-1 w-[18%] text-lg bg-[#f7f8fa]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-lg text-[#667085]">Dead Stock</h2>
                        <input type="text" value={form.deadstock} onChange={(e) => { setForm({ ...form, deadstock: e.target.value }) }} name="deadstock" className="border-0 p-1 w-[18%] text-lg bg-[#f7f8fa]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-lg text-[#667085]">Pr Line vs Vendor#</h2>
                        <input type="text" value={form.prlinevsvendor} onChange={(e) => { setForm({ ...form, prlinevsvendor: e.target.value }) }} name="prlinevsvendor" className="border-0 p-1 w-[18%] text-lg bg-[#f7f8fa]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-lg text-[#667085]">Customer Volume Price</h2>
                        <input type="text" value={form.customervalueprice} onChange={(e) => { setForm({ ...form, customervalueprice: e.target.value }) }} name="customervalueprice" className="border-0 p-1 w-[18%] text-lg bg-[#f7f8fa]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-lg text-[#667085]">Vendor #</h2>
                        <input type="text" value={form.vendornumber} onChange={(e) => setForm({ ...form, vendornumber: e.target.value })} name="vendornumber" className="border-0 p-1 w-[18%] text-lg bg-[#f7f8fa]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-lg text-[#667085]">Special/Volume Vendor</h2>
                        <input type="text" value={form.specialvendor} onChange={(e) => setForm({ ...form, specialvendor: e.target.value })} name="specialvendor" className="border-0 p-1 w-[18%] text-lg bg-[#f7f8fa]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-lg text-[#667085]">Punch Comparison $$</h2>
                        <input type="text" value={form.punchcomparison} onChange={(e) => setForm({ ...form, punchcomparison: e.target.value })} name="punchcomparison" className="border-0 p-1 w-[18%] text-lg bg-[#f7f8fa]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-lg text-[#667085]">Frieght</h2>
                        <input type="text" value={form.freight} onChange={(e) => setForm({ ...form, freight: e.target.value })} name="freight" className="border-0 p-1 w-[18%] text-lg bg-[#f7f8fa]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-lg text-[#667085]">Search Key</h2>
                        <input type="text" value={form.searchkey} onChange={(e) => setForm({ ...form, searchkey: e.target.value })} name="searchkey" className="border-0 p-1 w-[18%] text-lg bg-[#f7f8fa]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-lg text-[#667085]">Price List Form</h2>
                        <input type="text" name="pricelistform" value={form.pricelistform} onChange={(e) => { setForm({ ...form, pricelistform: e.target.value }) }} className="border-0 p-1 w-[18%] text-lg bg-[#f7f8fa]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-lg text-[#667085]">Sabre Info</h2>
                        <input type="text" name="sabreinfo" value={form.sabreinfo} onChange={(e) => { setForm({ ...form, sabreinfo: e.target.value }) }} className="border-0 p-1 w-[18%] text-lg bg-[#f7f8fa]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                    <div className="mt-3 w-[66%] flex justify-between items-center">
                        <h2 className="text-lg text-[#667085]">Last Update</h2>
                        <input type="text" name="lastupdate" value={form.lastupdate} onChange={(e) => { setForm({ ...form, lastupdate: e.target.value }) }} className="border-0 p-1 w-[18%] text-lg bg-[#f7f8fa]" />
                    </div>
                    <hr className="border-gray-300 mt-1 w-[66%]" />
                </div>
                <div className="w-[33%] h-[800px] border border-[#667085]">
                    <h1 className=" bg-white text-lg p-3">Notes</h1>
                    <hr className="border-gray-300" />
                    <textarea className="border-0 h-[755px] w-full focus:border-none  p-3" name="notes" value={form.notes} onChange={(e) => { setForm({ ...form, notes: e.target.value }) }}></textarea>
                </div>
            </div>
            <div className="my-8 w-[33%]">
                <h1 className="text-2xl font-bold">Target List</h1>
            </div>
            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max text-slate-800">
                    <thead>
                        <tr className="text-lg text-black bg-slate-50 border-b pb-6 border-gray-300">
                            <th className="p-4">
                                <p className=" leading-none font-normal">
                                    Code
                                </p>
                            </th>
                            <th className="p-4">
                                <p className=" leading-none font-normal">
                                    Description
                                </p>
                            </th>
                            <th className="p-4">
                                <p className=" leading-none font-normal">
                                    FHI
                                </p>
                            </th>
                            <th className="p-4">
                                <p className=" leading-none font-normal">
                                    Sabre
                                </p>
                            </th>
                            <th className="p-4">
                                <p className=" leading-none font-normal">
                                    Updated Date
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-slate-50 border-b border-gray-300 pb-3">
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    01
                                </p>
                            </td>
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    ABC
                                </p>
                            </td>
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    N/A
                                </p>
                            </td>
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    N/A
                                </p>
                            </td>
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    12/12/2022
                                </p>
                            </td>
                        </tr>
                        <tr className="bg-slate-50 border-b border-gray-300 pb-3">
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    01
                                </p>
                            </td>
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    ABC
                                </p>
                            </td>
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    N/A
                                </p>
                            </td>
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    N/A
                                </p>
                            </td>
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    12/12/2022
                                </p>
                            </td>
                        </tr>
                        <tr className="bg-slate-50 border-b border-gray-300 pb-3">
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    01
                                </p>
                            </td>
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    ABC
                                </p>
                            </td>
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    N/A
                                </p>
                            </td>
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    N/A
                                </p>
                            </td>
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    12/12/2022
                                </p>
                            </td>
                        </tr>
                        <tr className="bg-slate-50 border-b border-gray-300 pb-3">
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    01
                                </p>
                            </td>
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    ABC
                                </p>
                            </td>
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    N/A
                                </p>
                            </td>
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    N/A
                                </p>
                            </td>
                            <td className="px-7 py-1">
                                <p className="text-lg">
                                    12/12/2022
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}