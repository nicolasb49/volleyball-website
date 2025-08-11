import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { projectId, dataset } from './env';

const config = defineConfig({
  name: 'default',
  title: 'SVK Volleyball',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: { types: schemaTypes }
});

export default config;
export { projectId, dataset };
