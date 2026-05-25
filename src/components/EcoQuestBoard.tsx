import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Leaf, Sparkles, Coins, Flame, AlertCircle, Eye, Activity, CheckCircle2, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';

interface Quest {
  id: string;
  title: string;
  description: string;
  urgency: 'critical' | 'high' | 'normal';
  reward: number;
  rewardType: 'SOS' | 'XP';
  status: 'available' | 'active' | 'completed';
}

const MOCK_QUESTS: Quest[] = [
  {
    id: 'q1',
    title: 'Aporte de SOS para as Águias da Floresta',
    description: 'A zona de nidificação no Setor Sul precisa de financiamento imediato para vigilância autônoma.',
    urgency: 'critical',
    reward: 1500,
    rewardType: 'XP',
    status: 'available'
  },
  {
    id: 'q2',
    title: 'Cadastro de um Viveiro Local',
    description: 'Valide as coordenadas de um viveiro de mudas próximo à sua região usando a Prova de Ação (PoA).',
    urgency: 'normal',
    reward: 50,
    rewardType: 'SOS',
    status: 'available'
  },
  {
    id: 'q3',
    title: 'Engajamento no Conselho',
    description: 'Participe da votação da Proposta #002 antes do encerramento para garantir o quorum.',
    urgency: 'high',
    reward: 300,
    rewardType: 'XP',
    status: 'active'
  }
];

export function EcoQuestBoard() {
  const [quests, setQuests] = useState<Quest[]>(MOCK_QUESTS);
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const handleAction = (id: string, currentStatus: string) => {
    if (currentStatus === 'completed') return;

    setAnimatingId(id);
    
    setTimeout(() => {
      setQuests(prev => prev.map(q => {
        if (q.id === id) {
          if (q.status === 'available') return { ...q, status: 'active' };
          if (q.status === 'active') return { ...q, status: 'completed' };
        }
        return q;
      }));
      setAnimatingId(null);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 max-w-7xl mx-auto pb-10"
    >
      {/* Header - Epicentro de Missões */}
      <div className="bg-[#0f0505]/90 backdrop-blur-md rounded-3xl p-8 border border-red-900/40 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
        <div className="absolute -top-[100px] right-0 w-[400px] h-[300px] bg-red-600/10 rounded-[100%] blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#120505] to-[#1a0404] border border-red-500/30 flex items-center justify-center relative shadow-[0_0_40px_rgba(239,68,68,0.15)] overflow-hidden shrink-0 rotate-3">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/20 to-transparent" />
             <Target className="w-12 h-12 text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
              Chamado da Terra
            </h2>
            <p className="text-red-200/70 mt-2 max-w-2xl text-lg">
              As Eco-Quests canalizam a ação dos Guardiões onde o planeta mais necessita. Responda ao chamado, ganhe fragmentos vitais.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Painel Oracular (Synara e Arion) */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-black/60 border border-purple-900/40 rounded-3xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors shadow-lg">
              <div className="absolute top-0 right-0 p-16 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 to-transparent pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                 <Eye className="w-6 h-6 text-purple-400" />
                 <h3 className="text-lg font-bold text-purple-50">Sabedoria de Synara</h3>
              </div>

              <div className="relative z-10 space-y-4">
                 <div className="bg-purple-950/30 border border-purple-500/30 rounded-2xl p-4 text-sm leading-relaxed text-purple-100 italic">
                    "Sinto a escassez de água no setor sudoeste. A fauna se desloca e as raízes cedem. Recomendo foco absoluto nas missões de irrigação desta região."
                 </div>
                 <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-500">Diretriz Primária</span>
                    <span className="text-purple-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> FOCO HÍDRICO</span>
                 </div>
              </div>
           </div>

           <div className="bg-[#050A14] border border-blue-900/40 rounded-3xl p-6 relative overflow-hidden group hover:border-blue-500/50 transition-colors shadow-lg">
              <div className="absolute top-0 right-0 p-16 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                 <Activity className="w-6 h-6 text-blue-400" />
                 <h3 className="text-lg font-bold text-blue-50">Telemetria de Arion</h3>
              </div>

              <div className="relative z-10 space-y-4">
                 <div className="bg-blue-950/30 border border-blue-500/30 rounded-2xl p-4 text-sm leading-relaxed text-blue-100 font-mono">
                    [ALERTA] Anomalia térmica de +2.4°C detectada na borda da reserva. Probabilidade de incêndio na zona buffer: 78%.
                 </div>
                 <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-500">Vigilância Preditiva</span>
                    <span className="text-orange-400 flex items-center gap-1"><Flame className="w-3 h-3" /> RISCO TÉRMICO</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Quadro de Missões (Quests) */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between mb-2 px-2">
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
               <Target className="w-5 h-5 text-red-400" /> Bounties Ativos
             </h3>
             <span className="text-xs bg-red-900/40 border border-red-500/30 text-red-400 px-3 py-1 rounded-full font-mono font-bold">3 MISSÕES DISPONÍVEIS</span>
           </div>

           <div className="space-y-4">
              <AnimatePresence>
                {quests.map(quest => {
                   const isCritical = quest.urgency === 'critical';
                   const isHigh = quest.urgency === 'high';
                   const isAnimating = animatingId === quest.id;
                   
                   const borderColor = isCritical ? 'border-red-900/50 hover:border-red-500/50' : 
                                       isHigh ? 'border-orange-900/50 hover:border-orange-500/50' : 
                                       'border-emerald-900/50 hover:border-emerald-500/50';
                                       
                   const urgencyColor = isCritical ? 'text-red-400 bg-red-500/20' : 
                                        isHigh ? 'text-orange-400 bg-orange-500/20' : 
                                        'text-emerald-400 bg-emerald-500/20';

                   return (
                     <motion.div
                       key={quest.id}
                       layout
                       initial={{ opacity: 0, scale: 0.95 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className={cn(
                         "bg-[#090b10]/80 backdrop-blur-md rounded-2xl p-6 border relative overflow-hidden transition-all",
                         borderColor,
                         quest.status === 'completed' ? "opacity-60 grayscale bg-black/60 border-white/5" : ""
                       )}
                     >
                        {/* Golden Dust / Leaves completed animation */}
                        {isAnimating && quest.status === 'active' && (
                           <motion.div 
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                             className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden"
                           >
                              <div className="absolute inset-0 bg-yellow-500/20 blur-md" />
                              <motion.div 
                                animate={{ y: [0, -100], opacity: [1, 0] }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="flex gap-4"
                              >
                                 <Leaf className="w-8 h-8 text-yellow-400 animate-spin" />
                                 <Sparkles className="w-8 h-8 text-yellow-300" />
                                 <Coins className="w-8 h-8 text-yellow-500 animate-pulse" />
                              </motion.div>
                           </motion.div>
                        )}
                        
                        {isAnimating && quest.status === 'available' && (
                           <div className="absolute inset-0 bg-red-500/10 blur-xl z-0" />
                        )}

                        <div className="flex flex-col md:flex-row justify-between gap-4 relative z-10">
                           <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                 <span className={cn("text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-current", urgencyColor)}>
                                    {isCritical ? 'CRÍTICO' : isHigh ? 'ALTA PRIORIDADE' : 'NORMAL'}
                                 </span>
                                 <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                                    Missão {quest.id}
                                 </span>
                              </div>
                              <h4 className={cn("text-xl font-bold mb-2", quest.status === 'completed' ? "text-gray-400 line-through" : "text-white")}>
                                 {quest.title}
                              </h4>
                              <p className="text-sm text-gray-400 leading-relaxed max-w-xl">
                                 {quest.description}
                              </p>
                           </div>
                           
                           <div className="flex flex-col items-center justify-center shrink-0 min-w-[140px] gap-3">
                              {/* Recompensa */}
                              <div className="flex items-center gap-2 bg-black/40 border border-white/5 rounded-xl px-4 py-2 w-full justify-center">
                                 {quest.rewardType === 'SOS' ? (
                                    <Coins className="w-4 h-4 text-emerald-400" />
                                 ) : (
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                 )}
                                 <span className="font-mono font-bold text-gray-300">
                                    <span className={quest.rewardType === 'SOS' ? 'text-emerald-400' : 'text-purple-400'}>+{quest.reward}</span> {quest.rewardType}
                                 </span>
                              </div>

                              {/* Botão de Ação */}
                              {quest.status === 'available' && (
                                <button 
                                  onClick={() => handleAction(quest.id, quest.status)}
                                  disabled={isAnimating}
                                  className="w-full bg-[#121212] hover:bg-[#1a1a1a] border border-white/10 hover:border-red-500/50 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                                >
                                  Aceitar Chamado
                                </button>
                              )}
                              
                              {quest.status === 'active' && (
                                <button 
                                  onClick={() => handleAction(quest.id, quest.status)}
                                  disabled={isAnimating}
                                  className="w-full relative group overflow-hidden bg-gradient-to-r from-emerald-900 to-emerald-800 text-white px-4 py-2.5 rounded-xl text-sm font-bold border border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all disabled:opacity-50"
                                >
                                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                  <span className="relative z-10 flex items-center justify-center gap-2">
                                     <CheckCircle2 className="w-4 h-4" /> Resgatar (Claim)
                                  </span>
                                </button>
                              )}
                              
                              {quest.status === 'completed' && (
                                <div className="w-full text-center py-2 text-xs font-bold text-gray-500 border border-white/5 rounded-xl bg-black/20">
                                  CONCLUÍDA
                                </div>
                              )}
                           </div>
                        </div>
                     </motion.div>
                   )
                })}
              </AnimatePresence>
           </div>
        </div>

      </div>
    </motion.div>
  );
}
