'use client'
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import { toast } from "react-toastify";
import axios from "axios";
import DropdownMeasure from "@/app/components/DropdownMeasure";
import Modal from "@/app/components/Modal";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/components/Loading";
const Datagrid = dynamic(
    () => import('../../components/Datagrid'),
    { ssr: false }
);
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
    { key: "productCode", label: "Product Code" },
    { key: "regionalPrice", label: "Regional Price" },
    { key: "list", label: "List Price" },
    { key: "newList", label: "New List" },
    { key: "dollarChangeList", label: "$ Dollar Change" },
    { key: "percentChangeList", label: "% Dollar Change" },
    { key: "zo9", label: "ZO9" },
    { key: "qtyOH", label: "Qty OH" },
    { key: "isc", label: "ISC" },
    { key: "stockPer", label: "Stock Per" },
    { key: "purchPer", label: "Purch Per" },
    { key: "landedCost", label: "Landed Cost" },
    { key: "pMult", label: "Purchase Multiple" },
    { key: "sMult", label: "Sell Multiple" },
    { key: "pToStock", label: "P to Stock" },
    { key: "sellUnit", label: "Sell Unit" },
    { key: "stkUnit", label: "STK Unit" },
    { key: "purUnit", label: "Pur Unit" },
    { key: "boxQty", label: "Box Quantity" },
    { key: "vname", label: "Vendor" },
    { key: "branch", label: "Branch" },
    { key: "code", label: "Code" },
    { key: "class", label: "Class" },
    { key: "group", label: "Group" },
    { key: "codeDesc", label: "Code Description" },
    { key: "classDesc", label: "Class Description" },
    { key: "groupDesc", label: "Group Description" },
    { key: "stock", label: "Stock" },
    { key: "salesFHI", label: "Sales FHI" },
    { key: "salesSabre", label: "Sales Sabre" },
    { key: "vcode", label: "Velocity Code" },
    { key: "company", label: "Company" }
];

const spreadsheetColumns = [
    { field: "srNo", filter: true, sortable: true },
    { field: "prLine", filter: true, sortable: true },
    { field: "partNumber", filter: true, sortable: true },
    { field: "description", filter: true, sortable: true },
    { field: "xRef", filter: true, sortable: true },
    { field: "productCode", filter: true, sortable: true },
    { field: "cost", filter: true, sortable: true },
    { field: "newCost", filter: true, sortable: true },
    { headerName: "$ Change", field: "dollarChange", filter: true, sortable: true },
    { headerName: "% Change", field: "percentChange", filter: true, sortable: true },
    { field: "avgCost", filter: true, sortable: true },
    { field: "regionalPrice", filter: true, sortable: true },
    { field: "list", filter: true, sortable: true },
    { field: "newList", filter: true, sortable: true },
    { headerName: "$ Change List", field: "dollarChangeList", filter: true, sortable: true },
    { headerName: "% Change List", field: "percentChangeList", filter: true, sortable: true },
    { field: "zo9", filter: true, sortable: true },
    { field: "qtyOH", filter: true, sortable: true },
    { headerName: "ISC", field: "isc", filter: true, sortable: true },
    { field: "stockPer", filter: true, sortable: true },
    { field: "purchPer", filter: true, sortable: true },
    { field: "landedCost", filter: true, sortable: true },
    { field: "pMult", filter: true, sortable: true },
    { field: "sMult", filter: true, sortable: true },
    { field: "pToStock", filter: true, sortable: true },
    { field: "sellUnit", filter: true, sortable: true },
    { field: "stkUnit", filter: true, sortable: true },
    { field: "purUnit", filter: true, sortable: true },
    { field: "boxQty", filter: true, sortable: true },
    { field: "vname", filter: true, sortable: true },
    { field: "branch", filter: true, sortable: true },
    { field: "code", filter: true, sortable: true },
    { field: "class", filter: true, sortable: true },
    { field: "group", filter: true, sortable: true },
    { field: "codeDesc", filter: true, sortable: true },
    { field: "classDesc", filter: true, sortable: true },
    { field: "groupDesc", filter: true, sortable: true },
    // { field: "stock", filter: true, sortable: true },
    { field: "salesFHI", filter: true, sortable: true },
    { field: "salesSabre", filter: true, sortable: true },
    { field: "vcode", filter: true, sortable: true },
    { field: "company", filter: true, sortable: true },
]

const pricingColumns = [
    { key: "srNo", label: "Sr. No." },
    { key: "prLine", label: "Pr. Line" },
    { key: "partNumber", label: "Part Number" },
    { key: "description", label: "Description" },
    { key: "xRef", label: "X-Ref" },
    { key: "cost", label: "Cost" },
    { key: "newCost", label: "New Cost" },
    { key: "dollarChange", label: "$ Change" },
    { key: "percentChange", label: "% Change" },
    { key: "avgCost", label: "Avg Cost" },
    { key: "productCode", label: "Product Code" },
    { key: "regionalPrice", label: "Regional Price" },
    { key: "list", label: "List Price" },
    { key: "newList", label: "New List" },
    { key: "dollarChangeList", label: "$ Dollar Change" },
    { key: "percentChangeList", label: "% Dollar Change" },
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

const codeColumns = [
    { key: "srNo", label: "Sr No" },
    { key: "prLine", label: "Pr. Line" },
    { key: "partNumber", label: "Part Number" },
    { key: "description", label: "Description" },
    { key: "code", label: "Code" },
    { key: "class", label: "Class" },
    { key: "group", label: "Group" },
    { key: "isc", label: "ISC" },
    { key: "codeDesc", label: "Code Description" },
    { key: "classDesc", label: "Class Description" },
    { key: "groupDesc", label: "Group Description" },
]

const uomColumns = [
    { key: "srNo", label: "Sr No" },
    { key: "prLine", label: "Pr. Line" },
    { key: "partNumber", label: "Part Number" },
    { key: "description", label: "Description" },
    { key: "cost", label: "Cost" },
    { key: "newCost", label: "New Cost" },
    { key: "avgCost", label: "Avg Cost" },
    { key: "qtyOH", label: "Qty OH" },
    { key: "purchPer", label: "Purch %" },
    { key: "stockPer", label: "Stock %" },
    { key: "pMult", label: "Purchase Multiple" },
    { key: "sMult", label: "Sell Multiple" },
    { key: "stock", label: "Stock" },
    { key: "pToStock", label: "P to Stock" },
    { key: "sellUnit", label: "Sell Unit" },
    { key: "stkUnit", label: "STK Unit" },
    { key: "purUnit", label: "Pur Unit" },
    { key: "boxQty", label: "Box Quantity" },
]

const iscColumns = [
    { key: "srNo", label: "Sr No" },
    { key: "prLine", label: "Pr. Line" },
    { key: "partNumber", label: "Part Number" },
    { key: "description", label: "Description" },
    { key: "isc", label: "ISC" },
    { key: "qtyOH", label: "Qty OH" },
    { key: "salesFHI", label: "Sales FHI" },
    { key: "salesSabre", label: "Sales Sabre" },
    { key: "vcode", label: "Velocity Code" }
]

const otherColumns = [
    { key: "srNo", label: "Sr No" },
    { key: "prLine", label: "Pr. Line" },
    { key: "partNumber", label: "Part Number" },
]

export default function WorkFile() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState(
        pricingColumns.map((col) => col.key)
    );
    const [visibleColumnsC, setVisibleColumnsC] = useState(
        codeColumns.map((col) => col.key)
    )
    const [visibleColumnsU, setVisibleColumnsU] = useState(
        uomColumns.map((col) => col.key)
    )
    const [visibleColumnsI, setVisibleColumnsI] = useState(
        iscColumns.map((col) => col.key)
    )
    const [visibleColumnsO, setVisibleColumnsO] = useState(
        otherColumns.map((col) => col.key)
    )
    const [visibleColumnsV, setVisibleColumnsV] = useState();
    const [namef, setName] = useState("");
    const [pline, setPline] = useState("");
    const [vline, setVline] = useState("");
    const [excelData, setExcelData] = useState([]);
    const [mainExcelData, setMainExcelData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [modalDisplay, setModalDisplay] = useState(false);
    const [workFileName, setWorkFileName] = useState("");
    const [prdline, setPrdline] = useState("");
    const [vcode, setVcode] = useState(0);
    const [plines, setPlines] = useState([]);
    const [vlines, setVlines] = useState([]);
    const [flagPrdline, setFlagPrdline] = useState(false);
    const [flagVline, setFlagVline] = useState(false);
    const [lines, setLines] = useState([]);
    const [tab, setTab] = useState(0);
    const [vendors, setVendors] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [measures, setMeasures] = useState(["Pr. Line", "Part Number", "Description", "Vendor", "Cost", "New Cost", "Variance$", "Variance%"]);
    const [measuresU, setMeasuresU] = useState(["Pr. Line", "Part Number", "Description", "Cost", "New Cost", "Average Cost", "Qty OH"]);
    const [baseMeasures, setBaseMeasures] = useState(measures);
    const [databases, setDatabases] = useState(["Quote File", "Promo File", "Volume", "Search Keys", "Vendor Cross", "Product Cross", "Branch Pricing", "Code2"]);
    const [vendorsFlag, setVendorsFlag] = useState("hidden");
    const [linesFlag, setLinesFlag] = useState("hidden");
    const [addColFlag, setAddColFlag] = useState(false);
    const [measuresFlag, setMeasuresFlag] = useState("hidden");
    const [databaseFlag, setDatabaseFlag] = useState("hidden");
    const [companyFlag, setCompanyFlag] = useState("hidden");
    const [filterLine, setFilterLine] = useState("");
    const [filterVendor, setFilterVendor] = useState("");
    const [state, setState] = useState('ALL');
    const [columnV, setColumnV] = useState([]);
    const [selectedPlines, setSelectedPlines] = useState([]);
    const [selectedVendors, setSelectedVendors] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedStock, setSelectedStock] = useState("ALL");
    const handleToggle = () => {
        setState((prevState) => {
            if (prevState === 'OH') return 'ALL';
            if (prevState === 'ALL') return 'NONE';
            return 'OH';
        });
        setSelectedStock((prevState) => {
            if (prevState === 'OH') return 'ALL';
            if (prevState === 'ALL') return 'NONE';
            return 'OH';
        })
    };
    const fetchPlines = async () => {
        try {
            const resp = await axios.get("/api/product-linez?txt=" + pline);
            if (resp.data.status === 200) {
                if (resp.data.plines.length == 1) {
                    plineSelected(resp.data.plines[0].PRDLIN);
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
                if (resp.data.vlines.length == 1) {
                    vlineSelected(resp.data.vlines[0].VENDOR, resp.data.vlines[0].VNAME);
                }
                else
                    setVlines(resp.data.vlines);
            }
        } catch (err) {
            toast.error("Something went wrong in vendor lines")
        }
    }
    const generateFile = async () => {
        try {
            setLoading(true);
            if (prdline.length > 0 || vcode != 0) {
                if (prdline.length > 0) {
                    let resp = await axios.get("/api/product-master?pline=" + prdline);
                    if (resp.data.status === 200) {
                        let length = resp.data.prdmaster.length;
                        let data = [];
                        for (let i = 0; i < length; i++) {
                            data.push({ id: resp.data.prdmaster[i].id, prLine: resp.data.prdmaster[i].PRDLIN, partNumber: resp.data.prdmaster[i].PRODNO, description: resp.data.prdmaster[i].PRDSCE, cost: resp.data.prdmaster[i].VEVCST, newCost: resp.data.prdmaster[i].NEWCST, dollarChange: resp.data.prdmaster[i].VRD, percentChange: resp.data.prdmaster[i].VRDPER, avgCost: resp.data.prdmaster[i].AVGCST, productCode: resp.data.prdmaster[i].PRDCDE, qtyOH: resp.data.prdmaster[i].QTYOHD, list: resp.data.prdmaster[i].LISTPR, isc: resp.data.prdmaster[i].PMINVC, stockPer: resp.data.prdmaster[i].QBRKCD, purchPer: resp.data.prdmaster[i].PMPPER, pMult: resp.data.prdmaster[i].PMPMLT, sMult: resp.data.prdmaster[i].PMSMLT, pToStock: resp.data.prdmaster[i].PMCONV, sellUnit: resp.data.prdmaster[i].SELUNT, stkUnit: resp.data.prdmaster[i].STKUNT, purUnit: resp.data.prdmaster[i].PURUNT, boxQty: resp.data.prdmaster[i].PMQCAR, vname: resp.data.prdmaster[i].VNAME, branch: resp.data.prdmaster[i].BRANCH, code: resp.data.prdmaster[i].PRDCDE, class: resp.data.prdmaster[i].PMCLAS, group: resp.data.prdmaster[i].PMGRP, classDesc: resp.data.prdmaster[i].PMCLSDESC, groupDesc: resp.data.prdmaster[i].PMGRPDESC, stock: resp.data.prdmaster[i].QBRKCD, vcode: resp.data.prdmaster[i].VELCOD, company: resp.data.prdmaster[i].COMPANY, qtyCOM: resp.data.prdmaster[i].QTYCOM, salesFHI: resp.data.prdmaster[i].salesFHI, salesSabre: resp.data.prdmaster[i].salesSabre, srNo: resp.data.prdmaster[i].srNo, avgCostFhi: resp.data.prdmaster[i].AVGCSTFHI, avgCostSabre: resp.data.prdmaster[i].AVGCSTSABRE, avgCostAll: resp.data.prdmaster[i].AVGCST });
                        }
                        if (length > 0) {
                            setMainExcelData(data);
                            setExcelData(data);
                            setStockData(data);
                        }
                        let allVendorsResp = await axios.get("/api/all-vendors?PRDLIN=" + prdline);
                        if (allVendorsResp.data.status === 200) {
                            setVendors(allVendorsResp.data.vendors);
                            setSelectedVendors(allVendorsResp.data.vendors);
                        }
                        setCompanies(["FHI", "Sabre"])
                        setLines([prdline]);
                        setSelectedPlines([prdline]);
                        setSelectedCompanies(["FHI", "Sabre"]);
                    } else {
                        toast.error("Something went wrong in generating file")
                    }
                }
                else if (vcode != 0) {
                    let resp = await axios.get("/api/product-master?vendor=" + String(vcode));
                    if (resp.data.status === 200) {
                        let length = resp.data.prdmaster.length;
                        let data = [];
                        for (let i = 0; i < length; i++) {
                            data.push({ id: resp.data.prdmaster[i].id, prLine: resp.data.prdmaster[i].PRDLIN, partNumber: resp.data.prdmaster[i].PRODNO, description: resp.data.prdmaster[i].PRDSCE, cost: resp.data.prdmaster[i].VEVCST, newCost: resp.data.prdmaster[i].NEWCST, dollarChange: resp.data.prdmaster[i].VRD, percentChange: resp.data.prdmaster[i].VRDPER, avgCost: resp.data.prdmaster[i].AVGCST, productCode: resp.data.prdmaster[i].PRDCDE, qtyOH: resp.data.prdmaster[i].QTYOHD, list: resp.data.prdmaster[i].LISTPR, isc: resp.data.prdmaster[i].PMINVC, stockPer: resp.data.prdmaster[i].QBRKCD, purchPer: resp.data.prdmaster[i].PMPPER, pMult: resp.data.prdmaster[i].PMPMLT, sMult: resp.data.prdmaster[i].PMSMLT, pToStock: resp.data.prdmaster[i].PMCONV, sellUnit: resp.data.prdmaster[i].SELUNT, stkUnit: resp.data.prdmaster[i].STKUNT, purUnit: resp.data.prdmaster[i].PURUNT, boxQty: resp.data.prdmaster[i].PMQCAR, vname: resp.data.prdmaster[i].VNAME, branch: resp.data.prdmaster[i].BRANCH, code: resp.data.prdmaster[i].PRDCDE, class: resp.data.prdmaster[i].PMCLAS, group: resp.data.prdmaster[i].PMGRP, classDesc: resp.data.prdmaster[i].PMCLSDESC, groupDesc: resp.data.prdmaster[i].PMGRPDESC, stock: resp.data.prdmaster[i].QBRKCD, vcode: resp.data.prdmaster[i].VELCOD, company: resp.data.prdmaster[i].COMPANY, qtyCOM: resp.data.prdmaster[i].QTYCOM, salesFHI: resp.data.prdmaster[i].salesFHI, salesSabre: resp.data.prdmaster[i].salesSabre, srNo: resp.data.prdmaster[i].srNo, avgCostFhi: resp.data.prdmaster[i].AVGCSTFHI, avgCostSabre: resp.data.prdmaster[i].AVGCSTSABRE, avgCostAll: resp.data.prdmaster[i].AVGCST });
                        }
                        if (length > 0) {
                            setExcelData(data);
                            setMainExcelData(data);
                            setStockData(data);
                        }
                        let allPlinesResp = await axios.get("/api/all-productlines?VENDNO=" + vcode);
                        if (allPlinesResp.data.status === 200) {
                            setLines(allPlinesResp.data.plines);
                            setSelectedPlines(allPlinesResp.data.plines);
                        }
                        setCompanies(["FHI", "Sabre"])
                        setVendors([vline]);
                        setSelectedVendors([vline]);
                        setSelectedCompanies(["FHI", "Sabre"]);
                    } else {
                        toast.error("Something went wrong in generating file")
                    }
                }
            } else {
                toast.error("Please select a product line or a vendor line")
            }
            setLoading(false);
        } catch (error) {
            // console.log(error)
            toast.error("Something went wrong in generating file")
        }
    }
    const fetchData = async () => {
        try {
            setLoading(true);
            let resp = await axios.get("/api/work-file/details?name=" + name);
            if (resp.status == 200) {
                let data = resp.data.data;
                let keys = Object.keys(data[0]);
                let newCols = []
                for (let i = 0; i < keys.length; i++) {
                    newCols.push({
                        field: keys[i],
                        sortable: true,
                        filter: true
                    })
                }
                //i want not to replace the existing keys, just add the new ones
                let spreadsheetColumnz = [
                    ...spreadsheetColumns,
                    ...newCols.filter(
                        (newCol) => !spreadsheetColumns.some((col) => col.field === newCol.field)
                    ),
                ];
                let distinctPrLines = [...new Set(data.map(item => item.prLine))];
                let distinctVendors = [...new Set(data.map(item => item.vname))];
                setLines(distinctPrLines);
                setVendors(distinctVendors);
                setSelectedPlines(distinctPrLines);
                setSelectedVendors(distinctVendors);
                setCompanies(["FHI", "Sabre"])
                setColumnV(spreadsheetColumnz);
                setVisibleColumnsV(keys);
                setExcelData(data);
                setMainExcelData(data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error, "hj")
            toast.error("Something went wrong in fetching data")
        }
    }

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
    const workFileAdd = async () => {
        try {
            if (mainExcelData.length > 0 && workFileName.length > 0) {
                let resp = await axios.post("/api/work-file", { data: excelData, fileName: workFileName });
                if (resp.data.status === 200) {
                    toast.success(resp.data.message);
                    setModalDisplay(false);
                }
                setWorkFileName("");
                setModalDisplay(false);
            }
            else {
                toast.error("Please add data and enter a file name")
            }
            return
        } catch (error) {
            setModalDisplay(false);
            toast.error("Something went wrong in saving file")
        }
    }
    const handleStock = () => {
        if (state == "OH") {
            let updatedData = mainExcelData.filter((item) => item.qtyOH != undefined && item.qtyOH != null && Number(item.qtyOH) != 0);
            updatedData = updatedData.filter((item) => selectedVendors.includes(item.vname));
            updatedData = updatedData.filter((item) => selectedPlines.includes(item.prLine));
            if (selectedCompanies.length == 1) {
                if (selectedCompanies[0] == "FHI") {
                    updatedData = updatedData.map((item) => {
                        return {
                            ...item,
                            avgCost: item.avgCostFhi
                        }
                    })
                }
                else if (selectedCompanies[0] == "Sabre") {
                    updatedData = updatedData.map((item) => {
                        return {
                            ...item,
                            avgCost: item.avgCostSabre
                        }
                    })
                }
            }
            else if (selectedCompanies.length == 0) {
                updatedData = updatedData.map((item) => {
                    return {
                        ...item,
                        avgCost: null
                    }
                })
            } else if (selectedCompanies.length == 2) {
                updatedData = updatedData.map((item) => {
                    return {
                        ...item,
                        avgCost: item.avgCostAll
                    }
                })
            }
            setExcelData(updatedData);
        } else if (state == "NONE") {
            let updatedData = mainExcelData.filter((item) => item.qtyOH == undefined || Number(item.qtyOH) == 0 || item.qtyOH == null);
            updatedData = updatedData.filter((item) => selectedVendors.includes(item.vname));
            updatedData = updatedData.filter((item) => selectedPlines.includes(item.prLine));
            if (selectedCompanies.length == 1) {
                if (selectedCompanies[0] == "FHI") {
                    updatedData = updatedData.map((item) => {
                        return {
                            ...item,
                            avgCost: item.avgCostFhi
                        }
                    })
                }
                else if (selectedCompanies[0] == "Sabre") {
                    updatedData = updatedData.map((item) => {
                        return {
                            ...item,
                            avgCost: item.avgCostSabre
                        }
                    })
                }
            }
            else if (selectedCompanies.length == 0) {
                updatedData = updatedData.map((item) => {
                    return {
                        ...item,
                        avgCost: null
                    }
                })
            } else if (selectedCompanies.length == 2) {
                updatedData = updatedData.map((item) => {
                    return {
                        ...item,
                        avgCost: item.avgCostAll
                    }
                })
            }
            setExcelData(updatedData);
        } else if (state == "ALL") {
            let updatedData = mainExcelData.filter((item) => selectedVendors.includes(item.vname));
            updatedData = updatedData.filter((item) => selectedPlines.includes(item.prLine));
            if (selectedCompanies.length == 1) {
                if (selectedCompanies[0] == "FHI") {
                    updatedData = updatedData.map((item) => {
                        return {
                            ...item,
                            avgCost: item.avgCostFhi
                        }
                    })
                }
                else if (selectedCompanies[0] == "Sabre") {
                    updatedData = updatedData.map((item) => {
                        return {
                            ...item,
                            avgCost: item.avgCostSabre
                        }
                    })
                }
            }
            else if (selectedCompanies.length == 0) {
                updatedData = updatedData.map((item) => {
                    return {
                        ...item,
                        avgCost: null
                    }
                })
            } else {
                updatedData = updatedData.map((item) => {
                    return {
                        ...item,
                        avgCost: item.avgCostAll
                    }
                })
            }
            setExcelData(updatedData);
        }
    }
    useEffect(() => {
        setPlines([])
        setVlines([])
        selectedPlines.length > 0 || selectedVendors.length > 0 ? handleStock() : null
        if (name) {
            // setTab(3);
            setName(name);
            mainExcelData.length == 0 ? fetchData() : setLoading(false);
        }
        if (!flagPrdline && pline.length > 2) {
            fetchPlines();
        }
        if (!flagVline && vline.length > 2) {
            fetchVlines();
        }
        // if (prdline.length > 0 || vcode != 0) {
        //     generateFile();
        // }
    }, [pline, vline, loading, state]);
    if (!loading) {
        return (
            <div>
                <div className="flex justify-between items-center font-inter mt-3">
                    <div className="flex gap-10 items-center">
                        <div>
                            <Dropdown selectedCompanies={selectedCompanies} setSelectedCompanies={setSelectedCompanies} mainData={mainExcelData} label="Pr. Lines" type="prdline" initialData={mainExcelData} setInitialData={setExcelData} data={lines} display={linesFlag} setDisplay={setLinesFlag} selectedPlines={selectedPlines} setSelectedPlines={setSelectedPlines} selectedVendors={selectedVendors} setSelectedVendors={setSelectedVendors} selectedStock={selectedStock} />
                        </div>
                        <div>
                            <Dropdown selectedCompanies={selectedCompanies} setSelectedCompanies={setSelectedCompanies} mainData={mainExcelData} label="Vendors" type="vline" initialData={mainExcelData} setInitialData={setExcelData} data={vendors} display={vendorsFlag} setDisplay={setVendorsFlag} selectedPlines={selectedPlines} setSelectedPlines={setSelectedPlines} selectedVendors={selectedVendors} setSelectedVendors={setSelectedVendors} selectedStock={selectedStock} />
                        </div>
                        {
                            tab == 0 ? <DropdownMeasure visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} label="Measures" display={measuresFlag} setDisplay={setMeasuresFlag} />
                                : tab == 1 ? <DropdownMeasure visibleColumns={visibleColumnsC} setVisibleColumns={setVisibleColumnsC} label="Measures" data={columns} display={measuresFlag} setDisplay={setMeasuresFlag} />
                                    : tab == 2 ? <DropdownMeasure visibleColumns={visibleColumnsU} setVisibleColumns={setVisibleColumnsU} label="Measures" data={columns} display={measuresFlag} setDisplay={setMeasuresFlag} />
                                        : tab == 3 ? <DropdownMeasure visibleColumns={visibleColumnsV} setVisibleColumns={setVisibleColumnsV} label="Measures" data={columnV} display={measuresFlag} setDisplay={setMeasuresFlag} />
                                            : tab == 5 ? <DropdownMeasure visibleColumns={visibleColumnsI} setVisibleColumns={setVisibleColumnsI} label="Measures" data={columns} display={measuresFlag} setDisplay={setMeasuresFlag} />
                                                : tab == 7 ? <DropdownMeasure visibleColumns={visibleColumnsO} setVisibleColumns={setVisibleColumnsO} label="Measures" data={columns} display={measuresFlag} setDisplay={setMeasuresFlag} />
                                                    : null
                        }
                        <Dropdown selectedCompanies={selectedCompanies} setSelectedCompanies={setSelectedCompanies} label="Company" type="company" mainData={mainExcelData} data={companies} display={companyFlag} setDisplay={setCompanyFlag} initialData={mainExcelData} setInitialData={setExcelData} selectedPlines={selectedPlines} setSelectedPlines={setSelectedPlines} selectedVendors={selectedVendors} setSelectedVendors={setSelectedVendors} selectedStock={selectedStock} />
                        <Dropdown label="Database" type="database" data={databases} display={databaseFlag} setDisplay={setDatabaseFlag} initialData={mainExcelData} setInitialData={setExcelData} />
                        <button onClick={() => setExcelData(mainExcelData)} className="underline py-1 text-[#614d87]">Remove Filters</button>
                    </div>
                    <div className="flex gap-1 items-center mr-2">
                        {/* <h1>Stock</h1> */}
                        {/* <div
                            className={`relative inline-flex items-center h-6 w-11 cursor-pointer rounded-full transition-colors duration-300 ${enabled ? "bg-[#614d87]" : "bg-gray-300"
                                }`}
                            onClick={() => handleStock()}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${enabled ? "translate-x-5" : "translate-x-1"
                                    }`}
                            />
                        </div> */}
                        <div
                            className="relative text-xs w-36 h-10 bg-gray-200 rounded-full flex items-center cursor-pointer"
                            onClick={handleToggle}
                        >
                            {/* The slider */}
                            <div
                                className={`absolute w-10 h-10 p-2 rounded-full transition-all duration-300 ${state === 'ALL'
                                    ? 'bg-white text-black font-bold left-2 p-1'
                                    : state === 'NONE'
                                        ? 'bg-black text-white font-bold right-2 p-1'
                                        : 'bg-gray-500 p-1 font-bold left-1/2 transform -translate-x-1/2'
                                    }`}
                            ></div>

                            {/* Labels */}
                            <div className="absolute left-3 text-xs text-black">ALL</div>
                            <div className="absolute right-3 text-xs text-white">NONE</div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 text-xs text-black">
                                OH
                            </div>
                        </div>


                        <div>
                            <button className="bg-white p-2 rounded-lg">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.5 11.5V14.8333C16.5 15.2754 16.3244 15.6993 16.0118 16.0118C15.6993 16.3244 15.2754 16.5 14.8333 16.5H3.16667C2.72464 16.5 2.30072 16.3244 1.98816 16.0118C1.67559 15.6993 1.5 15.2754 1.5 14.8333V11.5M4.83333 7.33333L9 11.5M9 11.5L13.1667 7.33333M9 11.5V1.5" stroke="#344054" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="w-64 px-2">
                            <div className="relative">
                                <span className="absolute text-black top-5 left-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>

                                </span>
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for Trades" className="bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer" name />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between mt-2 items-center">
                    <div className="flex gap-3 items-center">
                        <label className="text-gray-900 text-sm">Pr. Lines</label>
                        <div>
                            <input id="prlines" value={pline} onChange={(e) => { setPline(e.target.value); setVline(''); setFlagPrdline(false); setFilterLine(''); setFilterVendor(''); setVcode(0); }} class="w-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" />
                            {plines.length > 0 && (
                                <div className="shadow-lg p-2 bg-white text-black rounded-lg absolute mt-1 z-50">
                                    {plines.map((item) => {
                                        return (
                                            <div key={item.id}>
                                                <option value={item.id} onClick={() => { plineSelected(item.PRDLIN) }} className="text-black mt-1 text-xs cursor-pointer px-2 py-1 hover:bg-gray-100">{item.PRDLIN}</option>
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
                                            <div key={item.id}>
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
                        <button className="bg-[#614d87] text-white px-2 py-1 text-md rounded-lg">Post Tab to Production</button>
                        <button onClick={() => setModalDisplay(true)} className="bg-[#614d87] text-white px-2 py-1 text-md rounded-lg">Save</button>
                    </div>
                </div>
                <div className="mt-3">
                    <ul className="flex gap-4">
                        <li onClick={() => { setTab(0); setBaseMeasures(measures) }}><h1 className={`${tab == 0 && 'bg-[#efedf2] text-[#8576a3] border-b-2 border-[#8576a3]'} px-3 py-2 cursor-pointer`}>Pricing</h1></li>
                        <li onClick={() => { setTab(1); setBaseMeasures(measures) }}><h1 className={`${tab == 1 && 'bg-[#efedf2] text-[#8576a3] border-b-2 border-[#8576a3]'} px-3 py-2 cursor-pointer`}>Code/Class</h1></li>
                        <li onClick={() => { setTab(2); setBaseMeasures(measuresU) }}><h1 className={`${tab == 2 && 'bg-[#efedf2] text-[#8576a3] border-b-2 border-[#8576a3]'} px-3 py-2 cursor-pointer`}>UOM</h1></li>
                        <li ><h1 className={`${tab == 3 && 'bg-[#efedf2] text-[#8576a3] border-b-2 border-[#8576a3]'} px-3 py-2 cursor-pointer'} px-3 py-2 cursor-pointer`}>Vendor File</h1></li>
                        <li><h1 className={`${tab == 4 && 'bg-[#9843D0] text-white rounded-lg'} px-3 py-2 cursor-pointer`}>Discount Table</h1></li>
                        <li onClick={() => { setTab(5); setBaseMeasures(measures) }}><h1 className={`${tab == 5 && 'bg-[#efedf2] text-[#8576a3] border-b-2 border-[#8576a3]'} px-3 py-2 cursor-pointer'} px-3 py-2 cursor-pointer`}>ISC</h1></li>
                        <li><h1 className={`${tab == 6 && 'bg-[#9843D0] text-white rounded-lg'} px-3 py-2 cursor-pointer`}>Database</h1></li>
                        <li onClick={() => { setTab(7); setBaseMeasures(measures) }}><h1 className={`${tab == 7 && 'bg-[#efedf2] text-[#8576a3] border-b-2 border-[#8576a3]'} px-3 py-2 cursor-pointer`}>Other</h1></li>
                        <button onClick={(e) => setAddColFlag(!addColFlag)} className="bg-[#614d87] mb-1 text-white px-2 py-1 text-md rounded-lg">Add Column</button>
                    </ul>
                    <hr className="border-gray-300" />
                </div>
                <div className="mt-3">
                    {tab == 0 ? <Datagrid data={excelData} setData={setExcelData} visibleColumns={visibleColumns} search={search} columns={spreadsheetColumns} name={namef} addColFlag={addColFlag} setAddColFlag={setAddColFlag} />
                        : tab == 1 ? <Datagrid data={excelData} setData={setExcelData} visibleColumns={visibleColumnsC} search={search} columns={spreadsheetColumns} name={namef} addColFlag={addColFlag} setAddColFlag={setAddColFlag} />
                            : tab == 2 ? <Datagrid data={excelData} setData={setExcelData} visibleColumns={visibleColumnsU} search={search} columns={spreadsheetColumns} name={namef} addColFlag={addColFlag} setAddColFlag={setAddColFlag} />
                                : tab == 3 ? <Datagrid data={excelData} setData={setExcelData} visibleColumns={visibleColumnsV} search={search} columns={columnV} name={namef} addColFlag={addColFlag} setAddColFlag={setAddColFlag} />
                                    : tab == 5 ? <Datagrid data={excelData} setData={setExcelData} visibleColumns={visibleColumnsI} search={search} columns={spreadsheetColumns} name={namef} addColFlag={addColFlag} setAddColFlag={setAddColFlag} /> :
                                        tab == 7 ? <Datagrid data={excelData} setData={setExcelData} visibleColumns={visibleColumnsO} search={search} columns={spreadsheetColumns} name={namef} addColFlag={addColFlag} setAddColFlag={setAddColFlag} /> : null}
                    {/* <Handontable cols={dataCols} data={excelData} /> */}
                    {/* <HandsontableExample /> */}
                    {/* {tab == 0 ? <SpreadSheetData data={data} setData={setData} /> : tab == 2 ? <SpreadSheetData data={dataU} setData={setDataU} /> : null} */}
                    {/* {tab == 0 ? <TableComponent initialData={initialData} visibleColumns={visibleColumns} />
                        : tab == 1 ? <TableComponent initialData={initialData} visibleColumns={visibleColumnsC} />
                            : tab == 2 ? <TableComponent initialData={initialData} visibleColumns={visibleColumnsU} />
                                : tab == 5 ? <TableComponent initialData={initialData} visibleColumns={visibleColumnsI} /> : null} */}
                </div>
                <Modal display={modalDisplay} onCancel={() => setModalDisplay(false)} onConfirm={workFileAdd} name={workFileName} setName={setWorkFileName} />
            </div>
        )
    }
    else {
        return (
            <Loading />
        )
    }
}