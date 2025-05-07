import React from 'react';
import { CheckCircle, XCircle, BarChart2, Info, RefreshCw } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const SimulationResults = ({ results }) => {
  if (!results) return null;
  
  const pieData = [
    { name: 'Blocked', value: results.blockedAttacks },
    { name: 'Successful', value: results.totalAttacks - results.blockedAttacks }
  ];
  
  const COLORS = ['#0088FE', '#FF8042'];
  
  return (
    <div className="bg-gray-700 rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-600">
        <h3 className="text-xl font-semibold text-white">Simulation Results</h3>
        <p className="text-gray-300 text-sm">
          {results.attackType.replace('_', ' ')} attack simulation
        </p>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h4 className="text-lg font-medium text-white mb-3">Key Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-3 rounded">
                  <p className="text-sm text-gray-400">Total Attacks</p>
                  <p className="text-2xl font-semibold text-white">{results.totalAttacks}</p>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <p className="text-sm text-gray-400">Blocked Attacks</p>
                  <p className="text-2xl font-semibold text-green-400">{results.blockedAttacks}</p>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <p className="text-sm text-gray-400">Success Rate</p>
                  <p className="text-2xl font-semibold text-blue-400">{results.successRate.toFixed(1)}%</p>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <p className="text-sm text-gray-400">Duration</p>
                  <p className="text-2xl font-semibold text-white">
                    {Math.round(results.duration / 1000)}s
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-white mb-3">Recommendations</h4>
              <div className="bg-gray-800 p-3 rounded">
                <ul className="space-y-2">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <Info className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Attack Defense Analysis</h4>
            <div className="bg-gray-800 p-4 rounded h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', borderColor: '#555' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex justify-end">
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
      </div>
    </div>
  );
};

export default SimulationResults;