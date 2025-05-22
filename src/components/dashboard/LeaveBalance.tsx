import React from 'react';
import Card from '../common/Card';
import { currentUser, leaveApplications } from '../../data/mockData';
import { formatDate } from '../../utils/dateUtils';
import Badge from '../common/Badge';

const LeaveBalance: React.FC = () => {
  // Calculate leaves taken
  const casualLeavesTaken = leaveApplications
    .filter(leave => leave.type === 'casual' && leave.status === 'approved')
    .reduce((sum, leave) => sum + leave.days, 0);
    
  const sickLeavesTaken = leaveApplications
    .filter(leave => leave.type === 'sick' && leave.status === 'approved')
    .reduce((sum, leave) => sum + leave.days, 0);
    
  const earnedLeavesTaken = leaveApplications
    .filter(leave => leave.type === 'earned' && leave.status === 'approved')
    .reduce((sum, leave) => sum + leave.days, 0);
  
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
  
  return (
    <Card 
      title="Leave Management" 
      className="h-full"
    >
      {/* Leave balance */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-slate-700 mb-2">Leave Balance</h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 text-center">
            <span className="text-xs text-blue-600 block mb-1">Casual</span>
            <div className="flex justify-center items-baseline">
              <span className="text-xl font-semibold text-blue-800">
                {currentUser.leaveBalance.casual - casualLeavesTaken}
              </span>
              <span className="text-xs text-blue-600 ml-1">/ {currentUser.leaveBalance.casual}</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-purple-50 border border-purple-100 text-center">
            <span className="text-xs text-purple-600 block mb-1">Sick</span>
            <div className="flex justify-center items-baseline">
              <span className="text-xl font-semibold text-purple-800">
                {currentUser.leaveBalance.sick - sickLeavesTaken}
              </span>
              <span className="text-xs text-purple-600 ml-1">/ {currentUser.leaveBalance.sick}</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 text-center">
            <span className="text-xs text-amber-600 block mb-1">Earned</span>
            <div className="flex justify-center items-baseline">
              <span className="text-xl font-semibold text-amber-800">
                {currentUser.leaveBalance.earned - earnedLeavesTaken}
              </span>
              <span className="text-xs text-amber-600 ml-1">/ {currentUser.leaveBalance.earned}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Leave applications */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-2">Recent Applications</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-slate-50">
                <th className="px-2 py-2 font-medium text-slate-600">Type</th>
                <th className="px-2 py-2 font-medium text-slate-600">Date</th>
                <th className="px-2 py-2 font-medium text-slate-600">Days</th>
                <th className="px-2 py-2 font-medium text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveApplications.map((leave) => (
                <tr key={leave.id} className="border-b border-slate-100">
                  <td className="px-2 py-2">{getLeaveTypeBadge(leave.type)}</td>
                  <td className="px-2 py-2 text-slate-800">
                    {formatDate(leave.startDate)}
                    {leave.startDate !== leave.endDate && ` - ${formatDate(leave.endDate)}`}
                  </td>
                  <td className="px-2 py-2 text-slate-800">{leave.days}</td>
                  <td className="px-2 py-2">{getStatusBadge(leave.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-right">
          <a href="#leave" className="text-sm text-blue-600 hover:text-blue-800">
            View All →
          </a>
        </div>
      </div>
    </Card>
  );
};

export default LeaveBalance;