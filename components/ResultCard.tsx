import React from 'react';
import { InsectData } from '../types';

interface ResultCardProps {
  data: InsectData;
  imageUrl: string;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data, imageUrl, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 bg-gray-100">
          <img 
            src={imageUrl} 
            alt={data.commonName} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6 sm:p-8 text-white w-full">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-1">{data.commonName}</h2>
                  <p className="text-lg opacity-90 italic">{data.scientificName}</p>
                </div>
                <div className="flex gap-2">
                  {data.isPest && (
                    <span className="px-3 py-1 bg-red-500/90 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm border border-red-400">
                      Pest
                    </span>
                  )}
                  {data.toxicity.toLowerCase().includes('toxic') && (
                    <span className="px-3 py-1 bg-amber-500/90 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm border border-amber-400">
                      Toxic
                    </span>
                  )}
                  <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm border border-emerald-400">
                    Confidence: High
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </span>
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed ml-10">{data.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
                  </span>
                  Habitat
                </h3>
                <p className="text-gray-600 leading-relaxed ml-10">{data.habitat}</p>
               </div>
               <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </span>
                  Behavior
                </h3>
                <p className="text-gray-600 leading-relaxed ml-10">{data.behavior}</p>
               </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </span>
                Toxicity & Safety
              </h3>
              <div className="ml-10">
                <p className="text-gray-600 font-medium mb-2">{data.toxicity}</p>
                {data.safetyTips.length > 0 && (
                   <ul className="list-disc list-inside text-gray-600 space-y-1">
                     {data.safetyTips.map((tip, idx) => <li key={idx}>{tip}</li>)}
                   </ul>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Info (Solutions) */}
          <div className="bg-gray-50 rounded-xl p-6 h-fit border border-gray-100">
             {data.isPest ? (
                <>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                    Pest Control Solutions
                  </h3>
                  <div className="space-y-4">
                    {data.pestSolutions.length > 0 ? data.pestSolutions.map((sol, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-sm text-gray-700">{sol}</p>
                      </div>
                    )) : (
                      <p className="text-sm text-gray-500">No specific solutions found.</p>
                    )}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Always prioritize eco-friendly and humane methods when dealing with pests.
                    </p>
                  </div>
                </>
             ) : (
               <>
                 <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Ecological Benefit
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    This insect is generally beneficial or harmless to your garden. It may help with pollination or controlling other pest populations.
                  </p>
                  <div className="mt-4 p-3 bg-emerald-100 rounded-lg border border-emerald-200">
                    <p className="text-sm text-emerald-800 font-medium text-center">Gardener's Friend 🌱</p>
                  </div>
               </>
             )}
          </div>
        </div>
        
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-center">
          <button 
            onClick={onReset}
            className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
            Identify Another
          </button>
        </div>
      </div>
    </div>
  );
};