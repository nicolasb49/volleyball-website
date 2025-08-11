"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MotionDiv } from '../../components/ui/motion';
import { PlayerCard } from '../../components/players/PlayerCard';
import { Stagger, FadeIn } from '../../components/ui/motion';
import { Button } from '../../components/ui/button';

import type { Player } from '../../types/content';

export default function TeamClient({ players }: { players: Player[] }){
  const [query, setQuery] = useState('');
  const [pos, setPos] = useState('');
  const filtered = useMemo(()=> players.filter(p => (
    (!query || p.name.toLowerCase().includes(query.toLowerCase())) && (!pos || p.position === pos)
  )), [players, query, pos]);
  const positions = Array.from(new Set(players.map(p=>p.position).filter(Boolean)));
  return (
    <div className="container py-12 space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Team</h1>
        <p className="text-foreground/70 max-w-2xl">Filter & Suche jetzt mit echten Sanity-Daten.</p>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-6">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs font-medium text-foreground/60" htmlFor="search">Suche</label>
            <input id="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Name…" className="h-11 rounded-2xl border px-4 focus:outline-none focus:ring-2 focus:ring-primary bg-white" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-foreground/60">Position</span>
            <div className="flex gap-2 flex-wrap">
              <Button variant={pos===''?'default':'outline'} size="sm" onClick={()=>setPos('')}>Alle</Button>
              {positions.map(po => (
                <Button key={po} variant={pos===po?'default':'outline'} size="sm" onClick={()=>setPos(po!)}>{po}</Button>
              ))}
            </div>
          </div>
          <div>
            <Button variant="ghost" size="sm" onClick={()=>{setQuery('');setPos('');}}>Reset</Button>
          </div>
        </div>
      </header>
      <p className="text-xs text-foreground/60">{filtered.length} / {players.length} Spielerinnen</p>
      <Stagger className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map(p => {
          const slug = typeof p.slug === 'string' ? p.slug : p.slug.current;
          return (
            <FadeIn key={slug}>
              <PlayerCard player={p} />
            </FadeIn>
          );
        })}
      </Stagger>
    </div>
  );
}
