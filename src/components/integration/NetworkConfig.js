import React, { useState } from 'react';
import { CheckCircle, Save, Globe, Layers, Server } from 'lucide-react';

const NetworkConfig = () => {
  const [config, setConfig] = useState({
    networkInterface: 'eth0',
    monitoringMode: 'passive',
    idsDeploy: 'inline',
    enableTlsInspection: true,
    capturePackets: true,
    enableAutoUpdate: true,
    autoBlockThreshold: 'medium'
  });
  
  const [saved, setSaved] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setSaved(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to backend
    setTimeout(() => {
      setSaved(true);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      {saved && (
        <div className="bg-green-900 text-green-100 p-3 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Network integration settings saved successfully.
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Network Interface
                </label>
                <select
                  name="networkInterface"
                  value={config.networkInterface}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="eth0">eth0 (Primary Interface)</option>
                  <option value="eth1">eth1 (Secondary Interface)</option>
                  <option value="all">All Interfaces</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  IDS/IPS Deployment Mode
                </label>
                <select
                  name="idsDeploy"
                  value={config.idsDeploy}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="inline">Inline (IPS Mode)</option>
                  <option value="passive">Passive (IDS Mode)</option>
                  <option value="span">SPAN Port Monitoring</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Monitoring Mode
                </label>
                <select
                  name="monitoringMode"
                  value={config.monitoringMode}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="passive">Passive (Alert Only)</option>
                  <option value="active">Active (Prevention)</option>
                  <option value="learning">Learning Mode</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Auto-Block Threshold
                </label>
                <select
                  name="autoBlockThreshold"
                  value={config.autoBlockThreshold}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low (Block more, may include false positives)</option>
                  <option value="medium">Medium (Balanced approach)</option>
                  <option value="high">High (Block less, minimize false positives)</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="enableTlsInspection"
                      name="enableTlsInspection"
                      type="checkbox"
                      checked={config.enableTlsInspection}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="enableTlsInspection" className="font-medium text-gray-300">
                      Enable TLS Inspection
                    </label>
                    <p className="text-gray-400">Requires SSL certificate installation</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="capturePackets"
                      name="capturePackets"
                      type="checkbox"
                      checked={config.capturePackets}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="capturePackets" className="font-medium text-gray-300">
                      Capture Packets for Analysis
                    </label>
                    <p className="text-gray-400">Store PCAP files for security incidents</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="enableAutoUpdate"
                      name="enableAutoUpdate"
                      type="checkbox"
                      checked={config.enableAutoUpdate}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="enableAutoUpdate" className="font-medium text-gray-300">
                      Enable Automatic Rule Updates
                    </label>
                    <p className="text-gray-400">Keep security rules current automatically</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </button>
            </div>
          </form>
        </div>
        
        <div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-3">Network Integration</h3>
            <p className="text-gray-400 text-sm mb-4">
              Configure how HexaShield monitors and protects your network traffic. 
              The network integration component uses Suricata for advanced threat detection.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-300 text-sm">Network monitoring and protection</span>
              </div>
              <div className="flex items-center">
                <Server className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-300 text-sm">Intrusion detection and prevention</span>
              </div>
              <div className="flex items-center">
                <Layers className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-300 text-sm">Multi-layer traffic analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkConfig;
