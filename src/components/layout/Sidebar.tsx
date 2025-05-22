import React from 'react';
import { 
  Home, 
  Clock, 
  Calendar, 
  Users, 
  User, 
  BarChart, 
  Settings,
  FileText,
  Megaphone
} from 'lucide-react';
import { currentUser } from '../../data/mockData';

type SidebarProps = {
  isOpen: boolean;
  activeItem: string;
  onNavigate: (item: string) => void;
};

type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeItem, onNavigate }) => {
  const menuItems: MenuItem[] = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: <Home className="h-5 w-5" />,
      href: '#dashboard'
    },
    { 
      id: 'attendance', 
      label: 'Attendance', 
      icon: <Clock className="h-5 w-5" />,
      href: '#attendance'
    },
    { 
      id: 'leave', 
      label: 'Leave', 
      icon: <Calendar className="h-5 w-5" />,
      href: '#leave'
    },
    { 
      id: 'team', 
      label: 'Team', 
      icon: <Users className="h-5 w-5" />,
      href: '#team'
    },
    { 
      id: 'announcements', 
      label: 'Announcements', 
      icon: <Megaphone className="h-5 w-5" />,
      href: '#announcements'
    },
    { 
      id: 'documents', 
      label: 'Documents', 
      icon: <FileText className="h-5 w-5" />,
      href: '#documents'
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: <BarChart className="h-5 w-5" />,
      href: '#reports'
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: <User className="h-5 w-5" />,
      href: '#profile'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: <Settings className="h-5 w-5" />,
      href: '#settings'
    }
  ];
  
  return (
    <aside 
      className={`
        fixed top-16 bottom-0 lg:left-0 bg-slate-800 text-white transition-all duration-300 ease-in-out z-20
        ${isOpen ? 'left-0' : '-left-64'}
        w-64
      `}
    >
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center">
          <div className="rounded-full bg-blue-600 h-10 w-10 flex items-center justify-center font-bold text-lg">
            {currentUser.name.charAt(0)}
          </div>
          <div className="ml-3">
            <div className="font-medium">{currentUser.name}</div>
            <div className="text-xs text-slate-400">{currentUser.position}</div>
          </div>
        </div>
      </div>
      
      <nav className="mt-2">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={`
                  flex items-center px-4 py-3 text-sm
                  ${activeItem === item.id 
                    ? 'bg-blue-700 text-white' 
                    : 'text-slate-300 hover:bg-slate-700'
                  }
                  transition-colors duration-200
                `}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
        <div className="text-xs text-slate-400 text-center">
          GreyHR v2.0 © 2023
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;