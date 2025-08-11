import { defineType } from 'sanity';

export default defineType({
  name: 'match',
  title: 'Match',
  type: 'document',
  fields: [
    { name: 'date', type: 'datetime', title: 'Date' },
    { name: 'opponent', type: 'string', title: 'Opponent' },
  { name: 'homeAway', type: 'string', title: 'Home/Away', options:{ list:['home','away'] } },
    { name: 'competition', type: 'string', title: 'Competition' },
    { name: 'venue', type: 'string', title: 'Venue' },
    { name: 'matchday', type: 'number', title: 'Matchday' },
    { name: 'heroPhotos', type: 'array', title: 'Hero Photos', of: [{ type: 'image' }] },
    { name: 'previewRichText', type: 'array', title: 'Preview Text', of: [{ type: 'block' }] },
    { name: 'result', type: 'string', title: 'Result', description: 'Optional final result' }
  ]
});
