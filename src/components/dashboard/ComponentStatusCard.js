import React from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Clock } from 'lucide-react';

const ComponentStatusCard = ({ component }) => {
  const getStatusIndicator = () => {
    switch (component.status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'maintenance':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    switch (component.status) {
      case 'operational':
        return 'Operational';
      case 'warning':
        return 'Warning';
      case 'critical':
        return 'Critical';
      case 'maintenance':
        return 'Maintenance';
      default:
        return 'Unknown';
    }
  };

  const getStatusTextColor = () => {
    switch (component.status) {
      case 'operational':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      case 'maintenance':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-gray-800 rounded p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">{component.name}</h4>
          <p className="text-gray-400 text-sm">{component.description}</p>
        </div>
        <div className="flex items-center">
          <span className={`mr-2 text-sm font-medium ${getStatusTextColor()}`}>
            {getStatusText()}
          </span>
          {getStatusIndicator()}
        </div>
      </div>
    </div>
  );
};

export default ComponentStatusCard;
