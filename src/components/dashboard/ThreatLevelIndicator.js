import React from 'react';
import { AlertCircle, AlertTriangle, Shield } from 'lucide-react';

const ThreatLevelIndicator = ({ level }) => {
  const getLevelDetails = () => {
    switch (level) {
      case 'critical':
        return {
          icon: <AlertCircle className="h-6 w-6" />,
          text: 'Critical',
          color: 'from-red-600 to-red-700',
          border: 'border-red-500'
        };
      case 'high':
        return {
          icon: <AlertTriangle className="h-6 w-6" />,
          text: 'High',
          color: 'from-orange-600 to-orange-700',
          border: 'border-orange-500'
        };
      case 'medium':
        return {
          icon: <AlertTriangle className="h-6 w-6" />,
          text: 'Medium',
          color: 'from-yellow-600 to-yellow-700',
          border: 'border-yellow-500'
        };
      case 'low':
      default:
        return {
          icon: <Shield className="h-6 w-6" />,
          text: 'Low',
          color: 'from-green-600 to-green-700',
          border: 'border-green-500'
        };
    }
  };

  const details = getLevelDetails();

  return (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${details.color} ${details.border} border shadow-lg`}>
      {details.icon}
      <span className="font-medium text-white">
        {details.text} Threat Level
      </span>
    </div>
  );
};

export default ThreatLevelIndicator;