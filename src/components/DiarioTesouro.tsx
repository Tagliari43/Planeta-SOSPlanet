import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Landmark, Activity, Globe, ShieldCheck, Droplets, Trees, Users, Code, ArrowRight, ExternalLink, Flame, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

// Constantes da Tesouraria
const TREASURY_SCORING = [
  { id: 't1', category: 'Reflorestamento Físico', amount: 20000, color: 'bg-emerald-500', icon: <Trees className="w-5 h-5 text-emerald-400" /> },
  { id: 't2', category: 'Infraestrutura O.R.A.C.L.E.', amount: 15000, color: 'bg-blue-500', icon: <Activity className="w-5 h-5 text-blue-400" /> },
  { id: 't3', category: 'Fundo de Cuidadores Locais', amount: 10000, color: 'bg-amber-500', icon: <Users className="w-5 h-5 text-amber-400" /> },
  { id: 't4', category: 'Reserva de Emergência', amount: 5000, color: 'bg-red-500', icon: <Flame className="w-5 h-5 text-red-400" /> }
];

const TOTAL_GOAL = 50000;
const CURRENT_AMOUNT = TREASURY_SCORING.reduce((acc, curr) => acc + curr.amount, 0);

// Constantes do Diário
const TIMELINE_EVENTS = [
  { id: 'ev_1', type: 'plant', title: '100 Mudas Ancestraiss Plantadas', desc: 'Guardiã Lyra liderou o plantio no Setor Norte da reserva. Ação validada via satélite e drone local.', time: 'Há 12 minutos', txHash: '0x8f...4e21', icon: <Trees className="w-4 h-4 text-emerald-500" /> },
  { id: 'ev_2', type: 'validate', title: 'Alerta de Queimada Contido', desc: 'Denúncia de foco de incêndio na Borda Leste foi validada pela comunidade e contida com sucesso.', time: 'Há 2 horas', txHash: '0x1a...9c44', icon: <Flame className="w-4 h-4 text-red-500" /> },
  { id: 'ev_3', type: 'guardian', title: 'Novo Guardião Primordial', desc: 'O usuário Kael atingiu o rank máximo após 30 dias contínuos contribuindo para o ecossistema.', time: 'Há 5 horas', txHash: '0xbb...711f', icon: <ShieldCheck className="w-4 h-4 text-blue-500" /> },
  { id: 'ev_4', type: 'dao', title: 'Aporte do Tesouro Liberado', desc: 'Proposta #42 aprovada. 5,000 SOS enviados para a associação local Cuidadores da Terra.', time: 'Há 1 dia', txHash: '0x43...2a99', icon: <Landmark className="w-4 h-4 text-amber-500" /> }
];

export function DiarioTesouro() {
  const [activeTab, setActiveTab] = useState<'tesouro' | 'diario' | 'api'>('tesouro');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Header Principal */}
      <div className="bg-[#111f18]/80 backdrop-blur-md rounded-3xl p-8 border border-emerald-900/40 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
        
        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-600 to-[#0a120e] p-[1px] shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <div className="w-full h-full bg-[#0a120e] rounded-2xl flex items-center justify-center">
               <BookOpen className="w-10 h-10 text-emerald-400" />
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-4">
              Livro da Terra
              <div className="flex gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-500/30 text-emerald-400 font-mono tracking-widest flex items-center gap-1"><Landmark className="w-3 h-3" /> TESOURARIA ALINHADA</span>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-400 font-mono tracking-widest flex items-center gap-1"><Globe className="w-3 h-3" /> AUDITÁVEL</span>
              </div>
            </h2>
            <p className="text-emerald-200/60 mt-2">A transparência absoluta da nossa atuação. Dinheiro, ações e código abertos para o mundo.</p>
          </div>
        </div>
      </div>

      {/* Navegação de Abas */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button 
          onClick={() => setActiveTab('tesouro')}
          className={cn("px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2", activeTab === 'tesouro' ? "bg-amber-600 text-white shadow-lg shadow-amber-900/20" : "bg-black/40 text-gray-400 hover:text-amber-300 hover:bg-amber-900/20")}
        >
          <Landmark className="w-4 h-4" /> Tesouraria On-Chain
        </button>
        <button 
          onClick={() => setActiveTab('diario')}
          className={cn("px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2", activeTab === 'diario' ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20" : "bg-black/40 text-gray-400 hover:text-emerald-300 hover:bg-emerald-900/20")}
        >
          <BookOpen className="w-4 h-4" /> Diário da Terra
        </button>
        <button 
          onClick={() => setActiveTab('api')}
          className={cn("px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2", activeTab === 'api' ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "bg-black/40 text-gray-400 hover:text-blue-300 hover:bg-blue-900/20")}
        >
          <Code className="w-4 h-4" /> API Pública e Auditoria
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* TAB: TESOURARIA */}
        {activeTab === 'tesouro' && (
          <motion.div key="tesouro" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="bg-[#111f18]/60 p-8 rounded-3xl border border-amber-900/40 relative overflow-hidden">
               <div className="flex flex-col md:flex-row justify-between items-end mb-8 relative z-10 gap-4">
                 <div>
                    <h3 className="text-2xl font-bold text-amber-50 mb-1">Aporte Coletivo e Governança</h3>
                    <p className="text-amber-200/60 text-sm">Distribuição dos recursos acumulados na DAO em conformidade com Smart Contracts.</p>
                 </div>
                 <div className="bg-black/50 px-6 py-3 rounded-2xl border border-amber-900/50 flex flex-col items-center">
                    <span className="text-[10px] text-amber-500/80 uppercase font-bold tracking-widest mb-1">Tesouro Total</span>
                    <span className="text-2xl font-mono font-bold text-amber-400">{CURRENT_AMOUNT.toLocaleString()} <span className="text-sm">SOS</span></span>
                 </div>
               </div>

               {/* Progresso de Tesouraria Geral */}
               <div className="w-full bg-black/60 rounded-full h-4 mb-4 overflow-hidden border border-amber-900/30 flex">
                  {TREASURY_SCORING.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={cn("h-full", item.color)} 
                      style={{ width: `${(item.amount / TOTAL_GOAL) * 100}%` }}
                      title={item.category}
                    />
                  ))}
               </div>
               <div className="flex justify-between text-xs font-mono text-gray-500 mb-10">
                 <span>0 SOS</span>
                 <span>Meta Atual: {TOTAL_GOAL.toLocaleString()} SOS</span>
               </div>

               {/* Cards de Alocação */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 {TREASURY_SCORING.map((item) => (
                   <div key={item.id} className="bg-black/40 border border-white/5 rounded-2xl p-6 hover:bg-white/5 transition-colors group">
                      <div className={cn("w-12 h-12 rounded-xl bg-opacity-10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110", item.color.replace('bg-', 'bg-').replace('500', '500/20'))}>
                        {item.icon}
                      </div>
                      <h4 className="text-sm font-bold text-gray-300 mb-1">{item.category}</h4>
                      <p className="text-xl font-mono font-bold text-white mb-2">{item.amount.toLocaleString()}</p>
                      <div className="text-[10px] text-gray-500 uppercase font-bold">
                        {((item.amount / TOTAL_GOAL) * 100).toFixed(1)}% do Fundo
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </motion.div>
        )}

        {/* TAB: DIÁRIO DA TERRA */}
        {activeTab === 'diario' && (
          <motion.div key="diario" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="bg-[#111f18]/60 p-8 rounded-3xl border border-emerald-900/40">
               <h3 className="text-2xl font-bold text-emerald-50 mb-2">Linha do Tempo Viva</h3>
               <p className="text-emerald-200/60 mb-8 max-w-2xl text-sm">Cada ação de regeneração é eternizada aqui. Nenhum gesto pela Terra se perde. Este é o diário imutável da nossa comunidade.</p>

               <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-emerald-900/50 before:to-transparent">
                  {TIMELINE_EVENTS.map((event, index) => (
                    <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      {/* Ícone central */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#0a120e] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-emerald-500/50 group-hover:scale-110 transition-all">
                        {event.icon}
                      </div>

                      {/* Conteúdo do Evento */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-emerald-500/30 transition-colors shadow-lg">
                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                           <h4 className="font-bold text-white text-md">{event.title}</h4>
                           <time className="text-[10px] font-mono text-emerald-400 mt-1 sm:mt-0 bg-emerald-900/30 px-2 py-0.5 rounded border border-emerald-500/20">{event.time}</time>
                         </div>
                         <p className="text-sm text-gray-400 mb-4">{event.desc}</p>
                         <div className="flex items-center gap-2">
                           <span className="text-[10px] uppercase font-bold text-gray-600 tracking-wider">Hash da Prova:</span>
                           <span className="text-[10px] font-mono text-emerald-200/50 bg-[#0a120e] px-2 py-1 rounded border border-white/5 flex items-center gap-1 hover:text-emerald-300 hover:border-emerald-500/30 cursor-pointer transition-colors">
                              {event.txHash} <ExternalLink className="w-3 h-3" />
                           </span>
                         </div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>
        )}

        {/* TAB: API PÚBLICA */}
        {activeTab === 'api' && (
          <motion.div key="api" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="bg-[#0b1410] border border-blue-900/40 rounded-3xl p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent pointer-events-none blur-3xl opacity-50" />
               
               <div className="max-w-3xl relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-blue-900/20 border border-blue-500/30 flex items-center justify-center mb-6">
                    <Code className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Santuário Open-Source</h3>
                  <p className="text-blue-200/60 mb-8">Todos os dados de impacto ecológico gerados nesta plataforma estão disponíveis em tempo real através de nossa API Pública para auditoria de terceiros, governos ou ONGs.</p>

                  <div className="space-y-6">
                     <div className="bg-black/60 border border-white/5 p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                           <span className="text-sm font-bold text-gray-300">Endpoint: Status Global de Impacto</span>
                           <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded font-mono font-bold tracking-widest flex items-center gap-1">
                             <CheckCircle2 className="w-3 h-3" /> ACESSÍVEL
                           </span>
                        </div>
                        <div className="bg-[#050806] rounded-xl p-4 font-mono text-sm border border-white/5 overflow-x-auto text-blue-300">
                           <span className="text-purple-400">GET</span> https://api.sosplanet.org/v1/impact/global
                        </div>
                     </div>

                     <div className="bg-black/60 border border-white/5 p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                           <span className="text-sm font-bold text-gray-300">Endpoint: Provas (Proof of Action)</span>
                           <span className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded font-mono font-bold tracking-widest flex items-center gap-1">
                             <CheckCircle2 className="w-3 h-3" /> ACESSÍVEL
                           </span>
                        </div>
                        <div className="bg-[#050806] rounded-xl p-4 font-mono text-sm border border-white/5 overflow-x-auto text-blue-300">
                           <span className="text-purple-400">GET</span> https://api.sosplanet.org/v1/ledger/proofs
                        </div>
                     </div>

                     <button className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                        Acessar Documentação Completa (Swagger) <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
