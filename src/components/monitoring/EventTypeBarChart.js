import React from 'react';
import { BarChart, Cell, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EventTypeBarChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded shadow">
          <p className="text-gray-300 font-medium">{label}</p>
          <p style={{ color: item.payload.color }} className="text-sm">
            {`Count: ${item.value}`}
          </p>
          <p style={{ color: item.payload.color }} className="text-sm">
            {`Percentage: ${((item.value / data.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1)}%`}
          </p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" horizontal={false} />
        <XAxis type="number" stroke="#9CA3AF" />
        <YAxis 
          dataKey="name" 
          type="category" 
          stroke="#9CA3AF" 
          width={100}
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar 
          dataKey="value" 
          name="Count" 
          radius={[0, 4, 4, 0]}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EventTypeBarChart;