import React, { useState, useMemo } from 'react';
import type { TodoItem } from '../../types';
import { PlusIcon, TrashIcon, SparklesIcon } from '../icons/Icons';
import { generateStudyPlan } from '../../services/geminiService';


interface TodolistProps {
  tasks: TodoItem[];
  setTasks: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const Todolist: React.FC<TodolistProps> = ({ tasks, setTasks }) => {
  const [newTaskText, setNewTaskText] = useState('');
  
  // State for AI generator
  const [showGenerator, setShowGenerator] = useState(false);
  const [topic, setTopic] = useState('');
  const [goal, setGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const completedCount = useMemo(() => tasks.filter(t => t.completed).length, [tasks]);
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      const newTask: TodoItem = {
        id: Date.now(),
        text: newTaskText,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
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
        const newTasks = result.map((text, index) => ({
            id: Date.now() + index,
            text,
            completed: false,
        }));
        setTasks(newTasks);
        setShowGenerator(false); // Hide form on success
        setTopic('');
        setGoal('');
    }
    setIsGenerating(false);
  };


  return (
    <div className="bg-white p-6 rounded-xl shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-800">Lộ trình học tập</h3>
      <p className="text-sm text-slate-500 mb-4">Các mục tiêu và nhiệm vụ cần hoàn thành.</p>
      
      {/* AI Generator Section */}
      <div className="mb-4">
        <button onClick={() => setShowGenerator(!showGenerator)} className="flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors w-full text-left p-2 rounded-lg hover:bg-indigo-50">
            <SparklesIcon className="w-5 h-5 mr-2 flex-shrink-0" />
            <span>{showGenerator ? 'Ẩn trình tạo kế hoạch AI' : 'Tạo lộ trình học tập với AI'}</span>
        </button>
        {showGenerator && (
            <div className="bg-slate-50 p-4 rounded-md mt-2 border border-slate-200">
                <form onSubmit={handleGeneratePlan}>
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Chủ đề học tập</label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="VD: Ôn thi THPT môn Lý"
                                className="mt-1 w-full p-2 border bg-white border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                            />
                        </div>
                         <div>
                            <label className="text-sm font-medium text-slate-700">Mục tiêu của bạn</label>
                            <input
                                type="text"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                placeholder="VD: Đạt 9+ điểm"
                                className="mt-1 w-full p-2 border bg-white border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                    <button type="submit" disabled={isGenerating || !topic.trim() || !goal.trim()} className="w-full mt-3 bg-indigo-600 text-white font-semibold py-2 px-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center text-sm">
                        {isGenerating ? (
                           <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                             Đang tạo...
                           </>
                        ) : 'Tạo lộ trình'}
                    </button>
                </form>
            </div>
        )}
      </div>

      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Hoặc thêm mục tiêu thủ công..."
          className="flex-grow p-2 border bg-white border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
        <button type="submit" className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors flex-shrink-0">
            <PlusIcon className="w-6 h-6" />
        </button>
      </form>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-slate-600">Tiến độ</span>
          <span className="text-sm font-bold text-indigo-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-2">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 group">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <span className={`ml-3 text-slate-700 ${task.completed ? 'line-through text-slate-400' : ''}`}>
                {task.text}
              </span>
            </div>
            <button onClick={() => handleDeleteTask(task.id)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
            <p className="text-center text-slate-400 mt-8">Chưa có mục tiêu nào. Hãy bắt đầu ngay!</p>
        )}
      </div>
    </div>
  );
};

export default Todolist;