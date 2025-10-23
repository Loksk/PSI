import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { mockSchedule } from '../data/mockData';
import { UserRole } from '../types';

interface SchedulePageProps {
  role: UserRole;
}

export function SchedulePage({ role }: SchedulePageProps) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const getScheduleForDayAndTime = (day: string, time: string) => {
    return mockSchedule.filter((item) => {
      if (item.day !== day) return false;
      const startHour = parseInt(item.startTime.split(':')[0]);
      const timeHour = parseInt(time.split(':')[0]);
      const endHour = parseInt(item.endTime.split(':')[0]);
      return timeHour >= startHour && timeHour < endHour;
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'lab':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'seminar':
        return 'bg-green-100 border-green-300 text-green-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Schedule</h1>
          <p className="text-gray-600 mt-1">
            {role === 'student' && 'Your weekly class schedule'}
            {role === 'teacher' && 'Your teaching schedule'}
            {role === 'admin' && 'System-wide schedule overview'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="px-4 py-2 border rounded-lg">
            <p className="text-sm">Week 43, 2025</p>
          </div>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Badge className="bg-blue-100 border-blue-300 text-blue-800">
          <div className="w-3 h-3 rounded-full bg-blue-600 mr-2" />
          Lecture
        </Badge>
        <Badge className="bg-purple-100 border-purple-300 text-purple-800">
          <div className="w-3 h-3 rounded-full bg-purple-600 mr-2" />
          Lab
        </Badge>
        <Badge className="bg-green-100 border-green-300 text-green-800">
          <div className="w-3 h-3 rounded-full bg-green-600 mr-2" />
          Seminar
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Timetable</CardTitle>
          <CardDescription>October 21 - October 25, 2025</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-6 gap-px bg-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-3">
                <p className="text-sm text-gray-600">Time</p>
              </div>
              {days.map((day) => (
                <div key={day} className="bg-gray-50 p-3">
                  <p className="text-sm text-center">{day}</p>
                </div>
              ))}

              {timeSlots.map((time) => (
                <>
                  <div key={`time-${time}`} className="bg-white p-3 flex items-start">
                    <p className="text-sm text-gray-500">{time}</p>
                  </div>
                  {days.map((day) => {
                    const classes = getScheduleForDayAndTime(day, time);
                    return (
                      <div key={`${day}-${time}`} className="bg-white p-2 min-h-[80px]">
                        {classes.map((cls) => {
                          const startHour = parseInt(cls.startTime.split(':')[0]);
                          const timeHour = parseInt(time.split(':')[0]);
                          
                          if (startHour === timeHour) {
                            return (
                              <div
                                key={cls.id}
                                className={`p-2 rounded border-l-4 ${getTypeColor(cls.type)} h-full`}
                              >
                                <p className="text-xs">{cls.subjectCode}</p>
                                <p className="text-xs mt-1 line-clamp-1">
                                  {cls.subjectName}
                                </p>
                                <div className="flex items-center gap-1 mt-2 text-xs opacity-75">
                                  <MapPin className="h-3 w-3" />
                                  <span>{cls.room}</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1 text-xs opacity-75">
                                  <Clock className="h-3 w-3" />
                                  <span>{cls.startTime}-{cls.endTime}</span>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Next 5 scheduled classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockSchedule.slice(0, 5).map((cls) => (
                <div
                  key={cls.id}
                  className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    cls.type === 'lecture' ? 'bg-blue-100' :
                    cls.type === 'lab' ? 'bg-purple-100' : 'bg-green-100'
                  }`}>
                    <Calendar className={`h-5 w-5 ${
                      cls.type === 'lecture' ? 'text-blue-600' :
                      cls.type === 'lab' ? 'text-purple-600' : 'text-green-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm">{cls.subjectCode} - {cls.subjectName}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {cls.day}, {cls.startTime} - {cls.endTime}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs capitalize">
                        {cls.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Room {cls.room}
                      </div>
                      {role === 'student' && cls.teacherName && (
                        <span>• {cls.teacherName}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Summary</CardTitle>
            <CardDescription>This week's statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm">Total Classes</p>
                  <p className="text-xs text-gray-600">This week</p>
                </div>
              </div>
              <p className="text-2xl">12</p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-600 flex items-center justify-center text-white">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm">Total Hours</p>
                  <p className="text-xs text-gray-600">Contact time</p>
                </div>
              </div>
              <p className="text-2xl">18</p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-600 flex items-center justify-center text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm">Different Rooms</p>
                  <p className="text-xs text-gray-600">Locations</p>
                </div>
              </div>
              <p className="text-2xl">5</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
