
"use client";

import { usePathname, useRouter } from "next/navigation";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { OfflineIndicator } from "./offline-indicator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { LogOut, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

const portalTitles: Record<string, string> = {
  "/student": "Student Dashboard",
  "/student/progress": "Progress Tracker",
  "/student/learn": "Learning Module",
  "/student/quiz": "Skill Quiz",
  "/student/certificates": "Certification Center",
  "/student/resilience": "Financial Resilience",
  "/cortex-ai": "AI Chat & Contextual Learning",
  "/teacher": "Teacher Dashboard",
  "/teacher/content": "Content Curation",
  "/teacher/training": "Professional Development",
};

const topLevelPaths = ["/student", "/teacher"];

export function MainHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile } = useSidebar();
  const title =
    Object.keys(portalTitles).find((key) => pathname.startsWith(key))
      ? portalTitles[
          Object.keys(portalTitles)
            .filter((key) => pathname.startsWith(key))
            .sort((a, b) => b.length - a.length)[0]
        ]
      : "EDUPEAK";

  const isCortexPage = pathname.startsWith('/cortex-ai');
  const showBackButton = !topLevelPaths.includes(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        {isMobile && !isCortexPage && (
          <SidebarTrigger />
        )}
        {showBackButton && (
           <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
        )}
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <OfflineIndicator />
        <UserMenu />
      </div>
    </header>
  );
}

function UserMenu() {
  const pathname = usePathname();
  const role = pathname.split("/")[1] || "student";
  const name =
    role.charAt(0).toUpperCase() + role.slice(1) + " User";
  const initials = (role.charAt(0) + "U").toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage
            src={`https://picsum.photos/seed/${role}/100/100`}
            alt={name}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {role}@edupeak.ng
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
