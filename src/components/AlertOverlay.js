import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertCircle, X } from 'lucide-react';

const AlertOverlay = ({ attack, onClose }) => {
  const navigate = useNavigate();
  
  if (!attack) return null;
  
  const handleViewDetails = () => {
    navigate('/response/attack-details');
    onClose();
  };

  const handleViewReport = () => {
    navigate(`/response/attack-report?attack=${attack.type}`);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full mx-4 border-2 border-red-500 animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="bg-red-500 bg-opacity-20 p-2 rounded-full mr-3">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Critical Security Alert</h3>
              <p className="text-red-400 text-sm font-medium">Attack in progress</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
            <h4 className="text-white font-medium mb-2">Attack Details</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                <span className="text-gray-400">Type:</span> {attack.type.replace('_', ' ')}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-400">Source:</span> {attack.source}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-400">Target:</span> {attack.target}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-400">Time:</span> {new Date(attack.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleViewDetails}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertOverlay;