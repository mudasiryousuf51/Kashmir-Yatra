import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyChooseUs } from './components/WhyChooseUs';
import { DestinationsSection } from './components/DestinationsSection';
import { PackagesSection } from './components/PackagesSection';
import { CustomTourBuilder } from './components/CustomTourBuilder';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { PoliciesSection } from './components/PoliciesSection';
import { WeatherSection } from './components/WeatherSection';
import { AiAssistantModal } from './components/AiAssistantModal';
import { FloatingAiButton } from './components/FloatingAiButton';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [policySubTab, setPolicySubTab] = useState<string>('faqs');
  const [packageCategoryFilter, setPackageCategoryFilter] = useState<string | undefined>(undefined);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const [aiInitialQuery, setAiInitialQuery] = useState<string>('');

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleOpenAiAssistant = (query?: string) => {
    if (query) {
      setAiInitialQuery(query);
    } else {
      setAiInitialQuery('');
    }
    setIsAiOpen(true);
  };

  const handleExplorePackages = (category?: string, destination?: string) => {
    setPackageCategoryFilter(category);
    setSearchFilter(destination || '');
    setActiveTab('packages');
  };

  const handleOpenCustomBuilder = () => {
    setActiveTab('home');
    setTimeout(() => {
      const builderElem = document.getElementById('custom-builder');
      if (builderElem) {
        builderElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleDestinationPackageFilter = (destinationName: string) => {
    setSearchFilter(destinationName);
    setPackageCategoryFilter(undefined);
    setActiveTab('packages');
  };

  const handleFooterPolicyClick = (subTab: string) => {
    setPolicySubTab(subTab);
    setActiveTab('policies');
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans selection:bg-emerald-800 selection:text-amber-200 flex flex-col justify-between">
      
      {/* Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiAssistant={() => handleOpenAiAssistant()}
      />

      {/* Main Content View Switcher */}
      <main className="flex-grow pt-16">
        
        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-0">
            <Hero
              onExplorePackages={handleExplorePackages}
              onOpenCustomBuilder={handleOpenCustomBuilder}
            />

            <WhyChooseUs />

            <DestinationsSection
              onSelectDestinationPackage={handleDestinationPackageFilter}
            />

            <PackagesSection
              initialCategory={packageCategoryFilter}
              initialSearch={searchFilter}
            />

            <WeatherSection
              onOpenAiAssistant={handleOpenAiAssistant}
            />

            <CustomTourBuilder />

            <ServicesSection />

            <AboutSection />

            <ContactSection />
          </div>
        )}

        {/* WEATHER & AI VIEW */}
        {activeTab === 'weather' && (
          <div className="py-6">
            <WeatherSection
              onOpenAiAssistant={handleOpenAiAssistant}
            />
          </div>
        )}

        {/* DESTINATIONS VIEW */}
        {activeTab === 'destinations' && (
          <div className="py-6">
            <DestinationsSection
              initialSearch={searchFilter}
              onSelectDestinationPackage={handleDestinationPackageFilter}
            />
          </div>
        )}

        {/* PACKAGES VIEW */}
        {activeTab === 'packages' && (
          <div className="py-6">
            <PackagesSection
              initialCategory={packageCategoryFilter}
              initialSearch={searchFilter}
            />
          </div>
        )}

        {/* SERVICES VIEW */}
        {activeTab === 'services' && (
          <div className="py-6">
            <ServicesSection />
          </div>
        )}

        {/* ABOUT US VIEW */}
        {activeTab === 'about' && (
          <div className="py-6">
            <AboutSection />
          </div>
        )}

        {/* CONTACT US VIEW */}
        {activeTab === 'contact' && (
          <div className="py-6">
            <ContactSection />
          </div>
        )}

        {/* POLICIES & FAQS VIEW */}
        {activeTab === 'policies' && (
          <div className="py-6">
            <PoliciesSection initialTab={policySubTab} />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        setPolicyTab={handleFooterPolicyClick}
      />

      {/* Floating AI Assistant Trigger */}
      <FloatingAiButton onOpen={() => handleOpenAiAssistant()} />

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        initialQuery={aiInitialQuery}
      />

      {/* Floating & Mobile WhatsApp CTA */}
      <FloatingWhatsApp
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}
