import { BarChart3, TrendingUp, Users, BookOpen, Download, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

export function AnalyticsPage() {
  const enrollmentData = [
    { month: 'Jan', students: 1180, growth: 2.3 },
    { month: 'Feb', students: 1195, growth: 1.3 },
    { month: 'Mar', students: 1210, growth: 1.3 },
    { month: 'Apr', students: 1205, growth: -0.4 },
    { month: 'May', students: 1220, growth: 1.2 },
    { month: 'Jun', students: 1235, growth: 1.2 },
    { month: 'Jul', students: 1198, growth: -3.0 },
    { month: 'Aug', students: 1225, growth: 2.3 },
    { month: 'Sep', students: 1247, growth: 1.8 },
    { month: 'Oct', students: 1247, growth: 0 },
  ];

  const departmentStats = [
    { name: 'Computer Science', students: 438, avgGPA: 3.45, completion: 92 },
    { name: 'Mathematics', students: 324, avgGPA: 3.62, completion: 88 },
    { name: 'Physics', students: 287, avgGPA: 3.38, completion: 85 },
    { name: 'Engineering', students: 198, avgGPA: 3.51, completion: 90 },
  ];

  const subjectPerformance = [
    { subject: 'CS101', enrolled: 98, avgGrade: 85, passRate: 94 },
    { subject: 'CS201', enrolled: 87, avgGrade: 82, passRate: 89 },
    { subject: 'CS301', enrolled: 76, avgGrade: 88, passRate: 97 },
    { subject: 'MATH101', enrolled: 142, avgGrade: 78, passRate: 85 },
    { subject: 'PHY101', enrolled: 115, avgGrade: 81, passRate: 88 },
  ];

  const maxEnrollment = Math.max(...enrollmentData.map((d) => d.students));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">
            System-wide analytics and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="academic-year">
            <SelectTrigger className="w-48">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic-year">Academic Year 2024/25</SelectItem>
              <SelectItem value="semester">Current Semester</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Total Enrollment</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">1,247</div>
            <p className="text-xs text-green-600 mt-1">
              ↑ 1.8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Average GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">3.49</div>
            <p className="text-xs text-green-600 mt-1">
              ↑ 0.05 from last semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Completion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">89%</div>
            <p className="text-xs text-green-600 mt-1">
              Above target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Active Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">156</div>
            <p className="text-xs text-gray-500 mt-1">
              This semester
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="enrollment">
        <TabsList>
          <TabsTrigger value="enrollment">Enrollment Trends</TabsTrigger>
          <TabsTrigger value="departments">Department Analytics</TabsTrigger>
          <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="enrollment" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Enrollment Trends</CardTitle>
              <CardDescription>Monthly enrollment data for 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <div className="flex items-end justify-between h-64 gap-2">
                  {enrollmentData.map((data) => {
                    const height = (data.students / maxEnrollment) * 100;
                    return (
                      <div
                        key={data.month}
                        className="flex-1 flex flex-col items-center gap-2"
                      >
                        <div className="w-full relative group">
                          <div
                            className="w-full bg-blue-600 rounded-t hover:bg-blue-700 transition-all cursor-pointer"
                            style={{ height: `${height}%` }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                              {data.students} students
                              <br />
                              <span
                                className={
                                  data.growth >= 0 ? 'text-green-400' : 'text-red-400'
                                }
                              >
                                {data.growth >= 0 ? '↑' : '↓'} {Math.abs(data.growth)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{data.month}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Peak Enrollment</p>
                  <p className="text-2xl mt-1">1,247</p>
                  <p className="text-xs text-gray-500 mt-1">October 2025</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Average Growth</p>
                  <p className="text-2xl mt-1 text-green-600">1.1%</p>
                  <p className="text-xs text-gray-500 mt-1">Monthly average</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">YoY Growth</p>
                  <p className="text-2xl mt-1 text-green-600">12%</p>
                  <p className="text-xs text-gray-500 mt-1">Compared to 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>
                Comparative analysis across departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {departmentStats.map((dept) => (
                  <div key={dept.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm">{dept.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {dept.students} students enrolled
                        </p>
                      </div>
                      <Badge variant="outline">Avg GPA: {dept.avgGPA}</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Enrollment</span>
                          <span>{dept.students}</span>
                        </div>
                        <Progress value={(dept.students / 450) * 100} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Avg GPA</span>
                          <span>{dept.avgGPA}</span>
                        </div>
                        <Progress value={(dept.avgGPA / 4.0) * 100} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Completion</span>
                          <span>{dept.completion}%</span>
                        </div>
                        <Progress value={dept.completion} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance Metrics</CardTitle>
              <CardDescription>
                Enrollment and performance by subject
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectPerformance.map((subject) => (
                  <div
                    key={subject.subject}
                    className="p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-sm">{subject.subject}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {subject.enrolled} students enrolled
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge
                          variant="outline"
                          className={
                            subject.passRate >= 90
                              ? 'bg-green-50 text-green-700'
                              : subject.passRate >= 80
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                          }
                        >
                          {subject.passRate}% Pass Rate
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Enrollment</p>
                        <div className="flex items-center gap-2">
                          <Progress value={(subject.enrolled / 150) * 100} />
                          <span className="text-xs">{subject.enrolled}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Average Grade</p>
                        <div className="flex items-center gap-2">
                          <Progress value={subject.avgGrade} />
                          <span className="text-xs">{subject.avgGrade}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Pass Rate</p>
                        <div className="flex items-center gap-2">
                          <Progress value={subject.passRate} />
                          <span className="text-xs">{subject.passRate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Overall Attendance</CardTitle>
                <CardDescription>System-wide attendance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 rounded-lg bg-blue-50">
                  <p className="text-sm text-gray-600">Average Attendance Rate</p>
                  <p className="text-4xl mt-2">92.5%</p>
                  <p className="text-xs text-green-600 mt-2">
                    ↑ 2.3% from last semester
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Excellent (95-100%)</span>
                    <span className="text-sm text-gray-600">45%</span>
                  </div>
                  <Progress value={45} className="bg-green-100" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Good (85-94%)</span>
                    <span className="text-sm text-gray-600">38%</span>
                  </div>
                  <Progress value={38} />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fair (75-84%)</span>
                    <span className="text-sm text-gray-600">12%</span>
                  </div>
                  <Progress value={12} className="bg-amber-100" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Poor (&lt;75%)</span>
                    <span className="text-sm text-gray-600">5%</span>
                  </div>
                  <Progress value={5} className="bg-red-100" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance by Day</CardTitle>
                <CardDescription>Weekly attendance patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { day: 'Monday', rate: 94 },
                    { day: 'Tuesday', rate: 93 },
                    { day: 'Wednesday', rate: 91 },
                    { day: 'Thursday', rate: 92 },
                    { day: 'Friday', rate: 88 },
                  ].map((item) => (
                    <div key={item.day} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{item.day}</span>
                        <span className="text-sm">{item.rate}%</span>
                      </div>
                      <Progress value={item.rate} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
