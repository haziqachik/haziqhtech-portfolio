export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 md:px-0 animate-pulse">
      {/* Header Skeleton */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-b from-primary/10 to-transparent p-10 md:p-14">
        <div className="flex flex-col gap-5">
          <div className="h-6 w-32 bg-muted rounded"></div>
          <div className="space-y-4">
            <div className="h-12 w-3/4 bg-muted rounded"></div>
            <div className="h-6 w-full bg-muted rounded"></div>
            <div className="h-6 w-2/3 bg-muted rounded"></div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 bg-muted rounded-full"></div>
            <div className="h-6 w-24 bg-muted rounded-full"></div>
            <div className="h-6 w-28 bg-muted rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
        {/* Main Content Skeleton */}
        <div className="space-y-8">
          <div className="rounded-3xl border border-border/50 bg-background/80 p-8">
            <div className="space-y-4">
              <div className="h-4 w-full bg-muted rounded"></div>
              <div className="h-4 w-full bg-muted rounded"></div>
              <div className="h-4 w-3/4 bg-muted rounded"></div>
              <div className="h-32 w-full bg-muted rounded mt-8"></div>
              <div className="h-4 w-full bg-muted rounded"></div>
              <div className="h-4 w-2/3 bg-muted rounded"></div>
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-border/60 bg-card/80 p-6">
            <div className="space-y-4">
              <div className="h-4 w-24 bg-muted rounded"></div>
              <div className="h-4 w-32 bg-muted rounded"></div>
              <div className="h-4 w-28 bg-muted rounded"></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
