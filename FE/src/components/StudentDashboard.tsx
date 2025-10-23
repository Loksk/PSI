import { Calendar, BookOpen, Award, Bell, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { mockSubjects, mockGrades, mockSchedule, mockExams } from '../data/mockData';

export function StudentDashboard() {
  const enrolledSubjects = mockSubjects.slice(2, 5);
  const upcomingClasses = mockSchedule.slice(0, 3);
  const recentGrades = mockGrades.slice(0, 2);
  const upcomingExams = mockExams.slice(0, 2);

  const calculateGPA = () => {
    const gradePoints: Record<string, number> = {
      'A': 4.0,
      'A-': 3.7,
      'B+': 3.3,
      'B': 3.0,
      'B-': 2.7,
      'C+': 2.3,
      'C': 2.0,
    };
    const total = mockGrades.reduce((sum, g) => sum + (gradePoints[g.grade] || 0) * g.credits, 0);
    const credits = mockGrades.reduce((sum, g) => sum + g.credits, 0);
    return (total / credits).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Welcome back, Emma!</h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your studies today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Enrolled Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">3</div>
            <p className="text-xs text-gray-500 mt-1">
              15 credits total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Current GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{calculateGPA()}</div>
            <p className="text-xs text-green-600 mt-1">
              ↑ 0.12 from last semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Upcoming Exams</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{upcomingExams.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              Next: Nov 15, 2025
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Attendance</CardTitle>
            <Award className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">94%</div>
            <Progress value={94} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your schedule for this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((cls) => (
              <div
                key={cls.id}
                className="flex items-start gap-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm">{cls.subjectName}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {cls.day}, {cls.startTime} - {cls.endTime}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {cls.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Room {cls.room} • {cls.teacherName}
                  </p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
            <CardDescription>Latest exam results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentGrades.map((grade) => (
              <div
                key={grade.id}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div>
                  <p className="text-sm">{grade.subjectName}</p>
                  <p className="text-xs text-gray-500 mt-1">{grade.semester}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg text-green-600">{grade.grade}</div>
                  <p className="text-xs text-gray-500">{grade.credits} credits</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Grades
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enrolled Subjects</CardTitle>
          <CardDescription>Current semester - Fall 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {enrolledSubjects.map((subject) => (
              <div
                key={subject.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    {subject.code.substring(0, 2)}
                  </div>
                  <div>
                    <p>{subject.code} - {subject.name}</p>
                    <p className="text-sm text-gray-500">
                      {subject.teacherName} • {subject.credits} credits
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Exams</CardTitle>
          <CardDescription>Register before the deadline</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingExams.map((exam) => (
              <div
                key={exam.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div>
                  <p>{exam.subjectCode} - {exam.subjectName}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(exam.date).toLocaleDateString()} at {exam.time} • Room {exam.room}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {exam.registered}/{exam.capacity} registered • {exam.duration} minutes
                  </p>
                </div>
                <Button variant={exam.isRegistered ? 'outline' : 'default'}>
                  {exam.isRegistered ? 'Registered' : 'Register'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
