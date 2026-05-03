# Portfolio — Mohamed Ohamouddou

Site académique bilingue (FR/EN) construit avec **Astro 5** + **Tailwind 4**, pensé
pour être hébergé sur **GitHub Pages**, avec une interface d'administration
**Sveltia CMS** pour ajouter manuellement publications, cours, activités scientifiques,
projets et articles de blog.

## Stack

- Astro 5, TypeScript strict
- Tailwind 4 (via Vite plugin, design tokens dans `@theme`)
- MDX + `remark-math` + `rehype-katex` + Shiki pour le blog
- `@fontsource-variable/inter` (typographie)
- `astro-icon` + Lucide / Simple Icons
- `@astrojs/sitemap` + `@astrojs/rss`
- Sveltia CMS avec OAuth GitHub PKCE

## Démarrage local

Prérequis : **Node ≥ 20.19** (Astro 5).

```bash
npm install
npm run dev          # http://localhost:4321/
```

### Édition de contenu en local (admin)

```bash
# Terminal 1
npm run dev
# Terminal 2
npm run cms
# Ouvrir http://localhost:4321/admin/  → modifications écrites sur disque
```

### Build & preview

```bash
npm run build
npm run preview
```

## Structure de contenu

| Collection | Dossier | Format |
|---|---|---|
| Publications | `src/content/publications/` | `*.md` (frontmatter) |
| Cours | `src/content/courses/` | `*.md` (frontmatter, bilingue `_fr` / `_en`) |
| Activités | `src/content/activities/` | `*.md` (frontmatter, bilingue) |
| Projets | `src/content/projects/` | `*.md` (frontmatter, bilingue) |
| Blog FR | `src/content/blog/fr/` | `*.mdx` |
| Blog EN | `src/content/blog/en/` | `*.mdx` |

Schémas Zod : `src/content.config.ts`.

## Routes

- `/` (FR), `/en/` (EN) — page d'accueil avec hero
- `/publications`, `/teaching`, `/activities`, `/blog`, `/about`
- `/en/...` mêmes routes en anglais
- `/blog/<slug>` — détail d'article (MDX rendu)
- `/admin/` — Sveltia CMS
- `/rss.xml` — flux RSS du blog

## Déploiement sur GitHub Pages

1. Créer un repo GitHub et y pousser le code (branche `main`).
2. Repo → Settings → Pages → **Build and deployment** → Source : **GitHub Actions**.
3. Pousser : le workflow `.github/workflows/deploy.yml` build et déploie automatiquement.

### Activer l'admin en production (OAuth GitHub PKCE)

1. GitHub → Settings → Developer settings → **OAuth Apps** → **New OAuth App** :
   - **Application name** : `Mohamed Ohamouddou Portfolio CMS`
   - **Homepage URL** : `https://<USERNAME>.github.io/<REPO>/`
   - **Authorization callback URL** : `https://<USERNAME>.github.io/<REPO>/admin/`
2. Copier le **Client ID** généré.
3. Éditer `public/admin/config.yml` :
   - Remplacer `<USERNAME>/<REPO>` par votre repo (ex. `mohamed-o/portfolio`).
   - Remplacer `<GITHUB_OAUTH_CLIENT_ID>` par votre Client ID.
   - Commenter la ligne `local_backend: true`.
4. Pousser le commit. Ouvrir `https://<USERNAME>.github.io/<REPO>/admin/` :
   un bouton « Login with GitHub » apparaît. Login → vous pouvez créer/éditer.
   Chaque publication via le CMS commit directement sur la branche `main` ;
   le workflow rebuild et redéploie automatiquement.

> **Note** : aucune Cloud Function ni proxy externe n'est nécessaire. Le PKCE flow
> de Sveltia CMS fait l'OAuth depuis le navigateur directement.

## Personnalisation rapide

- **Photo** : remplacer `public/images/portrait.svg` par `public/images/portrait.jpg`
  et mettre à jour le chemin dans `src/pages/index.astro` et `src/pages/en/index.astro`.
- **Couleur d'accent** : modifier `--color-accent` dans `src/styles/global.css`.
- **Mot accentué du hero** : changer `hero.heading.accent` et `hero.heading.after`
  dans `src/i18n/fr.json` et `src/i18n/en.json`.
- **Liens sociaux** : `src/components/Footer.astro` et `src/pages/about.astro`
  (et son miroir `/en/`).

## Licence

Code : MIT. Contenu (textes, photos) : © Mohamed Ohamouddou.
