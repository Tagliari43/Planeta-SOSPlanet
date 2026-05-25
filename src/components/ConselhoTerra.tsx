import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, CheckCircle2, XCircle, Leaf, Coins, Flame, Sparkles, Vote, TreePine, History, ShieldCheck, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'approved' | 'rejected';
  votesFor: number;
  votesAgainst: number;
  endTime: string;
  creator: string;
  amount: number;
}

const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 'prop_001',
    title: 'Alocar 15.000 SOS para Reflorestamento na Amazônia (Setor Norte)',
    description: 'Solicitação de fundos para apoiar a iniciativa dos Guardiões Locais no plantio de 2.000 mudas nativas em áreas recém-desmatadas do Setor Norte.',
    status: 'active',
    votesFor: 45000,
    votesAgainst: 5000,
    endTime: 'Em 2 dias',
    creator: '0x3f...8a12',
    amount: 15000
  },
  {
    id: 'prop_002',
    title: 'Financiar hardware para Novo Oráculo Oceânico',
    description: 'Aprovação para compra de drones aquáticos e bóias de telemetria baseados em hardware livre para monitoramento interligado da acidez no Atlântico Sul.',
    status: 'active',
    votesFor: 28000,
    votesAgainst: 12000,
    endTime: 'Em 5 horas',
    creator: '0x9b...4e91',
    amount: 8500
  },
  {
    id: 'prop_003',
    title: 'Acordo SOS Planet - Comunidade Yawanawá',
    description: 'Aporte emergencial do Tesouro DAO para melhorias na proteção das bordas do bioma e conectividade via rádio.',
    status: 'approved',
    votesFor: 85000,
    votesAgainst: 2000,
    endTime: 'Encerrado',
    creator: '0x7a...1df4',
    amount: 5000
  }
];

export function ConselhoTerra() {
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS);
  const [hasVoted, setHasVoted] = useState<string[]>([]);
  const [animatingVote, setAnimatingVote] = useState<string | null>(null);

  // Poder de Voto Sinergético
  const baseTokens = 2500;
  const streakMultiplier = 1.5; // Árvore da Vida
  const totalPower = baseTokens * streakMultiplier;

  const handleVote = (id: string, type: 'for' | 'against') => {
    if (hasVoted.includes(id)) return;

    setAnimatingVote(id);
    
    setTimeout(() => {
      setProposals(prev => prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            votesFor: type === 'for' ? p.votesFor + totalPower : p.votesFor,
            votesAgainst: type === 'against' ? p.votesAgainst + totalPower : p.votesAgainst
          };
        }
        return p;
      }));
      setHasVoted(prev => [...prev, id]);
      setAnimatingVote(null);
    }, 1200); // Wait for the radiant animation
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 max-w-7xl mx-auto pb-10"
    >
      {/* Header - O Grande Salão */}
      <div className="bg-[#0A100D]/90 backdrop-blur-md rounded-3xl p-8 border border-emerald-900/40 relative overflow-hidden shadow-2xl">
        {/* Raízes Holográficas / Ambientação */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
        <div className="absolute -top-[150px] -right-[150px] w-[400px] h-[400px] bg-emerald-600/10 rounded-[100%] blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-[150px] -left-[150px] w-[400px] h-[400px] bg-yellow-600/10 rounded-[100%] blur-[80px] pointer-events-none" />
        
        {/* Elemento gráfico de raiz/árvore simplificado */}
        <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M50 0 C40 30, 20 50, 0 80 M50 0 C60 40, 80 50, 100 90 M50 0 C50 60, 30 80, 40 100M50 0 C50 50, 70 80, 60 100" stroke="currentColor" className="text-emerald-500" strokeWidth="0.5" fill="none" />
        </svg>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[#0a120e] to-[#111f18] border border-yellow-500/30 flex items-center justify-center relative shadow-[0_0_40px_rgba(234,179,8,0.15)] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/20 to-transparent hidden md:block" />
            <Landmark className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
              O Conselho da Terra
            </h2>
            <p className="text-emerald-200/60 mt-2 max-w-2xl text-lg">
              A voz da Nação Eco-Digital. Aplique seu pulso vital e seus tokens para forjar as diretrizes de cura do nosso Santuário.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Painel Lateral: Poder de Voto Sinergético */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-gradient-to-b from-[#111f18] to-[#0A100D] border border-yellow-900/30 rounded-3xl p-6 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-16 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/10 to-transparent pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                 <ShieldCheck className="w-6 h-6 text-yellow-400" />
                 <h3 className="text-lg font-bold text-yellow-50">Sinergia de Voto</h3>
              </div>

              <div className="space-y-6 relative z-10">
                 {/* Matemática do Voto */}
                 <div className="bg-black/40 rounded-2xl p-4 border border-emerald-900/40">
                    <div className="flex justify-between items-center mb-2 text-sm">
                       <span className="text-gray-400 flex items-center gap-2"><Coins className="w-4 h-4 text-emerald-400" /> Saldo Base</span>
                       <span className="font-mono text-emerald-400 font-bold">{baseTokens.toLocaleString()} SOS</span>
                    </div>
                    <div className="flex justify-between items-center mb-2 text-sm border-b border-white/5 pb-2">
                       <span className="text-gray-400 flex items-center gap-2"><TreePine className="w-4 h-4 text-orange-400" /> Multiplicador (Eco-Streak)</span>
                       <span className="font-mono text-orange-400 font-bold flex items-center gap-1">
                          x{streakMultiplier} <Flame className="w-3 h-3 text-orange-500" />
                       </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                       <span className="text-gray-300 font-bold text-sm">Poder Total</span>
                       <span className="font-mono text-2xl font-black text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]">
                          {totalPower.toLocaleString()}
                       </span>
                    </div>
                 </div>

                 <p className="text-xs text-yellow-200/50 leading-relaxed">
                   Seu envolvimento ativo na plataforma (Eco-Streaks) amplifica sua voz nas decisões da DAO. Um Guardião presente tem mais força do que o capital inativo.
                 </p>
              </div>
           </div>

           <div className="bg-black/40 border border-white/5 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4 text-gray-400 font-medium text-sm">
                 <History className="w-4 h-4" /> Histórico Pessoal
              </div>
              <div className="text-2xl font-mono text-white mb-1">{hasVoted.length}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Propostas Votadas</div>
           </div>
        </div>

        {/* Coluna Principal: Propostas de Vida */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between mb-4 px-2">
             <h3 className="text-xl font-bold text-white flex items-center gap-2">
               <Vote className="w-5 h-5 text-emerald-400" /> Propostas Abertas
             </h3>
             <span className="text-xs bg-emerald-900/40 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full font-mono font-bold">DAO AO VIVO</span>
           </div>

           <AnimatePresence>
             {proposals.map((prop) => {
                const totalVotes = prop.votesFor + prop.votesAgainst;
                const percentFor = totalVotes > 0 ? (prop.votesFor / totalVotes) * 100 : 0;
                const isVotingThis = animatingVote === prop.id;
                const votedForThis = hasVoted.includes(prop.id);

                return (
                  <motion.div 
                    key={prop.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "bg-[#0e1612] p-6 md:p-8 rounded-3xl border transition-all relative overflow-hidden",
                      prop.status === 'active' ? "border-emerald-900/50 hover:border-emerald-700/50" : "border-white/5 bg-black/60",
                      isVotingThis ? "shadow-[0_0_50px_rgba(16,185,129,0.3)] border-emerald-400" : ""
                    )}
                  >
                     {/* Efeito de Voto (Radiante) */}
                     {isVotingThis && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 2 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
                        >
                           <div className="w-64 h-64 bg-emerald-400/20 rounded-full blur-2xl" />
                           <Leaf className="absolute w-24 h-24 text-emerald-300 drop-shadow-[0_0_20px_rgba(110,231,183,1)]" />
                        </motion.div>
                     )}

                     <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 relative z-10">
                        <div>
                           <div className="flex items-center gap-3 mb-2">
                             <span className="text-[10px] font-mono text-gray-500 uppercase">{prop.id}</span>
                             {prop.status === 'active' ? (
                                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-bold flex items-center gap-1">
                                  <Activity className="w-3 h-3" /> ATIVA
                                </span>
                             ) : (
                                <span className="text-[10px] bg-white/10 text-gray-400 border border-white/10 px-2 py-0.5 rounded-full font-mono font-bold">
                                  ENCERRADA
                                </span>
                             )}
                           </div>
                           <h4 className="text-xl font-bold text-white mb-2 leading-tight">{prop.title}</h4>
                           <p className="text-sm text-emerald-100/60 leading-relaxed max-w-2xl">{prop.description}</p>
                        </div>
                        <div className="shrink-0 bg-[#0a120e] border border-yellow-900/30 p-3 rounded-2xl text-center md:min-w-[120px]">
                           <div className="text-[10px] text-yellow-500/70 font-bold uppercase tracking-wider mb-1">Aporte</div>
                           <div className="font-mono text-lg font-bold text-yellow-400">{prop.amount.toLocaleString()} <span className="text-xs">SOS</span></div>
                        </div>
                     </div>

                     {/* Barras de Progresso */}
                     <div className="space-y-3 mb-6 relative z-10">
                        <div className="flex justify-between text-xs font-bold font-mono">
                           <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {percentFor.toFixed(1)}% Aprovar</span>
                           <span className="text-red-400 flex items-center gap-1">{((100 - percentFor) || 0).toFixed(1)}% Rejeitar <XCircle className="w-3 h-3" /></span>
                        </div>
                        <div className="h-4 w-full bg-red-950/50 rounded-full overflow-hidden flex border border-white/5 relative">
                           <motion.div 
                             className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                             initial={{ width: 0 }}
                             animate={{ width: `${percentFor}%` }}
                             transition={{ duration: 0.8, ease: "easeOut" }}
                           />
                           <motion.div 
                             className="h-full bg-red-500/50"
                             initial={{ width: 0 }}
                             animate={{ width: `${100 - percentFor}%` }}
                             transition={{ duration: 0.8, ease: "easeOut" }}
                           />
                        </div>
                        <div className="text-[10px] text-gray-500 font-mono text-center">
                           Total de Votos: {totalVotes.toLocaleString()} Poder
                        </div>
                     </div>

                     {/* Botões de Ação */}
                     {prop.status === 'active' && !votedForThis && (
                        <div className="flex gap-3 relative z-10 pt-2 border-t border-white/5">
                           <button 
                             onClick={() => handleVote(prop.id, 'for')}
                             disabled={animatingVote !== null || votedForThis}
                             className="flex-1 bg-emerald-900/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 hover:border-emerald-500 rounded-xl py-3 flex items-center justify-center gap-2 font-bold transition-all disabled:opacity-50"
                           >
                             <CheckCircle2 className="w-5 h-5" /> Apoiar a Vida
                           </button>
                           <button 
                             onClick={() => handleVote(prop.id, 'against')}
                             disabled={animatingVote !== null || votedForThis}
                             className="bg-red-900/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 hover:border-red-500 rounded-xl px-6 py-3 flex items-center justify-center gap-2 font-bold transition-all disabled:opacity-50"
                           >
                             <XCircle className="w-5 h-5" /> Rejeitar
                           </button>
                        </div>
                     )}
                     
                     {votedForThis && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-yellow-400 font-bold bg-yellow-900/10 py-3 rounded-xl border border-yellow-500/20">
                           <Sparkles className="w-5 h-5" />
                           Sua vontade foi gravada (Poder Consumido: {totalPower})
                        </div>
                     )}
                  </motion.div>
                );
             })}
           </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
