import { Bell, Search, Menu } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { User } from '../types';
import { NotificationCenter } from './NotificationCenter';

interface TopNavProps {
  user: User;
  onMenuClick: () => void;
}

export function TopNav({ user, onMenuClick }: TopNavProps) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <span className="text-sm">AIS</span>
          </div>
          <span className="hidden md:inline">Academic Information System</span>
        </div>

        <div className="flex-1 max-w-md ml-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search subjects, exams, students..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <NotificationCenter />

          <div className="flex items-center gap-3 border-l pl-3">
            <div className="hidden md:block text-right">
              <p className="text-sm">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
            <Avatar>
              <AvatarFallback className="bg-blue-600 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
