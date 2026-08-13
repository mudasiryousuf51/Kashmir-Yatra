import React, { useState } from 'react';
import { Package } from '../types';
import { getPackageWhatsAppLink, WHATSAPP_NUMBER } from '../data/kashmirData';
import {
  X,
  MessageCircle,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Calendar,
  Sparkles,
  Hotel,
  Car,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Info,
  ShieldAlert
} from 'lucide-react';

interface PackageDetailModalProps {
  pkg: Package | null;
  onClose: () => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({ pkg, onClose }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  if (!pkg) return null;

  const toggleDay = (dayNum: number) => {
    setExpandedDay(expandedDay === dayNum ? null : dayNum);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative my-auto">
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          id="close-package-modal"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-950/70 hover:bg-stone-950 text-white shadow-lg transition-colors cursor-pointer"
          aria-label="Close Package Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

          {/* Badges & Title */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-800 text-amber-300 px-3 py-1 rounded-full border border-emerald-500/30">
                {pkg.category === 'holiday' ? 'Holiday Package' : pkg.category === 'offbeat' ? 'Offbeat Kashmir' : 'Adventure Tour'}
              </span>
              <span className="text-xs font-bold bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/30 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                {pkg.duration}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white drop-shadow-md">
              {pkg.title}
            </h2>
            <p className="text-amber-200 text-xs sm:text-sm font-medium italic">
              {pkg.tagline}
            </p>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="p-6 sm:p-8 space-y-8">

          {/* Price Bar & WhatsApp Direct CTA */}
          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Indicative Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950">
                  Starting from ₹{pkg.startingPricePerPerson.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-stone-600 font-semibold">per person</span>
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                *Prices are indicative and vary based on travel dates, hotel category & season.
              </p>
            </div>

            <a
              href={getPackageWhatsAppLink(pkg.title)}
              target="_blank"
              rel="noopener noreferrer"
              id="modal-whatsapp-book-btn"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>BOOK NOW</span>
            </a>
          </div>

          {/* Overview Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-200 pb-2">
              Package Overview
            </h3>
            <p className="text-stone-700 text-sm leading-relaxed">
              {pkg.overview}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="space-y-3 bg-stone-50 p-5 rounded-xl border border-stone-200/80">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Key Trip Highlights</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {pkg.keyHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-stone-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Destinations Covered */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Destinations Covered:
            </span>
            <div className="flex flex-wrap gap-2">
              {pkg.destinationsCovered.map((dest, i) => (
                <span key={i} className="text-xs font-semibold bg-stone-100 text-stone-800 px-3 py-1 rounded-full border border-stone-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-700" />
                  {dest}
                </span>
              ))}
            </div>
          </div>

          {/* Day-by-Day Itinerary */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-stone-900 border-b border-stone-200 pb-2">
              Day-by-Day Detailed Itinerary
            </h3>

            <div className="space-y-3">
              {pkg.itinerary.map((day) => {
                const isOpen = expandedDay === day.day;
                return (
                  <div
                    key={day.day}
                    className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-2xs"
                  >
                    {/* Day Header Accordion Toggle */}
                    <button
                      onClick={() => toggleDay(day.day)}
                      className="w-full p-4 flex items-center justify-between text-left bg-stone-50/80 hover:bg-stone-100/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-emerald-900 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
                          Day {day.day}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-stone-900">
                            {day.title}
                          </h4>
                          <span className="text-[11px] text-stone-500 block">
                            Meals: {day.mealsIncluded} • Stay: {day.overnightStay}
                          </span>
                        </div>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-stone-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-stone-500 shrink-0" />
                      )}
                    </button>

                    {/* Day Details */}
                    {isOpen && (
                      <div className="p-4 sm:p-5 border-t border-stone-100 space-y-3 bg-white text-xs sm:text-sm text-stone-700">
                        <p className="leading-relaxed">{day.description}</p>

                        <div className="pt-2">
                          <strong className="text-xs text-stone-900 font-semibold block mb-1.5">
                            Day's Activities:
                          </strong>
                          <div className="flex flex-wrap gap-1.5">
                            {day.activities.map((act, actIdx) => (
                              <span
                                key={actIdx}
                                className="bg-emerald-50 text-emerald-950 px-2.5 py-1 rounded-md text-xs font-medium border border-emerald-100"
                              >
                                • {act}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stay & Transport Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Hotel className="w-4 h-4 text-emerald-700" />
                <span>Accommodation Info</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {pkg.accommodationInfo}
              </p>
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-emerald-700" />
                <span>Transportation Info</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {pkg.transportationInfo}
              </p>
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Inclusions */}
            <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200/80 space-y-3">
              <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Inclusions</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-700">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-amber-50/60 p-5 rounded-xl border border-amber-200/80 space-y-3">
              <h4 className="text-sm font-bold text-amber-950 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-amber-600" />
                <span>Exclusions</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-700">
                {pkg.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Important Notes */}
          {pkg.importantNotes && pkg.importantNotes.length > 0 && (
            <div className="bg-stone-100 p-4 rounded-xl space-y-2 text-xs text-stone-700 border border-stone-200">
              <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>Important Travel Notes:</span>
              </h4>
              <ul className="list-disc list-inside space-y-1 pl-1">
                {pkg.importantNotes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Sticky Bottom WhatsApp Booking Bar */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-stone-500 font-medium">Ready to confirm or request a custom quote?</p>
              <p className="text-sm font-bold text-emerald-950">
                Speak directly with KashmirYatra on WhatsApp: {WHATSAPP_NUMBER}
              </p>
            </div>

            <a
              href={getPackageWhatsAppLink(pkg.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>BOOK NOW</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
