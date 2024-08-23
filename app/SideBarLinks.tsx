'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import TodayIcon from '@mui/icons-material/Today';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export default function SideBarLinks() {
    const pathname = usePathname();

    return (
        <nav className='flex flex-col gap-y-4 mt-10 [&>a]:ps-6 [&>a]:py-2 [&>a.active]:bg-[#486fd0]'>
            <Link href="/" className={`flex items-center gap-x-2 ${pathname === '/' ? 'active' : ''}`}><HomeIcon/> Home</Link>
            <Link href="/patient" className={`flex items-center gap-x-2 ${pathname === '/patient' ? 'active' : ''}`}><PersonSearchIcon /> Patients</Link>
            <Link href="/settings" className={`flex items-center gap-x-2 ${pathname === '/settings' ? 'active' : ''}`}><SettingsIcon /> Settings</Link>
            <Link href="/calendar" className={`flex items-center gap-x-2 ${pathname === '/calendar' ? 'active' : ''}`}><TodayIcon /> Calendar</Link>
        </nav>
    );
}