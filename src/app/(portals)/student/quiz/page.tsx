
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { skillQuests } from "@/lib/placeholder-data";
import { Search, ChevronDown, Target, X, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const subjectColors: Record<string, string> = {
  "Computer Science": "bg-blue-500/10 text-blue-600 border-blue-200",
  "Economics": "bg-green-500/10 text-green-600 border-green-200",
  "Calculus": "bg-purple-500/10 text-purple-600 border-purple-200",
  "Academic Writing": "bg-orange-500/10 text-orange-600 border-orange-200",
};

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-100 text-green-700 border-green-200",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Hard: "bg-red-100 text-red-700 border-red-200",
};

type FilterCategory = "difficulty" | "subject" | "status";

export default function LessonsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    difficulty: [] as string[],
    subject: [] as string[],
    status: [] as string[],
  });

  const handleFilterChange = (
    category: FilterCategory,
    value: string,
    checked: boolean
  ) => {
    setFilters((prev) => {
      const newValues = checked
        ? [...prev[category], value]
        : prev[category].filter((v) => v !== value);
      return { ...prev, [category]: newValues };
    });
  };

  const clearFilters = () => {
    setFilters({
      difficulty: [],
      subject: [],
      status: [],
    });
  };

  const getStatus = (progress: number) => {
    if (progress === 100) return "Completed";
    if (progress > 0) return "In Progress";
    return "Not Started";
  }

  const filteredQuests = skillQuests.filter((quest) => {
    const status = getStatus(quest.progress);
    return (
      (quest.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filters.difficulty.length === 0 || filters.difficulty.includes(quest.difficulty)) &&
      (filters.subject.length === 0 || filters.subject.includes(quest.subject)) &&
      (filters.status.length === 0 || filters.status.includes(status))
    );
  });

  const difficulties = ["Easy", "Medium", "Hard"];
  const subjects = ["Computer Science", "Economics", "Calculus", "Academic Writing"];
  const statuses = ["Not Started", "In Progress", "Completed"];

  const isAnyFilterActive = filters.difficulty.length > 0 || filters.subject.length > 0 || filters.status.length > 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          Lessons & Assignments
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Access your course materials, assignments, and practice problems.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search lessons..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                Difficulty <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Difficulty</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {difficulties.map(d => (
                <DropdownMenuCheckboxItem
                  key={d}
                  checked={filters.difficulty.includes(d)}
                  onCheckedChange={(checked) => handleFilterChange("difficulty", d, !!checked)}
                >
                  {d}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                Subject <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Subject</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {subjects.map(s => (
                <DropdownMenuCheckboxItem
                  key={s}
                  checked={filters.subject.includes(s)}
                  onCheckedChange={(checked) => handleFilterChange("subject", s, !!checked)}
                >
                  {s}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                Status <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {statuses.map(s => (
                <DropdownMenuCheckboxItem
                  key={s}
                  checked={filters.status.includes(s)}
                  onCheckedChange={(checked) => handleFilterChange("status", s, !!checked)}
                >
                  {s}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {isAnyFilterActive && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9">
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredQuests.map((quest) => (
          <Link key={quest.id} href={`/student/quiz/${quest.id}`} className="flex group">
            <Card
              className="flex flex-col flex-1 hover:border-primary/50 transition-all duration-300 hover:shadow-md"
            >
              <CardHeader>
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{quest.title}</CardTitle>
                  <Badge
                    variant="outline"
                    className={cn(
                      "shrink-0",
                      difficultyColors[quest.difficulty] || "bg-muted text-muted-foreground"
                    )}
                  >
                    {quest.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex gap-2 mb-4">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "border",
                      subjectColors[quest.subject] || "bg-muted text-muted-foreground"
                    )}
                  >
                    {quest.subject}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 border-t pt-4 bg-muted/20">
                {quest.progress > 0 ? (
                  <>
                    <div className="flex justify-between w-full text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{quest.progress}%</span>
                    </div>
                    <Progress value={quest.progress} className="h-2 w-full" />
                  </>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs text-muted-foreground">Not Started</span>
                    <Button size="sm" variant="ghost" className="h-7 text-xs">Start Lesson</Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
