import React from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 dark:text-slate-100 overflow-y-auto h-full pb-20">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Investigator Profile</h1>
      
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-navy-800 relative">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Profile Info */}
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row items-end md:items-end -mt-12 mb-6 gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-600 border-4 border-white dark:border-slate-800 shadow-md flex items-center justify-center text-3xl font-bold text-white z-10">
              {user.avatar}
            </div>
            <div className="flex-1 mb-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">{user.role} • ID: #8839-A</p>
            </div>
            <div className="mb-2">
               <button 
                onClick={onLogout}
                className="px-4 py-2 bg-white dark:bg-slate-700 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 font-bold rounded-lg text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
               >
                 Sign Out
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 dark:border-slate-700 pt-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase">Email</span>
                  <span className="text-slate-700 dark:text-slate-300">{user.email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase">Department</span>
                  <span className="text-slate-700 dark:text-slate-300">Digital Forensics Unit 01</span>
                </div>
                 <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase">Clearance Level</span>
                  <span className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Level 3 (High)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                   <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{user.casesCount}</div>
                   <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Total Cases</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                   <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{user.exportsCount}</div>
                   <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Exports Generated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Access Logs */}
      <div className="mt-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Access Logs</h3>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                        <th className="px-6 py-3 font-semibold text-slate-500 dark:text-slate-400">Timestamp</th>
                        <th className="px-6 py-3 font-semibold text-slate-500 dark:text-slate-400">IP Address</th>
                        <th className="px-6 py-3 font-semibold text-slate-500 dark:text-slate-400">Location</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {user.accessLogs.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="px-6 py-4 text-center text-slate-500">No logs found</td>
                        </tr>
                    ) : (
                        user.accessLogs.map((log, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <td className="px-6 py-3 text-slate-700 dark:text-slate-300 font-mono text-xs">{log.timestamp}</td>
                                <td className="px-6 py-3 text-slate-700 dark:text-slate-300 font-mono text-xs">{log.ip}</td>
                                <td className="px-6 py-3 text-slate-700 dark:text-slate-300">{log.location}</td>
                            </tr>
                        ))
                    )}
                </tbody>
             </table>
          </div>
      </div>

    </div>
  );
};

export default Profile;