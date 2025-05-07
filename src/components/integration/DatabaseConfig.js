import React, { useState } from 'react';
import { CheckCircle, Save, Database, Shield } from 'lucide-react';

const DatabaseConfig = () => {
  const [config, setConfig] = useState({
    dbType: 'mysql',
    deployMode: 'proxy',
    dbHost: 'localhost',
    dbPort: '3306',
    enableLearningMode: true,
    enableQueryAnalysis: true,
    blockDangerousQueries: true,
    logAllQueries: false,
    enableWhitelist: true,
    sensitiveColumns: 'password,credit_card,ssn,api_key'
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
          Database security settings saved successfully.
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Database Type
                  </label>
                  <select
                    name="dbType"
                    value={config.dbType}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="mysql">MySQL</option>
                    <option value="postgresql">PostgreSQL</option>
                    <option value="mssql">Microsoft SQL Server</option>
                    <option value="oracle">Oracle</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Deployment Mode
                  </label>
                  <select
                    name="deployMode"
                    value={config.deployMode}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="proxy">Database Proxy</option>
                    <option value="agent">Database Agent</option>
                    <option value="driver">Application Driver Integration</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Database Host
                  </label>
                  <input
                    type="text"
                    name="dbHost"
                    value={config.dbHost}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Database Port
                  </label>
                  <input
                    type="text"
                    name="dbPort"
                    value={config.dbPort}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Sensitive Data Columns (Comma separated)
                </label>
                <textarea
                  name="sensitiveColumns"
                  value={config.sensitiveColumns}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Enter column names separated by commas"
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
                <p className="mt-1 text-sm text-gray-400">
                  Enhanced protection for these columns against exfiltration
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="enableLearningMode"
                      name="enableLearningMode"
                      type="checkbox"
                      checked={config.enableLearningMode}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="enableLearningMode" className="font-medium text-gray-300">
                      Enable Learning Mode
                    </label>
                    <p className="text-gray-400">Learn normal query patterns for better protection</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="enableQueryAnalysis"
                      name="enableQueryAnalysis"
                      type="checkbox"
                      checked={config.enableQueryAnalysis}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="enableQueryAnalysis" className="font-medium text-gray-300">
                      Enable Query Analysis
                    </label>
                    <p className="text-gray-400">Analyze SQL queries for injection attempts</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="blockDangerousQueries"
                      name="blockDangerousQueries"
                      type="checkbox"
                      checked={config.blockDangerousQueries}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="blockDangerousQueries" className="font-medium text-gray-300">
                      Block Dangerous Queries
                    </label>
                    <p className="text-gray-400">Automatically block DROP, TRUNCATE, etc.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="logAllQueries"
                      name="logAllQueries"
                      type="checkbox"
                      checked={config.logAllQueries}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="logAllQueries" className="font-medium text-gray-300">
                      Log All Queries
                    </label>
                    <p className="text-gray-400">Can impact performance, useful for debugging</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="enableWhitelist"
                      name="enableWhitelist"
                      type="checkbox"
                      checked={config.enableWhitelist}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="enableWhitelist" className="font-medium text-gray-300">
                      Enable Query Whitelisting
                    </label>
                    <p className="text-gray-400">Only allow pre-approved query patterns</p>
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
            <h3 className="text-lg font-medium text-white mb-3">Database Security</h3>
            <p className="text-gray-400 text-sm mb-4">
              The database security integration uses GreenSQL to provide an additional layer of protection
              against SQL injection attacks by monitoring and filtering database queries.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Database className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-300 text-sm">SQL injection prevention</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-300 text-sm">Database firewall protection</span>
              </div>
              <div className="flex items-center">
                <Database className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-300 text-sm">Query monitoring and analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseConfig;