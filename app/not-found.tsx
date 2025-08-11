export default function NotFound(){
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-5xl font-extrabold tracking-tight text-primary mb-4">404</h1>
      <p className="text-foreground/70 mb-6">Seite nicht gefunden.</p>
      <a href="/" className="inline-flex bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-medium">Zur Startseite</a>
    </div>
  );
}
