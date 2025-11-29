"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Target,
  Trophy,
  Sparkles,
  LineChart,
  Award,
  Calendar,
  Settings,
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen border-r border-white/5 bg-background/50 backdrop-blur-xl transition-all duration-300 ease-in-out z-50",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-8 h-6 w-6 rounded-full border border-white/10 bg-background shadow-md z-50 hover:bg-primary hover:text-white transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      {/* Logo Section */}
      <div className={cn("flex items-center h-20 px-6", isCollapsed ? "justify-center px-2" : "")}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
            <EdupeakLogo className="h-8 w-8 text-primary relative" />
          </div>
          {!isCollapsed && (
            <span className="font-headline font-bold text-xl tracking-tight text-gradient-primary">
              EDUPEAK
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-2 scrollbar-none">
        {studentNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                isActive
                  ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
              )}
              <item.icon className={cn("h-5 w-5 transition-transform duration-200 group-hover:scale-110", isActive ? "text-primary" : "")} />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg border border-white/10">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-white/5">
        <div className={cn(
          "flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group",
          isCollapsed ? "justify-center p-2" : ""
        )}>
          <Avatar className="h-9 w-9 border-2 border-primary/20">
            <AvatarImage src="/user-avatar.png" />
            <AvatarFallback className="bg-primary/10 text-primary"><User className="h-4 w-4" /></AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Student User</p>
              <p className="text-xs text-muted-foreground truncate">student@edupeak.com</p>
            </div>
          )}
          {!isCollapsed && (
            <Settings className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </div>
      </div>
    </aside>
  );
}
