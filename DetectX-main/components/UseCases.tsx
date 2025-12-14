import React from 'react';

const UseCases: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Use Cases</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Explore how CSS-AI can be applied across different sectors of law enforcement and research.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1 */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-slate-900 text-white rounded-xl flex items-center justify-center text-2xl mb-6">
            🚓
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Law Enforcement Assistance</h2>
          <p className="text-slate-600 leading-relaxed">
            Generate preliminary suspect sketches immediately after an incident based on witness input. This allows for rapid internal distribution and briefing before a professional forensic artist arrives.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-blue-600 text-white rounded-xl flex items-center justify-center text-2xl mb-6">
            🔍
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Missing Person Identification</h2>
          <p className="text-slate-600 leading-relaxed">
            Visualize faces from partial descriptions or age-progressed memories to assist in cold cases or missing person investigations where no photos exist.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-purple-600 text-white rounded-xl flex items-center justify-center text-2xl mb-6">
            🎓
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Training & Education</h2>
          <p className="text-slate-600 leading-relaxed">
            A powerful tool for training rookie investigators on how to ask descriptive questions. It demonstrates the correlation between verbal description and visual output.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-green-600 text-white rounded-xl flex items-center justify-center text-2xl mb-6">
            🧪
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Research & Prototyping</h2>
          <p className="text-slate-600 leading-relaxed">
            Explore the capabilities and limitations of Generative AI in high-stakes forensic applications, contributing to the development of responsible AI guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UseCases;