'use client'
import ReactPaginate from "react-paginate";
import Table from "../../components/Table";
import { useRouter } from "next/navigation";
export default function UpdateMenu() {
    const router = useRouter();
    return (
        <div className="bg-[#F8F9FB] font-inter">
            <div className="mt-5 mb-10">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl">Update Menu</h1>
                        <p className="text-sm">View your terms transaction and trades</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-[#614d87] text-white px-3 py-2 rounded-lg text-xs">Add New Price File</button>
                        <button onClick={() => { router.push('/pim/work-file') }} className="bg-[#614d87] text-white rounded-lg text-xs px-3 py-2">Create New Work File</button>
                    </div>
                </div>
                <div className="mt-12">
                    <ul className="flex gap-4">
                        <li><h1>Current/Open</h1></li>
                        <li><h1>Upcoming Updates</h1></li>
                        <li><h1>Completed</h1></li>
                        <li><h1>Lines Not Update</h1></li>
                    </ul>
                </div>
                <div className="mt-1">
                    <hr className="border-gray-300" />
                </div>
                <div className="mt-3">
                    <Table children={[]} />
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next"
                        onPageChange={() => { }}
                        pageRangeDisplayed={5}
                        pageCount={1}
                        previousLabel="Previous"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        pageLinkClassName="page-num"
                        previousLinkClassName="page-num"
                        nextLinkClassName="page-num"
                        activeLinkClassName="active"
                    />
                </div>
            </div>
        </div>
    )
}