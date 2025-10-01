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
  { href: "/projects", label: "Projects" },
  { href: "/timeline", label: "Timeline" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

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

  // Filter nav links based on search
  const filteredNavLinks = navLinks.filter(link => 
    link.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                      placeholder="Search pages..."
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
                    <AnimatePresence>
                      {filteredNavLinks.map((item, index) => {
                        const IconComponent = navIcons[item.label as keyof typeof navIcons];
                        const isActive = pathname === item.href;
                        
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
                                    : "text-gray-700 hover:bg-gray-50 hover:shadow-sm dark:text-gray-300 dark:hover:bg-slate-800"
                                }`}
                              >
                                <motion.div
                                  whileHover={{ rotate: 5 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <IconComponent className="h-5 w-5" />
                                </motion.div>
                                <span className="flex-1">{item.label}</span>
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
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-800"
                    >
                      <Download className="h-4 w-4" />
                      Download CV
                    </motion.button>
                  </div>
                </div>

                {/* Social Links */}
                <div className="px-6 py-4 border-t border-gray-100 dark:border-slate-700">
                  <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Connect</h4>
                  <div className="flex gap-2">
                    {[
                      { icon: Github, href: "#", label: "GitHub" },
                      { icon: Linkedin, href: "#", label: "LinkedIn" },
                      { icon: Mail, href: "/contact", label: "Email" }
                    ].map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-blue-100 hover:text-blue-600 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.a>
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
