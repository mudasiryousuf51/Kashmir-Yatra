import React from 'react';
import { getWhatsAppLink, WHATSAPP_NUMBER } from '../data/kashmirData';
import { MessageCircle, Phone, Home, Compass, Package, Headset } from 'lucide-react';

interface FloatingWhatsAppProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ activeTab, setActiveTab }) => {
  return (
    <>
      {/* Desktop & Tablet Floating WhatsApp Button */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2 group animate-bounce duration-[3000ms]">
        
        {/* Tooltip Badge */}
        <div className="bg-stone-900 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xl border border-emerald-500/30 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>BOOK NOW: <strong className="text-amber-300">{WHATSAPP_NUMBER}</strong></span>
        </div>

        {/* Floating Circle Button */}
        <a
          href={getWhatsAppLink("Hello KashmirYatra, I am interested in booking a Kashmir trip. Please share package details.")}
          target="_blank"
          rel="noopener noreferrer"
          id="floating-whatsapp-btn"
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl flex items-center justify-center ring-4 ring-emerald-400/30 transition-transform duration-300 transform group-hover:scale-110 cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
        </a>
      </div>

      {/* Mobile Bottom Sticky Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-md border-t border-stone-800 p-2 text-white shadow-2xl">
        <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
          
          <button
            onClick={() => setActiveTab('home')}
            className={`flex-1 py-1.5 flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold cursor-pointer ${
              activeTab === 'home' ? 'text-amber-400 font-bold' : 'text-stone-400'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('destinations')}
            className={`flex-1 py-1.5 flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold cursor-pointer ${
              activeTab === 'destinations' ? 'text-amber-400 font-bold' : 'text-stone-400'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Places</span>
          </button>

          {/* Primary Mobile WhatsApp Button */}
          <a
            href={getWhatsAppLink("Hello KashmirYatra, I am planning a Kashmir trip. Please assist.")}
            target="_blank"
            rel="noopener noreferrer"
            id="mobile-sticky-whatsapp-btn"
            className="flex-[2.2] py-2 px-3 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600 shrink-0" />
            <span>BOOK NOW</span>
          </a>

          <button
            onClick={() => setActiveTab('packages')}
            className={`flex-1 py-1.5 flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold cursor-pointer ${
              activeTab === 'packages' ? 'text-amber-400 font-bold' : 'text-stone-400'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Packages</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-1.5 flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold cursor-pointer ${
              activeTab === 'contact' ? 'text-amber-400 font-bold' : 'text-stone-400'
            }`}
          >
            <Headset className="w-4 h-4" />
            <span>Contact</span>
          </button>

        </div>
      </div>
    </>
  );
};
