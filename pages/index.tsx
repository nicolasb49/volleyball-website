import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center">
      {/* 🎥 Hintergrundvideo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/video/intro.mp4" type="video/mp4" />
        Dein Browser unterstützt kein Video im Hintergrund.
      </video>

      {/* 🌑 Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      {/* 🟢 Button */}
      <button
        onClick={() => router.push("/match-preview")}
        className="z-20 relative text-white text-2xl sm:text-3xl px-10 py-4 font-bold tracking-wide rounded-full border-2 border-white backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-xl"
      >
        Let’s go
        <span className="absolute inset-0 rounded-full ring-2 ring-white/40 animate-pulse pointer-events-none" />
      </button>
    </div>
  );
}
