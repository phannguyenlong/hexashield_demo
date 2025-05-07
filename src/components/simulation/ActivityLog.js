import React from 'react';
import { AlertCircle, AlertTriangle, Shield, Info, Terminal, CheckCircle, XCircle } from 'lucide-react';

const ActivityLog = ({ events, simulationActive }) => {
  const getEventIcon = (event) => {
    switch (event.type) {
      case 'sql_injection':
      case 'xss':
      case 'ldap_injection':
        return event.status === 'blocked' 
          ? <Shield className="h-5 w-5 text-green-500" />
          : <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'defense':
        return <Shield className="h-5 w-5 text-blue-500" />;
      case 'scan':
        return <Terminal className="h-5 w-5 text-purple-500" />;
      case 'system_update':
        return <Info className="h-5 w-5 text-blue-400" />;
      default:
        return <Info className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg shadow h-full">
      <div className="p-4 border-b border-gray-600">
        <h3 className="text-xl font-semibold text-white">Activity Log</h3>
      </div>
      <div className="p-2 overflow-auto" style={{ maxHeight: '400px' }}>
        <div className="space-y-2">
          {!simulationActive && events.length === 0 ? (
            <div className="text-center p-4 text-gray-400">
              No events recorded yet. Start a simulation to see activity.
            </div>
          ) : events.length === 0 ? (
            <div className="text-center p-4 text-gray-400">
              Waiting for security events...
            </div>
          ) : (
            events.map((event) => (
              <div 
                key={event.id} 
                className="p-2 rounded bg-gray-800 border-l-4 border-gray-600"
              >
                <div className="flex items-start">
                  <div className="mr-2 mt-1">
                    {getEventIcon(event)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{event.description}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-400">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </p>
                      {event.status && (
                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                          event.status === 'blocked' 
                            ? 'bg-green-900 text-green-100' 
                            : event.status === 'detected'
                            ? 'bg-yellow-900 text-yellow-100'
                            : 'bg-blue-900 text-blue-100'
                        }`}>
                          {event.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;