'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ScreeningHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-surface/80 backdrop-blur-md border-b border-outline-variant w-full z-50 sticky top-0">
      <div className="flex justify-between items-center w-full px-4 md:px-6 max-w-[1200px] mx-auto h-20">
        <div className="w-1/3 md:hidden"></div>
        <nav className="hidden md:flex gap-6 h-full items-center w-1/3">
          <Link
            href="/homepage"
            className={`font-label-md text-sm h-full flex items-center transition-all duration-200 border-b-2 ${
              pathname === '/homepage' ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-primary'
            }`}
          >
            Beranda
          </Link>
          <Link
            href="/homepage/kuesioner"
            className={`font-label-md text-sm h-full flex items-center transition-all duration-200 border-b-2 ${
              pathname?.startsWith('/homepage/kuesioner') ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-primary'
            }`}
          >
            Screening
          </Link>
          <Link
            href="/homepage/artikel"
            className={`font-label-md text-sm h-full flex items-center transition-all duration-200 border-b-2 ${
              pathname?.startsWith('/homepage/artikel') ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-primary'
            }`}
          >
            Tentang Tes
          </Link>
        </nav>

        <Link href="/homepage" className="w-1/3 flex justify-center items-center cursor-pointer no-underline">
          <img src="/logo.png" alt="MindScroll Logo" className="h-[38px] md:h-[44px] w-auto object-contain" />
        </Link>

        {/* Empty div to balance flex layout */}
        <div className="w-1/3 flex justify-end items-center gap-4 relative">
        </div>
      </div>
    </header>
  );
}
