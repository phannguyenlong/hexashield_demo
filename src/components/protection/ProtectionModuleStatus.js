import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

const ProtectionModuleStatus = ({ title, status, details, icon }) => {
  const getStatusIndicator = () => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusClass = () => {
    switch (status) {
      case 'operational':
        return 'border-green-500';
      case 'degraded':
        return 'border-yellow-500';
      case 'critical':
        return 'border-red-500';
      default:
        return 'border-gray-500';
    }
  };
  
  return (
    <div className={`bg-gray-800 rounded-lg p-4 border-l-4 ${getStatusClass()}`}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          {icon}
          <h4 className="text-white font-medium ml-2">{title}</h4>
        </div>
        <div className="flex items-center">
          {getStatusIndicator()}
          <span className="text-sm text-gray-300 ml-1 capitalize">{status}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {details && Object.entries(details).map(([key, value]) => (
          key !== 'tool' ? (
            <div key={key}>
              <p className="text-xs text-gray-400">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              <p className="text-sm text-white">{value}</p>
            </div>
          ) : null
        ))}
      </div>
      
      {/* Added tool information display */}
      {details && details.tool && (
        <div className="mt-3 bg-gray-700 bg-opacity-50 p-2 rounded text-center">
          <span className="text-xs text-gray-300">Powered by: </span>
          <span className="text-sm text-white font-medium">{details.tool}</span>
        </div>
      )}
    </div>
  );
};

export default ProtectionModuleStatus;