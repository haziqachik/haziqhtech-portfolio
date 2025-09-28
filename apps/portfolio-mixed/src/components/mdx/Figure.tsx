import Image from "next/image";

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function Figure({ src, alt, caption, width = 1200, height = 720 }: FigureProps) {
  return (
    <figure className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-border/60 bg-background/40 shadow-xl shadow-black/10">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 800px"
          className="h-auto w-full"
          priority={false}
        />
      </div>
      {caption ? <figcaption className="text-sm text-muted-foreground">{caption}</figcaption> : null}
    </figure>
  );
}
