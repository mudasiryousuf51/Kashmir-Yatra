import React from 'react';
import { getWhatsAppLink, WHATSAPP_NUMBER } from '../data/kashmirData';
import { ShieldCheck, HeartHandshake, Sliders, Hotel, Map, Car, PhoneCall, MessageCircle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: "Local Kashmir Knowledge",
      description: "Based directly in Srinagar with firsthand, up-to-date knowledge of mountain roads, local weather, and hidden spots.",
      icon: HeartHandshake,
      color: "from-emerald-800 to-emerald-950"
    },
    {
      title: "Carefully Designed Packages",
      description: "Balanced, non-rushed itineraries crafted to give you time to soak in Kashmir's natural tranquility.",
      icon: Map,
      color: "from-amber-700 to-amber-900"
    },
    {
      title: "100% Customizable Trips",
      description: "Tailor every detail — duration, hotel category, vehicle type, and dietary preferences to suit your style.",
      icon: Sliders,
      color: "from-emerald-800 to-emerald-950"
    },
    {
      title: "Comfortable Handpicked Stays",
      description: "Verified 3★/4★/5★ hotels, heated winter resorts, and authentic wooden luxury houseboats on Dal & Nigeen Lake.",
      icon: Hotel,
      color: "from-stone-800 to-stone-950"
    },
    {
      title: "Local Sightseeing & Experiences",
      description: "Includes Shikara rides, Mughal garden strolls, meadow hikes, and authentic Kashmiri Kahwa welcome.",
      icon: ShieldCheck,
      color: "from-emerald-800 to-emerald-950"
    },
    {
      title: "Cab & Transport Assistance",
      description: "Clean, reliable private sedans and SUVs driven by courteous, mountain-experienced local Kashmiri drivers.",
      icon: Car,
      color: "from-amber-700 to-amber-900"
    },
    {
      title: "Personalized Travel Support",
      description: "Dedicated travel manager available on call and WhatsApp throughout your trip from arrival to departure.",
      icon: PhoneCall,
      color: "from-emerald-800 to-emerald-950"
    },
    {
      title: "Direct WhatsApp Assistance",
      description: "No slow email forms or automated bots. Direct human assistance on WhatsApp (+91 7006248669) for fast answers.",
      icon: MessageCircle,
      color: "from-stone-800 to-stone-950"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
            Why Travel With KashmirYatra
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Your Trusted Local Partner for Unforgettable Kashmir Journeys
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            We blend authentic local Kashmiri hospitality with modern reliability to make your vacation effortless, peaceful, and unforgettable.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-xs hover:shadow-md border border-stone-200/80 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-amber-400 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-900 mb-2 group-hover:text-emerald-900 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout Box */}
        <div className="mt-12 bg-gradient-to-r from-emerald-900 via-emerald-950 to-stone-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-200">
              Have Questions or Custom Travel Requirements?
            </h3>
            <p className="text-stone-300 text-sm max-w-2xl">
              Talk directly with our local travel expert on WhatsApp. Get instant answers about weather, hotel availability, road status, and customized quotes.
            </p>
          </div>

          <a
            href={getWhatsAppLink("Hello KashmirYatra, I would like to consult with a Kashmir travel specialist about my upcoming trip.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md transition-all shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-stone-950 text-amber-500" />
            <span>Consult on WhatsApp ({WHATSAPP_NUMBER})</span>
          </a>
        </div>

      </div>
    </section>
  );
};
