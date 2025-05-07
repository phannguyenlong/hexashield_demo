import React from 'react';
import { Shield, AlertTriangle, AlertCircle } from 'lucide-react';

const ScenarioCard = ({ scenario, selected, onSelect }) => {
  const getDifficultyIcon = () => {
    switch (scenario.difficulty) {
      case 'easy':
        return <Shield className="h-5 w-5 text-green-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'hard':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Shield className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAttackTypeColor = () => {
    switch (scenario.attackType) {
      case 'sql_injection':
        return 'bg-blue-800 text-blue-100';
      case 'xss':
        return 'bg-purple-800 text-purple-100';
      case 'ldap_injection':
        return 'bg-amber-800 text-amber-100';
      default:
        return 'bg-gray-800 text-gray-100';
    }
  };

  return (
    <div
      className={`rounded-lg p-4 cursor-pointer transition-colors ${
        selected
          ? 'bg-blue-700 border-2 border-blue-400'
          : 'bg-gray-800 hover:bg-gray-750 border-2 border-transparent'
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-white font-medium text-lg">{scenario.name}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAttackTypeColor()}`}>
          {scenario.attackType.replace('_', ' ')}
        </span>
      </div>
      
      <p className="text-gray-300 text-sm mb-4">{scenario.description}</p>
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center">
          {getDifficultyIcon()}
          <span className="ml-1 text-sm text-gray-300 capitalize">
            {scenario.difficulty} difficulty
          </span>
        </div>
        <div className="text-sm text-gray-400">
          {scenario.steps.length} steps
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;