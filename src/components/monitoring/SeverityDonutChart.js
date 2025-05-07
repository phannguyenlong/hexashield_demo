import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const SeverityDonutChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded shadow">
          <p className="text-gray-300 font-medium">{item.name}</p>
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
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="bottom" height={40} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SeverityDonutChart;