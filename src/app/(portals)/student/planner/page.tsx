"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Sparkles, Calendar as CalendarIcon, Clock, BookOpen, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudyPlannerPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [isGenerating, setIsGenerating] = useState(false);
    const [planGenerated, setPlanGenerated] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setPlanGenerated(true);
        }, 2000);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                    <Sparkles className="h-8 w-8 text-primary" />
                    AI Study Planner
                </h1>
                <p className="text-muted-foreground mt-1 text-lg">
                    Let Cortex AI design the perfect study schedule for your upcoming exams.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Input Section */}
                <Card className="lg:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle>Configuration</CardTitle>
                        <CardDescription>Tell us about your goals</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Target Exam</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select course" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cs101">CS101: Intro to CS</SelectItem>
                                    <SelectItem value="econ101">ECON101: Microeconomics</SelectItem>
                                    <SelectItem value="math101">MATH101: Calculus I</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Exam Date</Label>
                            <div className="border rounded-md p-2">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border shadow-none w-full flex justify-center"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Daily Study Hours</Label>
                            <Input type="number" placeholder="e.g. 2" min={1} max={12} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            onClick={handleGenerate}
                            disabled={isGenerating || planGenerated}
                        >
                            {isGenerating ? (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                                    Generating Plan...
                                </>
                            ) : planGenerated ? (
                                <>
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Plan Ready
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Generate Schedule
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Output Section */}
                <div className="lg:col-span-2 space-y-6">
                    {planGenerated ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="border-primary/50 bg-primary/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CalendarIcon className="h-5 w-5 text-primary" />
                                        Your Personalized Schedule
                                    </CardTitle>
                                    <CardDescription>
                                        Optimized for maximum retention using Spaced Repetition.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {[
                                            { day: "Monday", topic: "Algorithms: Sorting & Searching", hours: "2 hrs", type: "Deep Work" },
                                            { day: "Tuesday", topic: "Data Structures: Trees", hours: "1.5 hrs", type: "Practice" },
                                            { day: "Wednesday", topic: "Review: Big O Notation", hours: "1 hr", type: "Review" },
                                            { day: "Thursday", topic: "Mock Exam: Section A", hours: "2 hrs", type: "Testing" },
                                            { day: "Friday", topic: "Algorithms: Graph Theory", hours: "2 hrs", type: "Deep Work" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-background rounded-lg border shadow-sm hover:border-primary/50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-primary">
                                                        {item.day.substring(0, 3)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold">{item.topic}</h4>
                                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                            <Clock className="h-3 w-3" /> {item.hours} • {item.type}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm">Details</Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-xl text-muted-foreground">
                            <div className="bg-muted/50 p-6 rounded-full mb-4">
                                <Sparkles className="h-12 w-12 text-muted-foreground/50" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Ready to Plan?</h3>
                            <p className="max-w-md">
                                Configure your exam details on the left, and Cortex AI will build a custom study roadmap just for you.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
