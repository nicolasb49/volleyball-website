import type { Player } from '../types/content';

export const mockPlayers: Player[] = [
  {
    _id: 'mock-anna',
    name: 'Anna Beispiel',
    slug: { current: 'anna-beispiel' },
    number: 7,
    position: 'AA',
    photo: { asset: { url: '/placeholder/anna.jpg' }, alt: 'Anna Beispiel' },
    pregameRitual: 'Kaffee & kurze Meditation',
    hobby: 'Klettern',
    pizzaOrPasta: 'Pizza',
    bio: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Außenangreiferin mit starkem Aufschlag.' }] }
    ]
  },
  {
    _id: 'mock-mira',
    name: 'Mira Muster',
    slug: { current: 'mira-muster' },
    number: 12,
    position: 'MB',
    photo: { asset: { url: '/placeholder/mira.jpg' }, alt: 'Mira Muster' },
    pregameRitual: 'Playlist laut & Teamspruch',
    hobby: 'Fotografie',
    pizzaOrPasta: 'Pasta',
    bio: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Mittelblock mit schneller Reaktionsfähigkeit.' }] }
    ]
  }
];
