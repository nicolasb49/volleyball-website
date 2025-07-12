import { useState } from 'react';

interface Team {
  name: string;
  image: string;
}

const match = {
  date: '16.06.2025',
  time: '18:00 Uhr',
  gameday: '5. Spieltag',
  location: 'Sporthalle Beiertheim',
  intro:
    'Hier erscheint bald der automatisch generierte Einleitungstext zur Spieltagsvorschau.',
  homeTeam: {
    name: 'SV Karlsruhe Beiertheim',
    image: 'https://via.placeholder.com/600x400?text=Beiertheim',
  } as Team,
  awayTeam: {
    name: 'Gastteam',
    image: 'https://via.placeholder.com/600x400?text=Gegner',
  } as Team,
};

const tableData = [
  { pos: 1, team: 'SV Karlsruhe Beiertheim', games: 4, points: 12 },
  { pos: 2, team: 'Gastteam', games: 4, points: 9 },
  { pos: 3, team: 'Team C', games: 4, points: 6 },
];

export default function MatchPreview() {
  const [tab, setTab] = useState<'tabelle' | 'spielplan' | 'statistik'>('tabelle');

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 pt-16">
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        {/* Team-Bilder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[match.homeTeam, match.awayTeam].map((team) => (
            <div key={team.name} className="relative group overflow-hidden">
              <img
                src={team.image}
                alt={team.name}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition"/>
              <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-center py-2 text-lg font-semibold">
                {team.name}
              </div>
            </div>
          ))}
        </div>

        {/* Match Infos */}
        <div className="bg-white shadow flex flex-col sm:flex-row sm:justify-between text-center p-4">
          <div>
            <span className="font-semibold">{match.date}</span> | {match.time}
          </div>
          <div className="text-gray-600">{match.gameday}</div>
          <div className="text-gray-600">{match.location}</div>
        </div>

        {/* Einleitungstext */}
        <section className="bg-white shadow p-4">
          <p>{match.intro}</p>
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
                    <th className="py-1">Pos</th>
                    <th className="py-1">Team</th>
                    <th className="py-1">Spiele</th>
                    <th className="py-1">Punkte</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.pos} className="odd:bg-gray-50">
                      <td className="py-1 px-2">{row.pos}</td>
                      <td className="py-1 px-2">{row.team}</td>
                      <td className="py-1 px-2">{row.games}</td>
                      <td className="py-1 px-2">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === 'spielplan' && <p>Spielplan folgt...</p>}
            {tab === 'statistik' && <p>Statistiken folgen...</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
