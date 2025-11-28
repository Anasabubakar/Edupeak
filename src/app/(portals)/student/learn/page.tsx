
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
              className="flex items-center gap-2 text-3xl font-bold font-headline p-2 -ml-2"
            >
              Learning Module: Financial Literacy
              <ChevronDown className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72">
            <DropdownMenuItem>
              <Book className="mr-2" />
              <span>Financial Literacy</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Laptop className="mr-2" />
              <span>Digital Skills</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <p className="text-muted-foreground mt-1">
          Understanding the fundamentals of business and finance.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">
              {sampleCurriculum.title}
            </CardTitle>
          </div>
          <CardDescription>
            {sampleCurriculum.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed">{sampleCurriculum.content}</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/student/learn/live-class">
              <PlayCircle className="mr-2 h-4 w-4" />
              Start Live Class
            </Link>
          </Button>
        </CardFooter>
      </Card>

    </div>
  );
}
