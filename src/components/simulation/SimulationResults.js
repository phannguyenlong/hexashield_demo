import React from 'react';
import { CheckCircle, XCircle, BarChart2, Info, RefreshCw, Shield, AlertTriangle, Database, Code, Users } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const SimulationResults = ({ results }) => {
  if (!results) return null;
  
  const pieData = [
    { name: 'Blocked', value: results.blockedAttacks, color: '#10B981' },
    { name: 'Detected', value: results.detectedAttacks, color: '#F59E0B' },
    { name: 'Successful', value: results.successfulAttacks, color: '#EF4444' }
  ].filter(item => item.value > 0);
  
  // Timeline data for attack progression
  const timelineData = results.timeline || [
    { phase: 'Reconnaissance', blocked: 3, detected: 1, successful: 0 },
    { phase: 'Initial Access', blocked: 4, detected: 2, successful: 1 },
    { phase: 'Execution', blocked: 5, detected: 1, successful: 0 },
    { phase: 'Persistence', blocked: 2, detected: 0, successful: 0 }
  ];
  
  // Defense effectiveness by component
  const componentData = results.componentEffectiveness || [
    { name: 'ModSecurity WAF', effectiveness: 94, attacks: 25 },
    { name: 'GreenSQL', effectiveness: 92, attacks: 18 },
    { name: 'Suricata IDS', effectiveness: 88, attacks: 12 },
    { name: 'Wazuh Agents', effectiveness: 90, attacks: 10 }
  ];
  
  // Attack type distribution
  const attackTypeData = results.attackTypes || [
    { name: 'UNION-based', value: 12, color: '#3B82F6' },
    { name: 'Error-based', value: 8, color: '#8B5CF6' },
    { name: 'Boolean-based', value: 6, color: '#EC4899' },
    { name: 'Time-based', value: 5, color: '#F59E0B' },
    { name: 'Out-of-band', value: 2, color: '#EF4444' }
  ];
  
  return (
    <div className="bg-gray-700 rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-600">
        <div className="flex items-center">
          <h3 className="text-xl font-semibold text-white">Simulation Results</h3>
          <div className="ml-3 px-3 py-1 bg-blue-600 bg-opacity-30 border border-blue-500 rounded-full">
            <p className="text-sm text-blue-300 font-medium">
              {results.attackType.replace('_', ' ')} attack simulation
            </p>
          </div>
        </div>
        <p className="text-gray-300 text-sm mt-1">
          Comprehensive analysis of the {results.attackType.replace('_', ' ')} attack simulation and HexaShield's response
        </p>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col items-center justify-center">
            <div className="text-xl font-medium text-white mb-1">Protection Rate</div>
            <div className="text-4xl font-bold text-green-400 mb-3">{results.protectionRate || 93}%</div>
            <div className="flex items-center text-sm text-gray-300">
              <Shield className="h-4 w-4 mr-1 text-green-500" />
              <span>{results.blockedAttacks + results.detectedAttacks} of {results.totalAttacks} attacks mitigated</span>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col items-center justify-center">
            <div className="text-xl font-medium text-white mb-1">Detection Time</div>
            <div className="text-4xl font-bold text-blue-400 mb-3">{results.avgDetectionTime || "0.8s"}</div>
            <div className="flex items-center text-sm text-gray-300">
              <AlertTriangle className="h-4 w-4 mr-1 text-blue-500" />
              <span>Average time to detect an attack</span>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col items-center justify-center">
            <div className="text-xl font-medium text-white mb-1">Response Time</div>
            <div className="text-4xl font-bold text-purple-400 mb-3">{results.avgResponseTime || "1.2s"}</div>
            <div className="flex items-center text-sm text-gray-300">
              <Shield className="h-4 w-4 mr-1 text-purple-500" />
              <span>Average time from detection to response</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="text-lg font-medium text-white mb-3">Attack Defense Analysis</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', borderColor: '#555' }}
                  />
                  <Legend verticalAlign="bottom" height={40} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="text-lg font-medium text-white mb-3">Attack Progression</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={timelineData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  stackOffset="expand"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                  <XAxis dataKey="phase" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                  <Legend />
                  <Bar dataKey="blocked" name="Blocked" stackId="a" fill="#10B981" />
                  <Bar dataKey="detected" name="Detected" stackId="a" fill="#F59E0B" />
                  <Bar dataKey="successful" name="Successful" stackId="a" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="text-lg font-medium text-white mb-3">Security Component Effectiveness</h4>
            <div className="space-y-4">
              {componentData.map((component, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {component.name.includes('ModSecurity') && <Code className="h-4 w-4 mr-2 text-purple-500" />}
                      {component.name.includes('GreenSQL') && <Database className="h-4 w-4 mr-2 text-green-500" />}
                      {component.name.includes('Suricata') && <Shield className="h-4 w-4 mr-2 text-blue-500" />}
                      {component.name.includes('Wazuh') && <Shield className="h-4 w-4 mr-2 text-amber-500" />}
                      <span className="text-sm text-gray-300">{component.name}</span>
                    </div>
                    <span className="text-sm text-white font-medium">{component.effectiveness}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        component.effectiveness > 90 ? 'bg-green-500' :
                        component.effectiveness > 80 ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${component.effectiveness}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400 text-right">
                    Blocked {Math.round(component.attacks * component.effectiveness / 100)} of {component.attacks} attacks
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="text-lg font-medium text-white mb-3">SQL Injection Attack Types</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={attackTypeData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                  <XAxis type="number" stroke="#9CA3AF" />
                  <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                  <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]}>
                    {attackTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="text-lg font-medium text-white mb-4">Key Findings</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="p-1 rounded-full bg-green-900 bg-opacity-50 mr-2 mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-white text-sm">{results.keyFindings?.finding1 || "HexaShield successfully blocked 93% of all SQL injection attack attempts."}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-1 rounded-full bg-green-900 bg-opacity-50 mr-2 mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-white text-sm">{results.keyFindings?.finding2 || "Multi-layered protection prevented all attempts at data exfiltration."}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-1 rounded-full bg-green-900 bg-opacity-50 mr-2 mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-white text-sm">{results.keyFindings?.finding3 || "The GreenSQL database firewall provided secondary protection for the 7% of attacks that bypassed ModSecurity."}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-1 rounded-full bg-yellow-900 bg-opacity-50 mr-2 mt-0.5 flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <p className="text-white text-sm">{results.keyFindings?.finding4 || "Time-based blind SQL injections were detected but took longer to identify than other attack types."}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="text-lg font-medium text-white mb-4">Recommendations</h4>
            <div className="space-y-3">
              {(results.recommendations || [
                "Update ModSecurity rules to improve detection of time-based SQL injection techniques.",
                "Enable additional logging for database queries to improve forensic capabilities.",
                "Implement custom rules for the specific application structure to reduce false positives.",
                "Configure automated response workflows to immediately isolate compromised systems."
              ]).map((rec, index) => (
                <div key={index} className="flex items-start">
                  <Info className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Run New Simulation
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimulationResults;