// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { useSecurity } from '../contexts/SecurityContext';
import { Shield, AlertTriangle, AlertCircle, CheckCircle, Clock, Activity, Server, Database, Lock, Code, Info } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

// Components
import SecurityStatusCard from '../components/dashboard/SecurityStatusCard';
import ComponentStatusCard from '../components/dashboard/ComponentStatusCard';
import RecentEventsTable from '../components/dashboard/RecentEventsTable';
import ThreatLevelIndicator from '../components/dashboard/ThreatLevelIndicator';

const DashboardPage = () => {
  const { securityStatus, securityEvents, components } = useSecurity();
  const [attacksData, setAttacksData] = useState([]);
  const [componentStatusData, setComponentStatusData] = useState([]);
  const [threatTypeData, setThreatTypeData] = useState([]);
  const [threatTrendData, setThreatTrendData] = useState([]);
  
  // Generate all dashboard data
  useEffect(() => {
    const generateData = () => {
      // Last 7 days data for attack trends
      const days = 7;
      const now = new Date();
      const attacksData = [];
      const trendData = [];
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        // Random data for demonstration
        const blocked = Math.floor(Math.random() * 30) + 10;
        const detected = Math.floor(Math.random() * 5) + 2;
        const sqlInjection = Math.floor(Math.random() * 15) + 5;
        const xss = Math.floor(Math.random() * 12) + 3;
        const ldap = Math.floor(Math.random() * 8) + 2;
        const other = Math.floor(Math.random() * 10) + 1;
        
        attacksData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          blocked,
          detected,
          total: blocked + detected
        });
        
        trendData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          'SQL Injection': sqlInjection,
          'XSS': xss,
          'LDAP Injection': ldap,
          'Other': other
        });
      }
      
      setAttacksData(attacksData);
      setThreatTrendData(trendData);
      
      // Component status data
      const statusData = [
        { name: 'Operational', value: components.filter(c => c.status === 'operational').length, color: '#10B981' },
        { name: 'Warning', value: components.filter(c => c.status === 'warning').length || 1, color: '#F59E0B' },
        { name: 'Critical', value: components.filter(c => c.status === 'critical').length, color: '#EF4444' },
        { name: 'Maintenance', value: components.filter(c => c.status === 'maintenance').length || 1, color: '#3B82F6' }
      ];
      
      setComponentStatusData(statusData);
      
      // Threat type data
      const threatTypes = {};
      securityEvents.forEach(event => {
        if (!threatTypes[event.type]) {
          threatTypes[event.type] = 0;
        }
        threatTypes[event.type]++;
      });
      
      const threatTypeArray = Object.keys(threatTypes).map(type => ({
        name: type.replace('_', ' ').toUpperCase(),
        value: threatTypes[type],
        color: getColorForThreatType(type)
      }));
      
      setThreatTypeData(threatTypeArray);
    };
    
    generateData();
  }, [components, securityEvents]);
  
  // Get color for threat type
  const getColorForThreatType = (type) => {
    const colorMap = {
      sql_injection: '#3B82F6', // blue
      xss: '#8B5CF6',  // purple
      ldap_injection: '#F59E0B', // amber
      brute_force: '#EF4444', // red
      file_inclusion: '#10B981', // green
      command_injection: '#EC4899', // pink
      system_update: '#6B7280', // gray
      scan: '#14B8A6' // teal
    };
    
    return colorMap[type] || '#6B7280';
  };
  
  // Status card data
  const statusCards = [
    {
      title: 'System Status',
      value: securityStatus.systemStatus === 'operational' ? 'Operational' : 'Under Attack',
      icon: <Shield className={`h-8 w-8 ${securityStatus.systemStatus === 'operational' ? 'text-green-500' : 'text-red-500'}`} />,
      color: securityStatus.systemStatus === 'operational' ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600',
      textColor: 'text-white'
    },
    {
      title: 'Active Threats',
      value: securityStatus.activeThreats,
      icon: <AlertTriangle className="h-8 w-8 text-white" />,
      color: 'from-yellow-500 to-yellow-600',
      textColor: 'text-white'
    },
    {
      title: 'Blocked Attacks',
      value: securityStatus.blockedAttacks,
      icon: <CheckCircle className="h-8 w-8 text-white" />,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-white'
    },
    {
      title: 'Vulnerabilities',
      value: securityStatus.vulnerabilities,
      icon: <Clock className="h-8 w-8 text-white" />,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-white'
    }
  ];
  
  // Protection metrics
  const protectionMetrics = {
    sql_injection: { protected: 95, label: 'SQL Injection' },
    xss: { protected: 92, label: 'XSS' },
    ldap_injection: { protected: 88, label: 'LDAP Injection' },
    file_inclusion: { protected: 90, label: 'File Inclusion' }
  };
  
  // System health metrics
  const systemHealthData = [
    { name: 'CPU', value: 32 },
    { name: 'Memory', value: 45 },
    { name: 'Disk', value: 67 },
    { name: 'Network', value: 28 }
  ];
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded shadow">
          <p className="text-gray-300 font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
  
    return null;
  };
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Security Dashboard</h2>
          <p className="text-gray-400">Overview of your security posture and recent activity</p>
        </div>
        <ThreatLevelIndicator level={securityStatus.threatLevel} />
      </div>
      
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusCards.map((card, index) => (
          <SecurityStatusCard key={index} {...card} />
        ))}
      </div>
      
      {/* Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attack Trends Chart */}
        <div className="bg-gray-800 rounded-lg p-4 shadow lg:col-span-2 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Attack Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={attacksData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDetected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="blocked"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorBlocked)"
                  name="Blocked Attacks"
                />
                <Area
                  type="monotone"
                  dataKey="detected"
                  stroke="#F97316"
                  fillOpacity={1}
                  fill="url(#colorDetected)"
                  name="Detected Attacks"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Threat Distribution Chart */}
        <div className="bg-gray-800 rounded-lg p-4 shadow border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Attack Distribution</h3>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={(entry) => entry.name}
                  labelLine={false}
                >
                  {threatTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Second Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Protection Effectiveness Chart */}
        <div className="bg-gray-800 rounded-lg p-4 shadow border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Protection Effectiveness</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={Object.keys(protectionMetrics).map(key => ({
                  name: protectionMetrics[key].label,
                  protected: protectionMetrics[key].protected,
                  vulnerable: 100 - protectionMetrics[key].protected,
                  color: getColorForThreatType(key)
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis type="number" domain={[0, 100]} stroke="#9CA3AF" />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="protected" name="Protected" stackId="a" fill="#10B981" />
                <Bar dataKey="vulnerable" name="Vulnerable" stackId="a" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Attack Types Trend */}
        <div className="bg-gray-800 rounded-lg p-4 shadow lg:col-span-2 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Attack Types Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={threatTrendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="SQL Injection" stroke="#3B82F6" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="XSS" stroke="#8B5CF6" />
                <Line type="monotone" dataKey="LDAP Injection" stroke="#F59E0B" />
                <Line type="monotone" dataKey="Other" stroke="#6B7280" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Third Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <div className="bg-gray-800 rounded-lg p-4 shadow border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
          <div className="space-y-4">
            {systemHealthData.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-gray-300">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      item.value < 50 ? 'bg-green-500' : 
                      item.value < 80 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-3 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs">Response Time</p>
                <p className="text-white font-semibold">28ms</p>
              </div>
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
            <div className="bg-gray-700 p-3 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs">Uptime</p>
                <p className="text-white font-semibold">99.9%</p>
              </div>
              <Server className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>
        
        {/* Components Status */}
        <div className="bg-gray-800 rounded-lg p-4 shadow border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Security Components</h3>
          <div className="space-y-3">
            {components.slice(0, 4).map((component) => (
              <ComponentStatusCard key={component.id} component={component} />
            ))}
            {components.length > 4 && (
              <div className="text-center mt-2">
                <a href="/monitoring" className="text-blue-400 hover:text-blue-300 text-sm">
                  View all {components.length} components
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Events */}
        <div className="bg-gray-800 rounded-lg p-4 shadow border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Events</h3>
            <a href="/monitoring" className="text-blue-400 hover:text-blue-300 text-sm">
              View All
            </a>
          </div>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
            {securityEvents.slice(0, 6).map((event) => (
              <div key={event.id} className="bg-gray-700 p-3 rounded-lg">
                <div className="flex items-start">
                  {event.severity === 'critical' ? (
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                  ) : event.severity === 'high' ? (
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 mr-2" />
                  ) : event.type.includes('injection') ? (
                    <Database className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                  ) : event.type === 'xss' ? (
                    <Code className="h-5 w-5 text-purple-500 mt-0.5 mr-2" />
                  ) : event.type.includes('auth') || event.type.includes('brute') ? (
                    <Lock className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
                  ) : (
                    <Info className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{event.description}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-gray-400 text-xs">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </p>
                      <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                        event.status === 'blocked' ? 'bg-green-900 text-green-100' :
                        event.status === 'detected' ? 'bg-yellow-900 text-yellow-100' :
                        'bg-blue-900 text-blue-100'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;