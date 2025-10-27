import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AIStudyRoom from './pages/AIStudyRoom';
import MyPlanner from './pages/MyPlanner';
import PlaceholderPage from './pages/PlaceholderPage';
import LibraryPage from './pages/LibraryPage';
// Fix: Import StoredItemCreation to correctly type the data for new library items.
import type { Page, StudyTab, StoredItem, StoredItemCreation } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [initialStudyTab, setInitialStudyTab] = useState<StudyTab>('solve');
  const [libraryItems, setLibraryItems] = useState<StoredItem[]>([]);

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
        return <Dashboard navigateToStudyRoom={navigateToStudyRoom} />;
      case 'study':
        return <AIStudyRoom initialTab={initialStudyTab} addToLibrary={addToLibrary} />;
      case 'planner':
        return <MyPlanner />;
      case 'library':
        return <LibraryPage items={libraryItems} />;
      case 'analytics':
        return <PlaceholderPage title="Thống kê & Thành tích" description="Theo dõi tiến độ học tập và xem các thành tích bạn đạt được tại đây." />;
      default:
        return <Dashboard navigateToStudyRoom={navigateToStudyRoom} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
