import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, TreePine, Leaf, Trees, Clock, Sparkles, CheckCircle2, Info, Eye } from 'lucide-react';
import { cn } from '../lib/utils';

type StratumType = 'emergente' | 'dossel' | 'medio' | 'rasteiro';

interface PlantSpecies {
  id: StratumType;
  name: string;
  icon: React.ElementType;
  color: string;
  glowColor: string;
  maxRadius: number; // Tende a fazer sombra nos arredores
  description: string;
}

const SPECIES: Record<StratumType, PlantSpecies> = {
  emergente: {
    id: 'emergente',
    name: 'Extrato Emergente',
    icon: Trees,
    color: 'text-emerald-400',
    glowColor: 'bg-emerald-500/20',
    maxRadius: 2.5,
    description: 'Árvores gigantes que tocam o céu. Fornecem ampla cobertura e estrutura.'
  },
  dossel: {
    id: 'dossel',
    name: 'Extrato Dossel',
    icon: TreePine,
    color: 'text-cyan-400',
    glowColor: 'bg-cyan-500/20',
    maxRadius: 1.5,
    description: 'Copa contínua da floresta. Filtra a luz solar agressiva.'
  },
  medio: {
    id: 'medio',
    name: 'Extrato Médio',
    icon: Leaf,
    color: 'text-yellow-400',
    glowColor: 'bg-yellow-500/20',
    maxRadius: 0.8,
    description: 'Arbustos e árvores menores. Criam biomassa densa.'
  },
  rasteiro: {
    id: 'rasteiro',
    name: 'Extrato Rasteiro',
    icon: Sprout,
    color: 'text-orange-400',
    glowColor: 'bg-orange-500/20',
    maxRadius: 0.4,
    description: 'Plantas de solo. Precisam de sombra para reter umidade e prosperar.'
  }
};

interface PlacedPlant {
  id: string;
  x: number;
  y: number;
  type: StratumType;
}

export function AgroforestryPlanner() {
  const [gridSize] = useState(8);
  const [plants, setPlants] = useState<PlacedPlant[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<StratumType>('emergente');
  const [timeStep, setTimeStep] = useState(0); // 0 to 10

  const handleCellClick = (x: number, y: number) => {
    // Se o timeStep não for 0, não permite plantar (modo visualização)
    if (timeStep > 0) return;

    const existingPlantIndex = plants.findIndex(p => p.x === x && p.y === y);
    
    if (existingPlantIndex >= 0) {
      // Se for a mesma planta, remove. Se for diferente, substitui
      if (plants[existingPlantIndex].type === selectedSpecies) {
         setPlants(prev => prev.filter((_, i) => i !== existingPlantIndex));
      } else {
         const newPlants = [...plants];
         newPlants[existingPlantIndex] = { ...newPlants[existingPlantIndex], type: selectedSpecies };
         setPlants(newPlants);
      }
    } else {
      setPlants(prev => [...prev, { id: Date.now().toString() + Math.random(), x, y, type: selectedSpecies }]);
    }
  };

  const handleClear = () => {
    setPlants([]);
    setTimeStep(0);
  };

  // Cálculo de Sinergia (Synara)
  const shadowMap = useMemo(() => {
     const map = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));
     
     if (timeStep === 0) return map;

     plants.forEach(plant => {
        const spec = SPECIES[plant.type];
        // O raio cresce de 0.2 até maxRadius baseado no tempo
        const currentRadius = 0.2 + (spec.maxRadius - 0.2) * (timeStep / 10);
        
        for (let i = 0; i < gridSize; i++) {
           for (let j = 0; j < gridSize; j++) {
              const dist = Math.sqrt(Math.pow(plant.x - j, 2) + Math.pow(plant.y - i, 2));
              if (dist <= currentRadius) {
                 map[i][j] += (spec.maxRadius - dist) * 2; // Intensidade da sombra
              }
           }
        }
     });

     return map;
  }, [plants, timeStep, gridSize]);

  const hasSynergy = useMemo(() => {
     if (timeStep === 0) return false;
     // Verifica se há alguma rasteira em área sombreada (> 1 intensidade de sombra provida por outros)
     return plants.some(plant => {
        if (plant.type === 'rasteiro') {
           return shadowMap[plant.y][plant.x] > 1.5;
        }
        return false;
     });
  }, [plants, shadowMap, timeStep]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 max-w-7xl mx-auto pb-10"
    >
      {/* Header - O Berço Verde */}
      <div className="bg-[#031c12]/90 backdrop-blur-md rounded-3xl p-8 border border-emerald-900/40 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
        <div className="absolute -top-[100px] right-0 w-[600px] h-[300px] bg-emerald-600/10 rounded-[100%] blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#061a10] to-[#010a05] border border-emerald-500/30 flex items-center justify-center relative shadow-[0_0_40px_rgba(16,185,129,0.15)] overflow-hidden shrink-0 rotate-3">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 to-transparent" />
             <Leaf className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
              O Berço Verde
            </h2>
            <p className="text-emerald-200/70 mt-2 max-w-2xl text-lg">
              Planejador Agroflorestal de Alta Precisão. Estratifique as espécies, simule o crescimento temporal e maximize a sinergia ecológica.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Painel Esquerdo: Ferramentas & Controle */}
        <div className="lg:col-span-4 space-y-6">
           
           {/* Paleta de Espécies */}
           <div className="bg-[#050D0A]/90 backdrop-blur-xl border border-emerald-900/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-16 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 to-transparent pointer-events-none" />
             
             <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                <Trees className="w-5 h-5 text-emerald-400" /> Paleta Sistêmica
             </h3>

             <div className="space-y-3 relative z-10">
                {(Object.entries(SPECIES) as [StratumType, PlantSpecies][]).map(([key, spec]) => {
                   const isSelected = selectedSpecies === key;
                   const SpecIcon = spec.icon;
                   return (
                     <button
                        key={key}
                        onClick={() => { setSelectedSpecies(key); setTimeStep(0); }}
                        className={cn(
                           "w-full flex items-center gap-4 p-3 rounded-2xl border transition-all text-left group overflow-hidden relative",
                           isSelected 
                             ? "bg-emerald-950/40 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                             : "bg-black/40 border-emerald-900/30 hover:border-emerald-700/50 hover:bg-emerald-950/20"
                        )}
                     >
                        {isSelected && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                        )}
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/5 bg-black/60")}>
                           <SpecIcon className={cn("w-5 h-5", spec.color)} />
                        </div>
                        <div>
                           <div className={cn("font-bold", isSelected ? "text-white" : "text-gray-300")}>{spec.name}</div>
                           <div className="text-[10px] text-gray-500 font-mono mt-0.5 line-clamp-1">{spec.description}</div>
                        </div>
                     </button>
                   );
                })}
             </div>
           </div>

           {/* Controle Temporal (Time Slider) */}
           <div className="bg-[#050A14]/90 backdrop-blur-xl border border-cyan-900/40 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-cyan-400" /> Ciclo de Maturação
                 </h3>
                 <span className="text-xs bg-cyan-950/50 text-cyan-400 font-mono px-2 py-1 rounded border border-cyan-500/30">
                    Ano {timeStep}
                 </span>
              </div>

              <div className="relative pt-4 pb-2 z-10">
                 <input 
                   type="range" 
                   min="0" 
                   max="10" 
                   value={timeStep}
                   onChange={(e) => setTimeStep(parseInt(e.target.value))}
                   className="w-full appearance-none bg-transparent [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-cyan-950 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-2 cursor-pointer relative z-20"
                 />
                 <div 
                   className="absolute top-4 left-0 h-2 bg-cyan-500 rounded-full z-10 pointer-events-none" 
                   style={{ width: `${(timeStep / 10) * 100}%` }}
                 />
              </div>
              <p className="text-[10px] text-cyan-200/50 font-mono mt-4 uppercase tracking-widest text-center">
                 Ajuste para simular luz e sombra
              </p>
           </div>

           {/* Visor Oracular de Synara */}
           <AnimatePresence>
              {timeStep > 0 && (
                 <motion.div 
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   exit={{ opacity: 0, height: 0 }}
                   className="overflow-hidden"
                 >
                    <div className={cn(
                       "border backdrop-blur-md rounded-3xl p-6 relative overflow-hidden shadow-lg mt-4",
                       hasSynergy ? "bg-emerald-950/50 border-emerald-500/50" : "bg-purple-950/30 border-purple-900/50"
                    )}>
                       <div className="flex items-center gap-3 mb-3 relative z-10">
                          <Eye className={cn("w-5 h-5", hasSynergy ? "text-emerald-400" : "text-purple-400")} />
                          <h4 className={cn("text-sm font-bold", hasSynergy ? "text-emerald-50" : "text-purple-100")}>Análise de Synara</h4>
                       </div>
                       
                       {hasSynergy ? (
                          <div className="relative z-10 flex flex-col gap-2">
                             <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                                <Sparkles className="w-4 h-4" /> Sinergia Sintrópica Atingida!
                             </div>
                             <p className="text-xs text-emerald-100/70 leading-relaxed font-medium">
                                Excelente! Suas plantas de sub-bosque (Rasteiro) estão protegidas pela copa das espécies de estrato superior. O solo prospera.
                             </p>
                          </div>
                       ) : (
                          <div className="relative z-10 flex flex-col gap-2">
                             <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                                <Info className="w-4 h-4" /> Observando Disposição...
                             </div>
                             <p className="text-xs text-purple-200/60 leading-relaxed font-medium">
                                Posicione espécies rasteiras próximas a emergentes ou dosséis para simular a proteção de sombra e gerar sinergia real.
                             </p>
                          </div>
                       )}
                    </div>
                 </motion.div>
              )}
           </AnimatePresence>
        </div>

        {/* Painel Direito: Tabuleiro Sintrópico (Grid) */}
        <div className="lg:col-span-8 flex flex-col">
           <div className="bg-[#02050A]/80 backdrop-blur-xl border border-emerald-900/40 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex-1 flex flex-col items-center justify-center shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
              
              {/* Estética Isométrica / Grid Guide */}
              <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: 'center' }} />

              <div className="flex justify-between w-full max-w-[600px] mb-6 relative z-20">
                 <div className="text-[10px] text-emerald-500/70 font-mono tracking-widest uppercase flex items-center gap-2">
                    {timeStep === 0 ? (
                       <span className="animate-pulse">▶ MODO DE PLANTIO ATIVADO</span>
                    ) : (
                       <span>▶ MODO DE SIMULAÇÃO ({timeStep} ANOS)</span>
                    )}
                 </div>
                 <button 
                   onClick={handleClear}
                   className="text-[10px] text-red-400 hover:text-red-300 uppercase tracking-widest font-mono"
                 >
                   [ Limpar Solo ]
                 </button>
              </div>

              {/* O Grid Interativo */}
              <div 
                 className="relative bg-[#030906] border border-emerald-900/40 rounded-xl p-2 shadow-2xl"
                 style={{ 
                    display: 'grid', 
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`, 
                    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                    gap: '4px',
                    width: '100%',
                    maxWidth: '600px',
                    aspectRatio: '1/1'
                 }}
              >
                 {/* Sincronia de Partículas se houver Sinergia */}
                 {hasSynergy && (
                    <div className="absolute inset-0 pointer-events-none z-0">
                       <div className="w-full h-full bg-emerald-500/5 animate-pulse mix-blend-screen" />
                    </div>
                 )}

                 {Array(gridSize * gridSize).fill(null).map((_, idx) => {
                    const x = idx % gridSize;
                    const y = Math.floor(idx / gridSize);
                    
                    // Achar planta na celula
                    const plant = plants.find(p => p.x === x && p.y === y);
                    const isPlanted = !!plant;
                    const spec = plant ? SPECIES[plant.type] : null;

                    // Sombreamento da célula
                    const shadowIntensity = shadowMap[y][x];
                    const hasShadow = shadowIntensity > 0;

                    return (
                       <div 
                         key={idx}
                         onClick={() => handleCellClick(x, y)}
                         className={cn(
                            "relative rounded-lg transition-colors flex items-center justify-center overflow-visible",
                            timeStep === 0 ? "hover:bg-emerald-900/30 cursor-crosshair border border-emerald-900/20" : "border border-transparent cursor-default",
                            !isPlanted && !hasShadow ? "bg-[#06100c]" : "",
                            hasShadow && !isPlanted && "bg-[#040a08]"
                         )}
                       >
                          {/* Visualização de Sombras */}
                          {hasShadow && timeStep > 0 && (
                             <div 
                               className="absolute inset-0 bg-black/60 pointer-events-none rounded-lg z-10 transition-opacity duration-1000"
                               style={{ opacity: Math.min(shadowIntensity * 0.3, 0.8) }}
                             />
                          )}

                          {isPlanted && spec && (
                             <motion.div 
                               initial={{ scale: 0, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               className="relative z-20 flex items-center justify-center w-full h-full"
                             >
                                {/* Simulação de copa crescendo */}
                                {timeStep > 0 && (
                                   <motion.div 
                                      className={cn("absolute rounded-full pointer-events-none transition-all duration-1000", spec.glowColor)}
                                      style={{ 
                                         width: `${(0.2 + (spec.maxRadius - 0.2) * (timeStep / 10)) * 250}%`,
                                         height: `${(0.2 + (spec.maxRadius - 0.2) * (timeStep / 10)) * 250}%`,
                                         opacity: spec.id === 'rasteiro' ? 0 : 0.4
                                      }}
                                   />
                                )}
                                
                                <spec.icon className={cn(
                                   "w-5 h-5 relative z-30 drop-shadow-[0_0_8px_currentColor]", 
                                   spec.color,
                                   timeStep > 0 && spec.id === 'rasteiro' && shadowIntensity > 1.5 ? "text-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,1)] scale-110" : ""
                                )} />
                                
                                {/* Fagulha de sinergia na planta rasteira protegida */}
                                {timeStep > 0 && spec.id === 'rasteiro' && shadowIntensity > 1.5 && (
                                   <motion.div
                                     animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
                                     transition={{ duration: 2, repeat: Infinity }}
                                     className="absolute inset-0 flex items-center justify-center z-40"
                                   >
                                      <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1" />
                                   </motion.div>
                                )}
                             </motion.div>
                          )}
                       </div>
                    );
                 })}
              </div>

           </div>
        </div>

      </div>
    </motion.div>
  );
}
