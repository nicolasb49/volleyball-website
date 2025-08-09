import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import players from '../../data/players.json';
import Navbar from '../../components/Navbar';

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
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-6xl mx-auto p-6">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              href="/team" 
              className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-800 transition-colors duration-300 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Zurück zum Team</span>
            </Link>
          </div>

          {/* Player Profile Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="grid lg:grid-cols-2">
              {/* Player Image */}
              <div className="relative aspect-square lg:aspect-auto bg-gradient-to-br from-orange-400 to-red-500">
                <img 
                  src={player.image} 
                  alt={player.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Fallback Background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Player Number Badge */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-2xl font-bold text-gray-800">#{player.id}</span>
                </div>

                {/* Position Badge */}
                <div className="absolute bottom-6 left-6 bg-black/80 text-white px-4 py-2 rounded-full font-semibold tracking-wide backdrop-blur-sm">
                  {player.position}
                </div>
              </div>

              {/* Player Info */}
              <div className="p-8 lg:p-12">
                <div className="space-y-8">
                  {/* Header */}
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                      {player.name}
                    </h1>
                    <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">{player.age}</h3>
                      <p className="text-gray-600 text-sm">Jahre</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">{player.height}</h3>
                      <p className="text-gray-600 text-sm">Größe</p>
                    </div>
                  </div>

                  {/* Nationality */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-orange-600 font-medium">Nationalität</p>
                        <p className="text-lg font-bold text-gray-800">{player.nationality}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="bg-gray-800 rounded-xl p-6 relative">
                    <svg className="absolute top-4 left-4 w-8 h-8 text-orange-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                    <blockquote className="text-white text-lg italic leading-relaxed ml-6">
                      "{player.quote}"
                    </blockquote>
                    <div className="mt-4 text-orange-400 font-medium">- {player.name}</div>
                  </div>

                  {/* Position Details */}
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Position: {player.position}</h3>
                    <div className="text-gray-600 leading-relaxed">
                      {player.position === 'Außenangriff' && (
                        <p>Außenangreifer sind die primären Punktesammler des Teams und für kraftvolle Angriffe von der linken Seite des Feldes verantwortlich.</p>
                      )}
                      {player.position === 'Zuspiel' && (
                        <p>Der Zuspieler ist das Herzstück des Teams und orchestriert das Angriffsspiel durch präzise Pässe zu den Angreifern.</p>
                      )}
                      {player.position === 'Mittelblock' && (
                        <p>Mittelblocker sind die Defensivspezialisten am Netz und für schnelle Angriffe über die Mitte verantwortlich.</p>
                      )}
                      {!['Außenangriff', 'Zuspiel', 'Mittelblock'].includes(player.position) && (
                        <p>Eine wichtige Position im Volleyball-Team mit spezifischen Aufgaben und Verantwortlichkeiten.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              href="/team"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
            >
              Alle Spielerinnen anzeigen
            </Link>
            <Link
              href="/match-preview"
              className="px-8 py-4 border-2 border-orange-500 text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-all duration-300 text-center"
            >
              Nächstes Spiel
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
