import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MotionDiv } from '../../../components/ui/motion';
import { PortableBody } from '../../../components/portable/PortableBody';
import { PLAYERS_QUERY, sanityClient } from '../../../lib/sanity/queries';
import { fetchPlayerBySlug } from '../../../lib/data/players';

export async function generateStaticParams(){
  try {
    const players = await sanityClient.fetch(PLAYERS_QUERY, {}, { cache: 'no-store' });
    if(Array.isArray(players)) return players.map((p:any)=>({ slug: p?.slug?.current })).filter(p=>p.slug);
  } catch {}
  return [];
}

export default async function PlayerDetail({ params }: { params: Promise<{ slug: string }> | { slug: string } }){
  // Next.js 15 may supply params as a Promise; await defensively to avoid warning
  const awaited = await params as { slug: string };
  const slug = awaited.slug;
  const player = await fetchPlayerBySlug(slug);
  if(!player) return notFound();
  const photoUrl = (player.photo as any)?.asset?.url || '/placeholder/player.jpg';
  const alt = (player.photo as any)?.alt || player.name;
  return (
    <div className="container py-12 space-y-8">
      <Link href="/team" className="text-sm text-primary font-medium hover:underline">← Zurück</Link>
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <MotionDiv initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/30 to-primary/5">
          <img src={photoUrl} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        </MotionDiv>
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">{player.name}</h1>
            <div className="text-foreground/80 text-sm leading-relaxed">
              <PortableBody value={Array.isArray(player.bio) ? player.bio : undefined} />
              {(!player.bio || typeof player.bio === 'string') && player.bio && <p>{player.bio}</p>}
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <QA label="Pregame Ritual?" value={player.pregameRitual} />
            <QA label="Hobby" value={player.hobby} />
            <QA label="Pizza oder Pasta?" value={player.pizzaOrPasta} />
          </div>
        </div>
      </div>
    </div>
  );
}

function QA({ label, value }: { label: string; value?: string }){
  return (
    <div className="rounded-xl bg-white border p-4 flex flex-col gap-1">
      <p className="text-[11px] uppercase tracking-wide text-foreground/50 font-medium">{label}</p>
      <p className="font-semibold text-sm">{value || '—'}</p>
    </div>
  );
}
