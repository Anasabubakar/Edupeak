
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EdupeakLogo } from "@/components/icons";
import { GraduationCap, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="absolute top-0 left-0 p-8">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <EdupeakLogo className="h-6 w-6" />
          <span className="font-bold text-lg">EDUPEAK</span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome to EDUPEAK</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your Resilient Learning Management Ecosystem
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="w-48">
            <Link href="/teacher/login">
              <Users className="mr-2 h-5 w-5" />
              I am a Teacher
            </Link>
          </Button>
          <Button asChild size="lg" className="w-48">
            <Link href="/student/login">
              <GraduationCap className="mr-2 h-5 w-5" />
              I am a Student
            </Link>
          </Button>
        </div>
      </main>

      <footer className="p-8 text-center text-sm text-muted-foreground">
        <div className="space-y-2">
            <div className="space-x-4">
                <Link href="#" className="hover:underline">Offline Help</Link>
                <span>Version 1.0.0</span>
            </div>
            <p>Copyright © 2025 SPARK™ - All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
