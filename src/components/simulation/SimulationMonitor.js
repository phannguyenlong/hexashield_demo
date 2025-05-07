import React, { useEffect, useState } from 'react';
import { Server, Database, Globe, Shield, AlertCircle } from 'lucide-react';

const SimulationMonitor = ({ simulation }) => {
  const [currentAttack, setCurrentAttack] = useState(null);
  const [currentDefense, setCurrentDefense] = useState(null);
  const [networkView, setNetworkView] = useState('overview'); // overview, detailed

  // Update current attack and defense states based on simulation
  useEffect(() => {
    if (!simulation) return;
    
    const attacks = simulation.events.filter(event => event.type === 'attack');
    const defenses = simulation.events.filter(event => event.type === 'defense');
    
    if (attacks.length > 0) {
      setCurrentAttack(attacks[attacks.length - 1]);
    }
    
    if (defenses.length > 0) {
      setCurrentDefense(defenses[defenses.length - 1]);
    }
  }, [simulation]);

  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden shadow">
      <div className="p-4 border-b border-gray-600">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Real-time Monitoring</h3>
          <div>
            <select
              className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white"
              value={networkView}
              onChange={(e) => setNetworkView(e.target.value)}
            >
              <option value="overview">Overview</option>
              <option value="detailed">Detailed</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="relative h-64 md:h-80 border border-gray-600 rounded bg-gray-800 overflow-hidden">
          {/* Visualization Area */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              {/* Network Diagram */}
              <NetworkVisualization 
                attackType={simulation?.attackType}
                currentAttack={currentAttack}
                currentDefense={currentDefense}
                viewMode={networkView}
              />
            </div>
          </div>
          
          {/* Current Attack Overlay */}
          {currentAttack && (
            <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-80 p-3">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <div>
                  <h4 className="text-white font-medium">
                    {currentAttack.description || "Attack in progress"}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {currentAttack.details?.payload && (
                      <span className="font-mono text-xs bg-gray-700 px-1 py-0.5 rounded">
                        {currentAttack.details.payload}
                      </span>
                    )}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentAttack.blocked 
                      ? 'bg-green-900 text-green-100' 
                      : 'bg-red-900 text-red-100'
                  }`}>
                    {currentAttack.blocked ? "Blocked" : "Detected"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple network visualization component
const NetworkVisualization = ({ attackType, currentAttack, currentDefense, viewMode }) => {
    // This would ideally use a proper graph visualization library
    // For now, we'll use simple positioned elements
    
    const getAttackColor = () => {
      switch (attackType) {
        case 'sql_injection':
          return 'text-blue-500';
        case 'xss':
          return 'text-purple-500';
        case 'ldap_injection':
          return 'text-amber-500';
        default:
          return 'text-red-500';
      }
    };
    
    return (
      <div className="flex items-center justify-between p-4">
        {/* Attacker */}
        <div className="flex flex-col items-center">
          <div className={`p-3 rounded-full bg-gray-700 border border-red-500 ${
            currentAttack ? 'animate-pulse' : ''
          }`}>
            <Globe className="h-8 w-8 text-red-500" />
          </div>
          <p className="mt-2 text-sm text-gray-300">Attacker</p>
          {viewMode === 'detailed' && currentAttack && (
            <p className="mt-1 text-xs text-gray-400">{currentAttack.source}</p>
          )}
        </div>
        
        {/* Attack Arrow */}
        <div className={`flex-1 h-0.5 ${
          currentAttack 
            ? currentAttack.blocked 
              ? 'bg-gradient-to-r from-red-500 via-red-500 to-green-500' 
              : 'bg-red-500 animate-pulse' 
            : 'bg-gray-600'
        }`}></div>
        
        {/* Security Components */}
        <div className="flex flex-col items-center">
          <div className={`p-3 rounded-full bg-gray-700 border ${
            currentDefense ? 'border-blue-500 animate-pulse' : 'border-gray-500'
          }`}>
            <Shield className={`h-8 w-8 ${
              currentDefense ? 'text-blue-500' : 'text-gray-500'
            }`} />
          </div>
          <p className="mt-2 text-sm text-gray-300">HexaShield</p>
          {viewMode === 'detailed' && currentDefense && (
            <p className="mt-1 text-xs text-gray-400">{currentDefense.component}</p>
          )}
        </div>
        
        {/* Connection Arrow */}
        <div className={`flex-1 h-0.5 ${
          currentAttack && !currentAttack.blocked
            ? 'bg-red-500 animate-pulse'
            : 'bg-gray-600'
        }`}></div>
        
        {/* Protected Application */}
        <div className="flex flex-col items-center">
          <div className={`p-3 rounded-full bg-gray-700 border ${
            currentAttack && !currentAttack.blocked
              ? 'border-red-500 animate-pulse'
              : 'border-green-500'
          }`}>
            {attackType === 'sql_injection' ? (
              <Database className={`h-8 w-8 ${
                currentAttack && !currentAttack.blocked ? 'text-red-500' : 'text-green-500'
              }`} />
            ) : (
              <Server className={`h-8 w-8 ${
                currentAttack && !currentAttack.blocked ? 'text-red-500' : 'text-green-500'
              }`} />
            )}
          </div>
          <p className="mt-2 text-sm text-gray-300">Protected System</p>
          {viewMode === 'detailed' && currentAttack && (
            <p className="mt-1 text-xs text-gray-400">{currentAttack.target}</p>
          )}
        </div>
      </div>
    );
  };
  
  export default SimulationMonitor;