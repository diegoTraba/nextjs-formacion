'use client'

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  
  // var RutaPrincipal=""
  // if(pathname.includes("invoices")){
  //   RutaPrincipal="invoices"
  // }
  // else if(pathname.includes("customers")){
  //   RutaPrincipal="invoices"
  // }
  // else{
  //   RutaPrincipal="dashboard"
  // }
  return (
    <>   
      {links.map((link) => {
        const LinkIcon = link.icon;
        const routeParts= pathname.split('/');
        const lastPartRoute= routeParts[routeParts.length - 1];
        // Verificar si es ruta exacta o hija
        const isActive = (href: string) => {
          
          // Si la ruta actual es igual al href es una ruta exacta (http://localhost:3000/dashboard, http://localhost:3000/dashboard/invoices o http://localhost:3000/dashboard/customers)
          if (pathname === href) {
            return true;
          }
          // Subrutas hijas de invoices y customers
          if (pathname.startsWith(href) && pathname.length > href.length) {
            if (href === '/dashboard/invoices' && pathname.startsWith('/dashboard/invoices')) {
              return true;
            }
            if (href === '/dashboard/customers' && pathname.startsWith('/dashboard/customers')) {
              return true;
            }
          }
          return false;
        };

        return (
          //link que tiene unas clases y si la ruta actual (pathname) termina igual que el href del enlace, se le añaden unas clases extra para destacar que en enlace se corresponde
          //con la ruta actual en la que nos encontramos
          <Link
          
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': (isActive(link.href)),
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
