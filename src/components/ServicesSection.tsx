import React from 'react';
import { SERVICES, getWhatsAppLink, WHATSAPP_NUMBER } from '../data/kashmirData';
import {
  MessageCircle,
  CheckCircle,
  Compass,
  Hotel,
  Car,
  MapPin,
  Mountain,
  Sliders,
  Plane,
  Heart
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return Compass;
      case 'Hotel':
        return Hotel;
      case 'Car':
        return Car;
      case 'MapPin':
        return MapPin;
      case 'Mountain':
        return Mountain;
      case 'Sliders':
        return Sliders;
      case 'Plane':
        return Plane;
      case 'Heart':
        return Heart;
      default:
        return Compass;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
            Our Travel Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Comprehensive Kashmir Travel & Ground Assistance
          </h2>
          <p className="text-stone-600 text-base">
            Whether you need an end-to-end holiday package, luxury houseboat booking, private cab rentals, or honeymoon arrangements — KashmirYatra provides complete local ground support.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const IconComp = getIcon(service.iconName);
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-serif font-bold text-stone-900 mb-2 group-hover:text-emerald-900 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <ul className="space-y-1.5 text-xs text-stone-700 mb-6">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={getWhatsAppLink(`Hello KashmirYatra, I want to inquire about your ${service.title} service.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-xs border border-emerald-200 flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-800 text-emerald-100" />
                  <span>BOOK NOW</span>
                </a>

              </div>
            );
          })}
        </div>

        {/* Call to Action Banner */}
        <div className="mt-12 bg-emerald-900 rounded-2xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-2xl font-serif font-bold text-amber-300">
              Need Cab Rentals or Hotel Accommodation Only?
            </h3>
            <p className="text-stone-200 text-sm">
              We also provide standalone vehicle transfers (Etios, Innova, Tempo Traveller) and hotel bookings at direct local rates.
            </p>
          </div>

          <a
            href={getWhatsAppLink("Hello KashmirYatra, I would like to inquire about cab rentals / hotel bookings only.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md transition-all shrink-0 flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5 fill-stone-950 text-amber-500" />
            <span>BOOK NOW</span>
          </a>
        </div>

      </div>
    </section>
  );
};
