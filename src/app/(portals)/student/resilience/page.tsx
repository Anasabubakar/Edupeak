
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ProgressCircle } from '@/components/ui/progress-circle';
import { resilienceHubData } from '@/lib/placeholder-data';
import { Trophy, Zap, Share2, CheckSquare, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type ScholarshipFilter = 'All' | 'STEM' | 'Arts' | 'Business';

const initialChecklist = [
    { id: 1, label: "Personal Essay Drafted", checked: true },
    { id: 2, label: "Recommendation Letter Requested", checked: true },
    { id: 3, label: "Financial Documents Prepared", checked: false },
];

export default function ResiliencePage() {
  const {
    resilienceIndex,
    coreSkills,
    competition,
    scholarships,
    mentorTip,
  } = resilienceHubData;
  
  const [readinessChecklist, setReadinessChecklist] = useState(initialChecklist);
  const [scholarshipFilter, setScholarshipFilter] = useState<ScholarshipFilter>('All');
  
  const handleChecklistChange = (id: number) => {
    setReadinessChecklist(prev => 
      prev.map(item => item.id === id ? {...item, checked: !item.checked } : item)
    );
  };
  
  const scholarshipCategories: Record<string, ScholarshipFilter> = {
    "Tech Innovators Scholarship": 'STEM',
    "Young Entrepreneur Grant": 'Business',
    "Future Leaders Award": 'All',
  }

  const filteredScholarships = scholarshipFilter === 'All' 
    ? scholarships 
    : scholarships.filter(s => scholarshipCategories[s.title] === scholarshipFilter);


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
          <Trophy className="h-8 w-8 text-primary" />
          Financial Resilience Hub
        </h1>
        <p className="text-muted-foreground mt-1">
          Connecting your skills to real-world economic opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Core Skill Breakout</CardTitle>
              <CardDescription>
                Track your progress in key financial areas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {coreSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm font-bold">
                      {skill.progress}%
                    </span>
                  </div>
                  <Progress value={skill.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SME Skill Map</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground h-48">
              <Zap className="h-12 w-12 text-primary/50" />
              <p className="mt-4">
                Visual representation of skills for SMEs.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Financial Resilience Scorecard</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ProgressCircle value={resilienceIndex} size={160} strokeWidth={12} color='hsl(var(--chart-2))' />
            </CardContent>
             <CardContent>
                <p className="text-sm text-muted-foreground">Resilience Index</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-yellow-500/10 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xs font-bold text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded-full border border-yellow-400/30">
              COMPETITION
            </span>
          </CardTitle>
          <CardTitle>{competition.title}</CardTitle>
          <CardDescription>{competition.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="link" className="p-0 text-primary" asChild>
            <Link href="#">Learn More →</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
            <h2 className="text-xl font-semibold mb-4">Scholarship Matching Tool</h2>
             <div className="flex gap-2 mb-4">
                {(['All', 'STEM', 'Arts', 'Business'] as ScholarshipFilter[]).map(filter => (
                    <Button 
                        key={filter} 
                        variant={scholarshipFilter === filter ? "default" : "outline"}
                        onClick={() => setScholarshipFilter(filter)}
                    >
                        {filter}
                    </Button>
                ))}
            </div>
            <div className="space-y-4">
                {filteredScholarships.map((item) => (
                    <Card key={item.id} className="p-4 flex items-center justify-between hover:bg-card/80 transition-colors">
                        <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                            <Share2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
        <div className="space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CheckSquare className="text-muted-foreground" />Application Readiness Checklist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {readinessChecklist.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                            <Checkbox 
                                id={`check-${item.id}`} 
                                checked={item.checked} 
                                onCheckedChange={() => handleChecklistChange(item.id)}
                            />
                            <label htmlFor={`check-${item.id}`} className={cn("text-sm font-medium", item.checked && "line-through text-muted-foreground")}>{item.label}</label>
                        </div>
                    ))}
                </CardContent>
            </Card>
             <Card className="bg-yellow-400/10 border-yellow-400/30">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lightbulb className="text-yellow-300"/>Mentor's Tip</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-yellow-200/80 italic">"{mentorTip}"</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
