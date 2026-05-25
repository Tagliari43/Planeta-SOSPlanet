import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Droplets, Flame, ArrowRightLeft, Sparkles, Sprout, Activity, Beaker, CheckCircle2, Trees, TreePine, Network } from 'lucide-react';
import { cn } from '../lib/utils';

type Biome = 'amazonia' | 'cerrado' | 'atlantica';

interface Seed {
  id: string;
  name: string;
  biome: Biome;
  waterPotential: number; // 0 a 100
  thermalResistance: number; // 0 a 100
  icon: React.ElementType;
}

const BIOME_COLORS: Record<Biome, { text: string; border: string; bg: string; glow: string; drop: string }> = {
  amazonia: { text: 'text-emerald-400', border: 'border-emerald-500/50', bg: 'bg-emerald-950/40', glow: 'from-emerald-500/20', drop: 'drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' },
  cerrado: { text: 'text-orange-400', border: 'border-orange-500/50', bg: 'bg-orange-950/40', glow: 'from-orange-500/20', drop: 'drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]' },
  atlantica: { text: 'text-cyan-400', border: 'border-cyan-500/50', bg: 'bg-cyan-950/40', glow: 'from-cyan-500/20', drop: 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' },
};

const BIOME_NAMES: Record<Biome, string> = {
  amazonia: 'Amazônia',
  cerrado: 'Cerrado',
  atlantica: 'Mata Atlântica'
};

const MY_SEEDS: Seed[] = [
  { id: 'm1', name: 'Semente de Samaúma', biome: 'amazonia', waterPotential: 95, thermalResistance: 30, icon: Trees },
  { id: 'm2', name: 'Semente de Buriti', biome: 'cerrado', waterPotential: 50, thermalResistance: 85, icon: Sprout },
  { id: 'm3', name: 'Broto de Pau-Brasil', biome: 'atlantica', waterPotential: 65, thermalResistance: 55, icon: Leaf },
];

const MARKET_SEEDS: Seed[] = [
  { id: 'o1', name: 'Semente de Pequi', biome: 'cerrado', waterPotential: 20, thermalResistance: 95, icon: Sprout },
  { id: 'o2', name: 'Broto de Açaizeiro', biome: 'amazonia', waterPotential: 90, thermalResistance: 40, icon: TreePine },
  { id: 'o3', name: 'Esporo de Samambaia', biome: 'atlantica', waterPotential: 70, thermalResistance: 60, icon: Leaf },
];

function SeedJar({ seed, selected, onClick }: { seed: Seed; selected: boolean; onClick: () => void }) {
  const colors = BIOME_COLORS[seed.biome];
  const Icon = seed.icon;

  return (
    <button 
      onClick={onClick}
      className={cn(
        "relative rounded-full h-32 w-16 md:w-20 md:h-40 mx-auto flex flex-col items-center justify-end pb-4 transition-all group overflow-hidden border-2",
        selected ? `scale-110 shadow-[0_0_20px_var(--tw-shadow-color)] shadow-${colors.text.split('-')[1]}-500/30 ${colors.border}` : `border-gray-800 hover:border-gray-600`
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-t to-transparent opacity-40 transition-opacity", colors.glow, selected ? "opacity-80" : "group-hover:opacity-60")} />
      
      {/* Reflexos do Vidro (Glass) */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[60%] h-[10%] bg-white/20 rounded-full blur-[2px]" />
      <div className="absolute top-0 bottom-0 left-2 w-[10%] bg-gradient-to-r from-white/10 to-transparent blur-[1px]" />

      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3 + Math.random(), repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10"
      >
         <Icon className={cn("w-6 h-6 md:w-8 md:h-8", colors.text, colors.drop)} />
      </motion.div>

      {selected && (
        <motion.div layoutId="jar-glow" className={cn("absolute bottom-0 w-full h-1/3 bg-gradient-to-t to-transparent", colors.glow)} />
      )}
    </button>
  );
}

function SensorBar({ label, value, type }: { label: string; value: number; type: 'water' | 'thermal' }) {
  const color = type === 'water' ? 'bg-cyan-500' : 'bg-orange-500';
  const Icon = type === 'water' ? Droplets : Flame;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] uppercase font-mono tracking-widest text-gray-400">
        <span className="flex items-center gap-1"><Icon className="w-3 h-3" /> {label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden border border-gray-800">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={cn("h-full rounded-full shadow-[0_0_10px_currentColor]", color)}
        />
      </div>
    </div>
  );
}

export function SeedVault() {
  const [mySelected, setMySelected] = useState<Seed | null>(null);
  const [otherSelected, setOtherSelected] = useState<Seed | null>(null);
  const [isTrading, setIsTrading] = useState(false);
  const [tradeSuccess, setTradeSuccess] = useState(false);

  const isBiodiverse = mySelected && otherSelected && mySelected.biome !== otherSelected.biome;

  const handleTrade = () => {
    if (!mySelected || !otherSelected || isTrading) return;
    setIsTrading(true);
    setTimeout(() => {
      setIsTrading(false);
      setTradeSuccess(true);
      setTimeout(() => {
        setTradeSuccess(false);
        setMySelected(null);
        setOtherSelected(null);
      }, 3000);
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 max-w-7xl mx-auto pb-10"
    >
      {/* Header - Cofre Simbiótico */}
      <div className="bg-[#050414]/90 backdrop-blur-md rounded-3xl p-8 border border-purple-900/40 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
        <div className="absolute -top-[100px] right-1/4 w-[500px] h-[300px] bg-purple-600/10 rounded-[100%] blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0e071c] to-[#040108] border border-purple-500/30 flex items-center justify-center relative shadow-[0_0_40px_rgba(168,85,247,0.15)] overflow-hidden shrink-0">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 to-transparent" />
             <Beaker className="w-10 h-10 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
              Banco de Sementes Ancestrais
            </h2>
            <p className="text-purple-200/70 mt-2 max-w-2xl text-lg">
              Cofre Simbiótico de biodiversidade P2P. Alinhe frascos holográficos, combine biomas e enriqueça a malha genética da Nação.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Mesa de Troca Simbiótica (P2P) */}
        <div className="lg:col-span-12">
          <div className="bg-[#02050A]/90 backdrop-blur-xl border border-indigo-900/40 rounded-3xl p-8 relative flex flex-col items-center justify-center min-h-[500px] shadow-2xl overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]">
            
            {/* Background Texture Mesa */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(99,102,241,0.2) 1px, transparent 1px)', backgroundSize: '30px 30px', backgroundPosition: 'center' }} />

            {tradeSuccess ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center z-10 flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 border border-emerald-500/50 blur-[1px]">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,1)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Simbiose Concluída!</h3>
                <p className="text-emerald-200/70 font-mono tracking-wide text-sm">Diversidade biológica transferida com sucesso.</p>
              </motion.div>
            ) : (
              <div className="w-full max-w-5xl relative z-10">
                <div className="text-center mb-10">
                  <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2 mb-2">
                    <ArrowRightLeft className="w-5 h-5 text-purple-400" /> Mesa de Troca Simbiótica
                  </h3>
                  <div className="text-[10px] text-purple-300/50 font-mono uppercase tracking-widest bg-purple-950/30 px-3 py-1 rounded-full border border-purple-900/30 inline-block">
                    Conexão Peer-to-Peer Estabelecida
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                  
                  {/* Minha Semente */}
                  <div className="flex flex-col items-center flex-1 w-full max-w-[280px]">
                    <div className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-6 bg-black/40 px-4 py-1.5 rounded-full border border-white/5">
                      Sua Oferta (Local)
                    </div>
                    {mySelected ? (
                      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full">
                        <SeedJar seed={mySelected} selected={true} onClick={() => {}} />
                        <div className="mt-6 bg-[#040810] border border-gray-800 rounded-2xl p-4 w-full shadow-lg">
                          <h4 className="text-center font-bold text-white text-sm mb-1">{mySelected.name}</h4>
                          <h5 className="text-center text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-4">Bioma {BIOME_NAMES[mySelected.biome]}</h5>
                          <SensorBar label="P. Hídrico" value={mySelected.waterPotential} type="water" />
                          <div className="h-3" />
                          <SensorBar label="R. Térmica" value={mySelected.thermalResistance} type="thermal" />
                        </div>
                      </motion.div>
                    ) : (
                      <div className="w-full h-[280px] border border-dashed border-gray-800 rounded-2xl flex flex-col items-center justify-center text-gray-600 bg-black/20">
                        <Beaker className="w-10 h-10 mb-4 opacity-20" />
                        <span className="text-xs uppercase font-mono tracking-widest text-center px-4">Selecione uma semente no inventário</span>
                      </div>
                    )}
                  </div>

                  {/* Núcleo de Troca / Fluxo de Energia */}
                  <div className="relative flex flex-col items-center justify-center min-w-[120px]">
                    <div className="absolute w-full h-[2px] bg-gray-800 -z-10 top-1/2 -translate-y-1/2" />
                    
                    {mySelected && otherSelected && (
                       <motion.div className="absolute w-full h-[2px] -z-10 top-1/2 -translate-y-1/2"
                         style={{ background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), transparent)' }}
                         animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
                         transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                       />
                    )}

                    <div className="bg-[#050A14] border border-purple-900/50 rounded-full p-4 shadow-[0_0_30px_rgba(168,85,247,0.15)] relative">
                       {/* Oráculo Arion - Status Visuais da Troca */}
                       {mySelected && otherSelected && (
                          <motion.div 
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className={cn(
                              "absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full border shadow-lg flex items-center gap-1",
                              isBiodiverse ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-400" : "bg-yellow-950/80 border-yellow-500/50 text-yellow-400"
                            )}
                          >
                             {isBiodiverse ? (
                               <>
                                 <Sparkles className="w-3 h-3" /> Alta Sinergia Biodiversa
                               </>
                             ) : (
                               <>
                                 <Activity className="w-3 h-3" /> Biomas Idênticos
                               </>
                             )}
                          </motion.div>
                       )}

                       <ArrowRightLeft className={cn("w-8 h-8", mySelected && otherSelected ? "text-purple-400" : "text-gray-700")} />
                       
                       {isTrading && (
                         <div className="absolute inset-0 rounded-full border-2 border-purple-500/50 border-t-transparent animate-spin" />
                       )}
                    </div>

                    <button 
                      onClick={handleTrade}
                      disabled={!mySelected || !otherSelected || isTrading}
                      className={cn(
                        "mt-8 w-40 relative group overflow-hidden px-4 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed flex justify-center items-center",
                        isBiodiverse 
                          ? "bg-gradient-to-r from-emerald-900 to-cyan-900 text-white border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                          : "bg-gradient-to-r from-purple-900 to-indigo-900 text-white border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                      )}
                    >
                       {(!mySelected || !otherSelected) ? (
                         "Aguardando..."
                       ) : isTrading ? (
                         "Fundindo..."
                       ) : (
                         "Confirmar Troca"
                       )}
                    </button>
                  </div>

                  {/* Semente do Outro Guardião */}
                  <div className="flex flex-col items-center flex-1 w-full max-w-[280px]">
                    <div className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-6 bg-black/40 px-4 py-1.5 rounded-full border border-white/5 flex items-center gap-2">
                       <Network className="w-3 h-3 text-blue-400" /> Rede P2P
                    </div>
                    {otherSelected ? (
                      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full">
                        <SeedJar seed={otherSelected} selected={true} onClick={() => {}} />
                        <div className="mt-6 bg-[#040810] border border-gray-800 rounded-2xl p-4 w-full shadow-lg">
                          <h4 className="text-center font-bold text-white text-sm mb-1">{otherSelected.name}</h4>
                          <h5 className="text-center text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-4">Bioma {BIOME_NAMES[otherSelected.biome]}</h5>
                          <SensorBar label="P. Hídrico" value={otherSelected.waterPotential} type="water" />
                          <div className="h-3" />
                          <SensorBar label="R. Térmica" value={otherSelected.thermalResistance} type="thermal" />
                        </div>
                      </motion.div>
                    ) : (
                      <div className="w-full h-[280px] border border-dashed border-gray-800 rounded-2xl flex flex-col items-center justify-center text-gray-600 bg-black/20">
                        <Activity className="w-10 h-10 mb-4 opacity-20" />
                        <span className="text-xs uppercase font-mono tracking-widest text-center px-4">Selecione uma semente da rede</span>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>

        {/* Inventários (Apenas visíveis se não estiver trocando ou após trocar para escolher nova) */}
        <div className="lg:col-span-6 space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Beaker className="w-4 h-4 text-purple-400" /> Seu Inventário
              </h3>
              <span className="text-[10px] text-purple-400 font-mono uppercase tracking-widest bg-purple-900/30 px-2 py-0.5 rounded border border-purple-500/20">{MY_SEEDS.length} Frascos</span>
           </div>
           <div className="bg-[#03060C]/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 relative overflow-hidden shadow-xl grid grid-cols-3 gap-4">
              {MY_SEEDS.map(seed => (
                <div key={seed.id} className="text-center">
                  <SeedJar seed={seed} selected={mySelected?.id === seed.id} onClick={() => setMySelected(seed)} />
                </div>
              ))}
           </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Network className="w-4 h-4 text-blue-400" /> Mercado Simbiótico (Disponíveis)
              </h3>
              <span className="text-[10px] text-blue-400 font-mono uppercase tracking-widest bg-blue-900/30 px-2 py-0.5 rounded border border-blue-500/20">{MARKET_SEEDS.length} Frascos</span>
           </div>
           <div className="bg-[#03060C]/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 relative overflow-hidden shadow-xl grid grid-cols-3 gap-4">
              {MARKET_SEEDS.map(seed => (
                <div key={seed.id} className="text-center">
                  <SeedJar seed={seed} selected={otherSelected?.id === seed.id} onClick={() => setOtherSelected(seed)} />
                </div>
              ))}
           </div>
        </div>

      </div>
    </motion.div>
  );
}
