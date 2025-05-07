import React, { useState } from 'react';
import { PlayCircle, CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';

const SystemTestResults = ({ results, onRunTest }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };
  
  const getTestSummary = () => {
    if (!results || results.results.length === 0) return null;
    
    const total = results.results.length;
    const success = results.results.filter(r => r.status === 'success').length;
    const warnings = results.results.filter(r => r.status === 'warning').length;
    const errors = results.results.filter(r => r.status === 'error').length;
    
    return { total, success, warnings, errors };
  };
  
  const summary = getTestSummary();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">System Integration Tests</h3>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={onRunTest}
          disabled={results && results.status === 'running'}
        >
          {results && results.status === 'running' ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4 mr-2" />
              Run Tests
            </>
          )}
        </button>
      </div>
      
      {results && (
        <div>
          {results.status === 'running' && (
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-300">Running tests...</span>
                <span className="text-sm text-gray-300">{Math.round(results.progress)}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${results.progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {results.status === 'completed' && summary && (
            <div className="mb-4 grid grid-cols-4 gap-4">
              <div className="bg-gray-800 p-3 rounded text-center">
                <p className="text-sm text-gray-400">Total Tests</p>
                <p className="text-2xl font-semibold text-white">{summary.total}</p>
              </div>
              <div className="bg-gray-800 p-3 rounded text-center">
                <p className="text-sm text-gray-400">Passed</p>
                <p className="text-2xl font-semibold text-green-500">{summary.success}</p>
              </div>
              <div className="bg-gray-800 p-3 rounded text-center">
                <p className="text-sm text-gray-400">Warnings</p>
                <p className="text-2xl font-semibold text-yellow-500">{summary.warnings}</p>
              </div>
              <div className="bg-gray-800 p-3 rounded text-center">
                <p className="text-sm text-gray-400">Errors</p>
                <p className="text-2xl font-semibold text-red-500">{summary.errors}</p>
              </div>
            </div>
          )}
          
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3">Test Results</h4>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.results.map((result) => (
                <div 
                  key={result.id} 
                  className={`p-3 rounded-md flex items-start ${
                    result.status === 'success' 
                      ? 'bg-green-900 bg-opacity-20' 
                      : result.status === 'warning'
                      ? 'bg-yellow-900 bg-opacity-20'
                      : 'bg-red-900 bg-opacity-20'
                  }`}
                >
                  <div className="mr-3 mt-0.5">
                    {getStatusIcon(result.status)}
                  </div>
                  <div>
                    <p className="text-white text-sm">{result.description}</p>
                    <p className="text-gray-400 text-xs">
                      Component: {result.component}
                    </p>
                  </div>
                  <div className="ml-auto text-xs text-gray-400">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
              
              {results.results.length === 0 && (
                <p className="text-gray-400 text-center p-4">No test results yet</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {!results && (
        <div className="text-center p-8 text-gray-400">
          <p>Run system tests to verify integration status</p>
        </div>
      )}
    </div>
  );
};

export default SystemTestResults;