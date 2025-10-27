import React, { useMemo } from 'react';
import type { StoredItem } from '../types';

interface AnalyticsPageProps {
  libraryItems: StoredItem[];
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ libraryItems }) => {
  // Calculate all statistics based on real library data
  const stats = useMemo(() => {
    const totalItems = libraryItems.length;
    const quizItems = libraryItems.filter(item => item.type === 'quiz');
    const summaryItems = libraryItems.filter(item => item.type === 'summary');
    const chatItems = libraryItems.filter(item => item.type === 'chat');
    const solveItems = libraryItems.filter(item => item.type === 'solve');

    // Calculate quiz statistics from real data
    const totalQuizzes = quizItems.length;
    const totalQuestions = quizItems.reduce((sum, item) => sum + (item.quizData?.length || 0), 0);
    const totalCorrect = quizItems.reduce((sum, item) => sum + (item.score || 0), 0);
    const averageScore = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(1) : '0';

    // Calculate actual study time based on timestamps
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

    // Calculate actual streak based on consecutive days with activity
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
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

    return {
      totalItems,
      quizItems,
      summaryItems,
      chatItems,
      solveItems,
      totalQuizzes,
      totalQuestions,
      totalCorrect,
      averageScore,
      totalStudyMinutes: Math.round(totalStudyMinutes),
      streak: currentStreak
    };
  }, [libraryItems]);

  // Get recent activity (last 7 days) based on real data
  const activityData = useMemo(() => {
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const today = new Date();
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const dayName = days[date.getDay()];
      
      // Count items created on this day from real library data
      const count = libraryItems.filter(item => {
        const itemDate = new Date(item.timestamp);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === date.getTime();
      }).length;

      last7Days.push({ 
        day: dayName, 
        count, 
        date: date.toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' }) 
      });
    }

    return last7Days;
  }, [libraryItems]);

  const maxActivity = Math.max(...activityData.map(d => d.count), 1);

  const StatCard = ({ title, value, subtitle, icon }: any) => (
    <div className="bg-white border border-slate-200 p-5 md:p-6 rounded-lg hover:border-slate-300 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">{title}</p>
          <p className="text-3xl md:text-4xl font-bold text-slate-900">{value}</p>
          {subtitle && <p className="text-sm text-slate-600 mt-2">{subtitle}</p>}
        </div>
        <div className="text-2xl text-slate-400">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 md:space-y-8 pb-6">
      {/* Header with Logo */}
      <div className="pt-12 lg:pt-0 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
          <p className="text-slate-600 mt-1 text-sm md:text-base">Báo cáo chi tiết về hoạt động học tập</p>
        </div>
        <div className="hidden md:block">
          <img src="/components/icons/logo.png" alt="Logo" className="h-12 w-auto" />
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <StatCard
          title="Tổng hoạt động"
          value={stats.totalItems}
          subtitle="Tài liệu"
          icon="�"
        />
        <StatCard
          title="Thời gian"
          value={`${Math.floor(stats.totalStudyMinutes / 60)}h ${stats.totalStudyMinutes % 60}m`}
          subtitle="Thời lượng học"
          icon="⏱"
        />
        <StatCard
          title="Streak"
          value={`${stats.streak}`}
          subtitle="Ngày liên tục"
          icon="�"
        />
        <StatCard
          title="Điểm TB"
          value={`${stats.averageScore}%`}
          subtitle={`${stats.totalQuizzes} quiz`}
          icon="✓"
        />
      </div>

      {/* Activity Chart */}
      <div className="bg-white border border-slate-200 p-5 md:p-6 rounded-lg">
        <h3 className="text-base md:text-lg font-bold text-slate-900 mb-5">Hoạt động 7 ngày gần đây</h3>
        <div className="flex items-end justify-between gap-3 md:gap-4 h-56">
          {activityData.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-3">
              <div className="w-full flex items-end justify-center h-48">
                <div
                  className="w-full bg-slate-800 hover:bg-slate-700 rounded-t transition-all relative group"
                  style={{ height: `${(day.count / maxActivity) * 100}%`, minHeight: day.count > 0 ? '24px' : '4px' }}
                >
                  {day.count > 0 && (
                    <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-slate-700 bg-white px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {day.count}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-slate-700">{day.day}</p>
                <p className="text-xs text-slate-400 mt-0.5">{day.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        {/* Activity Types */}
        <div className="bg-white border border-slate-200 p-5 md:p-6 rounded-lg">
          <h3 className="text-base md:text-lg font-bold text-slate-900 mb-5">Phân bổ theo loại</h3>
          <div className="space-y-5">
            {[
              { label: 'Quiz', count: stats.quizItems.length, color: 'bg-slate-800', icon: '📝' },
              { label: 'Tóm tắt', count: stats.summaryItems.length, color: 'bg-slate-700', icon: '📄' },
              { label: 'Chat AI', count: stats.chatItems.length, color: 'bg-slate-600', icon: '💬' },
              { label: 'Giải bài', count: stats.solveItems.length, color: 'bg-slate-500', icon: '✍️' },
            ].map((item, index) => {
              const percentage = stats.totalItems > 0 ? (item.count / stats.totalItems) * 100 : 0;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">{percentage.toFixed(0)}%</span>
                      <span className="text-sm font-bold text-slate-900">{item.count}</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quiz Performance */}
        <div className="bg-white border border-slate-200 p-5 md:p-6 rounded-lg">
          <h3 className="text-base md:text-lg font-bold text-slate-900 mb-5">Hiệu suất Quiz</h3>
          
          {stats.totalQuizzes > 0 ? (
            <div className="space-y-5">
              {/* Circular Progress */}
              <div className="flex items-center justify-center py-4">
                <div className="relative w-36 h-36">
                  <svg className="transform -rotate-90 w-36 h-36">
                    <circle
                      cx="72"
                      cy="72"
                      r="64"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="none"
                      className="text-slate-100"
                    />
                    <circle
                      cx="72"
                      cy="72"
                      r="64"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 64}`}
                      strokeDashoffset={`${2 * Math.PI * 64 * (1 - parseFloat(stats.averageScore) / 100)}`}
                      className="text-slate-800 transition-all duration-1000"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-slate-900">{stats.averageScore}%</p>
                      <p className="text-xs text-slate-500 mt-1">Độ chính xác</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Câu đúng</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.totalCorrect}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Tổng câu</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.totalQuestions}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400">
              <p className="text-5xl mb-4">📊</p>
              <p className="text-sm font-medium">Chưa có dữ liệu</p>
              <p className="text-xs mt-2">Hãy hoàn thành quiz đầu tiên</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
