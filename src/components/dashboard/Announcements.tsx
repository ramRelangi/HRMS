import React from 'react';
import Card from '../common/Card';
import { announcements } from '../../data/mockData';
import { formatDate } from '../../utils/dateUtils';
import Badge from '../common/Badge';

const Announcements: React.FC = () => {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge label="High" variant="danger" size="sm" />;
      case 'medium':
        return <Badge label="Medium" variant="warning" size="sm" />;
      case 'low':
        return <Badge label="Low" variant="info" size="sm" />;
      default:
        return null;
    }
  };

  return (
    <Card 
      title="Company Announcements" 
      className="h-full"
    >
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="text-center p-4 text-slate-500">
            No announcements at this time
          </div>
        ) : (
          announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className="p-3 rounded-lg border border-slate-200 hover:border-blue-300 
                        transition-all duration-200 bg-white"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-slate-800">{announcement.title}</h4>
                {getPriorityBadge(announcement.priority)}
              </div>
              <p className="text-sm text-slate-600 mb-2">{announcement.content}</p>
              <div className="text-xs text-slate-500">
                {formatDate(announcement.date)}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-3 text-right">
        <a href="#announcements" className="text-sm text-blue-600 hover:text-blue-800">
          View All →
        </a>
      </div>
    </Card>
  );
};

export default Announcements;