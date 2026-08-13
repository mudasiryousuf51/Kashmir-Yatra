import React, { useState } from 'react';
import { getWhatsAppLink, WHATSAPP_NUMBER } from '../data/kashmirData';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  Share2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [topic, setTopic] = useState('Holiday Package Booking');
  const [name, setName] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [notes, setNotes] = useState('');

  const handleDispatchWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMessage = `Hello KashmirYatra!
- Inquiry Topic: ${topic}
- Name: ${name || 'Traveler'}
- Proposed Travel Dates: ${travelDates || 'Flexible'}
- Requirements/Notes: ${notes || 'Interested in package and pricing options.'}`;

    window.open(getWhatsAppLink(formattedMessage), '_blank');
  };

  return (
    <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3.5 py-1 rounded-full border border-emerald-200">
            Contact KashmirYatra
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            We Are Here to Assist Your Kashmir Journey
          </h2>
          <p className="text-stone-600 text-base">
            Reach out directly to our local Kashmir team on WhatsApp or phone for instant inquiries, package customizations, or local ground guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Information & Primary Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Brand Card */}
            <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-stone-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 border border-emerald-500/20">
              
              <div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  KashmirYatra
                </h3>
                <p className="text-amber-300 text-xs uppercase tracking-wider font-semibold">
                  Discover Kashmir, Your Way.
                </p>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="bg-emerald-900/80 rounded-xl p-4 border border-emerald-500/30 space-y-2">
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                  Primary Contact Action
                </span>
                <a
                  href={getWhatsAppLink("Hello KashmirYatra, I would like to inquire about tour packages.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xl font-bold text-amber-300 hover:text-amber-200 transition-colors"
                >
                  <MessageCircle className="w-6 h-6 fill-amber-300 text-emerald-900 shrink-0" />
                  <span>{WHATSAPP_NUMBER}</span>
                </a>
                <p className="text-xs text-stone-300">
                  Click to open direct chat on WhatsApp (Mobile & Desktop).
                </p>
              </div>

              {/* Contact Points */}
              <div className="space-y-4 text-xs sm:text-sm text-stone-200">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Direct Phone Call:</strong>
                    <span>{WHATSAPP_NUMBER}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Email Address:</strong>
                    <span>info@kashmiryatra.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Local Office Location:</strong>
                    <span>Boulevard Road, Near Dal Lake Gate No. 1, Srinagar, Jammu & Kashmir 190001</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Working Hours:</strong>
                    <span>9:00 AM – 9:00 PM IST (WhatsApp Support Available 24/7)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Stay Connected / Socials */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-emerald-700" />
                <span>Stay Connected on Social Media</span>
              </h4>
              <p className="text-xs text-stone-600">
                Follow our official social profiles for daily Kashmir snowfall updates, seasonal blooming alerts, and travel tips.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-semibold text-xs border border-emerald-200 flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-800 text-emerald-50" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs border border-stone-200 transition-colors"
                  title="Facebook Placeholder"
                >
                  Facebook
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs border border-stone-200 transition-colors"
                  title="Instagram Placeholder"
                >
                  Instagram
                </a>
              </div>
            </div>

          </div>

          {/* WhatsApp Direct Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-6">
              
              <div>
                <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Quick WhatsApp Direct Message Dispatch</span>
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm mt-1">
                  Fill out your basic travel request below and click dispatch. It opens WhatsApp immediately with a pre-formatted message for our team!
                </p>
              </div>

              <form onSubmit={handleDispatchWhatsApp} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Select Topic / Service
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 focus:outline-hidden focus:border-emerald-600"
                  >
                    <option value="Holiday Package Booking">Kashmir Holiday Package Inquiry</option>
                    <option value="Offbeat Kashmir Tour">Offbeat Kashmir Package Inquiry</option>
                    <option value="Honeymoon Special">Honeymoon Package Inquiry</option>
                    <option value="Adventure & Skiing">Adventure & Skiing Inquiry</option>
                    <option value="Cab & Transport Only">Cab / Taxi Rental Inquiry</option>
                    <option value="Hotel / Houseboat Booking">Hotel / Houseboat Booking Inquiry</option>
                    <option value="General Travel Question">General Kashmir Question</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Approximate Travel Dates / Month
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 15th to 20th May 2026"
                      value={travelDates}
                      onChange={(e) => setTravelDates(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 focus:outline-hidden focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Trip Requirements / Questions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Traveling with family of 4. Need 3-star hotel + Houseboat stay and Innova cab."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  id="dispatch-whatsapp-btn"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span>BOOK NOW</span>
                  <Send className="w-4 h-4" />
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
