import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const ResponseMetrics = ({ title, value, change, trend, description }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-white">{title}</h4>
        <div className={`flex items-center ${
          trend === 'up' 
            ? 'text-green-500' 
            : 'text-red-500'
        }`}>
          {trend === 'up' ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          <span className="text-sm">{change}</span>
        </div>
      </div>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
  );
};

export default ResponseMetrics;