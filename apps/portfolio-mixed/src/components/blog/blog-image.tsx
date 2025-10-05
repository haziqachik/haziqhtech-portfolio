import Image from "next/image";
import { Card } from "@/components/ui/card";

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function BlogImage({ 
  src, 
  alt, 
  caption, 
  width = 800, 
  height = 400, 
  className = "",
  priority = false 
}: BlogImageProps) {
  return (
    <figure className={`my-8 ${className}`}>
      <Card className="overflow-hidden border-primary/20">
        <div className="relative aspect-video bg-muted">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority={priority}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      </Card>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Hero image component for blog posts
interface BlogHeroImageProps {
  title: string;
  category?: string;
  readingTime?: string;
  publishDate?: string;
  gradient?: string;
}

export function BlogHeroImage({ 
  title, 
  category = "Technical Article", 
  readingTime = "5 min read",
  publishDate,
  gradient = "from-blue-600 via-purple-600 to-indigo-600"
}: BlogHeroImageProps) {
  return (
    <div className="relative h-64 md:h-80 overflow-hidden rounded-2xl border border-primary/20 mb-8">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />
      
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center p-8">
        <div className="text-center text-white space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-1 text-sm">
            <span>{category}</span>
            <span>•</span>
            <span>{readingTime}</span>
            {publishDate && (
              <>
                <span>•</span>
                <span>{publishDate}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {title}
          </h1>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-lg" />
    </div>
  );
}