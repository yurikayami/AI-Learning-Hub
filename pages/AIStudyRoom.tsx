import React, { useState } from 'react';
// Fix: Import StoredItemCreation to correctly type the addToLibrary prop.
import type { StudyTab, StoredItem, StoredItemCreation } from '../types';
import SolveHomework from '../components/study/SolveHomework';
import AIChat from '../components/study/AIChat';
import Summarize from '../components/study/Summarize';
import QuizGenerator from '../components/study/QuizGenerator';

interface AIStudyRoomProps {
  initialTab: StudyTab;
  // Fix: Use StoredItemCreation to ensure the correct object shape is passed for new library items.
  addToLibrary: (itemData: StoredItemCreation) => void;
}

const AIStudyRoom: React.FC<AIStudyRoomProps> = ({ initialTab, addToLibrary }) => {
  const [activeTab, setActiveTab] = useState<StudyTab>(initialTab);

  const tabs = [
    { id: 'solve', label: 'Giải bài tập' },
    { id: 'chat', label: 'Chat AI' },
    { id: 'summary', label: 'Tóm tắt' },
    { id: 'quiz', label: 'Tạo Quiz' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'solve':
        return <SolveHomework />;
      case 'chat':
        return <AIChat addToLibrary={addToLibrary} />;
      case 'summary':
        return <Summarize addToLibrary={addToLibrary} />;
      case 'quiz':
        return <QuizGenerator addToLibrary={addToLibrary} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col pb-6">
      <div className="pt-12 lg:pt-0 mb-4 md:mb-6 flex-shrink-0">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800">Phòng học AI</h1>
        <p className="text-slate-500 text-sm md:text-base mt-1">Khu vực tập trung các công cụ học tập mạnh mẽ nhất.</p>
      </div>
      
      <div className="border-b border-slate-200 overflow-x-auto flex-shrink-0 sticky top-0 bg-white z-10">
        <nav className="-mb-px flex space-x-4 md:space-x-6 min-w-max px-1" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as StudyTab)}
              className={`${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              } whitespace-nowrap py-3 md:py-4 px-2 md:px-1 border-b-2 font-medium text-xs md:text-sm transition-colors`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="flex-1 bg-white mt-4 md:mt-6 rounded-xl shadow-sm border border-slate-100 p-4 md:p-6 overflow-y-auto min-h-0">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AIStudyRoom;
