import React, { useState, useMemo } from 'react';
import type { TodoItem, StoredItemCreation } from '../../types';
import { PlusIcon, TrashIcon, SparklesIcon, BookmarkIcon } from '../icons/Icons';
import { generateStudyPlan } from '../../services/geminiService';


interface TodolistProps {
  tasks: TodoItem[];
  setTasks: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  addToLibrary: (itemData: StoredItemCreation) => void;
}

interface StudyModule {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  color: string;
  category: string;
}

interface StudyRoadmap {
  title: string;
  category: string;
  modules: StudyModule[];
  createdDate: Date;
}

const Todolist: React.FC<TodolistProps> = ({ tasks, setTasks, addToLibrary }) => {
  const [roadmap, setRoadmap] = useState<StudyRoadmap | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  
  // State for AI generator
  const [showGenerator, setShowGenerator] = useState(true);
  const [topic, setTopic] = useState('');
  const [goal, setGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const moduleColors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'];
  
  const handleToggleModule = (id: number) => {
    if (!roadmap) return;
    setRoadmap({
      ...roadmap,
      modules: roadmap.modules.map(module => 
        module.id === id ? { ...module, completed: !module.completed } : module
      )
    });
  };

  const handleSaveRoadmap = () => {
    if (!roadmap) return;
    
    // Tạo description từ tất cả modules
    const modulesDescription = roadmap.modules
      .map((m, i) => `${i + 1}. ${m.title}: ${m.description}`)
      .join('\n');
    
    // Lưu toàn bộ lộ trình như 1 module duy nhất
    addToLibrary({
      type: 'module',
      title: roadmap.title,
      description: modulesDescription,
      category: roadmap.category,
      color: moduleColors[0],
    });
    
    setIsSaved(true);
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const handleCreateNewRoadmap = () => {
    setRoadmap(null);
    setIsSaved(false);
    setShowGenerator(true);
    setTopic('');
    setGoal('');
  };

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !goal.trim()) return;
    
    setIsGenerating(true);
    setError('');
    const result = await generateStudyPlan(topic, goal);
    
    if (typeof result === 'string') {
        setError(result);
    } else {
        const newModules: StudyModule[] = result.map((text, index) => ({
            id: Date.now() + index,
            title: text.split(':')[0] || text.substring(0, 30),
            description: text.split(':')[1]?.trim() || text,
            completed: false,
            color: moduleColors[index % moduleColors.length],
            category: topic,
        }));
        
        // Tạo roadmap mới
        setRoadmap({
          title: `Lộ trình: ${topic}`,
          category: topic,
          modules: newModules,
          createdDate: new Date(),
        });
        
        setShowGenerator(false);
    }
    setIsGenerating(false);
  };


  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col min-h-[600px]">
      {!roadmap ? (
        /* AI Generator - Create Roadmap */
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
                Tạo lộ trình học tập với AI
              </h3>
              <p className="text-sm text-slate-500">
                AI sẽ tạo lộ trình chi tiết dựa trên mục tiêu của bạn
              </p>
            </div>

            <form onSubmit={handleGeneratePlan} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Chủ đề học tập <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="VD: Ôn thi THPT môn Vật Lý"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mục tiêu của bạn <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="VD: Đạt 9+ điểm trong kỳ thi"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isGenerating || !topic.trim() || !goal.trim()}
                className="w-full bg-slate-900 text-white font-medium py-3 px-4 rounded-lg hover:bg-slate-800 transition-all shadow-sm disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Đang tạo lộ trình...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5" />
                    Tạo lộ trình ngay
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Display Roadmap */
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4 pb-4 border-b border-slate-200">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {isSaved && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Đã lưu
                  </span>
                )}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-800">{roadmap.title}</h3>
              <p className="text-xs text-slate-500 mt-1">
                {roadmap.modules.length} module · Tạo lúc {roadmap.createdDate.toLocaleString('vi-VN')}
              </p>
            </div>

            <div className="flex items-center gap-2 ml-4">
              {!isSaved && (
                <button
                  onClick={handleSaveRoadmap}
                  className="bg-slate-900 text-white font-medium py-3 px-4 rounded-lg hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2 text-sm whitespace-nowrap"
                >
                  <BookmarkIcon className="w-5 h-5" />
                  Lưu lộ trình
                </button>
              )}
              <button
                onClick={handleCreateNewRoadmap}
                className="text-slate-600 hover:text-slate-900 p-3 hover:bg-slate-100 rounded-lg transition-colors"
                title="Tạo lộ trình mới"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Module List */}
          <div className="flex-1 overflow-y-auto pr-1 -mr-1">
            <div className="space-y-3">
              {roadmap.modules.map((module, index) => (
                <div
                  key={module.id}
                  className="relative bg-white border-2 border-slate-200 rounded-lg p-4 transition-all hover:border-slate-300"
                >
                  {/* Color Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${module.color} rounded-t-lg`}></div>

                  {/* Content */}
                  <div className="flex items-start gap-3 mt-1">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                      </div>
                      <h4 className="font-semibold text-sm mb-1 text-slate-800">
                        {module.title}
                      </h4>
                      <p className="text-xs text-slate-600">
                        {module.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Save Notification */}
      {showSaveNotification && (
        <div className="fixed bottom-4 right-4 bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-slide-up z-50 border border-green-400">
          <div className="bg-white/20 p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold">Lưu thành công!</p>
            <p className="text-xs opacity-90">Lộ trình đã được thêm vào thư viện</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todolist;