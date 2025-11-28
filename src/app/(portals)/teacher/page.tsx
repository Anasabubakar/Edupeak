import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { teacherAnalyticsData } from "@/lib/placeholder-data";
import { BarChart3, Users, Target, AlertTriangle } from "lucide-react";

export default function TeacherDashboard() {
  const { students, classAverage, difficultAreas } = teacherAnalyticsData;
  
  const getMasteryVariant = (score: number) => {
    if (score > 80) return "default";
    if (score > 60) return "secondary";
    return "destructive";
  }

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary"/>
              Class Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              Data-driven insights for targeted instruction.
            </p>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Skill Mastery
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classAverage.skillMastery}%</div>
            <Progress value={classAverage.skillMastery} className="h-2 mt-2" />
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Completion Rate
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classAverage.completionRate}%</div>
             <Progress value={classAverage.completionRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Student Progress Overview</CardTitle>
            <CardDescription>
              Track individual student performance and engagement.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Skill Mastery</TableHead>
                  <TableHead className="hidden md:table-cell">Completion Rate</TableHead>
                  <TableHead className="text-right">Last Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>
                      <Badge variant={getMasteryVariant(student.skillMastery)}>
                        {student.skillMastery}%
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{student.completionRate}%</TableCell>
                    <TableCell className="text-right text-muted-foreground">{student.lastActive}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-accent" /> Collective Difficulties</CardTitle>
             <CardDescription>
              Areas where students are struggling the most.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
                {difficultAreas.map((area, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <span className="mt-1 flex h-2 w-2 translate-y-1 rounded-full bg-accent" />
                        <span className="text-sm">{area}</span>
                    </li>
                ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
