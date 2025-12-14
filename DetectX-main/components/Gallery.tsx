import React from 'react';
import { Sketch } from '../types';

interface GalleryProps {
  sketches: Sketch[];
}

const Gallery: React.FC<GalleryProps> = ({ sketches }) => {
  if (sketches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-slate-50 text-slate-400">
        <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p className="text-lg font-medium">No Case Files Found</p>
        <p className="text-sm">Generate and save sketches to view them here.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-[calc(100vh-64px)] overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 border-b border-slate-200 pb-4">
           <h2 className="text-2xl font-bold text-slate-800">Case Gallery</h2>
           <p className="text-slate-500">Archived forensic composites.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sketches.map((sketch) => (
            <div key={sketch.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative aspect-square bg-slate-100 border-b border-slate-100">
                <img 
                  src={sketch.imageUrl} 
                  alt="Stored Sketch" 
                  className="w-full h-full object-cover filter contrast-125 grayscale" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                   <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded">CASE #{sketch.id.slice(0, 8)}</span>
                   <span className="text-[10px] text-slate-400">{new Date(sketch.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-slate-700 line-clamp-2 font-medium mb-2" title={sketch.baseDescription}>
                  {sketch.baseDescription}
                </p>
                {sketch.refinements.length > 0 && (
                   <div className="flex gap-1 items-center mt-2 pt-2 border-t border-slate-50">
                     <svg className="w-3 h-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                     <p className="text-xs text-slate-500">{sketch.refinements.length} modification(s)</p>
                   </div>
                )}
                
                <a 
                  href={sketch.imageUrl} 
                  download={`case-${sketch.id.slice(0,8)}.jpg`}
                  className="mt-4 block w-full text-center py-2 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 transition-colors uppercase tracking-wide"
                >
                  Download Evidence
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;