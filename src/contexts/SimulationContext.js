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
    
    // Generate detailed results object with component-specific metrics
    const results = {
      simulationId: completedSimulation.id,
      totalAttacks: attackEvents.length,
      blockedAttacks: blockedAttacks.length,
      detectedAttacks: attackEvents.filter(e => !e.blocked && e.status === 'detected').length,
      successfulAttacks: attackEvents.length - blockedAttacks.length - attackEvents.filter(e => !e.blocked && e.status === 'detected').length,
      successRate: successRate,
      protectionRate: successRate,
      avgDetectionTime: "0.8s",
      avgResponseTime: "1.2s",
      duration: new Date(completedSimulation.completedAt) - new Date(completedSimulation.startedAt),
      attackType: completedSimulation.attackType,
      recommendations: generateRecommendations(successRate, completedSimulation.attackType),
      
      // Attack progression timeline
      timeline: [
        { phase: 'Reconnaissance', blocked: Math.floor(Math.random() * 3) + 2, detected: Math.floor(Math.random() * 2), successful: 0 },
        { phase: 'Initial Access', blocked: Math.floor(Math.random() * 3) + 3, detected: Math.floor(Math.random() * 2) + 1, successful: Math.floor(Math.random() * 2) },
        { phase: 'Execution', blocked: Math.floor(Math.random() * 3) + 3, detected: Math.floor(Math.random() * 2), successful: 0 },
        { phase: 'Persistence', blocked: Math.floor(Math.random() * 3) + 1, detected: 0, successful: 0 }
      ],
      
      // Component effectiveness
      componentEffectiveness: [
        { name: 'ModSecurity WAF', effectiveness: 91 + Math.floor(Math.random() * 5), attacks: 20 + Math.floor(Math.random() * 10) },
        { name: 'GreenSQL', effectiveness: 89 + Math.floor(Math.random() * 7), attacks: 15 + Math.floor(Math.random() * 8) },
        { name: 'Suricata IDS', effectiveness: 85 + Math.floor(Math.random() * 8), attacks: 10 + Math.floor(Math.random() * 5) },
        { name: 'Wazuh Agents', effectiveness: 88 + Math.floor(Math.random() * 7), attacks: 8 + Math.floor(Math.random() * 5) }
      ],
      
      // Attack types (SQL injection specific)
      attackTypes: completedSimulation.attackType === 'sql_injection' ? [
        { name: 'UNION-based', value: 10 + Math.floor(Math.random() * 4), color: '#3B82F6' },
        { name: 'Error-based', value: 6 + Math.floor(Math.random() * 4), color: '#8B5CF6' },
        { name: 'Boolean-based', value: 4 + Math.floor(Math.random() * 4), color: '#EC4899' },
        { name: 'Time-based', value: 3 + Math.floor(Math.random() * 4), color: '#F59E0B' },
        { name: 'Out-of-band', value: 1 + Math.floor(Math.random() * 2), color: '#EF4444' }
      ] : (completedSimulation.attackType === 'xss' ? [
        { name: 'Reflected XSS', value: 12 + Math.floor(Math.random() * 4), color: '#3B82F6' },
        { name: 'Stored XSS', value: 8 + Math.floor(Math.random() * 4), color: '#8B5CF6' },
        { name: 'DOM-based XSS', value: 6 + Math.floor(Math.random() * 3), color: '#EC4899' },
        { name: 'mXSS', value: 2 + Math.floor(Math.random() * 2), color: '#F59E0B' }
      ] : [
        { name: 'Authentication Bypass', value: 9 + Math.floor(Math.random() * 4), color: '#3B82F6' },
        { name: 'Information Disclosure', value: 7 + Math.floor(Math.random() * 3), color: '#8B5CF6' },
        { name: 'Attribute Modification', value: 5 + Math.floor(Math.random() * 3), color: '#EC4899' },
        { name: 'Search Filter Manipulation', value: 4 + Math.floor(Math.random() * 2), color: '#F59E0B' }
      ]),
      
      // Key findings based on attack type
      keyFindings: {
        finding1: completedSimulation.attackType === 'sql_injection' ? 
          "HexaShield successfully blocked 93% of all SQL injection attack attempts." :
          (completedSimulation.attackType === 'xss' ? 
            "HexaShield detected 100% of DOM-based XSS attacks before they could execute." : 
            "HexaShield prevented all LDAP injection attacks targeting critical directory services."),
        finding2: completedSimulation.attackType === 'sql_injection' ? 
          "Multi-layered protection prevented all attempts at data exfiltration." :
          (completedSimulation.attackType === 'xss' ? 
            "ModSecurity WAF successfully sanitized all malicious JavaScript payloads." : 
            "Authentication system remained secure throughout all attack phases."),
        finding3: completedSimulation.attackType === 'sql_injection' ? 
          "The GreenSQL database firewall provided secondary protection for queries that bypassed ModSecurity." :
          (completedSimulation.attackType === 'xss' ? 
            "Content Security Policy enforcement blocked all exfiltration attempts." : 
            "Keycloak's input validation prevented all directory traversal attempts."),
        finding4: completedSimulation.attackType === 'sql_injection' ? 
          "Time-based blind SQL injections were detected but took longer to identify than other attack types." :
          (completedSimulation.attackType === 'xss' ? 
            "Stored XSS attacks required additional defenses beyond standard filtering." : 
            "Search filter manipulation attempts were more difficult to detect than other LDAP injection types.")
      }
    };
    
    setSimulationResults(results);
    setSimulationHistory([completedSimulation, ...simulationHistory]);
    setActiveSimulation(null);
  };
  
  // Generate recommendations based on simulation results
  const generateRecommendations = (successRate, attackType) => {
    // Common recommendations
    const commonRecommendations = [
      "Continue monitoring and updating rules as attack methods evolve.",
      "Maintain regular security assessments to identify new vulnerabilities."
    ];
    
    // Type-specific recommendations
    const typeSpecificRecommendations = {
      sql_injection: [
        "Update ModSecurity rules to improve detection of time-based SQL injection techniques.",
        "Enable additional logging for database queries to improve forensic capabilities.",
        "Implement custom rules for the specific application structure to reduce false positives.",
        "Configure automated response workflows to immediately isolate compromised systems."
      ],
      xss: [
        "Implement Content Security Policy headers for additional browser-side protection.",
        "Add DOM-based XSS detection capabilities to frontend code.",
        "Configure strict output encoding for all dynamic content.",
        "Review and harden input validation for all user-submitted content."
      ],
      ldap_injection: [
        "Implement strict input validation for all directory service queries.",
        "Configure LDAP server to require authentication for all queries.",
        "Deploy directory-specific monitoring for suspicious query patterns.",
        "Add custom detection rules for organization-specific directory structures."
      ]
    };
    
    // Select relevant recommendations based on success rate
    let recommendations = [];
    
    if (successRate >= 90) {
      recommendations = [
        "Your defenses are strong against this type of attack.",
        ...commonRecommendations
      ];
    } else if (successRate >= 70) {
      recommendations = [
        `Your defenses are generally effective, but could be improved.`,
        `Consider adding more specific rules for ${attackType.replace('_', ' ')} attacks.`,
        'Review and update your response procedures for faster mitigation.',
        ...typeSpecificRecommendations[attackType].slice(0, 2)
      ];
    } else {
      recommendations = [
        `Your defenses need significant improvement against this attack type.`,
        `Implement specialized rules for ${attackType.replace('_', ' ')} attacks immediately.`,
        'Consider enabling more aggressive prevention measures.',
        'Review and update your security architecture to address these vulnerabilities.',
        ...typeSpecificRecommendations[attackType]
      ];
    }
    
    return recommendations;
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