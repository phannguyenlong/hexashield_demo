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
        
        <div className="mb-6">
          <div className="bg-gray-900 p-3 rounded-md mb-4">
            <p className="text-white">
              <span className="font-medium">Attack Type:</span>{' '}
              <span className="text-red-400 font-medium">
                {attack.type.replace('_', ' ').toUpperCase()}
              </span>
            </p>
            <p className="text-white text-sm mt-1">{attack.description}</p>
            <p className="text-gray-400 text-xs mt-2">
              Source IP: {attack.source} | Target: {attack.target}
            </p>
          </div>
          
          <div className="flex items-center bg-blue-900 bg-opacity-30 p-3 rounded-md border border-blue-600">
            <Shield className="h-5 w-5 text-blue-500 mr-2" />
            <p className="text-blue-300 text-sm">
              HexaShield protection has detected this attack and is actively responding
            </p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
          >
            Dismiss
          </button>
          <button
            onClick={handleViewDetails}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center"
          >
            <Shield className="h-4 w-4 mr-2" />
            View Attack Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertOverlay;