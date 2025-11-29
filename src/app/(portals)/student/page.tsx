"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Target,
  Clock,
  TrendingUp,
  ArrowRight,
  Star,
  Calendar,
  Zap
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/20 p-6 md:p-12">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold font-headline text-gradient-primary mb-4"
          >
            Welcome back, Student!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl"
          >
            "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice." – Brian Herbert
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all w-full sm:w-auto" asChild>
              <Link href="/student/learn">
                Resume Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10 w-full sm:w-auto" asChild>
              <Link href="/student/planner">
                View Schedule
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Courses in Progress", value: "3", icon: BookOpen, color: "text-blue-400", bg: "bg-blue-400/10" },
          { label: "Assignments Due", value: "2", icon: Clock, color: "text-orange-400", bg: "bg-orange-400/10" },
          { label: "Current Streak", value: "5 Days", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-400/10" },
          { label: "Average Grade", value: "A-", icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index + 0.3 }}
          >
            <Card className="glass-card hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Next Class */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Up Next
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors">
                  <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-primary/10 text-primary font-bold">
                    <span className="text-sm">10:00</span>
                    <span className="text-xs opacity-70">AM</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">CS101: Intro to Computer Science</h4>
                    <p className="text-muted-foreground">Lecture 5: Data Structures</p>
                  </div>
                  <Button variant="secondary" size="sm">Join</Button>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors opacity-60">
                  <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-secondary text-muted-foreground font-bold">
                    <span className="text-sm">02:00</span>
                    <span className="text-xs opacity-70">PM</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">ECON101: Microeconomics</h4>
                    <p className="text-muted-foreground">Seminar: Market Forces</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommended Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                For You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                <h4 className="font-semibold mb-1">Review Calculus</h4>
                <p className="text-sm text-muted-foreground mb-3">You struggled with "Chain Rule" last week.</p>
                <Button size="sm" className="w-full" variant="outline">Start Review</Button>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <h4 className="font-semibold mb-1">Complete Profile</h4>
                <p className="text-sm text-muted-foreground mb-3">Add your learning goals to get better recommendations.</p>
                <Button size="sm" className="w-full" variant="secondary">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
