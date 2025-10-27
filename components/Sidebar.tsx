
import React from 'react';
import type { Page } from '../types';
import { HomeIcon, BookOpenIcon, CalendarIcon, LibraryIcon, ChartBarIcon, MenuIcon, XMarkIcon } from './icons/Icons';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isSidebarOpen, setIsSidebarOpen }) => {
  const navItems = [
    { id: 'dashboard', label: 'Bảng điều khiển', icon: HomeIcon },
    { id: 'study', label: 'Phòng học AI', icon: BookOpenIcon },
    { id: 'planner', label: 'Kế hoạch', icon: CalendarIcon },
    { id: 'library', label: 'Thư viện', icon: LibraryIcon },
    { id: 'analytics', label: 'Thống kê', icon: ChartBarIcon },
  ];

  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white rounded-lg shadow-md text-slate-700 hover:bg-slate-50 transition-all border border-slate-200"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? (
          <XMarkIcon className="w-5 h-5" />
        ) : (
          <MenuIcon className="w-5 h-5" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-72 bg-white shadow-2xl lg:shadow-none
        flex-shrink-0 flex flex-col border-r border-slate-200
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header with Logo */}
        <div className="h-20 flex items-center px-6 border-b border-slate-200 bg-slate-900">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-bold text-white">MentorAI</h1>
              <p className="text-xs text-slate-400">Learning Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id as Page)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                    activePage === item.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

  
      </aside>
    </>
  );
};

export default Sidebar;
