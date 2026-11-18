import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    noteSlug: z.string().min(1),
    lang: z.enum(['pt', 'en']),
    title: z.string().min(1),
    summary: z.string().min(1),
    publishedAt: z.string().min(1),
    tags: z.array(z.string().min(1)).min(1),
  }),
});

export const collections = { notes };
