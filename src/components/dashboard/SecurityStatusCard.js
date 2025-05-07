import React from 'react';

const SecurityStatusCard = ({ title, value, icon, color, textColor }) => {
  return (
    <div className={`rounded-lg shadow p-4 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${textColor}`}>{title}</p>
          <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div>{icon}</div>
      </div>
    </div>
  );
};

export default SecurityStatusCard;