import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AIStudyRoom from './pages/AIStudyRoom';
import MyPlanner from './pages/MyPlanner';
import PlaceholderPage from './pages/PlaceholderPage';
import LibraryPage from './pages/LibraryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import IntroPage from './pages/IntroPage';
// Fix: Import StoredItemCreation to correctly type the data for new library items.
import type { Page, StudyTab, StoredItem, StoredItemCreation } from './types';

const App: React.FC = () => {
  const [hasVisited, setHasVisited] = useState(false); // Track if user has entered the app
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [initialStudyTab, setInitialStudyTab] = useState<StudyTab>('solve');
  const [libraryItems, setLibraryItems] = useState<StoredItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const enterApp = useCallback(() => {
    setHasVisited(true);
    setActivePage('dashboard');
  }, []);

  const backToIntro = useCallback(() => {
    setHasVisited(false);
  }, []);

  const navigateToStudyRoom = useCallback((tab: StudyTab) => {
    setInitialStudyTab(tab);
    setActivePage('study');
  }, []);

  // Fix: Use StoredItemCreation type for itemData to ensure proper type inference and avoid errors.
  const addToLibrary = useCallback((itemData: StoredItemCreation) => {
    const newItem: StoredItem = {
      ...itemData,
      id: Date.now(),
      timestamp: new Date(),
    };
    setLibraryItems(prevItems => [newItem, ...prevItems]);
  }, []);


  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard navigateToStudyRoom={navigateToStudyRoom} libraryItems={libraryItems} />;
      case 'study':
        return <AIStudyRoom initialTab={initialStudyTab} addToLibrary={addToLibrary} />;
      case 'planner':
        return <MyPlanner addToLibrary={addToLibrary} />;
      case 'library':
        return <LibraryPage items={libraryItems} />;
      case 'analytics':
        return <AnalyticsPage libraryItems={libraryItems} />;
      default:
        return <Dashboard navigateToStudyRoom={navigateToStudyRoom} libraryItems={libraryItems} />;
    }
  };

  // Show IntroPage fullscreen if user hasn't visited yet
  if (!hasVisited) {
    return <IntroPage onEnterApp={enterApp} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8 relative">
        {/* Back to Intro Button - Only show on Dashboard */}
        {activePage === 'dashboard' && (
          <button
            onClick={backToIntro}
            className="fixed top-4 right-4 z-50 bg-white hover:bg-slate-50 text-slate-700 font-medium px-4 py-2 rounded-lg shadow-lg border border-slate-200 transition-all hover:shadow-xl flex items-center gap-2 text-sm"
            title="Quay lại trang giới thiệu"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden sm:inline">Giới thiệu</span>
          </button>
        )}
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
