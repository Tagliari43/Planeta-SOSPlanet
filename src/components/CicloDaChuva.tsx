import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CloudRain, Droplets, ShieldCheck, Leaf, Activity, ArrowDownCircle, Trees, Sparkles, Sprout } from 'lucide-react';
import { cn } from '../lib/utils';

export function CicloDaChuva() {
  const [irrigateAmount, setIrrigateAmount] = useState('');
  const [isIrrigating, setIsIrrigating] = useState(false);
  
  const tvlBase = 4500000;
  const [tvl, setTvl] = useState(tvlBase);
  const [userIrrigated, setUserIrrigated] = useState(1250);
  
  const amountNum = parseFloat(irrigateAmount) || 0;
  const protectedArea = (amountNum * 1.5).toFixed(1);
  const carbonCredits = (amountNum * 0.04).toFixed(2);
  const futureHarvest = (amountNum * 0.12).toFixed(2); // 12% APY approx

  // Escala da árvore baseada no TVL
  const treeScale = 1 + Math.min((tvl - tvlBase) / 100000, 0.2); 

  const handleIrrigate = () => {
    if (!amountNum || amountNum <= 0 || isIrrigating) return;
    setIsIrrigating(true);
    
    setTimeout(() => {
       setTvl(prev => prev + amountNum);
       setUserIrrigated(prev => prev + amountNum);
       setIrrigateAmount('');
       setIsIrrigating(false);
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 max-w-7xl mx-auto pb-10"
    >
      {/* Header - O Ciclo da Chuva */}
      <div className="bg-[#031526]/90 backdrop-blur-md rounded-3xl p-8 border border-blue-900/40 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
        <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-600/10 rounded-[100%] blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#061e38] to-[#020b14] border border-cyan-500/30 flex items-center justify-center relative shadow-[0_0_40px_rgba(6,182,212,0.15)] overflow-hidden shrink-0">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 to-transparent" />
             <CloudRain className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
              O Ciclo da Chuva
            </h2>
            <p className="text-cyan-200/70 mt-2 max-w-2xl text-lg">
              Irrigue a Terra com seus tokens SOS. Aqui não bloqueamos liquidez, nós cultivamos a rede. O fluxo alimenta a Árvore Matriz e regenera o ecossistema.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Lado Esquerdo: A Árvore Matriz (TVL) */}
        <div className="lg:col-span-7">
           <div className="bg-[#020914]/90 backdrop-blur-xl border border-cyan-900/30 rounded-3xl p-6 relative overflow-hidden h-[600px] flex flex-col items-center justify-end shadow-2xl group">
             
             {/* Efeitos de Chuva no Background da Árvore */}
             <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: ["-10%", "110%"] }}
                    transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
                    className="absolute w-[1px] h-16 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                    style={{ left: `${Math.random() * 100}%`, opacity: Math.random() * 0.5 + 0.2 }}
                  />
                ))}
             </div>

             {/* Brilho da Base (Raízes) */}
             <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-emerald-900/20 to-transparent pointer-events-none" />
             
             {/* TVL Global Hover Info */}
             <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20 pointer-events-none">
                <div>
                   <div className="text-[10px] text-cyan-500 uppercase font-bold tracking-widest font-mono mb-1">Total Irrigado na Rede</div>
                   <div className="text-3xl font-mono font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                      {tvl.toLocaleString()} <span className="text-cyan-400 text-lg">SOS</span>
                   </div>
                </div>
                <div className="text-right bg-black/40 border border-cyan-900/50 p-3 rounded-2xl backdrop-blur-sm">
                   <div className="flex items-center gap-2 text-emerald-400 font-bold justify-end mb-1">
                      <Trees className="w-4 h-4" /> Árvore Matriz
                   </div>
                   <div className="text-xs text-gray-400 font-mono">Bioluminescência Ativa</div>
                </div>
             </div>

             {/* SVG Holográfico da Árvore Matriz */}
             <div className="relative w-full max-w-md h-[400px] flex justify-center items-end z-10 bottom-10">
                
                {/* Glow Radial Atrás da Árvore */}
                <motion.div 
                  animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[60px]"
                />

                <motion.div
                  animate={{ scale: treeScale }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  className="relative w-full h-full flex justify-center items-end"
                >
                   <svg viewBox="0 0 200 200" className="w-[300px] h-full drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                      {/* Tronco Holográfico */}
                      <path d="M 90 200 Q 100 150 100 100 Q 100 150 110 200 Z" fill="none" stroke="rgba(16, 185, 129, 0.8)" strokeWidth="4" className="animate-[pulse_3s_ease-in-out_infinite]" />
                      <path d="M 85 200 Q 95 120 95 80 Q 105 120 115 200 Z" fill="none" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="2" strokeDasharray="4 2" />
                      
                      {/* Galhos Primários */}
                      <path d="M 100 120 Q 70 90 40 100" fill="none" stroke="rgba(16, 185, 129, 0.6)" strokeWidth="2" />
                      <path d="M 100 110 Q 130 80 160 90" fill="none" stroke="rgba(16, 185, 129, 0.6)" strokeWidth="2" />
                      <path d="M 100 150 Q 60 130 50 160" fill="none" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="1" />
                      <path d="M 100 140 Q 140 120 150 150" fill="none" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="1" />
                      
                      {/* Copa Luminescente (Nós Neurais) */}
                      {[
                        {cx: 40, cy: 100, r: 4, c1: "emerald", c2: "cyan"},
                        {cx: 50, cy: 70, r: 6, c1: "emerald", c2: "cyan"},
                        {cx: 80, cy: 40, r: 8, c1: "cyan", c2: "emerald"},
                        {cx: 120, cy: 40, r: 7, c1: "emerald", c2: "cyan"},
                        {cx: 150, cy: 70, r: 5, c1: "cyan", c2: "emerald"},
                        {cx: 160, cy: 90, r: 4, c1: "emerald", c2: "cyan"},
                        {cx: 100, cy: 20, r: 10, c1: "cyan", c2: "emerald"},
                      ].map((node, i) => (
                        <g key={i}>
                           <circle cx={node.cx} cy={node.cy} r={node.r} fill={`var(--tw-colors-${node.c1}-400)`} className="opacity-80" />
                           <circle cx={node.cx} cy={node.cy} r={node.r + 4} fill={`var(--tw-colors-${node.c2}-500)`} className="opacity-20 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
                           {/* Linha Neural conectando ao centro */}
                           <line x1={100} y1={90} x2={node.cx} y2={node.cy} stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" strokeDasharray="2 2" />
                        </g>
                      ))}

                      {/* Partículas subindo das Raízes (Feedback Visual do Staking Global) */}
                      <motion.g
                        animate={{ opacity: [0, 1, 0], y: [0, -100] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                      >
                         <circle cx="95" cy="180" r="1.5" fill="#fff" />
                         <circle cx="105" cy="190" r="1.5" fill="#fff" />
                         <circle cx="100" cy="160" r="2" fill="#a7f3d0" />
                      </motion.g>
                   </svg>
                </motion.div>
             </div>
             
             {/* Status Bottom */}
             <div className="absolute bottom-6 w-full px-6 flex justify-between items-end text-[10px] font-mono text-cyan-500/50">
                <span>ESTADO: FLORESCENDO</span>
                <span>RENDIMENTO ECO-P2P APLICADO</span>
             </div>
           </div>
        </div>

        {/* Lado Direito: Ação de Irrigação & Oracle View */}
        <div className="lg:col-span-5 space-y-6">
           
           {/* Painel de Irrigação (Staking Input) */}
           <div className="bg-[#040C1A]/90 backdrop-blur-xl border border-cyan-900/40 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 to-emerald-400 opacity-20 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-cyan-400" /> Irrigar a Terra
                 </h3>
                 <div className="text-right">
                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest font-mono">Sua Contribuição</div>
                    <div className="text-sm font-bold text-emerald-400">{userIrrigated.toLocaleString()} SOS</div>
                 </div>
              </div>

              <div className="space-y-4 relative z-10">
                 <div className="bg-black/40 border border-cyan-900/50 rounded-2xl p-4 transition-colors focus-within:border-cyan-500/50 relative overflow-hidden">
                    {/* Animação de gotas caindo base e no input */}
                    <AnimatePresence>
                       {isIrrigating && (
                          <motion.div 
                            initial={{ top: '-100%' }}
                            animate={{ top: '100%' }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "linear" }}
                            className="absolute left-1/2 w-4 h-32 bg-gradient-to-b from-transparent to-cyan-400/50 blur-sm -translate-x-1/2 pointer-events-none"
                          />
                       )}
                    </AnimatePresence>

                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs text-gray-400 font-mono">Quantidade para Plantio</span>
                       <span className="text-xs text-cyan-500 font-mono">Balanço: 14,050 SOS</span>
                    </div>
                    <div className="flex gap-2">
                       <input 
                         type="number" 
                         value={irrigateAmount}
                         onChange={(e) => setIrrigateAmount(e.target.value)}
                         disabled={isIrrigating}
                         placeholder="0.00"
                         className="flex-1 bg-transparent text-3xl font-mono text-white outline-none placeholder-gray-800 disabled:opacity-50 min-w-0"
                       />
                       <button 
                         onClick={() => setIrrigateAmount('14050')}
                         className="px-3 py-1 bg-cyan-950/50 text-cyan-400 text-[10px] font-bold rounded-lg border border-cyan-900 hover:border-cyan-500 transition-colors h-fit self-center uppercase"
                       >
                         Max
                       </button>
                    </div>
                 </div>

                 <button 
                   onClick={handleIrrigate}
                   disabled={isIrrigating || amountNum <= 0}
                   className="w-full relative group/btn overflow-hidden bg-gradient-to-r from-cyan-900 to-emerald-900 text-white px-4 py-4 rounded-xl font-bold border border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                 >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                    {isIrrigating ? (
                       <>
                         <Droplets className="w-5 h-5 text-cyan-300 animate-bounce" />
                         <span className="relative z-10 whitespace-nowrap text-cyan-300 font-mono tracking-widest">IRRIGANDO...</span>
                       </>
                    ) : (
                       <>
                         <ArrowDownCircle className="w-5 h-5 relative z-10" />
                         <span className="relative z-10 whitespace-nowrap">Iniciar Irrigação (Stake)</span>
                       </>
                    )}
                 </button>
              </div>
           </div>

           {/* Sussurros de Arion (Impacto Previsível) */}
           <AnimatePresence>
             {amountNum > 0 && (
               <motion.div 
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  className="bg-emerald-950/30 border border-emerald-900/50 backdrop-blur-md rounded-3xl p-6 relative overflow-hidden shadow-lg overflow-y-visible"
               >
                 <div className="absolute top-0 right-0 p-16 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 to-transparent pointer-events-none" />
                 
                 <div className="flex items-center gap-3 mb-4 relative z-10">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    <div>
                       <h4 className="text-md font-bold text-emerald-50">Sussurros de Arion</h4>
                       <span className="text-[10px] text-emerald-400/70 font-mono uppercase tracking-widest">Previsão Oracular de Impacto</span>
                    </div>
                 </div>

                 <div className="space-y-3 relative z-10">
                    <div className="bg-black/30 rounded-2xl p-4 flex items-center justify-between border border-emerald-900/30">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-emerald-900/40 flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                         </div>
                         <span className="text-sm text-gray-300">Resguardo Territorial</span>
                       </div>
                       <div className="text-right">
                         <div className="text-sm font-bold text-emerald-400">~{protectedArea} m²</div>
                         <div className="text-[10px] text-gray-500 font-mono">Flora nativa assegurada</div>
                       </div>
                    </div>

                    <div className="bg-black/30 rounded-2xl p-4 flex items-center justify-between border border-cyan-900/30">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-cyan-900/40 flex items-center justify-center">
                            <Leaf className="w-4 h-4 text-cyan-400" />
                         </div>
                         <span className="text-sm text-gray-300">Créditos de Carbono</span>
                       </div>
                       <div className="text-right">
                         <div className="text-sm font-bold text-cyan-400">~{carbonCredits} tCO2e</div>
                         <div className="text-[10px] text-gray-500 font-mono">Mitigação estimada</div>
                       </div>
                    </div>

                    <div className="bg-black/30 rounded-2xl p-4 flex items-center justify-between border border-yellow-900/30">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-yellow-900/40 flex items-center justify-center">
                            <Sprout className="w-4 h-4 text-yellow-400" />
                         </div>
                         <span className="text-sm text-gray-300">Colheita Futura (12% APY)</span>
                       </div>
                       <div className="text-right">
                         <div className="text-sm font-bold text-yellow-400">+{futureHarvest} SOS</div>
                         <div className="text-[10px] text-gray-500 font-mono">Rendimento anual projetado</div>
                       </div>
                    </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>

        </div>
      </div>
    </motion.div>
  );
}
