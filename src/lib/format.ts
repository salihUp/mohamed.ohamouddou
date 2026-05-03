import type { Locale } from '~/i18n';

// Matches Mohamed Ohamouddou specifically (so co-author "S. Ohamouddou" stays unbolded).
// Accepts: "Mohamed Ohamouddou", "M. Ohamouddou", "M Ohamouddou", "Ohamouddou, Mohamed", "Ohamouddou, M.".
export const ME_NAME_REGEX = /(?:\b(?:mohamed|m\.?)\s+ohamouddou\b)|(?:\bohamouddou\s*,\s*(?:mohamed|m\.?)\b)/i;

export function pickLocalized<T extends Record<string, unknown>>(
  data: T,
  field: string,
  locale: Locale,
): string {
  const localeKey = `${field}_${locale}` as keyof T;
  const fallbackKey = `${field}_${locale === 'fr' ? 'en' : 'fr'}` as keyof T;
  const direct = (data[field as keyof T] ?? data[localeKey]) as string | undefined;
  if (direct) return direct;
  const fallback = data[fallbackKey] as string | undefined;
  return fallback ?? '';
}

export function formatDate(date: Date | string, locale: Locale, opts?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const localeTag = locale === 'fr' ? 'fr-FR' : 'en-US';
  return new Intl.DateTimeFormat(localeTag, opts ?? { dateStyle: 'long' }).format(d);
}

export function formatYear(date: Date | string): number {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getFullYear();
}

export interface AuthorPart {
  text: string;
  bold: boolean;
}

export function parseAuthors(raw: string): AuthorPart[] {
  return raw
    .split(/\s+and\s+/i)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      let display = entry;
      if (entry.includes(',')) {
        const [last, first] = entry.split(',', 2).map((s) => s.trim());
        display = `${first} ${last}`.trim();
      }
      return { text: display, bold: ME_NAME_REGEX.test(entry) };
    });
}

export function joinAuthorsHTML(parts: AuthorPart[]): string {
  return parts
    .map((p) => (p.bold ? `<strong>${escapeHtml(p.text)}</strong>` : escapeHtml(p.text)))
    .join(', ');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function groupBy<T, K extends string | number>(items: T[], key: (item: T) => K): Map<K, T[]> {
  const map = new Map<K, T[]>();
  for (const item of items) {
    const k = key(item);
    const list = map.get(k);
    if (list) list.push(item);
    else map.set(k, [item]);
  }
  return map;
}

export function sortByDateDesc<T extends { data: { date?: Date | string } }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const da = a.data.date ? new Date(a.data.date).getTime() : 0;
    const db = b.data.date ? new Date(b.data.date).getTime() : 0;
    return db - da;
  });
}
