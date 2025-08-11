import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { MotionDiv } from '../ui/motion';
import type { Player } from '../../types/content';

interface Props { player: Player }

// 1x1 transparent PNG
const TRANSPARENT_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAnsB9ZffJXkAAAAASUVORK5CYII=';

export function PlayerCard({ player }: Props){
  const slug = typeof player.slug === 'string' ? player.slug : player.slug?.current;
  const rawUrl = (player.photo as any)?.asset?.url as string | undefined;
  const isPlaceholder = rawUrl?.startsWith('/placeholder/');
  const imgUrl = isPlaceholder ? TRANSPARENT_PNG : (rawUrl || TRANSPARENT_PNG);
  const alt = (player.photo as any)?.alt || player.name;
  return (
    <MotionDiv whileHover={{ y: -4 }} className="group rounded-2xl border bg-white shadow-sm transition-all" data-testid="player-card">
      <Link href={`/players/${slug}`} className="group block rounded-2xl overflow-hidden shadow bg-white/70 ring-1 ring-transparent flex flex-col h-full p-4 hover:-translate-y-0.5 hover:shadow-lg hover:ring-[var(--primary,#2e7d32)]/25 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary,#2e7d32)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
        <div className="relative aspect-video mb-3 overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-primary/5">
          <Image
            src={imgUrl}
            alt={alt}
            fill={!isPlaceholder}
            width={isPlaceholder ? 300 : undefined}
            height={isPlaceholder ? 180 : undefined}
            sizes="(max-width:768px) 50vw, (max-width:1200px) 25vw, 300px"
            className={clsx('object-cover transition-opacity duration-300 transition-transform group-hover:scale-[1.02]', isPlaceholder && 'opacity-40')}
            unoptimized={isPlaceholder}
            priority={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold group-hover:text-primary transition-colors text-sm">{player.name}</h3>
          {player.number && <span className="text-[10px] font-bold px-2 py-1 rounded bg-primary text-primary-foreground">#{player.number}</span>}
        </div>
        {player.position && <span className="inline-block text-[10px] font-medium px-2 py-1 rounded-full bg-primary/10 text-primary tracking-wide mb-2">{player.position}</span>}
        <span className="mt-auto text-xs font-medium text-primary group-hover:underline">Details →</span>
      </Link>
    </MotionDiv>
  );
}
