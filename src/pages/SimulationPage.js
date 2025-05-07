import React, { useState } from 'react';
import { useSimulation } from '../contexts/SimulationContext';
import { useSecurity } from '../contexts/SecurityContext';
import { Play, Pause, StopCircle, FastForward, BarChart2, Shield, Terminal } from 'lucide-react';

// Components
import ScenarioCard from '../components/simulation/ScenarioCard.js';
import SimulationControls from '../components/simulation/SimulationControls';
import SimulationMonitor from '../components/simulation/SimulationMonitor';
import SimulationResults from '../components/simulation/SimulationResults';
import ActivityLog from '../components/simulation/ActivityLog';

const SimulationPage = () => {
  const {
    availableScenarios,
    activeSimulation,
    simulationResults,
    startSimulation,
    stopSimulation,
    togglePauseSimulation,
    simulationPaused,
    setSpeed,
    simulationSpeed
  } = useSimulation();
  
  const { securityEvents } = useSecurity();
  const [selectedScenario, setSelectedScenario] = useState(null);
  
  // Only show simulation events when simulation is active
  const simulationEvents = activeSimulation ? securityEvents.slice(0, 10) : [];
  
  // Handle scenario selection
  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario);
  };
  
  // Start the selected simulation
  const handleStartSimulation = () => {
    if (selectedScenario) {
      startSimulation(selectedScenario.id);
    }
  };
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Attack Simulation</h2>
        <div className="flex space-x-2">
          {!activeSimulation && !simulationResults && (
            <button
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleStartSimulation}
              disabled={!selectedScenario}
            >
              <Play className="h-4 w-4 mr-2" />
              Run Simulation
            </button>
          )}
          {activeSimulation && (
            <>
              <button
                className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                onClick={togglePauseSimulation}
              >
                {simulationPaused ? (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                )}
              </button>
              <button
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={stopSimulation}
              >
                <StopCircle className="h-4 w-4 mr-2" />
                Stop
              </button>
            </>
          )}
        </div>
      </div>
      
      {!activeSimulation && !simulationResults && (
        <div className="bg-gray-700 rounded-lg p-4 shadow">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold text-white">Select Attack Scenario</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Choose an attack scenario to simulate against your infrastructure. These simulations demonstrate how HexaShield detects and responds to various attack vectors in real-time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableScenarios.map(scenario => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                selected={selectedScenario?.id === scenario.id}
                onSelect={() => handleSelectScenario(scenario)}
              />
            ))}
          </div>
        </div>
      )}
      
      {activeSimulation && (
        <>
          <SimulationControls
            simulation={activeSimulation}
            isPaused={simulationPaused}
            speed={simulationSpeed}
            onPause={togglePauseSimulation}
            onStop={stopSimulation}
            onSpeedChange={setSpeed}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SimulationMonitor simulation={activeSimulation} />
            </div>
            <div>
              <ActivityLog events={simulationEvents} simulationActive={true} />
            </div>
          </div>
        </>
      )}
      
      {simulationResults && !activeSimulation && (
        <SimulationResults results={simulationResults} />
      )}
    </div>
  );
};

export default SimulationPage;