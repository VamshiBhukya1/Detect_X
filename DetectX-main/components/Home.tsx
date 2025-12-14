import React from 'react';
import { ViewState, User } from '../types';
import { APP_NAME } from '../constants';

interface HomeProps {
  onNavigate: (view: ViewState) => void;
  user: User | null;
  onCreateCase: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, user, onCreateCase }) => {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-[calc(100vh-64px)] overflow-y-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-navy-900 text-white min-h-[calc(100vh-64px)] flex items-center justify-center">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
           <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center -mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="text-xs font-bold tracking-wider text-blue-100 uppercase">System Version 2.1</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-8 animate-fade-in-up" style={{animationDelay: '100ms'}}>
            Generate Crime Suspect <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Sketches Using AI</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{animationDelay: '200ms'}}>
            {APP_NAME} converts witness descriptions into accurate sketches using conversational AI and intelligent refinement. Secure, fast, and compliant with forensic standards.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{animationDelay: '300ms'}}>
            <button 
              onClick={() => user ? onCreateCase() : onNavigate('login')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-900/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Start New Case
            </button>
            <button 
              onClick={() => onNavigate('cases')}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-lg font-bold rounded-xl border border-slate-700 transition-all w-full sm:w-auto justify-center"
            >
              Access Database
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full bg-transparent py-6 px-6 z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-slate-500/50 text-xs">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. Gov Use Only.</p>
          <div className="flex gap-4 pointer-events-auto">
             <button onClick={() => onNavigate('help')} className="hover:text-blue-400 transition-colors">Support</button>
             <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors">About</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;