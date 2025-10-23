import { useState } from 'react';
import { BookOpen, Users, Save, Upload, Filter, Search, CheckCircle } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';

interface StudentGrade {
  id: string;
  studentId: string;
  studentName: string;
  email: string;
  midterm?: number;
  assignment?: number;
  finalExam?: number;
  total?: number;
  grade?: string;
  status: 'draft' | 'submitted';
}

const mockStudents: StudentGrade[] = [
  {
    id: 'SG001',
    studentId: 'S2021001',
    studentName: 'Emma Johnson',
    email: 'emma.j@university.edu',
    midterm: 85,
    assignment: 92,
    finalExam: 88,
    total: 88,
    grade: 'A-',
    status: 'submitted',
  },
  {
    id: 'SG002',
    studentId: 'S2021002',
    studentName: 'James Wilson',
    email: 'james.w@university.edu',
    midterm: 78,
    assignment: 85,
    finalExam: 82,
    total: 82,
    grade: 'B+',
    status: 'submitted',
  },
  {
    id: 'SG003',
    studentId: 'S2021003',
    studentName: 'Sophia Martinez',
    email: 'sophia.m@university.edu',
    midterm: 92,
    assignment: 95,
    status: 'draft',
  },
  {
    id: 'SG004',
    studentId: 'S2021004',
    studentName: 'Oliver Brown',
    email: 'oliver.b@university.edu',
    midterm: 88,
    assignment: 90,
    finalExam: 91,
    total: 90,
    grade: 'A-',
    status: 'submitted',
  },
  {
    id: 'SG005',
    studentId: 'S2021005',
    studentName: 'Ava Davis',
    email: 'ava.d@university.edu',
    midterm: 75,
    assignment: 80,
    status: 'draft',
  },
];

export function GradeEntryPage() {
  const [students, setStudents] = useState<StudentGrade[]>(mockStudents);
  const [selectedSubject, setSelectedSubject] = useState('CS301');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isQuickEntryOpen, setIsQuickEntryOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentGrade | null>(null);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const calculateGrade = (total: number) => {
    if (total >= 93) return 'A';
    if (total >= 90) return 'A-';
    if (total >= 87) return 'B+';
    if (total >= 83) return 'B';
    if (total >= 80) return 'B-';
    if (total >= 77) return 'C+';
    if (total >= 73) return 'C';
    if (total >= 70) return 'C-';
    if (total >= 60) return 'D';
    return 'F';
  };

  const handleQuickEntry = () => {
    if (!selectedStudent) return;

    const midterm = selectedStudent.midterm || 0;
    const assignment = selectedStudent.assignment || 0;
    const finalExam = selectedStudent.finalExam || 0;

    const total = Math.round(midterm * 0.3 + assignment * 0.3 + finalExam * 0.4);
    const grade = calculateGrade(total);

    setStudents(
      students.map((s) =>
        s.id === selectedStudent.id
          ? { ...s, total, grade, status: 'submitted' as const }
          : s
      )
    );

    setIsQuickEntryOpen(false);
    setSelectedStudent(null);
    toast.success('Grade saved successfully');
  };

  const handleBulkSubmit = () => {
    const draftCount = students.filter((s) => s.status === 'draft').length;
    if (draftCount === 0) {
      toast.error('No draft grades to submit');
      return;
    }

    setStudents(
      students.map((s) => {
        if (s.status === 'draft' && s.midterm && s.assignment && s.finalExam) {
          const total = Math.round(
            s.midterm * 0.3 + s.assignment * 0.3 + s.finalExam * 0.4
          );
          const grade = calculateGrade(total);
          return { ...s, total, grade, status: 'submitted' as const };
        }
        return s;
      })
    );

    toast.success(`${draftCount} grades submitted successfully`);
  };

  const submittedCount = students.filter((s) => s.status === 'submitted').length;
  const draftCount = students.filter((s) => s.status === 'draft').length;
  const averageGrade =
    students.filter((s) => s.total).reduce((sum, s) => sum + (s.total || 0), 0) /
    students.filter((s) => s.total).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Grade Management</h1>
          <p className="text-gray-600 mt-1">
            Enter and manage student grades for your subjects
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Grades
          </Button>
          <Button onClick={handleBulkSubmit}>
            <Save className="mr-2 h-4 w-4" />
            Submit All Drafts
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Total Students</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{students.length}</div>
            <p className="text-xs text-gray-500 mt-1">Enrolled students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Submitted</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{submittedCount}</div>
            <p className="text-xs text-green-600 mt-1">Grades finalized</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{draftCount}</div>
            <p className="text-xs text-amber-600 mt-1">Require submission</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{averageGrade.toFixed(1)}%</div>
            <p className="text-xs text-gray-500 mt-1">Overall performance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <CardTitle>Grade Entry - {selectedSubject}</CardTitle>
              <CardDescription>CS301 - Database Systems</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full sm:w-48">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CS301">CS301 - Database</SelectItem>
                  <SelectItem value="CS302">CS302 - Web Dev</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table">
            <TabsList>
              <TabsTrigger value="table">Grade Table</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="mt-4">
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Midterm (30%)</TableHead>
                      <TableHead>Assignment (30%)</TableHead>
                      <TableHead>Final (40%)</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-gray-50">
                        <TableCell className="text-sm text-gray-600">
                          {student.studentId}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{student.studentName}</p>
                            <p className="text-xs text-gray-500">{student.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={student.midterm || ''}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              setStudents(
                                students.map((s) =>
                                  s.id === student.id
                                    ? { ...s, midterm: value, status: 'draft' as const }
                                    : s
                                )
                              );
                            }}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={student.assignment || ''}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              setStudents(
                                students.map((s) =>
                                  s.id === student.id
                                    ? { ...s, assignment: value, status: 'draft' as const }
                                    : s
                                )
                              );
                            }}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={student.finalExam || ''}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0;
                              setStudents(
                                students.map((s) =>
                                  s.id === student.id
                                    ? { ...s, finalExam: value, status: 'draft' as const }
                                    : s
                                )
                              );
                            }}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {student.total ? `${student.total}%` : '-'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {student.grade ? (
                            <Badge
                              className={
                                student.grade.startsWith('A')
                                  ? 'bg-green-100 text-green-800'
                                  : student.grade.startsWith('B')
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }
                            >
                              {student.grade}
                            </Badge>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              student.status === 'submitted' ? 'default' : 'outline'
                            }
                            className={
                              student.status === 'submitted'
                                ? 'bg-green-100 text-green-800'
                                : ''
                            }
                          >
                            {student.status === 'submitted' ? 'Submitted' : 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedStudent(student);
                              setIsQuickEntryOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="statistics" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Grade Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {['A', 'B', 'C', 'D', 'F'].map((grade) => {
                      const count = students.filter((s) =>
                        s.grade?.startsWith(grade)
                      ).length;
                      const percentage = (count / students.length) * 100;
                      return (
                        <div key={grade} className="flex items-center gap-4">
                          <span className="w-12 text-sm">Grade {grade}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-6">
                            <div
                              className="bg-blue-600 h-6 rounded-full flex items-center justify-end px-2 text-xs text-white"
                              style={{ width: `${percentage}%` }}
                            >
                              {count > 0 && <span>{count}</span>}
                            </div>
                          </div>
                          <span className="w-16 text-sm text-gray-600">
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 rounded-lg bg-green-50">
                      <p className="text-sm text-gray-600">Highest Score</p>
                      <p className="text-2xl text-green-700">95%</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50">
                      <p className="text-sm text-gray-600">Average Score</p>
                      <p className="text-2xl text-blue-700">
                        {averageGrade.toFixed(1)}%
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-50">
                      <p className="text-sm text-gray-600">Lowest Score</p>
                      <p className="text-2xl text-amber-700">75%</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isQuickEntryOpen} onOpenChange={setIsQuickEntryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quick Grade Entry</DialogTitle>
            <DialogDescription>
              {selectedStudent?.studentName} ({selectedStudent?.studentId})
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Midterm (30%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={selectedStudent.midterm || ''}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        midterm: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Assignment (30%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={selectedStudent.assignment || ''}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        assignment: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Final (40%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={selectedStudent.finalExam || ''}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        finalExam: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              {selectedStudent.midterm &&
                selectedStudent.assignment &&
                selectedStudent.finalExam && (
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm text-blue-900">Calculated Grade</p>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-2xl text-blue-900">
                        {Math.round(
                          selectedStudent.midterm * 0.3 +
                            selectedStudent.assignment * 0.3 +
                            selectedStudent.finalExam * 0.4
                        )}
                        %
                      </p>
                      <Badge className="bg-blue-600 text-white">
                        {calculateGrade(
                          Math.round(
                            selectedStudent.midterm * 0.3 +
                              selectedStudent.assignment * 0.3 +
                              selectedStudent.finalExam * 0.4
                          )
                        )}
                      </Badge>
                    </div>
                  </div>
                )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQuickEntryOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleQuickEntry}>Save Grade</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
