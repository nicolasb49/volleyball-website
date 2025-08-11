"use client";
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: ()=>void }){
  useEffect(()=>{ console.error(error); },[error]);
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-primary">Fehler</h1>
      <p className="text-foreground/70 mb-6">Ein unerwarteter Fehler ist aufgetreten.</p>
      <button onClick={()=>reset()} className="inline-flex bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-medium">Nochmal versuchen</button>
    </div>
  );
}
