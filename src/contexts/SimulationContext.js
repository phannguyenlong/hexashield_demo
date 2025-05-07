import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockAttackScenarios } from '../data/mockData';
import { useSecurity } from './SecurityContext';

const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
  const { addSecurityEvent, updateComponentStatus } = useSecurity();
  
  const [activeSimulation, setActiveSimulation] = useState(null);
  const [simulationHistory, setSimulationHistory] = useState([]);
  const [availableScenarios, setAvailableScenarios] = useState([]);
  const [simulationSpeed, setSimulationSpeed] = useState(1); // 1 = normal, 2 = fast, 0.5 = slow
  const [simulationPaused, setSimulationPaused] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [simulationResults, setSimulationResults] = useState(null);
  
  // Initialize available scenarios
  useEffect(() => {
    setAvailableScenarios(mockAttackScenarios);
  }, []);
  
  // Start a new simulation
  const startSimulation = (scenarioId) => {
    const scenario = availableScenarios.find(s => s.id === scenarioId);
    
    if (!scenario) return false;
    
    const newSimulation = {
      id: `sim-${Date.now()}`,
      scenarioId,
      scenarioName: scenario.name,
      startedAt: new Date().toISOString(),
      status: 'running',
      steps: scenario.steps,
      currentStep: 0,
      events: [],
      attackType: scenario.attackType,
    };
    
    setActiveSimulation(newSimulation);
    setSimulationStep(0);
    setSimulationResults(null);
    setSimulationPaused(false);
    
    return true;
  };
  
  // Stop current simulation
  const stopSimulation = () => {
    if (!activeSimulation) return;
    
    const completedSimulation = {
      ...activeSimulation,
      status: 'stopped',
      stoppedAt: new Date().toISOString(),
    };
    
    setSimulationHistory([completedSimulation, ...simulationHistory]);
    setActiveSimulation(null);
    setSimulationResults(null);
  };
  
  // Pause/resume simulation
  const togglePauseSimulation = () => {
    setSimulationPaused(!simulationPaused);
  };
  
  // Process next simulation step
  const processNextStep = () => {
    if (!activeSimulation || simulationPaused) return;
    
    const currentStep = activeSimulation.steps[simulationStep];
    
    if (!currentStep) {
      completeSimulation();
      return;
    }
    
    // Process the current step
    switch (currentStep.type) {
      case 'attack':
        // Generate security event for the attack
        addSecurityEvent({
          id: `event-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: currentStep.attackType || 'unknown',
          source: currentStep.source || 'simulation',
          target: currentStep.target || 'system',
          severity: currentStep.severity || 'medium',
          status: currentStep.blocked ? 'blocked' : 'detected',
          description: currentStep.description || 'Simulated attack attempt',
          details: currentStep.details || {},
        });
        
        // Update affected component status
        if (currentStep.affectedComponent) {
          updateComponentStatus(
            currentStep.affectedComponent, 
            currentStep.blocked ? 'protected' : 'compromised'
          );
        }
        break;
        
      case 'defense':
        // Generate security event for the defense action
        addSecurityEvent({
          id: `event-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'defense',
          source: currentStep.component || 'system',
          target: currentStep.target || 'attack',
          severity: 'info',
          status: 'success',
          description: currentStep.description || 'Defense mechanism activated',
          details: currentStep.details || {},
        });
        
        // Update component status
        if (currentStep.component) {
          updateComponentStatus(currentStep.component, 'active');
        }
        break;
        
      default:
        // Log other events
        addSecurityEvent({
          id: `event-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'info',
          source: 'simulation',
          severity: 'info',
          status: 'info',
          description: currentStep.description || 'Simulation event',
          details: currentStep.details || {},
        });
    }
    
    // Update simulation step
    setSimulationStep(prevStep => prevStep + 1);
    
    // Update active simulation
    setActiveSimulation(prev => ({
      ...prev,
      currentStep: prev.currentStep + 1,
      events: [
        ...prev.events,
        { 
          timestamp: new Date().toISOString(),
          ...currentStep 
        }
      ],
    }));
  };
  
  // Complete the simulation and generate results
  const completeSimulation = () => {
    if (!activeSimulation) return;
    
    const completedSimulation = {
      ...activeSimulation,
      status: 'completed',
      completedAt: new Date().toISOString(),
    };
    
    // Generate results
    const attackEvents = completedSimulation.events.filter(e => e.type === 'attack');
    const blockedAttacks = attackEvents.filter(e => e.blocked);
    const successRate = attackEvents.length > 0 
      ? (blockedAttacks.length / attackEvents.length) * 100 
      : 0;
    
    const results = {
      simulationId: completedSimulation.id,
      totalAttacks: attackEvents.length,
      blockedAttacks: blockedAttacks.length,
      successRate: successRate,
      duration: new Date(completedSimulation.completedAt) - new Date(completedSimulation.startedAt),
      attackType: completedSimulation.attackType,
      recommendations: generateRecommendations(successRate, completedSimulation.attackType),
    };
    
    setSimulationResults(results);
    setSimulationHistory([completedSimulation, ...simulationHistory]);
    setActiveSimulation(null);
  };
  
  // Generate recommendations based on simulation results
  const generateRecommendations = (successRate, attackType) => {
    if (successRate >= 90) {
      return [
        'Your defenses are strong against this type of attack.',
        'Continue monitoring and updating rules as attack methods evolve.',
      ];
    } else if (successRate >= 70) {
      return [
        'Your defenses are generally effective, but could be improved.',
        `Consider adding more specific rules for ${attackType} attacks.`,
        'Review and update your response procedures for faster mitigation.',
      ];
    } else {
      return [
        'Your defenses need significant improvement against this attack type.',
        `Implement specialized rules for ${attackType} attacks immediately.`,
        'Consider enabling more aggressive prevention measures.',
        'Review and update your security architecture to address these vulnerabilities.',
      ];
    }
  };
  
  // Set simulation speed
  const setSpeed = (speed) => {
    setSimulationSpeed(speed);
  };
  
  // Run the simulation based on speed
  useEffect(() => {
    if (!activeSimulation || simulationPaused) return;
    
    const interval = setInterval(() => {
      processNextStep();
    }, 2000 / simulationSpeed); // Adjust timing based on speed
    
    return () => clearInterval(interval);
  }, [activeSimulation, simulationPaused, simulationSpeed, simulationStep]);
  
  const value = {
    activeSimulation,
    simulationHistory,
    availableScenarios,
    simulationSpeed,
    simulationPaused,
    simulationResults,
    startSimulation,
    stopSimulation,
    togglePauseSimulation,
    setSpeed,
  };
  
  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  return useContext(SimulationContext);
};