import { useState } from 'react';
import { Building2, Plus, Calendar, MapPin, Users, Clock, Edit, Trash2 } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';

interface Room {
  id: string;
  code: string;
  name: string;
  building: string;
  type: 'lecture' | 'lab' | 'seminar' | 'exam';
  capacity: number;
  floor: number;
  equipment: string[];
  status: 'available' | 'occupied' | 'maintenance';
}

interface RoomBooking {
  id: string;
  roomId: string;
  roomCode: string;
  subject: string;
  teacher: string;
  day: string;
  startTime: string;
  endTime: string;
  type: 'lecture' | 'lab' | 'exam';
}

const mockRooms: Room[] = [
  {
    id: 'R001',
    code: 'A-301',
    name: 'Main Lecture Hall',
    building: 'Building A',
    type: 'lecture',
    capacity: 120,
    floor: 3,
    equipment: ['Projector', 'Whiteboard', 'Sound System', 'AC'],
    status: 'available',
  },
  {
    id: 'R002',
    code: 'B-205',
    name: 'Computer Lab 1',
    building: 'Building B',
    type: 'lab',
    capacity: 40,
    floor: 2,
    equipment: ['40 PCs', 'Projector', 'AC', 'Server'],
    status: 'available',
  },
  {
    id: 'R003',
    code: 'LAB-102',
    name: 'Database Lab',
    building: 'Lab Building',
    type: 'lab',
    capacity: 35,
    floor: 1,
    equipment: ['35 PCs', 'Server', 'Projector', 'AC'],
    status: 'occupied',
  },
  {
    id: 'R004',
    code: 'HALL-A',
    name: 'Exam Hall A',
    building: 'Main Building',
    type: 'exam',
    capacity: 200,
    floor: 1,
    equipment: ['CCTV', 'AC', 'Individual Desks'],
    status: 'available',
  },
  {
    id: 'R005',
    code: 'C-410',
    name: 'Seminar Room',
    building: 'Building C',
    type: 'seminar',
    capacity: 30,
    floor: 4,
    equipment: ['Projector', 'Whiteboard', 'Conference Table', 'AC'],
    status: 'available',
  },
];

const mockBookings: RoomBooking[] = [
  {
    id: 'B001',
    roomId: 'R001',
    roomCode: 'A-301',
    subject: 'CS301 - Database Systems',
    teacher: 'Prof. David Wilson',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:30',
    type: 'lecture',
  },
  {
    id: 'B002',
    roomId: 'R002',
    roomCode: 'B-205',
    subject: 'CS302 - Web Development',
    teacher: 'Dr. Michael Smith',
    day: 'Tuesday',
    startTime: '11:00',
    endTime: '12:30',
    type: 'lecture',
  },
  {
    id: 'B003',
    roomId: 'R003',
    roomCode: 'LAB-102',
    subject: 'CS301 - Database Systems',
    teacher: 'Prof. David Wilson',
    day: 'Wednesday',
    startTime: '14:00',
    endTime: '16:00',
    type: 'lab',
  },
];

export function RoomsSchedulingPage() {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [bookings, setBookings] = useState<RoomBooking[]>(mockBookings);
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleDeleteRoom = (id: string) => {
    setRooms(rooms.filter((r) => r.id !== id));
    toast.success('Room deleted successfully');
  };

  const stats = {
    totalRooms: rooms.length,
    availableRooms: rooms.filter((r) => r.status === 'available').length,
    totalCapacity: rooms.reduce((sum, r) => sum + r.capacity, 0),
    utilization: 68,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800';
      case 'lab':
        return 'bg-purple-100 text-purple-800';
      case 'seminar':
        return 'bg-green-100 text-green-800';
      case 'exam':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Rooms & Scheduling</h1>
          <p className="text-gray-600 mt-1">
            Manage classroom allocation and schedule bookings
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsBookingOpen(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            New Booking
          </Button>
          <Button onClick={() => setIsCreateRoomOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Room
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Total Rooms</CardTitle>
            <Building2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.totalRooms}</div>
            <p className="text-xs text-gray-500 mt-1">All facilities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Available Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.availableRooms}</div>
            <p className="text-xs text-green-600 mt-1">Ready to use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Total Capacity</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.totalCapacity}</div>
            <p className="text-xs text-gray-500 mt-1">Seats available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.utilization}%</div>
            <p className="text-xs text-blue-600 mt-1">Average usage</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rooms">
        <TabsList>
          <TabsTrigger value="rooms">Room Management</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="rooms" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Rooms</CardTitle>
              <CardDescription>
                Complete list of available facilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room Code</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Building</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Floor</TableHead>
                      <TableHead>Equipment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded bg-blue-600 text-white flex items-center justify-center text-xs">
                              <Building2 className="h-4 w-4" />
                            </div>
                            <span>{room.code}</span>
                          </div>
                        </TableCell>
                        <TableCell>{room.name}</TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {room.building}
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(room.type)}>
                            {room.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{room.capacity}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">Floor {room.floor}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {room.equipment.slice(0, 2).map((eq, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {eq}
                              </Badge>
                            ))}
                            {room.equipment.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{room.equipment.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(room.status)}>
                            {room.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedRoom(room)}
                            >
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRoom(room.id)}
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

        <TabsContent value="schedule" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Room allocation overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
                  (day) => {
                    const dayBookings = bookings.filter((b) => b.day === day);
                    return (
                      <div key={day} className="border rounded-lg p-4">
                        <h4 className="mb-3">{day}</h4>
                        {dayBookings.length > 0 ? (
                          <div className="space-y-2">
                            {dayBookings.map((booking) => (
                              <div
                                key={booking.id}
                                className="flex items-center justify-between p-3 rounded bg-gray-50"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">
                                      {booking.startTime} - {booking.endTime}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{booking.roomCode}</span>
                                  </div>
                                  <span className="text-sm">{booking.subject}</span>
                                </div>
                                <Badge className={getTypeColor(booking.type)}>
                                  {booking.type}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No bookings</p>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Bookings</CardTitle>
              <CardDescription>Current room reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Day</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{booking.roomCode}</span>
                          </div>
                        </TableCell>
                        <TableCell>{booking.subject}</TableCell>
                        <TableCell className="text-sm">{booking.teacher}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{booking.day}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {booking.startTime} - {booking.endTime}
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(booking.type)}>
                            {booking.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
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
      </Tabs>

      <Dialog open={isCreateRoomOpen} onOpenChange={setIsCreateRoomOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Room</DialogTitle>
            <DialogDescription>
              Register a new classroom or facility
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room-code">Room Code</Label>
                <Input id="room-code" placeholder="e.g., A-301" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room-name">Room Name</Label>
                <Input id="room-name" placeholder="e.g., Main Lecture Hall" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="building">Building</Label>
                <Input id="building" placeholder="e.g., Building A" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="floor">Floor</Label>
                <Input id="floor" type="number" placeholder="3" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Room Type</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lecture">Lecture Hall</SelectItem>
                    <SelectItem value="lab">Laboratory</SelectItem>
                    <SelectItem value="seminar">Seminar Room</SelectItem>
                    <SelectItem value="exam">Exam Hall</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" placeholder="120" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateRoomOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsCreateRoomOpen(false);
                toast.success('Room added successfully');
              }}
            >
              Add Room
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Booking</DialogTitle>
            <DialogDescription>Reserve a room for classes or events</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="select-room">Select Room</Label>
              <Select>
                <SelectTrigger id="select-room">
                  <SelectValue placeholder="Choose a room" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.code} - {room.name} (Capacity: {room.capacity})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="day">Day</Label>
                <Select>
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="tuesday">Tuesday</SelectItem>
                    <SelectItem value="wednesday">Wednesday</SelectItem>
                    <SelectItem value="thursday">Thursday</SelectItem>
                    <SelectItem value="friday">Friday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking-type">Type</Label>
                <Select>
                  <SelectTrigger id="booking-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lecture">Lecture</SelectItem>
                    <SelectItem value="lab">Lab</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input id="start-time" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input id="end-time" type="time" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="e.g., CS301 - Database Systems" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsBookingOpen(false);
                toast.success('Booking created successfully');
              }}
            >
              Create Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
