import React, { useState, useEffect } from 'react';
import { useSecurity } from '../contexts/SecurityContext';
import { Search, Filter, DownloadCloud, RefreshCw, Activity, AlertTriangle, BarChart3, List, Shield, AlertCircle  } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

// Components
import EventsTable from '../components/monitoring/EventsTable';
import ComponentsTable from '../components/monitoring/ComponentsTable';
import FilterPanel from '../components/monitoring/FilterPanel';
import SeverityDonutChart from '../components/monitoring/SeverityDonutChart';
import EventTypeBarChart from '../components/monitoring/EventTypeBarChart';
import EventTimeline from '../components/monitoring/EventTimeline';

const MonitoringPage = () => {
  const { securityEvents, components } = useSecurity();
  const [activeTab, setActiveTab] = useState('events');
  const [activeView, setActiveView] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    severity: [],
    type: [],
    status: [],
    timeRange: '24h'
  });
  const [timelineData, setTimelineData] = useState([]);
  const [severityData, setSeverityData] = useState([]);
  const [typeData, setTypeData] = useState([]);

  // Generate charts data
  useEffect(() => {
    if (securityEvents.length > 0) {
      // Severity data for donut chart
      const severityCounts = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
      securityEvents.forEach(event => {
        if (severityCounts[event.severity] !== undefined) {
          severityCounts[event.severity]++;
        }
      });
      
      const severityChartData = [
        { name: 'Critical', value: severityCounts.critical, color: '#EF4444' },
        { name: 'High', value: severityCounts.high, color: '#F97316' },
        { name: 'Medium', value: severityCounts.medium, color: '#F59E0B' },
        { name: 'Low', value: severityCounts.low, color: '#3B82F6' },
        { name: 'Info', value: severityCounts.info, color: '#6B7280' }
      ].filter(item => item.value > 0);
      
      setSeverityData(severityChartData);
      
      // Event type data for bar chart
      const typeCounts = {};
      securityEvents.forEach(event => {
        if (!typeCounts[event.type]) {
          typeCounts[event.type] = 0;
        }
        typeCounts[event.type]++;
      });
      
      const typeChartData = Object.keys(typeCounts).map(type => ({
        name: type.replace('_', ' ').toUpperCase(),
        value: typeCounts[type],
        color: getColorForEventType(type)
      }));
      
      setTypeData(typeChartData);
      
      // Timeline data
      const timeline = [];
      const now = new Date();
      const hourMs = 60 * 60 * 1000;
      
      for (let i = 23; i >= 0; i--) {
        const hourStart = new Date(now - (i * hourMs));
        hourStart.setMinutes(0, 0, 0);
        const hourEnd = new Date(hourStart.getTime() + hourMs);
        
        const hourEvents = securityEvents.filter(event => {
          const eventTime = new Date(event.timestamp);
          return eventTime >= hourStart && eventTime < hourEnd;
        });
        
        timeline.push({
          hour: hourStart.getHours(),
          time: hourStart.toLocaleTimeString('en-US', { hour: '2-digit', hour12: true }),
          total: hourEvents.length,
          blocked: hourEvents.filter(e => e.status === 'blocked').length,
          detected: hourEvents.filter(e => e.status === 'detected').length
        });
      }
      
      setTimelineData(timeline);
    }
  }, [securityEvents]);

  // Get color for event type
  const getColorForEventType = (type) => {
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

  // Filter events based on search term and filters
  const filteredEvents = securityEvents.filter(event => {
    // Search term filtering
    if (searchTerm && !event.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !event.type.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Severity filtering
    if (filters.severity.length > 0 && !filters.severity.includes(event.severity)) {
      return false;
    }
    
    // Type filtering
    if (filters.type.length > 0 && !filters.type.includes(event.type)) {
      return false;
    }
    
    // Status filtering
    if (filters.status.length > 0 && !filters.status.includes(event.status)) {
      return false;
    }
    
    // Time range filtering
    if (filters.timeRange !== 'all') {
      const eventTime = new Date(event.timestamp).getTime();
      const now = new Date().getTime();
      const hoursDiff = (now - eventTime) / (1000 * 60 * 60);
      
      switch (filters.timeRange) {
        case '1h':
          if (hoursDiff > 1) return false;
          break;
        case '6h':
          if (hoursDiff > 6) return false;
          break;
        case '24h':
          if (hoursDiff > 24) return false;
          break;
        case '7d':
          if (hoursDiff > 168) return false; // 7 * 24
          break;
        default:
          break;
      }
    }
    
    return true;
  });

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Export events as CSV
  const exportEvents = () => {
    // In a real application, this would generate a CSV file
    alert('This would export the filtered events as a CSV file');
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded shadow">
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

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Security Monitoring</h2>
          <p className="text-gray-400">Real-time visibility into security events and system status</p>
        </div>
        <div className="flex space-x-2">
          {activeTab === 'events' && (
            <div className="flex bg-gray-700 rounded-lg p-1">
              <button
                className={`flex items-center px-3 py-2 rounded-lg ${
                  activeView === 'table' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setActiveView('table')}
              >
                <List className="h-4 w-4 mr-1" />
                <span className="hidden md:inline">Table</span>
              </button>
              <button
                className={`flex items-center px-3 py-2 rounded-lg ${
                  activeView === 'timeline' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setActiveView('timeline')}
              >
                <Activity className="h-4 w-4 mr-1" />
                <span className="hidden md:inline">Timeline</span>
              </button>
              <button
                className={`flex items-center px-3 py-2 rounded-lg ${
                  activeView === 'chart' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setActiveView('chart')}
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                <span className="hidden md:inline">Charts</span>
              </button>
            </div>
          )}
          <button
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button
            className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            onClick={exportEvents}
          >
            <DownloadCloud className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <nav className="-mb-px flex">
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'events'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('events')}
          >
            Security Events
          </button>
          <button
            className={`ml-8 py-3 px-4 text-sm font-medium border-b-2 ${
              activeTab === 'components'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('components')}
          >
            System Components
          </button>
        </nav>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        <button
          className={`flex items-center px-3 py-2 rounded-lg ${
            showFilters 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <FilterPanel 
          filters={filters}
          onFilterChange={handleFilterChange}
          availableTypes={Array.from(new Set(securityEvents.map(e => e.type)))}
        />
      )}

      {/* Content based on active tab */}
      {activeTab === 'events' ? (
        <div className="space-y-6">
          {/* Stats Overview Cards */}
          {activeView !== 'table' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-blue-100 text-sm">Total Events</p>
                    <p className="text-white text-2xl font-bold">{filteredEvents.length}</p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-4 shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-green-100 text-sm">Blocked</p>
                    <p className="text-white text-2xl font-bold">
                      {filteredEvents.filter(e => e.status === 'blocked').length}
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg p-4 shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-yellow-100 text-sm">Detected</p>
                    <p className="text-white text-2xl font-bold">
                      {filteredEvents.filter(e => e.status === 'detected').length}
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-4 shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-red-100 text-sm">Critical</p>
                    <p className="text-white text-2xl font-bold">
                      {filteredEvents.filter(e => e.severity === 'critical').length}
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeView === 'table' && (
            <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
              <EventsTable events={filteredEvents} />
            </div>
          )}
          
          {activeView === 'timeline' && (
            <div className="bg-gray-800 rounded-lg p-4 shadow border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Event Timeline (Last 24 Hours)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timelineData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      name="Total Events" 
                      stroke="#6366F1"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="blocked" 
                      name="Blocked" 
                      stroke="#10B981" 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="detected" 
                      name="Detected" 
                      stroke="#F59E0B" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <EventTimeline events={filteredEvents.slice(0, 10)} />
              </div>
            </div>
          )}
          
          {activeView === 'chart' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-4 shadow border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Events by Severity</h3>
                <div className="h-72">
                  <SeverityDonutChart data={severityData} />
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 shadow border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Events by Type</h3>
                <div className="h-72">
                  <EventTypeBarChart data={typeData} />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-700">
          <ComponentsTable components={components} />
        </div>
      )}
    </div>
  );
};

export default MonitoringPage;