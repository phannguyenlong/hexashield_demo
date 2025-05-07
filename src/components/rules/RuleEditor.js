import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowLeft, X, Plus, Trash2 } from 'lucide-react';

const RuleEditor = ({ rule, mode, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    type: 'sql_injection',
    target: 'web_application_firewall',
    priority: 'medium',
    status: 'active',
    patterns: [],
    action: 'block',
    conditions: {}
  });
  
  const [newPattern, setNewPattern] = useState('');
  
  // Initialize form data when rule changes
  useEffect(() => {
    if (rule && mode === 'edit') {
      setFormData({
        ...rule,
        patterns: rule.patterns || [],
        conditions: rule.conditions || {}
      });
    }
  }, [rule, mode]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddPattern = () => {
    if (newPattern.trim()) {
      setFormData(prev => ({
        ...prev,
        patterns: [...prev.patterns, newPattern.trim()]
      }));
      setNewPattern('');
    }
  };
  
  const handleRemovePattern = (index) => {
    setFormData(prev => ({
      ...prev,
      patterns: prev.patterns.filter((_, i) => i !== index)
    }));
  };
  
  const handleConditionChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      conditions: {
        ...prev.conditions,
        [key]: value
      }
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add timestamp for new rule or update
    const updatedRule = {
      ...formData,
      updatedAt: new Date().toISOString()
    };
    
    if (mode === 'create') {
      updatedRule.createdAt = new Date().toISOString();
    }
    
    onSave(updatedRule);
  };
  
  return (
    <div className="bg-gray-700 rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-gray-800 border-b border-gray-600 flex justify-between items-center">
        <div className="flex items-center">
          <button
            className="mr-3 text-gray-400 hover:text-gray-300"
            onClick={onCancel}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h3 className="text-xl font-semibold text-white">
            {mode === 'create' ? 'Create New Rule' : 'Edit Rule'}
          </h3>
        </div>
        <button
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={handleSubmit}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Save Rule
        </button>
      </div>
      
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Basic Information</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Rule Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Rule Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="sql_injection">SQL Injection</option>
                      <option value="xss">Cross-Site Scripting</option>
                      <option value="ldap_injection">LDAP Injection</option>
                      <option value="file_inclusion">File Inclusion</option>
                      <option value="brute_force">Brute Force</option>
                      <option value="command_injection">Command Injection</option>
                      <option value="rate_limiting">Rate Limiting</option>
                      <option value="database_monitoring">Database Monitoring</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Target Component
                    </label>
                    <select
                      name="target"
                      value={formData.target}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="web_application_firewall">Web Application Firewall</option>
                      <option value="database_firewall">Database Firewall</option>
                      <option value="authentication_system">Authentication System</option>
                      <option value="network_intrusion">Network Intrusion</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Action
                    </label>
                    <select
                      name="action"
                      value={formData.action}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="block">Block</option>
                      <option value="log">Log Only</option>
                      <option value="block_ip">Block IP</option>
                      <option value="throttle">Throttle</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Status
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={formData.status === 'active'}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-300">Active</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={formData.status === 'inactive'}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-300">Inactive</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pattern Configuration */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Pattern Configuration</h4>
              
              <div className="space-y-4">
                {/* Patterns */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-300">
                      Detection Patterns
                    </label>
                    <span className="text-xs text-gray-400">
                      {formData.patterns.length} patterns
                    </span>
                  </div>
                  
                  <div className="mb-2 flex">
                    <input
                      type="text"
                      value={newPattern}
                      onChange={(e) => setNewPattern(e.target.value)}
                      className="flex-1 bg-gray-800 border border-gray-600 rounded-l-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add a new pattern"
                    />
                    <button
                      type="button"
                      onClick={handleAddPattern}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-md"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="bg-gray-800 border border-gray-600 rounded-md p-3 max-h-60 overflow-y-auto">
                    {formData.patterns.length === 0 ? (
                      <p className="text-gray-400 text-sm">No patterns defined</p>
                    ) : (
                      <ul className="space-y-2">
                        {formData.patterns.map((pattern, index) => (
                          <li key={index} className="flex justify-between items-center p-1 hover:bg-gray-700 rounded">
                            <code className="text-sm text-green-400 font-mono">{pattern}</code>
                            <button
                              type="button"
                              onClick={() => handleRemovePattern(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                
                {/* Type-specific configuration */}
                {formData.type === 'brute_force' && (
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-gray-300">Brute Force Protection Settings</h5>
                    
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Max Login Attempts
                      </label>
                      <input
                        type="number"
                        value={formData.conditions.maxAttempts || 5}
                        onChange={(e) => handleConditionChange('maxAttempts', parseInt(e.target.value))}
                        className="w-full bg-gray-800 border border-gray-600 rounded-md py-1 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Time Window (seconds)
                      </label>
                      <input
                        type="number"
                        value={formData.conditions.timeWindow || 300}
                        onChange={(e) => handleConditionChange('timeWindow', parseInt(e.target.value))}
                        className="w-full bg-gray-800 border border-gray-600 rounded-md py-1 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Lockout Duration (seconds)
                      </label>
                      <input
                        type="number"
                        value={formData.conditions.lockoutDuration || 1800}
                        onChange={(e) => handleConditionChange('lockoutDuration', parseInt(e.target.value))}
                        className="w-full bg-gray-800 border border-gray-600 rounded-md py-1 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}
                
                {formData.type === 'rate_limiting' && (
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-gray-300">Rate Limiting Settings</h5>
                    
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Max Requests
                      </label>
                      <input
                        type="number"
                        value={formData.conditions.maxRequests || 100}
                        onChange={(e) => handleConditionChange('maxRequests', parseInt(e.target.value))}
                        className="w-full bg-gray-800 border border-gray-600 rounded-md py-1 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Time Window (seconds)
                      </label>
                      <input
                        type="number"
                        value={formData.conditions.timeWindow || 60}
                        onChange={(e) => handleConditionChange('timeWindow', parseInt(e.target.value))}
                        className="w-full bg-gray-800 border border-gray-600 rounded-md py-1 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="perIp"
                        checked={formData.conditions.perIp || false}
                        onChange={(e) => handleConditionChange('perIp', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded"
                      />
                      <label htmlFor="perIp" className="ml-2 block text-sm text-gray-300">
                        Apply per IP address
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RuleEditor;