import React from 'react';
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react';

const IntegrationCard = ({ integration, onClick }) => {
  return (
    <div 
      className="bg-gray-800 rounded-lg shadow overflow-hidden cursor-pointer hover:bg-gray-750"
      onClick={onClick}
    >
      <div className="p-4 flex items-start">
        <div className="mr-4">
          {integration.icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-white">{integration.title}</h3>
            {integration.status === 'configured' ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Configured
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                <XCircle className="h-3 w-3 mr-1" />
                Not Configured
              </span>
            )}
          </div>
          <p className="text-gray-400 mt-1 text-sm">{integration.description}</p>
        </div>
        <div className="ml-4">
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default IntegrationCard;