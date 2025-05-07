import React, { useState } from 'react';
import { AlertCircle, Shield, ChevronDown, ChevronUp } from 'lucide-react';

const ActiveIncidentsList = ({ incidents }) => {
  const [expandedIncident, setExpandedIncident] = useState(null);
  
  const toggleIncident = (incidentId) => {
    setExpandedIncident(expandedIncident === incidentId ? null : incidentId);
  };
  
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };
  
  const getActionIcon = (actionType) => {
    switch (actionType) {
      case 'block_ip':
        return <Shield className="h-4 w-4 text-red-500" />;
      case 'block_request':
        return <Shield className="h-4 w-4 text-orange-500" />;
      case 'log_event':
        return <Shield className="h-4 w-4 text-blue-500" />;
      case 'notify_admin':
        return <Shield className="h-4 w-4 text-purple-500" />;
      case 'update_waf':
        return <Shield className="h-4 w-4 text-green-500" />;
      case 'lock_account':
        return <Shield className="h-4 w-4 text-yellow-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-4">
      {incidents.length === 0 ? (
        <div className="bg-gray-800 p-4 rounded-md text-center">
          <p className="text-gray-400">No active incidents</p>
        </div>
      ) : (
        incidents.map((incident) => (
          <div 
            key={incident.id} 
            className="bg-gray-800 rounded-md overflow-hidden"
          >
            <div 
              className="p-4 cursor-pointer hover:bg-gray-750"
              onClick={() => toggleIncident(incident.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <AlertCircle className={`h-5 w-5 mt-0.5 mr-2 ${
                    incident.severity === 'critical' 
                      ? 'text-red-500' 
                      : incident.severity === 'high'
                      ? 'text-orange-500'
                      : 'text-yellow-500'
                  }`} />
                  <div>
                    <h4 className="text-white font-medium">
                      {incident.type.replace('_', ' ')} Attack
                    </h4>
                    <p className="text-sm text-gray-400">
                      Detected {formatTimestamp(incident.detectedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-900 text-red-100 mr-2">
                    {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                  </span>
                  {expandedIncident === incident.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
            
            {expandedIncident === incident.id && (
              <div className="px-4 pb-4 border-t border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <h5 className="text-sm font-medium text-white mb-2">Incident Details</h5>
                    <div className="bg-gray-750 p-3 rounded-md">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-gray-400">Source</p>
                          <p className="text-sm text-white">{incident.source}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Target</p>
                          <p className="text-sm text-white">{incident.target}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Severity</p>
                          <p className="text-sm text-white capitalize">{incident.severity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Status</p>
                          <p className="text-sm text-white capitalize">{incident.status}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Response Policy</p>
                          <p className="text-sm text-white">{incident.responsePolicy}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Detected At</p>
                          <p className="text-sm text-white">{formatTimestamp(incident.detectedAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-white mb-2">Response Actions</h5>
                    <div className="bg-gray-750 p-3 rounded-md">
                      <ul className="space-y-2">
                        {incident.actionsTaken.map((action, index) => (
                          <li key={index} className="flex items-start">
                            {getActionIcon(action.type)}
                            <div className="ml-2 flex-1">
                              <p className="text-sm text-white">
                                {action.type.replace('_', ' ').charAt(0).toUpperCase() + 
                                action.type.replace('_', ' ').slice(1)}
                              </p>
                              <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-400">
                                  {formatTimestamp(action.timestamp)}
                                </p>
                                <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                                  action.status === 'completed' 
                                    ? 'bg-green-900 text-green-100' 
                                    : action.status === 'pending'
                                    ? 'bg-yellow-900 text-yellow-100'
                                    : 'bg-blue-900 text-blue-100'
                                }`}>
                                  {action.status.charAt(0).toUpperCase() + action.status.slice(1)}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ActiveIncidentsList;
