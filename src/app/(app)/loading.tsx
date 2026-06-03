export default function Loading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-foreground/10 border-t-accent rounded-full animate-spin" />
        <p className="text-xs font-mono text-foreground/30 tracking-wider uppercase">Loading...</p>
      </div>
    </div>
  );
}
