import React, { useState } from 'react';
import { useSecurity } from '../contexts/SecurityContext';
import { Search, Filter, DownloadCloud, RefreshCw } from 'lucide-react';

// Components
import EventsTable from '../components/monitoring/EventsTable';
import ComponentsTable from '../components/monitoring/ComponentsTable';
import FilterPanel from '../components/monitoring/FilterPanel';

const MonitoringPage = () => {
  const { securityEvents, components } = useSecurity();
  const [activeTab, setActiveTab] = useState('events');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    severity: [],
    type: [],
    status: [],
    timeRange: '24h'
  });

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

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Security Monitoring</h2>
        <div className="flex space-x-2">
          <button
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button
            className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
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
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        <button
          className="flex items-center px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
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
      <div className="bg-gray-700 rounded-lg shadow overflow-hidden">
        {activeTab === 'events' ? (
          <EventsTable events={filteredEvents} />
        ) : (
          <ComponentsTable components={components} />
        )}
      </div>
    </div>
  );
};

export default MonitoringPage;