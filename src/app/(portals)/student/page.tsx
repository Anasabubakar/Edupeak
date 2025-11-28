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
              data={chartData}
              startAngle={90}
              endAngle={450}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background={{ fill: 'hsl(var(--muted))' }} dataKey="value" cornerRadius={10} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-4xl font-bold text-primary md:text-5xl">{progress}%</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Overall Skill
              <br />
              Completion
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quest Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {quests.map((quest, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <quest.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{quest.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {quest.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={quest.points} className="w-20 h-2" />
                  <span className="text-sm font-bold">{quest.points}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Digital Wallet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-baseline">
                  <p className="text-muted-foreground">My Points</p>
                  <p className="text-3xl font-bold text-yellow-400">
                    {points.toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">My Badges</p>
                <div className="flex items-center justify-around gap-4">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95"
                    >
                      <div className={`flex items-center justify-center h-16 w-16 rounded-full ${badge.fill}`}>
                        <badge.icon className={`h-8 w-8 ${badge.color}`} />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">My Certificates</p>
                <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <p className="font-medium">
                    Certificate of Financial Literacy
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">
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
        </div>
      </div>
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
    </div>
  );
}
