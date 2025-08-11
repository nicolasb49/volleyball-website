#!/usr/bin/env node
/* Seed basic Sanity data (players + one match) using SANITY write token */
const { createClient } = require('next-sanity');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if(!projectId || !token){
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN. Aborting.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, useCdn:false, apiVersion:'2024-05-01' });

const players = Array.from({length:14}).map((_,i)=>({
  _type: 'player',
  name: `Spielerin ${i+1}`,
  slug: { _type:'slug', current:`spielerin-${i+1}` },
  number: i+1,
  position: ['Außen','Mitte','Zuspiel','Libera'][i%4],
  height: `${178 + (i%6)} cm`,
  birthdate: '2000-01-01',
  nationality: 'Deutschland',
  bio: 'Engagierte Spielerin mit großem Teamgeist.',
  socials: []
}));

const match = {
  _type: 'match',
  date: new Date().toISOString(),
  opponent: 'TSV Beispielstadt',
  homeAway: 'home',
  competition: 'Regionalliga',
  venue: 'Heimhalle Beiertheim',
  matchday: 5,
  previewRichText: [
    { _type:'block', style:'normal', children:[{_type:'span', text:'Ein spannender Spieltag erwartet uns.'}] }
  ]
};

(async ()=>{
  try {
    console.log('Seeding players...');
    for(const p of players){
      await client.createIfNotExists({ ...p, _id:`player.${p.slug.current}` });
    }
    console.log('Seeding match...');
    await client.createIfNotExists({ ...match, _id:'match.next' });
    console.log('Done.');
  } catch(e){
    console.error(e);
    process.exit(1);
  }
})();
