import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, Bell, Settings, User, LogOut, Search, Calendar, PieChart, SunMoon } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notifications = [
    {
      id: 'notif-1',
      title: 'Critical Security Alert',
      message: 'SQL Injection attack detected and blocked',
      time: '10 minutes ago',
      read: false
    },
    {
      id: 'notif-2',
      title: 'System Update',
      message: 'New security rules have been applied',
      time: '1 hour ago',
      read: false
    },
    {
      id: 'notif-3',
      title: 'Weekly Report',
      message: 'Your security report is now available',
      time: '6 hours ago',
      read: true
    }
  ];
  
  return (
    <header className="bg-gray-800 border-b border-gray-700 shadow-xl z-10">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button
            className="text-gray-300 hover:text-white p-2 rounded-md focus:outline-none"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="ml-4 flex items-center">
            <img 
              src="/hexashield-logo.svg" 
              alt="HexaShield" 
              className="h-8 w-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/32?text=H';
              }}
            />
            <h1 className="ml-2 text-xl text-white font-semibold hidden md:block">
              HexaShield
            </h1>
          </div>
        </div>
        
        <div className="hidden md:block mx-auto max-w-md w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full bg-gray-700 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Search events, rules, components..."
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white p-2 rounded-full focus:outline-none">
            <Calendar className="h-5 w-5" />
          </button>
          
          <button className="text-gray-300 hover:text-white p-2 rounded-full focus:outline-none">
            <PieChart className="h-5 w-5" />
          </button>
          
          <div className="relative">
            <button 
              className="relative text-gray-300 hover:text-white p-2 rounded-full focus:outline-none"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            {showNotifications && (
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-2 divide-y divide-gray-700">
                  <div className="px-4 py-2 flex justify-between items-center">
                    <h3 className="text-sm font-medium text-white">Notifications</h3>
                    <span className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer">Mark all as read</span>
                  </div>
                  
                  {notifications.map(notification => (
                    <div key={notification.id} className={`px-4 py-3 hover:bg-gray-750 cursor-pointer ${!notification.read ? 'bg-gray-750' : ''}`}>
                      <div className="flex justify-between">
                        <p className={`text-sm font-medium ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))}
                  
                  <div className="px-4 py-2 text-center">
                    <button className="text-sm text-blue-400 hover:text-blue-300">
                      View all notifications
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <button className="text-gray-300 hover:text-white p-2 rounded-full focus:outline-none">
            <SunMoon className="h-5 w-5" />
          </button>
          
          <div className="relative ml-2">
            <button
              className="flex items-center text-sm rounded-full text-white focus:outline-none"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </button>
            
            {showProfileMenu && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">{currentUser?.name || 'User'}</p>
                    <p className="text-xs text-gray-400">{currentUser?.email || 'user@example.com'}</p>
                  </div>
                  
                  <a href="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                    <Settings className="h-4 w-4 mr-2 inline" />
                    Settings
                  </a>
                  
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <LogOut className="h-4 w-4 mr-2 inline" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;