import { mockSecurityData } from '../data/mockData';

// This is a mock MongoDB service that simulates database operations
// In a real application, this would connect to a MongoDB database

// For demonstration purposes, we're using in-memory storage
let securityEvents = [...mockSecurityData.events];
let securityRules = [...mockSecurityData.rules];
let components = [...mockSecurityData.components];
let vulnerabilities = [...mockSecurityData.vulnerabilities];
let attackScenarios = [...mockSecurityData.attackScenarios];
let users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@hexashield.com',
    password: 'admin123', // In a real app, this would be hashed
    role: 'administrator',
    company: 'HexaShield',
    lastLogin: new Date().toISOString()
  }
];

// Event-related operations
export const getEvents = async (filters = {}) => {
  let filteredEvents = [...securityEvents];
  
  // Apply filters
  if (filters.severity && filters.severity.length > 0) {
    filteredEvents = filteredEvents.filter(event => filters.severity.includes(event.severity));
  }
  
  if (filters.type && filters.type.length > 0) {
    filteredEvents = filteredEvents.filter(event => filters.type.includes(event.type));
  }
  
  if (filters.status && filters.status.length > 0) {
    filteredEvents = filteredEvents.filter(event => filters.status.includes(event.status));
  }
  
  if (filters.timeRange && filters.timeRange !== 'all') {
    const now = new Date().getTime();
    
    filteredEvents = filteredEvents.filter(event => {
      const eventTime = new Date(event.timestamp).getTime();
      const hoursDiff = (now - eventTime) / (1000 * 60 * 60);
      
      switch (filters.timeRange) {
        case '1h':
          return hoursDiff <= 1;
        case '6h':
          return hoursDiff <= 6;
        case '24h':
          return hoursDiff <= 24;
        case '7d':
          return hoursDiff <= 168; // 7 * 24
        default:
          return true;
      }
    });
  }
  
  // Sort by timestamp (newest first)
  filteredEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  return filteredEvents;
};

export const addEvent = async (event) => {
  const newEvent = {
    id: `event-${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...event
  };
  
  securityEvents.unshift(newEvent);
  return newEvent;
};

// Rule-related operations
export const getRules = async (filters = {}) => {
  let filteredRules = [...securityRules];
  
  // Apply filters (if needed)
  if (filters.type && filters.type !== 'all') {
    filteredRules = filteredRules.filter(rule => rule.type === filters.type);
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredRules = filteredRules.filter(
      rule => rule.name.toLowerCase().includes(searchLower) || 
              rule.description.toLowerCase().includes(searchLower)
    );
  }
  
  return filteredRules;
};

export const getRuleById = async (ruleId) => {
  return securityRules.find(rule => rule.id === ruleId);
};

export const addRule = async (rule) => {
  const newRule = {
    id: `rule-${securityRules.length + 1}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...rule
  };
  
  securityRules.push(newRule);
  return newRule;
};

export const updateRule = async (ruleId, updatedRule) => {
  const index = securityRules.findIndex(rule => rule.id === ruleId);
  
  if (index !== -1) {
    securityRules[index] = {
      ...securityRules[index],
      ...updatedRule,
      updatedAt: new Date().toISOString()
    };
    
    return securityRules[index];
  }
  
  return null;
};

export const deleteRule = async (ruleId) => {
  const index = securityRules.findIndex(rule => rule.id === ruleId);
  
  if (index !== -1) {
    const deletedRule = securityRules[index];
    securityRules = securityRules.filter(rule => rule.id !== ruleId);
    return deletedRule;
  }
  
  return null;
};

// Component-related operations
export const getComponents = async () => {
  return [...components];
};

export const updateComponentStatus = async (componentId, status) => {
  const index = components.findIndex(component => component.id === componentId);
  
  if (index !== -1) {
    components[index] = {
      ...components[index],
      status,
      lastUpdated: new Date().toISOString()
    };
    
    return components[index];
  }
  
  return null;
};

// User-related operations
export const authenticateUser = async (email, password) => {
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Update last login timestamp
    const index = users.findIndex(u => u.id === user.id);
    users[index] = {
      ...users[index],
      lastLogin: new Date().toISOString()
    };
    
    // Return user without password
    const { password, ...userWithoutPassword } = users[index];
    return userWithoutPassword;
  }
  
  return null;
};

export const getUserById = async (userId) => {
  const user = users.find(u => u.id === userId);
  
  if (user) {
    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
};

// Attack scenario operations
export const getAttackScenarios = async () => {
  return [...attackScenarios];
};

export const getScenarioById = async (scenarioId) => {
  return attackScenarios.find(scenario => scenario.id === scenarioId);
};

// Vulnerability operations
export const getVulnerabilities = async () => {
  return [...vulnerabilities];
};

// Integration-related operations
export const saveIntegrationConfig = async (integrationType, config) => {
  // In a real app, this would save to a database
  console.log(`Saving ${integrationType} configuration:`, config);
  return { success: true, message: 'Configuration saved successfully' };
};

export const getIntegrationConfig = async (integrationType) => {
  // In a real app, this would retrieve from a database
  // Here we just return a placeholder
  return { 
    type: integrationType,
    status: 'configured',
    lastUpdated: new Date().toISOString()
  };
};

// System test operations
export const runSystemTest = async () => {
  // In a real app, this would trigger actual integration tests
  // Here we just simulate the process
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'completed',
        timestamp: new Date().toISOString(),
        results: [
          {
            id: 'test-1',
            component: 'network',
            description: 'Network connectivity test',
            status: 'success',
            timestamp: new Date().toISOString()
          },
          {
            id: 'test-2',
            component: 'webapp',
            description: 'Web Application Firewall configuration test',
            status: 'success',
            timestamp: new Date().toISOString()
          },
          {
            id: 'test-3',
            component: 'database',
            description: 'Database firewall connectivity test',
            status: 'success',
            timestamp: new Date().toISOString()
          },
          {
            id: 'test-4',
            component: 'auth',
            description: 'Authentication system test',
            status: 'warning',
            timestamp: new Date().toISOString()
          },
          {
            id: 'test-5',
            component: 'network',
            description: 'IDS rule update test',
            status: 'success',
            timestamp: new Date().toISOString()
          }
        ]
      });
    }, 5000); // Simulate 5-second test process
  });
};

// Export a combined service object
const mongoService = {
  events: {
    getAll: getEvents,
    add: addEvent
  },
  rules: {
    getAll: getRules,
    getById: getRuleById,
    add: addRule,
    update: updateRule,
    delete: deleteRule
  },
  components: {
    getAll: getComponents,
    updateStatus: updateComponentStatus
  },
  users: {
    authenticate: authenticateUser,
    getById: getUserById
  },
  scenarios: {
    getAll: getAttackScenarios,
    getById: getScenarioById
  },
  vulnerabilities: {
    getAll: getVulnerabilities
  },
  integration: {
    saveConfig: saveIntegrationConfig,
    getConfig: getIntegrationConfig,
    runSystemTest: runSystemTest
  }
};

export default mongoService;