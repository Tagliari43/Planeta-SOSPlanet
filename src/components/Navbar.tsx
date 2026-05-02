import { Menu, X, Moon, Sun, Wallet, ShieldCheck, Globe, Volume2, VolumeX, AudioLines, Flower2 } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from './ThemeProvider';
import { cn } from '../lib/utils';

interface NavProps {
  onOpenModal?: () => void;
  walletAddress: string | null;
  onOpenWalletModal: () => void;
  onToggleDashboard: () => void;
  showDashboard: boolean;
  onLanguageChange: (lang: string) => void;
  onAudioToggle: (playing: boolean) => void;
  onSerenityToggle: () => void;
}

const languages = [
  { code: 'PT', name: 'Português' },
  { code: 'EN', name: 'English' },
  { code: 'ES', name: 'Español' },
  { code: 'ZH', name: '中文' },
];

export function Navbar({ onOpenModal, walletAddress, onOpenWalletModal, onToggleDashboard, showDashboard, onLanguageChange, onAudioToggle, onSerenityToggle }: NavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('PT');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLangSelect = (code: string) => {
    setCurrentLang(code);
    setIsLangOpen(false);
    onLanguageChange(code);
  };

  const handleAudioToggle = () => {
    const newState = !isAudioPlaying;
    setIsAudioPlaying(newState);
    onAudioToggle(newState);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#0b1410]/95 dark:backdrop-blur-md border-b border-gray-100 dark:border-green-900/30 transition-colors">
      <div className="px-6 py-4 flex items-center justify-between xl:mx-auto xl:max-w-7xl">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => showDashboard && onToggleDashboard()}>
          <Logo size="md" />
          <span className="text-xl font-bold text-green-900 dark:text-green-400 tracking-tight transition-colors hidden sm:block">Planeta SOSPlanet</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {!showDashboard && (
            <>
              <a href="#sobre" className="text-sm font-medium text-gray-600 dark:text-green-400/80 hover:text-green-700 dark:hover:text-green-300 transition-colors">Sobre</a>
              <a href="#missao" className="text-sm font-medium text-gray-600 dark:text-green-400/80 hover:text-green-700 dark:hover:text-green-300 transition-colors">Nossa Missão</a>
              <a href="#token" className="text-sm font-medium text-gray-600 dark:text-green-400/80 hover:text-green-700 dark:hover:text-green-300 transition-colors">Token SOS</a>
              <a href="#projetos" className="text-sm font-medium text-gray-600 dark:text-green-400/80 hover:text-green-700 dark:hover:text-green-300 transition-colors">Projetos</a>
            </>
          )}

          {/* Lang Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-green-100/60 hover:text-green-600 dark:hover:text-green-400 transition-colors px-2 py-1 rounded-md"
            >
              <Globe className="w-4 h-4" /> {currentLang}
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 bg-white dark:bg-[#111f18] border border-gray-100 dark:border-green-900/40 rounded-lg shadow-lg overflow-hidden w-28 py-1 z-50"
                >
                  {languages.map((l) => (
                    <button 
                      key={l.code}
                      onClick={() => handleLangSelect(l.code)}
                      className={cn(
                        "w-full text-left px-4 py-2 text-xs font-semibold hover:bg-green-50 dark:hover:bg-green-900/40 transition-colors",
                        currentLang === l.code ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-green-100/70"
                      )}
                    >
                      {l.code} - {l.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 border-l border-gray-200 dark:border-green-900/30 pl-6">
            <button 
              onClick={onSerenityToggle} 
              className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors w-8 h-8 flex items-center justify-center rounded-full"
              title="O Refúgio (Modo Serenidade)"
            >
              <Flower2 className="w-5 h-5" />
            </button>

            <button 
              onClick={handleAudioToggle} 
              className={cn(
                "relative text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors w-8 h-8 flex items-center justify-center rounded-full",
                isAudioPlaying ? "text-green-600 dark:text-green-400" : ""
              )}
              aria-label="Toggle Forest Frequency"
            >
              {isAudioPlaying ? (
                <>
                  <AudioLines className="w-5 h-5 relative z-10" />
                  <span className="absolute inset-0 bg-green-400/20 rounded-full animate-ping"></span>
                </>
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </button>

            <button onClick={toggleTheme} className="text-gray-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors" aria-label="Toggle Dark Mode">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {!showDashboard && (
            <button 
              onClick={onOpenModal}
              className="border border-green-600 dark:border-green-600/50 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 px-5 py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm"
            >
              Comprar SOS
            </button>
          )}

          {walletAddress ? (
            <button
              onClick={onToggleDashboard}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all shadow-sm border",
                showDashboard 
                  ? "bg-green-100 dark:bg-green-900/40 border-green-300 dark:border-green-600 text-green-800 dark:text-green-300"
                  : "bg-[#0b1410] dark:bg-green-900/20 hover:bg-gray-900 dark:hover:bg-green-800/40 text-white dark:text-green-400 border-transparent dark:border-green-800/50"
              )}
            >
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white">
                <ShieldCheck className="w-3 h-3" />
              </div>
              <span className="font-mono text-xs">{walletAddress}</span>
            </button>
          ) : (
            <button 
              onClick={onOpenWalletModal}
              className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white px-5 py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm flex items-center gap-2 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <Wallet className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Conectar Carteira</span>
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-3">
          {walletAddress && (
             <button
               onClick={onToggleDashboard}
               className="w-8 h-8 rounded-full bg-[#0b1410] dark:bg-green-900/40 border border-transparent dark:border-green-800 flex items-center justify-center text-white dark:text-green-400"
             >
               <ShieldCheck className="w-4 h-4" />
             </button>
          )}

          <button 
            onClick={onSerenityToggle} 
            className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors w-8 h-8 flex items-center justify-center rounded-full"
            title="O Refúgio (Modo Serenidade)"
          >
            <Flower2 className="w-5 h-5" />
          </button>

          <button 
            onClick={handleAudioToggle} 
            className={cn(
              "relative text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors w-8 h-8 flex items-center justify-center rounded-full",
              isAudioPlaying ? "text-green-600 dark:text-green-400" : ""
            )}
            aria-label="Toggle Forest Frequency"
          >
            {isAudioPlaying ? (
              <>
                <AudioLines className="w-5 h-5 relative z-10" />
                <span className="absolute inset-0 bg-green-400/20 rounded-full animate-ping"></span>
              </>
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>

          <button onClick={toggleTheme} className="text-gray-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors" aria-label="Toggle Dark Mode">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            className="p-2 text-gray-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-[#0b1410] border-t border-gray-100 dark:border-green-900/30 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {!showDashboard && (
                <>
                  <a href="#sobre" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-800 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 py-2 border-b border-gray-50 dark:border-green-900/20">Sobre</a>
                  <a href="#missao" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-800 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 py-2 border-b border-gray-50 dark:border-green-900/20">Nossa Missão</a>
                  <a href="#token" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-800 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 py-2 border-b border-gray-50 dark:border-green-900/20">Token SOS</a>
                  <a href="#projetos" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-gray-800 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 py-2 border-b border-gray-50 dark:border-green-900/20">Projetos</a>
                </>
              )}
              
              <div className="flex gap-2 mb-2">
                {languages.map((l) => (
                  <button 
                    key={l.code}
                    onClick={() => handleLangSelect(l.code)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-bold rounded-md border",
                      currentLang === l.code ? "bg-green-50 dark:bg-green-900/40 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300" : "bg-transparent border-gray-200 dark:border-green-900/20 text-gray-500 dark:text-green-100/50"
                    )}
                  >
                    {l.code}
                  </button>
                ))}
              </div>

              {!walletAddress ? (
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenWalletModal();
                  }}
                  className="bg-[#0b1410] hover:bg-gray-900 dark:bg-white dark:text-[#0b1410] dark:hover:bg-green-50 text-white px-5 py-3 rounded-md font-medium text-base transition-colors shadow-sm mt-2 flex justify-center items-center gap-2"
                >
                  <Wallet className="w-5 h-5" /> Conectar Carteira
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onToggleDashboard();
                  }}
                  className="bg-green-100 dark:bg-green-900/40 border border-green-300 dark:border-green-600 text-green-800 dark:text-green-300 px-5 py-3 rounded-md font-medium text-base transition-colors shadow-sm mt-2 flex justify-center items-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" /> Portal do Guardião
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

