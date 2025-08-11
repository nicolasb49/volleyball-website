import TeamClient from './team-client';
import { fetchPlayers } from '../../lib/data/players';

// server fetch wrappers now in lib/data/players

export default async function TeamPage(){
  const players = await fetchPlayers();
  return <TeamClient players={players} />;
}
