import { useRouter } from 'next/router';
import Link from 'next/link';
import { players } from '../../data/players';

export default function PlayerDetail() {
  const router = useRouter();
  const { id } = router.query;
  const player = players.find((p) => p.id === id);

  if (!player) {
    return <div className="p-4">Spielerin nicht gefunden.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 pt-16">
      <Link href="/team" className="text-blue-600">&larr; Zur\u00fcck</Link>
      <div className="mt-4 max-w-md mx-auto bg-white rounded shadow">
        <img src={player.image} alt={player.name} className="w-full h-60 object-cover rounded-t" />
        <div className="p-4">
          <h1 className="text-xl font-bold mb-1">{player.name}</h1>
          <p className="text-gray-600">{player.position}</p>
        </div>
      </div>
    </main>
  );
}
