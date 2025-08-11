import { Hero } from '../components/sections/hero';
import { NextMatchSnippet } from '../components/sections/next-match-snippet';

async function getNextMatch() {
  try {
    const { sanityGetNextMatch } = await import('../lib/sanity/queries');
    return await sanityGetNextMatch();
  } catch { return null; }
}

export default async function LandingPage(){
  const match = await getNextMatch();
  return (
    <div>
      <Hero />
      <NextMatchSnippet match={match || undefined} />
    </div>
  );
}
