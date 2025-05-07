import React from 'react';
import { Play, Pause, StopCircle, FastForward, Rewind } from 'lucide-react';

const SimulationControls = ({
  simulation,
  isPaused,
  speed,
  onPause,
  onStop,
  onSpeedChange
}) => {
  // Calculate progress
  const progress = simulation
    ? (simulation.currentStep / simulation.steps.length) * 100
    : 0;

  return (
    <div className="bg-gray-700 rounded-lg p-4 shadow">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white">
            {simulation?.scenarioName || 'Simulation'}
          </h3>
          <p className="text-gray-300 text-sm">
            Step {simulation?.currentStep} of {simulation?.steps.length}
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <button
              className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 text-white"
              onClick={() => onSpeedChange(0.5)}
              title="Slow Speed"
            >
              <Rewind className="h-4 w-4" />
            </button>
            
            <button
              className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 text-white"
              onClick={onPause}
              title={isPaused ? "Resume" : "Pause"}
            >
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
            
            <button
              className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 text-white"
              onClick={onStop}
              title="Stop"
            >
              <StopCircle className="h-4 w-4" />
            </button>
            
            <button
              className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 text-white"
              onClick={() => onSpeedChange(2)}
              title="Fast Speed"
            >
              <FastForward className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">Speed:</span>
            <select
              className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white"
              value={speed}
              onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={4}>4x</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-800 rounded-full h-2.5 mt-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SimulationControls;