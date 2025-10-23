import { BookOpen, Users, ClipboardCheck, Calendar, AlertCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { mockSubjects, mockSchedule } from '../data/mockData';

export function TeacherDashboard() {
  const teachingSubjects = mockSubjects.filter(s => s.teacherId === 'T001');
  const upcomingClasses = mockSchedule.filter(s => s.teacherName === 'Dr. Michael Smith').slice(0, 3);

  const pendingGrades = [
    { subject: 'CS101', assignment: 'Midterm Exam', count: 45 },
    { subject: 'CS302', assignment: 'Project 2', count: 28 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Welcome, Dr. Smith!</h1>
        <p className="text-gray-600 mt-1">
          Here's an overview of your teaching activities.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Teaching Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{teachingSubjects.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              Active this semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Total Students</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {teachingSubjects.reduce((sum, s) => sum + s.enrolled, 0)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Across all subjects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Pending Grading</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {pendingGrades.reduce((sum, p) => sum + p.count, 0)}
            </div>
            <p className="text-xs text-amber-600 mt-1">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Classes This Week</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">12</div>
            <p className="text-xs text-gray-500 mt-1">
              18 hours total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pending Grading Tasks</CardTitle>
            <CardDescription>Assignments awaiting your review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingGrades.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm">{item.subject} - {item.assignment}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.count} submissions pending
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    Start Grading
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Your teaching schedule this week</CardDescription>
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
                    Room {cls.room}
                  </p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Subjects</CardTitle>
          <CardDescription>Subjects you're teaching this semester</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teachingSubjects.map((subject) => (
              <div
                key={subject.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    {subject.code.substring(0, 2)}
                  </div>
                  <div className="flex-1">
                    <p>{subject.code} - {subject.name}</p>
                    <p className="text-sm text-gray-500">
                      {subject.enrolled} students • {subject.credits} credits
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm text-gray-600">Capacity</p>
                    <Progress
                      value={(subject.enrolled / subject.capacity) * 100}
                      className="w-32 mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {subject.enrolled}/{subject.capacity}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Student Performance</CardTitle>
            <CardDescription>Average grades by subject</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teachingSubjects.map((subject) => {
              const avgGrade = Math.random() * 30 + 70;
              return (
                <div key={subject.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">{subject.code}</p>
                    <span className="text-sm">{avgGrade.toFixed(1)}%</span>
                  </div>
                  <Progress value={avgGrade} />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Enter Grades
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Create Exam Term
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              View Student List
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" />
              Update Syllabus
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
