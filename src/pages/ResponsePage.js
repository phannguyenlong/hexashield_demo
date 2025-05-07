import React, { useState } from 'react';
import { useSecurity } from '../contexts/SecurityContext';
import { AlertCircle, Shield, RefreshCw, Save, Play, Pause, Zap } from 'lucide-react';

// Components
import ResponsePolicyCard from '../components/response/ResponsePolicyCard';
import ResponseWorkflowEditor from '../components/response/ResponseWorkflowEditor';
import ActiveIncidentsList from '../components/response/ActiveIncidentsList';
import ResponseMetrics from '../components/response/ResponseMetrics';

const ResponsePage = () => {
  const { securityEvents } = useSecurity();
  const [activeTab, setActiveTab] = useState('overview');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Mock response policies
  const responsePolicies = [
    {
      id: 'policy-1',
      title: 'SQL Injection Response',
      description: 'Automated response actions for SQL injection attacks',
      triggerType: 'sql_injection',
      status: 'active',
      actions: [
        { type: 'block_ip', delay: 0, duration: 1800 },
        { type: 'log_event', delay: 0, duration: 0 },
        { type: 'notify_admin', delay: 0, duration: 0 },
        { type: 'update_waf', delay: 60, duration: 0 }
      ],
      lastTriggered: '2025-05-07T08:23:12Z',
      executionCount: 12
    },
    {
      id: 'policy-2',
      title: 'XSS Attack Response',
      description: 'Automated response for cross-site scripting attacks',
      triggerType: 'xss',
      status: 'active',
      actions: [
        { type: 'block_request', delay: 0, duration: 0 },
        { type: 'log_event', delay: 0, duration: 0 },
        { type: 'notify_admin', delay: 0, duration: 0 }
      ],
      lastTriggered: '2025-05-07T08:15:43Z',
      executionCount: 8
    },
    {
      id: 'policy-3',
      title: 'LDAP Injection Response',
      description: 'Response workflow for LDAP injection attacks',
      triggerType: 'ldap_injection',
      status: 'active',
      actions: [
        { type: 'block_ip', delay: 0, duration: 3600 },
        { type: 'log_event', delay: 0, duration: 0 },
        { type: 'notify_admin', delay: 0, duration: 0 },
        { type: 'lock_account', delay: 60, duration: 0 }
      ],
      lastTriggered: '2025-05-07T07:58:21Z',
      executionCount: 5
    },
    {
      id: 'policy-4',
      title: 'Brute Force Response',
      description: 'Response to brute force login attempts',
      triggerType: 'brute_force',
      status: 'active',
      actions: [
        { type: 'block_ip', delay: 0, duration: 7200 },
        { type: 'log_event', delay: 0, duration: 0 },
        { type: 'notify_admin', delay: 0, duration: 0 },
        { type: 'lock_account', delay: 0, duration: 1800 }
      ],
      lastTriggered: '2025-05-07T07:45:16Z',
      executionCount: 15
    }
  ];
  
  // Mock active incidents
  const activeIncidents = [
    {
      id: 'incident-1',
      type: 'sql_injection',
      severity: 'high',
      status: 'active',
      source: '192.168.1.155',
      target: '/api/products',
      detectedAt: '2025-05-07T09:23:45Z',
      responsePolicy: 'SQL Injection Response',
      actionsTaken: [
        { type: 'block_ip', timestamp: '2025-05-07T09:23:46Z', status: 'completed' },
        { type: 'log_event', timestamp: '2025-05-07T09:23:46Z', status: 'completed' },
        { type: 'notify_admin', timestamp: '2025-05-07T09:23:47Z', status: 'completed' },
        { type: 'update_waf', timestamp: '2025-05-07T09:24:46Z', status: 'pending' }
      ]
    },
    {
      id: 'incident-2',
      type: 'brute_force',
      severity: 'medium',
      status: 'active',
      source: '192.168.1.130',
      target: '/admin/login',
      detectedAt: '2025-05-07T09:15:20Z',
      responsePolicy: 'Brute Force Response',
      actionsTaken: [
        { type: 'block_ip', timestamp: '2025-05-07T09:15:21Z', status: 'completed' },
        { type: 'log_event', timestamp: '2025-05-07T09:15:21Z', status: 'completed' },
        { type: 'notify_admin', timestamp: '2025-05-07T09:15:22Z', status: 'completed' },
        { type: 'lock_account', timestamp: '2025-05-07T09:15:22Z', status: 'completed' }
      ]
    }
  ];
  
  // Get policy by ID
  const getActivePolicy = (id) => {
    return responsePolicies.find(p => p.id === id) || null;
  };
  
  // Handle saving configuration
  const handleSavePolicy = (policy) => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };
  
  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'policy-1':
      case 'policy-2':
      case 'policy-3':
      case 'policy-4': {
        const policy = getActivePolicy(activeTab);
        return <ResponseWorkflowEditor policy={policy} onSave={handleSavePolicy} />;
      }
      case 'active-incidents':
        return <ActiveIncidentsList incidents={activeIncidents} />;
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <ResponseMetrics 
                title="Mean Time to Respond"
                value="35s"
                change="-12%"
                trend="down"
                description="Average time from detection to first response action"
              />
              <ResponseMetrics 
                title="Automated Response Rate"
                value="94%"
                change="+6%"
                trend="up"
                description="Percentage of incidents with automated response"
              />
              <ResponseMetrics 
                title="Incidents Mitigated"
                value="132"
                change="+8"
                trend="up"
                description="Total incidents automatically mitigated this month"
              />
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-4">Active Incidents</h3>
              {activeIncidents.length === 0 ? (
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                  <p className="text-gray-400">No active incidents</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeIncidents.map(incident => (
                    <div key={incident.id} className="bg-gray-800 p-4 rounded-lg border-l-4 border-red-500">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-medium">{incident.type.replace('_', ' ')} Attack</h4>
                          <p className="text-sm text-gray-400">Detected {new Date(incident.detectedAt).toLocaleString()}</p>
                          <p className="text-sm text-gray-400">Source: {incident.source}</p>
                        </div>
                        <div>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-900 text-red-100">
                            Active
                          </span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm text-gray-300">
                          <span className="font-medium">Response Policy:</span> {incident.responsePolicy}
                        </p>
                        <div className="mt-2">
                          <div className="text-xs text-gray-400">Response Progress:</div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${(incident.actionsTaken.filter(a => a.status === 'completed').length / incident.actionsTaken.length) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeIncidents.length > 0 && (
                <div className="mt-2 text-right">
                  <button 
                    className="text-blue-400 hover:text-blue-300 text-sm"
                    onClick={() => setActiveTab('active-incidents')}
                  >
                    View all active incidents →
                  </button>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Response Policies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {responsePolicies.map(policy => (
                  <ResponsePolicyCard
                    key={policy.id}
                    policy={policy}
                    onClick={() => setActiveTab(policy.id)}
                  />
                ))}
              </div>
            </div>
          </>
        );
    }
  };
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Response Management</h2>
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
          <button
            className={`px-4 py-2 rounded-md text-white ${
              activeTab === 'active-incidents' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('active-incidents')}
          >
            Active Incidents
          </button>
        </div>
      </div>
      
      {showSuccessMessage && (
        <div className="bg-green-900 text-green-100 p-3 rounded-md flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Response policy configuration saved successfully.
        </div>
      )}
      
      {/* Response System Status */}
      {activeTab === 'overview' && (
        <div className="bg-gray-700 rounded-lg p-4 shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Response System Status</h3>
            <div className="flex items-center">
              <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-green-400 font-medium">Operational</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-sm text-gray-400">Automatic Response</p>
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold text-white">Enabled</p>
                <Shield className="h-5 w-5 text-green-500" />
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-sm text-gray-400">Active Policies</p>
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold text-white">4</p>
                <Zap className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-sm text-gray-400">Response Mode</p>
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold text-white">Automatic</p>
                <Play className="h-5 w-5 text-green-500" />
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-sm text-gray-400">Last Updated</p>
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold text-white">15m ago</p>
                <RefreshCw className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Response Content */}
      <div className="bg-gray-700 rounded-lg shadow overflow-hidden">
        {activeTab !== 'overview' && (
          <div className="bg-gray-800 border-b border-gray-600 px-4 py-3">
            <h3 className="text-lg font-medium text-white">
              {activeTab === 'active-incidents' 
                ? 'Active Incidents' 
                : getActivePolicy(activeTab)?.title || 'Response Policies'}
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

export default ResponsePage;