
import React, { useState } from 'react';
import type { TodoItem, StoredItemCreation } from '../types';
import Todolist from '../components/planner/Todolist';

// Dữ liệu mẫu ban đầu
const initialTodos: TodoItem[] = [
  { id: 1, text: 'Hoàn thành chương 1: Dao động cơ', completed: true },
  { id: 2, text: 'Làm bài tập trắc nghiệm về Sóng âm', completed: false },
  { id: 3, text: 'Xem video bài giảng về Mạch điện xoay chiều', completed: false },
];

interface MyPlannerProps {
  addToLibrary: (itemData: StoredItemCreation) => void;
}

const MyPlanner: React.FC<MyPlannerProps> = ({ addToLibrary }) => {
  const [tasks, setTasks] = useState<TodoItem[]>(initialTodos);

  return (
    <div className="space-y-6 md:space-y-8 pb-6">
      <div className="pt-12 lg:pt-0">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800">Kế hoạch của tôi</h1>
        <p className="text-slate-500 mt-1 text-sm md:text-base">Tổ chức lộ trình và quản lý thời gian học tập của bạn.</p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Todolist tasks={tasks} setTasks={setTasks} addToLibrary={addToLibrary} />
      </div>
    </div>
  );
};

export default MyPlanner;
