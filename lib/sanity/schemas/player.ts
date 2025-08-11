import { defineType } from 'sanity';

export default defineType({
  name: 'player',
  title: 'Player',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'name' } },
    { name: 'number', type: 'number', title: 'Trikotnummer' },
    {
      name: 'position',
      type: 'string',
      title: 'Position',
      options: { list: [
        { title: 'Zuspiel', value: 'S' },
        { title: 'Außenangriff', value: 'AA' },
        { title: 'Mittelblock', value: 'MB' },
        { title: 'Diagonal', value: 'D' },
        { title: 'Libera', value: 'L' }
      ] }
    },
    { name: 'height', type: 'string', title: 'Height' },
    { name: 'birthdate', type: 'date', title: 'Birthdate' },
    { name: 'nationality', type: 'string', title: 'Nationality' },
    {
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' }
      ]
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }] },
        { type: 'object', name: 'callout', title: 'Callout', fields: [
          { name: 'title', type: 'string', title: 'Titel' },
          { name: 'tone', type: 'string', title: 'Ton', options: { list: ['info','warn','success'] } },
          { name: 'body', type: 'text', title: 'Text' }
        ] }
      ]
    },
    { name: 'pregameRitual', type: 'string', title: 'Pregame Ritual' },
    { name: 'hobby', type: 'string', title: 'Hobby' },
    { name: 'pizzaOrPasta', type: 'string', title: 'Pizza oder Pasta', options: { list: ['Pizza','Pasta'] } },
    { name: 'socials', type: 'array', title: 'Social Links', of: [{ type: 'url' }] }
  ]
});
