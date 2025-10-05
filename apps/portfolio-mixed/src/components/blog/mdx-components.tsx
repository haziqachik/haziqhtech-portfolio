import { BlogImage } from "@/components/blog/blog-image";

// Custom MDX components for enhanced blog posts
export const mdxComponents = {
  BlogImage,
  // Enhanced image component
  img: ({ src, alt, ...props }: any) => (
    <BlogImage
      src={src}
      alt={alt || "Blog image"}
      className="my-8"
      {...props}
    />
  ),
  
  // Enhanced code blocks
  pre: ({ children, ...props }: any) => (
    <div className="relative my-6 overflow-hidden rounded-lg border border-border/50 bg-muted/50">
      <pre className="overflow-x-auto p-4 text-sm" {...props}>
        {children}
      </pre>
    </div>
  ),
  
  // Enhanced blockquotes
  blockquote: ({ children, ...props }: any) => (
    <blockquote 
      className="my-6 border-l-4 border-primary/50 bg-primary/5 p-4 italic" 
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Call-out boxes
  Callout: ({ type = "info", children }: { type?: "info" | "warning" | "success" | "error"; children: React.ReactNode }) => {
    const styles = {
      info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
      warning: "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",
      success: "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
      error: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100"
    };

    return (
      <div className={`my-6 rounded-lg border-l-4 p-4 ${styles[type]}`}>
        {children}
      </div>
    );
  },

  // Technical specs table
  TechSpecs: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 overflow-hidden rounded-lg border border-border/50">
      <div className="bg-muted/50 px-4 py-2 text-sm font-medium">
        Technical Specifications
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  )
};