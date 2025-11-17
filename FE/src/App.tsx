import { useEffect, useState } from 'react';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { SubjectsTable } from './components/SubjectsTable';
import { SubjectDetail } from './components/SubjectDetail';
import { SchedulePage } from './components/SchedulePage';
import { GradeOverview } from './components/GradeOverview';
import { UserManagement } from './components/UserManagement';
import { LoginPage } from './components/LoginPage';
import { ExamsPage } from './components/ExamsPage';
import { DocumentsPage } from './components/DocumentsPage';
import { GradeEntryPage } from './components/GradeEntryPage';
import { StudyProgramsPage } from './components/StudyProgramsPage';
import { RoomsSchedulingPage } from './components/RoomsSchedulingPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { SettingsPage } from './components/SettingsPage';
import { mockUsers } from './data/mockData';
import { UserRole } from './types';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

const ACCESS_TOKEN_KEY = 'ais.accessToken';
const REFRESH_TOKEN_KEY = 'ais.refreshToken';
const ROLE_KEY = 'ais.role';

interface AuthPayload {
  accessToken: string;
  refreshToken?: string;
  role: UserRole;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const storedRole = localStorage.getItem(ROLE_KEY) as UserRole | null;

    if (storedAccessToken && storedRole) {
      setCurrentRole(storedRole);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = ({ accessToken, refreshToken, role }: AuthPayload) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } else {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
    localStorage.setItem(ROLE_KEY, role);

    setCurrentRole(role);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
    toast.success('Successfully logged in!');
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setSelectedSubjectId(null);
  };

  const handleViewSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setCurrentPage('subject-detail');
  };

  const handleBackToSubjects = () => {
    setSelectedSubjectId(null);
    setCurrentPage('subjects');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const currentUser = mockUsers[currentRole];

  const renderContent = () => {
    if (currentPage === 'subject-detail' && selectedSubjectId) {
      return (
        <SubjectDetail
          subjectId={selectedSubjectId}
          role={currentRole}
          onBack={handleBackToSubjects}
        />
      );
    }

    switch (currentPage) {
      case 'dashboard':
        switch (currentRole) {
          case 'student':
            return <StudentDashboard />;
          case 'teacher':
            return <TeacherDashboard />;
          case 'admin':
            return <AdminDashboard />;
        }
        break;
      case 'subjects':
        return <SubjectsTable role={currentRole} onViewSubject={handleViewSubject} />;
      case 'schedule':
        return <SchedulePage role={currentRole} />;
      case 'grades':
        if (currentRole === 'student') {
          return <GradeOverview />;
        }
        return <GradeEntryPage />;
      case 'exams':
        return <ExamsPage role={currentRole} />;
      case 'documents':
        return <DocumentsPage />;
      case 'users':
        return <UserManagement />;
      case 'programs':
        return <StudyProgramsPage />;
      case 'rooms':
        return <RoomsSchedulingPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage role={currentRole} userName={currentUser.name} />;
      default:
        return (
          <div className="p-8 text-center">
            <h2>Page Not Found</h2>
            <p className="text-gray-600 mt-2">
              The requested page could not be found.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-shrink-0">
        <Sidebar
          role={currentRole}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white">
            <Sidebar
              role={currentRole}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav user={currentUser} onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6 max-w-7xl">{renderContent()}</div>
        </main>
      </div>

      <Toaster />
    </div>
  );
}
