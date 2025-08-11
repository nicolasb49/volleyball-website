import fs from 'fs/promises';
import path from 'path';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { PortableBody } from '../../components/portable/PortableBody';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { DataTable } from '../../components/ui/data-table';
import { sanityClient, NEXT_MATCH_QUERY } from '../../lib/sanity/queries';
import { zMatch } from '../../types/content';

interface NextMatch {
  date?: string;
  time?: string;
  location?: string;
  homeTeam?: string;
  awayTeam?: string;
  lastMeeting?: string;
  form?: { home?: string; away?: string };
}
interface TableRow { rank:number; club:string; played:number; won:number; sets:string; points:number; }

async function getData(){
  const base = process.cwd();
  let nextMatch: any = {};
  let table: TableRow[] = [];
  try {
    const fetched = await sanityClient.fetch(NEXT_MATCH_QUERY, {}, { cache: 'no-store' });
    const parsed = zMatch.safeParse(fetched);
    if(parsed.success){ nextMatch = parsed.data; }
  } catch {}
  try {
    const tFile = await fs.readFile(path.join(base,'data','table.json'),'utf8');
    table = JSON.parse(tFile) as TableRow[];
  } catch {}
  if(!table.length){
    table = [
      { rank:1, club:'SVK Beiertheim', played:3, won:3, sets:'9:2', points:9 },
      { rank:2, club:'TSV Beispiel', played:4, won:3, sets:'10:4', points:9 },
      { rank:3, club:'SC Demo', played:4, won:2, sets:'8:6', points:6 }
    ];
  }
  return { nextMatch, table };
}

export const dynamic = 'force-static';

export default async function PreviewPage(){
  const { nextMatch, table } = await getData();
  const matchExists = Object.keys(nextMatch).length > 0;
  return (
    <div className="space-y-12 py-12">
      <section className="container space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight">Spieltagsvorschau</h1>
        <p className="text-foreground/70 max-w-2xl">Alle Informationen zum kommenden Spieltag: Paarung, Formkurven und Tabelle.</p>
      </section>

      <section className="container">
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="tabelle">Tabelle</TabsTrigger>
            <TabsTrigger value="spielplan">Spielplan</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-sport transition-shadow">
              <CardHeader><CardTitle>Match Info</CardTitle></CardHeader>
              <CardContent>
                {matchExists ? (
                  <ul className="text-sm space-y-1">
                    {nextMatch.date && <li><strong>Datum:</strong> {nextMatch.date}</li>}
                    {nextMatch.time && <li><strong>Zeit:</strong> {nextMatch.time}</li>}
                    {nextMatch.homeTeam && nextMatch.awayTeam && <li><strong>Begegnung:</strong> {nextMatch.homeTeam} vs. {nextMatch.awayTeam}</li>}
                    {nextMatch.location && <li><strong>Ort:</strong> {nextMatch.location}</li>}
                  </ul>
                ) : <p className="text-sm text-foreground/70">(Fallback) Nächstes Spiel wird bald eingepflegt.</p>}
              </CardContent>
            </Card>
            <Card className="hover:shadow-sport transition-shadow">
              <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                {/* PortableText body (match.previewRichText) once Sanity data wired */}
                <PortableBody value={(nextMatch as any)?.previewRichText} />
                {!((nextMatch as any)?.previewRichText) && (
                  <p className="text-sm leading-relaxed text-foreground/70">(Fallback) Ein intensives Duell steht bevor. Beide Teams zeigen starke Form und wollen ihre Siegesserie fortsetzen.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tabelle">
            <DataTable data={table.map(r=>({
              rank:r.rank,
              team:r.club,
              played:r.played,
              won:r.won,
              sets:r.sets,
              pts:r.points
            }))} initialSort={'rank'} columns={[
              { key:'rank', header:'#', sortable:true },
              { key:'team', header:'Team', sortable:true },
              { key:'played', header:'Spiele', sortable:true },
              { key:'won', header:'Siege', sortable:true },
              { key:'sets', header:'Sätze' },
              { key:'pts', header:'Punkte', sortable:true }
            ]} />
          </TabsContent>
          <TabsContent value="spielplan" className="space-y-6">
            {matchExists ? (
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader><CardTitle>Nächstes Spiel</CardTitle></CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p><strong>{nextMatch.homeTeam}</strong> vs. <strong>{nextMatch.awayTeam}</strong></p>
                    <p>{nextMatch.date} {nextMatch.time && `| ${nextMatch.time}`}</p>
                    {nextMatch.location && <p>{nextMatch.location}</p>}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Letzte Begegnung</CardTitle></CardHeader>
                  <CardContent className="text-sm text-foreground/70">{nextMatch.lastMeeting || 'Keine Daten'}</CardContent>
                </Card>
                <Card className="md:col-span-2">
                  <CardHeader><CardTitle>Formkurven</CardTitle></CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="rounded-xl border bg-muted/40 p-4"><p className="text-xs font-medium text-foreground/60 mb-2">Form {nextMatch.homeTeam}</p><p className="font-mono">{nextMatch.form?.home || '—'}</p></div>
                    <div className="rounded-xl border bg-muted/40 p-4"><p className="text-xs font-medium text-foreground/60 mb-2">Form {nextMatch.awayTeam}</p><p className="font-mono">{nextMatch.form?.away || '—'}</p></div>
                  </CardContent>
                </Card>
              </div>
            ) : <div className="rounded-2xl border bg-white p-6 text-sm text-foreground/70">Spielplan Daten folgen…</div>}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
