
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  PlayCircle,
  ChevronDown,
  Book,
  Laptop,
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { sampleCurriculum } from '@/lib/placeholder-data';

export default function LearnPage() {
  return (
    <div className="space-y-8">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-3xl font-bold font-headline p-2 -ml-2 hover:bg-muted/50 transition-colors"
            >
              Course: {sampleCurriculum.title}
              <ChevronDown className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72">
            <DropdownMenuItem>
              <Book className="mr-2 h-4 w-4" />
              <span>CS101: Intro to CS</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Laptop className="mr-2 h-4 w-4" />
              <span>ECON101: Microeconomics</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BookOpen className="mr-2 h-4 w-4" />
              <span>MATH101: Calculus I</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <p className="text-muted-foreground mt-1 text-lg">
          {sampleCurriculum.description}
        </p>
      </div>

      <Card className="border-l-4 border-l-primary shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">
                Current Module: Algorithms & Data Structures
              </CardTitle>
              <CardDescription className="text-base mt-1">
                Week 3 - Lecture 1
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed text-foreground/80">{sampleCurriculum.content}</p>
          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border" dangerouslySetInnerHTML={{ __html: sampleCurriculum.notesHtml }} />
        </CardContent>
        <CardFooter className="flex gap-4 pt-4">
          <Button size="lg" className="shadow-sm hover:shadow-md transition-all">
            <Link href="/student/learn/live-class" className="flex items-center">
              <PlayCircle className="mr-2 h-5 w-5" />
              Start Live Class
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="hover:bg-muted transition-colors">
            <Book className="mr-2 h-5 w-5" />
            View Syllabus
          </Button>
        </CardFooter>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
          <CardHeader>
            <CardTitle className="group-hover:text-primary transition-colors">Recommended Reading</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Introduction to Algorithms (CLRS)</li>
              <li>Clean Code by Robert C. Martin</li>
              <li>The Pragmatic Programmer</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
          <CardHeader>
            <CardTitle className="group-hover:text-primary transition-colors">Upcoming Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between"><span>Binary Search Implementation</span> <span className="text-red-500 text-sm">Due Tomorrow</span></li>
              <li className="flex justify-between"><span>Sorting Analysis Essay</span> <span className="text-orange-500 text-sm">Due in 3 days</span></li>
            </ul>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
