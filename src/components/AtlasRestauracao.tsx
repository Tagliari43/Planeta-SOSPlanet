import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, MapPin, Eye, Activity, ShieldCheck, TreePine, Droplets, Target } from 'lucide-react';
import { EcoNFTShowcase } from './EcoNFTShowcase';
import { cn } from '../lib/utils';

interface CareZone {
  id: string;
  name: string;
  coordinates: { x: number, y: number }; // Percentage 0-100 for map placing
  status: 'critical' | 'stable' | 'flourishing';
  arionPrediction: string;
  synaraWisdom: string;
}

const CARE_ZONES: CareZone[] = [
  {
    id: 'z1',
    name: 'Amazônia - Setor Norte',
    coordinates: { x: 30, y: 40 },
    status: 'flourishing',
    arionPrediction: 'Risco de Queimada neutralizado. Anomalia térmica dissipada nos últimos 12 dias.',
    synaraWisdom: 'O tapete de folhas úmidas protege os novos brotos. A umidade do solo subiu 15% após plantio do Tesouro DAO.'
  },
  {
    id: 'z2',
    name: 'Mata Atlântica - Corredor Central',
    coordinates: { x: 45, y: 70 },
    status: 'stable',
    arionPrediction: 'Padrão de chuvas restaurado para a média móvel de 4 anos.',
    synaraWisdom: 'Fauna polinária detectada em abundância no setor 7. Micro-bioma estabilizado.'
  },
  {
    id: 'z3',
    name: 'Cerrado - Área de Transição',
    coordinates: { x: 38, y: 55 },
    status: 'critical',
    arionPrediction: 'Alerta Oracular: Picos de secura solar projetados. Necessidade de irrigação preventiva em 48h.',
    synaraWisdom: 'As raízes profundas resistem, mas os brotos recentes clamam por ajuda. Redirecionar recursos.'
  }
];

export function AtlasRestauracao() {
  const [activeZone, setActiveZone] = useState<CareZone>(CARE_ZONES[0]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 max-w-7xl mx-auto pb-10"
    >
      {/* Header - Atlas */}
      <div className="bg-[#051114]/90 backdrop-blur-md rounded-3xl p-8 border border-cyan-900/40 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
        <div className="absolute -top-[100px] right-0 w-[400px] h-[300px] bg-cyan-600/10 rounded-[100%] blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0a1212] to-[#041a1a] border border-cyan-500/30 flex items-center justify-center relative shadow-[0_0_40px_rgba(6,182,212,0.15)] overflow-hidden shrink-0">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 to-transparent" />
             <div className="absolute inset-0 border border-cyan-400/20 rounded-full animate-[spin_10s_linear_infinite]" style={{ borderStyle: 'dashed' }} />
             <Globe className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
              Atlas da Restauração
            </h2>
            <p className="text-cyan-200/70 mt-2 max-w-2xl text-lg">
              A malha geolocalizada da nossa Nação. Onde os fundos do Tesouro on-chain encontram as raízes no mundo físico.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Mapa Holográfico Global */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-[#0A100E]/90 backdrop-blur-md border border-emerald-900/30 rounded-3xl p-6 relative overflow-hidden h-[500px]">
              
              {/* Estilização do Mapa em Grid Holográfico */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              
              {/* Contorno Abstrato de Continentes (Simulação Baseada em SVGs Ocultos / Linhas) */}
              <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M 20 20 Q 30 10, 40 30 T 30 60 Q 20 80, 10 50 Z" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="0.2" />
                 <path d="M 50 40 Q 70 30, 80 50 T 60 80 Q 40 70, 50 40 Z" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="0.2" />
              </svg>

              <div className="relative z-10 w-full h-full">
                 <div className="absolute top-4 left-4 flex gap-2">
                    <span className="text-[10px] bg-black/60 border border-white/5 px-3 py-1 rounded-full font-mono text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                      <Target className="w-3 h-3" /> Monitoramento Global
                    </span>
                 </div>

                 {/* Rendering Zones */}
                 {CARE_ZONES.map((zone) => {
                    const isActive = activeZone.id === zone.id;
                    const statusColor = zone.status === 'flourishing' ? 'text-emerald-400 bg-emerald-500/20 border-emerald-500/50' :
                                        zone.status === 'stable' ? 'text-cyan-400 bg-cyan-500/20 border-cyan-500/50' :
                                        'text-red-400 bg-red-500/20 border-red-500/50';
                    const pulseColor = zone.status === 'flourishing' ? 'shadow-emerald-500/50' :
                                       zone.status === 'stable' ? 'shadow-cyan-500/50' : 'shadow-red-500/50';

                    return (
                       <button
                         key={zone.id}
                         onClick={() => setActiveZone(zone)}
                         className={cn("absolute -translate-x-1/2 -translate-y-1/2 transition-all p-2 rounded-full z-20 group outline-none", isActive ? "z-30" : "")}
                         style={{ left: `${zone.coordinates.x}%`, top: `${zone.coordinates.y}%` }}
                       >
                         <div className="relative flex items-center justify-center">
                            {isActive && (
                              <motion.div 
                                layoutId="zone-pulse"
                                className={cn("absolute w-12 h-12 rounded-full blur-md opacity-50", pulseColor)} 
                              />
                            )}
                            <div className={cn("w-6 h-6 rounded-full border flex items-center justify-center relative z-10 transition-transform group-hover:scale-125", statusColor, isActive ? "scale-125 shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "")}>
                               <MapPin className="w-3 h-3" />
                            </div>
                         </div>
                         {isActive && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute top-10 left-1/2 -translate-x-1/2 min-w-[150px] bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-2 text-center pointer-events-none"
                            >
                               <div className="text-xs font-bold text-white whitespace-nowrap">{zone.name}</div>
                            </motion.div>
                         )}
                       </button>
                    )
                 })}
              </div>
           </div>
           
           {/* Showcase Genesis NGOs / Sementes Digitais */}
           <EcoNFTShowcase />
        </div>

        {/* Painel Lateral: Oráculos (Arion & Synara) */}
        <div className="lg:col-span-1 space-y-6">
           
           <AnimatePresence mode="wait">
             <motion.div 
               key={activeZone.id}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="space-y-6"
             >
               <div className="bg-black/60 border border-white/5 rounded-3xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-1 leading-tight">{activeZone.name}</h3>
                  <div className="flex items-center gap-2 mb-6">
                     <span className={cn(
                        "text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase",
                        activeZone.status === 'flourishing' ? 'text-emerald-400 bg-emerald-900/40 border-emerald-500/30' :
                        activeZone.status === 'stable' ? 'text-cyan-400 bg-cyan-900/40 border-cyan-500/30' :
                        'text-red-400 bg-red-900/40 border-red-500/30'
                     )}>
                       STATUS: {activeZone.status === 'flourishing' ? 'FLORESCENDO' : activeZone.status === 'stable' ? 'ESTÁVEL' : 'CRÍTICO'}
                     </span>
                  </div>

                  {/* Janela Oracular de Arion */}
                  <div className="mb-4">
                     <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold font-mono text-blue-400 uppercase tracking-widest">Predições de Arion</span>
                     </div>
                     <div className="bg-[#050B14] border border-blue-900/50 rounded-2xl p-4 relative overflow-hidden font-mono text-sm leading-relaxed text-blue-100/80">
                        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none" />
                        "{activeZone.arionPrediction}"
                     </div>
                  </div>

                  {/* Janela Oracular de Synara */}
                  <div>
                     <div className="flex items-center gap-2 mb-2">
                        <Eye className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold font-mono text-purple-400 uppercase tracking-widest">Sabedoria de Synara</span>
                     </div>
                     <div className="bg-[#0F0514] border border-purple-900/50 rounded-2xl p-4 relative overflow-hidden font-sans font-medium text-sm leading-relaxed text-purple-100/80 italic">
                        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-purple-900/20 to-transparent pointer-events-none" />
                        "{activeZone.synaraWisdom}"
                     </div>
                  </div>
               </div>

               <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-3xl p-6 flex flex-col justify-center items-center text-center">
                  <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
                  <h4 className="text-emerald-50 font-bold mb-2">Zona Protegida</h4>
                  <p className="text-sm text-emerald-200/70">
                    Os contratos inteligentes bloqueiam a exploração predatória e enviam fundos diretos aos Guardiões deste quadrante.
                  </p>
               </div>
             </motion.div>
           </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
}
