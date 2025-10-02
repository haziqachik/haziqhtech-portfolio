"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button as UiButton } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
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
  X
} from "lucide-react";
// import { getProfile } from "@/lib/content"; // Available for future use

const navLinks: NavLinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/architecture", label: "Architecture" },
  { href: "/projects", label: "Projects" },
  { href: "/timeline", label: "Timeline" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

// Real content search data - actual content from your files
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

// Specific content excerpts for better search results
const detailedContent = {
  '/timeline': `building construction authority executive data analyst power bi formsg uipath automation 
    cpf central provident fund uat tester singapore police force radar operator officer coast guard 
    coastal patrol squadron maritime surveillance`,
  '/blog': `maritime safeguarding singapore police coast guard 140000 vessel movements tuas mega port 
    automation security radar operator surveillance singapore strait chokepoint economics evidence 
    machine speed power bi dashboards ccna ceh lab notes preflight automation`,
  '/resume': `singapore police force radar operator officer coast guard coastal patrol squadron maritime 
    radar surveillance systems building construction authority data analyst power bi workspace 
    permissions formsg survey workflows uipath automation cpf uat tester ccna az-500 labs`,
  '/projects': `ceh study hub network security cybersecurity certification formsg survey automation 
    power bi dashboard network engineering labs cisco packet tracer vmware gns3 uipath rpa`
};

// Icon mapping for navigation items - using Lucide icons to match your design
const navIcons = {
  Home: Home,
  Projects: FolderOpen,
  Timeline: Clock,
  Blog: PenTool,
  Resume: FileText,
  Contact: MessageCircle,
};

// Get time-based greeting
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

export function HeaderNav() {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isOnline, setIsOnline] = React.useState(true);
  const pathname = usePathname();
  // const profile = getProfile(); // Available for future use

  // Auto-close side nav when resizing to desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard navigation support
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus trap - prevent scrolling on body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // Online/offline status
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Content-aware search that finds terms in actual page content
  const filteredNavLinks = searchQuery 
    ? contentSearchData.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
          item.label.toLowerCase().includes(query) ||
          item.content.toLowerCase().includes(query) ||
          (detailedContent[item.href as keyof typeof detailedContent]?.toLowerCase().includes(query))
        );
      }).map(item => navLinks.find(link => link.href === item.href)!).filter(Boolean)
    : navLinks;

  return (
    <header
      className={[
        "sticky top-0 z-30 border-b border-border/60 bg-background/70 md:backdrop-blur transition-opacity duration-200",
        open ? "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto" : "opacity-100",
      ].join(" ")}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Haziq Asyraaf
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <DesktopNav links={navLinks} />
        </nav>

        <div className="flex items-center gap-2">
          {/* Keep theme toggle visible on desktop header; move it into sheet for mobile */}
          <div className="hidden md:block">
            <ModeToggle />
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <UiButton variant="outline" size="icon" className="md:hidden">
                <span className="sr-only">Open navigation menu</span>
                <Menu className="h-5 w-5" />
              </UiButton>
            </SheetTrigger>
            <SheetContent className="w-80 bg-white p-0 dark:bg-slate-900">
              <motion.div 
                className="flex h-full flex-col"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                {/* Enhanced Header with Avatar and Greeting */}
                <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4 dark:border-slate-700">
                  <motion.div 
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    H
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Haziq Asyraaf</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{getGreeting()}!</p>
                  </div>
                  <ModeToggle />
                </div>

                {/* Enhanced Status with Online Indicator */}
                <div className="px-6 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <motion.div 
                      className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
                      animate={{ scale: isOnline ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className={isOnline ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}>
                      {isOnline ? 'Available' : 'Offline'}
                    </span>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="px-6 pt-2 pb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search pages & content..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        title="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Enhanced Navigation Links with Animations */}
                <nav className="flex-1 px-6 py-2">
                  <div className="space-y-1">
                    {searchQuery && (
                      <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
                        {filteredNavLinks.length > 0 
                          ? `Found &quot;${searchQuery}&quot; in ${filteredNavLinks.length} page${filteredNavLinks.length !== 1 ? 's' : ''}`
                          : `No content found for &quot;${searchQuery}&quot;`
                        }
                      </div>
                    )}
                    <AnimatePresence>
                      {filteredNavLinks.map((item, index) => {
                        const IconComponent = navIcons[item.label as keyof typeof navIcons];
                        const isActive = pathname === item.href;
                        const contentItem = contentSearchData.find(c => c.href === item.href);
                        const matchesSearch = searchQuery && contentItem?.content.toLowerCase().includes(searchQuery.toLowerCase());
                        
                        return (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <SheetClose asChild>
                              <Link
                                href={item.href}
                                className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                  isActive
                                    ? "bg-blue-50 text-blue-600 shadow-sm dark:bg-blue-900/20 dark:text-blue-400"
                                    : matchesSearch
                                    ? "bg-yellow-50 text-gray-800 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-200 dark:border-yellow-700"
                                    : "text-gray-700 hover:bg-gray-50 hover:shadow-sm dark:text-gray-300 dark:hover:bg-slate-800"
                                }`}
                              >
                                <motion.div
                                  whileHover={{ rotate: 5 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <IconComponent className="h-5 w-5" />
                                </motion.div>
                                <div className="flex-1 flex flex-col">
                                  <span>{item.label}</span>
                                  {matchesSearch && (
                                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                      Contains &quot;{searchQuery}&quot;
                                    </span>
                                  )}
                                </div>
                                {isActive && (
                                  <motion.span 
                                    className="text-xs font-medium text-blue-600 dark:text-blue-400"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                  >
                                    Active
                                  </motion.span>
                                )}
                                
                                {/* Ripple effect on tap */}
                                <motion.div
                                  className="absolute inset-0 rounded-lg bg-blue-200/30"
                                  initial={{ scale: 0, opacity: 0 }}
                                  whileTap={{ scale: 1.5, opacity: [0, 0.3, 0] }}
                                  transition={{ duration: 0.3 }}
                                />
                              </Link>
                            </SheetClose>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </nav>

                {/* Quick Actions Section */}
                <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-700">
                  <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Quick Actions</h4>
                  <div className="space-y-2">
                    <SheetClose asChild>
                      <motion.a
                        href="/Haziq_Asyraaf_CV.pdf"
                        download
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-800"
                      >
                        <Download className="h-4 w-4" />
                        Download CV
                      </motion.a>
                    </SheetClose>
                  </div>
                </div>

                {/* Social Links */}
                <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-700">
                  <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Connect</h4>
                  <div className="flex gap-2">
                    {[
                      { icon: Github, href: "https://github.com/haziqhtech", label: "GitHub" },
                      { icon: Linkedin, href: "https://linkedin.com/in/haziqasyraaf-sg", label: "LinkedIn" },
                      { icon: Mail, href: "mailto:haziq@haziqhtech.sg", label: "Email" }
                    ].map((social) => (
                      <SheetClose asChild key={social.label}>
                        <motion.a
                          href={social.href}
                          target={social.href.startsWith('http') ? '_blank' : undefined}
                          rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-blue-100 hover:text-blue-600 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                          title={`Open ${social.label}`}
                        >
                          <social.icon className="h-5 w-5" />
                        </motion.a>
                      </SheetClose>
                    ))}
                  </div>
                </div>

                {/* Enhanced Footer CTA */}
                <motion.div 
                  className="border-t border-gray-100 px-6 py-4 dark:border-slate-700"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <motion.div 
                        className="h-2 w-2 rounded-full bg-green-500"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-green-600 dark:text-green-400">Available for projects</span>
                    </div>
                  </div>
                  
                  <SheetClose asChild>
                    <motion.a
                      href="/contact"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Let&apos;s collaborate!
                    </motion.a>
                  </SheetClose>
                  
                  <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
                    Response time: Usually within 24h
                  </p>
                </motion.div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default HeaderNav;
