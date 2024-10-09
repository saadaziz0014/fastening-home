'use client';
import Image from "next/image";
import Link from "next/link";
import logo from '../assets/logo.png'
import { useState } from "react";
export default function Sidebar() {
    const [dropdownPim, setDropdownPim] = useState(false);
    return (
        <div className="w-32 bg-[#624E89] text-white">
            <div className="flex items-center">
                <Image src={logo} alt="logo" width={40} height={40} />
            </div>
            <ul className="py-4 px-2" style={{ listStyleType: 'none' }}>
                <li>
                    <Link href="/dashboard" className="flex items-center justify-center">
                        <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg" >
                            <path d="M7 21.5469V11.5469H13V21.5469M1 8.54688L10 1.54688L19 8.54688V19.5469C19 20.0773 18.7893 20.586 18.4142 20.9611C18.0391 21.3362 17.5304 21.5469 17 21.5469H3C2.46957 21.5469 1.96086 21.3362 1.58579 20.9611C1.21071 20.586 1 20.0773 1 19.5469V8.54688Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span className="ml-2">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <button className="flex items-center justify-center" onClick={() => setDropdownPim(!dropdownPim)} aria-controls="dropdown-pim" data-collapse-toggle="dropdown-pim">
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 20.5469V10.5469M12 20.5469V4.54688M6 20.5469V14.5469" stroke="#624E88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <span className="ml-2">PIM</span>
                        {dropdownPim ? <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.04687L6 6.04687L11 1.04688" stroke="white" stroke-width="1.38889" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                            : <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.04687L6 6.04687L11 1.04688" stroke="white" stroke-width="1.38889" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        }
                    </button>
                </li>
            </ul>
        </div>
    );
}