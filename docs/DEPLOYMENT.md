# Deployment mit Vercel

Diese Anleitung beschreibt, wie du dieses Repository `nicolasb49/volleyball-website` bei Vercel deployen kannst.

## Neues Projekt erstellen und GitHub verbinden
1. Melde dich auf <https://vercel.com/> an.
2. Klicke auf **New Project**.
3. Wähle GitHub als Quelle aus und erteile Vercel Zugriff auf dein Repository, falls noch nicht geschehen.
4. Suche nach `nicolasb49/volleyball-website` und importiere es.

## Umgebungsvariablen anlegen
1. Nach dem Import wirst du nach Umgebungsvariablen gefragt.
2. Lege folgende Variablen an (Production und Preview):
   - `OPENAI_API_KEY` – dein API-Schlüssel für OpenAI.
   - `GEMINI_API_KEY` – dein API-Schlüssel für Google Gemini.

## Automatische Deploys konfigurieren
1. Stelle sicher, dass als **Production Branch** `main` eingestellt ist.
2. Aktiviere **Automatically deploy main branch** (standardmäßig eingeschaltet). Bei jedem Push auf `main` wird dann ein neues Deployment ausgelöst.

## vercel.json für API-Routen
Damit die Next.js-API-Routen unter `/api/*` korrekt funktionieren, liegt im Repository eine `vercel.json`. Beim Import erkennt Vercel diese automatisch.

## Deployment auslösen
Nach dem Speichern startet das erste Deployment automatisch. Künftige Commits auf `main` werden dann ebenfalls automatisch auf Vercel gebaut und veröffentlicht.
