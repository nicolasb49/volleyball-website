import { GetStaticProps } from 'next';
import { useState } from 'react';
import fs from 'fs/promises';
import path from 'path';
import Navbar from '../components/Navbar';

export interface TableRow {
  rank: number;
  club: string;
  played: number;
  won: number;
  sets: string;
  points: number;
}

export interface NextMatch {
  date: string;
  time: string;
  location: string;
  homeTeam: string;
  awayTeam: string;
  lastMeeting: string;
  form: {
    home: string;
    away: string;
  };
}

export interface Props {
  table: TableRow[];
  nextMatch: NextMatch;
  introText: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const base = process.cwd();
  const tablePath = path.join(base, 'data', 'table.json');
  const nextPath = path.join(base, 'data', 'nextMatch.json');

  const table = JSON.parse(
    await fs.readFile(tablePath, 'utf8')
  ) as TableRow[];
  const nextMatch = JSON.parse(
    await fs.readFile(nextPath, 'utf8')
  ) as NextMatch;

  // Intro-Text initial leer anlegen
  let introText = '';

  // Versuche, den automatisch generierten Text von der API zu holen
  try {
    const res = await fetch('http://localhost:3000/api/previewText', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nextMatch, table }),
    });
    if (res.ok) {
      const body = (await res.json()) as { text?: string };
      introText = body.text ?? '';
    } else {
      console.warn('[getStaticProps] previewText API returned', res.status);
    }
  } catch (err) {
    console.warn('[getStaticProps] failed to fetch previewText:', err);
  }

  return {
    props: {
      table,
      nextMatch,
      introText,
    },
  };
};

export default function MatchPreview({
  table,
  nextMatch,
  introText,
}: Props) {
  const [tab, setTab] = useState<'tabelle' | 'spielplan' | 'statistik'>(
    'tabelle'
  );

  const teams = [nextMatch.homeTeam, nextMatch.awayTeam];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          {/* Header */}
          <div className="text-center py-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
              SPIELTAGSVORSCHAU
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
          </div>

          {/* Team Images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {teams.map((name, idx) => {
              const safeName = typeof name === 'string' ? name : '';
              const fileName = safeName.trim().replace(/\s+/g, '-');
              const src = fileName
                ? `/images/${fileName}.jpg`
                : '/images/volleyball-team-placeholder.jpg';

              return (
                <div key={idx} className="relative overflow-hidden rounded-2xl shadow-2xl group transform hover:scale-105 transition-all duration-500">
                  <div className="aspect-video bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center relative">
                    <img
                      src={src}
                      alt={safeName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {/* Fallback Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-center px-4">{safeName || 'Team'}</h3>
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent text-white text-center py-6">
                    <h3 className="text-xl md:text-2xl font-bold tracking-wide">
                      {safeName || 'Unbekannt'}
                    </h3>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-transparent to-red-500/0 group-hover:from-orange-500/20 group-hover:to-red-500/20 transition-all duration-500"></div>
                </div>
              );
            })}
          </div>

          {/* Match Info Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Datum & Zeit</p>
                  <p className="font-bold text-lg">{nextMatch.date}</p>
                  <p className="text-orange-600 font-semibold">{nextMatch.time}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Begegnung</p>
                  <p className="font-bold text-lg">{nextMatch.homeTeam}</p>
                  <p className="text-gray-600 text-sm">vs.</p>
                  <p className="font-bold text-lg">{nextMatch.awayTeam}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Ort</p>
                  <p className="font-bold text-lg">{nextMatch.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Intro text */}
          {introText && (
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Vorschau</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{introText}</p>
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex space-x-0 overflow-x-auto">
                <button
                  className={`flex-1 px-6 py-4 font-medium text-sm tracking-wide transition-all duration-300 ${
                    tab === 'tabelle'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                  onClick={() => setTab('tabelle')}
                >
                  TABELLE
                </button>
                <button
                  className={`flex-1 px-6 py-4 font-medium text-sm tracking-wide transition-all duration-300 ${
                    tab === 'spielplan'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                  onClick={() => setTab('spielplan')}
                >
                  SPIELPLAN
                </button>
                <button
                  className={`flex-1 px-6 py-4 font-medium text-sm tracking-wide transition-all duration-300 ${
                    tab === 'statistik'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                  onClick={() => setTab('statistik')}
                >
                  STATISTIK
                </button>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              {tab === 'tabelle' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-4 px-2 font-bold text-gray-700 text-sm tracking-wide">#</th>
                        <th className="text-left py-4 px-2 font-bold text-gray-700 text-sm tracking-wide">TEAM</th>
                        <th className="text-center py-4 px-2 font-bold text-gray-700 text-sm tracking-wide">SPIELE</th>
                        <th className="text-center py-4 px-2 font-bold text-gray-700 text-sm tracking-wide">SIEGE</th>
                        <th className="text-center py-4 px-2 font-bold text-gray-700 text-sm tracking-wide">SÄTZE</th>
                        <th className="text-center py-4 px-2 font-bold text-gray-700 text-sm tracking-wide">PUNKTE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.map((row, index) => (
                        <tr key={row.rank} className={`border-b border-gray-100 hover:bg-orange-50 transition-colors duration-200 ${index < 3 ? 'bg-green-50' : index >= table.length - 3 ? 'bg-red-50' : ''}`}>
                          <td className="py-4 px-2 font-bold text-gray-800">{row.rank}</td>
                          <td className="py-4 px-2 font-medium text-gray-800">{row.club}</td>
                          <td className="py-4 px-2 text-center text-gray-600">{row.played}</td>
                          <td className="py-4 px-2 text-center text-gray-600">{row.won}</td>
                          <td className="py-4 px-2 text-center text-gray-600">{row.sets}</td>
                          <td className="py-4 px-2 text-center font-bold text-orange-600">{row.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {tab === 'spielplan' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Nächstes Spiel</h3>
                      <div className="space-y-2">
                        <p className="text-gray-600">
                          <span className="font-semibold text-orange-600">{nextMatch.homeTeam}</span> vs.{' '}
                          <span className="font-semibold text-red-600">{nextMatch.awayTeam}</span>
                        </p>
                        <p className="text-gray-600">{nextMatch.date} | {nextMatch.time}</p>
                        <p className="text-gray-600">{nextMatch.location}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Letzte Begegnung</h3>
                      <p className="text-gray-600">{nextMatch.lastMeeting}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                      <h3 className="text-lg font-bold text-orange-800 mb-4">Form {nextMatch.homeTeam}</h3>
                      <p className="text-orange-700 font-mono text-lg">{nextMatch.form.home}</p>
                    </div>
                    
                    <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                      <h3 className="text-lg font-bold text-red-800 mb-4">Form {nextMatch.awayTeam}</h3>
                      <p className="text-red-700 font-mono text-lg">{nextMatch.form.away}</p>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'statistik' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Statistiken in Bearbeitung</h3>
                  <p className="text-gray-600">Detaillierte Spielstatistiken werden bald verfügbar sein.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
