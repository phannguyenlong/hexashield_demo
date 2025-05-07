import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockSecurityData } from '../data/mockData';

const SecurityContext = createContext();

export const SecurityProvider = ({ children }) => {
  const [securityStatus, setSecurityStatus] = useState({
    threatLevel: 'low',
    activeThreats: 0,
    blockedAttacks: 0,
    vulnerabilities: 0,
    systemStatus: 'operational',
  });
  
  const [securityEvents, setSecurityEvents] = useState([]);
  const [securityRules, setSecurityRules] = useState([]);
  const [components, setComponents] = useState([]);
  
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
      systemStatus: criticalEvents.length > 0 ? 'under_attack' : 'operational',
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
  
  const value = {
    securityStatus,
    securityEvents,
    securityRules,
    components,
    addSecurityEvent,
    updateRule,
    addRule,
    deleteRule,
    updateComponentStatus,
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