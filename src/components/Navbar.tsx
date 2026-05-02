import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'motion/react';

interface NavProps {
  onOpenModal?: () => void;
}

export function Navbar({ onOpenModal }: NavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size="md" />
          <span className="text-xl font-bold text-green-900 tracking-tight">Planeta SOSPlanet</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="#sobre" className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors">Sobre</a>
          <a href="#missao" className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors">Nossa Missão</a>
          <a href="#token" className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors">Token SOS</a>
          <a href="#projetos" className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors">Projetos</a>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={onOpenModal}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm"
          >
            Compre o token SOS.
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-gray-600 hover:text-green-700 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              <a href="#sobre" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-800 hover:text-green-700 py-2 border-b border-gray-50">Sobre</a>
              <a href="#missao" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-800 hover:text-green-700 py-2 border-b border-gray-50">Nossa Missão</a>
              <a href="#token" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-800 hover:text-green-700 py-2 border-b border-gray-50">Token SOS</a>
              <a href="#projetos" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-800 hover:text-green-700 py-2 border-b border-gray-50">Projetos</a>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenModal?.();
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-md font-medium text-base transition-colors shadow-sm mt-2 flex justify-center"
              >
                Compre o token SOS.
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
