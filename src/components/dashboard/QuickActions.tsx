import React from 'react';
import { Clock as ClockIn, Clock as ClockOut, PlusCircle, Calendar, UserCog, FileText, Clock } from 'lucide-react';
import Card from '../common/Card';

type ActionItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

const QuickActions: React.FC = () => {
  const actionItems: ActionItem[] = [
    {
      id: 'checkin',
      icon: <ClockIn className="h-6 w-6" />,
      label: 'Check In',
      onClick: () => console.log('Check in clicked')
    },
    {
      id: 'checkout',
      icon: <ClockOut className="h-6 w-6" />,
      label: 'Check Out',
      onClick: () => console.log('Check out clicked')
    },
    {
      id: 'apply-leave',
      icon: <PlusCircle className="h-6 w-6" />,
      label: 'Apply Leave',
      onClick: () => console.log('Apply leave clicked')
    },
    {
      id: 'view-attendance',
      icon: <Clock className="h-6 w-6" />,
      label: 'Attendance',
      onClick: () => console.log('View attendance clicked')
    },
    {
      id: 'team-calendar',
      icon: <Calendar className="h-6 w-6" />,
      label: 'Calendar',
      onClick: () => console.log('Team calendar clicked')
    },
    {
      id: 'update-profile',
      icon: <UserCog className="h-6 w-6" />,
      label: 'Profile',
      onClick: () => console.log('Update profile clicked')
    },
    {
      id: 'view-documents',
      icon: <FileText className="h-6 w-6" />,
      label: 'Documents',
      onClick: () => console.log('View documents clicked')
    }
  ];

  return (
    <Card 
      title="Quick Actions" 
      className="h-full"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {actionItems.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-white border border-slate-200 
                      hover:bg-slate-50 hover:border-blue-300 transition-all duration-200 shadow-sm"
          >
            <div className="text-blue-600 mb-2">
              {item.icon}
            </div>
            <span className="text-sm font-medium text-slate-700">{item.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;