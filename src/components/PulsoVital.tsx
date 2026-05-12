import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Cpu, Satellite, Coins, ShieldCheck, XCircle, FileText, CheckCircle2, Eye, Wind, Leaf, TrendingUp, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

// Tipos Mockados
interface EvidenceRecord {
  id: string;
  type: 'foto' | 'sintetizador_IR' | 'drone' | 'sensor_solo';
  location: string;
  claim: string;
  status: 'pending' | 'approved' | 'rejected';
  confidence: number;
}

const MOCK_EVIDENCES: EvidenceRecord[] = [
  { id: 'ev1', type: 'sintetizador_IR', location: 'Bioma Amazônico - Setor 7G', claim: 'Foco de incêndio detectado, requer ação imediata.', status: 'pending', confidence: 98 },
  { id: 'ev2', type: 'foto', location: 'Reserva XYZ - Borda Leste', claim: 'Desmatamento ilegal avistado por guardião local.', status: 'pending', confidence: 85 },
  { id: 'ev3', type: 'drone', location: 'Bacia do Rio Doce', claim: 'Alteração anormal na cor da água, possível contaminação.', status: 'pending', confidence: 92 },
];

export function PulsoVital() {
  const [activeSegment, setActiveSegment] = useState<'telemetria' | 'provas' | 'oraculo'>('telemetria');
  const [evidences, setEvidences] = useState(MOCK_EVIDENCES);
  const [seedsToPlant, setSeedsToPlant] = useState(1000);

  const handleVote = (id: string, vote: 'approved' | 'rejected') => {
    setEvidences(prev => prev.map(ev => ev.id === id ? { ...ev, status: vote } : ev));
  };

  // Cálculos do Oráculo
  const co2Offset = (seedsToPlant * 22.5).toLocaleString(); // kg CO2 por semente (vida útil estimada)
  const hectareImpact = (seedsToPlant * 0.005).toFixed(2); // hectares restaurados
  const sosCost = (seedsToPlant * 15).toLocaleString(); // custo em SOS

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Header - Telemetria */}
      <div className="bg-[#111f18]/80 backdrop-blur-md rounded-3xl p-8 border border-emerald-900/40 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          <div className="w-20 h-20 rounded-full bg-black/50 border border-emerald-500/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <Activity className="w-10 h-10 text-emerald-400 animate-pulse" />
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20 animate-ping" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
              O Pulso Vital <span className="text-sm px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-500/30 text-emerald-400 font-mono tracking-widest align-middle">ONLINE</span>
            </h2>
            <p className="text-emerald-200/60 mt-2">Santuário Operacional. Monitoramento On-Chain da Malha Planetária.</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 relative z-10">
          <div className="bg-black/40 border border-emerald-900/30 p-4 rounded-2xl flex flex-col items-center justify-center group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Activity className="w-6 h-6 text-emerald-400 mb-2" />
            <span className="text-2xl font-mono font-bold text-white">99.9%</span>
            <span className="text-xs text-emerald-200/50 uppercase tracking-widest text-center mt-1">Saúde da Rede</span>
          </div>
          <div className="bg-black/40 border border-emerald-900/30 p-4 rounded-2xl flex flex-col items-center justify-center group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Cpu className="w-6 h-6 text-blue-400 mb-2" />
            <span className="text-2xl font-mono font-bold text-white">12</span>
            <span className="text-xs text-blue-200/50 uppercase tracking-widest text-center mt-1">Nós Consciência (IAs)</span>
          </div>
          <div className="bg-black/40 border border-emerald-900/30 p-4 rounded-2xl flex flex-col items-center justify-center group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Satellite className="w-6 h-6 text-cyan-400 mb-2" />
            <span className="text-2xl font-mono font-bold text-white">4</span>
            <span className="text-xs text-cyan-200/50 uppercase tracking-widest text-center mt-1">Satélites em Sincronia</span>
          </div>
          <div className="bg-black/40 border border-emerald-900/30 p-4 rounded-2xl flex flex-col items-center justify-center group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Coins className="w-6 h-6 text-yellow-400 mb-2" />
            <span className="text-2xl font-mono font-bold text-white">2.4M</span>
            <span className="text-xs text-yellow-200/50 uppercase tracking-widest text-center mt-1">$SOS em Stake</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button 
          onClick={() => setActiveSegment('telemetria')}
          className={cn("px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2", activeSegment === 'telemetria' ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20" : "bg-black/40 text-gray-400 hover:text-emerald-300 hover:bg-emerald-900/20")}
        >
          <Activity className="w-4 h-4" /> Telemetria
        </button>
        <button 
          onClick={() => setActiveSegment('provas')}
          className={cn("px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2", activeSegment === 'provas' ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "bg-black/40 text-gray-400 hover:text-blue-300 hover:bg-blue-900/20")}
        >
          <ShieldCheck className="w-4 h-4" /> Câmara de Provas (PoA)
        </button>
        <button 
          onClick={() => setActiveSegment('oraculo')}
          className={cn("px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2", activeSegment === 'oraculo' ? "bg-purple-600 text-white shadow-lg shadow-purple-900/20" : "bg-black/40 text-gray-400 hover:text-purple-300 hover:bg-purple-900/20")}
        >
          <Eye className="w-4 h-4" /> Oráculo Climático
        </button>
      </div>

      {/* Segment Content */}
      <AnimatePresence mode="wait">
        {activeSegment === 'telemetria' && (
          <motion.div key="telemetria" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-[#111f18]/60 p-8 rounded-3xl border border-emerald-900/30 flex items-center justify-center min-h-[300px]">
             <div className="text-center space-y-4 max-w-lg">
                <div className="w-16 h-16 rounded-full bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
                   <Activity className="w-8 h-8 text-emerald-500 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white">Sistemas Estáveis</h3>
                <p className="text-emerald-200/60 leading-relaxed font-mono text-sm">
                  CADEIA_PRINCIPAL: Sincronizada.<br/>
                  SISTEMA_D.A.O: Conectado.<br/>
                  ORÁCULOS: Online e alimentando dados.
                </p>
                <div className="h-2 w-full bg-black/50 rounded-full mt-4 overflow-hidden border border-emerald-900/30">
                   <div className="h-full bg-emerald-500 w-full animate-[pulse_2s_ease-in-out_infinite]" />
                </div>
             </div>
          </motion.div>
        )}

        {activeSegment === 'provas' && (
          <motion.div key="provas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
             <div className="bg-blue-900/10 border border-blue-900/30 p-6 rounded-3xl flex items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-blue-400" />
                <div>
                   <h3 className="text-lg font-bold text-blue-50">Auditoria Comunitária</h3>
                   <p className="text-sm text-blue-200/60">Valide os alertas de emergência e ações preventivas enviadas pelos guardiões locais. Seu voto garante a integridade da rede (Proof-of-Action).</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {evidences.map((ev) => (
                 <div key={ev.id} className={cn(
                   "bg-[#0b1410] border rounded-2xl p-5 transition-colors relative overflow-hidden",
                   ev.status === 'pending' ? "border-blue-900/40 hover:border-blue-500/40" :
                   ev.status === 'approved' ? "border-emerald-500/40 bg-emerald-900/10" :
                   "border-red-500/40 bg-red-900/10"
                 )}>
                    {ev.status === 'approved' && <div className="absolute top-0 right-0 p-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 to-transparent pointer-events-none" />}
                    {ev.status === 'rejected' && <div className="absolute top-0 right-0 p-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500/20 to-transparent pointer-events-none" />}
                    
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div className="flex items-center gap-2">
                        {ev.type === 'foto' && <FileText className="w-4 h-4 text-gray-400" />}
                        {ev.type === 'sintetizador_IR' && <Activity className="w-4 h-4 text-orange-400" />}
                        {ev.type === 'drone' && <Satellite className="w-4 h-4 text-cyan-400" />}
                        <span className="text-xs font-mono text-gray-400 uppercase">{ev.type.replace('_', ' ')}</span>
                      </div>
                      <div className="text-[10px] bg-black/60 px-2 py-1 rounded font-mono border border-white/10 text-blue-300">
                        Confiança: {ev.confidence}%
                      </div>
                    </div>

                    <div className="mb-6 relative z-10">
                       <h4 className="font-bold text-white text-sm mb-1 line-clamp-2">{ev.claim}</h4>
                       <p className="text-xs text-gray-400 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-yellow-500" />
                          Local: {ev.location}
                       </p>
                    </div>

                    {ev.status === 'pending' ? (
                       <div className="flex gap-2 relative z-10">
                         <button onClick={() => handleVote(ev.id, 'approved')} className="flex-1 bg-emerald-900/40 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 rounded-xl py-2 flex items-center justify-center gap-2 text-sm font-bold transition-colors">
                           <CheckCircle2 className="w-4 h-4" /> Aprovar
                         </button>
                         <button onClick={() => handleVote(ev.id, 'rejected')} className="flex-1 bg-red-900/40 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 rounded-xl py-2 flex items-center justify-center gap-2 text-sm font-bold transition-colors">
                           <XCircle className="w-4 h-4" /> Rejeitar
                         </button>
                       </div>
                    ) : (
                       <div className="flex items-center justify-center py-2 rounded-xl bg-black/40 border border-white/5 relative z-10">
                         {ev.status === 'approved' ? (
                           <span className="flex items-center gap-2 text-emerald-400 text-sm font-bold"><CheckCircle2 className="w-4 h-4" /> Aprovado (Validado)</span>
                         ) : (
                           <span className="flex items-center gap-2 text-red-400 text-sm font-bold"><XCircle className="w-4 h-4" /> Rejeitado (Fraude)</span>
                         )}
                       </div>
                    )}
                 </div>
               ))}
             </div>
          </motion.div>
        )}

        {activeSegment === 'oraculo' && (
          <motion.div key="oraculo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
             <div className="bg-gradient-to-br from-[#111f18] to-[#0a120e] p-8 rounded-3xl border border-purple-900/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 to-transparent pointer-events-none blur-3xl opacity-50" />
                
                <div className="flex flex-col md:flex-row gap-12 relative z-10">
                   {/* Controle Paramétrico */}
                   <div className="flex-1 space-y-8">
                      <div>
                         <h3 className="text-2xl font-bold text-white flex items-center gap-2"><Wind className="w-6 h-6 text-purple-400" /> Projetor Holográfico</h3>
                         <p className="text-purple-200/60 text-sm mt-1">Simule o impacto ambiental de novas diretrizes e aportes do tesouro.</p>
                      </div>

                      <div className="space-y-4">
                         <div className="flex justify-between items-center px-1">
                            <span className="text-sm font-bold text-gray-300">Sementes a Plantar / Áreas a Recuperar</span>
                            <span className="font-mono text-xl font-black text-emerald-400">{seedsToPlant.toLocaleString()}</span>
                         </div>
                         <input 
                           type="range" 
                           min="100" 
                           max="100000" 
                           step="100"
                           value={seedsToPlant}
                           onChange={(e) => setSeedsToPlant(Number(e.target.value))}
                           className="w-full h-3 bg-black/50 rounded-lg appearance-none cursor-pointer accent-purple-500 border border-purple-900/50"
                         />
                         <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                           <span>100</span>
                           <span>100,000+</span>
                         </div>
                      </div>
                   </div>

                   {/* Resultados da Previsão */}
                   <div className="flex-1 bg-black/40 rounded-2xl p-6 border border-purple-900/30 grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-4 bg-[#0A100D] p-4 rounded-xl border border-white/5">
                         <div className="w-12 h-12 rounded-full bg-emerald-900/30 flex items-center justify-center shrink-0">
                           <Leaf className="w-6 h-6 text-emerald-400" />
                         </div>
                         <div>
                            <div className="text-sm text-gray-400 font-medium">Hectares Recuperados</div>
                            <div className="text-xl font-mono font-bold text-emerald-50">{hectareImpact} <span className="text-xs text-gray-500">ha</span></div>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-4 bg-[#0A100D] p-4 rounded-xl border border-white/5">
                         <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center shrink-0">
                           <Wind className="w-6 h-6 text-blue-400" />
                         </div>
                         <div>
                            <div className="text-sm text-gray-400 font-medium">CO2 Compensado (Est.)</div>
                            <div className="text-xl font-mono font-bold text-blue-50">{co2Offset} <span className="text-xs text-gray-500">kg</span></div>
                         </div>
                      </div>

                      <div className="flex items-center gap-4 bg-[#0A100D] p-4 rounded-xl border border-white/5">
                         <div className="w-12 h-12 rounded-full bg-yellow-900/30 flex items-center justify-center shrink-0">
                           <Coins className="w-6 h-6 text-yellow-500" />
                         </div>
                         <div>
                            <div className="text-sm text-gray-400 font-medium">Custo Estimado na Rede</div>
                            <div className="text-xl font-mono font-bold text-yellow-50">{sosCost} <span className="text-xs text-gray-500">SOS</span></div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
