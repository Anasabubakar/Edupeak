
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Target,
  Trophy,
  BarChart3,
  Edit,
  Library,
  ChevronsLeft,
  Sparkles,
  LineChart,
  Award,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EdupeakLogo } from "./icons";
import { useSidebar } from "./ui/sidebar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const studentNav = [
  { href: "/student", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/student/progress", icon: LineChart, label: "Progress Tracker" },
  { href: "/student/learn", icon: BookOpen, label: "Learn" },
  { href: "/student/quiz", icon: Target, label: "Lessons" },
  { href: "/student/planner", icon: Calendar, label: "Study Planner" },
  { href: "/student/certificates", icon: Award, label: "Certificates" },
  { href: "/student/resilience", icon: Trophy, label: "Resilience Score" },
  { href: "/cortex-ai", icon: Sparkles, label: "Cortex AI" },
];

const teacherNav = [
  { href: "/teacher", icon: BarChart3, label: "Analytics" },
  { href: "/teacher/content", icon: Edit, label: "Custom Content" },
  { href: "/teacher/training", icon: Library, label: "Training" },
];

export function MainSidebar() {
  const { isMobile, open, setOpen, isCollapsed, toggleCollapsed } = useSidebar();
  const pathname = usePathname();
  const portal = pathname.split("/")[1] || "student";

  const getNavItems = () => {
    switch (portal) {
      case "student":
        return studentNav;
      case "teacher":
        return teacherNav;
      default:
        return studentNav;
    }
  };

  const navItems = getNavItems();

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <header
        className={cn(
          "flex h-16 items-center justify-between border-b border-sidebar-border px-4"
        )}
      >
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 font-bold text-sidebar-foreground",
            isCollapsed && !isMobile && "justify-center"
          )}
        >
          <EdupeakLogo className="h-6 w-6 text-sidebar-primary" />
          <span
            className={cn(
              "transition-all",
              isCollapsed && !isMobile ? "hidden" : "inline"
            )}
          >
            EDUPEAK
          </span>
        </Link>
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleCollapsed}
          >
            <ChevronsLeft
              className={cn(
                "h-5 w-5 transition-transform",
                isCollapsed && "rotate-180"
              )}
            />
            <span className="sr-only">
              {isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            </span>
          </Button>
        )}
      </header>
      <TooltipProvider delayDuration={0}>
        <nav
          className={cn(
            "flex-1 space-y-4 p-4",
            isCollapsed && !isMobile ? "px-2" : ""
          )}
        >
          {navItems.map((item) => {
            const isActive =
              pathname.startsWith(item.href) &&
              (item.href.length > `/${portal}`.length
                ? true
                : pathname === item.href);

            const linkContent = (
              <div
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all group",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isCollapsed && !isMobile ? "justify-center" : ""
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span
                  className={cn(
                    "transition-all",
                    isCollapsed && !isMobile ? "hidden" : "inline"
                  )}
                >
                  {item.label}
                </span>
              </div>
            );

            if (isCollapsed && !isMobile) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link href={item.href}>{linkContent}</Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              );
            }

            return (
              <Link key={item.href} href={item.href}>
                {linkContent}
              </Link>
            );

          })}
        </nav>
      </TooltipProvider>
      <footer
        className={cn(
          "mt-auto space-y-2 border-t border-sidebar-border p-4",
          isCollapsed && !isMobile ? "px-2" : ""
        )}
      >
        {/* The toggle button was moved to the header */}
      </footer>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0 border-r-0">
          <SheetTitle><span className="sr-only">Main Menu</span></SheetTitle>
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        "hidden bg-sidebar md:block transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <SidebarContent />
    </aside>
  );
}
