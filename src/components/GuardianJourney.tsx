import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Medal, Award, Flame, Crown, Shield, ShieldCheck, Zap, ChevronRight, Star, List, Users, Sprout, Wind, Droplets, Network, Moon } from 'lucide-react';
import { cn } from '../lib/utils';

// Tipos Mockados
interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  status: 'available' | 'in_progress' | 'completed';
  type: 'daily' | 'epic' | 'community';
}

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  xp: number;
  badge: string;
}

const MOCK_QUESTS: Quest[] = [
  { id: 'q1', title: 'Patrulha Matinal', description: 'Realize o check-in no painel da Vigília por 3 dias seguidos.', xpReward: 50, status: 'in_progress', type: 'daily' },
  { id: 'q2', title: 'Raízes Profundas', description: 'Delegue seus votos na DAO pela primeira vez.', xpReward: 150, status: 'available', type: 'epic' },
  { id: 'q3', title: 'O Chamado do Farol', description: 'Apoie um alerta do Farol de Emergência com qualquer quantidade de SOS.', xpReward: 300, status: 'completed', type: 'community' },
  { id: 'q4', title: 'Semeador de Impacto', description: 'Compartilhe o link do projeto na rede social web3.', xpReward: 20, status: 'available', type: 'daily' },
];

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: 'l1', rank: 1, name: 'Eder Tagliari', xp: 14250, badge: 'Guardião Primordial' },
  { id: 'l2', rank: 2, name: 'Lyra', xp: 12010, badge: 'Ancião da Floresta' },
  { id: 'l3', rank: 3, name: 'Kael', xp: 9800, badge: 'Protetor' },
  { id: 'l4', rank: 4, name: 'Aria', xp: 5400, badge: 'Explorador' },
  { id: 'l5', rank: 5, name: 'Zane', xp: 3200, badge: 'Semente' },
];

export function GuardianJourney() {
  const [activeTab, setActiveTab] = useState<'quests' | 'sbt' | 'leaderboard'>('quests');
  
  // Perfil do Usuário Mockado
  const user = {
    name: 'Eder Tagliari',
    xp: 5420,
    nextRankXp: 10000,
    rankName: 'Protetor',
    level: 12,
  };

  const progress = (user.xp / user.nextRankXp) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 max-w-6xl mx-auto"
    >
      {/* Header Profile / Progress */}
      <div className="bg-[#111f18]/80 backdrop-blur-md rounded-3xl p-8 border border-green-900/30 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-900/10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-green-600 to-emerald-400 p-1 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
               <div className="w-full h-full bg-[#0b1410] rounded-full flex items-center justify-center relative overflow-hidden">
                 <Shield className="w-10 h-10 text-emerald-400" />
                 <div className="absolute bottom-0 w-full h-1/3 bg-emerald-500/20 blur-md" />
               </div>
            </div>
            <div className="mt-4 px-3 py-1 bg-green-900/40 border border-green-500/30 rounded-full flex items-center gap-2">
               <Star className="w-3.5 h-3.5 text-yellow-500" />
               <span className="text-xs font-bold text-green-100">LVL {user.level}</span>
            </div>
          </div>

          <div className="flex-1 w-full text-center md:text-left">
            <h2 className="text-3xl font-bold text-green-50 tracking-tight">{user.name}</h2>
            <p className="text-emerald-400 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
              <Crown className="w-4 h-4" /> {user.rankName}
            </p>

            <div className="mt-6">
               <div className="flex justify-between text-xs font-mono text-green-200/60 mb-2">
                 <span>{user.xp.toLocaleString()} XP</span>
                 <span>Próximo: {user.nextRankXp.toLocaleString()} XP</span>
               </div>
               <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-green-900/50">
                 <div 
                   className="h-full bg-gradient-to-r from-emerald-600 to-green-400 rounded-full relative"
                   style={{ width: `${progress}%` }}
                 >
                   <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                 </div>
               </div>
               <p className="text-right text-[10px] text-green-500/60 mt-1">
                 O ecossistema floresce com suas ações.
               </p>
            </div>
          </div>

          <div className="hidden lg:flex gap-4">
             <div className="bg-black/40 border border-green-900/30 p-4 rounded-2xl flex flex-col items-center justify-center min-w[100px]">
               <Flame className="w-6 h-6 text-orange-500 mb-2" />
               <span className="text-xs text-green-200/50 uppercase tracking-widest text-center">Fogo</span>
               <span className="text-lg font-bold text-green-50">3 Dias</span>
             </div>
             <div className="bg-black/40 border border-green-900/30 p-4 rounded-2xl flex flex-col items-center justify-center min-w[100px]">
               <Medal className="w-6 h-6 text-purple-500 mb-2" />
               <span className="text-xs text-green-200/50 uppercase tracking-widest text-center">Emblemas</span>
               <span className="text-lg font-bold text-green-50">12 SBTs</span>
             </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
         <button 
           onClick={() => setActiveTab('quests')}
           className={cn("px-6 py-3 rounded-2xl text-sm font-medium transition-all flex items-center gap-2", activeTab === 'quests' ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20" : "bg-black/40 text-gray-400 hover:text-green-300 hover:bg-green-900/20")}
         >
           <List className="w-4 h-4" /> Missões Ativas
         </button>
         <button 
           onClick={() => setActiveTab('sbt')}
           className={cn("px-6 py-3 rounded-2xl text-sm font-medium transition-all flex items-center gap-2", activeTab === 'sbt' ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20" : "bg-black/40 text-gray-400 hover:text-green-300 hover:bg-green-900/20")}
         >
           <Award className="w-4 h-4" /> Cofre de Conquistas (SBTs)
         </button>
         <button 
           onClick={() => setActiveTab('leaderboard')}
           className={cn("px-6 py-3 rounded-2xl text-sm font-medium transition-all flex items-center gap-2", activeTab === 'leaderboard' ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20" : "bg-black/40 text-gray-400 hover:text-green-300 hover:bg-green-900/20")}
         >
           <Users className="w-4 h-4" /> Salão dos Ancestrais
         </button>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
         {activeTab === 'quests' && (
           <motion.div key="quests" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_QUESTS.map((quest) => (
                <div key={quest.id} className="bg-[#111f18]/60 p-6 rounded-2xl border border-green-900/30 flex gap-4 hover:border-green-500/30 transition-all group relative overflow-hidden">
                   {quest.status === 'completed' && <div className="absolute inset-0 bg-green-500/5" />}
                   <div className="flex-shrink-0 mt-1 relative z-10">
                     {quest.status === 'completed' ? (
                       <ShieldCheck className="w-6 h-6 text-green-500" />
                     ) : quest.status === 'in_progress' ? (
                       <Zap className="w-6 h-6 text-yellow-500" />
                     ) : (
                       <Target className="w-6 h-6 text-gray-500" />
                     )}
                   </div>
                   <div className="flex-1 relative z-10">
                     <div className="flex justify-between items-start mb-2">
                       <h4 className={cn("font-bold text-base", quest.status === 'completed' ? "text-green-400" : "text-green-50")}>{quest.title}</h4>
                       <span className="text-xs font-mono text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded-md border border-emerald-500/20">+{quest.xpReward} XP</span>
                     </div>
                     <p className="text-sm text-green-200/60 mb-4 leading-relaxed">{quest.description}</p>
                     
                     {quest.status === 'in_progress' && (
                       <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden mt-4">
                         <div className="h-full bg-yellow-500 w-2/3 rounded-full" />
                       </div>
                     )}
                   </div>
                </div>
              ))}
           </motion.div>
         )}

         {activeTab === 'sbt' && (
           <motion.div key="sbt" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Semente Primeira', desc: 'Entrou na Nação', icon: <Sprout className="w-8 h-8 text-green-400" />, rarity: 'common' },
                { name: 'Voz da Floresta', desc: 'Votou em 5 propostas', icon: <Wind className="w-8 h-8 text-blue-400" />, rarity: 'rare' },
                { name: 'Herói do Fogo', desc: 'Apoiou o Farol 3x', icon: <Flame className="w-8 h-8 text-red-500" />, rarity: 'epic' },
                { name: 'Mãos de Barro', desc: 'Doou 10k SOS', icon: <Droplets className="w-8 h-8 text-cyan-400" />, rarity: 'legendary' },
                { name: 'Elo Perdido', desc: 'Invitou 3 membros', icon: <Network className="w-8 h-8 text-purple-400" />, rarity: 'rare' },
                { name: 'Guardião Astral', desc: 'Permaneceu ativo 30 dias', icon: <Moon className="w-8 h-8 text-indigo-400" />, rarity: 'epic' },
              ].map((badge, i) => (
                <div key={i} className="bg-gradient-to-b from-[#111f18] to-[#0a120e] border border-green-900/40 hover:border-emerald-500/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all group">
                   <div className="w-16 h-16 rounded-full bg-black/50 border border-green-900/50 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                     {badge.icon}
                   </div>
                   <h5 className="text-sm font-bold text-green-50 leading-tight mb-1">{badge.name}</h5>
                   <p className="text-[10px] text-green-200/50">{badge.desc}</p>
                   <div className="mt-3 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-current opacity-50 font-mono">
                     {badge.rarity}
                   </div>
                </div>
              ))}
           </motion.div>
         )}

         {activeTab === 'leaderboard' && (
           <motion.div key="leaderboard" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-[#111f18]/60 border border-green-900/30 rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-green-900/30 bg-black/20">
                 <h3 className="text-lg font-bold text-green-50 flex items-center gap-2">
                   <Crown className="w-5 h-5 text-yellow-500" /> Top Guardiões da Temporada
                 </h3>
                 <p className="text-xs text-green-200/60 mt-1">A recompensa é enviada automaticamente por Smart Contract no final do ciclo lunar.</p>
              </div>
              <div className="p-2">
                {MOCK_LEADERBOARD.map((entry, idx) => (
                  <div key={entry.id} className={cn("flex items-center gap-4 p-4 rounded-2xl transition-colors", idx === 0 ? "bg-emerald-900/20 border border-emerald-500/20" : "hover:bg-white/5")}>
                     <div className={cn("w-8 text-center font-mono font-bold text-lg", idx === 0 ? "text-yellow-500" : idx === 1 ? "text-gray-300" : idx === 2 ? "text-amber-700" : "text-green-900")}>
                       #{entry.rank}
                     </div>
                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center font-bold text-green-100 uppercase border border-green-700/50">
                       {entry.name.substring(0, 2)}
                     </div>
                     <div className="flex-1">
                        <div className="font-bold text-green-50">{entry.name}</div>
                        <div className="text-xs text-green-400">{entry.badge}</div>
                     </div>
                     <div className="text-right">
                        <div className="font-mono font-bold text-emerald-400">{entry.xp.toLocaleString()}</div>
                        <div className="text-[10px] text-green-200/40 uppercase tracking-widest">XP Total</div>
                     </div>
                  </div>
                ))}
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </motion.div>
  );
}
