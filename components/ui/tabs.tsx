"use client";
import * as React from 'react';
import { cn } from '../../lib/utils';

interface TabsContextValue { value: string; setValue: (v:string)=>void; }
const TabsContext = React.createContext<TabsContextValue | null>(null);

export function Tabs({ defaultValue, children, className }: { defaultValue: string; children: React.ReactNode; className?:string }) {
  const [value, setValue] = React.useState(defaultValue);
  return <TabsContext.Provider value={{ value, setValue }}><div className={cn('w-full', className)}>{children}</div></TabsContext.Provider>;
}
export function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="inline-flex items-center gap-1 rounded-2xl bg-muted p-1" role="tablist">{children}</div>;
}
export function TabsTrigger({ value, children }: { value:string; children:React.ReactNode }) {
  const ctx = React.useContext(TabsContext)!;
  const active = ctx.value === value;
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={()=>ctx.setValue(value)}
      className={cn('px-4 py-2 rounded-xl text-sm font-medium transition-colors', active ? 'bg-white shadow text-primary' : 'text-foreground/60 hover:text-primary')}>
      {children}
    </button>
  );
}
export function TabsContent({ value, children, className }: { value:string; children:React.ReactNode; className?:string }) {
  const ctx = React.useContext(TabsContext)!;
  if (ctx.value !== value) return null;
  return <div className={cn('mt-6', className)} role="tabpanel">{children}</div>;
}
