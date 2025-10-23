import { useState } from 'react';
import { Search, Filter, ChevronDown, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { mockSubjects } from '../data/mockData';
import { UserRole } from '../types';

interface SubjectsTableProps {
  role: UserRole;
  onViewSubject: (subjectId: string) => void;
}

export function SubjectsTable({ role, onViewSubject }: SubjectsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('all');

  const filteredSubjects = mockSubjects.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester =
      semesterFilter === 'all' || subject.semester.toString() === semesterFilter;
    return matchesSearch && matchesSemester;
  });

  const getCapacityColor = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-amber-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Subjects</h1>
          <p className="text-gray-600 mt-1">
            {role === 'student' && 'Browse and enroll in available subjects'}
            {role === 'teacher' && 'Manage your teaching subjects'}
            {role === 'admin' && 'Manage all subjects in the system'}
          </p>
        </div>
        {role !== 'student' && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {role === 'teacher' ? 'Request New Subject' : 'Add Subject'}
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <CardTitle>All Subjects</CardTitle>
              <CardDescription>
                {filteredSubjects.length} subject{filteredSubjects.length !== 1 ? 's' : ''} found
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  <SelectItem value="1">Semester 1</SelectItem>
                  <SelectItem value="2">Semester 2</SelectItem>
                  <SelectItem value="3">Semester 3</SelectItem>
                  <SelectItem value="4">Semester 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Subject Name</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Enrollment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubjects.map((subject) => {
                  const enrollmentPercentage = (subject.enrolled / subject.capacity) * 100;
                  return (
                    <TableRow key={subject.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-blue-600 text-white flex items-center justify-center text-xs">
                            {subject.code.substring(0, 2)}
                          </div>
                          <span>{subject.code}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{subject.name}</p>
                          {subject.prerequisites && subject.prerequisites.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              Prerequisites: {subject.prerequisites.join(', ')}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{subject.teacherName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Semester {subject.semester}</Badge>
                      </TableCell>
                      <TableCell>{subject.credits}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className={getCapacityColor(subject.enrolled, subject.capacity)}>
                            {subject.enrolled}/{subject.capacity}
                          </p>
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                enrollmentPercentage >= 90
                                  ? 'bg-red-600'
                                  : enrollmentPercentage >= 75
                                  ? 'bg-amber-600'
                                  : 'bg-green-600'
                              }`}
                              style={{ width: `${enrollmentPercentage}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {role === 'student' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onViewSubject(subject.id)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button
                                size="sm"
                                disabled={subject.enrolled >= subject.capacity}
                              >
                                {subject.enrolled >= subject.capacity ? 'Full' : 'Enroll'}
                              </Button>
                            </>
                          )}
                          {role !== 'student' && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions
                                  <ChevronDown className="ml-1 h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => onViewSubject(subject.id)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                {role === 'admin' && (
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredSubjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No subjects found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
