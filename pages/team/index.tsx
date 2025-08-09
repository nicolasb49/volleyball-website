import Link from 'next/link';
import players from '../../data/players.json';
import Navbar from '../../components/Navbar';

export default function Team() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="text-center py-8 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
              STECKBRIEF SPIELERINNEN
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lernen Sie unser Team kennen - Talentierte Spielerinnen mit Leidenschaft für Volleyball
            </p>
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{players.length}</h3>
              <p className="text-gray-600 text-sm">Spielerinnen</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{Math.round(players.reduce((sum, p) => sum + (p.age || 0), 0) / players.length) || 'N/A'}</h3>
              <p className="text-gray-600 text-sm">⌀ Alter</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{new Set(players.map(p => p.position)).size}</h3>
              <p className="text-gray-600 text-sm">Positionen</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976-2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">2024</h3>
              <p className="text-gray-600 text-sm">Saison</p>
            </div>
          </div>

          {/* Players Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {players.map((player) => (
              <Link 
                key={player.id} 
                href={`/player/${player.id}`} 
                className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 overflow-hidden"
              >
                {/* Player Image */}
                <div className="relative aspect-square bg-gradient-to-br from-orange-400 to-red-500 overflow-hidden">
                  <img 
                    src={player.image} 
                    alt={player.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Fallback Avatar */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Jersey Number */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-bold text-gray-800">{player.id}</span>
                  </div>

                  {/* Position Badge */}
                  <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide backdrop-blur-sm">
                    {player.position}
                  </div>
                </div>

                {/* Player Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {player.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    {player.age && (
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{player.age} Jahre</span>
                      </div>
                    )}
                    
                    {player.height && (
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        <span>{player.height}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium text-orange-600">{player.position}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/0 via-transparent to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 transition-all duration-500 pointer-events-none"></div>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 py-12 bg-white rounded-2xl shadow-xl border border-gray-200">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Werde Teil unseres Teams!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Interessiert an Volleyball? Komm zu unserem Training und erlebe die Faszination dieses Sports.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Kontakt aufnehmen
                </button>
                <button className="px-8 py-4 border-2 border-orange-500 text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-all duration-300">
                  Training besuchen
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
