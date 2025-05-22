import React from 'react';
import Card from '../common/Card';
import { attendanceHistory } from '../../data/mockData';
import { formatDate, formatTime } from '../../utils/dateUtils';

const AttendanceOverview: React.FC = () => {
  // Get today's attendance if exists
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendanceHistory.find(a => a.date === today);
  
  // Calculate attendance stats
  const workingDays = attendanceHistory.length;
  const presentDays = attendanceHistory.filter(a => a.status === 'present').length;
  const absentDays = attendanceHistory.filter(a => a.status === 'absent').length;
  const halfDays = attendanceHistory.filter(a => a.status === 'half-day').length;
  
  // Calculate average work hours
  const totalWorkHours = attendanceHistory.reduce((sum, attendance) => {
    return sum + (attendance.workHours || 0);
  }, 0);
  const averageWorkHours = workingDays > 0 ? (totalWorkHours / workingDays).toFixed(2) : 0;
  
  return (
    <Card 
      title="Attendance Overview" 
      className="h-full"
    >
      {/* Today's status */}
      <div className="mb-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
        <h4 className="text-sm font-medium text-slate-700 mb-2">Today's Status</h4>
        {todayAttendance ? (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-xs text-slate-500 block">Check In</span>
              <span className="text-sm font-medium text-slate-800">
                {formatTime(todayAttendance.checkIn)}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Check Out</span>
              <span className="text-sm font-medium text-slate-800">
                {todayAttendance.checkOut ? formatTime(todayAttendance.checkOut) : '--:--'}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Work Hours</span>
              <span className="text-sm font-medium text-slate-800">
                {todayAttendance.workHours ? `${todayAttendance.workHours} hrs` : '--'}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Status</span>
              <span className="text-sm font-medium text-emerald-600 capitalize">
                {todayAttendance.status}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-600">No attendance recorded for today</div>
        )}
      </div>
      
      {/* Attendance metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
          <span className="text-xs text-blue-700 block">Working Days</span>
          <span className="text-xl font-semibold text-blue-800">{workingDays}</span>
        </div>
        <div className="p-3 rounded-lg bg-green-50 border border-green-100">
          <span className="text-xs text-green-700 block">Present</span>
          <span className="text-xl font-semibold text-green-800">{presentDays}</span>
        </div>
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
          <span className="text-xs text-amber-700 block">Half Day</span>
          <span className="text-xl font-semibold text-amber-800">{halfDays}</span>
        </div>
        <div className="p-3 rounded-lg bg-red-50 border border-red-100">
          <span className="text-xs text-red-700 block">Absent</span>
          <span className="text-xl font-semibold text-red-800">{absentDays}</span>
        </div>
      </div>
      
      {/* Recent attendance */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-2">Recent Attendance</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-slate-50">
                <th className="px-2 py-2 font-medium text-slate-600">Date</th>
                <th className="px-2 py-2 font-medium text-slate-600">Check In</th>
                <th className="px-2 py-2 font-medium text-slate-600">Check Out</th>
                <th className="px-2 py-2 font-medium text-slate-600">Hours</th>
              </tr>
            </thead>
            <tbody>
              {attendanceHistory.slice(0, 5).map((attendance) => (
                <tr key={attendance.id} className="border-b border-slate-100">
                  <td className="px-2 py-2 text-slate-800">{formatDate(attendance.date)}</td>
                  <td className="px-2 py-2 text-slate-800">{formatTime(attendance.checkIn)}</td>
                  <td className="px-2 py-2 text-slate-800">
                    {attendance.checkOut ? formatTime(attendance.checkOut) : '--:--'}
                  </td>
                  <td className="px-2 py-2 text-slate-800">
                    {attendance.workHours ? `${attendance.workHours} hrs` : '--'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-right">
          <a href="#attendance" className="text-sm text-blue-600 hover:text-blue-800">
            View All →
          </a>
        </div>
      </div>
    </Card>
  );
};

export default AttendanceOverview;