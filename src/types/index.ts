export type User = {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  joinDate: string;
  avatar: string;
  phone?: string;
  manager?: string;
  leaveBalance: {
    casual: number;
    sick: number;
    earned: number;
  };
};

export type Attendance = {
  id: string;
  userId: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  workHours: number | null;
  status: 'present' | 'absent' | 'half-day' | 'weekend' | 'holiday';
};

export type Leave = {
  id: string;
  userId: string;
  type: 'casual' | 'sick' | 'earned' | 'unpaid';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
};

export type Holiday = {
  id: string;
  name: string;
  date: string;
  description?: string;
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'leave' | 'attendance' | 'announcement' | 'general';
};