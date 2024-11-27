'use client'
import ReactPaginate from "react-paginate";
import Table from "../../components/Table";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
export default function UpdateMenu() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [data, setData] = useState([]);
    const [tab, setTab] = useState(1);
    const fetchData = async () => {
        try {
            let resp = await axios.get(`/api/work-file?page=${page}&tab=${tab}`);
            if (resp.status === 200) {
                setData(resp.data.data);
                setTotal(resp.data.total);
                setTotalPages(resp.data.totalPages);
            }
        } catch (error) {
            toast.error("Something went wrong in fetching data");
        }
    }
    useEffect(() => {
        fetchData();
    }, [page, tab]);
    const handlePageChange = (selectedPage) => {
        console.log(selectedPage);
        setPage(selectedPage.selected + 1); // `selected` is the index of the selected page (0-based).
    };
    return (
        <div className="bg-[#F8F9FB] font-inter">
            <div className="mt-5">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold">Update Menu</h1>
                        <p className="text-sm text-[#667085]">View your terms transaction and trades</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-[#614d87] h-10 rounded-lg text-white px-3">Add New Price File</button>
                        <button className="bg-[#614d87] h-10 rounded-lg text-white px-3" onClick={() => { router.push('/pim/work-file') }}>Create New Work File</button>
                    </div>
                </div>
                <div className="mt-12">
                    <ul className="flex gap-4">
                        <li className={`${tab === 1 ? 'bg-[#efedf2] text-[#8576a3] border-b-2 border-[#8576a3] px-3 py-2 cursor-pointer' : 'px-3 py-2 cursor-pointer'}`} onClick={() => { setTab(1); setPage(1) }}><h1>Current/Open</h1></li>
                        <li className={`${tab === 2 ? 'bg-[#efedf2] text-[#8576a3] border-b-2 border-[#8576a3] px-3 py-2 cursor-pointer' : 'px-3 py-2 cursor-pointer'}`} onClick={() => { setTab(2); setPage(1) }}><h1>Upcoming Updates</h1></li>
                        <li className={`${tab === 3 ? 'bg-[#efedf2] text-[#8576a3] border-b-2 border-[#8576a3] px-3 py-2 cursor-pointer' : 'px-3 py-2 cursor-pointer'}`} onClick={() => { setTab(3); setPage(1) }}><h1>Completed</h1></li>
                        <li className={`${tab === 4 ? 'bg-[#efedf2] text-[#8576a3] border-b-2 border-[#8576a3] px-3 py-2 cursor-pointer' : 'px-3 py-2 cursor-pointer'}`} onClick={() => { setTab(4); setPage(1) }}><h1>Lines Not Update</h1></li>
                    </ul>
                </div>
                <div className="mt-1">
                    <hr className="border-gray-300" />
                </div>
                <div className="mt-3">
                    <Table children={data} />
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next"
                        onPageChange={handlePageChange}
                        pageRangeDisplayed={5}
                        pageCount={totalPages}
                        previousLabel="Previous"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        pageLinkClassName="page-num-link"
                        previousLinkClassName="page-num-prev"
                        nextLinkClassName="page-num-next"
                        activeLinkClassName="active"
                    />

                </div>
            </div>
        </div>
    )
}