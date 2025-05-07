// src/components/monitoring/ComponentsTable.js
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, CheckCircle, AlertCircle, AlertTriangle, Clock, BarChart } from 'lucide-react';

const ComponentsTable = ({ components }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [expandedComponent, setExpandedComponent] = useState(null);

  // Sort components
  const sortedComponents = [...components].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'status') {
      const statusOrder = { critical: 0, warning: 1, maintenance: 2, operational: 3 };
      comparison = statusOrder[a.status] - statusOrder[b.status];
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
      setSortDirection('asc');
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  // Get status indicator
  const getStatusIndicator = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'maintenance':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get status text and color
  const getStatusText = (status) => {
    switch (status) {
      case 'operational':
        return <span className="text-green-500">Operational</span>;
      case 'warning':
        return <span className="text-yellow-500">Warning</span>;
      case 'critical':
        return <span className="text-red-500">Critical</span>;
      case 'maintenance':
        return <span className="text-blue-500">Maintenance</span>;
      default:
        return <span className="text-gray-500">Unknown</span>;
    }
  };

  // Toggle component details
  const toggleComponentDetails = (componentId) => {
    setExpandedComponent(expandedComponent === componentId ? null : componentId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-600">
        <thead className="bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              <button
                className="flex items-center font-medium focus:outline-none"
                onClick={() => handleSort('name')}
              >
                Name {getSortIcon('name')}
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
                onClick={() => handleSort('status')}
              >
                Status {getSortIcon('status')}
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Version
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Last Updated
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-700 divide-y divide-gray-600">
          {sortedComponents.map((component) => (
            <React.Fragment key={component.id}>
              <tr className="hover:bg-gray-650 cursor-pointer" onClick={() => toggleComponentDetails(component.id)}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {component.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">
                  {component.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIndicator(component.status)}
                    <span className="ml-1 text-sm">
                      {getStatusText(component.status)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {component.version}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(component.lastUpdated).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleComponentDetails(component.id);
                    }}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <BarChart className="h-5 w-5" />
                  </button>
                </td>
              </tr>
              {expandedComponent === component.id && (
                <tr className="bg-gray-750">
                  <td colSpan="6" className="px-6 py-4">
                    <div className="bg-gray-800 rounded-md p-4">
                      <h4 className="text-lg font-medium text-white mb-2">{component.name} Details</h4>
                      <p className="text-sm text-gray-300 mb-4">{component.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {component.metrics && Object.entries(component.metrics).map(([key, value]) => (
                          <div key={key} className="bg-gray-700 p-3 rounded">
                            <p className="text-xs text-gray-400 uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                            <p className="text-lg font-semibold text-white">{value}</p>
                          </div>
                        ))}
                      </div>
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

export default ComponentsTable;