import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Calendar, Clock, Search, Filter } from 'lucide-react';
import { attendanceHistory } from '../data/mockData';
import { formatDate, formatTime } from '../utils/dateUtils';
import Badge from '../components/common/Badge';

const Attendance: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().substr(0, 7) // Current month in YYYY-MM format
  );
  
  // Filter attendance records
  const filteredAttendance = attendanceHistory.filter(record => {
    const matchesSearch = record.date.includes(searchQuery);
    const matchesMonth = record.date.startsWith(selectedMonth);
    return matchesSearch && matchesMonth;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge label="Present" variant="success" />;
      case 'absent':
        return <Badge label="Absent" variant="danger" />;
      case 'half-day':
        return <Badge label="Half Day" variant="warning" />;
      case 'weekend':
        return <Badge label="Weekend" variant="info" />;
      case 'holiday':
        return <Badge label="Holiday" variant="primary" />;
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Attendance Management</h1>
        <p className="text-slate-600">Track and manage your attendance records</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="flex items-center">
          <div className="rounded-full bg-emerald-100 p-3 mr-3">
            <Clock className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <div className="text-sm text-slate-600">Today</div>
            <div className="text-lg font-semibold text-slate-800">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-3">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-slate-600">Present Days</div>
            <div className="text-lg font-semibold text-slate-800">
              {attendanceHistory.filter(a => a.status === 'present').length}
            </div>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <div className="rounded-full bg-amber-100 p-3 mr-3">
            <Clock className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <div className="text-sm text-slate-600">Half Days</div>
            <div className="text-lg font-semibold text-slate-800">
              {attendanceHistory.filter(a => a.status === 'half-day').length}
            </div>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <div className="rounded-full bg-red-100 p-3 mr-3">
            <Clock className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <div className="text-sm text-slate-600">Absent Days</div>
            <div className="text-lg font-semibold text-slate-800">
              {attendanceHistory.filter(a => a.status === 'absent').length}
            </div>
          </div>
        </Card>
      </div>
      
      {/* Attendance Tracker */}
      <Card title="Attendance Records">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input
              id="search"
              placeholder="Search by date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={Search}
            />
          </div>
          <div className="w-full md:w-48">
            <Input
              id="month"
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              icon={Calendar}
            />
          </div>
          <div>
            <Button variant="outline" icon={Filter}>
              Filters
            </Button>
          </div>
        </div>
        
        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-slate-50">
                <th className="px-4 py-3 font-medium text-slate-600">Date</th>
                <th className="px-4 py-3 font-medium text-slate-600">Day</th>
                <th className="px-4 py-3 font-medium text-slate-600">Check In</th>
                <th className="px-4 py-3 font-medium text-slate-600">Check Out</th>
                <th className="px-4 py-3 font-medium text-slate-600">Work Hours</th>
                <th className="px-4 py-3 font-medium text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((attendance) => (
                  <tr key={attendance.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-800">{formatDate(attendance.date)}</td>
                    <td className="px-4 py-3 text-slate-800">
                      {new Date(attendance.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </td>
                    <td className="px-4 py-3 text-slate-800">{formatTime(attendance.checkIn)}</td>
                    <td className="px-4 py-3 text-slate-800">
                      {attendance.checkOut ? formatTime(attendance.checkOut) : '--:--'}
                    </td>
                    <td className="px-4 py-3 text-slate-800">
                      {attendance.workHours ? `${attendance.workHours} hrs` : '--'}
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(attendance.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-3 text-center text-slate-500">
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 px-4">
          <div className="text-sm text-slate-600">
            Showing {filteredAttendance.length} of {attendanceHistory.length} records
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Attendance;