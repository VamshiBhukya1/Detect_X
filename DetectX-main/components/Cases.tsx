import React from 'react';
import { Case } from '../types';

interface CasesProps {
  onOpenCase: (caseId: string) => void;
  cases: Case[];
}

const Cases: React.FC<CasesProps> = ({ onOpenCase, cases }) => {
  // Sort cases by date/time (implied by reverse order if added sequentially, or simple sort)
  const sortedCases = [...cases].reverse();

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full p-6 lg:p-12 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Case Files</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and access forensic sketch investigations.</p>
          </div>
          <div className="flex gap-3">
             <div className="relative">
               <input type="text" placeholder="Search cases..." className="pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64 dark:text-white" />
               <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          {sortedCases.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Cases Found</h3>
              <p className="text-slate-500 dark:text-slate-400">Start a new session to generate forensic sketches.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Case ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Preview</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Title / Description</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {sortedCases.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/50 dark:hover:bg-slate-700/30 transition-colors group cursor-pointer" onClick={() => onOpenCase(item.id)}>
                    <td className="px-6 py-4 font-mono text-sm text-slate-600 dark:text-slate-300">{item.id}</td>
                    <td className="px-6 py-4">
                        {item.thumbnail && (
                            <img src={item.thumbnail} alt="Thumbnail" className="w-10 h-10 rounded object-cover border border-slate-200 dark:border-slate-600 grayscale" />
                        )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 dark:text-slate-200">{item.title}</div>
                      <div className="text-xs text-slate-400 mt-1 truncate max-w-xs">{item.lastMessage}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{item.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${item.confidence > 80 ? 'bg-green-500' : item.confidence > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{width: `${item.confidence}%`}}></div>
                        </div>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{item.confidence}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center text-sm text-slate-500 dark:text-slate-400 px-2">
          <p>Showing {sortedCases.length} records</p>
        </div>
      </div>
    </div>
  );
};

export default Cases;