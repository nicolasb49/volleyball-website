import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '../lib/utils';
import { NavBar } from '../components/ui/nav-bar';
import { Footer } from '../components/ui/footer';

const inter = Inter({ subsets: ['latin'] });

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : new URL('http://localhost:3000');
export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: 'SV Karlsruhe Beiertheim Volleyball',
  description: 'Offizielle Seite der Damenmannschaft SV Karlsruhe Beiertheim Volleyball',
  openGraph: {
    title: 'SV Karlsruhe Beiertheim Volleyball',
    description: 'Spieltagsvorschau, Team & Spielerinnen',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SV Karlsruhe Beiertheim Volleyball',
    description: 'Spieltagsvorschau, Team & Spielerinnen'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={cn(inter.className, 'min-h-screen flex flex-col bg-muted')}> 
        <a href="#main" className="sr-only focus:not-sr-only focus-ring absolute left-2 top-2 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-xl">Skip to content</a>
        <NavBar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
