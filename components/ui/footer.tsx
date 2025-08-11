export function Footer(){
  return (
    <footer className="mt-12 border-t bg-white text-sm text-foreground/70">
      <div className="container py-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} SV Karlsruhe Beiertheim Volleyball</p>
        <nav className="flex gap-4" aria-label="Footer">
          <a href="mailto:info@svk-volleyball.de" className="hover:text-primary focus-ring rounded">Kontakt</a>
          <a href="/impressum" className="hover:text-primary focus-ring rounded">Impressum</a>
          <a href="/datenschutz" className="hover:text-primary focus-ring rounded">Datenschutz</a>
        </nav>
      </div>
    </footer>
  );
}
