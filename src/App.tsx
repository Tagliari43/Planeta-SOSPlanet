/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { About } from './components/About';
import { Vision } from './components/Vision';
import { Pillars } from './components/Pillars';
import { TokenSection } from './components/TokenSection';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { BuyTokenModal } from './components/BuyTokenModal';
import { OrchestratorChat } from './components/OrchestratorChat';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 scroll-smooth">
      <Navbar onOpenModal={handleOpenModal} />
      <main>
        <Hero onOpenModal={handleOpenModal} />
        <Features />
        <About />
        <Vision />
        <Pillars />
        <TokenSection onOpenModal={handleOpenModal} />
        <Projects />
      </main>
      <Footer />
      
      <BuyTokenModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <OrchestratorChat />
    </div>
  );
}
