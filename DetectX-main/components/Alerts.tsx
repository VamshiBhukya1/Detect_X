import React, { useEffect, useState } from 'react';

// --- ICONS ---
const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const WarningIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
);
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
);

// --- 1. ETHICAL BANNER (First Use) ---
interface EthicalBannerProps {
  onAccept: () => void;
}
export const EthicalBanner: React.FC<EthicalBannerProps> = ({ onAccept }) => (
  <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] animate-fade-in-up">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex gap-4">
        <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400 shrink-0">
          <InfoIcon />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-1">Ethical Usage & Limitations</h3>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
            DetectX is an <strong>assistive forensic tool</strong> utilizing Generative AI. 
            Sketches are approximations and <span className="text-white font-semibold">must not</span> be used as sole evidence for positive identification. 
            All outputs require human verification.
          </p>
        </div>
      </div>
      <button 
        onClick={onAccept}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors whitespace-nowrap text-sm w-full md:w-auto"
      >
        I Understand & Agree
      </button>
    </div>
  </div>
);

// --- 2. INLINE ALERTS (Contextual) ---
interface InlineAlertProps {
  type: 'warning' | 'info' | 'error';
  title?: string;
  message: string;
  onDismiss?: () => void;
}
export const InlineAlert: React.FC<InlineAlertProps> = ({ type, title, message, onDismiss }) => {
  const styles = {
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
  };

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${styles[type]} text-sm mb-4 animate-fade-in-up`}>
      <div className="shrink-0 mt-0.5">
        {type === 'warning' ? <WarningIcon /> : <InfoIcon />}
      </div>
      <div className="flex-1">
        {title && <strong className="block font-bold mb-0.5">{title}</strong>}
        <span className="opacity-90">{message}</span>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="opacity-50 hover:opacity-100 p-1">
          <span className="sr-only">Dismiss</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  );
};

// --- 3. ACTION MODAL (Confirmations) ---
interface ActionModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
export const ActionModal: React.FC<ActionModalProps> = ({ 
  isOpen, title, description, confirmLabel, cancelLabel = "Cancel", isDestructive = false, onConfirm, onCancel 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onCancel}></div>
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-700 p-6 animate-fade-in-up">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
          {description}
        </p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={onCancel}
            className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {cancelLabel}
          </button>
          <button 
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-bold text-white rounded-lg transition-colors ${isDestructive ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 4. TOAST NOTIFICATION ---
interface ToastProps {
  message: string;
  type?: 'default' | 'success';
  isVisible: boolean;
  onClose: () => void;
}
export const Toast: React.FC<ToastProps> = ({ message, type = 'default', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-6 z-50 animate-fade-in-up">
      <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border backdrop-blur-md ${
        type === 'success' 
          ? 'bg-green-50/90 dark:bg-green-900/90 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100' 
          : 'bg-slate-800/90 border-slate-700 text-white'
      }`}>
        {type === 'success' ? <CheckIcon /> : <InfoIcon />}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};
