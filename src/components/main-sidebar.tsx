
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
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EdupeakLogo } from "./icons";

const studentNav = [
  { href: "/student/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/student/learn", icon: BookOpen, label: "Learn" },
  { href: "/student/quiz", icon: Target, label: "Lessons" },
  { href: "/student/planner", icon: Calendar, label: "Study Planner" },
  { href: "/student/certificates", icon: Award, label: "Certificates" },
  { href: "/student/resilience", icon: Trophy, label: "Resilience Score" },
  { href: "/cortex-ai", icon: Sparkles, label: "Cortex AI" },
  { href: "/student/progress", icon: LineChart, label: "Progress Tracker" },
];

export function MainSidebar() {
  const pathname = usePathname();
  EDUPEAK
          </span >
        </Link >
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
    )
}
      </header >
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
    </div >
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
