import Link from 'next/link';
import { players } from '../data/players';

export default function Team() {
  return (
    <main className="min-h-screen bg-gray-100 p-4 pt-16">
      <h1 className="text-2xl font-bold text-center mb-4">Team</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {players.map((p) => (
          <Link key={p.id} href={`/player/${p.id}`} className="block bg-white rounded shadow hover:shadow-md transition">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
            <div className="p-2 text-center">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-600">{p.position}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
