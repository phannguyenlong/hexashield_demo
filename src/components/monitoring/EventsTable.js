import React, { useState } from 'react';
import { ChevronUp, ChevronDown, AlertCircle, AlertTriangle, Info, CheckCircle, Eye } from 'lucide-react';

const EventsTable = ({ events }) => {
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [expandedEvent, setExpandedEvent] = useState(null);

  // Sort events
  const sortedEvents = [...events].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'timestamp') {
      comparison = new Date(a.timestamp) - new Date(b.timestamp);
    } else if (sortField === 'severity') {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
      comparison = severityOrder[a.severity] - severityOrder[b.severity];
    } else {
      comparison = a[sortField] > b[sortField] ? 1 : -1;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Toggle sort direction
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  // Get severity icon
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-gray-400" />;
      default:
        return <Info className="h-5 w-5 text-gray-400" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'blocked':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Blocked
          </span>
        );
      case 'detected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Detected
          </span>
        );
      case 'success':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Success
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Toggle event details
  const toggleEventDetails = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-600">
        <thead className="bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              <button
                className="flex items-center font-medium focus:outline-none"
                onClick={() => handleSort('timestamp')}
              >
                Time {getSortIcon('timestamp')}
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              <button
                className="flex items-center font-medium focus:outline-none"
                onClick={() => handleSort('type')}
              >
                Type {getSortIcon('type')}
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              <button
                className="flex items-center font-medium focus:outline-none"
                onClick={() => handleSort('severity')}
              >
                Severity {getSortIcon('severity')}
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              <button
                className="flex items-center font-medium focus:outline-none"
                onClick={() => handleSort('status')}
              >
                Status {getSortIcon('status')}
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Source
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-700 divide-y divide-gray-600">
          {sortedEvents.map((event) => (
            <React.Fragment key={event.id}>
              <tr className="hover:bg-gray-650">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {formatTimestamp(event.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {event.type.replace('_', ' ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getSeverityIcon(event.severity)}
                    <span className="ml-1 text-sm text-gray-300 capitalize">
                      {event.severity}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(event.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {event.source}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {event.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    onClick={() => toggleEventDetails(event.id)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </td>
              </tr>
              {expandedEvent === event.id && (
                <tr className="bg-gray-750">
                  <td colSpan="7" className="px-6 py-4">
                    <div className="bg-gray-800 rounded-md p-4">
                      <h4 className="text-lg font-medium text-white mb-2">Event Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-400">Event ID</p>
                          <p className="text-sm text-white">{event.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Timestamp</p>
                          <p className="text-sm text-white">{formatTimestamp(event.timestamp)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Source</p>
                          <p className="text-sm text-white">{event.source}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Target</p>
                          <p className="text-sm text-white">{event.target || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Type</p>
                          <p className="text-sm text-white capitalize">{event.type.replace('_', ' ')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Severity</p>
                          <p className="text-sm text-white capitalize">{event.severity}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-gray-400">Description</p>
                        <p className="text-sm text-white">{event.description}</p>
                      </div>
                      
                      {event.details && Object.keys(event.details).length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-400 mb-1">Additional Details</p>
                          <div className="bg-gray-900 p-3 rounded overflow-x-auto">
                            <pre className="text-xs text-gray-300">
                              {JSON.stringify(event.details, null, 2)}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;