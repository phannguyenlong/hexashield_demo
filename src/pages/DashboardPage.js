import React, { useState, useEffect } from 'react';
import { useSecurity } from '../contexts/SecurityContext';
import { Shield, AlertTriangle, CheckCircle, Clock, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
  
  // Generate attack trend data
  useEffect(() => {
    const generateData = () => {
      // Last 7 days data for attack trends
      const days = 7;
      const now = new Date();
      const attacksData = [];
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        // Random data for demonstration
        const blocked = Math.floor(Math.random() * 30) + 10;
        const detected = Math.floor(Math.random() * 5) + 2;
        
        attacksData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          blocked,
          detected,
          total: blocked + detected
        });
      }
      
      setAttacksData(attacksData);
      
      // Component status data
      const statusData = [
        { name: 'Operational', value: components.filter(c => c.status === 'operational').length },
        { name: 'Warning', value: components.filter(c => c.status === 'warning').length },
        { name: 'Critical', value: components.filter(c => c.status === 'critical').length },
        { name: 'Maintenance', value: components.filter(c => c.status === 'maintenance').length }
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
        value: threatTypes[type]
      }));
      
      setThreatTypeData(threatTypeArray);
    };
    
    generateData();
  }, [components, securityEvents]);
  
  // Status card data
  const statusCards = [
    {
      title: 'System Status',
      value: securityStatus.systemStatus === 'operational' ? 'Operational' : 'Under Attack',
      icon: <Shield className={`h-8 w-8 ${securityStatus.systemStatus === 'operational' ? 'text-green-500' : 'text-red-500'}`} />,
      color: securityStatus.systemStatus === 'operational' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500',
      textColor: securityStatus.systemStatus === 'operational' ? 'text-green-800' : 'text-red-800'
    },
    {
      title: 'Active Threats',
      value: securityStatus.activeThreats,
      icon: <AlertTriangle className="h-8 w-8 text-yellow-500" />,
      color: 'bg-yellow-100 border-yellow-500',
      textColor: 'text-yellow-800'
    },
    {
      title: 'Blocked Attacks',
      value: securityStatus.blockedAttacks,
      icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
      color: 'bg-blue-100 border-blue-500',
      textColor: 'text-blue-800'
    },
    {
      title: 'Vulnerabilities',
      value: securityStatus.vulnerabilities,
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      color: 'bg-purple-100 border-purple-500',
      textColor: 'text-purple-800'
    }
  ];
  
  // Chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Security Dashboard</h2>
        <ThreatLevelIndicator level={securityStatus.threatLevel} />
      </div>
      
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusCards.map((card, index) => (
          <SecurityStatusCard key={index} {...card} />
        ))}
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attack Trends Chart */}
        <div className="bg-gray-700 rounded-lg p-4 shadow">
          <h3 className="text-xl font-semibold text-white mb-2">Attack Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={attacksData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="date" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#333', borderColor: '#555', color: '#fff' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="blocked"
                  stroke="#00C49F"
                  activeDot={{ r: 8 }}
                  name="Blocked Attacks"
                />
                <Line
                  type="monotone"
                  dataKey="detected"
                  stroke="#FF8042"
                  name="Detected Attacks"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Threat Types Chart */}
        <div className="bg-gray-700 rounded-lg p-4 shadow">
          <h3 className="text-xl font-semibold text-white mb-2">Attack Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {threatTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#333', borderColor: '#555', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Components & Recent Events Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Component Status */}
        <div className="bg-gray-700 rounded-lg p-4 shadow lg:col-span-1">
          <h3 className="text-xl font-semibold text-white mb-4">Component Status</h3>
          <div className="space-y-4">
            {components.slice(0, 4).map((component) => (
              <ComponentStatusCard key={component.id} component={component} />
            ))}
            {components.length > 4 && (
              <div className="text-center">
                <a href="/monitoring" className="text-blue-400 hover:text-blue-300 text-sm">
                  View all {components.length} components
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Security Events */}
        <div className="bg-gray-700 rounded-lg p-4 shadow lg:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Security Events</h3>
          <RecentEventsTable events={securityEvents.slice(0, 5)} />
          {securityEvents.length > 5 && (
            <div className="text-center mt-4">
              <a href="/monitoring" className="text-blue-400 hover:text-blue-300 text-sm">
                View all {securityEvents.length} events
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;