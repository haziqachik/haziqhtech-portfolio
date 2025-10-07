"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  Share2, 
  Bookmark, 
  Eye, 
  Clock, 
  Linkedin, 
  Link2, 
  Download,
  ExternalLink 
} from "lucide-react";
import { motion } from "framer-motion";

interface BlogInteractionsProps {
  slug: string;
  title: string;
  readingTime: string;
  pageViews?: number;
}

export function BlogInteractions({ slug, title, readingTime, pageViews = 0 }: BlogInteractionsProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load likes from localStorage or API
    const savedLikes = localStorage.getItem(`blog-likes-${slug}`);
    const savedLiked = localStorage.getItem(`blog-liked-${slug}`) === 'true';
    const savedBookmarked = localStorage.getItem(`blog-bookmarked-${slug}`) === 'true';
    
    if (savedLikes) setLikes(parseInt(savedLikes, 10));
    setHasLiked(savedLiked);
    setHasBookmarked(savedBookmarked);
  }, [slug]);

  const handleLike = () => {
    const newLiked = !hasLiked;
    const newLikes = newLiked ? likes + 1 : likes - 1;
    
    setHasLiked(newLiked);
    setLikes(newLikes);
    
    localStorage.setItem(`blog-likes-${slug}`, newLikes.toString());
    localStorage.setItem(`blog-liked-${slug}`, newLiked.toString());
  };

  const handleBookmark = () => {
    const newBookmarked = !hasBookmarked;
    setHasBookmarked(newBookmarked);
    localStorage.setItem(`blog-bookmarked-${slug}`, newBookmarked.toString());
  };

  const handleShare = async (platform?: string) => {
    const url = `https://haziqhtech.sg/blog/${slug}`;
    const text = `Check out this article: ${title}`;

    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(url);
        setIsSharing(true);
        setTimeout(() => setIsSharing(false), 2000);
      } catch (err) {
        console.error('Failed to copy URL:', err);
      }
    } else if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  if (!mounted) return null;

  return (
    <Card className="sticky top-4 border-primary/20">
      <CardContent className="p-6 space-y-6">
        {/* Reading Stats */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Article Stats
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>{readingTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4 text-green-500" />
              <span>{pageViews.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Heart className="h-4 w-4 text-red-500" />
              <span>{likes} likes</span>
            </div>
          </div>
        </div>

        {/* Interaction Buttons */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Engage
          </h3>
          <div className="flex flex-col gap-2">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant={hasLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="w-full justify-start"
              >
                <Heart className={`h-4 w-4 mr-2 ${hasLiked ? 'fill-current' : ''}`} />
                {hasLiked ? 'Liked' : 'Like'} ({likes})
              </Button>
            </motion.div>

            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant={hasBookmarked ? "default" : "outline"}
                size="sm"
                onClick={handleBookmark}
                className="w-full justify-start"
              >
                <Bookmark className={`h-4 w-4 mr-2 ${hasBookmarked ? 'fill-current' : ''}`} />
                {hasBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
            </motion.div>

            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare()}
                className="w-full justify-start"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Article
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Share Options */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Share On
          </h3>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleShare('linkedin')}
              className="justify-start text-blue-700 hover:text-blue-800 flex-1"
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleShare('copy')}
            className="w-full justify-start"
          >
            <Link2 className="h-4 w-4 mr-2" />
            {isSharing ? 'Link Copied!' : 'Copy Link'}
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3 border-t pt-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            More Actions
          </h3>
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="w-full justify-start"
            >
              <a href={`https://github.com/haziqachik/haziqhtech-portfolio/blob/main/apps/portfolio-mixed/content/blog/${slug}.mdx`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Source
              </a>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.print()}
              className="w-full justify-start"
            >
              <Download className="h-4 w-4 mr-2" />
              Print / PDF
            </Button>
          </div>
        </div>

        {/* Reading Progress Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Reading Progress</span>
            <span>0%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}