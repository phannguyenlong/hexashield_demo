import React, { useState } from 'react';
import { Save, PlusCircle, Trash2, ArrowDown, ArrowUp } from 'lucide-react';

const ResponseWorkflowEditor = ({ policy, onSave }) => {
  const [workflow, setWorkflow] = useState({
    ...policy,
    actions: [...policy.actions]
  });
  
  // Available action types
  const actionTypes = [
    { value: 'block_ip', label: 'Block IP Address' },
    { value: 'block_request', label: 'Block Request' },
    { value: 'log_event', label: 'Log Event' },
    { value: 'notify_admin', label: 'Notify Administrator' },
    { value: 'update_waf', label: 'Update WAF Rules' },
    { value: 'lock_account', label: 'Lock User Account' },
    { value: 'captcha_challenge', label: 'Challenge with CAPTCHA' },
    { value: 'increase_logging', label: 'Increase Logging Level' }
  ];
  
  // Handle workflow changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWorkflow(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle action changes
  const handleActionChange = (index, field, value) => {
    const newActions = [...workflow.actions];
    newActions[index] = {
      ...newActions[index],
      [field]: field === 'delay' || field === 'duration' ? parseInt(value, 10) : value
    };
    setWorkflow(prev => ({
      ...prev,
      actions: newActions
    }));
  };
  
  // Add a new action
  const handleAddAction = () => {
    setWorkflow(prev => ({
      ...prev,
      actions: [
        ...prev.actions,
        { type: 'log_event', delay: 0, duration: 0 }
      ]
    }));
  };
  
  // Remove an action
  const handleRemoveAction = (index) => {
    setWorkflow(prev => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index)
    }));
  };
  
  // Move action up
  const handleMoveUp = (index) => {
    if (index === 0) return;
    
    const newActions = [...workflow.actions];
    const temp = newActions[index];
    newActions[index] = newActions[index - 1];
    newActions[index - 1] = temp;
    
    setWorkflow(prev => ({
      ...prev,
      actions: newActions
    }));
  };
  
  // Move action down
  const handleMoveDown = (index) => {
    if (index === workflow.actions.length - 1) return;
    
    const newActions = [...workflow.actions];
    const temp = newActions[index];
    newActions[index] = newActions[index + 1];
    newActions[index + 1] = temp;
    
    setWorkflow(prev => ({
      ...prev,
      actions: newActions
    }));
  };
  
  // Save the workflow
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(workflow);
  };
  
  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Policy Name
              </label>
              <input
                type="text"
                name="title"
                value={workflow.title}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={workflow.description}
                onChange={handleChange}
                rows="2"
                className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Trigger Type
              </label>
              <select
                name="triggerType"
                value={workflow.triggerType}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="sql_injection">SQL Injection</option>
                <option value="xss">Cross-Site Scripting (XSS)</option>
                <option value="ldap_injection">LDAP Injection</option>
                <option value="brute_force">Brute Force</option>
                <option value="file_inclusion">File Inclusion</option>
                <option value="command_injection">Command Injection</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Status
              </label>
              <select
                name="status"
                value={workflow.status}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-300">
                  Response Actions
                </label>
                <button
                  type="button"
                  onClick={handleAddAction}
                  className="flex items-center text-blue-400 hover:text-blue-300 text-sm"
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Action
                </button>
              </div>
              
              {workflow.actions.length === 0 ? (
                <div className="bg-gray-800 border border-gray-600 rounded-md p-4 text-center mt-2">
                  <p className="text-gray-400">No actions defined</p>
                </div>
              ) : (
                <div className="space-y-3 mt-2">
                  {workflow.actions.map((action, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-800 border border-gray-600 rounded-md p-3"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-white">
                          Action {index + 1}
                        </span>
                        <div className="flex space-x-1">
                          <button
                            type="button"
                            onClick={() => handleMoveUp(index)}
                            disabled={index === 0}
                            className={`text-gray-400 hover:text-gray-300 ${index === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveDown(index)}
                            disabled={index === workflow.actions.length - 1}
                            className={`text-gray-400 hover:text-gray-300 ${index === workflow.actions.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveAction(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">
                            Action Type
                          </label>
                          <select
                            value={action.type}
                            onChange={(e) => handleActionChange(index, 'type', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md py-1.5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {actionTypes.map(type => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">
                              Delay (seconds)
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={action.delay}
                              onChange={(e) => handleActionChange(index, 'delay', e.target.value)}
                              className="w-full bg-gray-700 border border-gray-600 rounded-md py-1.5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          {(action.type === 'block_ip' || action.type === 'lock_account') && (
                            <div>
                              <label className="block text-xs text-gray-400 mb-1">
                                Duration (seconds)
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={action.duration}
                                onChange={(e) => handleActionChange(index, 'duration', e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded-md py-1.5 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Response Policy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResponseWorkflowEditor;
