import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Fingerprint, Flame, Landmark, Trees, 
  Radar, HeartPulse, Sparkles, Hexagon, QrCode, IdCard
} from 'lucide-react';
import { cn } from '../lib/utils';

export function GuardianPassport() {
  const [isPulsing, setIsPulsing] = useState(false);

  // Dados unificados do Guardião
  const guardian = {
    name: "Eder Tagliari",
    address: "0x3f...8a12",
    joinDate: "Outubro 2025",
    streakPhase: "Árvore da Vida",
    streakDays: 28,
    votingPower: 3750,
    nftCount: 3,
  };

  const handlePulse = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 max-w-7xl mx-auto pb-10"
    >
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
        
        {/* O Crachá Holográfico (Passaporte) */}
        <div className="w-full md:w-[400px] bg-[#020b14]/80 backdrop-blur-xl border border-blue-900/40 rounded-[2.5rem] p-8 relative overflow-hidden shadow-[0_0_50px_rgba(29,78,216,0.15)] flex-shrink-0">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] pointer-events-none" />
          
          {/* Header do Passaporte */}
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="w-14 h-14 bg-blue-950/50 rounded-2xl border border-blue-500/30 flex items-center justify-center shadow-inner">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-blue-400 tracking-widest uppercase">ID Soberano</div>
              <div className="font-mono text-sm text-gray-300">{guardian.address}</div>
            </div>
          </div>

          <div className="space-y-6 relative z-10">
            {/* Foto / Holograma */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full border-2 border-blue-500/20 p-1 relative mb-4">
                <div className="absolute inset-0 border-2 border-emerald-400/30 rounded-full animate-[spin_10s_linear_infinite] border-dashed" />
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-900 to-[#020b14] flex items-center justify-center overflow-hidden shadow-inner">
                  <Fingerprint className="w-14 h-14 text-blue-300 opacity-80" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{guardian.name}</h2>
              <span className="text-xs text-blue-300/70 font-mono mt-1">Guardião Primordial desde {guardian.joinDate}</span>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent" />

            {/* Atributos Agregados */}
            <div className="space-y-4">
              <div className="bg-[#050e1a] rounded-2xl p-4 border border-blue-900/30 flex items-center justify-between group hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-900/20 border border-orange-500/20 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Eco-Streak</div>
                    <div className="text-sm font-bold text-orange-100">{guardian.streakPhase}</div>
                  </div>
                </div>
                <div className="text-xl font-mono font-bold text-orange-400">{guardian.streakDays}</div>
              </div>

              <div className="bg-[#050e1a] rounded-2xl p-4 border border-blue-900/30 flex items-center justify-between group hover:border-yellow-500/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-900/20 border border-yellow-500/20 flex items-center justify-center">
                    <Landmark className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Poder DAO</div>
                    <div className="text-sm font-bold text-yellow-100">Conselho da Terra</div>
                  </div>
                </div>
                <div className="text-xl font-mono font-bold text-yellow-400">{guardian.votingPower}</div>
              </div>

              <div className="bg-[#050e1a] rounded-2xl p-4 border border-blue-900/30 flex items-center justify-between group hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-900/20 border border-emerald-500/20 flex items-center justify-center">
                    <Hexagon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Genesis NFTs</div>
                    <div className="text-sm font-bold text-emerald-100">Sementes Digitais</div>
                  </div>
                </div>
                <div className="text-xl font-mono font-bold text-emerald-400">{guardian.nftCount}</div>
              </div>
            </div>

            {/* Footer QR / Sigilo */}
            <div className="pt-2 flex justify-center opacity-50">
               <QrCode className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Módulo de Ressonância (Sinal Piscar / P2P Flare) */}
        <div className="w-full md:w-auto flex-1 max-w-lg space-y-6">
           <div className="bg-[#040f1a]/90 backdrop-blur-md rounded-3xl p-8 border border-emerald-900/30 relative overflow-hidden h-[400px] shadow-2xl flex flex-col items-center justify-center">
             
             {/* Efeitos Visuais do Scanner Técnico */}
             <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
             
             <AnimatePresence>
               {isPulsing && (
                 <motion.div 
                   initial={{ scale: 0.5, opacity: 1 }}
                   animate={{ scale: 3, opacity: 0 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 2, ease: "easeOut" }}
                   className="absolute w-64 h-64 border-2 border-emerald-400 rounded-full pointer-events-none"
                 />
               )}
             </AnimatePresence>
             {isPulsing && (
                <motion.div 
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
                  className="absolute w-64 h-64 border border-blue-400 rounded-full pointer-events-none"
                />
             )}

             <div className="relative z-10 flex flex-col items-center text-center">
               <div className={cn(
                 "w-24 h-24 rounded-full border-4 flex items-center justify-center mb-6 transition-all duration-500 relative",
                 isPulsing ? "border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.8)] bg-emerald-900/30" : "border-gray-800 bg-gray-900 shadow-inner"
               )}>
                 {isPulsing ? (
                   <HeartPulse className="w-10 h-10 text-emerald-300 animate-pulse" />
                 ) : (
                   <Radar className="w-10 h-10 text-gray-600" />
                 )}

                 {/* Linha de Scanner Radial (Quando Ativo) */}
                 {isPulsing && (
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 rounded-full overflow-hidden"
                   >
                     <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-emerald-400/30 origin-right" />
                   </motion.div>
                 )}
               </div>

               <h3 className="text-xl font-bold text-white mb-2">Malha de Ressonância</h3>
               <p className="text-sm text-emerald-100/60 font-medium mb-8 max-w-sm">
                 Envie um sinal de cura para a rede. Acione o scanner para fortalecer a malha P2P ecosistêmica ou iniciar um donativo local.
               </p>

               <button 
                 onClick={handlePulse}
                 disabled={isPulsing}
                 className="relative group disabled:opacity-80"
               >
                 <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-200 group-disabled:hidden" />
                 <div className="relative bg-[#020813] hover:bg-[#031021] border border-blue-500/50 px-8 py-4 rounded-2xl flex items-center gap-3 transition-colors">
                   {isPulsing ? (
                     <>
                       <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" />
                       <span className="font-bold text-emerald-400 font-mono tracking-widest">ECO-FLARE ATIVO</span>
                     </>
                   ) : (
                     <>
                       <HeartPulse className="w-5 h-5 text-blue-400 group-hover:text-emerald-400 transition-colors" />
                       <span className="font-bold text-white tracking-widest font-mono">EMITIR SINAL DE CURA</span>
                     </>
                   )}
                 </div>
               </button>
             </div>
           </div>
           
           <div className="bg-[#0b121c]/80 border border-blue-900/30 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                 <Shield className="w-4 h-4 text-emerald-400" />
                 <span className="text-xs uppercase font-bold text-emerald-500/70 tracking-widest">Soberania Garantida</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Este Passaporte é criptografado e intransferível. Ele sumariza seu compromisso on-chain (Conselho) e off-chain (Eco-Streaks e NFTs). As ações refletidas na Malha de Ressonância emitem métricas vitais para os Oráculos de Gaia.
              </p>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
