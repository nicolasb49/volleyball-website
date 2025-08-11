export default function LoadingPlayer(){
  return (
    <div className="container py-12 space-y-8 animate-pulse">
      <div className="h-6 w-32 bg-muted rounded" />
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="aspect-square rounded-3xl bg-muted" />
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-8 w-72 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({length:4}).map((_,i)=>(<div key={i} className="h-20 rounded-xl bg-white border p-4"><div className="h-3 w-16 bg-muted rounded mb-2" /><div className="h-5 w-10 bg-muted rounded" /></div>))}
          </div>
        </div>
      </div>
    </div>
  );
}
