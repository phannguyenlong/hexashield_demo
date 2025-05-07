import React, { useState, useEffect } from 'react';
import { useSecurity } from '../contexts/SecurityContext';
import { 
  Layers, Server, Database, Globe, Code, CheckCircle, 
  XCircle, AlertTriangle, Info, FileText, Cpu, Users, 
  Shield, Lock, Search, Activity, BarChart
} from 'lucide-react';

// Components
import IntegrationCard from '../components/integration/IntegrationCard';
import NetworkConfig from '../components/integration/NetworkConfig';
import DatabaseConfig from '../components/integration/DatabaseConfig';
import WebAppConfig from '../components/integration/WebAppConfig';
import AuthConfig from '../components/integration/AuthConfig';
import SystemTestResults from '../components/integration/SystemTestResults';
import NetworkTopologyGraph from '../components/integration/NetworkTopologyGraph';

const IntegrationPage = () => {
  const { components } = useSecurity();
  const [activeTab, setActiveTab] = useState('topology'); // Changed from 'overview' to 'topology'
  const [testResults, setTestResults] = useState(null);
  const [savedTopology, setSavedTopology] = useState(null);
  const [showTopologySuccess, setShowTopologySuccess] = useState(false);
  
  // Load saved topology if it exists (would come from backend in a real application)
  useEffect(() => {
    // In a real app, this would fetch from your backend
    const storedTopology = localStorage.getItem('hexashield_topology');
    if (storedTopology) {
      try {
        setSavedTopology(JSON.parse(storedTopology));
      } catch (e) {
        console.error("Failed to load saved topology:", e);
      }
    }
  }, []);

  // HexaShield architecture components
  const architectureComponents = [
    {
      title: "Security Monitoring Component",
      color: "bg-blue-700",
      tools: [
        { name: "Suricata", description: "Network-based intrusion detection/prevention system", icon: <Search className="h-5 w-5 text-blue-400" /> },
        { name: "OSSEC/Wazuh", description: "Host-based monitoring agents for security events", icon: <Shield className="h-5 w-5 text-blue-400" /> },
        { name: "Graylog", description: "Centralized log aggregation and analysis", icon: <FileText className="h-5 w-5 text-blue-400" /> },
        { name: "OWASP ZAP", description: "Application vulnerability scanning", icon: <Code className="h-5 w-5 text-blue-400" /> }
      ]
    },
    {
      title: "Protection Component",
      color: "bg-green-700",
      tools: [
        { name: "ModSecurity", description: "Web Application Firewall with OWASP rule sets", icon: <Shield className="h-5 w-5 text-green-400" /> },
        { name: "GreenSQL", description: "Database security monitoring and query analysis", icon: <Database className="h-5 w-5 text-green-400" /> },
        { name: "PacketFence", description: "Network access control and device authentication", icon: <Globe className="h-5 w-5 text-green-400" /> },
        { name: "Wazuh Agents", description: "Endpoint protection with application control", icon: <Cpu className="h-5 w-5 text-green-400" /> }
      ]
    },
    {
      title: "Response Component",
      color: "bg-amber-700",
      tools: [
        { name: "WAF Response", description: "Web Application Firewall response actions", icon: <Activity className="h-5 w-5 text-amber-400" /> },
        { name: "Database Security", description: "Database security countermeasures", icon: <Database className="h-5 w-5 text-amber-400" /> },
        { name: "Network Access Control", description: "Network access control enforcement", icon: <Server className="h-5 w-5 text-amber-400" /> },
        { name: "Endpoint Protection", description: "Endpoint protection response mechanisms", icon: <Shield className="h-5 w-5 text-amber-400" /> }
      ]
    },
    {
      title: "Central Management",
      color: "bg-purple-700",
      tools: [
        { name: "Unified Dashboard", description: "Single pane of glass for security monitoring", icon: <BarChart className="h-5 w-5 text-purple-400" /> },
        { name: "Orchestration", description: "Security workflow coordination", icon: <Activity className="h-5 w-5 text-purple-400" /> },
        { name: "Configuration Management", description: "Centralized management of security components", icon: <Layers className="h-5 w-5 text-purple-400" /> },
        { name: "User Authentication", description: "Secure user access and authorization", icon: <Lock className="h-5 w-5 text-purple-400" /> }
      ]
    }
  ];

  // Mock integration points
  const integrationPoints = [
    {
      id: 'network',
      title: 'Network Integration',
      description: 'Configure network-level security components and monitoring',
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      status: 'configured',
      component: 'network_intrusion',
      tools: ['Suricata', 'PacketFence']
    },
    {
      id: 'webapp',
      title: 'Web Application Integration',
      description: 'Web Application Firewall and XSS protection configuration',
      icon: <Code className="h-8 w-8 text-purple-500" />,
      status: 'configured',
      component: 'web_application_firewall',
      tools: ['ModSecurity', 'OWASP ZAP']
    },
    {
      id: 'database',
      title: 'Database Security Integration',
      description: 'Database firewall and SQL injection protection',
      icon: <Database className="h-8 w-8 text-green-500" />,
      status: 'configured',
      component: 'database_firewall',
      tools: ['GreenSQL']
    },
    {
      id: 'auth',
      title: 'Authentication Integration',
      description: 'Authentication system and LDAP injection protection',
      icon: <Server className="h-8 w-8 text-amber-500" />,
      status: 'not_configured',
      component: 'authentication_system',
      tools: ['Keycloak']
    },
    {
      id: 'endpoint',
      title: 'Endpoint Protection',
      description: 'Host-based monitoring and endpoint security integration',
      icon: <Cpu className="h-8 w-8 text-red-500" />,
      status: 'configured',
      component: 'endpoint_protection',
      tools: ['Wazuh Agents']
    },
    {
      id: 'logs',
      title: 'Log Management',
      description: 'Centralized logging and event correlation',
      icon: <FileText className="h-8 w-8 text-gray-500" />,
      status: 'configured',
      component: 'log_management',
      tools: ['Graylog']
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

  // Save network topology
  const handleSaveTopology = (topology) => {
    // In a real app, this would save to your backend
    localStorage.setItem('hexashield_topology', JSON.stringify(topology));
    setSavedTopology(topology);
    setShowTopologySuccess(true);
    setTimeout(() => {
      setShowTopologySuccess(false);
    }, 3000);
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
      case 'topology':
        return <NetworkTopologyGraph 
                 initialNetwork={savedTopology} 
                 onSave={handleSaveTopology} 
               />;
      case 'architecture':
        return (
          <div className="space-y-6">
            <p className="text-gray-300">
              The HexaShield framework is built on a modular architecture with four main components that work together to provide comprehensive protection. Each component integrates specific open-source security tools.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {architectureComponents.map((component, idx) => (
                <div key={idx} className={`${component.color} rounded-lg p-4 shadow`}>
                  <h3 className="text-lg font-bold text-white mb-3">{component.title}</h3>
                  <div className="space-y-3">
                    {component.tools.map((tool, toolIdx) => (
                      <div key={toolIdx} className="bg-black bg-opacity-20 p-3 rounded-lg flex items-start">
                        <div className="mr-3 mt-1">{tool.icon}</div>
                        <div>
                          <h4 className="text-white font-medium">{tool.name}</h4>
                          <p className="text-gray-200 text-sm">{tool.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4 shadow">
              <h3 className="text-lg font-bold text-white mb-3">Injection Attack Protection</h3>
              <p className="text-gray-300 mb-3">
                HexaShield provides specialized protection against different types of injection attacks through a multi-layered approach:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <h4 className="text-white font-medium flex items-center">
                    <Database className="h-4 w-4 mr-2 text-blue-400" />
                    SQL Injection Protection
                  </h4>
                  <ul className="text-gray-300 text-sm mt-2 space-y-1">
                    <li>• ModSecurity WAF rules</li>
                    <li>• GreenSQL query analysis</li>
                    <li>• Parameterized query enforcement</li>
                    <li>• Input validation and sanitization</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-3 rounded-lg">
                  <h4 className="text-white font-medium flex items-center">
                    <Code className="h-4 w-4 mr-2 text-purple-400" />
                    XSS Protection
                  </h4>
                  <ul className="text-gray-300 text-sm mt-2 space-y-1">
                    <li>• Content Security Policy</li>
                    <li>• Output encoding</li>
                    <li>• DOMPurify JavaScript filtering</li>
                    <li>• Context-aware validation</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-3 rounded-lg">
                  <h4 className="text-white font-medium flex items-center">
                    <Users className="h-4 w-4 mr-2 text-amber-400" />
                    LDAP Injection Protection
                  </h4>
                  <ul className="text-gray-300 text-sm mt-2 space-y-1">
                    <li>• Authentication system hardening</li>
                    <li>• Input filtering and sanitization</li>
                    <li>• Keycloak security features</li>
                    <li>• Pattern-based detection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrationPoints.map(point => (
                <IntegrationCard
                  key={point.id}
                  integration={point}
                  onClick={() => setActiveTab(point.id)}
                />
              ))}
            </div>
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
              activeTab === 'topology' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('topology')}
          >
            Network Topology
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
      
      {showTopologySuccess && (
        <div className="bg-green-900 text-green-100 p-3 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Network topology saved successfully.
        </div>
      )}
      
      {/* Integration Architecture Diagram - shown only in overview mode */}
      {activeTab === 'overview' && (
        <div className="bg-gray-700 rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">HexaShield Integration Architecture</h3>
            <button
              onClick={() => setActiveTab('topology')} 
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
            >
              Go to Network Topology Editor →
            </button>
          </div>
          
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
                    onClick={() => setActiveTab(point.id)}
                    style={{cursor: 'pointer'}}
                  >
                    <div className="inline-flex items-center justify-center p-3 bg-gray-800 rounded-lg mb-2">
                      {point.icon}
                    </div>
                    <h4 className="text-white font-medium">{point.title}</h4>
                    <p className="text-gray-400 text-xs">{point.status === 'configured' ? 'Configured' : 'Not Configured'}</p>
                    <div className="mt-2 text-gray-400 text-xs">
                      <p>Tools: {point.tools.join(', ')}</p>
                    </div>
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
      
      {/* Benefits of plug-and-play architecture - shown only in overview mode */}
      {activeTab === 'overview' && (
        <div className="bg-gray-700 rounded-lg p-4 shadow">
          <h3 className="text-lg font-medium text-white mb-4">Benefits of Plug-and-Play Architecture</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-blue-500 bg-opacity-20 rounded-full mr-3">
                  <Server className="h-6 w-6 text-blue-400" />
                </div>
                <h4 className="text-white font-medium">Easy Integration</h4>
              </div>
              <p className="text-gray-400 text-sm">
                HexaShield components can be deployed alongside existing infrastructure with 
                minimal configuration. The framework adapts to your environment rather than 
                requiring you to adapt to it.
              </p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-green-500 bg-opacity-20 rounded-full mr-3">
                  <Database className="h-6 w-6 text-green-400" />
                </div>
                <h4 className="text-white font-medium">Full Control</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Since HexaShield is deployed within your infrastructure, you maintain complete 
                control over your security systems. No need for third-party services or sending 
                data outside your network.
              </p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-purple-500 bg-opacity-20 rounded-full mr-3">
                  <Code className="h-6 w-6 text-purple-400" />
                </div>
                <h4 className="text-white font-medium">Open Source Foundation</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Built on proven open-source security tools, HexaShield leverages community-tested 
                solutions while providing the integration layer that makes these tools accessible 
                to organizations without dedicated security teams.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Integration Configuration Content */}
      <div className="bg-gray-700 rounded-lg shadow overflow-hidden">
        {activeTab !== 'overview' && activeTab !== 'topology' && activeTab !== 'architecture' && (
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

      {/* Implementation guide */}
      {activeTab === 'topology' && (
        <div className="bg-gray-700 rounded-lg p-4 shadow">
          <div className="flex items-center mb-3">
            <Info className="h-5 w-5 text-blue-400 mr-2" />
            <h3 className="text-lg font-medium text-white">Implementation Guide</h3>
          </div>
          
          <p className="text-gray-300 mb-3">
            The network topology editor helps you plan how HexaShield components will integrate with your existing infrastructure. 
            Our framework is designed to be easily customized to fit your specific needs without requiring deep security expertise.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-3 rounded">
              <h4 className="text-white font-medium mb-2">Deployment Options</h4>
              <ul className="text-gray-400 text-sm space-y-1 list-disc pl-5">
                <li>On-premises deployment on your hardware</li>
                <li>Virtual machine deployment</li>
                <li>Containerized deployment with Docker</li>
                <li>Private cloud deployment</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-3 rounded">
              <h4 className="text-white font-medium mb-2">Implementation Process</h4>
              <ol className="text-gray-400 text-sm space-y-1 list-decimal pl-5">
                <li>Network topology planning (current step)</li>
                <li>Component installation and configuration</li>
                <li>Integration with existing systems</li>
                <li>Testing and validation</li>
                <li>Deployment and ongoing maintenance</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationPage;