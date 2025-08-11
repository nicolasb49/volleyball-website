import { defineType } from 'sanity';

export default defineType({
  name: 'team',
  title: 'Team',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'season', type: 'string', title: 'Season' },
    { name: 'logo', type: 'image', title: 'Logo' },
    { name: 'photo', type: 'image', title: 'Team Photo' },
    { name: 'colors', type: 'array', title: 'Colors', of: [{ type: 'string' }] }
  ]
});
