
import React from 'react';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon, onClick, color }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <h3 className="text-lg font-bold mt-4 text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </div>
      <div className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
        Bắt đầu →
      </div>
    </div>
  );
};

export default DashboardCard;
