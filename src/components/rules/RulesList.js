import React from 'react';
import { Edit, Trash2, Shield, AlertTriangle, AlertCircle, Database, Server, Lock } from 'lucide-react';

const RulesList = ({ rules, onSelectRule, onEditRule, onDeleteRule }) => {
  const getRuleTypeIcon = (type) => {
    switch (type) {
      case 'sql_injection':
        return <Database className="h-5 w-5 text-blue-500" />;
      case 'xss':
        return <AlertTriangle className="h-5 w-5 text-purple-500" />;
      case 'ldap_injection':
        return <Lock className="h-5 w-5 text-amber-500" />;
      case 'file_inclusion':
        return <Server className="h-5 w-5 text-green-500" />;
      case 'brute_force':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Shield className="h-5 w-5 text-gray-400" />;
    }
  };
  
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Critical
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Low
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {priority}
          </span>
        );
    }
  };
  
  return (
    <div className="bg-gray-700 rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Target
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Priority
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-700 divide-y divide-gray-600">
            {rules.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                  No rules found
                </td>
              </tr>
            ) : (
              rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-gray-650 cursor-pointer" onClick={() => onSelectRule(rule)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getRuleTypeIcon(rule.type)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-white">{rule.name}</div>
                        <div className="text-xs text-gray-400">{rule.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">
                    {rule.type.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {rule.target.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(rule.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      rule.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {rule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditRule(rule);
                        }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteRule(rule.id);
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RulesList;