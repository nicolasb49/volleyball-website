import { createClient, groq } from 'next-sanity';
import { projectId, dataset } from './env';

export const sanityClient = createClient({ projectId, dataset, useCdn: true, apiVersion: '2024-05-01' });

export const PLAYERS_QUERY = groq`*[_type == "player"]|order(coalesce(number, 9999) asc, name asc){
  _id,
  name,
  "slug": slug.current,
  number,
  position,
  photo{asset->{url}, alt},
  pregameRitual,
  hobby,
  pizzaOrPasta
}`;

export const PLAYER_BY_SLUG_QUERY = groq`*[_type == "player" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  number,
  position,
  height,
  birthdate,
  nationality,
  photo{asset->{url}, alt},
  bio,
  pregameRitual,
  hobby,
  pizzaOrPasta
}`;

export const NEXT_MATCH_QUERY = groq`*[_type == "match" && date >= now()]|order(date asc)[0]{
  _id,
  date,
  opponent,
  homeAway,
  competition,
  venue,
  matchday,
  heroPhotos[],
  previewRichText
}`;

export async function sanityGetNextMatch(){
  return sanityClient.fetch(NEXT_MATCH_QUERY);
}
