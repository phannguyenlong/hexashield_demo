import React from 'react';
import { ExternalLink, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const ProtectionCard = ({ module, onClick }) => {
  const getThreatLevelBadge = (threat) => {
    switch (threat) {
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
        return null;
    }
  };
  
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
  
  return (
    <div 
      className="bg-gray-800 rounded-lg shadow overflow-hidden cursor-pointer hover:bg-gray-750"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <div className="mr-3">
              {module.icon}
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="text-lg font-medium text-white">{module.title}</h3>
                <div className="ml-2">
                  {getStatusIndicator(module.status)}
                </div>
              </div>
              <p className="text-gray-400 mt-1 text-sm">{module.description}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-400">Threat Level: </span>
            {getThreatLevelBadge(module.threat)}
          </div>
          <ExternalLink className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ProtectionCard;
