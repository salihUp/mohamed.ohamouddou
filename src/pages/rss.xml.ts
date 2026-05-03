import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', (e) => !e.data.draft);
  const items = posts
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map((entry) => {
      const isFr = entry.id.startsWith('fr/');
      const slug = entry.id.replace(/^(fr|en)\//, '').replace(/\.(md|mdx)$/, '');
      const link = isFr ? `/blog/${slug}` : `/en/blog/${slug}`;
      return {
        title: entry.data.title,
        pubDate: new Date(entry.data.date),
        description: entry.data.excerpt,
        link,
        categories: entry.data.tags,
      };
    });

  return rss({
    title: 'Mohamed Ohamouddou — Blog',
    description: 'Notes on embedded systems, AI, and teaching.',
    site: context.site ?? context.url.origin,
    items,
  });
}
