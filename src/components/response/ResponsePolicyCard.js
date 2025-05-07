import React from 'react';
import { Shield, ExternalLink, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const ResponsePolicyCard = ({ policy, onClick }) => {
  const getStatusIndicator = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'disabled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };
  
  // Format the last triggered date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Get action summary text
  const getActionSummary = (actions) => {
    const actionTypes = actions.map(a => a.type.replace('_', ' ')).join(', ');
    return actionTypes.charAt(0).toUpperCase() + actionTypes.slice(1);
  };
  
  return (
    <div 
      className="bg-gray-800 rounded-lg shadow overflow-hidden cursor-pointer hover:bg-gray-750"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <div className="mr-3">
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="text-lg font-medium text-white">{policy.title}</h3>
                <div className="ml-2">
                  {getStatusIndicator(policy.status)}
                </div>
              </div>
              <p className="text-gray-400 mt-1 text-sm">{policy.description}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-gray-400">Trigger Type</p>
            <p className="text-sm text-white">{policy.triggerType.replace('_', ' ')}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Executions</p>
            <p className="text-sm text-white">{policy.executionCount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Last Triggered</p>
            <p className="text-sm text-white">{formatDate(policy.lastTriggered)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Actions</p>
            <p className="text-sm text-white">{policy.actions.length}</p>
          </div>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <div className="text-sm text-gray-300">
            <span className="text-xs text-gray-400">Response:</span> {getActionSummary(policy.actions)}
          </div>
          <ExternalLink className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ResponsePolicyCard;