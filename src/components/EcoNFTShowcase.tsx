import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sprout, Trees, Hexagon, Shield, Leaf } from 'lucide-react';
import { cn } from '../lib/utils';

type NFTStage = 'seed' | 'sprout' | 'biome';

interface EcoNFT {
  id: string;
  name: string;
  location: string;
  stage: NFTStage;
  plantedAt: string;
}

const MOCK_NFTS: EcoNFT[] = [
  { id: 'nft_1', name: 'Carvalho Ancestral', location: 'Amazônia - Setor Norte', stage: 'biome', plantedAt: 'Dez 2025' },
  { id: 'nft_2', name: 'Muda de Ipê', location: 'Mata Atlântica', stage: 'sprout', plantedAt: 'Mar 2026' },
  { id: 'nft_3', name: 'Gênese do Mangue', location: 'Costa Leste', stage: 'seed', plantedAt: 'Mai 2026' },
];

export function EcoNFTShowcase() {
  const [selectedNft, setSelectedNft] = useState<EcoNFT | null>(MOCK_NFTS[0]);

  const renderNFTArt = (stage: NFTStage) => {
    switch (stage) {
      case 'seed':
        return (
          <div className="relative w-full h-48 bg-[#0a120e] rounded-2xl flex items-center justify-center overflow-hidden border border-purple-500/30">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 to-transparent" />
             <motion.div 
               animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} 
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-10"
             >
                <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center">
                   <Sparkles className="w-8 h-8 text-purple-300" />
                </div>
             </motion.div>
             <div className="absolute bottom-4 left-4 text-xs font-mono text-purple-400">ESTÁGIO 1: SEMENTE ESTELAR</div>
          </div>
        );
      case 'sprout':
        return (
          <div className="relative w-full h-48 bg-[#0a120e] rounded-2xl flex items-center justify-center overflow-hidden border border-teal-500/30">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/20 to-transparent" />
             <motion.div 
               animate={{ y: [0, -5, 0] }} 
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-10"
             >
                <div className="w-16 h-16 rounded-[2rem] rotate-45 bg-teal-500/20 border border-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.5)] flex items-center justify-center">
                   <Sprout className="w-8 h-8 text-teal-300 -rotate-45" />
                </div>
             </motion.div>
             <div className="absolute bottom-4 left-4 text-xs font-mono text-teal-400">ESTÁGIO 2: BROTO RESILIENTE</div>
          </div>
        );
      case 'biome':
        return (
          <div className="relative w-full h-48 bg-[#0a120e] rounded-2xl flex items-center justify-center overflow-hidden border border-emerald-500/30">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 to-transparent" />
             <motion.div 
               animate={{ filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'] }} 
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-10"
             >
                <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.5)] flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                   <Trees className="w-10 h-10 text-emerald-300" />
                </div>
             </motion.div>
             <div className="absolute bottom-4 left-4 text-xs font-mono text-emerald-400">ESTÁGIO 3: BIOMA MADURO</div>
          </div>
        );
    }
  };

  return (
    <div className="bg-[#0e1612]/90 backdrop-blur-md rounded-3xl p-6 border border-emerald-900/30">
      <div className="flex items-center gap-3 mb-6">
        <Hexagon className="w-6 h-6 text-emerald-400" />
        <h3 className="text-xl font-bold text-white tracking-tight">Genesis NFTs</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Selected NFT Visual */}
        <div className="space-y-4">
           {selectedNft && renderNFTArt(selectedNft.stage)}
           
           <AnimatePresence mode="wait">
             {selectedNft && (
               <motion.div 
                 key={selectedNft.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="bg-black/40 rounded-2xl p-4 border border-white/5"
               >
                 <h4 className="text-lg font-bold text-emerald-50 mb-1">{selectedNft.name}</h4>
                 <div className="text-sm text-emerald-200/60 mb-3">{selectedNft.location}</div>
                 <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                    <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-500" /> PoA Gerado</span>
                    <span>Plantado: {selectedNft.plantedAt}</span>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* NFT List */}
        <div className="space-y-3">
          <div className="text-xs uppercase font-bold tracking-widest text-emerald-500/70 mb-2">Suas Sementes Digitais</div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-none pr-2">
             {MOCK_NFTS.map((nft) => (
               <button 
                 key={nft.id}
                 onClick={() => setSelectedNft(nft)}
                 className={cn(
                   "w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group",
                   selectedNft?.id === nft.id 
                     ? "bg-emerald-900/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                     : "bg-black/20 border-white/5 hover:border-emerald-500/30 hover:bg-emerald-900/10"
                 )}
               >
                  <div className="flex items-center gap-3">
                     <div className={cn(
                       "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border",
                       nft.stage === 'seed' ? "bg-purple-900/40 border-purple-500/30" :
                       nft.stage === 'sprout' ? "bg-teal-900/40 border-teal-500/30" : "bg-emerald-900/40 border-emerald-500/30"
                     )}>
                       {nft.stage === 'seed' && <Sparkles className="w-4 h-4 text-purple-400" />}
                       {nft.stage === 'sprout' && <Sprout className="w-4 h-4 text-teal-400" />}
                       {nft.stage === 'biome' && <Trees className="w-4 h-4 text-emerald-400" />}
                     </div>
                     <div>
                        <div className={cn("text-sm font-bold", selectedNft?.id === nft.id ? "text-emerald-100" : "text-gray-300")}>{nft.name}</div>
                        <div className="text-[10px] text-gray-500 font-mono">{nft.location}</div>
                     </div>
                  </div>
                  <Leaf className={cn("w-4 h-4 transition-transform", selectedNft?.id === nft.id ? "text-emerald-400 scale-110" : "text-gray-600 group-hover:text-emerald-500")} />
               </button>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
