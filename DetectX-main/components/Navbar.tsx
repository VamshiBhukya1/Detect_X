import React, { useState } from 'react';
import { APP_NAME } from '../constants';
import { ViewState, User } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, user, onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const NavItem = ({ view, label }: { view: ViewState, label: string }) => (
    <button 
      onClick={() => onViewChange(view)}
      className={`text-sm font-medium transition-colors px-3 py-2 rounded-md ${currentView === view ? 'text-white bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
    >
      {label}
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900 dark:bg-slate-950 text-white h-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Left: Logo & Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('home')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight font-mono">{APP_NAME}</span>
        </div>

        {/* Center: Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <NavItem view="home" label="Home" />
          <NavItem view="cases" label="Cases" />
          <NavItem view="help" label="Help" />
          <NavItem view="settings" label="Settings" />
        </div>

        {/* Right: Profile / Login */}
        <div className="relative">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 hover:bg-slate-800 rounded-full pl-2 pr-1 py-1 transition-colors border border-transparent hover:border-slate-700 focus:outline-none"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-200 leading-none">{user.name}</p>
                  <p className="text-[10px] text-slate-400 leading-none mt-1">{user.role}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-900 border border-blue-500 flex items-center justify-center text-xs font-bold text-blue-100">
                  {user.name.charAt(0)}
                </div>
              </button>

              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-20 text-slate-800 dark:text-slate-100 animate-fade-in-up origin-top-right">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 mb-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>
                    <button onClick={() => { onViewChange('profile'); setShowProfileMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 flex items-center gap-2">
                      <span>👤</span> My Profile
                    </button>
                    <button onClick={() => { onViewChange('cases'); setShowProfileMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 flex items-center gap-2">
                      <span>📁</span> My Cases
                    </button>
                    <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
                    <button onClick={() => { onLogout(); setShowProfileMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                      <span>🚪</span> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button 
              onClick={() => onViewChange('login')}
              className="flex items-center gap-2 text-sm font-bold bg-white text-navy-900 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors shadow-sm"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;