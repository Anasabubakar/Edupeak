'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ProgressCircle } from '@/components/ui/progress-circle';
import { cn } from '@/lib/utils';
import { BookOpen, FlaskConical, History, Lock } from 'lucide-react';
import { studentProgressData } from '@/lib/placeholder-data';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type SubjectFilter = 'All' | 'In Progress' | 'Completed';

export default function ProgressTrackerPage() {
  const [filter, setFilter] = useState<SubjectFilter>('All');
  const { user, subjects, skillQuests, badges } = studentProgressData;

  const filteredSubjects =
    filter === 'All'
      ? subjects
      : filter === 'In Progress'
      ? subjects.filter((s) => s.progress < 100)
      : subjects.filter((s) => s.progress === 100);

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'Recommended':
        return 'text-yellow-400 border-yellow-400/50';
      case 'In Progress':
        return 'text-blue-400 border-blue-400/50';
      case 'Overdue':
        return 'text-red-400 border-red-400/50';
      default:
        return 'text-muted-foreground border-muted';
    }
  };

  const getQuestColor = (status: string) => {
    switch (status) {
      case 'Recommended':
        return 'hsl(var(--chart-2))';
      case 'In Progress':
        return 'hsl(var(--primary))';
      case 'Overdue':
        return 'hsl(var(--destructive))';
      default:
        return 'hsl(var(--muted))';
    }
  };
  
   const badgeIcons = {
    'Math Magician': BookOpen,
    'Grammar Guru': BookOpen,
    'Science Whiz': FlaskConical,
    'History Buff': History,
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-primary">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold font-headline">{user.name}'s Learning Progress</h1>
            <p className="text-sm text-muted-foreground">Student Progress Tracker</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Last synced: Just now</p>
      </div>

      <section>
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-xl font-semibold">Your Subject Progress</h2>
          <div className="flex items-center gap-2">
            {(['All', 'In Progress', 'Completed'] as SubjectFilter[]).map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => (
            <Card key={subject.name} className="p-4 bg-card/50">
              <p className="font-semibold">{subject.name}</p>
              <div className="flex items-center gap-3 mt-2">
                <Progress value={subject.progress} className="h-2" />
                <span className="text-sm font-medium text-muted-foreground">
                  {subject.progress}%
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Your Skill Quests</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skillQuests.map((quest) => (
            <Card
              key={quest.title}
              className={cn(
                'flex flex-col items-center justify-center p-6 text-center gap-4 transition-all border-2',
                getStatusClasses(quest.status)
              )}
            >
              <h3 className="font-semibold text-sm">{quest.title}</h3>
              <ProgressCircle
                value={quest.progress}
                color={getQuestColor(quest.status)}
              />
              <span
                className={cn(
                  'text-xs font-semibold px-2 py-0.5 rounded-full',
                   getStatusClasses(quest.status),
                   'bg-current/10'
                )}
              >
                {quest.status}
              </span>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Your Badges & Achievements</h2>
        <TooltipProvider>
          <div className="flex items-center justify-center gap-6 sm:gap-10">
            {badges.map((badge) => {
              const Icon = badge.achieved ? badgeIcons[badge.name as keyof typeof badgeIcons] || BookOpen : Lock;
              return (
                <Tooltip key={badge.name}>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center gap-2 text-center cursor-pointer">
                      <div
                        className={cn(
                          'h-20 w-20 rounded-full flex items-center justify-center transition-all',
                          badge.achieved
                            ? 'bg-yellow-400/20 text-yellow-400'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        <Icon className="h-10 w-10" />
                      </div>
                      <p className="text-sm font-semibold">{badge.name}</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {badge.achieved ? 'Achieved!' : 'Locked'}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </section>
    </div>
  );
}
