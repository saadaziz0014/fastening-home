export default function UpdateMenu() {
    return (
        <div className="bg-[#F8F9FB] h-screen">
            <div className="mt-2 mb-10">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold">Update Menu</h1>
                        <p className="text-md">View your terms transaction and trades</p>
                    </div>
                    <div className="flex gap-2 mr-2">
                        <button className="bg-[#9843D0] text-white px-3 py-2 rounded-lg">Add New Price File</button>
                        <button className="bg-[#9843D0] text-white px-3 py-2 rounded-lg">Create New Work File</button>
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
                <div className="mt-3 border border-gray-300">
                </div>
            </div>
        </div>
    )
}