import { User, Attendance, Leave, Announcement, Holiday, Notification } from '../types';

// Current User
export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@company.com',
  position: 'Senior Developer',
  department: 'Engineering',
  joinDate: '2022-01-15',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  phone: '+1 (555) 123-4567',
  manager: 'Sarah Williams',
  leaveBalance: {
    casual: 5,
    sick: 8,
    earned: 10
  }
};

// Mock Team Members
export const teamMembers: User[] = [
  currentUser,
  {
    id: '2',
    name: 'Emily Chen',
    email: 'emily.chen@company.com',
    position: 'UX Designer',
    department: 'Design',
    joinDate: '2021-11-05',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    manager: 'Sarah Williams',
    leaveBalance: {
      casual: 3,
      sick: 7,
      earned: 12
    }
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    email: 'michael.r@company.com',
    position: 'QA Engineer',
    department: 'Engineering',
    joinDate: '2022-03-10',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    manager: 'Sarah Williams',
    leaveBalance: {
      casual: 6,
      sick: 5,
      earned: 8
    }
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.w@company.com',
    position: 'Engineering Manager',
    department: 'Engineering',
    joinDate: '2020-06-15',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150',
    leaveBalance: {
      casual: 2,
      sick: 10,
      earned: 15
    }
  }
];

// Attendance History
export const attendanceHistory: Attendance[] = [
  {
    id: 'a1',
    userId: '1',
    date: '2023-09-25',
    checkIn: '09:05:22',
    checkOut: '18:10:45',
    workHours: 9.08,
    status: 'present'
  },
  {
    id: 'a2',
    userId: '1',
    date: '2023-09-24',
    checkIn: '08:55:10',
    checkOut: '17:30:00',
    workHours: 8.58,
    status: 'present'
  },
  {
    id: 'a3',
    userId: '1',
    date: '2023-09-23',
    checkIn: '09:10:30',
    checkOut: '18:05:15',
    workHours: 8.91,
    status: 'present'
  },
  {
    id: 'a4',
    userId: '1',
    date: '2023-09-22',
    checkIn: '09:00:00',
    checkOut: '17:45:20',
    workHours: 8.75,
    status: 'present'
  },
  {
    id: 'a5',
    userId: '1',
    date: '2023-09-21',
    checkIn: '09:15:40',
    checkOut: '18:20:10',
    workHours: 9.07,
    status: 'present'
  }
];

// Leave Applications
export const leaveApplications: Leave[] = [
  {
    id: 'l1',
    userId: '1',
    type: 'casual',
    startDate: '2023-10-10',
    endDate: '2023-10-12',
    days: 3,
    reason: 'Family function',
    status: 'approved',
    appliedOn: '2023-09-15'
  },
  {
    id: 'l2',
    userId: '1',
    type: 'sick',
    startDate: '2023-08-05',
    endDate: '2023-08-06',
    days: 2,
    reason: 'Fever and cold',
    status: 'approved',
    appliedOn: '2023-08-04'
  },
  {
    id: 'l3',
    userId: '1',
    type: 'earned',
    startDate: '2023-12-20',
    endDate: '2023-12-31',
    days: 10,
    reason: 'Year-end vacation',
    status: 'pending',
    appliedOn: '2023-09-20'
  }
];

// Company Announcements
export const announcements: Announcement[] = [
  {
    id: 'an1',
    title: 'Office Closure - Thanksgiving',
    content: 'The office will be closed on November 23rd and 24th for Thanksgiving. Wishing everyone a wonderful holiday!',
    date: '2023-09-15',
    priority: 'medium'
  },
  {
    id: 'an2',
    title: 'New Health Insurance Plan',
    content: 'We\'re excited to announce our new comprehensive health insurance plan starting next month. Details will be shared in the upcoming town hall.',
    date: '2023-09-10',
    priority: 'high'
  },
  {
    id: 'an3',
    title: 'Quarterly Town Hall',
    content: 'Our Q3 town hall is scheduled for October 5th at 3 PM in the main conference room. Remote employees can join via the usual video conference link.',
    date: '2023-09-05',
    priority: 'medium'
  }
];

// Upcoming Holidays
export const holidays: Holiday[] = [
  {
    id: 'h1',
    name: 'Labor Day',
    date: '2023-09-04',
    description: 'Federal holiday honoring the American labor movement'
  },
  {
    id: 'h2',
    name: 'Columbus Day',
    date: '2023-10-09',
    description: 'Commemorates the landing of Christopher Columbus in the Americas'
  },
  {
    id: 'h3',
    name: 'Veterans Day',
    date: '2023-11-11',
    description: 'Honors military veterans who served in the United States Armed Forces'
  },
  {
    id: 'h4',
    name: 'Thanksgiving Day',
    date: '2023-11-23',
    description: 'National holiday celebrating the harvest and blessings of the past year'
  }
];

// Notifications
export const notifications: Notification[] = [
  {
    id: 'n1',
    userId: '1',
    title: 'Leave Approved',
    message: 'Your leave request for Oct 10-12 has been approved by Sarah Williams.',
    date: '2023-09-16T10:30:00',
    read: false,
    type: 'leave'
  },
  {
    id: 'n2',
    userId: '1',
    title: 'New Announcement',
    message: 'New announcement: Office Closure - Thanksgiving',
    date: '2023-09-15T14:15:00',
    read: true,
    type: 'announcement'
  },
  {
    id: 'n3',
    userId: '1',
    title: 'Attendance Reminder',
    message: 'You forgot to check out yesterday. Please update your attendance record.',
    date: '2023-09-14T08:00:00',
    read: true,
    type: 'attendance'
  }
];