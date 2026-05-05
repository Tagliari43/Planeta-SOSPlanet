import { useEffect, useState } from 'react';
import { ArrowRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';

interface HeroProps {
  onOpenModal?: () => void;
}

export function Hero({ onOpenModal }: HeroProps) {
  const [portalState, setPortalState] = useState({
    arrecadado: '0',
    percentual: 0,
    goal: '10M SOS',
    projectStatus: 'Iniciando fase de semente...',
    badgeText: 'Lançando em breve - SOS Token',
    headline: 'SOSPlanet - Salvando o Planeta com Blockchain',
    subheadline: 'Uma plataforma revolucionária que usa criptomoeda para reflorestar a Amazônia, reduzir a pobreza, implementar energia limpa e revolucionar a educação.',
    globalAlertActive: false,
    globalAlertType: 'info',
    globalAlertMessage: ''
  });

  useEffect(() => {
    const fetchState = async () => {
      try {
        if (!supabase) return;
        const { data, error } = await supabase
          .from('portal_state')
          .select('data')
          .eq('id', 1)
          .single();
        
        if (data && data.data && !error) {
           setPortalState(prevState => ({ ...prevState, ...data.data }));
        }
      } catch (e) {
        console.error("Falha ao buscar estado do portal", e);
      }
    };
    
    if (supabase) {
      fetchState();
      
      // Opcional: ouvir por mudanças em tempo real do backoffice (O Santuário)
      const subscription = supabase
        .channel('portal_state_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'portal_state', filter: 'id=eq.1' }, payload => {
          if (payload.new && payload.new.data) {
             setPortalState(prevState => ({ ...prevState, ...payload.new.data as any }));
          }
        })
        .subscribe();
        
      return () => {
        subscription.unsubscribe();
      }
    }
  }, []);

  // Calcula o percentual de forma segura caso não venha no objeto (ou venha zerado)
  const safePercentual = portalState.percentual || (
    (() => {
      const arr = Number(String(portalState.arrecadado).replace(/[^0-9]/g, ''));
      let goalStr = String(portalState.goal).toUpperCase();
      let goal = Number(goalStr.replace(/[^0-9]/g, ''));
      if (goalStr.includes('M')) goal *= 1000000;
      else if (goalStr.includes('K')) goal *= 1000;
      
      if (arr > 0 && goal > 0) return Math.min(100, Math.round((arr / goal) * 100));
      return 0;
    })()
  );

  return (
    <section className="pt-40 pb-20 px-6 sm:px-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
      <AnimatePresence>
        {portalState.globalAlertActive && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="absolute top-0 left-0 right-0 z-40"
          >
            <div className={cn(
              "px-4 py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-md uppercase tracking-wide",
              portalState.globalAlertType === 'urgent' && "bg-red-500 text-white animate-pulse shadow-[0_4px_20px_rgba(239,68,68,0.5)]",
              portalState.globalAlertType === 'warning' && "bg-yellow-400 text-yellow-900 shadow-[0_4px_20px_rgba(250,204,21,0.3)]",
              (!portalState.globalAlertType || portalState.globalAlertType === 'info') && "bg-cyan-500 text-white shadow-[0_4px_20px_rgba(6,182,212,0.4)]"
            )}>
              {portalState.globalAlertType === 'urgent' && <Activity className="w-4 h-4 animate-bounce" />}
              {portalState.globalAlertMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background patterns could go here, for now using faint radial gradient or shapes */}
      <div className="absolute top-1/4 left-10 w-12 h-12 bg-green-50 rounded-full blur-xl opacity-60 dark:opacity-5"></div>
      <div className="absolute bottom-10 right-20 w-24 h-24 bg-green-50 rounded-full blur-2xl opacity-60 dark:opacity-5"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-1.5 rounded-full text-sm font-medium mb-8 flex items-center gap-2 border border-green-100 dark:border-green-800/30"
      >
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        {portalState.badgeText}
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-green-50 tracking-tight max-w-4xl leading-tight mb-6"
      >
        {portalState.headline}
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-600 dark:text-green-100/70 max-w-2xl mb-10"
      >
        {portalState.subheadline}
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4 mb-16"
      >
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenModal}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-md flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          Participar do Movimento <ArrowRight className="w-4 h-4" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border border-gray-200 dark:border-green-800/50 text-gray-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 px-6 py-3 rounded-md font-medium transition-colors w-full sm:w-auto justify-center"
        >
          Saiba Mais
        </motion.button>
      </motion.div>

      {/* Dashboard Resumo da Rede */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-4xl bg-white/80 dark:bg-[#0b1410]/80 backdrop-blur-md border border-gray-100 dark:border-green-900/30 rounded-3xl p-6 shadow-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-green-400/5 to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex-1 text-left w-full">
            <h4 className="text-sm font-bold text-gray-500 dark:text-green-100/50 uppercase tracking-widest mb-1 flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-500" />
              Status da Rede Vital
            </h4>
            <p className="text-xl font-medium text-gray-900 dark:text-green-50">{portalState.projectStatus}</p>
          </div>

          <div className="w-full md:w-px h-px md:h-16 bg-gray-200 dark:bg-green-900/30 shrink-0" />

          <div className="flex-1 w-full">
             <div className="flex justify-between items-end mb-2">
                <div>
                   <span className="text-sm font-bold text-gray-500 dark:text-green-100/50 uppercase tracking-widest block mb-1">Arrecadado</span>
                   <span className="text-2xl font-bold text-green-600 dark:text-green-400 font-mono">{portalState.arrecadado}</span>
                </div>
                <div className="text-right">
                   <span className="text-xs font-bold text-gray-400 dark:text-green-100/40 uppercase tracking-widest block mb-1">Meta</span>
                   <span className="text-lg font-bold text-gray-500 dark:text-green-100/60 font-mono">{portalState.goal}</span>
                </div>
             </div>
             <div className="w-full h-3 bg-gray-100 dark:bg-[#111f18] rounded-full overflow-hidden shadow-inner relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${safePercentual}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-green-400"
                />
             </div>
             <p className="text-right text-xs mt-2 text-green-600 dark:text-green-400 font-bold">{safePercentual}% Alcançado</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
