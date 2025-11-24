import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { ResultCard } from './components/ResultCard';
import { HistoryView } from './components/HistoryView';
import { SafetyGuide, GardenSolutions } from './components/StaticContent';
import { AppView, HistoryItem, InsectData } from './types';
import { identifyInsect } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.IDENTIFY);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [currentInsect, setCurrentInsect] = useState<InsectData | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('bugsnap_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('bugsnap_history', JSON.stringify(history));
  }, [history]);

  const handleIdentify = async (base64Image: string) => {
    setIsLoading(true);
    setCurrentImage(base64Image);
    setCurrentInsect(null); // Clear previous result
    
    try {
      const data = await identifyInsect(base64Image);
      setCurrentInsect(data);
      
      // Add to history
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        imageUrl: base64Image,
        data: data
      };
      
      setHistory(prev => [newItem, ...prev]);
    } catch (error) {
      alert("Failed to identify the insect. Please try a clearer image.");
      setCurrentImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentInsect(null);
    setCurrentImage(null);
    setCurrentView(AppView.IDENTIFY);
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setCurrentInsect(item.data);
    setCurrentImage(item.imageUrl);
    setCurrentView(AppView.IDENTIFY);
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.IDENTIFY:
        if (currentInsect && currentImage) {
          return (
            <ResultCard 
              data={currentInsect} 
              imageUrl={currentImage} 
              onReset={handleReset} 
            />
          );
        }
        return (
          <HomeView 
            onImageSelected={handleIdentify} 
            isLoading={isLoading} 
          />
        );
      case AppView.HISTORY:
        return (
          <HistoryView 
            history={history} 
            onSelectItem={handleSelectHistoryItem}
            onClearHistory={() => setHistory([])}
          />
        );
      case AppView.SAFETY_GUIDE:
        return <SafetyGuide />;
      case AppView.GARDEN_SOLUTIONS:
        return <GardenSolutions />;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-gray-800">
      <Sidebar 
        currentView={currentView} 
        onChangeView={(view) => {
          setCurrentView(view);
          // If switching away from identify while showing a result, we keep the state, 
          // but if we click identify again, we might want to reset? 
          // For now, let's keep the result visible if they navigate back.
        }} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
               </svg>
             </div>
             <span className="font-bold text-gray-900">BugSnap</span>
           </div>
           <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-600">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
             </svg>
           </button>
        </div>

        {/* Main Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth no-scrollbar">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;