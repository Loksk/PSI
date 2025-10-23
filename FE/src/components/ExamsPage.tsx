import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
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
import { ExamRegistrationModal } from './ExamRegistrationModal';
import { mockExams } from '../data/mockData';
import { UserRole, Exam } from '../types';
import { Progress } from './ui/progress';

interface ExamsPageProps {
  role: UserRole;
}

export function ExamsPage({ role }: ExamsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registeredExams, setRegisteredExams] = useState<string[]>(
    mockExams.filter((e) => e.isRegistered).map((e) => e.id)
  );

  const filteredExams = mockExams.filter((exam) => {
    const matchesSearch =
      exam.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subjectCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'registered' && registeredExams.includes(exam.id)) ||
      (statusFilter === 'available' && !registeredExams.includes(exam.id));
    return matchesSearch && matchesStatus;
  });

  const handleRegisterExam = (examId: string) => {
    setRegisteredExams([...registeredExams, examId]);
    setIsModalOpen(false);
  };

  const handleOpenModal = (exam: Exam) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };

  const upcomingCount = mockExams.filter((e) => {
    const examDate = new Date(e.date);
    const today = new Date();
    return examDate > today;
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Exam Management</h1>
          <p className="text-gray-600 mt-1">
            {role === 'student'
              ? 'Register for exams and view your exam schedule'
              : 'Create and manage exam terms for your subjects'}
          </p>
        </div>
        {role === 'teacher' && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Exam Term
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Upcoming Exams</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{upcomingCount}</div>
            <p className="text-xs text-gray-500 mt-1">This semester</p>
          </CardContent>
        </Card>

        {role === 'student' && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">Registered</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{registeredExams.length}</div>
                <p className="text-xs text-gray-500 mt-1">Confirmed exams</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">Pending</CardTitle>
                <Clock className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{upcomingCount - registeredExams.length}</div>
                <p className="text-xs text-amber-600 mt-1">Require registration</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">Next Exam</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">Nov 15</div>
                <p className="text-xs text-gray-500 mt-1">CS301 - Database</p>
              </CardContent>
            </Card>
          </>
        )}

        {role === 'teacher' && (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">Total Students</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">223</div>
                <p className="text-xs text-gray-500 mt-1">Registered for exams</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">Exam Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">4</div>
                <p className="text-xs text-gray-500 mt-1">Active terms</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">Avg Capacity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">87%</div>
                <p className="text-xs text-green-600 mt-1">Well utilized</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <CardTitle>
                {role === 'student' ? 'Available Exams' : 'Exam Schedule'}
              </CardTitle>
              <CardDescription>
                {role === 'student'
                  ? 'Register before the deadline to secure your spot'
                  : 'Manage exam terms for your subjects'}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search exams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {role === 'student' && (
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Exams</SelectItem>
                    <SelectItem value="registered">Registered</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Capacity</TableHead>
                  {role === 'student' && <TableHead>Status</TableHead>}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExams.map((exam) => {
                  const isRegistered = registeredExams.includes(exam.id);
                  const capacityPercentage = (exam.registered / exam.capacity) * 100;
                  const isAlmostFull = capacityPercentage >= 90;

                  return (
                    <TableRow key={exam.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                            {exam.subjectCode.substring(0, 2)}
                          </div>
                          <div>
                            <p>{exam.subjectCode}</p>
                            <p className="text-sm text-gray-500">{exam.subjectName}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                          <div>
                            <p className="text-sm">
                              {new Date(exam.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                            <p className="text-xs text-gray-500">{exam.time}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">Room {exam.room}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{exam.duration} min</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">
                            {exam.registered}/{exam.capacity}
                          </p>
                          <Progress value={capacityPercentage} className="w-20" />
                          {isAlmostFull && (
                            <Badge variant="outline" className="text-xs text-amber-600">
                              Almost Full
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      {role === 'student' && (
                        <TableCell>
                          {isRegistered ? (
                            <Badge className="bg-green-100 text-green-800">
                              Registered
                            </Badge>
                          ) : (
                            <Badge variant="outline">Not Registered</Badge>
                          )}
                        </TableCell>
                      )}
                      <TableCell className="text-right">
                        {role === 'student' ? (
                          isRegistered ? (
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleOpenModal(exam)}
                              disabled={exam.registered >= exam.capacity}
                            >
                              {exam.registered >= exam.capacity ? 'Full' : 'Register'}
                            </Button>
                          )
                        ) : (
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {role === 'student' && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-blue-900">
            <p>• Registration deadline: 7 days before exam date</p>
            <p>• Bring your student ID to all examinations</p>
            <p>• Arrive at least 15 minutes before start time</p>
            <p>• No electronic devices allowed during exams</p>
            <p>• Late arrivals may not be permitted to take the exam</p>
          </CardContent>
        </Card>
      )}

      <ExamRegistrationModal
        exam={selectedExam}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegister={handleRegisterExam}
      />
    </div>
  );
}
