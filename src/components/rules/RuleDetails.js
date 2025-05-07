import React from 'react';
import { ArrowLeft, Edit, Trash2, Shield, AlertTriangle, AlertCircle, Database, Server, Lock } from 'lucide-react';

const RuleDetails = ({ rule, onEdit, onDelete, onBack }) => {
  const getRuleTypeIcon = (type) => {
    switch (type) {
      case 'sql_injection':
        return <Database className="h-6 w-6 text-blue-500" />;
      case 'xss':
        return <AlertTriangle className="h-6 w-6 text-purple-500" />;
      case 'ldap_injection':
        return <Lock className="h-6 w-6 text-amber-500" />;
      case 'file_inclusion':
        return <Server className="h-6 w-6 text-green-500" />;
      case 'brute_force':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Shield className="h-6 w-6 text-gray-400" />;
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <div className="bg-gray-700 rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-gray-800 border-b border-gray-600 flex justify-between items-center">
        <div className="flex items-center">
          <button
            className="mr-3 text-gray-400 hover:text-gray-300"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h3 className="text-xl font-semibold text-white">Rule Details</h3>
        </div>
        <div className="flex space-x-2">
          <button
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button
            className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-6">
          {getRuleTypeIcon(rule.type)}
          <div className="ml-3">
            <h2 className="text-2xl font-bold text-white">{rule.name}</h2>
            <p className="text-gray-400">{rule.description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Basic Information</h4>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Rule ID</p>
                  <p className="text-white">{rule.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Type</p>
                  <p className="text-white capitalize">{rule.type.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Target</p>
                  <p className="text-white capitalize">{rule.target.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Priority</p>
                  <p className="text-white capitalize">{rule.priority}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="text-white capitalize">{rule.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Action</p>
                  <p className="text-white capitalize">{rule.action.replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Created</p>
                  <p className="text-white">{formatDate(rule.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Last Updated</p>
                  <p className="text-white">{formatDate(rule.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Detection Patterns</h4>
            <div className="bg-gray-800 rounded-lg p-4">
              {!rule.patterns || rule.patterns.length === 0 ? (
                <p className="text-gray-400">No patterns defined</p>
              ) : (
                <div className="space-y-2">
                  {rule.patterns.map((pattern, index) => (
                    <div key={index} className="p-2 bg-gray-700 rounded">
                      <code className="text-sm text-green-400 font-mono">{pattern}</code>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Additional conditions based on rule type */}
            {(rule.type === 'brute_force' || rule.type === 'rate_limiting') && rule.conditions && (
              <div className="mt-4">
                <h4 className="text-lg font-medium text-white mb-4">Additional Conditions</h4>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {rule.type === 'brute_force' && (
                      <>
                        <div>
                          <p className="text-sm text-gray-400">Max Attempts</p>
                          <p className="text-white">{rule.conditions.maxAttempts}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Time Window</p>
                          <p className="text-white">{rule.conditions.timeWindow} seconds</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Lockout Duration</p>
                          <p className="text-white">{rule.conditions.lockoutDuration} seconds</p>
                        </div>
                      </>
                    )}
                    
                    {rule.type === 'rate_limiting' && (
                      <>
                        <div>
                          <p className="text-sm text-gray-400">Max Requests</p>
                          <p className="text-white">{rule.conditions.maxRequests}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Time Window</p>
                          <p className="text-white">{rule.conditions.timeWindow} seconds</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Per IP</p>
                          <p className="text-white">{rule.conditions.perIp ? 'Yes' : 'No'}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleDetails;