'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import '@/app/ui/global.css';
import { 
  CiGrid42, 
  CiRoute,
  CiSliderHorizontal,
  CiDatabase,
  CiLogout,
  CiViewList 
} from "react-icons/ci";


const links = [
  { name: 'Dashboard', href: '/', icon: <CiGrid42 className='icon' size={40} />},
  { name: 'Company Settings', href: '/company-settings', icon: <CiSliderHorizontal className='icon' size={40} />},
  { name: 'Customer Data', href: '/customer-data', icon: <CiDatabase className='icon' size={40} />},
  { name: 'Generate Route', href: '/generate-route',  icon: <CiRoute className='icon' size={40}/>},
  { name: 'Route History', href: '/route-history',  icon: <CiViewList  className='icon' size={40}/>},
  { name: 'Exit', href: '/exit',  icon: <CiLogout className='icon' size={40} />
},
];


export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
    <div className="ml-3 text-neutral-800 text-sm font-normal">OVERVIEW </div>
      {links.map((link) => {
        return (
          <a
            key={link.name}
            href={link.href}
            className={clsx(
              'nav-links',
              pathname === link.href && 'nav-link-active ',
            )}
          >
            {link.icon} 
          <span className="image-overlay"></span>
             <p className="hidden md:block">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}