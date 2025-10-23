// Type definitions for the AIS system

export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  studentId?: string;
  department?: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  teacherId: string;
  teacherName: string;
  capacity: number;
  enrolled: number;
  prerequisites?: string[];
  syllabus?: string;
  schedule?: ScheduleItem[];
}

export interface Grade {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  grade: string;
  credits: number;
  semester: string;
  date: string;
}

export interface ScheduleItem {
  id: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  type: 'lecture' | 'seminar' | 'lab';
  teacherName?: string;
}

export interface Exam {
  id: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  date: string;
  time: string;
  room: string;
  duration: number;
  capacity: number;
  registered: number;
  isRegistered?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  read: boolean;
}

export interface SystemStats {
  totalStudents: number;
  totalTeachers: number;
  totalSubjects: number;
  activeExams: number;
}
