import React, { useState } from 'react';
import { Save, Info, CheckCircle, AlertTriangle, Settings, PlusCircle, MinusCircle } from 'lucide-react';

const InjectionProtectionConfig = ({ module, onSave }) => {
  const [config, setConfig] = useState({
    status: module.status,
    detectionLevel: 'medium',
    actionMode: 'block',
    customPatterns: [],
    enableSanitization: true,
    enableLogging: true,
    enableAlerts: true,
    whitelistUrls: '',
    newPattern: ''
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleAddPattern = () => {
    if (config.newPattern.trim()) {
      setConfig(prev => ({
        ...prev,
        customPatterns: [...prev.customPatterns, prev.newPattern.trim()],
        newPattern: ''
      }));
    }
  };
  
  const handleRemovePattern = (index) => {
    setConfig(prev => ({
      ...prev,
      customPatterns: prev.customPatterns.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would save to the backend
    onSave(config);
  };
  
  // Get default patterns based on module type
  const getDefaultPatterns = () => {
    switch (module.id) {
      case 'sql_injection':
        return ["';.*--", "UNION\\s+SELECT", "OR\\s+1=1", "DROP\\s+TABLE", "INSERT\\s+INTO"];
      case 'xss_protection':
        return ["<script.*>", "javascript:", "onerror=", "onload=", "eval\\("];
      case 'ldap_injection':
        return ["\\|\\|", "\\(\\|\\(", "\\)\\(\\|", "\\*\\)", "objectClass=*"];
      case 'file_inclusion':
        return ["\\.\\./", "file:", "/etc/passwd", "C:\\\\Windows", "php://input"];
      default:
        return [];
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-start mb-4">
        <div className="mr-4">
          {module.icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{module.title}</h3>
          <p className="text-gray-400">{module.description}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Protection Status
              </label>
              <select
                name="status"
                value={config.status}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="disabled">Disabled</option>
                <option value="learning">Learning Mode</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Detection Level
              </label>
              <select
                name="detectionLevel"
                value={config.detectionLevel}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low (Fewer False Positives)</option>
                <option value="medium">Medium (Balanced)</option>
                <option value="high">High (Aggressive Detection)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Action on Detection
              </label>
              <select
                name="actionMode"
                value={config.actionMode}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="block">Block Request</option>
                <option value="sanitize">Sanitize Input</option>
                <option value="log">Log Only</option>
                <option value="redirect">Redirect To Error Page</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Whitelist URLs/Patterns (one per line)
              </label>
              <textarea
                name="whitelistUrls"
                value={config.whitelistUrls}
                onChange={handleChange}
                rows="3"
                className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter URLs or patterns to whitelist"
              ></textarea>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="enableSanitization"
                    name="enableSanitization"
                    type="checkbox"
                    checked={config.enableSanitization}
                    onChange={handleChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="enableSanitization" className="font-medium text-gray-300">
                    Enable Input Sanitization
                  </label>
                  <p className="text-gray-400">Automatically clean potentially dangerous inputs</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="enableLogging"
                    name="enableLogging"
                    type="checkbox"
                    checked={config.enableLogging}
                    onChange={handleChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="enableLogging" className="font-medium text-gray-300">
                    Enable Detailed Logging
                  </label>
                  <p className="text-gray-400">Log detailed information about detected attacks</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="enableAlerts"
                    name="enableAlerts"
                    type="checkbox"
                    checked={config.enableAlerts}
                    onChange={handleChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="enableAlerts" className="font-medium text-gray-300">
                    Enable Real-Time Alerts
                  </label>
                  <p className="text-gray-400">Send alerts when attacks are detected</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-300">
                  Default Detection Patterns
                </label>
                <span className="text-xs text-gray-400">
                  {getDefaultPatterns().length} patterns
                </span>
              </div>
              
              <div className="bg-gray-800 border border-gray-600 rounded-md p-3 max-h-48 overflow-y-auto">
                {getDefaultPatterns().length === 0 ? (
                  <p className="text-gray-400 text-sm">No default patterns defined</p>
                ) : (
                  <ul className="space-y-1">
                    {getDefaultPatterns().map((pattern, index) => (
                      <li key={index} className="text-sm text-green-400 font-mono p-1">
                        {pattern}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-300">
                  Custom Detection Patterns
                </label>
                <span className="text-xs text-gray-400">
                  {config.customPatterns.length} patterns
                </span>
              </div>
              
              <div className="mb-2 flex">
                <input
                  type="text"
                  name="newPattern"
                  value={config.newPattern}
                  onChange={handleChange}
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-l-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add a new detection pattern"
                />
                <button
                  type="button"
                  onClick={handleAddPattern}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-md"
                >
                  <PlusCircle className="h-5 w-5" />
                </button>
              </div>
              
              <div className="bg-gray-800 border border-gray-600 rounded-md p-3 max-h-48 overflow-y-auto">
                {config.customPatterns.length === 0 ? (
                  <p className="text-gray-400 text-sm">No custom patterns defined</p>
                ) : (
                  <ul className="space-y-1">
                    {config.customPatterns.map((pattern, index) => (
                      <li key={index} className="flex justify-between items-center p-1 hover:bg-gray-700 rounded">
                        <code className="text-sm text-blue-400 font-mono">{pattern}</code>
                        <button
                          type="button"
                          onClick={() => handleRemovePattern(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <MinusCircle className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            <div className="bg-blue-900 bg-opacity-30 p-4 rounded-md">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p className="font-medium text-blue-400 mb-1">About {module.title}</p>
                  <p className="mb-2">
                    This module provides protection against {module.id.replace('_', ' ')} attacks by monitoring and filtering 
                    potentially malicious patterns.
                  </p>
                  <p>
                    Default patterns are maintained by the HexaShield security team and automatically updated. 
                    Custom patterns allow you to add organization-specific protection rules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
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
  );
};

export default InjectionProtectionConfig;