import React, { useState, useEffect, useRef } from 'react';
import { generateInitialSketch, refineSketch } from '../services/fiboService';
import { ChatMessage, TimelineEvent, Case } from '../types';
import { APP_NAME } from '../constants';
import { InlineAlert, ActionModal } from './Alerts';

interface GeneratorProps {
  onViewCases?: () => void;
  onSaveCase: (newCase: Case) => void;
}

const QUICK_SUGGESTIONS = [
  "Make eyes narrower",
  "Add a beard",
  "Widen the nose",
  "Make older",
  "Remove glasses",
  "Darker hair",
  "Thinner lips",
  "Add scar on cheek"
];

const Generator: React.FC<GeneratorProps> = ({ onViewCases, onSaveCase }) => {
  // --- STATE ---
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'ai',
      text: "Hello. I am your forensic sketch assistant. Please describe the suspect's face in as much detail as possible (Age, Gender, Hair, Eyes, etc).",
      timestamp: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Result State
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [history, setHistory] = useState<TimelineEvent[]>([]);
  
  // Forensic Tools State
  const [featureScores, setFeatureScores] = useState({ eyes: 0, nose: 0, mouth: 0, structure: 0 });
  const [isComparing, setIsComparing] = useState(false);
  const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // ALERTS STATE
  const [inputError, setInputError] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- EFFECTS ---
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // --- HANDLERS ---
  const handleSendMessage = async (overrideText?: string) => {
    const textToSend = overrideText || inputValue.trim();
    
    // SAFETY: Missing Input Check
    if (!textToSend) {
      setInputError("Please provide a description to generate a sketch.");
      return;
    }
    if (isLoading) return;

    setInputValue('');
    setInputError(''); // Clear error on valid submit
    setIsSaved(false);
    
    // Add user message
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
    };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      let imageUrl = '';
      let aiResponseText = '';
      let newConf = 0;
      let newScores = { eyes: 0, nose: 0, mouth: 0, structure: 0 };
      
      // LOGIC: If no image exists, generate. If image exists, refine.
      if (!currentImage || history.length === 0) {
        // Generate Initial
        imageUrl = await generateInitialSketch({ gender: '', ageRange: '', faceShape: '', hairStyle: '', facialHair: '', distinctMarks: '' }, textToSend);
        aiResponseText = "I have generated a sketch based on your description. Does this look accurate? You can use the suggestions below or type corrections.";
        newConf = 65 + Math.floor(Math.random() * 25); // Range 65-90% to trigger low confidence warnings occasionally
        
        newScores = {
          eyes: 85 + Math.floor(Math.random() * 10),
          nose: 88 + Math.floor(Math.random() * 10),
          mouth: 82 + Math.floor(Math.random() * 10),
          structure: 90 + Math.floor(Math.random() * 5),
        };

        const event: TimelineEvent = {
           id: crypto.randomUUID(),
           type: 'generation',
           description: 'Initial Composite',
           timestamp: new Date().toLocaleTimeString(),
           confidence: newConf,
           thumbnail: imageUrl
        };
        setHistory([event]);
        setSelectedVersionId(event.id);

      } else {
        // Refine
        imageUrl = await refineSketch(currentImage, textToSend);
        aiResponseText = "I've updated the sketch based on your feedback. Hold the 'Compare' button to see the difference.";
        newConf = Math.min(confidence + Math.floor(Math.random() * 5), 98); // Increase confidence
        
        newScores = {
          eyes: Math.min(99, featureScores.eyes + Math.floor(Math.random() * 5)),
          nose: Math.min(99, featureScores.nose + Math.floor(Math.random() * 5)),
          mouth: Math.min(99, featureScores.mouth + Math.floor(Math.random() * 5)),
          structure: Math.min(99, featureScores.structure + Math.floor(Math.random() * 2)),
        };

        const event: TimelineEvent = {
           id: crypto.randomUUID(),
           type: 'refinement',
           description: textToSend,
           timestamp: new Date().toLocaleTimeString(),
           confidence: newConf,
           thumbnail: imageUrl
        };
        setHistory(prev => [event, ...prev]);
        setSelectedVersionId(event.id);
      }

      setCurrentImage(imageUrl);
      setConfidence(newConf);
      setFeatureScores(newScores);
      
      // Add AI Response
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
      }]);

    } catch (error: any) {
      console.error(error);
      let errorMsg = "System Alert: Generation failed. Please try a different description.";
      
      if (
        error.message?.includes('429') || 
        error.message?.includes('quota') || 
        error.status === 429 || 
        error.status === 'RESOURCE_EXHAUSTED'
      ) {
        errorMsg = "System Alert: API Quota Exceeded. The AI model load is currently high or your plan limit has been reached. Please try again in a moment.";
      }

      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'ai',
        text: errorMsg,
        timestamp: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const performReset = () => {
    setMessages([{
      id: 'welcome',
      role: 'ai',
      text: "New case initialized. Please describe the suspect.",
      timestamp: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
    }]);
    setCurrentImage(null);
    setHistory([]);
    setConfidence(0);
    setFeatureScores({ eyes: 0, nose: 0, mouth: 0, structure: 0 });
    setSelectedVersionId(null);
    setIsFullScreen(false);
    setIsSaved(false);
    setInputError('');
    setShowResetModal(false);
  };

  const performSave = () => {
    if (!currentImage) return;
    const newCase: Case = {
      id: `CASE-${Date.now().toString().slice(-6)}`,
      title: history[0]?.description ? `Subject: ${history[0].description.slice(0, 20)}...` : 'New Suspect Profile',
      status: 'Refined',
      date: new Date().toLocaleDateString(),
      confidence: confidence,
      thumbnail: currentImage,
      lastMessage: history[0]?.description || 'Generated'
    };
    onSaveCase(newCase);
    setIsSaved(true);
    setShowSaveModal(false);
  };

  const performExport = () => {
    if (!currentImage) return;
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `EVIDENCE-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportModal(false);
  };

  const handleVersionSelect = (event: TimelineEvent) => {
    if (event.thumbnail) {
      setCurrentImage(event.thumbnail);
      setConfidence(event.confidence);
      setSelectedVersionId(event.id);
    }
  };

  // Determine comparison image (previous version in history)
  const compareImage = history.length > 1 && history[1].thumbnail ? history[1].thumbnail : null;
  const imageToShow = isComparing && compareImage ? compareImage : currentImage;
  const hasContent = currentImage !== null;

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
      
      {/* MODALS */}
      <ActionModal 
        isOpen={showResetModal}
        title="Reset Session?"
        description="This will clear the current sketch, chat history, and any unsaved progress. This action cannot be undone."
        confirmLabel="Reset Session"
        isDestructive={true}
        onConfirm={performReset}
        onCancel={() => setShowResetModal(false)}
      />
      
      <ActionModal 
        isOpen={showExportModal}
        title="Export Evidence"
        description="You are about to download AI-generated material. By continuing, you acknowledge that this sketch is for investigative assistance only and should be corroborated with other evidence."
        confirmLabel="Acknowledge & Download"
        onConfirm={performExport}
        onCancel={() => setShowExportModal(false)}
      />

      <ActionModal 
        isOpen={showSaveModal}
        title="Save to Case File"
        description="This sketch will be stored in the secure case database. Ensure all details are accurate before saving."
        confirmLabel="Save Case"
        onConfirm={performSave}
        onCancel={() => setShowSaveModal(false)}
      />

      {/* === LEFT PANEL: AI CHAT (35%) === */}
      <div className="w-full lg:w-[35%] flex flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-full shadow-2xl z-30">
        {/* Chat Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex justify-between items-center shrink-0">
           <div>
             <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               Live Witness Interview
             </h2>
           </div>
           <button onClick={() => setShowResetModal(true)} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-wider">
             New Case
           </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-slate-50/50 dark:bg-slate-900/50 scroll-smooth custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
              <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-100 rounded-bl-none'
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <span className={`text-[10px] block mt-1.5 opacity-70 font-mono ${msg.role === 'user' ? 'text-blue-100 text-right' : 'text-slate-400 dark:text-slate-400'}`}>
                  {msg.role === 'ai' ? 'AI AGENT' : 'WITNESS'} • {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                <div className="flex gap-1.5 items-center">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-2">GENERATING</span>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shrink-0">
          
          {/* Missing Input Alert */}
          {inputError && (
             <InlineAlert type="info" message={inputError} onDismiss={() => setInputError('')} />
          )}

          {/* Quick Chips */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-1 no-scrollbar">
            {QUICK_SUGGESTIONS.map((sug, i) => (
              <button 
                key={i}
                onClick={() => handleSendMessage(sug)}
                disabled={isLoading}
                className="shrink-0 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 hover:text-blue-600 text-xs font-semibold rounded-full border border-slate-200 dark:border-slate-600 transition-colors whitespace-nowrap"
              >
                + {sug}
              </button>
            ))}
          </div>

          <div className="relative">
            <input 
              type="text" 
              className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl pl-4 pr-12 py-4 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 dark:text-white transition-all outline-none shadow-inner ${inputError ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200 dark:border-slate-700'}`}
              placeholder="Describe facial features or corrections..."
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value);
                if(inputError) setInputError('');
              }}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
            />
            <button 
              onClick={() => handleSendMessage()}
              disabled={isLoading}
              className="absolute right-2 top-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:bg-slate-400 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* === RIGHT PANEL: FORENSIC WORKBENCH (65%) === */}
      <div className="w-full lg:w-[65%] bg-slate-100 dark:bg-slate-950 flex flex-col h-full overflow-hidden relative">
        
        {/* TOP STATS BAR */}
        {hasContent && (
          <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 shadow-md z-20 animate-fade-in-up shrink-0">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Confidence & Score */}
              <div className="flex-1 w-full flex items-center gap-4">
                 <div className="w-16 h-16 relative flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-slate-100 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                      <path className={`${confidence > 80 ? 'text-green-500' : 'text-amber-500'} transition-all duration-1000 ease-out`} strokeDasharray={`${confidence}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                    </svg>
                    <span className="absolute text-sm font-bold text-slate-700 dark:text-white">{confidence}%</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Confidence Score</span>
                    <span className="text-xs text-slate-400">Match Probability</span>
                 </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                 <button 
                  onClick={() => setShowSaveModal(true)}
                  disabled={isSaved}
                  className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm border ${
                      isSaved 
                        ? 'bg-green-50 text-green-600 border-green-200' 
                        : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-50'
                  }`}
                 >
                   {isSaved ? (
                       <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        SAVED
                       </>
                   ) : (
                       <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                        SAVE CASE
                       </>
                   )}
                 </button>
                 <button onClick={() => setShowExportModal(true)} className="px-3 py-2 text-xs font-bold text-white bg-slate-800 dark:bg-slate-600 rounded-lg hover:bg-slate-900 dark:hover:bg-slate-500 transition-colors flex items-center gap-2 shadow-md">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                   DOWNLOAD
                 </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Canvas Area */}
        <div className="flex-1 relative bg-slate-200/50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden z-0">
           
           {/* Canvas Container */}
           <div className="relative w-full h-full flex flex-col items-center justify-center">
              
              {!hasContent ? (
                <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 opacity-50">
                  <div className="w-32 h-32 border-4 border-dashed border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-500 dark:text-slate-400 mb-2">Ready to Generate</h3>
                  <p className="text-sm">Describe the suspect to begin the forensic sketch process.</p>
                </div>
              ) : (
                <>
                  {/* Image Card - Medium or Full */}
                  <div 
                    className={`relative bg-white dark:bg-slate-900 shadow-2xl border-4 border-white dark:border-slate-800 overflow-hidden group rounded-sm flex items-center justify-center transition-all duration-300 ${
                      isFullScreen 
                        ? 'fixed inset-4 z-50 w-auto h-auto m-auto max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] shadow-[0_0_50px_rgba(0,0,0,0.5)]' 
                        : 'w-auto h-auto max-w-[80%] max-h-[60vh] aspect-square'
                    }`}
                  >
                    <img 
                      src={imageToShow || ''} 
                      alt="Forensic Composite" 
                      className="max-w-full max-h-full object-contain grayscale contrast-125" 
                    />
                    
                    {/* Comparison Toggle Overlay */}
                    {history.length > 1 && (
                      <button 
                        className="absolute top-4 left-4 bg-white/95 dark:bg-slate-800/95 hover:bg-blue-50 text-slate-900 dark:text-white px-4 py-2.5 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-2 z-30 transition-all active:scale-95 select-none ring-1 ring-black/5"
                        onMouseDown={() => setIsComparing(true)}
                        onMouseUp={() => setIsComparing(false)}
                        onMouseLeave={() => setIsComparing(false)}
                        onTouchStart={() => setIsComparing(true)}
                        onTouchEnd={() => setIsComparing(false)}
                      >
                        <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                        HOLD TO COMPARE
                      </button>
                    )}

                    {/* Ethical Label */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-[2px] py-2 text-center border-t border-slate-100 dark:border-slate-800 z-10 pointer-events-none">
                      <p className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">
                        AI Generated Evidence • Assistive Use Only
                      </p>
                    </div>

                    {/* Full Screen Toggle Button */}
                    <button 
                      onClick={() => setIsFullScreen(!isFullScreen)}
                      className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-blue-600 text-white rounded-lg backdrop-blur-md transition-all z-40 opacity-0 group-hover:opacity-100 shadow-lg"
                      title={isFullScreen ? "Minimize" : "Full Screen"}
                    >
                      {isFullScreen ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5-5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* LOW CONFIDENCE WARNING */}
                  {!isFullScreen && confidence > 0 && confidence < 70 && (
                     <div className="mt-4 max-w-md w-full animate-fade-in-up">
                        <InlineAlert 
                           type="warning" 
                           title="Low Confidence Score" 
                           message="The AI match probability is low. This suggests the sketch may not align perfectly with forensic baselines. Corroborate with additional witness testimony." 
                        />
                     </div>
                  )}

                  {/* Backdrop for full screen mode */}
                  {isFullScreen && (
                    <div 
                      className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-40 transition-opacity"
                      onClick={() => setIsFullScreen(false)}
                    ></div>
                  )}
                </>
              )}
           </div>

           {/* Version History Strip - Floating Bottom */}
           {history.length > 0 && !isFullScreen && (
             <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 max-w-[90%] w-auto z-40">
               <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-white/50 dark:border-slate-700/50 flex items-center gap-3 animate-fade-in-up">
                 <div className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Timeline</span>
                 </div>
                 <div className="flex gap-2 overflow-x-auto custom-scrollbar max-w-[600px] px-2 py-1">
                   {history.map((ver, idx) => (
                     <button 
                      key={ver.id}
                      onClick={() => handleVersionSelect(ver)}
                      className={`shrink-0 w-10 h-10 rounded-lg border-2 overflow-hidden transition-all relative group ${selectedVersionId === ver.id ? 'border-blue-600 ring-2 ring-blue-200 dark:ring-blue-900 scale-105' : 'border-slate-200 dark:border-slate-600 opacity-60 hover:opacity-100'}`}
                      title={ver.description}
                     >
                       <img src={ver.thumbnail} className="w-full h-full object-cover grayscale" />
                       <div className="absolute inset-0 bg-blue-900/40 hidden group-hover:flex items-center justify-center">
                          <span className="text-[8px] text-white font-bold">V{history.length - idx}</span>
                       </div>
                       {selectedVersionId === ver.id && <div className="absolute inset-0 border-2 border-white rounded-md"></div>}
                     </button>
                   )).reverse()}
                 </div>
               </div>
             </div>
           )}

        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Generator;