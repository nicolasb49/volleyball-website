"use client";
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/preview', label: 'Spieltagsvorschau' },
  { href: '/table', label: 'Tabelle' },
  { href: '/team', label: 'Team' }
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-bold tracking-wide text-primary text-lg">SVK BEIERTHEIM</Link>
        <nav className="hidden md:flex items-center gap-6" aria-label="Hauptnavigation">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-foreground/80 hover:text-primary focus-ring rounded-xl px-2 py-1">
              {l.label}
            </Link>
          ))}
        </nav>
        <button aria-label="Menü" onClick={()=>setOpen(o=>!o)} className="md:hidden focus-ring p-2 rounded-xl text-primary">
          {open ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white shadow-inner">
          <nav className="container py-4 flex flex-col gap-2" aria-label="Mobile Navigation">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={()=>setOpen(false)} className="px-4 py-2 rounded-xl hover:bg-muted focus-ring text-sm font-medium">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
