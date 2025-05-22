import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { Clock } from 'lucide-react';
import { getCurrentDate, getTimeFromDate } from '../../utils/dateUtils';
import { attendanceHistory } from '../../data/mockData';

const CheckInWidget: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState('');
  
  // Check if already checked in today
  useEffect(() => {
    const today = getCurrentDate();
    const todayAttendance = attendanceHistory.find(a => a.date === today);
    
    if (todayAttendance) {
      setIsCheckedIn(true);
      setCheckInTime(todayAttendance.checkIn);
    }
    
    // Update clock
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleCheckIn = () => {
    const now = new Date();
    const timeString = getTimeFromDate(now);
    setIsCheckedIn(true);
    setCheckInTime(timeString);
    // In a real app, we would send this to the server
  };
  
  const handleCheckOut = () => {
    // In a real app, we would send this to the server
    alert('Checked out successfully!');
  };
  
  return (
    <Card className="h-full">
      <div className="flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-slate-800 mb-1">
          {currentTime.toLocaleTimeString()}
        </div>
        <div className="text-slate-500 mb-4">
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        
        {isCheckedIn ? (
          <div>
            <div className="mb-4 text-center">
              <div className="text-sm text-slate-600">Checked in at</div>
              <div className="text-lg font-semibold text-emerald-600">
                {checkInTime}
              </div>
            </div>
            <Button 
              variant="success" 
              icon={Clock} 
              onClick={handleCheckOut}
            >
              Check Out
            </Button>
          </div>
        ) : (
          <Button 
            variant="primary" 
            icon={Clock} 
            onClick={handleCheckIn}
          >
            Check In
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CheckInWidget;