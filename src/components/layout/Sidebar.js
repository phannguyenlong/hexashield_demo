import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Shield, 
  AlertCircle, 
  Activity, 
  Settings,
  FileCode,
  Plug,
  PlayCircle
} from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={20} />
    },
    {
      title: 'Monitoring',
      path: '/monitoring',
      icon: <Activity size={20} />
    },
    {
      title: 'Protection',
      path: '/protection',
      icon: <Shield size={20} />
    },
    {
      title: 'Response',
      path: '/response',
      icon: <AlertCircle size={20} />
    },
    {
      title: 'Rule Customization',
      path: '/rules',
      icon: <FileCode size={20} />
    },
    {
      title: 'Integration',
      path: '/integration',
      icon: <Plug size={20} />
    },
    {
      title: 'Simulation',
      path: '/simulation',
      icon: <PlayCircle size={20} />
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <Settings size={20} />
    }
  ];
  
  return (
    <aside 
      className={`bg-gray-900 text-gray-300 ${
        isOpen ? 'w-64' : 'w-20'
      } transition-all duration-300 ease-in-out flex flex-col border-r border-gray-700`}
    >
      <div className="p-4 flex items-center justify-center">
        <div className="flex-shrink-0 flex items-center">
          <img 
            src="/hexashield-logo.png" 
            alt="HexaShield Logo" 
            className={`h-10 w-auto ${!isOpen && 'mx-auto'}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/40?text=H';
            }}
          />
          {isOpen && (
            <span className="ml-2 text-xl font-bold text-white">HexaShield</span>
          )}
        </div>
      </div>
      
      <nav className="mt-5 flex-1 overflow-y-auto">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center py-3 px-4 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isOpen && <span className="ml-3">{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Shield className="h-6 w-6 text-blue-500" />
          </div>
          {isOpen && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-300">HexaShield v1.0</p>
              <p className="text-xs text-gray-500">Security for SMEs</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;