import {
  Home,
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  Settings,
  Users,
  GraduationCap,
  BarChart3,
  Building2,
  X,
} from 'lucide-react';
import { UserRole } from '../types';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface SidebarProps {
  role: UserRole;
  currentPage: string;
  onPageChange: (page: string) => void;
  onClose?: () => void;
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    roles: ['student', 'teacher', 'admin'],
  },
  {
    id: 'subjects',
    label: 'Subjects',
    icon: BookOpen,
    roles: ['student', 'teacher', 'admin'],
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: Calendar,
    roles: ['student', 'teacher'],
  },
  {
    id: 'exams',
    label: 'Exams',
    icon: ClipboardList,
    roles: ['student', 'teacher'],
  },
  {
    id: 'grades',
    label: 'Grades',
    icon: GraduationCap,
    roles: ['student', 'teacher'],
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: FileText,
    roles: ['student'],
  },
  {
    id: 'users',
    label: 'User Management',
    icon: Users,
    roles: ['admin'],
  },
  {
    id: 'programs',
    label: 'Study Programs',
    icon: BookOpen,
    roles: ['admin'],
  },
  {
    id: 'rooms',
    label: 'Rooms & Scheduling',
    icon: Building2,
    roles: ['admin'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    roles: ['admin'],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    roles: ['student', 'teacher', 'admin'],
  },
];

export function Sidebar({
  role,
  currentPage,
  onPageChange,
  onClose,
  className = '',
}: SidebarProps) {
  const filteredItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside className={`flex flex-col h-full bg-white border-r ${className}`}>
      <div className="flex items-center justify-between p-4 md:hidden border-b">
        <span>Menu</span>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <Button
                key={item.id}
                variant={isActive ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  onPageChange(item.id);
                  onClose?.();
                }}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator />

      <div className="p-4">
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-blue-900">Need Help?</p>
          <p className="text-xs text-blue-700 mt-1">
            Check our documentation or contact support
          </p>
          <Button variant="link" className="text-blue-600 p-0 h-auto mt-2">
            Learn more →
          </Button>
        </div>
      </div>
    </aside>
  );
}
