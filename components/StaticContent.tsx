import React from 'react';

export const SafetyGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
        <h2 className="text-2xl font-bold text-orange-800 mb-2">Bite & Sting Safety Guide</h2>
        <p className="text-orange-700">Essential first aid and identification for common insect bites.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
             <span className="text-2xl">🐝</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Bee & Wasp Stings</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex gap-2"><span>•</span> Remove stinger immediately by scraping (don't pinch).</li>
            <li className="flex gap-2"><span>•</span> Wash area with soap and water.</li>
            <li className="flex gap-2"><span>•</span> Apply ice pack to reduce swelling.</li>
            <li className="flex gap-2 font-semibold text-red-500"><span>!</span> Seek emergency help if allergic (difficulty breathing).</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
             <span className="text-2xl">🕷️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Spider Bites</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex gap-2"><span>•</span> Clean the bite area thoroughly.</li>
            <li className="flex gap-2"><span>•</span> Elevate the affected area if possible.</li>
            <li className="flex gap-2"><span>•</span> Monitor for spreading redness or necrotic tissue.</li>
            <li className="flex gap-2 font-semibold text-red-500"><span>!</span> Seek help for Black Widow or Brown Recluse bites.</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
             <span className="text-2xl">🐜</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Ant Bites (Fire Ants)</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex gap-2"><span>•</span> Wash gently to avoid breaking blisters.</li>
            <li className="flex gap-2"><span>•</span> Use antihistamine cream for itching.</li>
            <li className="flex gap-2"><span>•</span> Watch for signs of infection.</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
             <span className="text-2xl">🦟</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Mosquito & Tick Bites</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex gap-2"><span>•</span> Remove ticks with fine-tipped tweezers immediately.</li>
            <li className="flex gap-2"><span>•</span> Apply anti-itch cream or calamine lotion.</li>
            <li className="flex gap-2"><span>•</span> Watch for "bullseye" rash (Lyme disease).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const GardenSolutions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
       <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
        <h2 className="text-2xl font-bold text-emerald-800 mb-2">Eco-Friendly Garden Solutions</h2>
        <p className="text-emerald-700">Protect your plants without harming the ecosystem.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 h-48 bg-emerald-100 rounded-lg flex items-center justify-center">
             <div className="text-6xl">🐞</div>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Beneficial Insects</h3>
            <p className="text-gray-600 mb-4">Introduce natural predators to control pest populations naturally.</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">Ladybugs (for Aphids)</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">Lacewings</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">Praying Mantises</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 h-48 bg-emerald-100 rounded-lg flex items-center justify-center">
             <div className="text-6xl">🧼</div>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Neem Oil & Soap Sprays</h3>
            <p className="text-gray-600 mb-4">Simple homemade mixtures can deter soft-bodied insects like aphids, mites, and mealybugs.</p>
            <h4 className="font-semibold text-sm mb-2 uppercase text-gray-500 tracking-wider">Recipe</h4>
            <p className="text-sm bg-gray-50 p-3 rounded text-gray-700 border border-gray-200">
              Mix 1 teaspoon of mild liquid soap and 1 teaspoon of Neem oil per liter of water. Spray in the evening.
            </p>
          </div>
        </div>

         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 h-48 bg-emerald-100 rounded-lg flex items-center justify-center">
             <div className="text-6xl">🪴</div>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Companion Planting</h3>
            <p className="text-gray-600 mb-4">Plant specific crops together to repel pests naturally.</p>
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <span className="block font-semibold text-gray-800">Marigolds</span>
                 <span className="text-sm text-gray-500">Repels nematodes & beetles</span>
               </div>
               <div>
                 <span className="block font-semibold text-gray-800">Basil</span>
                 <span className="text-sm text-gray-500">Repels flies & mosquitoes</span>
               </div>
               <div>
                 <span className="block font-semibold text-gray-800">Mint</span>
                 <span className="text-sm text-gray-500">Deters ants & cabbage moths</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};