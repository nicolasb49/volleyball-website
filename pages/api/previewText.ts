import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

interface TableEntry {
  club: string;
  matches: number;
  points: number;
  setsWon: number;
  setsLost: number;
  [key: string]: any;
}

interface MatchResult {
  home: string;
  away: string;
  date: string;
  score?: string;
}

const HOME_TEAM = process.env.HOME_TEAM_NAME || 'SV Karlsruhe Beiertheim';

async function loadJson<T>(p: string): Promise<T> {
  const raw = await fs.readFile(p, 'utf8');
  return JSON.parse(raw) as T;
}

function computeForm(entry?: TableEntry) {
  if (!entry) return 'keine Daten';
  const pointsPerMatch = entry.matches ? entry.points / entry.matches : 0;
  const setsDiff = (entry.setsWon ?? 0) - (entry.setsLost ?? 0);
  return `Punkte/Spiel: ${pointsPerMatch.toFixed(2)}, Satzdifferenz: ${setsDiff}`;
}

function getLastDuel(teamA: string, teamB: string, matches: MatchResult[]) {
  const duels = matches.filter(
    (m) =>
      (m.home === teamA && m.away === teamB) ||
      (m.home === teamB && m.away === teamA)
  );
  duels.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return duels[0];
}

async function generateText(prompt: string) {
  if (process.env.OPENAI_API_KEY) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });
    const json = await res.json();
    return json.choices?.[0]?.message?.content?.trim();
  }

  if (process.env.GEMINI_API_KEY) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
        }),
      }
    );
    const json = await res.json();
    return json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  }
  throw new Error('No API key configured');
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const base = process.cwd();
    const nextMatch = await loadJson<any>(path.join(base, 'data', 'nextMatch.json'));
    const table = await loadJson<TableEntry[]>(path.join(base, 'data', 'table.json'));

    let matches: MatchResult[] = [];
    const matchesPath = path.join(base, 'data', 'matches.json');
    if (existsSync(matchesPath)) {
      matches = await loadJson<MatchResult[]>(matchesPath);
    }

    const home = HOME_TEAM;
    const away = nextMatch.opponent as string;

    const last = getLastDuel(home, away, matches);

    const homeEntry = table.find((t) => t.club === home);
    const awayEntry = table.find((t) => t.club === away);

    const formHome = computeForm(homeEntry);
    const formAway = computeForm(awayEntry);

    const lastText = last
      ? `Das letzte direkte Duell fand am ${last.date} statt${
          last.score ? ` und endete ${last.score}` : ''
        }.`
      : 'Zum letzten direkten Aufeinandertreffen liegen keine Daten vor.';

    const prompt = `Verfasse eine sportlich-dramatische Vorschau f\u00fcr ein Volleyballspiel.\nHeimteam: ${home}\nGastteam: ${away}\nTermin: ${nextMatch.date} ${nextMatch.time} in ${nextMatch.venue}.\n${lastText}\nForm ${home}: ${formHome}. Form ${away}: ${formAway}.\nSchreibe den Text auf Deutsch in ein paar spannenden S\u00e4tzen.`;

    const text = await generateText(prompt);
    res.status(200).json({ text });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Fehler' });
  }
}
