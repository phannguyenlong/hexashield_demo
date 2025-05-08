import React, { useState, useEffect } from 'react';
import { useSecurity } from '../contexts/SecurityContext';
import { CheckCircle, XCircle, Clock, Shield, AlertCircle, Activity, Server, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AttackDetailsPage = () => {
  const { activeAttack, attackDetectionStep, attackDetectionComplete } = useSecurity();
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!activeAttack) return;
    
    // Calculate progress percentage based on current step
    const totalSteps = activeAttack.detectionSteps?.length || 8;
    const currentStep = attackDetectionStep;
    const percentage = Math.min(Math.round((currentStep / totalSteps) * 100), 100);
    setProgress(percentage);
    
  }, [activeAttack, attackDetectionStep, attackDetectionComplete]);
  
  // Redirect to report page after detection is complete
  useEffect(() => {
    if (attackDetectionComplete && activeAttack) {
      const type = activeAttack.type || 'sql_injection';
      // Delay for a short moment to show the success message
      setTimeout(() => {
        navigate(`/response/attack-report?attack=${type}`);
      }, 1500);
    }
  }, [attackDetectionComplete, activeAttack, navigate]);
  
  if (!activeAttack) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">No Active Attack</h3>
        <p className="text-gray-400">
          There is no active attack being processed. This page displays real-time attack detection
          and response information when a security incident occurs.
        </p>
      </div>
    );
  }
  
  // Helper function to get component icon
  const getComponentIcon = (componentName) => {
    if (componentName.includes('ModSecurity')) return <Shield className="h-5 w-5 text-purple-500" />;
    if (componentName.includes('GreenSQL')) return <Database className="h-5 w-5 text-green-500" />;
    if (componentName.includes('Suricata')) return <Activity className="h-5 w-5 text-blue-500" />;
    if (componentName.includes('Wazuh')) return <Shield className="h-5 w-5 text-orange-500" />;
    if (componentName.includes('HexaShield')) return <Shield className="h-5 w-5 text-indigo-500" />;
    if (componentName.includes('Keycloak')) return <Shield className="h-5 w-5 text-yellow-500" />;
    return <Server className="h-5 w-5 text-gray-500" />;
  };
  
  // Helper function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'detecting':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'detected':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'responding':
        return <Activity className="h-5 w-5 text-blue-500" />;
      case 'blocked':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'recorded':
      case 'learning':
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Attack Detection & Response</h2>
        <div className="bg-red-900 bg-opacity-30 px-4 py-2 rounded-full border border-red-500">
          <span className="text-red-400 font-medium">
            {activeAttack.type.replace('_', ' ').toUpperCase()} ATTACK
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gray-800 rounded-lg p-4 shadow">
          <h3 className="text-lg font-medium text-white mb-4">Real-time Attack Response</h3>
          
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm text-gray-300">HexaShield Defense in Progress</span>
              </div>
              <span className="text-sm font-medium text-white">{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-4">
            {activeAttack.detectionSteps?.map((step, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  index <= attackDetectionStep
                    ? 'bg-gray-750 border border-gray-600'
                    : 'bg-gray-700 opacity-50'
                }`}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    {index <= attackDetectionStep ? getStatusIcon(step.status) : (
                      <Clock className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        {getComponentIcon(step.component)}
                        <h4 className="text-white font-medium ml-2">{step.component}</h4>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        index <= attackDetectionStep 
                          ? (step.status === 'blocked' 
                              ? 'bg-green-900 text-green-100' 
                              : step.status === 'detected'
                              ? 'bg-orange-900 text-orange-100'
                              : 'bg-blue-900 text-blue-100')
                          : 'bg-gray-900 text-gray-400'
                      }`}>
                        {index <= attackDetectionStep ? step.status : 'pending'}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${
                      index <= attackDetectionStep ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {step.action}
                    </p>
                    <p className={`text-xs mt-1 ${
                      index <= attackDetectionStep ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {step.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {attackDetectionComplete && (
              <div className="mt-4 p-4 bg-green-900 bg-opacity-20 rounded-lg border border-green-600">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <div>
                    <h4 className="text-white font-medium">Attack Successfully Mitigated</h4>
                    <p className="text-green-300 text-sm">
                      The attack has been blocked and all countermeasures have been deployed
                    </p>
                    <button
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                      onClick={() => navigate(`/response/attack-report?attack=${activeAttack.type || 'sql_injection'}`)}
                    >
                      View Attack Report
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-4 shadow">
            <h3 className="text-lg font-medium text-white mb-4">Attack Details</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Attack Type</p>
                <p className="text-white font-medium">
                  {activeAttack.type.replace('_', ' ').toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Source</p>
                <p className="text-white">{activeAttack.source}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Target</p>
                <p className="text-white">{activeAttack.target}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Detection Time</p>
                <p className="text-white">{new Date(activeAttack.timestamp).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Severity</p>
                <p className="text-red-400 font-medium">{activeAttack.severity.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className="text-white">
                  {attackDetectionComplete ? (
                    <span className="text-green-500">Blocked</span>
                  ) : (
                    <span className="text-yellow-500">Detection in Progress</span>
                  )}
                </p>
              </div>
            </div>
            
            {activeAttack.details?.payload && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-1">Attack Payload</p>
                <div className="bg-gray-900 p-2 rounded font-mono text-xs text-red-400 overflow-x-auto">
                  {activeAttack.details.payload}
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 shadow">
            <h3 className="text-lg font-medium text-white mb-4">HexaShield Protection</h3>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-white font-medium">ModSecurity WAF</p>
                  <p className="text-gray-400 text-sm">Web application layer protection</p>
                </div>
              </div>
              <div className="flex items-start">
                <Database className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-white font-medium">GreenSQL</p>
                  <p className="text-gray-400 text-sm">Database query firewall</p>
                </div>
              </div>
              <div className="flex items-start">
                <Activity className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Suricata IDS/IPS</p>
                  <p className="text-gray-400 text-sm">Network traffic analysis</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Wazuh</p>
                  <p className="text-gray-400 text-sm">Host-based security monitoring</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Defense Effectiveness</span>
                <span className="text-white font-medium">93%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '93%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttackDetailsPage;