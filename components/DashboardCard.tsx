
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
      className="relative bg-white/70 backdrop-blur-lg p-4 md:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between border border-white/20 hover:border-indigo-300/50 transform hover:-translate-y-2 hover:scale-[1.02] group overflow-hidden"
    >
      {/* Gradient overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center ${color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-md`}>
          {icon}
        </div>
        <h3 className="text-base md:text-lg font-bold mt-3 md:mt-4 text-slate-800 group-hover:text-indigo-700 transition-colors">{title}</h3>
        <p className="text-xs md:text-sm text-slate-500 mt-1 line-clamp-2">{description}</p>
      </div>
      <div className="relative z-10 mt-3 md:mt-4 text-xs md:text-sm font-semibold text-indigo-600 group-hover:text-indigo-800 transition-all flex items-center gap-1">
        Bắt đầu 
        <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );
};

export default DashboardCard;
