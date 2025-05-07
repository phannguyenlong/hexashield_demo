import React, { useState } from 'react';
import { useSecurity } from '../contexts/SecurityContext';
import { Shield, AlertTriangle, CheckCircle, XCircle, Settings, Zap, Save } from 'lucide-react';

// Components
import ProtectionCard from '../components/protection/ProtectionCard';
import InjectionProtectionConfig from '../components/protection/InjectionProtectionConfig';
import ProtectionModuleStatus from '../components/protection/ProtectionModuleStatus';

const ProtectionPage = () => {
  const { components } = useSecurity();
  const [activeTab, setActiveTab] = useState('overview');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Protection modules configuration
  const protectionModules = [
    {
      id: 'sql_injection',
      title: 'SQL Injection Protection',
      description: 'Detects and blocks SQL injection attempts at the application and database levels',
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      status: 'active',
      threat: 'high',
      component: 'web_application_firewall'
    },
    {
      id: 'xss_protection',
      title: 'Cross-Site Scripting (XSS) Protection',
      description: 'Prevents XSS attacks through input validation and output encoding',
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      status: 'active',
      threat: 'high',
      component: 'web_application_firewall'
    },
    {
      id: 'ldap_injection',
      title: 'LDAP Injection Protection',
      description: 'Secures directory services against LDAP injection attacks',
      icon: <Shield className="h-8 w-8 text-amber-500" />,
      status: 'active',
      threat: 'medium',
      component: 'authentication_system'
    },
    {
      id: 'file_inclusion',
      title: 'File Inclusion Protection',
      description: 'Prevents local and remote file inclusion vulnerabilities',
      icon: <Shield className="h-8 w-8 text-green-500" />,
      status: 'active',
      threat: 'medium',
      component: 'web_application_firewall'
    },
    {
      id: 'command_injection',
      title: 'Command Injection Protection',
      description: 'Blocks attempts to execute system commands through application inputs',
      icon: <Shield className="h-8 w-8 text-red-500" />,
      status: 'active',
      threat: 'high',
      component: 'web_application_firewall'
    },
    {
      id: 'brute_force',
      title: 'Brute Force Protection',
      description: 'Prevents password guessing and account takeover attempts',
      icon: <Shield className="h-8 w-8 text-indigo-500" />,
      status: 'active',
      threat: 'medium',
      component: 'authentication_system'
    }
  ];
  
  // Get the protection component by ID
  const getActiveComponent = (id) => {
    return components.find(c => c.id === 'comp-1') || null;
  };
  
  // Handle saving configuration
  const handleSaveConfig = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };
  
  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'sql_injection':
      case 'xss_protection':
      case 'ldap_injection':
      case 'file_inclusion':
      case 'command_injection':
      case 'brute_force':
        const module = protectionModules.find(m => m.id === activeTab);
        return <InjectionProtectionConfig module={module} onSave={handleSaveConfig} />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {protectionModules.map(module => (
              <ProtectionCard
                key={module.id}
                module={module}
                onClick={() => setActiveTab(module.id)}
              />
            ))}
          </div>
        );
    }
  };
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Protection Configuration</h2>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md text-white ${
              activeTab === 'overview' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
        </div>
      </div>
      
      {showSuccessMessage && (
        <div className="bg-green-900 text-green-100 p-3 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Protection configuration saved successfully.
        </div>
      )}
      
      {/* Protection Status Overview */}
      {activeTab === 'overview' && (
        <div className="bg-gray-700 rounded-lg p-4 shadow">
          <h3 className="text-lg font-medium text-white mb-4">Protection Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProtectionModuleStatus 
              title="Web Application Firewall" 
              status="operational"
              details={{
                attacksBlocked: 1245,
                lastUpdated: '30 minutes ago',
                activeRules: 368
              }}
              icon={<Shield className="h-6 w-6 text-green-500" />}
            />
            
            <ProtectionModuleStatus 
              title="Database Firewall" 
              status="operational"
              details={{
                queriesAnalyzed: 5789,
                maliciousQueries: 23,
                effectiveness: '99.8%'
              }}
              icon={<Shield className="h-6 w-6 text-green-500" />}
            />
            
            <ProtectionModuleStatus 
              title="Authentication Protection" 
              status="operational"
              details={{
                loginAttempts: 452,
                blockedAttempts: 17,
                accountsProtected: 25
              }}
              icon={<Shield className="h-6 w-6 text-green-500" />}
            />
          </div>
        </div>
      )}
      
      {/* Global Protection Settings */}
      {activeTab === 'overview' && (
        <div className="bg-gray-700 rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Global Protection Settings</h3>
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handleSaveConfig}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Protection Mode
                </label>
                <select
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="active"
                >
                  <option value="monitor">Monitor Only (Detection)</option>
                  <option value="active">Active Protection (Prevention)</option>
                  <option value="learning">Learning Mode</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Default Response Action
                </label>
                <select
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="block"
                >
                  <option value="block">Block Attack</option>
                  <option value="sanitize">Sanitize Input</option>
                  <option value="log">Log Only</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Alert Threshold
                </label>
                <select
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="medium"
                >
                  <option value="low">Low (More Alerts)</option>
                  <option value="medium">Medium (Balanced)</option>
                  <option value="high">High (Fewer Alerts)</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="enableRealTimeProtection"
                    type="checkbox"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    defaultChecked={true}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="enableRealTimeProtection" className="font-medium text-gray-300">
                    Enable Real-Time Protection
                  </label>
                  <p className="text-gray-400">Automatically block detected attacks</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="enableAutoUpdates"
                    type="checkbox"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    defaultChecked={true}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="enableAutoUpdates" className="font-medium text-gray-300">
                    Enable Automatic Rule Updates
                  </label>
                  <p className="text-gray-400">Keep protection rules current</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="enableAdaptiveLearning"
                    type="checkbox"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    defaultChecked={true}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="enableAdaptiveLearning" className="font-medium text-gray-300">
                    Enable Adaptive Learning
                  </label>
                  <p className="text-gray-400">Improve protection based on traffic patterns</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="enableThreatIntelligence"
                    type="checkbox"
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    defaultChecked={true}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="enableThreatIntelligence" className="font-medium text-gray-300">
                    Enable Threat Intelligence
                  </label>
                  <p className="text-gray-400">Use cloud-based threat data to enhance protection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Protection Modules or Specific Module Config */}
      <div className="bg-gray-700 rounded-lg shadow overflow-hidden">
        {activeTab !== 'overview' && (
          <div className="bg-gray-800 border-b border-gray-600 px-4 py-3">
            <h3 className="text-lg font-medium text-white">
              {protectionModules.find(m => m.id === activeTab)?.title || 'Protection Modules'}
            </h3>
          </div>
        )}
        
        <div className="p-4">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProtectionPage;