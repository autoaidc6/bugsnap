import React from 'react';
import { HistoryItem, InsectData } from '../types';

interface HistoryViewProps {
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ history, onSelectItem, onClearHistory }) => {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No History Yet</h2>
        <p className="text-gray-500 max-w-sm">Identify your first insect to start building your collection.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h2 className="text-3xl font-bold text-gray-900">Your Discoveries</h2>
           <p className="text-gray-500 mt-1">Found {history.length} insects so far</p>
        </div>
        <button 
          onClick={onClearHistory}
          className="text-sm text-red-500 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
        >
          Clear History
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item) => (
          <div 
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer overflow-hidden group"
          >
            <div className="aspect-w-16 aspect-h-10 bg-gray-100 relative h-48">
              <img 
                src={item.imageUrl} 
                alt={item.data.commonName} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2">
                 {item.data.isPest && (
                    <span className="px-2 py-1 bg-red-500/90 text-white rounded text-[10px] font-bold uppercase tracking-wide">Pest</span>
                 )}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-600 transition-colors">{item.data.commonName}</h3>
              <p className="text-sm text-gray-500 italic mb-3">{item.data.scientificName}</p>
              <div className="flex items-center text-xs text-gray-400">
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {new Date(item.timestamp).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};