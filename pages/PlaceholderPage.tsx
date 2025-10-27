
import React from 'react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="bg-white p-12 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
        <p className="text-slate-500 mt-2 max-w-md">{description}</p>
        <div className="mt-8 text-6xl text-slate-300">
          🚧
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
