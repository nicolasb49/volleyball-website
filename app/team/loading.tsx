export default function LoadingTeam(){
  return (
    <div className="container py-12 space-y-8 animate-pulse">
      <div className="h-10 w-56 rounded-xl bg-muted" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({length:8}).map((_,i)=> (
          <div key={i} className="rounded-2xl border bg-white p-4 space-y-3">
            <div className="aspect-video rounded-xl bg-muted" />
            <div className="h-4 w-2/3 bg-muted rounded" />
            <div className="h-3 w-1/3 bg-muted rounded" />
            <div className="h-3 w-24 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
