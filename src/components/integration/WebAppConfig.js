import React, { useState } from 'react';
import { CheckCircle, Save, Code, Shield } from 'lucide-react';

const WebAppConfig = () => {
  const [config, setConfig] = useState({
    deployMode: 'reverse_proxy',
    enableCrs: true,
    crsParanoia: 'medium',
    customDomains: 'example.com, app.example.com',
    enableXssProtection: true,
    enableSqlInjectionProtection: true,
    enableCsrfProtection: true,
    enableFormValidation: true,
    blockOnViolation: true
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
          Web application protection settings saved successfully.
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Web Application Firewall Deployment Mode
                </label>
                <select
                  name="deployMode"
                  value={config.deployMode}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="reverse_proxy">Reverse Proxy Mode</option>
                  <option value="embedded">Embedded Mode (Apache/Nginx Module)</option>
                  <option value="api_gateway">API Gateway Integration</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Protected Domains
                </label>
                <textarea
                  name="customDomains"
                  value={config.customDomains}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Enter domains separated by commas"
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  OWASP Core Rule Set Paranoia Level
                </label>
                <select
                  name="crsParanoia"
                  value={config.crsParanoia}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!config.enableCrs}
                >
                  <option value="low">Low (Minimal False Positives)</option>
                  <option value="medium">Medium (Balanced Protection)</option>
                  <option value="high">High (Maximum Protection)</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="enableCrs"
                      name="enableCrs"
                      type="checkbox"
                      checked={config.enableCrs}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="enableCrs" className="font-medium text-gray-300">
                      Enable OWASP Core Rule Set
                    </label>
                    <p className="text-gray-400">Comprehensive web application protection rules</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="enableXssProtection"
                      name="enableXssProtection"
                      type="checkbox"
                      checked={config.enableXssProtection}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="enableXssProtection" className="font-medium text-gray-300">
                      Enable XSS Protection
                    </label>
                    <p className="text-gray-400">Enhanced Cross-Site Scripting protection</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="enableSqlInjectionProtection"
                      name="enableSqlInjectionProtection"
                      type="checkbox"
                      checked={config.enableSqlInjectionProtection}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="enableSqlInjectionProtection" className="font-medium text-gray-300">
                      Enable SQL Injection Protection
                    </label>
                    <p className="text-gray-400">Enhanced SQL injection detection and prevention</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="enableCsrfProtection"
                      name="enableCsrfProtection"
                      type="checkbox"
                      checked={config.enableCsrfProtection}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="enableCsrfProtection" className="font-medium text-gray-300">
                      Enable CSRF Protection
                    </label>
                    <p className="text-gray-400">Cross-Site Request Forgery prevention</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="blockOnViolation"
                      name="blockOnViolation"
                      type="checkbox"
                      checked={config.blockOnViolation}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="blockOnViolation" className="font-medium text-gray-300">
                      Block Requests on Rule Violation
                    </label>
                    <p className="text-gray-400">Automatically block detected attacks</p>
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
            <h3 className="text-lg font-medium text-white mb-3">Web Application Protection</h3>
            <p className="text-gray-400 text-sm mb-4">
              Configure the ModSecurity Web Application Firewall with custom rules for 
              your specific web applications. This integration focuses on injection attack prevention.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Code className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-gray-300 text-sm">Advanced XSS protection</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-gray-300 text-sm">SQL injection prevention</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-gray-300 text-sm">API request validation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebAppConfig;