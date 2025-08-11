// Shared content domain types (will be refined & optionally validated with Zod in later PR)
export interface SanityImageRef { _type: 'image'; asset: { _ref: string; _type: 'reference' }; alt?: string; caption?: string }
export interface SanityImage { asset?: { url?: string }; alt?: string }
export interface PortableBlock { [key:string]: any }

export interface Match {
  _id?: string;
  date?: string; // ISO
  opponent?: string;
  homeAway?: 'HOME' | 'AWAY';
  competition?: string;
  venue?: string;
  matchday?: number;
  heroPhotos?: SanityImageRef[];
  previewRichText?: PortableBlock[];
}

export interface Player {
  _id?: string;
  name: string;
  slug: { current?: string } | string; // queries may project slug as string
  number?: number;
  position?: 'S' | 'AA' | 'MB' | 'D' | 'L';
  height?: number;
  birthdate?: string;
  nationality?: string;
  photo?: SanityImage | SanityImageRef;
  bio?: PortableBlock[] | string;
  pregameRitual?: string;
  hobby?: string;
  pizzaOrPasta?: 'Pizza' | 'Pasta';
}

export interface Team {
  _id?: string;
  name: string;
  slug: { current: string };
  players?: Player[];
}

// Zod schemas (optional runtime validation)
import { z } from 'zod';

export const zSanityImageRef = z.object({
  _type: z.literal('image'),
  asset: z.object({ _ref: z.string(), _type: z.literal('reference') }),
  alt: z.string().optional(),
  caption: z.string().optional()
});

export const zPortableBlock = z.record(z.any());

export const zPlayer = z.object({
  _id: z.string().optional(),
  name: z.string(),
  slug: z.union([z.object({ current: z.string() }), z.string()]),
  number: z.number().int().positive().optional(),
  position: z.string().optional(),
  height: z.number().int().positive().optional(),
  birthdate: z.string().optional(),
  nationality: z.string().optional(),
  photo: z.any().optional(),
  bio: z.array(zPortableBlock).or(z.string()).optional(),
  pregameRitual: z.string().optional(),
  hobby: z.string().optional(),
  pizzaOrPasta: z.string().optional()
});

export const zMatch = z.object({
  _id: z.string().optional(),
  date: z.string().optional(),
  opponent: z.string().optional(),
  homeAway: z.enum(['HOME','AWAY']).optional(),
  competition: z.string().optional(),
  venue: z.string().optional(),
  matchday: z.number().int().positive().optional(),
  heroPhotos: z.array(zSanityImageRef).optional(),
  previewRichText: z.array(zPortableBlock).optional()
});

export type PlayerValidated = z.infer<typeof zPlayer>;
export type MatchValidated = z.infer<typeof zMatch>;
