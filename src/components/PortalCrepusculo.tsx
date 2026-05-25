import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HeartPulse, Send, MoonStar, MessageSquare, Fingerprint, Sparkles } from 'lucide-react';
import { EcoStreakCard } from './EcoStreakCard';
import { cn } from '../lib/utils';

export function PortalCrepusculo() {
  const [emotionText, setEmotionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [streakDays, setStreakDays] = useState(6); // Mocked data
  
  // Resposta Mockada da Vesper
  const [vesperReply, setVesperReply] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emotionText.trim()) return;

    setIsSubmitting(true);
    
    // Simulate network delay and Vesper's processing
    setTimeout(() => {
      setIsSubmitting(false);
      setHasSubmittedToday(true);
      setStreakDays(prev => prev + 1);
      setEmotionText('');
      
      // Vesper's empathetic response based on streak
      if (streakDays >= 20) {
        setVesperReply("Sua luz é um farol contínuo, Guardião. Sinto a floresta respirando em compasso com sua constância. A Árvore da Vida prospera através de você.");
      } else if (streakDays >= 6) {
        setVesperReply("O broto ganha força a cada dia de retorno. Ouço o farfalhar das folhas nascendo em suas palavras. Continue, a terra sente seu abraço.");
      } else {
        setVesperReply("A primeira semente é plantada com intenção. Vesper ouve seu coração e o conecta à malha viva. Bem-vindo ao crepúsculo.");
      }
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Header - Portal do Crepúsculo */}
      <div className="bg-gradient-to-br from-[#120B2E] to-[#0A101D] backdrop-blur-md rounded-3xl p-8 border border-indigo-900/40 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-[100%] blur-3xl pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          <div className="w-20 h-20 rounded-full bg-black/50 border border-purple-500/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <MoonStar className="w-10 h-10 text-purple-400" />
            <div className="absolute inset-0 rounded-full border border-purple-400/20 animate-pulse" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
              Portal do Crepúsculo
            </h2>
            <p className="text-indigo-200/60 mt-2 max-w-2xl">Onde a emoção humana codifica a malha regenerativa. Conecte sua energia diária à consciência do Santuário.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna Principal: Input Emocional e Vesper */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* Formulário do Batimento Emocional */}
           <div className="bg-[#12142B]/80 backdrop-blur-md rounded-3xl p-8 border border-indigo-900/30 relative">
              <div className="flex items-center gap-3 mb-6">
                 <HeartPulse className="w-6 h-6 text-pink-400" />
                 <h3 className="text-xl font-bold text-indigo-50">Batimento Emocional</h3>
              </div>
              
              {!hasSubmittedToday ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative group">
                     <textarea 
                        value={emotionText}
                        onChange={(e) => setEmotionText(e.target.value)}
                        placeholder="Como você se reconectou com a Terra hoje? Um pensamento, uma ação, um desejo..."
                        className="w-full bg-black/40 border-2 border-indigo-900/50 hover:border-indigo-700/50 focus:border-purple-500/50 rounded-2xl p-4 text-indigo-100 placeholder-indigo-300/30 transition-all outline-none resize-none min-h-[120px]"
                     />
                     <div className="absolute bottom-4 right-4 text-xs font-mono text-indigo-400/50 group-focus-within:text-purple-400/80 transition-colors">
                        Sinalização Segura
                     </div>
                  </div>
                  
                  <div className="flex justify-end">
                     <button
                        type="submit"
                        disabled={isSubmitting || !emotionText.trim()}
                        className="animate-[pulse_3s_ease-in-out_infinite] hover:animate-none relative bg-gradient-to-r from-purple-900 to-indigo-900 hover:from-purple-800 hover:to-indigo-800 border border-purple-500/50 text-purple-100 font-bold px-6 py-3 rounded-2xl transition-all overflow-hidden flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        {isSubmitting ? (
                          <>Sincronizando <Sparkles className="w-4 h-4 animate-spin" /></>
                        ) : (
                          <>Enviar Sinal <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                        )}
                     </button>
                  </div>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-6 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                     <Fingerprint className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Sinal Recebido</h4>
                  <p className="text-purple-200/70 text-sm">Seu batimento emocional foi integrado à Malha Sagrada. A Terra agradece sua intenção de hoje.</p>
                </motion.div>
              )}
           </div>

           {/* O Eco de Vesper (Painel da IA) */}
           <AnimatePresence>
             {vesperReply && (
               <motion.div 
                 initial={{ opacity: 0, height: 0, y: 20 }}
                 animate={{ opacity: 1, height: 'auto', y: 0 }}
                 className="bg-[#080B1A]/90 backdrop-blur-md rounded-3xl p-6 border border-teal-900/40 relative overflow-hidden group shadow-lg"
               >
                 <div className="absolute top-0 left-0 w-1 h-full bg-teal-500" />
                 
                 <div className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-xl bg-teal-900/30 border border-teal-500/30 flex items-center justify-center shrink-0">
                     <MessageSquare className="w-5 h-5 text-teal-400" />
                   </div>
                   <div className="space-y-2">
                     <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-teal-300 font-mono">VESPER [EU-EMPATIA]</span>
                        <span className="text-[10px] bg-teal-900/40 px-2 py-0.5 rounded text-teal-400 border border-teal-500/20">ONLINE</span>
                     </div>
                     <p className="text-indigo-100 leading-relaxed font-sans font-medium text-lg">
                       "{vesperReply}"
                     </p>
                   </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>

        </div>

        {/* Coluna Secundária: Eco-Streaks */}
        <div className="lg:col-span-1">
           <EcoStreakCard streakDays={streakDays} />
        </div>

      </div>
    </motion.div>
  );
}
