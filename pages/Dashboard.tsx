
import React, { useMemo } from 'react';
import DashboardCard from '../components/DashboardCard';
import { SparklesIcon } from '../components/icons/Icons';
import type { StudyTab, StoredItem } from '../types';

interface DashboardProps {
  navigateToStudyRoom: (tab: StudyTab) => void;
  libraryItems: StoredItem[];
}

const Dashboard: React.FC<DashboardProps> = ({ navigateToStudyRoom, libraryItems }) => {
  // Calculate statistics from real data
  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get today's activities
    const todayItems = libraryItems.filter(item => {
      const itemDate = new Date(item.timestamp);
      itemDate.setHours(0, 0, 0, 0);
      return itemDate.getTime() === today.getTime();
    });

    // Calculate quiz statistics
    const quizItems = libraryItems.filter(item => item.type === 'quiz');
    const totalQuestions = quizItems.reduce((sum, item) => sum + (item.quizData?.length || 0), 0);
    const totalCorrect = quizItems.reduce((sum, item) => sum + (item.score || 0), 0);
    const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    // Calculate study streak
    let currentStreak = 0;
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const hasActivity = libraryItems.some(item => {
        const itemDate = new Date(item.timestamp);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === date.getTime();
      });
      
      if (hasActivity) {
        currentStreak++;
      } else if (i > 0) {
        break;
      }
    }

    // Calculate total study time
    let totalStudyMinutes = 0;
    if (libraryItems.length > 1) {
      const sortedItems = [...libraryItems].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      
      for (let i = 1; i < sortedItems.length; i++) {
        const timeDiff = new Date(sortedItems[i].timestamp).getTime() - new Date(sortedItems[i - 1].timestamp).getTime();
        const minutes = Math.min(timeDiff / (1000 * 60), 60);
        totalStudyMinutes += minutes;
      }
    }

    // Get recent activities by type
    const activityByType = {
      solve: libraryItems.filter(item => item.type === 'solve').length,
      chat: libraryItems.filter(item => item.type === 'chat').length,
      summary: libraryItems.filter(item => item.type === 'summary').length,
      quiz: quizItems.length,
    };

    return {
      todayItems,
      todayCount: todayItems.length,
      totalActivities: libraryItems.length,
      averageScore,
      currentStreak,
      totalStudyMinutes: Math.round(totalStudyMinutes),
      activityByType,
      totalQuizzes: quizItems.length,
    };
  }, [libraryItems]);

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
    <div className="space-y-6 md:space-y-8 pb-6 relative">
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="pt-12 lg:pt-0">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 flex items-center gap-3">
          Bảng điều khiển
          <span className="inline-block animate-pulse">✨</span>
        </h1>
        <p className="text-slate-500 mt-1 text-sm md:text-base">Chào mừng trở lại! Bắt đầu học tập hiệu quả ngay thôi.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {tools.map((tool) => (
          <DashboardCard
            key={tool.tab}
            title={tool.title}
            description={tool.description}
            icon={<SparklesIcon className="w-5 h-5 md:w-6 md:h-6" />}
            onClick={() => navigateToStudyRoom(tool.tab as StudyTab)}
            color={tool.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white to-slate-50 p-4 md:p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-bold text-slate-800 flex items-center gap-2">
              📅 Hoạt động hôm nay
            </h3>
            <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
              {stats.todayCount} hoạt động
            </span>
          </div>
          
          {stats.todayCount > 0 ? (
            <div className="space-y-3">
              {stats.todayItems.slice(0, 3).map((item, idx) => (
                <div key={item.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-indigo-300 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {item.type === 'quiz' ? '📝' : item.type === 'summary' ? '📄' : item.type === 'chat' ? '💬' : '✍️'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">
                      {item.type === 'quiz' ? 'Đã làm Quiz' : 
                       item.type === 'summary' ? 'Đã tóm tắt' : 
                       item.type === 'chat' ? 'Đã chat với AI' : 
                       'Đã giải bài tập'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(item.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {item.type === 'quiz' && item.score !== undefined && item.quizData && (
                    <div className="flex-shrink-0 text-right">
                      <p className="text-sm font-bold text-indigo-600">
                        {Math.round((item.score / item.quizData.length) * 100)}%
                      </p>
                    </div>
                  )}
                </div>
              ))}
              {stats.todayCount > 3 && (
                <p className="text-xs text-center text-slate-500 pt-2">
                  và {stats.todayCount - 3} hoạt động khác...
                </p>
              )}
            </div>
          ) : (
            <div className="text-center text-slate-400 py-8 md:py-10 border-2 border-dashed border-slate-200 rounded-lg bg-white/50">
              <p className="text-3xl mb-3">🌟</p>
              <p className="text-sm md:text-base font-medium">Chưa có hoạt động nào hôm nay.</p>
              <button 
                onClick={() => navigateToStudyRoom('solve')}
                className="mt-3 text-sm text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
              >
                Bắt đầu học ngay →
              </button>
            </div>
          )}
        </div>

        {/* Study Progress */}
        <div className="bg-gradient-to-br from-white to-indigo-50 p-4 md:p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
          <h3 className="text-base md:text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            📊 Tiến độ học tập
          </h3>
          
          {stats.totalActivities > 0 ? (
            <div className="space-y-4">
              {/* Circular Progress */}
              <div className="flex items-center justify-center py-3">
                <div className="relative w-28 h-28">
                  <svg className="transform -rotate-90 w-28 h-28">
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-slate-200"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * (1 - stats.averageScore / 100)}`}
                      className="text-indigo-600 transition-all duration-1000"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{stats.averageScore}%</p>
                      <p className="text-xs text-slate-500">Quiz</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-500 font-medium mb-1">Streak</p>
                  <p className="text-xl font-bold text-slate-900 flex items-center gap-1">
                    🔥 {stats.currentStreak}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-500 font-medium mb-1">Tổng</p>
                  <p className="text-xl font-bold text-slate-900">{stats.totalActivities}</p>
                </div>
              </div>

              {/* Study Time */}
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-500 font-medium mb-2">Thời gian học</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-indigo-600">
                    {Math.floor(stats.totalStudyMinutes / 60)}
                  </p>
                  <p className="text-sm text-slate-600">giờ</p>
                  <p className="text-xl font-bold text-indigo-600">
                    {stats.totalStudyMinutes % 60}
                  </p>
                  <p className="text-sm text-slate-600">phút</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400 py-8 md:py-10 border-2 border-dashed border-slate-200 rounded-lg bg-white/50">
              <p className="text-3xl mb-3">📈</p>
              <p className="text-sm md:text-base font-medium">Chưa có dữ liệu.</p>
              <p className="text-xs mt-2 text-slate-400">Bắt đầu học để xem tiến độ</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
