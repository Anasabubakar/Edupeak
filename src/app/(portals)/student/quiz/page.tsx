
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
import { Search, ChevronDown, Target, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const subjectColors: Record<string, string> = {
  Mathematics: "bg-yellow-400/20 text-yellow-300 border-yellow-400/30",
  "English Studies": "bg-orange-400/20 text-orange-300 border-orange-400/30",
  "Basic Science": "bg-green-400/20 text-green-300 border-green-400/30",
  "Social Studies": "bg-blue-400/20 text-blue-300 border-blue-400/30",
};

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-500/80 text-green-50",
  Medium: "bg-yellow-500/80 text-yellow-50",
  Hard: "bg-red-500/80 text-red-50",
};

type FilterCategory = "difficulty" | "subject" | "status";

export default function SkillQuestsPage() {
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
  const subjects = ["Mathematics", "English Studies", "Basic Science", "Social Studies"];
  const statuses = ["Not Started", "In Progress", "Completed"];
  
  const isAnyFilterActive = filters.difficulty.length > 0 || filters.subject.length > 0 || filters.status.length > 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
          <Target className="h-8 w-8 text-primary" />
          Skill Quests
        </h1>
        <p className="text-muted-foreground mt-1">
          Search, filter, and start new learning challenges.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search for a quest..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
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
              <Button variant="outline">
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
              <Button variant="outline">
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
            <Button variant="ghost" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredQuests.map((quest) => (
          <Link key={quest.id} href={`/student/quiz/${quest.id}`} className="flex">
            <Card
              className="flex flex-col flex-1 hover:border-primary/50 transition-colors"
            >
              <CardHeader>
                <CardTitle>{quest.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex gap-2 mb-4">
                  <Badge
                    className={cn(
                      "border",
                      subjectColors[quest.subject] || "bg-muted text-muted-foreground"
                    )}
                  >
                    {quest.subject}
                  </Badge>
                  <Badge
                    className={difficultyColors[quest.difficulty] || "bg-muted text-muted-foreground"}
                  >
                    {quest.difficulty}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2">
                {quest.progress > 0 ? (
                  <>
                    <Progress value={quest.progress} className="h-2 w-full" />
                    <span className="text-xs text-muted-foreground">
                      {quest.progress}% Complete
                    </span>
                  </>
                ) : (
                  <>
                    <div className="h-2 w-full bg-muted rounded-full" />
                    <span className="text-xs text-muted-foreground">
                      Not Started
                    </span>
                  </>
                )}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
