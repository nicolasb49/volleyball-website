import fs from 'fs/promises';
import path from 'path';

interface TableRow {
  rank: number;
  club: string;
  played: number;
  won: number;
  sets: string;
  points: number;
}

async function getTable(): Promise<TableRow[]> {
  try {
    const file = await fs.readFile(path.join(process.cwd(), 'data', 'table.json'), 'utf8');
    const json = JSON.parse(file) as TableRow[];
    return json.length ? json : mockFallback;
  } catch {
    return mockFallback;
  }
}

const mockFallback: TableRow[] = [
  { rank: 1, club: 'SVK Beiertheim', played: 3, won: 3, sets: '9:2', points: 9 },
  { rank: 2, club: 'TSV Beispiel', played: 4, won: 3, sets: '10:4', points: 9 },
  { rank: 3, club: 'SC Demo', played: 4, won: 2, sets: '8:6', points: 6 }
];

export const dynamic = 'force-static';

export default async function TablePage() {
  const table = await getTable();
  return (
    <div className="container py-12 space-y-10">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">Tabelle</h1>
        <p className="text-foreground/70 max-w-2xl mx-auto">Aktuelle Tabellenposition und Leistung aller Teams in der Liga.</p>
      </header>
      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary/60 px-6 py-5">
          <h2 className="text-xl font-semibold tracking-wide text-primary-foreground">Ligatabelle</h2>
          <p className="text-xs text-primary-foreground/70">Saison 2024/25</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-xs uppercase tracking-wide text-foreground/70">
                <th className="text-left px-4 py-3 font-semibold">Platz</th>
                <th className="text-left px-4 py-3 font-semibold">Team</th>
                <th className="text-center px-4 py-3 font-semibold">Spiele</th>
                <th className="text-center px-4 py-3 font-semibold">Siege</th>
                <th className="text-center px-4 py-3 font-semibold">Sätze</th>
                <th className="text-center px-4 py-3 font-semibold">Punkte</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row, idx) => (
                <tr key={row.rank} className={`border-b last:border-0 transition-colors ${idx < 3 ? 'bg-emerald-50/60' : idx >= table.length - 2 ? 'bg-red-50/60' : 'hover:bg-muted/40'}`}>
                  <td className="px-4 py-3 font-bold text-sm">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-xs font-bold">{row.rank}</span>
                  </td>
                  <td className="px-4 py-3 font-medium">{row.club}</td>
                  <td className="px-4 py-3 text-center font-mono">{row.played}</td>
                  <td className="px-4 py-3 text-center font-mono">{row.won}</td>
                  <td className="px-4 py-3 text-center font-mono">{row.sets}</td>
                  <td className="px-4 py-3 text-center font-bold text-primary">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid md:grid-cols-3 gap-4 p-6 bg-muted/50">
          <StatCard title="Bester Angriff" value={table[0]?.club || '—'} color="from-emerald-500 to-emerald-600" />
          <StatCard title="Beste Verteidigung" value={table[1]?.club || '—'} color="from-sky-500 to-sky-600" />
          <StatCard title="Überraschung" value={table[Math.floor(table.length/2)]?.club || '—'} color="from-orange-500 to-red-500" />
        </div>
      </div>
      <Legend />
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold tracking-wide text-foreground/80">{title}</h3>
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold`}>{value.slice(0,1)}</div>
      </div>
      <p className="text-base font-bold leading-tight">{value}</p>
    </div>
  );
}

function Legend(){
  return (
    <div className="text-xs text-foreground/60 space-y-2">
      <h4 className="font-semibold tracking-wide text-foreground/70">Legende</h4>
      <ul className="space-y-1">
        <li><span className="inline-block w-3 h-3 rounded-sm bg-emerald-500 mr-2"/>Top 3</li>
        <li><span className="inline-block w-3 h-3 rounded-sm bg-muted-foreground/40 mr-2"/>Mittelfeld</li>
        <li><span className="inline-block w-3 h-3 rounded-sm bg-red-500 mr-2"/>Abstiegszone</li>
      </ul>
    </div>
  );
}
