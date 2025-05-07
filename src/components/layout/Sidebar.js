import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Shield, 
  AlertCircle, 
  Activity, 
  Settings,
  FileCode,
  Plug,
  PlayCircle,
  Server,
  ChevronRight,
  Layers
} from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  const mainMenuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={20} />
    },
    {
      title: 'Monitoring',
      path: '/monitoring',
      icon: <Activity size={20} />
    }
  ];
  
  const protectionItems = [
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
    }
  ];
  
  const systemItems = [
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
  
  const MenuItem = ({ item, isOpen }) => (
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
  );
  
  const MenuSection = ({ title, items, section, isOpen }) => (
    <div className="mb-4">
      {isOpen && (
        <button 
          className="flex items-center justify-between w-full px-4 py-2 text-gray-400 hover:text-gray-300"
          onClick={() => toggleSection(section)}
        >
          <span className="text-xs font-semibold uppercase tracking-wider">{title}</span>
          <ChevronRight 
            className={`h-4 w-4 transform transition-transform ${expandedSection === section ? 'rotate-90' : ''}`} 
          />
        </button>
      )}
      
      <div className={`space-y-1 ${!isOpen || expandedSection === section ? 'block' : 'hidden'}`}>
        {items.map((item) => (
          <MenuItem key={item.path} item={item} isOpen={isOpen} />
        ))}
      </div>
    </div>
  );
  
  return (
    <aside 
      className={`bg-gray-900 text-gray-300 ${
        isOpen ? 'w-64' : 'w-20'
      } transition-all duration-300 ease-in-out flex flex-col border-r border-gray-700`}
    >
      <div className="p-4 flex items-center justify-center border-b border-gray-700">
        <div className="flex-shrink-0 flex items-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
            <Layers className="h-6 w-6 text-white" />
          </div>
          {isOpen && (
            <span className="ml-3 text-xl font-bold text-white">HexaShield</span>
          )}
        </div>
      </div>
      
      <nav className="mt-5 flex-1 overflow-y-auto px-3">
        <div className="space-y-1 mb-6">
          {mainMenuItems.map((item) => (
            <MenuItem key={item.path} item={item} isOpen={isOpen} />
          ))}
        </div>
        
        {isOpen && <div className="border-t border-gray-700 my-2"></div>}
        
        <MenuSection 
          title="Protection" 
          items={protectionItems} 
          section="protection" 
          isOpen={isOpen} 
        />
        
        {isOpen && <div className="border-t border-gray-700 my-2"></div>}
        
        <MenuSection 
          title="System" 
          items={systemItems} 
          section="system" 
          isOpen={isOpen} 
        />
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="bg-blue-900 bg-opacity-50 p-2 rounded-lg">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
          </div>
          {isOpen && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-300">HexaShield v1.0</p>
              <p className="text-xs text-gray-500">SME Security Framework</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;