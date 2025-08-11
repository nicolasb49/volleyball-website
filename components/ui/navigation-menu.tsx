import * as React from 'react';
import Link from 'next/link';
import { cn } from '../../lib/utils';

export function NavigationMenu({ children, className }: { children:React.ReactNode; className?:string }) {
  return <nav className={cn('flex gap-4', className)}>{children}</nav>;
}
export function NavigationMenuItem({ href, children }: { href:string; children:React.ReactNode }) {
  return <Link href={href} className="text-sm font-medium text-foreground/70 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl px-2 py-1">{children}</Link>;
}
