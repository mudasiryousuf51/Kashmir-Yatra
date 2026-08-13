import React from 'react';
import { Logo } from './Logo';
import { getWhatsAppLink, WHATSAPP_NUMBER } from '../data/kashmirData';
import { MessageCircle, Phone, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  setPolicyTab?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, setPolicyTab }) => {
  const handleNav = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePolicyNav = (policyId: string) => {
    setActiveTab('policies');
    if (setPolicyTab) {
      setPolicyTab(policyId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-white pt-16 pb-12 border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div onClick={() => handleNav('home')}>
              <Logo variant="footer" size="lg" />
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Your trusted Srinagar-based travel partner for authentic Kashmir holiday packages, offbeat valley explorations, adventure tours, and 24/7 WhatsApp travel guidance.
            </p>

            <div className="pt-2">
              <a
                href={getWhatsAppLink("Hello KashmirYatra, I would like to inquire about Kashmir packages.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>BOOK NOW</span>
              </a>
            </div>
          </div>

          {/* Quick Links Nav */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-stone-300">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-amber-400 cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('destinations')} className="hover:text-amber-400 cursor-pointer">
                  Destinations
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('packages')} className="hover:text-amber-400 cursor-pointer">
                  Packages
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-amber-400 cursor-pointer">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-amber-400 cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-amber-400 cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Policy Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wider">
              Customer Policies
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-stone-300">
              <li>
                <button onClick={() => handlePolicyNav('faqs')} className="hover:text-amber-400 cursor-pointer">
                  Frequently Asked Questions (FAQs)
                </button>
              </li>
              <li>
                <button onClick={() => handlePolicyNav('privacy')} className="hover:text-amber-400 cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handlePolicyNav('refund')} className="hover:text-amber-400 cursor-pointer">
                  Refund & Return Policy
                </button>
              </li>
              <li>
                <button onClick={() => handlePolicyNav('terms')} className="hover:text-amber-400 cursor-pointer">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-serif font-bold text-amber-300 uppercase tracking-wider">
              Local Office
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Awantipora, Jammu & Kashmir, India – 192122</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{WHATSAPP_NUMBER}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>info@kashmiryatra.com</span>
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer Box */}
        <div className="bg-stone-900 rounded-xl p-4 text-stone-400 text-xs leading-relaxed border border-stone-800 space-y-1">
          <strong className="text-amber-200 block font-semibold">Important Website Disclaimer:</strong>
          <p>
            KashmirYatra is an information and marketing platform only. We do not process online payments, user accounts, or automated cart checkouts on this website. All package bookings, itinerary customizations, availability checks, and payment arrangements are handled manually and securely through WhatsApp (+91 7006248669).
          </p>
        </div>

        {/* Bottom Rights */}
        <div className="pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>
            © {new Date().getFullYear()} KashmirYatra — “Discover Kashmir, Your Way.” All Rights Reserved.
          </p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Kashmir Tourism</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
