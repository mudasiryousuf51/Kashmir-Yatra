import React, { useState } from 'react';
import { getCustomPlanWhatsAppLink, WHATSAPP_NUMBER } from '../data/kashmirData';
import { Sliders, MessageCircle, Sparkles, Check, Send } from 'lucide-react';

export const CustomTourBuilder: React.FC = () => {
  const [duration, setDuration] = useState('4 Nights / 5 Days');
  const [travelers, setTravelers] = useState('Couple (2 Persons)');
  const [season, setSeason] = useState('Upcoming Month');
  const [stayType, setStayType] = useState('3-Star Deluxe Hotel + Houseboat');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Srinagar & Dal Lake Houseboat',
    'Gulmarg Gondola & Snow'
  ]);

  const interestOptions = [
    'Srinagar & Dal Lake Houseboat',
    'Gulmarg Gondola & Snow',
    'Pahalgam & Lidder River',
    'Sonamarg & Glaciers',
    'Doodhpathri Offbeat Meadow',
    'Gurez Valley Border Trip',
    'Honeymoon Romantic Inclusions',
    'River Rafting & Adventure'
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const whatsappUrl = getCustomPlanWhatsAppLink({
    duration,
    travelers,
    season,
    stayType,
    interests: selectedInterests.length > 0 ? selectedInterests : ['Custom Kashmir Sightseeing']
  });

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-stone-900 via-emerald-950 to-stone-950 text-white" id="custom-builder">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Trip Planner</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Design Your Custom Kashmir Itinerary
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
            Select your preferences below to craft a tailored travel plan. Send your choices directly to our local Kashmir travel specialist on WhatsApp for instant assistance.
          </p>
        </div>

        {/* Builder Form Card */}
        <div className="bg-stone-900/90 rounded-2xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Duration */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                1. Trip Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-stone-950 border border-white/20 rounded-xl px-3.5 py-3 text-stone-100 text-xs sm:text-sm focus:outline-hidden focus:border-amber-400 cursor-pointer"
              >
                <option value="3 Nights / 4 Days">3 Nights / 4 Days</option>
                <option value="4 Nights / 5 Days">4 Nights / 5 Days</option>
                <option value="5 Nights / 6 Days">5 Nights / 6 Days</option>
                <option value="6 Nights / 7 Days">6 Nights / 7 Days</option>
                <option value="7+ Nights Customized">7+ Nights Long Stay</option>
              </select>
            </div>

            {/* Travelers */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                2. Travelers Group
              </label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full bg-stone-950 border border-white/20 rounded-xl px-3.5 py-3 text-stone-100 text-xs sm:text-sm focus:outline-hidden focus:border-amber-400 cursor-pointer"
              >
                <option value="Couple (2 Persons)">Couple (2 Persons)</option>
                <option value="Honeymoon Couple">Honeymoon Couple</option>
                <option value="Family (3-5 Persons)">Family (3-5 Persons)</option>
                <option value="Group (6+ Persons)">Group (6+ Persons)</option>
                <option value="Solo Traveler">Solo Traveler</option>
              </select>
            </div>

            {/* Season */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                3. Preferred Month
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full bg-stone-950 border border-white/20 rounded-xl px-3.5 py-3 text-stone-100 text-xs sm:text-sm focus:outline-hidden focus:border-amber-400 cursor-pointer"
              >
                <option value="Spring (March - May)">Spring (March - May)</option>
                <option value="Summer (June - August)">Summer (June - August)</option>
                <option value="Autumn Chinar (Sept - Nov)">Autumn Chinar (Sept - Nov)</option>
                <option value="Winter Snow (Dec - Feb)">Winter Snow (Dec - Feb)</option>
                <option value="Immediate / Flexible">Immediate / Flexible</option>
              </select>
            </div>

            {/* Stay Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                4. Accommodation Level
              </label>
              <select
                value={stayType}
                onChange={(e) => setStayType(e.target.value)}
                className="w-full bg-stone-950 border border-white/20 rounded-xl px-3.5 py-3 text-stone-100 text-xs sm:text-sm focus:outline-hidden focus:border-amber-400 cursor-pointer"
              >
                <option value="3-Star Deluxe Hotel + Houseboat">3-Star Deluxe Hotel + Houseboat</option>
                <option value="4-Star Premium Resort + Luxury Houseboat">4-Star Premium Resort + Luxury Houseboat</option>
                <option value="5-Star Luxury Resort Stays">5-Star Luxury Resort Stays</option>
                <option value="Budget Cozy Hotels">Budget Cozy Hotels</option>
              </select>
            </div>

          </div>

          {/* Preferred Destinations & Inclusions Chips */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              5. Select Places & Inclusions You Want To Experience:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {interestOptions.map((item, idx) => {
                const isSelected = selectedInterests.includes(item);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleInterest(item)}
                    className={`p-3 rounded-xl text-xs text-left font-semibold transition-all flex items-center justify-between cursor-pointer border ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-bold'
                        : 'bg-stone-950/80 text-stone-300 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span className="line-clamp-2">{item}</span>
                    {isSelected && <Check className="w-4 h-4 shrink-0 text-stone-950 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Send to WhatsApp CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <div>
              <p className="text-xs text-stone-300 font-medium">Your customized request will be formatted automatically.</p>
              <p className="text-xs text-amber-200 font-semibold">
                WhatsApp Destination: +91 7006248669 (KashmirYatra)
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="custom-plan-whatsapp-btn"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>BOOK NOW</span>
              <Send className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
