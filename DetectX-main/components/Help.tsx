import React, { useState, useEffect } from 'react';

const Help: React.FC = () => {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [address, setAddress] = useState<string>("Locating...");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          // Mock address lookup since we don't have a reverse geocoding API connected
          setAddress(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)} (Approximate)`);
        },
        (err) => {
          setError("Unable to retrieve your location.");
          setAddress("Location Unavailable");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 dark:text-slate-100">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Support & Assistance</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Need help with the platform or need to report an issue?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Card */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Contact Support</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">IT Helpdesk</p>
              <p className="text-slate-700 dark:text-slate-300 font-medium">support@detectx.gov</p>
              <p className="text-slate-700 dark:text-slate-300 font-medium">+1 (800) 555-0199</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Emergency Override</p>
              <p className="text-slate-700 dark:text-slate-300 font-medium">admin.urgent@detectx.gov</p>
            </div>
            <button className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-colors">
              Submit Ticket
            </button>
          </div>
        </div>

        {/* Location / Status Card */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Current Session Location</h2>
          <div className="space-y-4">
             <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-700">
               {error ? (
                 <div className="text-red-500 text-sm flex items-center gap-2">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   {error}
                 </div>
               ) : (
                 <>
                   <p className="text-xs font-bold text-slate-400 uppercase mb-1">Coordinates</p>
                   <p className="text-slate-800 dark:text-slate-200 font-mono text-sm">{address}</p>
                 </>
               )}
             </div>
             
             <div>
               <p className="text-xs font-bold text-slate-400 uppercase">Station ID</p>
               <p className="text-slate-700 dark:text-slate-300">DETECTX-HQ-NODE-04</p>
             </div>
             
             <div className="text-xs text-slate-400 dark:text-slate-500 mt-4 leading-relaxed">
               Location data is logged for audit purposes. Accessing this system from unauthorized locations is a violation of protocol.
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;