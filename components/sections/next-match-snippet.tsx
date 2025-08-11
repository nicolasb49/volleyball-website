import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { MotionDiv } from '../ui/motion';

interface MatchLite { date:string; opponent:string; venue?:string; time?:string; homeAway?:string; }

const mock: MatchLite = {
  date: new Date().toISOString(),
  opponent: 'TSV Beispielstadt',
  venue: 'Heimhalle Beiertheim',
  time: '19:30',
  homeAway: 'home'
};

export function NextMatchSnippet({ match }: { match?: MatchLite }) {
  const m = match || mock;
  const d = new Date(m.date);
  return (
    <section className="py-12 bg-white">
      <div className="container">
        <MotionDiv initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} className="rounded-2xl border shadow-sport p-6 md:p-8 bg-gradient-to-br from-muted to-white">
          <h2 className="text-2xl font-bold mb-4 tracking-tight text-primary">Nächstes Spiel</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-xs font-medium text-foreground/60 mb-1">Datum</p>
                <p className="font-semibold">{format(d,'EEEE, d. MMM', { locale: de })}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-xs font-medium text-foreground/60 mb-1">Uhrzeit</p>
                <p className="font-semibold">{m.time}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 col-span-2">
                <p className="text-xs font-medium text-foreground/60 mb-1">Gegner</p>
                <p className="font-semibold">{m.opponent}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-[200px]">
              <span className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow">{m.homeAway === 'home' ? 'Heimspiel' : 'Auswärtsspiel'}</span>
              <span className="text-sm font-medium text-foreground/80">{m.venue}</span>
              <a href="/preview" className="mt-4 inline-flex justify-center rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-sm font-semibold focus-ring shadow-sport">Zur Vorschau</a>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
