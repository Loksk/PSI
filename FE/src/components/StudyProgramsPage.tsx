import { useState } from 'react';
import { GraduationCap, Plus, Edit, Trash2, BookOpen, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
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
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';

interface StudyProgram {
  id: string;
  code: string;
  name: string;
  degree: 'Bachelor' | 'Master' | 'PhD';
  department: string;
  duration: number;
  credits: number;
  students: number;
  status: 'active' | 'inactive';
  description: string;
}

const mockPrograms: StudyProgram[] = [
  {
    id: 'PROG001',
    code: 'CS-BSc',
    name: 'Computer Science',
    degree: 'Bachelor',
    department: 'Computer Science',
    duration: 4,
    credits: 240,
    students: 324,
    status: 'active',
    description: 'Comprehensive study of computer science fundamentals and applications',
  },
  {
    id: 'PROG002',
    code: 'SE-BSc',
    name: 'Software Engineering',
    degree: 'Bachelor',
    department: 'Computer Science',
    duration: 4,
    credits: 240,
    students: 287,
    status: 'active',
    description: 'Focus on software development methodologies and practices',
  },
  {
    id: 'PROG003',
    code: 'MATH-BSc',
    name: 'Mathematics',
    degree: 'Bachelor',
    department: 'Mathematics',
    duration: 4,
    credits: 240,
    students: 198,
    status: 'active',
    description: 'Pure and applied mathematics with theoretical foundations',
  },
  {
    id: 'PROG004',
    code: 'CS-MSc',
    name: 'Computer Science',
    degree: 'Master',
    department: 'Computer Science',
    duration: 2,
    credits: 120,
    students: 156,
    status: 'active',
    description: 'Advanced computer science topics and research',
  },
  {
    id: 'PROG005',
    code: 'AI-MSc',
    name: 'Artificial Intelligence',
    degree: 'Master',
    department: 'Computer Science',
    duration: 2,
    credits: 120,
    students: 142,
    status: 'active',
    description: 'Specialized program in AI, machine learning, and data science',
  },
];

interface Curriculum {
  semester: number;
  subjects: Array<{
    code: string;
    name: string;
    credits: number;
    type: 'core' | 'elective';
  }>;
}

const mockCurriculum: Curriculum[] = [
  {
    semester: 1,
    subjects: [
      { code: 'CS101', name: 'Introduction to Programming', credits: 6, type: 'core' },
      { code: 'MATH101', name: 'Calculus I', credits: 6, type: 'core' },
      { code: 'PHY101', name: 'Physics I', credits: 6, type: 'core' },
      { code: 'ENG101', name: 'English Communication', credits: 3, type: 'core' },
    ],
  },
  {
    semester: 2,
    subjects: [
      { code: 'CS201', name: 'Data Structures', credits: 6, type: 'core' },
      { code: 'MATH201', name: 'Discrete Mathematics', credits: 6, type: 'core' },
      { code: 'CS202', name: 'Computer Architecture', credits: 5, type: 'core' },
      { code: 'ELEC201', name: 'Digital Logic', credits: 4, type: 'core' },
    ],
  },
];

export function StudyProgramsPage() {
  const [programs, setPrograms] = useState<StudyProgram[]>(mockPrograms);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<StudyProgram | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleViewProgram = (program: StudyProgram) => {
    setSelectedProgram(program);
    setIsViewModalOpen(true);
  };

  const handleDeleteProgram = (id: string) => {
    setPrograms(programs.filter((p) => p.id !== id));
    toast.success('Study program deleted successfully');
  };

  const stats = {
    totalPrograms: programs.length,
    activePrograms: programs.filter((p) => p.status === 'active').length,
    totalStudents: programs.reduce((sum, p) => sum + p.students, 0),
    departments: [...new Set(programs.map((p) => p.department))].length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Study Programs</h1>
          <p className="text-gray-600 mt-1">
            Manage academic programs and curricula
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Program
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Total Programs</CardTitle>
            <GraduationCap className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.totalPrograms}</div>
            <p className="text-xs text-gray-500 mt-1">All degree programs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Active Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.activePrograms}</div>
            <p className="text-xs text-green-600 mt-1">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Total Students</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.totalStudents}</div>
            <p className="text-xs text-gray-500 mt-1">Across all programs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.departments}</div>
            <p className="text-xs text-gray-500 mt-1">Academic departments</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bachelor">
        <TabsList>
          <TabsTrigger value="bachelor">Bachelor Programs</TabsTrigger>
          <TabsTrigger value="master">Master Programs</TabsTrigger>
          <TabsTrigger value="phd">PhD Programs</TabsTrigger>
          <TabsTrigger value="all">All Programs</TabsTrigger>
        </TabsList>

        {['bachelor', 'master', 'phd', 'all'].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}{' '}
                  Programs
                </CardTitle>
                <CardDescription>
                  {tab === 'all'
                    ? 'Complete list of study programs'
                    : `${tab.charAt(0).toUpperCase() + tab.slice(1)} degree programs`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Program Name</TableHead>
                        <TableHead>Degree</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {programs
                        .filter(
                          (p) =>
                            tab === 'all' ||
                            p.degree.toLowerCase() === tab.toLowerCase()
                        )
                        .map((program) => (
                          <TableRow key={program.id} className="hover:bg-gray-50">
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded bg-blue-600 text-white flex items-center justify-center text-xs">
                                  {program.code.substring(0, 2)}
                                </div>
                                <span className="text-sm">{program.code}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p>{program.name}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {program.description.substring(0, 50)}...
                              </p>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{program.degree}</Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {program.department}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{program.duration} years</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{program.credits}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{program.students}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  program.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }
                              >
                                {program.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewProgram(program)}
                                >
                                  View
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteProgram(program.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Study Program</DialogTitle>
            <DialogDescription>
              Add a new academic program to the system
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Program Code</Label>
                <Input id="code" placeholder="e.g., CS-BSc" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Program Name</Label>
                <Input id="name" placeholder="e.g., Computer Science" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="degree">Degree Type</Label>
                <Select>
                  <SelectTrigger id="degree">
                    <SelectValue placeholder="Select degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bachelor">Bachelor</SelectItem>
                    <SelectItem value="master">Master</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (years)</Label>
                <Input id="duration" type="number" placeholder="4" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="credits">Total Credits</Label>
                <Input id="credits" type="number" placeholder="240" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Program description and overview..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsCreateModalOpen(false);
                toast.success('Study program created successfully');
              }}
            >
              Create Program
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProgram?.code} - {selectedProgram?.name}
            </DialogTitle>
            <DialogDescription>{selectedProgram?.description}</DialogDescription>
          </DialogHeader>

          {selectedProgram && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-blue-50">
                  <p className="text-xs text-gray-600">Degree</p>
                  <p className="text-sm">{selectedProgram.degree}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50">
                  <p className="text-xs text-gray-600">Duration</p>
                  <p className="text-sm">{selectedProgram.duration} years</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50">
                  <p className="text-xs text-gray-600">Credits</p>
                  <p className="text-sm">{selectedProgram.credits}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50">
                  <p className="text-xs text-gray-600">Students</p>
                  <p className="text-sm">{selectedProgram.students}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-3">Curriculum Overview</h3>
                <div className="space-y-4">
                  {mockCurriculum.map((sem) => (
                    <Card key={sem.semester}>
                      <CardHeader>
                        <CardTitle className="text-sm">
                          Semester {sem.semester}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {sem.subjects.map((subject) => (
                            <div
                              key={subject.code}
                              className="flex items-center justify-between p-2 rounded border"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">
                                  {subject.code}
                                </span>
                                <span className="text-sm">{subject.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {subject.credits} credits
                                </Badge>
                                <Badge
                                  variant={
                                    subject.type === 'core' ? 'default' : 'secondary'
                                  }
                                  className="text-xs"
                                >
                                  {subject.type}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
            <Button>Edit Curriculum</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
