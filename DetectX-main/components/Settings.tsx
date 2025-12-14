import React, { useEffect } from 'react';

interface SettingsProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ darkMode, setDarkMode }) => {
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 dark:text-slate-100">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Settings</h1>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        
        {/* Appearance */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
           <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">Appearance</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Toggle between Light and Dark themes</p>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${darkMode ? 'bg-blue-600' : 'bg-slate-200'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        {/* Notifications (Placeholder) */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
           <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">Notifications</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Email alerts for new cases</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" disabled checked />
              <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 opacity-50"></div>
            </label>
          </div>
        </div>

        {/* Reset Session */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50">
           <div className="flex items-center justify-between">
             <div>
               <h3 className="font-bold text-slate-800 dark:text-white">Reset Session</h3>
               <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Clear all current chat history and sketches</p>
             </div>
             <button 
               onClick={() => window.location.reload()}
               className="px-4 py-2 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 font-medium text-sm rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
             >
               Reset Current Session
             </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;