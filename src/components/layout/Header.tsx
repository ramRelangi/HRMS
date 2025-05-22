import React, { useState } from 'react';
import { Bell, Menu, X, User, LogOut, Calendar, FileText, CheckCircle } from 'lucide-react';
import Avatar from '../common/Avatar';
import { currentUser, notifications } from '../../data/mockData';
import { getRelativeTime } from '../../utils/dateUtils';

type HeaderProps = {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
};

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const unreadNotifications = notifications.filter(n => !n.read);
  
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };
  
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'leave':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'attendance':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'announcement':
        return <FileText className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-slate-500" />;
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-30">
      <div className="flex justify-between items-center px-4 h-16">
        {/* Left section - Logo and menu toggle */}
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="lg:hidden mr-2 p-2 rounded-md text-slate-500 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <div className="flex items-center">
            <span className="text-blue-700 font-bold text-xl">Grey</span>
            <span className="text-emerald-600 font-bold text-xl">HR</span>
          </div>
        </div>

        {/* Right section - Notifications and profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="p-1.5 rounded-full text-slate-500 hover:bg-slate-100 relative"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadNotifications.length}
                </span>
              )}
            </button>
            
            {/* Notifications dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-slate-200">
                <div className="px-4 py-2 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-800">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-3 text-center text-slate-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`px-4 py-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex">
                          <div className="mr-3 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{notification.title}</p>
                            <p className="text-sm text-slate-600">{notification.message}</p>
                            <p className="text-xs text-slate-500 mt-1">{getRelativeTime(notification.date)}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="px-4 py-2 border-t border-slate-200 text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center focus:outline-none"
              aria-label="Open profile menu"
            >
              <Avatar 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                size="sm"
              />
              <span className="ml-2 font-medium text-slate-700 hidden sm:block">
                {currentUser.name}
              </span>
            </button>
            
            {/* Profile dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-slate-200">
                <a
                  href="#profile"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center"
                >
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </a>
                <a
                  href="#logout"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;