import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Leaf, ShieldCheck, Vote, Shield, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from './ThemeProvider';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

const steps = [
  {
    icon: <ShieldCheck className="w-12 h-12 text-green-400" />,
    title: "Chave do Guardião Reconhecida",
    description: "Sua carteira está conectada à rede SOSPlanet. A partir de agora, suas ações têm peso no mundo real."
  },
  {
    icon: <Leaf className="w-12 h-12 text-blue-400" />,
    title: "Plantar e Evoluir",
    description: "Cada token em sua carteira representa energia potencial. Financiando árvores e comunidades, você sobe de nível e vê o impacto brotar."
  },
  {
    icon: <Vote className="w-12 h-12 text-purple-400" />,
    title: "A Voz do Ecossistema",
    description: "Como Guardião, você tem poder na Governança. Decida para onde irão os próximos recursos do Fundo de Impacto."
  }
];

export function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          {/* Overlay with blur and dark foliage tone */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#061009]/90 backdrop-blur-xl"
          >
            {/* Ambient glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[120px] mix-blend-screen"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
            
            {/* Distant Spores */}
            <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen"></div>
          </motion.div>

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 max-w-lg w-full mx-4"
          >
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 mx-auto bg-green-900/50 rounded-2xl flex items-center justify-center border border-green-500/30 shadow-[0_0_30px_rgba(74,222,128,0.2)] mb-6 backdrop-blur-md"
              >
                <Shield className="w-10 h-10 text-green-400" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
                Você já não é apenas um visitante.
              </h2>
              <h3 className="text-xl md:text-2xl text-green-400 font-semibold mb-2">
                Você agora é um <span className="text-white relative">Guardião da Terra.<span className="absolute -inset-1 bg-green-500/20 blur-sm rounded-lg -z-10"></span></span>
              </h3>
            </div>

            {/* Carousel Container */}
            <div className="bg-white/10 dark:bg-black/20 border border-white/20 dark:border-green-900/40 backdrop-blur-md rounded-3xl p-8 relative overflow-hidden min-h-[220px] flex items-center justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center w-full"
                >
                  <div className="mb-4">
                    {steps[currentStep].icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{steps[currentStep].title}</h4>
                  <p className="text-green-100/70 text-sm md:text-base leading-relaxed px-4">{steps[currentStep].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination & Next Button */}
            <div className="flex flex-col items-center mt-8 gap-6">
              <div className="flex gap-2">
                {steps.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      currentStep === idx ? "w-8 bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" : "w-2 bg-white/20"
                    )}
                  />
                ))}
              </div>

              <button
                onClick={nextStep}
                className="relative overflow-hidden group bg-green-600 text-white font-bold px-8 py-3.5 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all hover:-translate-y-1 w-full max-w-sm flex items-center justify-center gap-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-white/20 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                {currentStep === steps.length - 1 ? (
                  <>Iniciar Jornada <Sparkles className="w-4 h-4 ml-1" /></>
                ) : (
                  'Continuar'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
