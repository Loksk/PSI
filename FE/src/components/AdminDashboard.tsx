import { Users, BookOpen, GraduationCap, Activity, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { mockSystemStats } from '../data/mockData';

export function AdminDashboard() {
  const stats = mockSystemStats;

  const recentActivity = [
    { action: 'New student enrolled', user: 'John Doe', time: '10 minutes ago' },
    { action: 'Subject CS401 created', user: 'Dr. Smith', time: '1 hour ago' },
    { action: 'Exam schedule updated', user: 'Admin', time: '2 hours ago' },
    { action: 'Room B-205 reserved', user: 'Dr. Wilson', time: '3 hours ago' },
  ];

  const systemAlerts = [
    { message: 'Server maintenance scheduled for Oct 28', type: 'warning' },
    { message: 'Exam registration deadline approaching', type: 'info' },
    { message: 'Database backup completed successfully', type: 'success' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>System Administration</h1>
        <p className="text-gray-600 mt-1">
          Manage your university's academic system.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Total Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">
              ↑ 12% from last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Total Teachers</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.totalTeachers}</div>
            <p className="text-xs text-green-600 mt-1">
              ↑ 5 new this semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Active Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.totalSubjects}</div>
            <p className="text-xs text-gray-500 mt-1">
              Across 12 departments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Active Exams</CardTitle>
            <Activity className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.activeExams}</div>
            <p className="text-xs text-gray-500 mt-1">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important notifications and warnings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {systemAlerts.map((alert, idx) => {
              const colors = {
                warning: 'bg-amber-50 border-amber-200',
                info: 'bg-blue-50 border-blue-200',
                success: 'bg-green-50 border-green-200',
              };
              const badgeVariants = {
                warning: 'bg-amber-100 text-amber-800',
                info: 'bg-blue-100 text-blue-800',
                success: 'bg-green-100 text-green-800',
              };
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${colors[alert.type as keyof typeof colors]}`}
                >
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${badgeVariants[alert.type as keyof typeof badgeVariants]} text-xs`}
                  >
                    {alert.type}
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Department Statistics</CardTitle>
            <CardDescription>Student enrollment by department</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'Computer Science', students: 324, percent: 85 },
              { name: 'Mathematics', students: 287, percent: 72 },
              { name: 'Physics', students: 198, percent: 55 },
              { name: 'Engineering', students: 438, percent: 95 },
            ].map((dept) => (
              <div key={dept.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm">{dept.name}</p>
                  <span className="text-sm text-gray-600">{dept.students}</span>
                </div>
                <Progress value={dept.percent} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm">Server Uptime</p>
                <span className="text-sm text-green-600">99.9%</span>
              </div>
              <Progress value={99.9} className="bg-green-100" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm">Database Performance</p>
                <span className="text-sm text-green-600">Excellent</span>
              </div>
              <Progress value={95} className="bg-green-100" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm">API Response Time</p>
                <span className="text-sm text-blue-600">125ms</span>
              </div>
              <Progress value={88} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Add New User
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" />
              Create Subject
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Activity className="mr-2 h-4 w-4" />
              System Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              Generate Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enrollment Trends</CardTitle>
          <CardDescription>Student enrollment over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 72, 68, 80, 85, 92].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-blue-600 rounded-t transition-all hover:bg-blue-700" style={{ height: `${height}%` }} />
                <p className="text-xs text-gray-500">
                  {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][idx]}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
