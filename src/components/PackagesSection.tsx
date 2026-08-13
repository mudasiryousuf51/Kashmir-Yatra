import React, { useState, useEffect } from 'react';
import { PACKAGES, getPackageWhatsAppLink, WHATSAPP_NUMBER } from '../data/kashmirData';
import { Package, PackageCategory } from '../types';
import { getActivePackages } from '../lib/packageService';
import { PackageDetailModal } from './PackageDetailModal';
import {
  MessageCircle,
  Clock,
  MapPin,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Compass,
  AlertCircle
} from 'lucide-react';

interface PackagesSectionProps {
  initialCategory?: string;
  initialSearch?: string;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  initialCategory,
  initialSearch = ''
}) => {
  const [packagesList, setPackagesList] = useState<Package[]>(PACKAGES);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [activePackage, setActivePackage] = useState<Package | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchActive = async () => {
      try {
        const loaded = await getActivePackages();
        if (isMounted && loaded && loaded.length > 0) {
          setPackagesList(loaded);
        }
      } catch (err) {
        console.warn('Could not fetch active packages from Firestore, using static data', err);
      }
    };
    fetchActive();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'holiday', label: '1. Kashmir Holiday Packages' },
    { id: 'offbeat', label: '2. Offbeat Kashmir Packages' },
    { id: 'adventure', label: '3. Adventure Tours' }
  ];

  const filteredPackages = packagesList.filter((pkg) => {
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchesDuration =
      selectedDuration === 'all' ||
      (selectedDuration === 'short' && pkg.nightsCount <= 3) ||
      (selectedDuration === 'medium' && pkg.nightsCount === 4) ||
      (selectedDuration === 'long' && pkg.nightsCount >= 5);

    const matchesSearch =
      searchQuery === '' ||
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destinationsCovered.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pkg.overview.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDuration && matchesSearch && (pkg.active !== false);
  });

  return (
    <section className="py-16 sm:py-20 bg-stone-100/70 border-b border-stone-200" id="packages-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
            Kashmir Tour Catalogue
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Thoughtfully Planned Kashmir Tour Packages
          </h2>
          <p className="text-stone-600 text-base">
            Choose from classic Kashmir holiday itineraries, crowd-free offbeat valley tours, or exhilarating mountain adventures. All packages include direct WhatsApp assistance.
          </p>
        </div>

        {/* Indicative Price Notice Banner */}
        <div className="bg-amber-50 rounded-2xl p-4 sm:p-5 border border-amber-200 text-amber-950 mb-8 shadow-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <strong className="font-bold">Indicative Starting Prices:</strong> All package rates are indicative starting prices based on double-occupancy on 3-star standard hotels. Prices vary depending on travel dates, hotel category (3★/4★/5★), vehicle type, number of travelers, and season. 
            <span className="font-semibold text-emerald-950 block mt-1">
              • Contact us on WhatsApp ({WHATSAPP_NUMBER}) for your personalized live quotation.
            </span>
          </div>
        </div>

        {/* Category Tabs & Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 mb-10 space-y-4">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-900 text-amber-300 shadow-sm ring-1 ring-emerald-800'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Duration Filter & Search */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full lg:w-auto">
              
              <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 w-full sm:w-auto text-xs text-stone-700">
                <Filter className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span className="font-semibold text-stone-500 whitespace-nowrap">Duration:</span>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="bg-transparent border-none text-xs font-semibold focus:outline-hidden cursor-pointer"
                >
                  <option value="all">All Durations</option>
                  <option value="short">3N / 4D Options</option>
                  <option value="medium">4N / 5D Options</option>
                  <option value="long">5N / 6D Options</option>
                </select>
              </div>

              <div className="relative w-full sm:w-56">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter by keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-emerald-600 focus:bg-white"
                />
              </div>

            </div>

          </div>

          {/* Offbeat Category Customization Banner */}
          {selectedCategory === 'offbeat' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 flex items-center justify-between">
              <span>
                <strong>Offbeat Itineraries Note:</strong> Roads and weather in offbeat valleys like Gurez and Bangus vary seasonally. All offbeat itineraries can be completely customized according to season and your preferences.
              </span>
            </div>
          )}

        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                
                {/* Image Header */}
                <div className="relative h-52 sm:h-60 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

                  {/* Duration Badge */}
                  <span className="absolute top-3 left-3 bg-emerald-950/90 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1 shadow-md">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    {pkg.duration}
                  </span>

                  {/* Title & Price overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white drop-shadow-md">
                      {pkg.title}
                    </h3>
                    <p className="text-amber-200 text-xs font-medium italic line-clamp-1">
                      {pkg.tagline}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-4">
                  
                  {/* Price Bar */}
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                        Starting Price
                      </span>
                      <span className="text-lg font-serif font-bold text-emerald-950">
                        ₹{pkg.startingPricePerPerson.toLocaleString('en-IN')} <span className="text-xs font-normal text-stone-600">/ person</span>
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-200">
                      Indicative Rate
                    </span>
                  </div>

                  {/* Destinations Covered */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      Destinations Covered:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {pkg.destinationsCovered.map((dest, i) => (
                        <span key={i} className="text-xs font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                          {dest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                      Package Highlights:
                    </span>
                    <ul className="space-y-1 text-xs text-stone-700">
                      {pkg.keyHighlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>

              {/* Card Action Footer */}
              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => setActivePackage(pkg)}
                  id={`pkg-details-btn-${pkg.id}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-emerald-800" />
                  <span>View Itinerary & Inclusions</span>
                </button>

                <a
                  href={getPackageWhatsAppLink(pkg.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`pkg-whatsapp-btn-${pkg.id}`}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>BOOK NOW</span>
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Modal View for Package Details */}
        {activePackage && (
          <PackageDetailModal
            pkg={activePackage}
            onClose={() => setActivePackage(null)}
          />
        )}

      </div>
    </section>
  );
};
