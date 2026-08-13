import React, { useState } from 'react';
import { DESTINATIONS } from '../data/kashmirData';
import { Destination } from '../types';
import { getWhatsAppLink, WHATSAPP_NUMBER } from '../data/kashmirData';
import { MapPin, Clock, Calendar, MessageCircle, X, Compass, ChevronRight, CheckCircle2 } from 'lucide-react';

interface DestinationsSectionProps {
  initialSearch?: string;
  onSelectDestinationPackage?: (destinationName: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  initialSearch = '',
  onSelectDestinationPackage
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);

  const categories = [
    { id: 'all', label: 'All Destinations' },
    { id: 'popular', label: 'Popular Highlights' },
    { id: 'offbeat', label: 'Offbeat Valleys' },
    { id: 'valley', label: 'Mountain Valleys' },
    { id: 'lakes_gardens', label: 'Lakes & Gardens' }
  ];

  const filteredDestinations = DESTINATIONS.filter((dest) => {
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.mainAttractions.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 sm:py-20 bg-white" id="destinations-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
            Explore Kashmir Destinations
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Landscapes of Paradise & Hidden Mountain Treasures
          </h2>
          <p className="text-stone-600 text-base">
            From the mirror-like waters of Dal Lake to the powdery snow of Gulmarg and border valleys of Gurez — explore Kashmir's finest locations.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-200">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-900 text-amber-300 shadow-md ring-1 ring-emerald-800'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search destination or spot..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all"
            />
          </div>

        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Image & Badge */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
                    {dest.tag}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-2xl font-serif font-bold drop-shadow-md">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <p className="text-stone-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {dest.shortDesc}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-200">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" />
                      {dest.recommendedDuration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                      {dest.bestTimeToVisit.split('(')[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setActiveDestination(dest)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Explore Destination</span>
                </button>

                <a
                  href={getWhatsAppLink(`Hello KashmirYatra, I would like to inquire about customized tours to ${dest.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                  title={`Book ${dest.name} on WhatsApp`}
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Modal for Destination Details */}
        {activeDestination && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative">
              
              {/* Close Button */}
              <button
                onClick={() => setActiveDestination(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-950/60 hover:bg-stone-950 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Header */}
              <div className="relative h-64 sm:h-72">
                <img
                  src={activeDestination.image}
                  alt={activeDestination.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-800/80 text-amber-300 border border-emerald-500/30">
                    {activeDestination.tag}
                  </span>
                  <h3 className="text-3xl font-serif font-bold text-white">
                    {activeDestination.name}
                  </h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                    About {activeDestination.name}
                  </h4>
                  <p className="text-stone-700 text-sm leading-relaxed">
                    {activeDestination.longDesc}
                  </p>
                </div>

                {/* Grid Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200/80">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" />
                      Recommended Stay:
                    </span>
                    <p className="text-sm font-bold text-stone-900">{activeDestination.recommendedDuration}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-stone-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                      Best Season to Visit:
                    </span>
                    <p className="text-sm font-bold text-stone-900">{activeDestination.bestTimeToVisit}</p>
                  </div>
                </div>

                {/* Key Attractions */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                    <span>Main Attractions in {activeDestination.name}:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeDestination.mainAttractions.map((spot, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-stone-700 bg-stone-100 p-2 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{spot}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Things to Do */}
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-stone-900">Things to Do:</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeDestination.thingsToDo.map((thing, i) => (
                      <span key={i} className="text-xs font-medium bg-emerald-50 text-emerald-950 px-3 py-1 rounded-full border border-emerald-200">
                        • {thing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Nearby */}
                {activeDestination.nearbyDestinations.length > 0 && (
                  <div className="text-xs text-stone-500 pt-2 border-t border-stone-200">
                    <strong className="text-stone-700">Nearby Destinations:</strong> {activeDestination.nearbyDestinations.join(' • ')}
                  </div>
                )}

                {/* WhatsApp Action */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={getWhatsAppLink(`Hello KashmirYatra, I am interested in visiting ${activeDestination.name}. Please send trip details and itinerary options.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                    <span>BOOK NOW</span>
                  </a>

                  {onSelectDestinationPackage && (
                    <button
                      onClick={() => {
                        setActiveDestination(null);
                        onSelectDestinationPackage(activeDestination.name);
                      }}
                      className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>View Packages</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
