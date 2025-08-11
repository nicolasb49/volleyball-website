export default function LoadingPreview(){
  return (
    <div className="container py-12 space-y-8 animate-pulse">
      <div className="h-10 w-64 bg-muted rounded-xl"/>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-48 bg-muted rounded-2xl"/>
        <div className="h-48 bg-muted rounded-2xl"/>
      </div>
      <div className="h-64 bg-muted rounded-2xl"/>
    </div>
  );
}
