import { Award, TrendingUp, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Progress } from './ui/progress';
import { mockGrades } from '../data/mockData';
import { useState } from 'react';

export function GradeOverview() {
  const [semesterFilter, setSemesterFilter] = useState('all');

  const filteredGrades = mockGrades.filter((grade) => {
    if (semesterFilter === 'all') return true;
    return grade.semester === semesterFilter;
  });

  const calculateGPA = (grades: typeof mockGrades) => {
    const gradePoints: Record<string, number> = {
      'A': 4.0,
      'A-': 3.7,
      'B+': 3.3,
      'B': 3.0,
      'B-': 2.7,
      'C+': 2.3,
      'C': 2.0,
      'C-': 1.7,
      'D': 1.0,
      'F': 0.0,
    };
    const total = grades.reduce((sum, g) => sum + (gradePoints[g.grade] || 0) * g.credits, 0);
    const credits = grades.reduce((sum, g) => sum + g.credits, 0);
    return credits > 0 ? (total / credits).toFixed(2) : '0.00';
  };

  const totalCredits = filteredGrades.reduce((sum, g) => sum + g.credits, 0);
  const currentGPA = calculateGPA(filteredGrades);

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-amber-600 bg-amber-50';
    if (grade.startsWith('D')) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const gradeDistribution = mockGrades.reduce((acc, grade) => {
    const baseGrade = grade.grade[0];
    acc[baseGrade] = (acc[baseGrade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Grade Overview</h1>
          <p className="text-gray-600 mt-1">
            View your academic performance and transcript
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Transcript
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Current GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{currentGPA}</div>
            <p className="text-xs text-green-600 mt-1">
              ↑ 0.12 from last semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Total Credits</CardTitle>
            <Award className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalCredits}</div>
            <p className="text-xs text-gray-500 mt-1">
              Earned credits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Subjects Passed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{mockGrades.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              All subjects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Average Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">A-</div>
            <p className="text-xs text-gray-500 mt-1">
              Overall performance
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Academic Transcript</CardTitle>
                <CardDescription>Complete grade history</CardDescription>
              </div>
              <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                  <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGrades.length > 0 ? (
                    filteredGrades.map((grade) => (
                      <TableRow key={grade.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded bg-blue-600 text-white flex items-center justify-center text-xs">
                              {grade.subjectCode.substring(0, 2)}
                            </div>
                            <span className="text-sm">{grade.subjectCode}</span>
                          </div>
                        </TableCell>
                        <TableCell>{grade.subjectName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{grade.semester}</Badge>
                        </TableCell>
                        <TableCell>{grade.credits}</TableCell>
                        <TableCell>
                          <Badge className={getGradeColor(grade.grade)}>
                            {grade.grade}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {new Date(grade.date).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No grades found for selected semester
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
              <CardDescription>Your grade breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(gradeDistribution)
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([grade, count]) => {
                  const percentage = (count / mockGrades.length) * 100;
                  return (
                    <div key={grade} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Grade {grade}</span>
                        <span className="text-sm text-gray-600">
                          {count} ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                      <Progress value={percentage} />
                    </div>
                  );
                })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GPA Trend</CardTitle>
              <CardDescription>Semester by semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { semester: 'Fall 2024', gpa: 3.65 },
                  { semester: 'Spring 2025', gpa: 3.77 },
                ].map((item) => (
                  <div key={item.semester} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{item.semester}</span>
                      <span className="text-sm">{item.gpa.toFixed(2)}</span>
                    </div>
                    <Progress value={(item.gpa / 4.0) * 100} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Academic Standing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-900">Dean's List</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Excellent academic performance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
