import React from 'react';

const SecurityStatusCard = ({ title, value, icon, color, textColor }) => {
  return (
    <div className={`rounded-lg shadow overflow-hidden`}>
      <div className={`bg-gradient-to-r ${color} p-4`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${textColor} opacity-90`}>{title}</p>
            <p className="mt-1 text-3xl font-bold text-white">{value}</p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-lg">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityStatusCard;
