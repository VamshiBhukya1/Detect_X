import React, { useState } from 'react';
import { AccessLog } from '../types';

interface LoginProps {
  onLogin: (name: string, email: string, logData: AccessLog) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const performLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!username) return;

    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
        // Create mock access log
        const logData: AccessLog = {
            timestamp: new Date().toLocaleString(),
            ip: "10.24." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255),
            device: "Secure Terminal / Chrome",
            location: "Headquarters (Node 4)"
        };
        
        // Map "Username / ID" to name, generate a dummy email for system compatibility
        const finalName = username;
        const finalEmail = `${username.toLowerCase().replace(/\s+/g, '.')}@detectx.gov`;
        
        onLogin(finalName, finalEmail, logData);
        setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center relative overflow-hidden bg-[#050b14]">
      
      {/* Background Gradient Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-20 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-[420px] px-4 relative z-10 flex flex-col items-center">
        
        {/* Logo Section */}
        <div className="mb-8 flex flex-col items-center animate-fade-in-up">
          <div className="w-16 h-16 rounded-full border-2 border-cyan-500/30 flex items-center justify-center mb-4 bg-[#0a101f] shadow-[0_0_30px_rgba(6,182,212,0.15)] relative">
            <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping opacity-20"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {/* Radar Sweep Effect */}
            <div className="absolute inset-2 rounded-full border-t-2 border-cyan-400/80 animate-spin opacity-60"></div>
          </div>
          
          <div className="flex items-center gap-0.5 mb-2">
            <span className="text-3xl font-bold text-white tracking-tight">Crime</span>
            <span className="text-3xl font-bold text-cyan-400 tracking-tight">DetectX</span>
          </div>
          <p className="text-slate-500 text-xs font-bold tracking-[0.2em] uppercase">Secure Access Portal</p>
        </div>

        {/* Card */}
        <div className="w-full bg-[#0f1623] border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-black/50 animate-fade-in-up" style={{animationDelay: '100ms'}}>
          <form onSubmit={performLogin} className="space-y-6">
            
            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1">Username / ID</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-[#0a0f1c] border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all sm:text-sm"
                  placeholder="Enter Username"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wide ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-[#0a0f1c] border border-slate-700 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !username}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-900/20 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-[#0f1623] transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  Log In
                  <svg className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
             <p className="text-slate-500 text-xs leading-relaxed">
               Protected system. All activities are monitored and logged for security purposes.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;