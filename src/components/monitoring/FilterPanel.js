import React from 'react';

const FilterPanel = ({ filters, onFilterChange, availableTypes }) => {
  const severityOptions = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
    { value: 'info', label: 'Info' }
  ];

  const statusOptions = [
    { value: 'blocked', label: 'Blocked' },
    { value: 'detected', label: 'Detected' },
    { value: 'success', label: 'Success' }
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: 'all', label: 'All Time' }
  ];

  const typeOptions = availableTypes.map(type => ({
    value: type,
    label: type.replace('_', ' ').toUpperCase()
  }));

  const handleSeverityChange = (severity) => {
    if (filters.severity.includes(severity)) {
      onFilterChange('severity', filters.severity.filter(s => s !== severity));
    } else {
      onFilterChange('severity', [...filters.severity, severity]);
    }
  };

  const handleTypeChange = (type) => {
    if (filters.type.includes(type)) {
      onFilterChange('type', filters.type.filter(t => t !== type));
    } else {
      onFilterChange('type', [...filters.type, type]);
    }
  };

  const handleStatusChange = (status) => {
    if (filters.status.includes(status)) {
      onFilterChange('status', filters.status.filter(s => s !== status));
    } else {
      onFilterChange('status', [...filters.status, status]);
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 shadow">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Severity Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Severity</h4>
          <div className="space-y-1">
            {severityOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-500 bg-gray-800 focus:ring-blue-500"
                  checked={filters.severity.includes(option.value)}
                  onChange={() => handleSeverityChange(option.value)}
                />
                <span className="ml-2 text-sm text-gray-300">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Event Type Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Event Type</h4>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {typeOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-500 bg-gray-800 focus:ring-blue-500"
                  checked={filters.type.includes(option.value)}
                  onChange={() => handleTypeChange(option.value)}
                />
                <span className="ml-2 text-sm text-gray-300">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Status</h4>
          <div className="space-y-1">
            {statusOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-500 bg-gray-800 focus:ring-blue-500"
                  checked={filters.status.includes(option.value)}
                  onChange={() => handleStatusChange(option.value)}
                />
                <span className="ml-2 text-sm text-gray-300">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Time Range Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Time Range</h4>
          <select
            className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.timeRange}
            onChange={(e) => onFilterChange('timeRange', e.target.value)}
          >
            {timeRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;