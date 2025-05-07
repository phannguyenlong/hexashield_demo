import mongoService from './mongoService';

// This service acts as an API layer between the React components and the MongoDB service
// In a real application, this would make HTTP requests to a backend API

// Helper to simulate API delay
const simulateApiDelay = async (data, delay = 300) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// Authentication and user-related APIs
export const loginUser = async (email, password) => {
  try {
    const user = await mongoService.users.authenticate(email, password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    return await simulateApiDelay(user);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async (userId) => {
  try {
    const user = await mongoService.users.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return await simulateApiDelay(user);
  } catch (error) {
    throw error;
  }
};

// Security events APIs
export const getSecurityEvents = async (filters = {}) => {
  try {
    const events = await mongoService.events.getAll(filters);
    return await simulateApiDelay(events);
  } catch (error) {
    throw error;
  }
};

export const addSecurityEvent = async (event) => {
  try {
    const newEvent = await mongoService.events.add(event);
    return await simulateApiDelay(newEvent);
  } catch (error) {
    throw error;
  }
};

// Security rules APIs
export const getSecurityRules = async (filters = {}) => {
  try {
    const rules = await mongoService.rules.getAll(filters);
    return await simulateApiDelay(rules);
  } catch (error) {
    throw error;
  }
};

export const getSecurityRuleById = async (ruleId) => {
  try {
    const rule = await mongoService.rules.getById(ruleId);
    if (!rule) {
      throw new Error('Rule not found');
    }
    return await simulateApiDelay(rule);
  } catch (error) {
    throw error;
  }
};

export const addSecurityRule = async (rule) => {
  try {
    const newRule = await mongoService.rules.add(rule);
    return await simulateApiDelay(newRule);
  } catch (error) {
    throw error;
  }
};

export const updateSecurityRule = async (ruleId, updatedRule) => {
  try {
    const rule = await mongoService.rules.update(ruleId, updatedRule);
    if (!rule) {
      throw new Error('Rule not found');
    }
    return await simulateApiDelay(rule);
  } catch (error) {
    throw error;
  }
};

export const deleteSecurityRule = async (ruleId) => {
  try {
    const rule = await mongoService.rules.delete(ruleId);
    if (!rule) {
      throw new Error('Rule not found');
    }
    return await simulateApiDelay({ success: true, id: ruleId });
  } catch (error) {
    throw error;
  }
};

// Components APIs
export const getComponents = async () => {
  try {
    const components = await mongoService.components.getAll();
    return await simulateApiDelay(components);
  } catch (error) {
    throw error;
  }
};

export const updateComponentStatus = async (componentId, status) => {
  try {
    const component = await mongoService.components.updateStatus(componentId, status);
    if (!component) {
      throw new Error('Component not found');
    }
    return await simulateApiDelay(component);
  } catch (error) {
    throw error;
  }
};

// Simulation APIs
export const getAttackScenarios = async () => {
  try {
    const scenarios = await mongoService.scenarios.getAll();
    return await simulateApiDelay(scenarios);
  } catch (error) {
    throw error;
  }
};

export const getScenarioById = async (scenarioId) => {
  try {
    const scenario = await mongoService.scenarios.getById(scenarioId);
    if (!scenario) {
      throw new Error('Scenario not found');
    }
    return await simulateApiDelay(scenario);
  } catch (error) {
    throw error;
  }
};

// Vulnerabilities APIs
export const getVulnerabilities = async () => {
  try {
    const vulnerabilities = await mongoService.vulnerabilities.getAll();
    return await simulateApiDelay(vulnerabilities);
  } catch (error) {
    throw error;
  }
};

// Integration APIs
export const saveIntegrationConfig = async (integrationType, config) => {
  try {
    const result = await mongoService.integration.saveConfig(integrationType, config);
    return await simulateApiDelay(result);
  } catch (error) {
    throw error;
  }
};

export const getIntegrationConfig = async (integrationType) => {
  try {
    const config = await mongoService.integration.getConfig(integrationType);
    return await simulateApiDelay(config);
  } catch (error) {
    throw error;
  }
};

export const runSystemTest = async () => {
  try {
    // This is a longer operation, so we don't add additional delay
    const result = await mongoService.integration.runSystemTest();
    return result;
  } catch (error) {
    throw error;
  }
};

// Export all API functions
const apiService = {
  auth: {
    login: loginUser,
    getCurrentUser
  },
  events: {
    getAll: getSecurityEvents,
    add: addSecurityEvent
  },
  rules: {
    getAll: getSecurityRules,
    getById: getSecurityRuleById,
    add: addSecurityRule,
    update: updateSecurityRule,
    delete: deleteSecurityRule
  },
  components: {
    getAll: getComponents,
    updateStatus: updateComponentStatus
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
    runSystemTest
  }
};

export default apiService;