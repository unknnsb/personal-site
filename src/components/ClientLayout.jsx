"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideHeader = pathname?.startsWith('/journal/') || pathname?.startsWith('/review/');

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
}
