import React from 'react';
import { REVIEWS, getWhatsAppLink, WHATSAPP_NUMBER, HERO_IMAGES } from '../data/kashmirData';
import { ShieldCheck, HeartHandshake, Award, Star, MessageCircle, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Narrative Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
              About KashmirYatra
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-tight">
              Kashmir-Focused Travel Experts Dedicated to Your Dream Vacation
            </h2>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              At <strong>KashmirYatra</strong>, we believe Kashmir is not merely a destination — it is an emotion. Founded and operated directly in Srinagar, we are a passionate team of local Kashmir travel specialists who take immense pride in sharing our homeland's breathtaking beauty with travelers from around the world.
            </p>

            <p className="text-stone-600 text-sm leading-relaxed">
              We specialize in non-rushed, thoughtfully curated tour packages that combine iconic landmarks like Dal Lake and Gulmarg with peaceful offbeat gems like Doodhpathri and Gurez Valley. We operate purely on direct, personal interaction via WhatsApp to ensure maximum transparency, personalized care, and zero agent markups.
            </p>

            {/* Core Formula Box */}
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 text-emerald-950 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Our Core Promise
              </span>
              <p className="text-base sm:text-lg font-serif font-bold text-emerald-950">
                Local Knowledge + Personalized Service + Beautiful Experiences
              </p>
              <p className="text-xs text-stone-600">
                Every itinerary is customized to your pace, preferences, and season with 24/7 on-ground assistance throughout your journey.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppLink("Hello KashmirYatra team, I would like to learn more about your tour planning and local Kashmir services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>BOOK NOW</span>
              </a>
            </div>

          </div>

          {/* Visual Grid Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src={HERO_IMAGES.dalLake}
                alt="Dal Lake Houseboat Kashmir"
                referrerPolicy="no-referrer"
                className="rounded-2xl shadow-md h-56 w-full object-cover"
              />
              <img
                src={HERO_IMAGES.gulmarg}
                alt="Gulmarg Snow Slopes"
                referrerPolicy="no-referrer"
                className="rounded-2xl shadow-md h-40 w-full object-cover"
              />
            </div>
            <div className="space-y-4 pt-6">
              <img
                src={HERO_IMAGES.pahalgam}
                alt="Pahalgam Lidder River"
                referrerPolicy="no-referrer"
                className="rounded-2xl shadow-md h-40 w-full object-cover"
              />
              <img
                src={HERO_IMAGES.shikara}
                alt="Kashmiri Houseboat"
                referrerPolicy="no-referrer"
                className="rounded-2xl shadow-md h-56 w-full object-cover"
              />
            </div>
          </div>

        </div>

        {/* Stats Counter Bar */}
        <div className="bg-stone-900 rounded-2xl p-8 text-white shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">100%</span>
            <p className="text-xs text-stone-300 font-semibold uppercase tracking-wider">Local Kashmir Roots</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">1,500+</span>
            <p className="text-xs text-stone-300 font-semibold uppercase tracking-wider">Happy Travelers</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">50+</span>
            <p className="text-xs text-stone-300 font-semibold uppercase tracking-wider">Custom Itineraries</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-400">24/7</span>
            <p className="text-xs text-stone-300 font-semibold uppercase tracking-wider">WhatsApp Ground Support</p>
          </div>
        </div>

        {/* Traveler Reviews / Testimonials */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
              Traveler Experiences
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Loved by Travelers Across India
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200 mt-4 flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-emerald-300"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{rev.name}</h4>
                    <span className="text-[11px] text-stone-500">{rev.location} • {rev.packageTaken}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
