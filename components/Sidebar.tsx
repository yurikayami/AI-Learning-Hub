
import React from 'react';
import type { Page } from '../types';
import { HomeIcon, BookOpenIcon, CalendarIcon, LibraryIcon, ChartBarIcon } from './icons/Icons';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Bảng điều khiển', icon: HomeIcon },
    { id: 'study', label: 'Phòng học AI', icon: BookOpenIcon },
    { id: 'planner', label: 'Kế hoạch', icon: CalendarIcon },
    { id: 'library', label: 'Thư viện', icon: LibraryIcon },
    { id: 'analytics', label: 'Thống kê', icon: ChartBarIcon },
  ];

  return (
    <aside className="w-64 bg-white shadow-md flex-shrink-0 flex flex-col">
      <div className="h-20 flex items-center justify-center border-b">
        <h1 className="text-2xl font-bold text-indigo-600">MentorAI</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActivePage(item.id as Page);
                }}
                className={`flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${
                  activePage === item.id
                    ? 'bg-indigo-100 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <item.icon className="w-6 h-6 mr-3" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <div className="p-4 bg-slate-100 rounded-lg text-center">
            <h3 className="font-bold text-slate-800">Nâng cấp PRO</h3>
            <p className="text-sm text-slate-600 mt-1">Mở khoá toàn bộ tính năng không giới hạn!</p>
            <button className="mt-3 w-full bg-indigo-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Nâng cấp
            </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
