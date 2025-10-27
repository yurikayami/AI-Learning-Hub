
import React from 'react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 pb-6">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-100 w-full max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">{title}</h1>
        <p className="text-slate-500 mt-2 text-sm md:text-base">{description}</p>
        <div className="mt-6 md:mt-8 text-5xl md:text-6xl text-slate-300">
          🚧
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
