import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Generator from './components/Generator';
import About from './components/About';
import Settings from './components/Settings';
import Login from './components/Login';
import Profile from './components/Profile';
import Cases from './components/Cases';
import Help from './components/Help';
import { ViewState, User, AccessLog, Case } from './types';
import { EthicalBanner, Toast } from './components/Alerts';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showEthicalBanner, setShowEthicalBanner] = useState(true);
  const [toast, setToast] = useState<{msg: string, show: boolean}>({ msg: '', show: false });
  
  // Lifted state for cases to allow sharing between Generator and Cases view
  const [cases, setCases] = useState<Case[]>([
     { id: '2024-001', title: 'Bank Robbery - Downtown', status: 'Refined', date: '2024-03-10', confidence: 88, lastMessage: 'Updated nose width based on witness feedback.' },
     { id: '2024-002', title: 'Convenience Store Theft', status: 'Draft', date: '2024-03-08', confidence: 65, lastMessage: 'Initial generation completed.' },
  ]);

  const showNotification = (msg: string) => {
    setToast({ msg, show: true });
  };

  const handleLogin = (name: string, email: string, logData: AccessLog) => {
    // Create user based on input
    const newUser: User = {
      name: name,
      email: email,
      role: "Senior Forensic Investigator",
      avatar: name.charAt(0).toUpperCase(),
      casesCount: cases.length,
      exportsCount: 12,
      accessLogs: user ? [logData, ...user.accessLogs] : [logData]
    };
    
    setUser(newUser);
    setCurrentView('dashboard');
  };

  const handleSaveCase = (newCase: Case) => {
    setCases(prev => [newCase, ...prev]);
    if (user) {
        setUser(prev => prev ? ({...prev, casesCount: prev.casesCount + 1}) : null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const handleCreateCaseRequest = () => {
    if (user) {
      setCurrentView('dashboard');
    } else {
      showNotification("Authentication required to access Generator");
      // Optional: Delay redirect to login to let toast read? 
      // For now we just show toast on Home and let user click Login manually or just wait.
      setTimeout(() => setCurrentView('login'), 1500);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-100 ${darkMode ? 'dark' : ''}`}>
      
      {/* GLOBAL ALERTS */}
      <Toast 
        message={toast.msg} 
        isVisible={toast.show} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
      {showEthicalBanner && (
        <EthicalBanner onAccept={() => setShowEthicalBanner(false)} />
      )}

      <Navbar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1 w-full pt-16 h-[calc(100vh)] overflow-hidden">
        {currentView === 'home' && (
          <Home 
            onNavigate={setCurrentView} 
            user={user} 
            onCreateCase={handleCreateCaseRequest} 
          />
        )}
        {currentView === 'dashboard' && <Generator onViewCases={() => setCurrentView('cases')} onSaveCase={handleSaveCase} />}
        {currentView === 'cases' && <Cases onOpenCase={() => setCurrentView('dashboard')} cases={cases} />}
        {currentView === 'about' && <About />}
        {currentView === 'help' && <Help />}
        {currentView === 'settings' && <Settings darkMode={darkMode} setDarkMode={setDarkMode} />}
        {currentView === 'login' && <Login onLogin={handleLogin} />}
        {currentView === 'profile' && user && <Profile user={user} onLogout={handleLogout} />}
      </main>
    </div>
  );
}

export default App;