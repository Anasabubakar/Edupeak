'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { studentData } from '@/lib/placeholder-data';
import {
  Book,
  PlusCircle,
  Sparkles,
  Star,
  Flame,
  Award,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from 'recharts';
import Link from 'next/link';

export default function StudentDashboard() {
  const { progress, points } = studentData;

  const quests = [
    {
      icon: Book,
      title: 'Localized Lessons',
      description: 'Complete quests to earn points.',
      points: 50,
    },
    {
      icon: PlusCircle,
      title: 'New Quests',
      description: 'Start new challenges.',
      points: 25,
    },
    {
      icon: Sparkles,
      title: 'Recommended for You',
      description: 'Quests tailored to your skills.',
      points: 80,
    },
  ];

  const badges = [
    { icon: Star, label: 'Initiator', color: 'text-yellow-400', fill: 'bg-yellow-400/10' },
    { icon: Flame, label: 'Hot Streak', color: 'text-orange-500', fill: 'bg-orange-500/10' },
    { icon: Award, label: 'Achiever', color: 'text-slate-400', fill: 'bg-slate-400/10' },
  ];

  const chartData = [{ name: 'Progress', value: progress, fill: 'hsl(var(--primary))' }];

  return (
    <div className="space-y-8">
      {/* Responsive Progress Display */}
      <div className="py-8">
        <div className="relative mx-auto h-48 w-48 md:h-64 md:w-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="80%"
              outerRadius="100%"
              Financial Resilience Score
                </CardTitle>
          <span className="text-2xl font-bold text-yellow-400">
            {studentData.progress}%
          </span>
        </div>
        <CardDescription>Resilience Index</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={studentData.progress} className="h-2" indicatorColor="bg-yellow-400" />
      </CardContent>
    </Card>
        </div >
      </div >
    <Button
      asChild
      variant="default"
      size="icon"
      className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg"
    >
      <Link href="/cortex-ai">
        <Sparkles className="h-7 w-7" />
        <span className="sr-only">Cortex AI</span>
      </Link>
    </Button>
    </div >
  );
}
