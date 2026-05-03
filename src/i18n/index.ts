import fr from './fr.json';
import en from './en.json';

export type Locale = 'fr' | 'en';
export const LOCALES: readonly Locale[] = ['fr', 'en'] as const;
export const DEFAULT_LOCALE: Locale = 'fr';

const dictionaries: Record<Locale, Record<string, unknown>> = { fr, en };

export type TranslateValue = string | string[];

export function t(locale: Locale, key: string): TranslateValue {
  const value = (dictionaries[locale] as Record<string, unknown>)[key];
  if (value === undefined) {
    if (locale !== DEFAULT_LOCALE) return t(DEFAULT_LOCALE, key);
    return key;
  }
  return value as TranslateValue;
}

export function tString(locale: Locale, key: string, vars: Record<string, string | number> = {}): string {
  const raw = t(locale, key);
  const str = Array.isArray(raw) ? raw.join(', ') : raw;
  return str.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

export function tArray(locale: Locale, key: string): string[] {
  const raw = t(locale, key);
  return Array.isArray(raw) ? raw : [raw];
}

export function getLocale(url: URL | string): Locale {
  const pathname = typeof url === 'string' ? url : url.pathname;
  return /^\/en(\/|$)/.test(pathname) ? 'en' : 'fr';
}

export function localizedPath(path: string, locale: Locale, base = import.meta.env.BASE_URL ?? '/'): string {
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'fr') return `${cleanBase}${cleanPath}` || '/';
  return `${cleanBase}/en${cleanPath === '/' ? '' : cleanPath}`;
}

export function switchLocalePath(currentPath: string, target: Locale, base = import.meta.env.BASE_URL ?? '/'): string {
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  let p = currentPath;
  if (cleanBase && p.startsWith(cleanBase)) p = p.slice(cleanBase.length);
  p = p.replace(/^\/en(\/|$)/, '/');
  if (!p.startsWith('/')) p = `/${p}`;
  return localizedPath(p, target, base);
}

export function localeFromPath(path: string): Locale {
  return /^\/en(\/|$)/.test(path) ? 'en' : 'fr';
}

export function htmlLang(locale: Locale): string {
  return locale === 'fr' ? 'fr-FR' : 'en';
}
