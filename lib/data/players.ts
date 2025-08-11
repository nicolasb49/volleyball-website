import { sanityClient, PLAYERS_QUERY, PLAYER_BY_SLUG_QUERY } from '../sanity/queries';
import type { Player } from '../../types/content';
import { zPlayer } from '../../types/content';
import { mockPlayers } from '../../data/mockPlayers';

const useMock = process.env.USE_MOCK_PLAYERS === 'true';

export async function fetchPlayers(): Promise<Player[]> {
  if (useMock) return mockPlayers;
  try {
    const res = await sanityClient.fetch(PLAYERS_QUERY, {}, { cache: 'no-store' });
    if (!Array.isArray(res) || res.length === 0) return mockPlayers; // fallback in dev/CI
    const parsed = res.map(r => {
      const p = zPlayer.safeParse(r);
      return p.success ? (p.data as Player) : null;
    }).filter(Boolean) as Player[];
    if(!parsed.length) return mockPlayers;
    return parsed;
  } catch {
    return mockPlayers;
  }
}

export async function fetchPlayerBySlug(slug: string): Promise<Player | null> {
  if (useMock) return mockPlayers.find(p => (typeof p.slug === 'string' ? p.slug === slug : p.slug.current === slug)) || null;
  try {
  const res = await sanityClient.fetch(PLAYER_BY_SLUG_QUERY, { slug }, { cache: 'no-store' });
  if (!res) return mockPlayers.find(p => (typeof p.slug === 'string' ? p.slug === slug : p.slug.current === slug)) || null;
  const parsed = zPlayer.safeParse(res);
  if(!parsed.success) return mockPlayers.find(p => (typeof p.slug === 'string' ? p.slug === slug : p.slug.current === slug)) || null;
  return parsed.data as Player;
  } catch {
    return mockPlayers.find(p => (typeof p.slug === 'string' ? p.slug === slug : p.slug.current === slug)) || null;
  }
}
