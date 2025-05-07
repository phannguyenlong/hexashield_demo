import React, { useState } from 'react';
import { useSecurity } from '../contexts/SecurityContext';
import { Layers, Server, Database, Globe, Code, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

// Components
import IntegrationCard from '../components/integration/IntegrationCard';
import NetworkConfig from '../components/integration/NetworkConfig';
import DatabaseConfig from '../components/integration/DatabaseConfig';
import WebAppConfig from '../components/integration/WebAppConfig';
import AuthConfig from '../components/integration/AuthConfig';
import SystemTestResults from '../components/integration/SystemTestResults';

const IntegrationPage = () => {
  const { components } = useSecurity();
  const [activeTab, setActiveTab] = useState('overview');
  const [testResults, setTestResults] = useState(null);
  
  // Mock integration points
  const integrationPoints = [
    {
      id: 'network',
      title: 'Network Integration',
      description: 'Configure network-level security components and monitoring',
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      status: 'configured',
      component: 'network_intrusion'
    },
    {
      id: 'webapp',
      title: 'Web Application Integration',
      description: 'Web Application Firewall and XSS protection configuration',
      icon: <Code className="h-8 w-8 text-purple-500" />,
      status: 'configured',
      component: 'web_application_firewall'
    },
    {
      id: 'database',
      title: 'Database Security Integration',
      description: 'Database firewall and SQL injection protection',
      icon: <Database className="h-8 w-8 text-green-500" />,
      status: 'configured',
      component: 'database_firewall'
    },
    {
      id: 'auth',
      title: 'Authentication Integration',
      description: 'Authentication system and LDAP injection protection',
      icon: <Server className="h-8 w-8 text-amber-500" />,
      status: 'not_configured',
      component: 'authentication_system'
    }
  ];
  
  // Run system test
  const runSystemTest = () => {
    // In a real application, this would communicate with the backend
    // For the demo, we'll simulate a test with setTimeout
    setTestResults({
      status: 'running',
      progress: 0,
      results: []
    });
    
    // Simulate test progress
    const totalSteps = 10;
    let currentStep = 0;
    
    const testInterval = setInterval(() => {
      currentStep++;
      
      // Add test result
      const newResult = {
        id: `test-${currentStep}`,
        component: integrationPoints[Math.floor(Math.random() * integrationPoints.length)].id,
        description: `Testing ${integrationPoints[Math.floor(Math.random() * integrationPoints.length)].title}`,
        status: Math.random() > 0.2 ? 'success' : 'warning', // 80% success rate
        timestamp: new Date().toISOString()
      };
      
      setTestResults(prev => ({
        status: currentStep === totalSteps ? 'completed' : 'running',
        progress: (currentStep / totalSteps) * 100,
        results: [...prev.results, newResult]
      }));
      
      if (currentStep === totalSteps) {
        clearInterval(testInterval);
      }
    }, 1000);
  };
  
  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'network':
        return <NetworkConfig />;
      case 'webapp':
        return <WebAppConfig />;
      case 'database':
        return <DatabaseConfig />;
      case 'auth':
        return <AuthConfig />;
      case 'test':
        return <SystemTestResults results={testResults} onRunTest={runSystemTest} />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrationPoints.map(point => (
              <IntegrationCard
                key={point.id}
                integration={point}
                onClick={() => setActiveTab(point.id)}
              />
            ))}
          </div>
        );
    }
  };
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">System Integration</h2>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md text-white ${
              activeTab === 'test' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('test')}
          >
            System Tests
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
      
      {/* Integration Architecture Diagram */}
      {activeTab === 'overview' && (
        <div className="bg-gray-700 rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-white mb-4">HexaShield Integration Architecture</h3>
          <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
            <div className="flex flex-col items-center">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-4 bg-blue-600 rounded-lg mb-2">
                  <Layers className="h-10 w-10 text-white" />
                </div>
                <h4 className="text-white font-medium">HexaShield Core Framework</h4>
                <p className="text-gray-400 text-sm">Central Management and Orchestration</p>
              </div>
              
              <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {integrationPoints.map((point) => (
                  <div 
                    key={point.id} 
                    className={`text-center p-4 rounded-lg border ${
                      point.status === 'configured' 
                        ? 'border-green-500 bg-gray-700' 
                        : 'border-gray-600 bg-gray-700 opacity-70'
                    }`}
                  >
                    <div className="inline-flex items-center justify-center p-3 bg-gray-800 rounded-lg mb-2">
                      {point.icon}
                    </div>
                    <h4 className="text-white font-medium">{point.title}</h4>
                    <p className="text-gray-400 text-xs">{point.status === 'configured' ? 'Configured' : 'Not Configured'}</p>
                  </div>
                ))}
              </div>
              
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg border border-gray-600 bg-gray-700">
                  <h4 className="text-white font-medium">SME Infrastructure</h4>
                  <p className="text-gray-400 text-sm">Your existing IT environment</p>
                  <div className="mt-2 flex justify-center space-x-2">
                    <Server className="h-6 w-6 text-gray-400" />
                    <Database className="h-6 w-6 text-gray-400" />
                    <Globe className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                
                <div className="text-center p-4 rounded-lg border border-blue-500 bg-gray-700">
                  <h4 className="text-white font-medium">Custom Connectors</h4>
                  <p className="text-gray-400 text-sm">Tailored integration points</p>
                  <div className="mt-2 flex justify-center">
                    <Code className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                
                <div className="text-center p-4 rounded-lg border border-green-500 bg-gray-700">
                  <h4 className="text-white font-medium">Security Monitoring</h4>
                  <p className="text-gray-400 text-sm">Unified visibility and alerts</p>
                  <div className="mt-2 flex justify-center">
                    <Layers className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Integration Configuration Content */}
      <div className="bg-gray-700 rounded-lg shadow overflow-hidden">
        {activeTab !== 'overview' && (
          <div className="bg-gray-800 border-b border-gray-600 px-4 py-3">
            {activeTab !== 'test' ? (
              <h3 className="text-lg font-medium text-white">
                {integrationPoints.find(p => p.id === activeTab)?.title || 'System Overview'}
              </h3>
            ) : (
              <h3 className="text-lg font-medium text-white">
                System Integration Tests
              </h3>
            )}
          </div>
        )}
        
        <div className="p-4">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default IntegrationPage;