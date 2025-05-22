import React, { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import { Calendar, Plus, Search, Filter } from 'lucide-react';
import { leaveApplications, currentUser } from '../data/mockData';
import { formatDate, getDateDifference } from '../utils/dateUtils';
import Badge from '../components/common/Badge';

const Leave: React.FC = () => {
  const [isApplyLeaveOpen, setIsApplyLeaveOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // New leave application form state
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  
  // Filter leave applications
  const filteredLeaves = leaveApplications.filter(leave => {
    const matchesSearch = 
      leave.startDate.includes(searchQuery) || 
      leave.endDate.includes(searchQuery) ||
      leave.reason.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || leave.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.appliedOn).getTime() - new Date(a.appliedOn).getTime());
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge label="Approved" variant="success" />;
      case 'pending':
        return <Badge label="Pending" variant="warning" />;
      case 'rejected':
        return <Badge label="Rejected" variant="danger" />;
      default:
        return null;
    }
  };
  
  const getLeaveTypeBadge = (type: string) => {
    switch (type) {
      case 'casual':
        return <Badge label="Casual" variant="info" />;
      case 'sick':
        return <Badge label="Sick" variant="primary" />;
      case 'earned':
        return <Badge label="Earned" variant="warning" />;
      case 'unpaid':
        return <Badge label="Unpaid" variant="danger" />;
      default:
        return null;
    }
  };
  
  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send this to the server
    alert('Leave application submitted!');
    setIsApplyLeaveOpen(false);
    resetForm();
  };
  
  const resetForm = () => {
    setLeaveType('');
    setStartDate('');
    setEndDate('');
    setReason('');
  };
  
  const calculateDays = () => {
    if (startDate && endDate) {
      return getDateDifference(startDate, endDate);
    }
    return 0;
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Leave Management</h1>
        <p className="text-slate-600">Apply for and manage your leave applications</p>
      </div>
      
      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="flex items-center bg-blue-50 border-blue-100">
          <div className="rounded-full bg-blue-100 p-3 mr-3">
            <Calendar className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-blue-700">Casual Leave</div>
            <div className="text-lg font-semibold text-blue-800">
              {currentUser.leaveBalance.casual} days
            </div>
          </div>
        </Card>
        
        <Card className="flex items-center bg-purple-50 border-purple-100">
          <div className="rounded-full bg-purple-100 p-3 mr-3">
            <Calendar className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <div className="text-sm text-purple-700">Sick Leave</div>
            <div className="text-lg font-semibold text-purple-800">
              {currentUser.leaveBalance.sick} days
            </div>
          </div>
        </Card>
        
        <Card className="flex items-center bg-amber-50 border-amber-100">
          <div className="rounded-full bg-amber-100 p-3 mr-3">
            <Calendar className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <div className="text-sm text-amber-700">Earned Leave</div>
            <div className="text-lg font-semibold text-amber-800">
              {currentUser.leaveBalance.earned} days
            </div>
          </div>
        </Card>
      </div>
      
      {/* Leave Application Form */}
      {isApplyLeaveOpen && (
        <Card 
          title="Apply for Leave" 
          className="mb-6"
          footer={
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsApplyLeaveOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleApplyLeave}
                disabled={!leaveType || !startDate || !endDate || !reason}
              >
                Submit Application
              </Button>
            </div>
          }
        >
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              id="leaveType"
              label="Leave Type"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              options={[
                { value: 'casual', label: 'Casual Leave' },
                { value: 'sick', label: 'Sick Leave' },
                { value: 'earned', label: 'Earned Leave' },
                { value: 'unpaid', label: 'Unpaid Leave' }
              ]}
              placeholder="Select leave type"
              required
            />
            
            <div className="flex gap-3">
              <Input
                id="startDate"
                label="From"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
              />
              <Input
                id="endDate"
                label="To"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                min={startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="md:col-span-2">
              <Input
                id="reason"
                label="Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                placeholder="Provide details about your leave request"
              />
            </div>
            
            {startDate && endDate && (
              <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                <span className="text-sm text-blue-700">Duration: </span>
                <span className="font-medium text-blue-800">
                  {calculateDays()} day{calculateDays() !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </form>
        </Card>
      )}
      
      {/* Leave Applications */}
      <Card title="Leave Applications">
        {/* Actions & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input
              id="search"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={Search}
            />
          </div>
          <div className="w-full md:w-48">
            <Select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'pending', label: 'Pending' },
                { value: 'approved', label: 'Approved' },
                { value: 'rejected', label: 'Rejected' }
              ]}
            />
          </div>
          <div>
            <Button 
              variant="primary" 
              icon={Plus}
              onClick={() => setIsApplyLeaveOpen(true)}
            >
              Apply Leave
            </Button>
          </div>
        </div>
        
        {/* Leave Applications Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-slate-50">
                <th className="px-4 py-3 font-medium text-slate-600">Type</th>
                <th className="px-4 py-3 font-medium text-slate-600">From</th>
                <th className="px-4 py-3 font-medium text-slate-600">To</th>
                <th className="px-4 py-3 font-medium text-slate-600">Days</th>
                <th className="px-4 py-3 font-medium text-slate-600">Reason</th>
                <th className="px-4 py-3 font-medium text-slate-600">Applied On</th>
                <th className="px-4 py-3 font-medium text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.length > 0 ? (
                filteredLeaves.map((leave) => (
                  <tr key={leave.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3">{getLeaveTypeBadge(leave.type)}</td>
                    <td className="px-4 py-3 text-slate-800">{formatDate(leave.startDate)}</td>
                    <td className="px-4 py-3 text-slate-800">{formatDate(leave.endDate)}</td>
                    <td className="px-4 py-3 text-slate-800">{leave.days}</td>
                    <td className="px-4 py-3 text-slate-800">
                      <div className="max-w-xs truncate">{leave.reason}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-800">{formatDate(leave.appliedOn)}</td>
                    <td className="px-4 py-3">{getStatusBadge(leave.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-3 text-center text-slate-500">
                    No leave applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Leave;