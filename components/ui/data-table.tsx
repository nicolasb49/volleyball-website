"use client";
import * as React from 'react';
import { cn } from '../../lib/utils';

export interface Column<T> { key: keyof T; header: string; sortable?: boolean; }

interface Props<T> { data: T[]; columns: Column<T>[]; initialSort?: keyof T; }

export function DataTable<T extends Record<string, any>>({ data, columns, initialSort }: Props<T>) {
  const [sortKey, setSortKey] = React.useState<keyof T | undefined>(initialSort);
  const [direction, setDirection] = React.useState<'asc' | 'desc'>('asc');
  const sorted = React.useMemo(()=>{
    if(!sortKey) return data;
    return [...data].sort((a,b)=>{
      const av = a[sortKey]; const bv = b[sortKey];
      if (av === bv) return 0;
      return (av > bv ? 1 : -1) * (direction === 'asc' ? 1 : -1);
    });
  },[data, sortKey, direction]);

  function toggle(col: Column<T>) {
    if(!col.sortable) return;
    if(sortKey === col.key) setDirection(d=> d==='asc'?'desc':'asc'); else { setSortKey(col.key); setDirection('asc'); }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
  <table className="w-full text-sm" role="table">
        <thead className="bg-muted">
          <tr>
            {columns.map(c => (
              <th key={String(c.key)} onClick={()=>toggle(c)} scope="col"
                  className={cn('px-4 py-2 text-left font-semibold select-none', c.sortable && 'cursor-pointer hover:text-primary')}>{c.header}{sortKey===c.key && (direction==='asc'?' ▲':' ▼')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row,i)=> (
            <tr key={i} className="border-t hover:bg-muted/70">
              {columns.map(c => (
                <td key={String(c.key)} className="px-4 py-2">{String(row[c.key])}</td>
              ))}
            </tr>
          ))}
          {sorted.length===0 && (
            <tr><td colSpan={columns.length} className="px-4 py-6 text-center text-foreground/50">Keine Daten</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
