import React from 'react';
import { APP_NAME } from '../constants';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 overflow-y-auto h-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-navy-900 mb-4">About {APP_NAME}</h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          {APP_NAME} is an AI-powered forensic assistance platform designed to help visualize crime suspects using witness descriptions.
        </p>
      </div>

      {/* How it Works Section - Merged */}
      <div className="mb-16">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
           <h2 className="text-2xl font-bold text-navy-900 mb-8 text-center border-b border-slate-100 pb-4">How It Works</h2>
           
           <div className="space-y-8">
             {[
               { title: "1. Witness Interview", desc: "The witness provides a description via a secure, conversational chat interface." },
               { title: "2. AI Analysis", desc: "The system extracts key facial attributes (age, gender, features) from the text." },
               { title: "3. Generation", desc: "A high-fidelity forensic pencil sketch is generated instantly." },
               { title: "4. Refinement", desc: "The user iteratively refines the sketch (e.g., 'narrower eyes') until a match is found." },
               { title: "5. Case File", desc: "The final sketch and report are saved as a case file for investigation." }
             ].map((step, idx) => (
               <div key={idx} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0 mt-1">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{step.title}</h3>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Ethics Statement */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 mb-12">
        <div className="flex items-start gap-4">
           <div className="p-3 bg-blue-100 rounded-full text-blue-600">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
           <div>
              <h2 className="text-xl font-bold text-blue-900 mb-2">Ethics Statement</h2>
              <p className="text-blue-800 leading-relaxed">
                {APP_NAME} is an assistive research tool. It is designed to aid investigations, not replace human judgment. Final identification and verification must be performed by authorized law enforcement professionals and forensic experts.
              </p>
           </div>
        </div>
      </div>

    </div>
  );
};

export default About;