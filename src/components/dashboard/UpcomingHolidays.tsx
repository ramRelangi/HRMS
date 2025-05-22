import React from 'react';
import Card from '../common/Card';
import { holidays } from '../../data/mockData';
import { formatDate } from '../../utils/dateUtils';

const UpcomingHolidays: React.FC = () => {
  // Sort holidays by date (upcoming first)
  const sortedHolidays = [...holidays].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  // Only show future holidays and limit to 5
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingHolidays = sortedHolidays
    .filter(holiday => new Date(holiday.date) >= today)
    .slice(0, 5);
  
  return (
    <Card 
      title="Upcoming Holidays" 
      className="h-full"
    >
      {upcomingHolidays.length === 0 ? (
        <div className="text-center p-4 text-slate-500">
          No upcoming holidays
        </div>
      ) : (
        <div className="space-y-2">
          {upcomingHolidays.map((holiday) => (
            <div 
              key={holiday.id}
              className="p-3 rounded-lg border border-slate-200 bg-white"
            >
              <div className="flex items-start">
                <div className="bg-red-50 rounded-md p-2 mr-3 text-center">
                  <div className="text-xs font-medium text-red-800">
                    {new Date(holiday.date).toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                  <div className="text-lg font-bold text-red-700">
                    {new Date(holiday.date).getDate()}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">{holiday.name}</h4>
                  <p className="text-xs text-slate-500">{formatDate(holiday.date)}</p>
                  {holiday.description && (
                    <p className="text-sm text-slate-600 mt-1">{holiday.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default UpcomingHolidays;