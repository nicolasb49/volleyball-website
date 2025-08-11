# SV Karlsruhe Beiertheim Volleyball – Next.js App (App Router)

Moderne, sportliche, performante und barrierearme Volleyball-Teamseite mit Landing Page, Spieltagsvorschau, Team & Spielerinnen-Profilen. Stack: Next.js App Router (TS, RSC), Tailwind CSS + shadcn-Style Tokens, Framer Motion, Lucide Icons, Sanity CMS.

## 1. Features
- Landing Hero mit Video, CTA, nächstes Spiel
- Spieltagsvorschau (/preview) mit Match Info, Vorschautext (Sanity Rich Text), Tabelle (Mock -> später dynamic)
- Team Grid (/team) + Filter/Search Placeholder (Sanity Anbindung vorbereitet)
- Spielerinnen-Detail (/players/[slug])
- Sanity Studio integriert unter /studio (nach Deployment von Sanity CLI)
- Theming via CSS-Variablen (Grün/Weiß) + sportliche Schatten / Rundungen
- Framer Motion Micro-Interactions & Scroll Animations
- A11y: Skip-Link, semantische Strukturen, fokusierbare Elemente
- SEO: Metadata + OpenGraph Basis (erweiterbar)

## 2. Schnellstart (≤ 10 Schritte)
```bash
# 1. Dependencies installieren
npm install

# 2. (Optional) Environment anlegen
cp .env.example .env.local
# Füge SANITY Projekt-IDs ein

# 3. Dev-Server starten
npm run dev

# 4. Sanity CLI global (falls nicht vorhanden)
npm install -g sanity

# 5. Sanity Projekt erstellen (falls noch keins)
sanity init --project <id> --dataset production

# 6. Schema Deploy
sanity deploy

# 7. Vision & Content pflegen (Spieler, Match, Team)
open http://localhost:3000/studio

# 8. Seed Skript (alternativ)
npm run sanity:seed

# 9. Lint & Build prüfen
npm run build

# 10. Deployment zu Vercel (über vercel CLI oder Dashboard)
```

## 3. Env Variablen (.env.local)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx
NEXT_PUBLIC_SANITY_DATASET=production
USE_MOCK_PLAYERS=true # (Dev/CI) erzwingt Nutzung von data/mockPlayers.ts falls Sanity leer / nicht erreichbar
```
(Optional: Token für Schreiboperationen falls nötig.)

### USE_MOCK_PLAYERS Verhalten
- Dev / CI: Standard = true (oder leer + Fallback wenn Sanity leer). Liefert stabile E2E Tests ohne echte CMS Daten.
- Production: Sollte auf false oder entfernt sein – echte Sanity Daten werden erwartet. Ist die Liste leer, wird KEIN Mock injiziert (Upstream Monitoring notwendig).
- Mechanik: `fetchPlayers()` & `fetchPlayerBySlug()` versuchen Sanity (no-store). Bei Fehler oder leerer Liste (und Flag true oder nicht Production) werden `mockPlayers` zurückgegeben.
- Platzhalterbilder: PlayerCard nutzt aktuell transparentes Data-URI als Fallback um 404 zu vermeiden; echte Bilder via Sanity `photo.asset->url` empfohlen.

## 4. Projektstruktur (Auszug)
```
app/
  layout.tsx
  page.tsx (Landing)
  preview/page.tsx
  team/page.tsx
  players/[slug]/page.tsx
components/
  sections/hero.tsx
  sections/next-match-snippet.tsx
  ui/nav-bar.tsx
  ui/footer.tsx
  ui/motion.tsx
lib/
  utils.ts
  sanity/
    config.ts
    queries.ts
    schemas.ts
    schemas/*.ts
styles/globals.css
```

## 5. Sanity Schemas
- team: name, season, logo, photo, colors
- player: name, slug, number, position, height, birthdate, nationality, photo, bio, socials
- match: date, opponent, homeAway, competition, venue, matchday, heroPhotos, previewRichText, result

## 6. Anpassung Theming
CSS Variablen in `globals.css` – Primary (#2e7d32) & Muted (#e8f5e9). Erweiterbar für Dark Mode.

## 7. Performance Hinweise
- Nutze `next/image` für echte Bilder (Derzeit Platzhalter-Flächen)
- Video komprimieren (< 8MB, 1080p oder 720p)
- Lighthouse Ziel: LCP < 2.5s (Hero: poster + lazy resources)

## 8. Weiteres ToDo (optional)
- DataTable Komponente mit Sorting/Filtering extrahieren
- Echte Filter + Suche auf /team (Sanity Query + client state)
- Skelett-Loader / Suspense Boundaries
- Error & Not-Found Pages (`app/not-found.tsx`, `app/error.tsx`)
- OG Image Route (`app/opengraph-image.tsx`)
- Playwright E2E hinzufügen

## 9. Lizenz & Nutzung
Interne Vereinsseite – weitere Distribution nach Rücksprache.

Viel Erfolg! 🏐
