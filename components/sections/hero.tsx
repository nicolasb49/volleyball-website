import Link from 'next/link';
import Image from 'next/image';
import { MotionDiv } from '../../components/ui/motion';

export function Hero(){
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10"/>
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline poster="/hero-fallback.jpg">
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="relative z-20 container h-full flex flex-col justify-center gap-6 text-white">
        <MotionDiv initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">SVK BEIERTHEIM VOLLEYBALL</h1>
        </MotionDiv>
        <MotionDiv initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.15}}>
          <p className="max-w-xl text-lg md:text-2xl font-medium drop-shadow">Leidenschaft. Teamgeist. Präzision. Willkommen bei der Damenmannschaft.</p>
        </MotionDiv>
        <MotionDiv initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.3}}>
          <Link href="/preview" className="inline-flex bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-2xl font-semibold focus-ring shadow-sport text-lg">Let’s go</Link>
        </MotionDiv>
      </div>
    </section>
  );
}
