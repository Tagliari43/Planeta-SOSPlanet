/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImpactSection } from './components/ImpactSection';
import { ImpactMap } from './components/ImpactMap';
import { ImpactSimulator } from './components/ImpactSimulator';
import { Features } from './components/Features';
import { About } from './components/About';
import { Vision } from './components/Vision';
import { Pillars } from './components/Pillars';
import { TokenSection } from './components/TokenSection';
import { Projects } from './components/Projects';
import { Roadmap } from './components/Roadmap';
import { FAQ } from './components/FAQ';
import { Guardians } from './components/Guardians';
import { Footer } from './components/Footer';
import { BuyTokenModal } from './components/BuyTokenModal';
import { OrchestratorChat } from './components/OrchestratorChat';
import { ConnectWalletModal } from './components/ConnectWalletModal';
import { GuardianDashboard } from './components/GuardianDashboard';
import { OnboardingModal } from './components/OnboardingModal';
import { AudioLines } from 'lucide-react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [isSerenityMode, setIsSerenityMode] = useState(false);
  const [biome, setBiome] = useState<'amazon' | 'reef' | 'savanna'>('amazon');
  const [toastMessage, setToastMessage] = useState<{text: string, type?: 'globe' | 'audio'} | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  
  const handleToggleDashboard = () => {
    if (walletAddress) {
      setShowDashboard(!showDashboard);
      if (!showDashboard) {
        window.scrollTo(0, 0);
      }
    }
  };

  const handleLanguageChange = (code: string) => {
    setToastMessage({text: `Tradução Neural Ativada. Atualizando dialetos globais para ${code}...`, type: 'globe'});
  };

  const handleAudioToggle = (playing: boolean) => {
    if (playing) {
      setToastMessage({text: 'Frequência de cura ativada...', type: 'audio'});
    } else {
      setToastMessage({text: 'Frequência pausada.', type: 'audio'});
    }
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <div className={`min-h-screen bg-white dark:bg-[#0b1410] font-sans text-gray-900 dark:text-green-50 scroll-smooth transition-colors flex flex-col ${isSerenityMode ? 'overflow-hidden' : ''}`}>
      <div className={`flex flex-col flex-1 transition-all duration-1000 ${isSerenityMode ? 'opacity-30 blur-sm pointer-events-none' : ''}`}>
        <Navbar 
          onOpenModal={handleOpenModal} 
          walletAddress={walletAddress}
          onOpenWalletModal={() => setIsWalletModalOpen(true)}
          showDashboard={showDashboard}
          onToggleDashboard={handleToggleDashboard}
          onLanguageChange={handleLanguageChange}
          onAudioToggle={handleAudioToggle}
          onSerenityToggle={() => setIsSerenityMode(!isSerenityMode)}
          biome={biome}
          onBiomeChange={setBiome}
        />
        
        <main className="flex-1 pt-20">
          {/* Main flow with embedded portal */}
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Hero onOpenModal={handleOpenModal} />
            
            <div id="public-portal" className="scroll-mt-20">
               <GuardianDashboard walletAddress={walletAddress || "0xVISITANTE..."} biome={biome} />
            </div>

            <ImpactSection />
            <ImpactMap />
            <ImpactSimulator />
            <Features />
            <About />
            <Vision />
            <Pillars />
            <TokenSection onOpenModal={handleOpenModal} />
            <Projects />
            <Roadmap />
            <FAQ />
            <Guardians />
          </motion.div>
      </main>
      
      <Footer />
      
      <BuyTokenModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <ConnectWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={(addr) => {
          setWalletAddress(addr);
          setIsOnboardingOpen(true);
        }}
      />
      
      <OnboardingModal 
        isOpen={isOnboardingOpen}
        onComplete={() => {
          setIsOnboardingOpen(false);
          setShowDashboard(true);
          window.scrollTo(0, 0);
        }}
      />
      
      <OrchestratorChat />

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#0b1410] dark:bg-white text-green-400 dark:text-[#0b1410] px-6 py-3 rounded-full flex items-center justify-center shadow-2xl border border-green-900/40 dark:border-green-200"
          >
             <div className="flex items-center gap-3 font-mono text-sm font-semibold">
               {toastMessage.type === 'audio' ? <AudioLines className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
               {toastMessage.text}
               <span className="flex h-2 w-2 relative ml-1">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </span>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      <AnimatePresence>
        {isSerenityMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent pointer-events-auto"
            onClick={() => setIsSerenityMode(false)}
          >
            <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm pointer-events-none" />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="relative z-10 flex flex-col items-center justify-center text-center cursor-pointer"
            >
              <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                 <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full bg-green-500/20 blur-3xl"
                 />
                 <motion.svg 
                    viewBox="0 0 100 100" 
                    className="w-48 h-48 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                 >
                   {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                     <motion.path
                       key={i}
                       d="M50 50 Q 80 20 50 0 Q 20 20 50 50"
                       fill="none"
                       stroke="currentColor"
                       strokeWidth="1"
                       className="text-green-500 dark:text-green-400 opacity-60"
                       style={{ originX: '50px', originY: '50px', rotate: `${angle}deg` }}
                       animate={{ 
                         scale: [1, 1.15, 1],
                         d: [
                           "M50 50 Q 80 20 50 0 Q 20 20 50 50",
                           "M50 50 Q 90 10 50 -10 Q 10 10 50 50",
                           "M50 50 Q 80 20 50 0 Q 20 20 50 50"
                         ]
                       }}
                       transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                     />
                   ))}
                 </motion.svg>
              </div>
              <motion.div
                 animate={{ opacity: [0.5, 1, 0.5] }}
                 transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                 <h2 className="text-3xl font-light text-gray-800 dark:text-green-100 tracking-widest uppercase mb-4">O Refúgio</h2>
                 <p className="text-gray-600 dark:text-green-300/70 font-medium tracking-wide">Sincronizando com a Frequência do Planeta...</p>
                 <p className="text-xs text-gray-400 dark:text-green-500/50 mt-8 opacity-60">(Clique ou toque para despertar)</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
