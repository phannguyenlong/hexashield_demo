import React, { useState } from 'react';
import { useSecurity } from '../contexts/SecurityContext';
import { Shield, AlertTriangle, CheckCircle, XCircle, Settings, Zap, Save, Database, Lock, Monitor, Server, Globe, Code } from 'lucide-react';

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
      component: 'web_application_firewall',
      tool: 'ModSecurity & GreenSQL'
    },
    {
      id: 'xss_protection',
      title: 'Cross-Site Scripting (XSS) Protection',
      description: 'Prevents XSS attacks through input validation and output encoding',
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      status: 'active',
      threat: 'high',
      component: 'web_application_firewall',
      tool: 'ModSecurity & DOMPurify'
    },
    {
      id: 'ldap_injection',
      title: 'LDAP Injection Protection',
      description: 'Secures directory services against LDAP injection attacks',
      icon: <Shield className="h-8 w-8 text-amber-500" />,
      status: 'active',
      threat: 'medium',
      component: 'authentication_system',
      tool: 'Keycloak'
    },
    {
      id: 'file_inclusion',
      title: 'File Inclusion Protection',
      description: 'Prevents local and remote file inclusion vulnerabilities',
      icon: <Shield className="h-8 w-8 text-green-500" />,
      status: 'active',
      threat: 'medium',
      component: 'web_application_firewall',
      tool: 'ModSecurity'
    },
    {
      id: 'command_injection',
      title: 'Command Injection Protection',
      description: 'Blocks attempts to execute system commands through application inputs',
      icon: <Shield className="h-8 w-8 text-red-500" />,
      status: 'active',
      threat: 'high',
      component: 'web_application_firewall',
      tool: 'ModSecurity'
    },
    {
      id: 'brute_force',
      title: 'Brute Force Protection',
      description: 'Prevents password guessing and account takeover attempts',
      icon: <Shield className="h-8 w-8 text-indigo-500" />,
      status: 'active',
      threat: 'medium',
      component: 'authentication_system',
      tool: 'Keycloak & PacketFence'
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
      case 'architecture':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-4">HexaShield Protection Component Architecture</h3>
              <div className="relative rounded-xl bg-gray-900 p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                
                <div className="grid grid-cols-2 gap-6 relative">
                  <div className="col-span-2 p-4 bg-gray-800 rounded-lg border border-gray-700 text-center">
                    <h3 className="text-lg font-medium text-white">Security Protection Component</h3>
                    <p className="text-gray-400 text-sm">Multilayered protection against injection attacks</p>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg border border-green-700">
                    <div className="flex items-center mb-2">
                      <Shield className="h-6 w-6 text-green-500 mr-2" />
                      <h4 className="text-white font-medium">Web App Firewall (ModSecurity)</h4>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Provides protection against web application attacks including SQL injection and XSS using OWASP Core Rule Set
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      <ul className="space-y-1">
                        <li>• SQL injection pattern detection</li>
                        <li>• XSS filtering</li>
                        <li>• Input validation</li>
                        <li>• Request filtering</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg border border-blue-700">
                    <div className="flex items-center mb-2">
                      <Database className="h-6 w-6 text-blue-500 mr-2" />
                      <h4 className="text-white font-medium">Database Security (GreenSQL)</h4>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Database firewall preventing SQL injection attacks by analyzing database queries
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      <ul className="space-y-1">
                        <li>• Query analysis</li>
                        <li>• Database firewall</li>
                        <li>• Learning mode</li>
                        <li>• Risk assessment</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg border border-indigo-700">
                    <div className="flex items-center mb-2">
                      <Globe className="h-6 w-6 text-indigo-500 mr-2" />
                      <h4 className="text-white font-medium">Network Access (PacketFence)</h4>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Network access control system providing authentication and device authorization
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      <ul className="space-y-1">
                        <li>• Device authentication</li>
                        <li>• Network segmentation</li>
                        <li>• Access control</li>
                        <li>• Isolation of compromised devices</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg border border-amber-700">
                    <div className="flex items-center mb-2">
                      <Server className="h-6 w-6 text-amber-500 mr-2" />
                      <h4 className="text-white font-medium">Endpoint Protection (Wazuh Agents)</h4>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Host-based security monitoring and endpoint protection capabilities
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      <ul className="space-y-1">
                        <li>• File integrity monitoring</li>
                        <li>• Security event detection</li>
                        <li>• Application control</li>
                        <li>• Anomaly detection</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex mt-2">
                    <div className="flex-1 border-t-2 border-blue-500 border-dashed mt-8 mr-4"></div>
                    <div className="p-2 bg-blue-900 text-white text-center rounded-lg">
                      <p className="text-xs">Communication with other components</p>
                    </div>
                    <div className="flex-1 border-t-2 border-blue-500 border-dashed mt-8 ml-4"></div>
                  </div>
                  
                  <div className="col-span-1 p-4 bg-gray-800 rounded-lg border border-purple-700">
                    <div className="flex items-center mb-2">
                      <Monitor className="h-6 w-6 text-purple-500 mr-2" />
                      <h4 className="text-white font-medium">Security Monitoring Component</h4>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Detection and alerting of security events and threats
                    </p>
                  </div>
                  
                  <div className="col-span-1 p-4 bg-gray-800 rounded-lg border border-red-700">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                      <h4 className="text-white font-medium">Response Component</h4>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Automated and manual response to detected security threats
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-3">Injection Protection Design Principles</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <div className="bg-green-900 bg-opacity-30 p-1 rounded mr-2 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <strong>Multi-layered Protection</strong>
                      <p className="text-sm text-gray-400">Defense in depth with multiple security controls for each attack vector</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-900 bg-opacity-30 p-1 rounded mr-2 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <strong>Context-Aware Protection</strong>
                      <p className="text-sm text-gray-400">Security controls that understand application context for higher accuracy</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-900 bg-opacity-30 p-1 rounded mr-2 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <strong>Adaptive Learning</strong>
                      <p className="text-sm text-gray-400">Security components adapt to normal behavior patterns</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-900 bg-opacity-30 p-1 rounded mr-2 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <strong>Open Standards Compliance</strong>
                      <p className="text-sm text-gray-400">Based on proven security frameworks like OWASP</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-3">Key Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-700 p-3 rounded">
                    <h4 className="text-white text-sm font-medium">ModSecurity</h4>
                    <ul className="text-xs text-gray-400 mt-2 space-y-1">
                      <li>• OWASP Core Rule Set</li>
                      <li>• HTTP traffic inspection</li>
                      <li>• Signature-based detection</li>
                      <li>• Virtual patching</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700 p-3 rounded">
                    <h4 className="text-white text-sm font-medium">GreenSQL</h4>
                    <ul className="text-xs text-gray-400 mt-2 space-y-1">
                      <li>• Database firewall</li>
                      <li>• SQL query analysis</li>
                      <li>• Risk-based policies</li>
                      <li>• Query whitelisting</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700 p-3 rounded">
                    <h4 className="text-white text-sm font-medium">PacketFence</h4>
                    <ul className="text-xs text-gray-400 mt-2 space-y-1">
                      <li>• Network segmentation</li>
                      <li>• Device registration</li>
                      <li>• Isolation of threats</li>
                      <li>• Captive portal</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700 p-3 rounded">
                    <h4 className="text-white text-sm font-medium">Wazuh Agents</h4>
                    <ul className="text-xs text-gray-400 mt-2 space-y-1">
                      <li>• File integrity monitoring</li>
                      <li>• Rootkit detection</li>
                      <li>• Security event analysis</li>
                      <li>• Active response</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
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
              activeTab === 'architecture' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('architecture')}
          >
            Architecture
          </button>
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
                activeRules: 368,
                tool: 'ModSecurity'
              }}
              icon={<Shield className="h-6 w-6 text-green-500" />}
            />
            
            <ProtectionModuleStatus 
              title="Database Firewall" 
              status="operational"
              details={{
                queriesAnalyzed: 5789,
                maliciousQueries: 23,
                effectiveness: '99.8%',
                tool: 'GreenSQL'
              }}
              icon={<Shield className="h-6 w-6 text-green-500" />}
            />
            
            <ProtectionModuleStatus 
              title="Authentication Protection" 
              status="operational"
              details={{
                loginAttempts: 452,
                blockedAttempts: 17,
                accountsProtected: 25,
                tool: 'Keycloak'
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
        {activeTab !== 'overview' && activeTab !== 'architecture' && (
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