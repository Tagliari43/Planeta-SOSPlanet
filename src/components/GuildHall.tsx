import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Flame, Droplets, Users, Sparkles, ArrowUpCircle, TentTree, Trees, Target } from 'lucide-react';
import { cn } from '../lib/utils';

type GuildType = 'amazonia' | 'cerrado' | 'atlantica' | null;

interface Guild {
  id: GuildType;
  name: string;
  description: string;
  icon: React.ElementType;
  theme: string;
  bgGradient: string;
  iconColor: string;
  texture: React.ReactNode;
}

const GUILDS: Guild[] = [
  {
    id: 'amazonia',
    name: 'Sentinelas da Amazônia',
    description: 'Guardiões das águas voadoras. Focados em umidade, densidade florestal e proteção contra o desmatamento.',
    icon: Trees,
    theme: 'border-emerald-600/50 hover:border-emerald-400 shadow-emerald-900/20',
    bgGradient: 'from-[#041a0e] to-[#010a05]',
    iconColor: 'text-emerald-500',
    texture: (
      <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="amazonia-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0,40 Q20,20 40,40 Q20,60 0,40 Z M20,20 Q40,0 60,20 Q40,40 20,20 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-emerald-500" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#amazonia-pattern)" />
      </svg>
    )
  },
  {
    id: 'cerrado',
    name: 'Guardiões do Cerrado',
    description: 'Raízes profundas, almas de fogo. Especialistas em solo seco, prevenção de incêndios e resistência térmica.',
    icon: Flame,
    theme: 'border-orange-600/50 hover:border-orange-400 shadow-orange-900/20',
    bgGradient: 'from-[#1f0d03] to-[#0a0401]',
    iconColor: 'text-orange-500',
    texture: (
      <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="cerrado-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
           <circle cx="15" cy="15" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-orange-500" />
           <path d="M15,0 L15,30 M0,15 L30,15" stroke="currentColor" strokeWidth="0.5" className="text-orange-500" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#cerrado-pattern)" />
      </svg>
    )
  },
  {
    id: 'atlantica',
    name: 'Cavaleiros da Mata',
    description: 'Unindo a serra ao mar. Focados no cristalino costeiro, redes de fauna e corredores biológicos resplandecentes.',
    icon: Droplets,
    theme: 'border-cyan-500/50 hover:border-cyan-300 shadow-cyan-900/20',
    bgGradient: 'from-[#03131c] to-[#01060a]',
    iconColor: 'text-cyan-400',
    texture: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
         <pattern id="atlantica-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
           <path d="M0,25 L25,0 L50,25 L25,50 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
           <path d="M12.5,25 L25,12.5 L37.5,25 L25,37.5 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
         </pattern>
         <rect x="0" y="0" width="100%" height="100%" fill="url(#atlantica-pattern)" />
      </svg>
    )
  }
];

export function GuildHall() {
  const [selectedGuild, setSelectedGuild] = useState<GuildType>(null);
  const [poolAmount, setPoolAmount] = useState(6800);
  const [isDonating, setIsDonating] = useState(false);
  const poolMax = 10000;

  const handleDonate = () => {
    if (isDonating || poolAmount >= poolMax) return;
    setIsDonating(true);
    setTimeout(() => {
      setPoolAmount(prev => Math.min(prev + 150, poolMax));
      setIsDonating(false);
    }, 1500);
  };

  const poolPercentage = (poolAmount / poolMax) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 max-w-7xl mx-auto pb-10"
    >
      {/* Header - A Forja das Alianças */}
      <div className="bg-[#050B08]/90 backdrop-blur-md rounded-3xl p-8 border border-emerald-900/40 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
        
        {/* Sagrada Textura Tribal/Orgânica no Header */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(16,185,129,0.4) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
           <path d="M 0 100 C 200 0 600 200 1000 0 L 1000 200 L 0 200 Z" fill="url(#sacred-gradient)" />
           <defs>
             <linearGradient id="sacred-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#10b981" />
               <stop offset="100%" stopColor="#059669" />
             </linearGradient>
           </defs>
        </svg>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0a1410] to-[#040806] border border-emerald-500/30 flex items-center justify-center relative shadow-[0_0_40px_rgba(16,185,129,0.15)] overflow-hidden shrink-0">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 to-transparent" />
             <Shield className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
              Salão das Alianças (GuildHall)
            </h2>
            <p className="text-emerald-200/70 mt-2 max-w-2xl text-lg">
              Nenhum ecossistema floresce só. Escolha sua Guilda Biocêntrica, doe suas frações vitais e fortaleça o poder da tribo digital unificada.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Painel Central: Estandartes das Guildas */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center gap-2 mb-2 px-2">
              <TentTree className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold text-white tracking-wide">Estandartes de Bioma</h3>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full min-h-[400px]">
              {GUILDS.map((guild) => {
                 const isSelected = selectedGuild === guild.id;
                 const Icon = guild.icon;

                 return (
                   <button
                     key={guild.id}
                     onClick={() => setSelectedGuild(isSelected ? null : guild.id)}
                     className={cn(
                        "relative rounded-3xl p-6 text-left transition-all overflow-hidden border group",
                        "bg-gradient-to-br flex flex-col justify-between min-h-[320px]",
                        guild.bgGradient,
                        isSelected ? guild.theme : "border-gray-800/50 hover:border-gray-600 scale-95 hover:scale-100",
                        isSelected ? "scale-105 shadow-2xl z-10" : "opacity-80 hover:opacity-100"
                     )}
                   >
                      {guild.texture}
                      <div className={cn("absolute inset-0 bg-black/40 transition-opacity", isSelected ? "opacity-0" : "opacity-60")} />
                      
                      <div className="relative z-10">
                         <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all border", 
                            isSelected ? `bg-black/50 border-${guild.iconColor.split('-')[1]}-500/50` : "bg-black/80 border-white/5"
                         )}>
                            <Icon className={cn("w-7 h-7", isSelected ? guild.iconColor : "text-gray-400")} />
                         </div>
                         <h4 className={cn("text-xl font-bold mb-3 leading-tight", isSelected ? "text-white" : "text-gray-300")}>
                           {guild.name}
                         </h4>
                         <p className={cn("text-sm leading-relaxed", isSelected ? "text-gray-200" : "text-gray-500")}>
                           {guild.description}
                         </p>
                      </div>

                      <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                         <div className="flex -space-x-2">
                           {[1,2,3].map(i => (
                             <div key={i} className="w-6 h-6 rounded-full bg-gray-800 border border-black flex items-center justify-center">
                                <Users className="w-3 h-3 text-gray-500" />
                             </div>
                           ))}
                         </div>
                         <span className={cn("text-xs font-mono font-bold tracking-widest uppercase", isSelected ? guild.iconColor : "text-gray-600")}>
                            {isSelected ? 'Alistado' : 'Unir-se'}
                         </span>
                      </div>

                      {isSelected && (
                        <motion.div layoutId="selection-glow" className="absolute inset-0 border-2 border-white/20 rounded-3xl pointer-events-none" />
                      )}
                   </button>
                 );
              })}
           </div>
        </div>

        {/* Poço de Sinergia (Synergy Pool) */}
        <div className="lg:col-span-1">
           <div className="bg-[#040C14]/90 backdrop-blur-xl border border-blue-900/40 rounded-3xl p-6 shadow-xl relative overflow-hidden h-full min-h-[500px] flex flex-col">
              <div className="absolute top-0 right-0 p-16 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent pointer-events-none" />
              
              <div className="text-center mb-4 relative z-10">
                 <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    O Poço de Sinergia
                 </h3>
                 <p className="text-xs text-blue-200/60 font-mono mt-1 uppercase tracking-widest">Ritual de Coesão da Guilda</p>
              </div>

              {/* Graphic Representation of Chalice/Crystal */}
              <div className="flex-1 flex flex-col items-center justify-center relative my-6">
                 
                 {/* Sincronia P2P Background Glow */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/20 blur-[50px] rounded-full pointer-events-none" />

                 <div className="relative w-48 h-56 flex items-end justify-center">
                    
                    {/* Cálice/Cristal Base de Contorno */}
                    <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" viewBox="0 0 100 120" fill="none">
                       {/* Formato Orgânico Místico (Cristal/Poço) */}
                       <path d="M 10 10 L 90 10 L 75 100 Q 50 120 25 100 Z" stroke="rgba(96, 165, 250, 0.4)" strokeWidth="2" fill="none" strokeDasharray="4 2" />
                       <path d="M 20 15 L 80 15 L 68 95 Q 50 110 32 95 Z" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1" fill="none" />
                    </svg>

                    {/* Preenchimento Líquido do Cristal */}
                    <div 
                      className="absolute bottom-0 w-full flex items-end justify-center overflow-hidden z-10"
                      style={{ height: '90%', width: '80%', clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)' }}
                    >
                       <div className="w-full h-full bg-[#051326] relative">
                          <motion.div 
                             initial={{ y: '100%' }}
                             animate={{ y: `${100 - poolPercentage}%` }}
                             transition={{ duration: 2, ease: "easeOut" }}
                             className="absolute bottom-0 w-full h-full bg-gradient-to-t from-blue-600 via-cyan-400 to-emerald-300 opacity-80"
                          >
                             {/* Efeito de Ondulação / Vida Efervescente */}
                             <motion.div 
                               animate={{ y: [0, -10, 0], opacity: [0.5, 0.8, 0.5] }}
                               transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                               className="absolute top-0 left-0 w-full h-10 bg-white/20 blur-md"
                             />
                             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjRkZGRkZGIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-50 Mix-blend-overlay" />
                          </motion.div>
                       </div>
                    </div>

                    {/* Meta Alvo Voadora */}
                    <div className="absolute -top-6 w-full text-center">
                       <span className="text-[10px] text-blue-400 font-mono bg-blue-950/80 px-3 py-1 rounded-full border border-blue-500/50 shadow-lg">
                         META: {poolMax.toLocaleString()} AÇÕES
                       </span>
                    </div>

                    {/* Partículas flutuantes ativas se doando */}
                    <AnimatePresence>
                       {isDonating && (
                          <motion.div 
                            initial={{ y: 50, opacity: 1, scale: 0.5 }}
                            animate={{ y: -50, opacity: 0, scale: 1.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute z-30 pointer-events-none flex flex-col items-center top-1/2"
                          >
                             <Sparkles className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]" />
                             <span className="text-emerald-300 font-bold font-mono text-xs">+150</span>
                          </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
              </div>

              {/* Status do Poço e Botão */}
              <div className="relative z-10 mt-auto bg-black/40 p-4 rounded-2xl border border-blue-900/50">
                 <div className="flex justify-between items-end mb-4">
                    <div>
                       <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Ações Concentradas</div>
                       <div className="text-2xl font-mono font-black text-white">{poolAmount.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                       <div className="text-[10px] text-cyan-500 uppercase font-bold tracking-widest mb-1">Poder</div>
                       <div className="text-xl font-mono font-bold text-cyan-400">{poolPercentage.toFixed(1)}%</div>
                    </div>
                 </div>

                 <button 
                   onClick={handleDonate}
                   disabled={isDonating || selectedGuild === null || poolAmount >= poolMax}
                   className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-900 to-cyan-900 text-white px-4 py-4 rounded-xl font-bold border border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                 >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <ArrowUpCircle className="w-5 h-5 relative z-10" />
                    <span className="relative z-10 whitespace-nowrap">
                       {selectedGuild === null 
                         ? 'Selecione uma Guilda Primeiro' 
                         : poolAmount >= poolMax 
                           ? 'Sinergia Máxima Atingida' 
                           : 'Fundir Eco-Streaks ao Poço'}
                    </span>
                 </button>
              </div>

           </div>
        </div>

      </div>
    </motion.div>
  );
}
