"use client";
import * as React from 'react';
import { cn } from '../../lib/utils';

interface DialogCtx { open:boolean; setOpen:(o:boolean)=>void; }
const DialogContext = React.createContext<DialogCtx | null>(null);

export function Dialog({ children }: { children:React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return <DialogContext.Provider value={{open,setOpen}}>{children}</DialogContext.Provider>;
}
export function DialogTrigger({ children }: { children:React.ReactNode }) {
  const ctx = React.useContext(DialogContext)!;
  return <span onClick={()=>ctx.setOpen(true)} className="cursor-pointer">{children}</span>;
}
export function DialogContent({ children, className }: { children:React.ReactNode; className?:string }) {
  const ctx = React.useContext(DialogContext)!;
  if(!ctx.open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={()=>ctx.setOpen(false)} />
      <div className={cn('relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl', className)} role="dialog" aria-modal="true">
        {children}
        <button onClick={()=>ctx.setOpen(false)} className="absolute top-3 right-3 text-foreground/60 hover:text-primary" aria-label="Schließen">×</button>
      </div>
    </div>
  );
}
