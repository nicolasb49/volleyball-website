import { GetStaticProps } from 'next';
import { useState } from 'react';
import fs from 'fs/promises';
import path from 'path';

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

  const table = JSON.parse(await fs.readFile(tablePath, 'utf8')) as TableRow[];
  const nextMatch = JSON.parse(
    await fs.readFile(nextPath, 'utf8')
  ) as NextMatch;

  const res = await fetch('http://localhost:3000/api/previewText', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nextMatch, table }),
  });
  const { text: introText } = (await res.json()) as { text: string };

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
  const [tab, setTab] = useState<'tabelle' | 'spielplan' | 'statistik'>('tabelle');

  const teams = [nextMatch.homeTeam, nextMatch.awayTeam];

  return (
    <main className="min-h-screen bg-gray-100 pt-16">
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        {/* Team Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teams.map((name) => (
            <div key={name} className="relative overflow-hidden group">
              <img
                src={`/images/${name.replace(/\s+/g, '-')}.jpg`}
                alt={name}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-center py-2 text-lg font-semibold">
                {name}
              </div>
            </div>
          ))}
        </div>

        {/* Info line */}
        <div className="bg-white shadow flex flex-col sm:flex-row sm:justify-between text-center p-4">
          <div>
            <span className="font-semibold">{nextMatch.date}</span> | {nextMatch.time}
          </div>
          <div className="font-semibold">
            {nextMatch.homeTeam} vs. {nextMatch.awayTeam}
          </div>
          <div>{nextMatch.location}</div>
        </div>

        {/* Intro text */}
        <section className="bg-white shadow p-4">
          <p>{introText}</p>
        </section>

        {/* Tabs */}
        <section>
          <div className="border-b flex space-x-4">
            <button
              className={`px-4 py-2 font-medium ${
                tab === 'tabelle' ? 'border-b-2 border-red-600' : 'hover:bg-gray-200'
              }`}
              onClick={() => setTab('tabelle')}
            >
              Tabelle
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                tab === 'spielplan' ? 'border-b-2 border-red-600' : 'hover:bg-gray-200'
              }`}
              onClick={() => setTab('spielplan')}
            >
              Spielplan
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                tab === 'statistik' ? 'border-b-2 border-red-600' : 'hover:bg-gray-200'
              }`}
              onClick={() => setTab('statistik')}
            >
              Statistik
            </button>
          </div>
          <div className="bg-white shadow p-4">
            {tab === 'tabelle' && (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-1">#</th>
                    <th className="py-1">Team</th>
                    <th className="py-1">Spiele</th>
                    <th className="py-1">Siege</th>
                    <th className="py-1">Sätze</th>
                    <th className="py-1">Punkte</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((row) => (
                    <tr key={row.rank} className="odd:bg-gray-50">
                      <td className="py-1 px-2">{row.rank}</td>
                      <td className="py-1 px-2">{row.club}</td>
                      <td className="py-1 px-2">{row.played}</td>
                      <td className="py-1 px-2">{row.won}</td>
                      <td className="py-1 px-2">{row.sets}</td>
                      <td className="py-1 px-2">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {tab === 'spielplan' && (
              <div className="space-y-2">
                <p>
                  <strong>{nextMatch.homeTeam}</strong> vs.{' '}
                  <strong>{nextMatch.awayTeam}</strong>
                </p>
                <p>
                  {nextMatch.date} | {nextMatch.time}
                </p>
                <p>{nextMatch.location}</p>
                <p>{nextMatch.lastMeeting}</p>
                <p>Form {nextMatch.homeTeam}: {nextMatch.form.home}</p>
                <p>Form {nextMatch.awayTeam}: {nextMatch.form.away}</p>
              </div>
            )}

            {tab === 'statistik' && <p>Statistiken folgen…</p>}
          </div>
        </section>
      </div>
    </main>
  );
}

