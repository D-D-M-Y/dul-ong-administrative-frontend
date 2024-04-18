'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import '@/app/ui/global.css';

const links = [
  { name: 'Dashboard', href: '/', icon: '/icons/dashboard.svg' },
  { name: 'Company Settings', href: '/company-settings/', icon: '/icons/settings.svg'},
  { name: 'Customer Data', href: '/customer-data', icon: '/icons/customer.svg' },
  { name: 'Generate Route', href: '/generate-route',  icon: '/icons/way.svg'},
  { name: 'Route History', href: '/route-history',  icon: '/icons/history.svg'},
  { name: 'Exit', href: '/exit',  icon: '/icons/log-out.svg'},
];


export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
    <div className="ml-3 text-neutral-800 text-sm font-normal">OVERVIEW </div>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'nav-links',
              pathname === link.href && 'nav-link-active ',
            )}
          >
            <img className="ml-3 mr-2 h-6 w-6" // Adjust styles as needed 
            aria-hidden="true" 
            src={link.icon}
            />
          <span className="image-overlay"></span>
             <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}