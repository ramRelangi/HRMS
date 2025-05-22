import React from 'react';
import QuickActions from '../components/dashboard/QuickActions';
import AttendanceOverview from '../components/dashboard/AttendanceOverview';
import LeaveBalance from '../components/dashboard/LeaveBalance';
import Announcements from '../components/dashboard/Announcements';
import UpcomingHolidays from '../components/dashboard/UpcomingHolidays';
import CheckInWidget from '../components/dashboard/CheckInWidget';
import { currentUser } from '../data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Welcome, {currentUser.name}</h1>
        <p className="text-slate-600">Here's what's happening today</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          <QuickActions />
        </div>
        <div>
          <CheckInWidget />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AttendanceOverview />
        <LeaveBalance />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Announcements />
        </div>
        <div>
          <UpcomingHolidays />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;