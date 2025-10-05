"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button as UiButton } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { DesktopNav, type NavLinkItem } from "@/components/site-nav";
import { 
  Home, 
  FolderOpen, 
  Clock, 
  PenTool, 
  FileText, 
  MessageCircle, 
  Menu,
  Download,
  Github,
  Linkedin,
  Mail,
  Search,
  X,
  Settings
} from "lucide-react";

const navLinks: NavLinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/architecture", label: "Architecture" },
  { href: "/projects", label: "Projects" },
  { href: "/timeline", label: "Timeline" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

// Icon mapping for navigation items
const navIcons = {
  Home: Home,
  Architecture: Settings,
  Projects: FolderOpen,
  Timeline: Clock,
  Blog: PenTool,
  Resume: FileText,
  Contact: MessageCircle,
};

// Real content search data
const contentSearchData = [
  { 
    href: "/", 
    label: "Home", 
    content: "haziq asyraaf portfolio network security engineer singapore data analyst automation built from scratch full stack development"
  },
  { 
    href: "/architecture", 
    label: "Architecture", 
    content: "full stack architecture system design database nextjs react typescript prisma sqlite postgres mongodb api rest multi database custom development from scratch"
  },
  { 
    href: "/projects", 
    label: "Projects", 
    content: "ceh study hub network security cybersecurity formsg automation power bi dashboard uipath rpa certification lab network engineering labs cisco packet tracer vmware gns3"
  },
  { 
    href: "/timeline", 
    label: "Timeline", 
    content: "building construction authority bca executive data analyst power bi formsg uipath automation cpf central provident fund uat tester singapore police force radar operator officer coast guard coastal patrol squadron maritime surveillance"
  },
  { 
    href: "/blog", 
    label: "Blog", 
    content: "maritime safeguarding singapore police coast guard radar operator vessel movements tuas mega port automation security ccna ceh lab notes power bi preflight automation formsg survey"
  },
  { 
    href: "/resume", 
    label: "Resume", 
    content: "haziq asyraaf network security engineer ceh certified singapore police force radar operator coast guard maritime surveillance building construction authority bca data analyst power bi formsg uipath automation cpf central provident fund uat tester ccna az-500 labs"
  },
  { 
    href: "/contact", 
    label: "Contact", 
    content: "contact email haziq haziqhtech collaboration hire network security data analyst singapore"
  },
];

export function HeaderNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();

  // Ensure component is mounted on client side
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Handle window resize - close menu on desktop
  React.useEffect(() => {
    if (!mounted) return;
    
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mounted]);

  // Handle ESC key and body scroll lock
  React.useEffect(() => {
    if (!mounted) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, mounted]);

  // Filter navigation based on search
  const filteredNavLinks = React.useMemo(() => {
    if (!searchQuery || !mounted) return navLinks;
    
    return contentSearchData.filter(item => {
      const query = searchQuery.toLowerCase();
      return (
        item.label.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
      );
    }).map(item => navLinks.find(link => link.href === item.href)!).filter(Boolean);
  }, [searchQuery, mounted]);

  const handleMenuToggle = () => {
    if (!mounted) return;
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Haziq Asyraaf
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            <DesktopNav links={navLinks} />
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ModeToggle />
            </div>
            <UiButton 
              variant="outline" 
              size="icon" 
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </UiButton>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Haziq Asyraaf
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            <DesktopNav links={navLinks} />
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ModeToggle />
            </div>

            <UiButton 
              variant="outline" 
              size="icon" 
              className="md:hidden"
              onClick={handleMenuToggle}
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-5 w-5" />
            </UiButton>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-80 bg-background border-l border-border md:hidden"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      H
                    </div>
                    <div>
                      <h3 className="font-semibold">Haziq Asyraaf</h3>
                      <p className="text-sm text-muted-foreground">Available for projects</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ModeToggle />
                    <UiButton 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </UiButton>
                  </div>
                </div>

                {/* Search */}
                <div className="px-6 py-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search pages & content..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {searchQuery && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      {filteredNavLinks.length > 0 
                        ? `Found "${searchQuery}" in ${filteredNavLinks.length} page${filteredNavLinks.length !== 1 ? 's' : ''}`
                        : `No content found for "${searchQuery}"`
                      }
                    </div>
                  )}
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 pb-6">
                  <div className="space-y-1">
                    {filteredNavLinks.map((item, index) => {
                      const IconComponent = navIcons[item.label as keyof typeof navIcons] || Home;
                      const isActive = pathname === item.href;
                      const contentItem = contentSearchData.find(c => c.href === item.href);
                      const matchesSearch = searchQuery && contentItem?.content.toLowerCase().includes(searchQuery.toLowerCase());
                      
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={item.href}
                            onClick={handleLinkClick}
                            className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : matchesSearch
                                ? "bg-accent text-accent-foreground border border-accent-foreground/20"
                                : "text-foreground hover:bg-accent hover:text-accent-foreground"
                            }`}
                          >
                            <IconComponent className="h-5 w-5" />
                            <div className="flex-1">
                              <span>{item.label}</span>
                              {matchesSearch && (
                                <div className="text-xs opacity-70 mt-0.5">
                                  Contains "{searchQuery}"
                                </div>
                              )}
                            </div>
                            {isActive && (
                              <span className="text-xs font-medium opacity-70">
                                Active
                              </span>
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </nav>

                {/* Quick Actions */}
                <div className="border-t border-border px-6 py-4">
                  <div className="space-y-2">
                    <a
                      href="/Haziq_Asyraaf_CV.pdf"
                      download
                      onClick={handleLinkClick}
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <Download className="h-4 w-4" />
                      Download CV
                    </a>
                    <Link
                      href="/contact"
                      onClick={handleLinkClick}
                      className="flex w-full items-center gap-3 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Let's collaborate!
                    </Link>
                  </div>

                  {/* Social Links */}
                  <div className="mt-4 flex justify-center gap-3">
                    {[
                      { icon: Github, href: "https://github.com/haziqhtech", label: "GitHub" },
                      { icon: Linkedin, href: "https://linkedin.com/in/haziqasyraaf-sg", label: "LinkedIn" },
                      { icon: Mail, href: "mailto:haziq@haziqhtech.sg", label: "Email" }
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target={social.href.startsWith('http') ? '_blank' : undefined}
                        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        onClick={handleLinkClick}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:bg-accent/80"
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default HeaderNav;