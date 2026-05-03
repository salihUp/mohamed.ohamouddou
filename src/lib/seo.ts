import type { Locale } from '~/i18n';

export interface PersonSchemaInput {
  name: string;
  url: string;
  jobTitle?: string;
  affiliation?: string;
  sameAs?: string[];
}

export function personJsonLd(input: PersonSchemaInput): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: input.name,
    url: input.url,
    jobTitle: input.jobTitle,
    affiliation: input.affiliation,
    sameAs: input.sameAs,
  });
}

export interface BlogPostingSchemaInput {
  title: string;
  url: string;
  datePublished: string;
  description?: string;
  author: string;
  inLanguage: Locale;
  image?: string;
}

export function blogPostingJsonLd(input: BlogPostingSchemaInput): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    url: input.url,
    datePublished: input.datePublished,
    description: input.description,
    author: { '@type': 'Person', name: input.author },
    inLanguage: input.inLanguage === 'fr' ? 'fr-FR' : 'en',
    image: input.image,
  });
}
