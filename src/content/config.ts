import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.string(),
    stack: z.array(z.string()),
    year: z.number(),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
    liveUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    context: z.string(),
    objective: z.string(),
    problem: z.string(),
    solution: z.string(),
    result: z.string(),
  }),
});

export const collections = { projects };
