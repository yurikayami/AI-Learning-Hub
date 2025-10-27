
import React from 'react';
import DashboardCard from '../components/DashboardCard';
import { SparklesIcon } from '../components/icons/Icons';
import type { StudyTab } from '../types';

interface DashboardProps {
  navigateToStudyRoom: (tab: StudyTab) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ navigateToStudyRoom }) => {
  const tools = [
    {
      title: 'Giải bài tập từ ảnh',
      description: 'Chụp ảnh hoặc tải lên bài tập, AI sẽ giải chi tiết.',
      tab: 'solve',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Chat AI Giải đáp',
      description: 'Hỏi đáp mọi thắc mắc về bài học với gia sư AI.',
      tab: 'chat',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Tóm tắt Nội dung',
      description: 'Tự động rút gọn văn bản, tài liệu dài thành các ý chính.',
      tab: 'summary',
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Tạo Câu hỏi Trắc nghiệm',
      description: 'Biến tài liệu học tập thành một bài quiz để ôn luyện.',
      tab: 'quiz',
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Bảng điều khiển</h1>
        <p className="text-slate-500 mt-1">Chào mừng trở lại! Bắt đầu học tập hiệu quả ngay thôi.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <DashboardCard
            key={tool.tab}
            title={tool.title}
            description={tool.description}
            icon={<SparklesIcon className="w-6 h-6" />}
            onClick={() => navigateToStudyRoom(tool.tab as StudyTab)}
            color={tool.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-slate-800">Lịch học hôm nay</h3>
          <div className="mt-4 text-center text-slate-400 py-10 border-2 border-dashed rounded-lg">
            <p>Không có lịch học nào cho hôm nay.</p>
            <button className="mt-2 text-sm text-indigo-600 font-semibold">Tạo kế hoạch mới</button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-slate-800">Tiến độ học tập</h3>
          <div className="mt-4 text-center text-slate-400 py-10 border-2 border-dashed rounded-lg">
             <p>Dữ liệu đang được cập nhật.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
