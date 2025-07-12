import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import players from '../../data/players.json';

interface Player {
  id: string;
  name: string;
  position: string;
  image: string;
  age: number;
  height: string;
  nationality: string;
  quote: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = players.map((p) => ({ params: { id: p.id } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ player: Player }> = async (context) => {
  const { id } = context.params as { id: string };
  const player = players.find((p) => p.id === id);

  if (!player) {
    return { notFound: true };
  }

  return { props: { player } };
};

export default function PlayerDetail({ player }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className="min-h-screen bg-gray-100 pt-16 p-4">
      <Link href="/team" className="text-blue-600">&larr; Zurück</Link>
      <div className="mt-4 max-w-3xl mx-auto bg-white rounded shadow overflow-hidden">
        <div className="grid md:grid-cols-2">
          <img src={player.image} alt={player.name} className="w-full h-80 object-cover" />
          <div className="p-4 space-y-2">
            <h1 className="text-2xl font-bold">{player.name}</h1>
            <p className="text-gray-600">{player.position}</p>
            <ul className="mt-4 space-y-1">
              <li><span className="font-semibold">Alter:</span> {player.age}</li>
              <li><span className="font-semibold">Größe:</span> {player.height}</li>
              <li><span className="font-semibold">Nationalität:</span> {player.nationality}</li>
            </ul>
            <p className="mt-4 italic border-l-4 border-gray-300 pl-4">"{player.quote}"</p>
          </div>
        </div>
      </div>
    </main>
  );
}
