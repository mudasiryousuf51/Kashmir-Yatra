import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  MessageCircle,
  Compass,
  MapPin,
  RefreshCw,
  User,
  ExternalLink,
  HelpCircle,
  Sun,
  Utensils,
  Car
} from 'lucide-react';
import { getWhatsAppLink } from '../data/kashmirData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  initialQuery,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      text: `Khush Amdeed! 👋 I am **Kashmi**, your KashmirYatra travel consultant.

“Your Journey to Paradise Begins Here” — How may I help you plan your Kashmir trip today?

You can ask me about:
• **Packages & Pricing** (e.g. Kashmir Escape 3N/4D, Kashmir Explorer 4N/5D, Grand Tour 5N/6D)
• **Offbeat & Adventure** (Gurez Valley, Doodhpathri, Skiing, Rafting & Trekking)
• **Destinations & Sightseeing** (Srinagar, Gulmarg Gondola, Pahalgam Valleys, Sonamarg)
• **Services & WhatsApp Booking** (+91 7006248669)`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    {
      label: '4-Day Kashmir Escape',
      icon: Compass,
      query: 'What is included in the Kashmir Escape (3N/4D) package and what is the starting price?',
    },
    {
      label: '5-Day Explorer (Pahalgam Stay)',
      icon: MapPin,
      query: 'Can you tell me about the Kashmir Explorer (4N/5D) package and its itinerary?',
    },
    {
      label: 'Offbeat Gurez Valley Tour',
      icon: Compass,
      query: 'Tell me about the Offbeat Kashmir Explorer (4N/5D) to Gurez Valley and permit requirements.',
    },
    {
      label: 'How to Book on WhatsApp',
      icon: MessageCircle,
      query: 'How do I book a tour package with KashmirYatra and what is your booking process?',
    },
  ];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle initial query if passed from weather or other components
  useEffect(() => {
    if (isOpen && initialQuery && initialQuery.trim().length > 0) {
      handleSendMessage(initialQuery);
    }
  }, [isOpen, initialQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query || query.trim().length === 0 || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      // Prepare history for API call
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query.trim(),
          history: historyPayload,
        }),
      });

      const data = await res.json();

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: data.text || data.fallbackText || 'I am happy to assist you with your Kashmir travel plans! Please let me know your preferred dates or destinations.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: `Khush Amdeed! Here is a helpful Kashmir travel guide:

- **Srinagar**: Stay on a Dal Lake houseboat & enjoy evening Shikara rides.
- **Gulmarg**: Enjoy snow activities & Asia's highest Gondola cable car.
- **Pahalgam**: Visit Betaab Valley, Aru Valley, & Lidder riverbanks.
- **Gurez Valley**: Breathtaking border valley with Habba Khatoon peak.

*To get an exact quote or book your customized tour, click "BOOK NOW" below to connect with our Srinagar local team on WhatsApp!*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-2 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-emerald-500/30 rounded-2xl shadow-2xl flex flex-col h-[88vh] sm:h-[80vh] overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative p-2 rounded-xl bg-emerald-600 text-white shadow-md">
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-stone-900 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-serif">Kashmi AI Concierge</h3>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30 font-semibold flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Gemini Powered
                </span>
              </div>
              <p className="text-xs text-stone-300">
                KashmirYatra Local Travel Assistant • Your Journey to Paradise Begins Here
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
            aria-label="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-stone-950/60 border-b border-stone-800 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider shrink-0 pl-1">
            Ask AI:
          </span>
          {quickPrompts.map((chip, idx) => {
            const IconComp = chip.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.query)}
                disabled={loading}
                className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-emerald-900/60 text-stone-200 hover:text-amber-200 text-xs font-medium border border-stone-700 hover:border-emerald-500/50 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <IconComp className="w-3.5 h-3.5 text-amber-400" />
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>

        {/* Message Container */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-stone-900/90 text-stone-100">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-md ${
                    isUser
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-emerald-700 text-white border border-emerald-400/30'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                    isUser
                      ? 'bg-amber-500/20 text-amber-100 border border-amber-500/30 rounded-tr-none'
                      : 'bg-stone-800 text-stone-200 border border-stone-700 rounded-tl-none space-y-2'
                  }`}
                >
                  <div className="space-y-1.5">
                    {msg.text.split('\n').map((line, lIdx) => {
                      if (!line.trim()) {
                        return <div key={lIdx} className="h-1.5" />;
                      }

                      // Helper to parse bold and links inside a line
                      const parseLineContent = (text: string) => {
                        // Regex for markdown links [text](url) or bold **text**
                        const parts = [];
                        let remaining = text;
                        let keyCounter = 0;

                        // Match markdown links [text](url)
                        const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
                        let match;
                        let lastIdx = 0;

                        while ((match = linkRegex.exec(text)) !== null) {
                          if (match.index > lastIdx) {
                            parts.push({ type: 'text', content: text.slice(lastIdx, match.index) });
                          }
                          parts.push({ type: 'link', text: match[1], url: match[2] });
                          lastIdx = linkRegex.lastIndex;
                        }
                        if (lastIdx < text.length) {
                          parts.push({ type: 'text', content: text.slice(lastIdx) });
                        }

                        return parts.map((part, pIdx) => {
                          if (part.type === 'link') {
                            return (
                              <a
                                key={pIdx}
                                href={part.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:text-emerald-300 underline font-bold inline-flex items-center gap-0.5 mx-0.5 transition-colors"
                              >
                                {part.text}
                              </a>
                            );
                          }

                          // Parse bold in text segment
                          if (part.content && part.content.includes('**')) {
                            const subParts = part.content.split('**');
                            return (
                              <span key={pIdx}>
                                {subParts.map((sub, sIdx) =>
                                  sIdx % 2 === 1 ? (
                                    <strong key={sIdx} className="text-amber-300 font-bold">
                                      {sub}
                                    </strong>
                                  ) : (
                                    sub
                                  )
                                )}
                              </span>
                            );
                          }

                          return <span key={pIdx}>{part.content}</span>;
                        });
                      };

                      return (
                        <p key={lIdx} className="leading-relaxed">
                          {parseLineContent(line)}
                        </p>
                      );
                    })}
                  </div>

                  <span className="text-[10px] text-stone-400 block text-right mt-1 opacity-70">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Loading Typing Indicator */}
          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-stone-800 rounded-2xl p-3 border border-stone-700 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
                <span className="text-xs text-stone-300 italic">Kashmi is thinking & searching Kashmir updates...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Bottom Input Area */}
        <div className="p-3 sm:p-4 bg-stone-950 border-t border-stone-800 space-y-3 shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Kashmi about itineraries, Gulmarg snow, houseboats..."
              disabled={loading}
              className="flex-1 bg-stone-900 border border-stone-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-stone-400 outline-none transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || inputMessage.trim().length === 0}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer shrink-0"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Finalize on WhatsApp Callout */}
          <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
            <span>Ready to book your custom trip?</span>
            <a
              href={getWhatsAppLink("Hello KashmirYatra, I received trip suggestions from your AI Concierge and want to book my Kashmir tour.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 underline"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 text-stone-950" />
              <span>BOOK NOW ON WHATSAPP</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
