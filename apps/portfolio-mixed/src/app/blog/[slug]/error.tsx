'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Blog post error:', error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="relative">
        <div className="absolute inset-0 animate-pulse blur-2xl bg-destructive/20 rounded-full"></div>
        <h1 className="relative text-6xl font-bold text-destructive">⚠️</h1>
      </div>
      
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tight">
          Oops! Something went wrong
        </h2>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          We encountered an error while loading this blog post. This has been logged and we&apos;ll look into it.
        </p>
      </div>

      {error.digest && (
        <div className="rounded-lg bg-muted/50 px-4 py-2 font-mono text-sm text-muted-foreground">
          Error ID: {error.digest}
        </div>
      )}

      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={reset}
          className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
        >
          Try again
        </button>
        <Link
          href="/blog"
          className="rounded-full border border-border bg-background px-6 py-3 font-semibold transition-all hover:bg-accent hover:shadow-lg"
        >
          Back to blog
        </Link>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <details className="mt-8 w-full max-w-2xl rounded-lg border border-destructive/50 bg-destructive/5 p-4 text-left">
          <summary className="cursor-pointer font-semibold text-destructive">
            Error details (development only)
          </summary>
          <pre className="mt-4 overflow-auto rounded bg-muted p-4 text-xs">
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  );
}
