import React from 'react';
import { AlertCircle, AlertTriangle, Shield } from 'lucide-react';

const ThreatLevelIndicator = ({ level }) => {
  const getLevelDetails = () => {
    switch (level) {
      case 'critical':
        return {
          icon: <AlertCircle className="h-6 w-6" />,
          text: 'Critical',
          color: 'bg-red-700 text-white',
          border: 'border-red-500'
        };
      case 'high':
        return {
          icon: <AlertTriangle className="h-6 w-6" />,
          text: 'High',
          color: 'bg-orange-700 text-white',
          border: 'border-orange-500'
        };
      case 'medium':
        return {
          icon: <AlertTriangle className="h-6 w-6" />,
          text: 'Medium',
          color: 'bg-yellow-700 text-white',
          border: 'border-yellow-500'
        };
      case 'low':
      default:
        return {
          icon: <Shield className="h-6 w-6" />,
          text: 'Low',
          color: 'bg-green-700 text-white',
          border: 'border-green-500'
        };
    }
  };

  const details = getLevelDetails();

  return (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${details.color} ${details.border} border`}>
      {details.icon}
      <span className="font-medium">
        {details.text} Threat Level
      </span>
    </div>
  );
};

export default ThreatLevelIndicator;