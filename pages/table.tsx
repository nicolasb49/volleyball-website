import { GetStaticProps } from 'next';
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

export interface Props {
  table: TableRow[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const base = process.cwd();
  const tablePath = path.join(base, 'data', 'table.json');

  const table = JSON.parse(
    await fs.readFile(tablePath, 'utf8')
  ) as TableRow[];

  return {
    props: {
      table,
    },
  };
};

export default function Table({ table }: Props) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="text-center py-8 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
              TABELLE
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Aktuelle Tabellenposition und Leistung aller Teams in der Liga
            </p>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
              <h2 className="text-2xl font-bold text-white tracking-wide">LIGATABELLE</h2>
              <p className="text-orange-100 mt-2">Saison 2024/25</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm tracking-wide">PLATZ</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700 text-sm tracking-wide">TEAM</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-700 text-sm tracking-wide">SPIELE</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-700 text-sm tracking-wide">SIEGE</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-700 text-sm tracking-wide">NIEDERLAGEN</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-700 text-sm tracking-wide">SÄTZE</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-700 text-sm tracking-wide">PUNKTE</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((row, index) => {
                    const losses = row.played - row.won;
                    let positionClass = '';
                    let positionIndicator = '';
                    
                    if (index < 3) {
                      positionClass = 'bg-green-50 border-l-4 border-green-500';
                      positionIndicator = '🥇';
                    } else if (index >= table.length - 3) {
                      positionClass = 'bg-red-50 border-l-4 border-red-500';
                      positionIndicator = '⚠️';
                    } else {
                      positionClass = 'hover:bg-orange-50';
                    }

                    return (
                      <tr
                        key={row.rank}
                        className={`border-b border-gray-100 transition-all duration-200 ${positionClass}`}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <span className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              {row.rank}
                            </span>
                            {positionIndicator && <span className="text-lg">{positionIndicator}</span>}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-gray-800 text-lg">{row.club}</div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-800 rounded-full font-semibold">
                            {row.played}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center justify-center w-10 h-10 bg-green-100 text-green-800 rounded-full font-semibold">
                            {row.won}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center justify-center w-10 h-10 bg-red-100 text-red-800 rounded-full font-semibold">
                            {losses}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="font-mono text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                            {row.sets}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center justify-center w-12 h-10 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold text-lg">
                            {row.points}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Legende</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-600">🥇 Top 3 - Aufstiegsplätze</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  <span className="text-gray-600">Mittelfeldplätze</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-gray-600">⚠️ Abstiegsgefahr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Bester Angriff</h3>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-green-600">{table[0]?.club || 'N/A'}</p>
              <p className="text-gray-600 text-sm mt-1">Meiste Punkte pro Spiel</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Beste Verteidigung</h3>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {table.find(team => team.club.includes('SVK') || team.club.includes('Karlsruhe') || team.club.includes('Beiertheim'))?.club || table[1]?.club || 'N/A'}
              </p>
              <p className="text-gray-600 text-sm mt-1">Wenigste Niederlagen</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Überraschung</h3>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-bold text-orange-600">{table[Math.floor(table.length / 2)]?.club || 'N/A'}</p>
              <p className="text-gray-600 text-sm mt-1">Aufsteiger des Jahres</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
