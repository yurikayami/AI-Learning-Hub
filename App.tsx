import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AIStudyRoom from './pages/AIStudyRoom';
import MyPlanner from './pages/MyPlanner';
import PlaceholderPage from './pages/PlaceholderPage';
import LibraryPage from './pages/LibraryPage';
import AnalyticsPage from './pages/AnalyticsPage';
// Fix: Import StoredItemCreation to correctly type the data for new library items.
import type { Page, StudyTab, StoredItem, StoredItemCreation } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [initialStudyTab, setInitialStudyTab] = useState<StudyTab>('solve');
  const [libraryItems, setLibraryItems] = useState<StoredItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        return <MyPlanner />;
      case 'library':
        return <LibraryPage items={libraryItems} />;
      case 'analytics':
        return <AnalyticsPage libraryItems={libraryItems} />;
      default:
        return <Dashboard navigateToStudyRoom={navigateToStudyRoom} libraryItems={libraryItems} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
