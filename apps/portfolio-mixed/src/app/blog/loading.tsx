export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header Skeleton */}
      <div className="mb-12 space-y-4 animate-pulse">
        <div className="h-12 w-48 bg-muted rounded"></div>
        <div className="h-6 w-96 bg-muted rounded"></div>
      </div>

      {/* Blog Grid Skeleton */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl animate-pulse"
          >
            <div className="p-8">
              {/* Image placeholder */}
              <div className="mb-6 h-48 w-full bg-muted rounded-2xl"></div>

              {/* Meta info */}
              <div className="mb-4 flex items-center gap-3">
                <div className="h-4 w-24 bg-muted rounded"></div>
                <div className="h-4 w-20 bg-muted rounded"></div>
              </div>

              {/* Title */}
              <div className="mb-3 space-y-2">
                <div className="h-7 w-full bg-muted rounded"></div>
                <div className="h-7 w-3/4 bg-muted rounded"></div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded"></div>
                <div className="h-4 w-full bg-muted rounded"></div>
                <div className="h-4 w-2/3 bg-muted rounded"></div>
              </div>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                <div className="h-6 w-16 bg-muted rounded-full"></div>
                <div className="h-6 w-20 bg-muted rounded-full"></div>
                <div className="h-6 w-24 bg-muted rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
