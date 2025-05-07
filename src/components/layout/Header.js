import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, Bell, Settings, User, LogOut } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="bg-gray-900 border-b border-gray-700 shadow z-10">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button
            className="text-gray-300 hover:text-white p-2 rounded-md focus:outline-none"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <h1 className="ml-4 text-xl text-white font-semibold">
            HexaShield Security Framework
          </h1>
        </div>
        
        <div className="flex items-center">
          <button className="relative p-2 text-gray-400 hover:text-white rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="ml-3 relative">
            <div className="flex items-center">
              <button className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none">
                <span className="mr-2 hidden md:block">{currentUser?.name || 'User'}</span>
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </button>
            </div>
            
            <div className="ml-3 relative">
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <a href="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                    <Settings className="h-4 w-4 mr-2 inline" />
                    Settings
                  </a>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  >
                    <LogOut className="h-4 w-4 mr-2 inline" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;