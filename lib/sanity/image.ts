import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { projectId, dataset } from './env';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';

const builder = projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

export function urlFor(source: Image | any): ImageUrlBuilder | undefined {
  if(!builder || !source) return undefined;
  try { return builder.image(source); } catch { return undefined; }
}
