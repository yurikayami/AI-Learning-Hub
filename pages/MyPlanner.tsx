
import React, { useState } from 'react';
import type { TodoItem } from '../types';
import Todolist from '../components/planner/Todolist';
import Calendar from '../components/planner/Calendar';

// Dữ liệu mẫu ban đầu
const initialTodos: TodoItem[] = [
  { id: 1, text: 'Hoàn thành chương 1: Dao động cơ', completed: true },
  { id: 2, text: 'Làm bài tập trắc nghiệm về Sóng âm', completed: false },
  { id: 3, text: 'Xem video bài giảng về Mạch điện xoay chiều', completed: false },
];

const MyPlanner: React.FC = () => {
  const [tasks, setTasks] = useState<TodoItem[]>(initialTodos);

  return (
    <div className="space-y-6 md:space-y-8 pb-6">
      <div className="pt-12 lg:pt-0">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800">Kế hoạch của tôi</h1>
        <p className="text-slate-500 mt-1 text-sm md:text-base">Tổ chức lộ trình và quản lý thời gian học tập của bạn.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
        <div className="lg:col-span-2 order-2 lg:order-1">
            <Todolist tasks={tasks} setTasks={setTasks} />
        </div>
        <div className="lg:col-span-3 order-1 lg:order-2">
            <Calendar />
        </div>
      </div>
    </div>
  );
};

export default MyPlanner;
