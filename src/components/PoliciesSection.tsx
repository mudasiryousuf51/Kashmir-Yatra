import React, { useState } from 'react';
import { FAQS, getWhatsAppLink, WHATSAPP_NUMBER } from '../data/kashmirData';
import { FAQ } from '../types';
import {
  ShieldCheck,
  RotateCcw,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface PoliciesSectionProps {
  initialTab?: string;
}

export const PoliciesSection: React.FC<PoliciesSectionProps> = ({ initialTab = 'faqs' }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [openFaq, setOpenFaq] = useState<string | null>(FAQS[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-stone-200" id="policies-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar for Policy Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'faqs'
                ? 'bg-emerald-900 text-amber-300 shadow-md'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions (FAQs)</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-emerald-900 text-amber-300 shadow-md'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('refund')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'refund'
                ? 'bg-emerald-900 text-amber-300 shadow-md'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Refund & Return Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'terms'
                ? 'bg-emerald-900 text-amber-300 shadow-md'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms & Conditions</span>
          </button>
        </div>

        {/* FAQS TAB */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-3xl font-serif font-bold text-stone-900">
                Frequently Asked Questions
              </h2>
              <p className="text-stone-600 text-sm max-w-xl mx-auto">
                Got questions about booking, payments, weather, or custom itineraries? All answers point directly to our WhatsApp support team.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div key={faq.id} className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-50">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-5 text-left font-serif font-bold text-base text-stone-900 flex items-center justify-between gap-4 hover:bg-stone-100/80 transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-emerald-800 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-5 pt-0 text-sm text-stone-700 leading-relaxed border-t border-stone-200/60 bg-white">
                        <p className="pt-3">{faq.answer}</p>
                        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                          <span className="text-xs text-stone-500 font-semibold">Need more details?</span>
                          <a
                            href={getWhatsAppLink(`Hello KashmirYatra, I have a question regarding: "${faq.question}"`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                          >
                            <MessageCircle className="w-4 h-4 fill-emerald-800 text-emerald-50" />
                            <span>Ask on WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PRIVACY POLICY TAB */}
        {activeTab === 'privacy' && (
          <div className="space-y-6 text-stone-800 text-sm leading-relaxed bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200">
            <h2 className="text-2xl font-serif font-bold text-stone-900">Privacy Policy</h2>
            <p><strong>Effective Date:</strong> August 2026 • <strong>Brand:</strong> KashmirYatra</p>

            <p>
              At KashmirYatra (“we”, “our”, “us”), we respect your privacy and are committed to protecting any personal details shared with us.
            </p>

            <h3 className="text-base font-bold text-stone-900 pt-2">1. Information Collection & Usage</h3>
            <p>
              Since KashmirYatra operates strictly as an information and marketing website, we do NOT collect or store passwords, credit card numbers, or automated user account profiles on this web application. When you click our WhatsApp booking buttons, your information (name, dates, travel requirements) is transmitted directly through WhatsApp Messenger.
            </p>

            <h3 className="text-base font-bold text-stone-900 pt-2">2. Communication via WhatsApp</h3>
            <p>
              All booking discussions, identity proof verification (for border permits in Gurez Valley), and itinerary coordination are handled manually through WhatsApp (+91 7006248669). We do not sell, rent, or trade your contact information with third-party telemarketers.
            </p>

            <h3 className="text-base font-bold text-stone-900 pt-2">3. Cookies & Analytics</h3>
            <p>
              This website uses standard essential browser session cookies to ensure fast performance and responsive layout rendering. No invasive advertising tracking cookies are deployed.
            </p>

            <h3 className="text-base font-bold text-stone-900 pt-2">4. Contact Us</h3>
            <p>
              If you have any questions regarding our privacy practices, contact us on WhatsApp (+91 7006248669) or email info@kashmiryatra.com.
            </p>
          </div>
        )}

        {/* REFUND & RETURN POLICY TAB */}
        {activeTab === 'refund' && (
          <div className="space-y-6 text-stone-800 text-sm leading-relaxed bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200">
            <h2 className="text-2xl font-serif font-bold text-stone-900">Refund & Cancellation Policy</h2>
            <p><strong>Brand:</strong> KashmirYatra • <strong>Direct Assistance:</strong> +91 7006248669</p>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-950 flex items-start gap-2 text-xs">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Important Notice:</strong> All bookings and reservations are handled manually through WhatsApp. Refund and cancellation conditions depend on specific package terms, hotel provider policies, vehicle reservations, and agreed booking dates.
              </span>
            </div>

            <h3 className="text-base font-bold text-stone-900 pt-2">1. General Cancellation Timeline Guidelines</h3>
            <ul className="list-disc list-inside space-y-2 pl-2 text-xs sm:text-sm">
              <li><strong>Cancellation 30 days or more prior to arrival:</strong> 90% refund of advance deposit (minus token administrative fee).</li>
              <li><strong>Cancellation 15 to 29 days prior to arrival:</strong> 50% refund of total package cost.</li>
              <li><strong>Cancellation 7 to 14 days prior to arrival:</strong> 25% refund of total package cost.</li>
              <li><strong>Cancellation less than 7 days prior or No Show:</strong> Non-refundable due to pre-paid hotel and vehicle blockages.</li>
            </ul>

            <h3 className="text-base font-bold text-stone-900 pt-2">2. Weather, Landslides & Snowfall Disruptions</h3>
            <p>
              Kashmir is a high-altitude mountain region. In case of unexpected highway closures, heavy snowfall, or weather disruptions (e.g. Zoji La Pass or Gulmarg road restrictions), KashmirYatra will assist in modifying your dates or providing alternative safe sightseeing without unnecessary penalty fees wherever hotel/transport suppliers permit.
            </p>

            <h3 className="text-base font-bold text-stone-900 pt-2">3. Refund Processing</h3>
            <p>
              Approved refunds will be processed directly back to your original bank account/UPI QR within 5-7 working days after WhatsApp confirmation.
            </p>
          </div>
        )}

        {/* TERMS & CONDITIONS TAB */}
        {activeTab === 'terms' && (
          <div className="space-y-6 text-stone-800 text-sm leading-relaxed bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200">
            <h2 className="text-2xl font-serif font-bold text-stone-900">Terms & Conditions</h2>
            <p><strong>Brand:</strong> KashmirYatra • “Discover Kashmir, Your Way.”</p>

            <h3 className="text-base font-bold text-stone-900 pt-2">1. Informational Purpose Only</h3>
            <p>
              KashmirYatra is an information, marketing, and travel showcase website. This web application does NOT operate automated payment processing, cart checkout, or instant booking engines. All bookings, inquiries, and price quotations are finalized directly via WhatsApp (+91 7006248669).
            </p>

            <h3 className="text-base font-bold text-stone-900 pt-2">2. Indicative Pricing & Customization</h3>
            <p>
              All prices listed on the website are indicative starting estimates per person. Final binding prices are provided in writing via WhatsApp vouchers based on live hotel availability, vehicle choices, and group size.
            </p>

            <h3 className="text-base font-bold text-stone-900 pt-2">3. Guest Documentation & Border Permits</h3>
            <p>
              Travelers visiting border regions (e.g., Gurez Valley or Tangdhar) must carry valid government-issued photo ID proofs (Aadhaar Card, Passport, or Voter ID). KashmirYatra will assist in obtaining required local inner line permits.
            </p>

            <h3 className="text-base font-bold text-stone-900 pt-2">4. Customer Responsibility & Safety</h3>
            <p>
              Travelers are advised to strictly adhere to safety instructions given by local drivers, skiing instructors, and rafting guides. KashmirYatra is not liable for personal loss or injury caused by unauthorized risky activities outside prescribed itinerary bounds.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
