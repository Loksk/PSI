import { ArrowLeft, Users, BookOpen, Calendar, Clock, MapPin, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { mockSubjects, mockSchedule } from '../data/mockData';
import { UserRole } from '../types';

interface SubjectDetailProps {
  subjectId: string;
  role: UserRole;
  onBack: () => void;
}

export function SubjectDetail({ subjectId, role, onBack }: SubjectDetailProps) {
  const subject = mockSubjects.find((s) => s.id === subjectId);
  const subjectSchedule = mockSchedule.filter((s) => s.subjectId === subjectId);

  if (!subject) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Subject not found</p>
        <Button onClick={onBack} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const enrollmentPercentage = (subject.enrolled / subject.capacity) * 100;

  const materials = [
    { name: 'Lecture 1 - Introduction.pdf', size: '2.4 MB', date: '2025-09-15' },
    { name: 'Assignment 1 - Basics.pdf', size: '856 KB', date: '2025-09-18' },
    { name: 'Lecture 2 - Advanced Topics.pdf', size: '3.1 MB', date: '2025-09-22' },
  ];

  const announcements = [
    { title: 'Midterm Exam Schedule', content: 'Midterm exam will be held on November 15, 2025.', date: '2025-10-15' },
    { title: 'Assignment 2 Posted', content: 'New assignment is available. Due date: November 5, 2025.', date: '2025-10-20' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              {subject.code.substring(0, 2)}
            </div>
            <div>
              <h1>{subject.code} - {subject.name}</h1>
              <p className="text-gray-600">{subject.teacherName}</p>
            </div>
          </div>
        </div>
        {role === 'student' && (
          <Button size="lg" disabled={subject.enrolled >= subject.capacity}>
            {subject.enrolled >= subject.capacity ? 'Subject Full' : 'Enroll Now'}
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Credits</CardTitle>
            <BookOpen className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{subject.credits}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Semester</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{subject.semester}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Enrolled</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{subject.enrolled}</div>
            <p className="text-xs text-gray-500 mt-1">of {subject.capacity}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={enrollmentPercentage} className="mt-2" />
            <p className="text-xs text-gray-500 mt-2">{enrollmentPercentage.toFixed(0)}% filled</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm mb-2">Syllabus</h3>
                <p className="text-gray-600">{subject.syllabus}</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm mb-2">Prerequisites</h3>
                {subject.prerequisites && subject.prerequisites.length > 0 ? (
                  <div className="flex gap-2 flex-wrap">
                    {subject.prerequisites.map((prereq) => (
                      <Badge key={prereq} variant="secondary">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No prerequisites required</p>
                )}
              </div>

              <Separator />

              <div>
                <h3 className="text-sm mb-2">Learning Outcomes</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Understand fundamental concepts and principles</li>
                  <li>Apply theoretical knowledge to practical problems</li>
                  <li>Develop critical thinking and problem-solving skills</li>
                  <li>Work effectively in team environments</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Grading Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Assignments</span>
                <span className="text-sm">30%</span>
              </div>
              <Progress value={30} />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Midterm Exam</span>
                <span className="text-sm">30%</span>
              </div>
              <Progress value={30} />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Final Exam</span>
                <span className="text-sm">40%</span>
              </div>
              <Progress value={40} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Class times and locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {subjectSchedule.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p>{schedule.day}</p>
                        <Badge variant="outline">{schedule.type}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {schedule.startTime} - {schedule.endTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          Room {schedule.room}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Materials</CardTitle>
              <CardDescription>Lecture notes, assignments, and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {materials.map((material, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm">{material.name}</p>
                        <p className="text-xs text-gray-500">
                          {material.size} • Uploaded {new Date(material.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>Important updates and notices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement, idx) => (
                  <div key={idx} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm">{announcement.title}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(announcement.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
