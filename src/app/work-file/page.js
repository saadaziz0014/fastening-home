import Dropdown from "../components/Dropdown";

export default function WorkFile() {
    return (
        <div className="flex justify-between">
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
                        <i className="absolute fa fa-search text-black top-5 left-4" />
                        <input type="text" placeholder="Search for Trades" className="bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer" name />
                    </div>
                </div>
            </div>
        </div>
    )
}