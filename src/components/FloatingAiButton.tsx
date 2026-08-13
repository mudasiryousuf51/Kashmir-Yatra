import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

interface FloatingAiButtonProps {
  onOpen: () => void;
}

export const FloatingAiButton: React.FC<FloatingAiButtonProps> = ({ onOpen }) => {
  return (
    <div className="fixed bottom-24 right-6 z-40 hidden md:flex flex-col items-end gap-1.5 group">
      
      {/* Tooltip Badge */}
      <div className="bg-gradient-to-r from-emerald-900 to-stone-900 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl border border-emerald-500/40 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Ask AI Travel Concierge</span>
      </div>

      {/* Circle Floating Button */}
      <button
        onClick={onOpen}
        className="w-13 h-13 rounded-full bg-gradient-to-br from-amber-500 via-emerald-600 to-emerald-800 hover:from-amber-400 hover:to-emerald-500 text-stone-950 shadow-2xl flex items-center justify-center ring-4 ring-amber-400/30 transition-transform duration-300 transform group-hover:scale-110 cursor-pointer"
        aria-label="Ask Kashmir AI Assistant"
      >
        <Bot className="w-6 h-6 text-white" />
      </button>

    </div>
  );
};
