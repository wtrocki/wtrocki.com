import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog', generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, '') }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
    image: z.string().optional(),
    externalUrl: z.string().url().optional(),
  }),
});

const slides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/slides', generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, '') }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string().optional(),
    htmlFile: z.string(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog, slides };
