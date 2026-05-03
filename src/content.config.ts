import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const publications = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/publications' }),
  schema: z.object({
    type: z.enum([
      'article',
      'inproceedings',
      'workshop',
      'incollection',
      'book',
      'phdthesis',
      'mastersthesis',
      'techreport',
      'misc',
    ]),
    title: z.string(),
    authors: z.string(),
    year: z.number().int().min(1980).max(2100),
    venue: z.string().optional(),
    publisher: z.string().optional(),
    volume: z.string().optional(),
    number: z.string().optional(),
    pages: z.string().optional(),
    doi: z.string().optional(),
    url: z.string().url().optional(),
    pdf: z.string().url().optional(),
    arxiv: z.string().url().optional(),
    code: z.string().url().optional(),
    slides: z.string().url().optional(),
    abstract_fr: z.string().optional(),
    abstract_en: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/courses' }),
  schema: z.object({
    title_fr: z.string(),
    title_en: z.string(),
    institution: z.string(),
    level: z.enum(['L1', 'L2', 'L3', 'M1', 'M2', 'PhD', 'Other']),
    semester: z.enum(['Fall', 'Spring', 'Full year', 'Summer']),
    year_start: z.number().int().min(1990).max(2100),
    year_end: z.number().int().min(1990).max(2100).optional(),
    syllabus_url: z.string().url().optional(),
    description_fr: z.string().optional(),
    description_en: z.string().optional(),
  }),
});

const activities = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/activities' }),
  schema: z.object({
    title_fr: z.string(),
    title_en: z.string(),
    type: z.enum(['conference', 'workshop', 'seminar', 'summer-school', 'school', 'other']),
    location: z.string(),
    date: z.coerce.date(),
    role: z.enum(['attendee', 'speaker', 'organizer', 'reviewer', 'co-chair']).default('attendee'),
    url: z.string().url().optional(),
    notes_fr: z.string().optional(),
    notes_en: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title_fr: z.string(),
    title_en: z.string(),
    description_fr: z.string(),
    description_en: z.string(),
    tech: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      excerpt: z.string(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { publications, courses, activities, projects, blog };
