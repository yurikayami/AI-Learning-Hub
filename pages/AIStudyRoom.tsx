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
    <div className="h-full flex flex-col">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Phòng học AI</h1>
      <p className="text-slate-500 mb-6">Khu vực tập trung các công cụ học tập mạnh mẽ nhất.</p>
      
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as StudyTab)}
              className={`${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="flex-grow bg-white mt-6 rounded-xl shadow-sm p-6 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AIStudyRoom;
