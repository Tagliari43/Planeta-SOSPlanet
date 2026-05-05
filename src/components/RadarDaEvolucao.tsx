import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Radio } from 'lucide-react';

export function RadarDaEvolucao() {
  const [messages, setMessages] = useState<any[]>([{
    id: '1',
    message: 'Escaneando as frequências do Santuário...',
    author: 'Nexus',
  }]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRadar = async () => {
      try {
        if (!supabase) return;
        const { data, error } = await supabase
          .from('portal_state')
          .select('data')
          .eq('id', 1)
          .single();
        
        if (data && data.data) {
           const dbData = data.data as any;
           if (dbData.evolutionRadarMessage) {
              setMessages([{ id: '1', message: dbData.evolutionRadarMessage, author: 'Santuário' }]);
           } else if (dbData.radarMessages && Array.isArray(dbData.radarMessages) && dbData.radarMessages.length > 0) {
             setMessages(dbData.radarMessages);
           } else if (dbData.radarMessage) {
              setMessages([{ id: '1', message: dbData.radarMessage, author: dbData.radarAuthor || 'Santuário' }]);
           }
        }
      } catch (e) {
        console.error("Falha ao buscar radar no portal_state", e);
      }
    };
    
    if (supabase) {
      fetchRadar();
      
      const subscription = supabase
        .channel('portal_state_changes_radar')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'portal_state', filter: 'id=eq.1' }, payload => {
          if (payload.new && payload.new.data) {
             const data = payload.new.data as any;
             if (data.evolutionRadarMessage) {
                setMessages([{ id: '1', message: data.evolutionRadarMessage, author: 'Santuário' }]);
                setCurrentIndex(0);
             } else if (data.radarMessages && Array.isArray(data.radarMessages) && data.radarMessages.length > 0) {
               setMessages(data.radarMessages);
               setCurrentIndex(0);
             } else if (data.radarMessage) {
                setMessages([{ id: '1', message: data.radarMessage, author: data.radarAuthor || 'Santuário' }]);
                setCurrentIndex(0);
             }
          }
        })
        .subscribe();
        
      return () => {
        subscription.unsubscribe();
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="w-full max-w-5xl mx-auto px-6 mb-16 relative z-10">
      <div className="bg-[#0b1410]/80 backdrop-blur-md border border-green-900/50 rounded-2xl p-4 shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="flex bg-green-900/40 border border-green-500/20 p-2.5 rounded-xl text-green-400 shadow-[0_0_10px_rgba(52,211,153,0.1)]">
             <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex-col flex-1 overflow-hidden">
             <div className="text-[10px] text-green-500/80 uppercase tracking-widest font-bold mb-0.5">Radar da Evolução</div>
             <div className="relative h-6 overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute w-full flex items-center gap-2 font-mono text-sm leading-tight"
                  >
                    <span className="text-green-400 font-bold">[{messages[currentIndex]?.author || 'Santuário'}]:</span>
                    <span className="text-green-50 truncate">{messages[currentIndex]?.message}</span>
                  </motion.div>
                </AnimatePresence>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
