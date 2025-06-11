import { useRouter } from "next/router";

export default function MatchPreview() {
    const match = {
      date: "So. | 16.06.25 | 18:00 Uhr",
      gameday: "5. Spieltag",
      location: "Sporthalle Beiertheim",
      result: "noch offen",
      homeTeam: {
        name: "SV Karlsruhe Beiertheim",
        slug: "beiertheim",
        img: "/images/beiertheim.jpg",
      },
      awayTeam: {
        name: "TSV Planegg-Krailling",
        slug: "planegg",
        img: "/images/planegg.jpg",
      },
      previewText:
        "Nach dem starken letzten Heimspiel empfängt der SV Karlsruhe Beiertheim am 5. Spieltag den TSV Planegg-Krailling. Beide Teams sind in Topform – es verspricht ein spannendes Match zu werden.",
    };
  
    return (
      <main className="bg-gray-100 text-gray-900 min-h-screen">
        {/* Team-Bilder mit Namensleisten */}
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {[match.homeTeam, match.awayTeam].map((team) => (
            <div key={team.slug} className="relative">
              <img
                src={team.img}
                alt={team.name}
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute bottom-0 w-full bg-black/60 text-white text-center py-2 text-lg font-semibold">
                {team.name}
              </div>
            </div>
          ))}
        </div>
  
        {/* 📅 Match-Infos */}
        <section className="bg-white py-6 px-4 border-b border-gray-300 text-center space-y-1">
          <div className="text-xl font-bold">{match.date}</div>
          <div className="text-md text-gray-600">
            {match.gameday} – {match.location}
          </div>
          <div className="text-lg font-medium">Ergebnis: {match.result}</div>
        </section>
  
        {/* ✍️ Vorschau-Text */}
        <section className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-xl font-bold mb-3">Spieltagsvorschau</h2>
          <p className="text-base leading-relaxed">{match.previewText}</p>
        </section>
  
        {/* 📊 Tabelle (Platzhalter) */}
        <section className="bg-white p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Aktuelle Tabelle</h3>
          <p className="text-gray-500">Wird geladen… (Scraping kommt bald)</p>
        </section>
      </main>
    );
  }
  