import React, { useState } from 'react';
import { getWhatsAppLink, WHATSAPP_NUMBER, HERO_IMAGES } from '../data/kashmirData';
import { MessageCircle, Compass, ShieldCheck, Star, Search, MapPin, Calendar, Sparkles } from 'lucide-react';

interface HeroProps {
  onExplorePackages: (category?: string, destination?: string) => void;
  onOpenCustomBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplorePackages, onOpenCustomBuilder }) => {
  const [searchDestination, setSearchDestination] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onExplorePackages(searchCategory || undefined, searchDestination || undefined);
  };

  return (
    <section className="relative pt-24 pb-16 lg:pt-28 lg:pb-24 bg-stone-900 text-white overflow-hidden" id="hero-section">
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGES.dalLake}
          alt="Dal Lake Kashmir Paradise"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/75 to-stone-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Trust Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 backdrop-blur-md border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-medium shadow-lg">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>100% Local Kashmir Travel Experts • 24/7 WhatsApp Support</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight sm:leading-none tracking-tight">
              Discover the <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 italic">
                Paradise of Kashmir
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-stone-200 text-base sm:text-lg md:text-xl font-normal max-w-2xl leading-relaxed">
              Beautiful landscapes, unforgettable experiences and thoughtfully planned Kashmir journeys. 
              Customized tours, luxury houseboats, and snow excursions with direct personal WhatsApp guidance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onExplorePackages()}
                id="hero-explore-btn"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-base shadow-xl hover:shadow-amber-500/20 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Compass className="w-5 h-5 text-stone-950" />
                <span>Explore Packages</span>
              </button>

              <a
                href={getWhatsAppLink("Hello KashmirYatra, I am planning a trip to Kashmir. Please share package options and availability.")}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-xl hover:shadow-emerald-600/30 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>BOOK NOW</span>
              </a>
            </div>

            {/* Micro Trust Points */}
            <div className="pt-4 grid grid-cols-3 gap-2 border-t border-white/10 text-xs sm:text-sm text-stone-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Custom Itineraries</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Private Cabs</span>
              </div>
            </div>

          </div>

          {/* Quick Package Search & Custom Planner Card */}
          <div className="lg:col-span-5">
            <div className="bg-stone-900/85 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/15 shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Quick Trip Finder</span>
                  </h3>
                  <p className="text-stone-400 text-xs mt-0.5">Filter by destination or trip type</p>
                </div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Instant Quotes
                </span>
              </div>

              <form onSubmit={handleQuickSearch} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Where do you want to go?</span>
                  </label>
                  <select
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    className="w-full bg-stone-950/80 border border-white/20 rounded-xl px-3.5 py-3 text-stone-100 text-sm focus:outline-hidden focus:border-amber-400 cursor-pointer"
                  >
                    <option value="">All Destinations (Srinagar, Gulmarg, Pahalgam, Gurez...)</option>
                    <option value="Srinagar">Srinagar & Dal Lake</option>
                    <option value="Gulmarg">Gulmarg Snow Meadows</option>
                    <option value="Pahalgam">Pahalgam Valleys</option>
                    <option value="Sonamarg">Sonamarg Glaciers</option>
                    <option value="Doodhpathri">Doodhpathri (Offbeat)</option>
                    <option value="Gurez Valley">Gurez Valley (Border Jewel)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Travel Style</span>
                  </label>
                  <select
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="w-full bg-stone-950/80 border border-white/20 rounded-xl px-3.5 py-3 text-stone-100 text-sm focus:outline-hidden focus:border-amber-400 cursor-pointer"
                  >
                    <option value="">All Trip Styles</option>
                    <option value="holiday">Kashmir Holiday Packages</option>
                    <option value="offbeat">Offbeat Kashmir Packages</option>
                    <option value="adventure">Adventure & Skiing Tours</option>
                  </select>
                </div>

                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Available Packages</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenCustomBuilder}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200 font-medium text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Need Custom Itinerary? Build on WhatsApp ({WHATSAPP_NUMBER})</span>
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
