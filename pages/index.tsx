import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center">
      {/* 🎥 Platzhaltervideo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/video/volleyball-background.mp4" type="video/mp4" />
        Dein Browser unterstützt kein Video im Hintergrund.
      </video>

      {/* Fallback für fehlendes Video */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 z-0" />

      {/* 🌑 Dunkles Overlay für bessere Lesbarkeit */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

      {/* Logo/Titel */}
      <div className="relative z-20 text-center mt-8">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-2 tracking-wider drop-shadow-lg">
          SV KARLSRUHE
        </h1>
        <p className="text-white/90 text-lg md:text-xl font-light tracking-wide drop-shadow-md">
          BEIERTHEIM VOLLEYBALL
        </p>
      </div>

      {/* 🟢 Zentraler "Let's go" Button */}
      <div className="relative z-20 mb-12 flex flex-col items-center gap-6">
        <button
          type="button"
          aria-label="Zur Spieltagsvorschau"
          onClick={() => router.push("/match-preview")}
          className="z-20 relative group text-white text-2xl sm:text-3xl lg:text-4xl px-12 py-6 font-bold tracking-wide rounded-full border-4 border-white backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-500 hover:scale-110 shadow-2xl transform hover:rotate-1"
        >
          <span className="relative z-10">Let's go</span>
          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="pointer-events-none absolute inset-0 rounded-full ring-4 ring-white/30 animate-pulse" />
        </button>

        <div className="flex flex-col items-center text-white/80">
          <span className="text-sm tracking-wide mb-2">Scroll</span>
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
