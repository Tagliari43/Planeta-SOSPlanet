import React from 'react';
import { motion } from 'motion/react';
import { Sprout, TreePine, Sun, Flame, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface EcoStreakCardProps {
  streakDays: number;
}

export function EcoStreakCard({ streakDays }: EcoStreakCardProps) {
  // Determine phase based on streak days
  let PhaseIcon = Sprout;
  let phaseName = 'Semente Desperta';
  let phaseColor = 'text-emerald-400';
  let ringColor = 'stroke-emerald-500/50';
  let glowColor = 'shadow-emerald-500/20';

  if (streakDays >= 7 && streakDays < 21) {
    PhaseIcon = TreePine;
    phaseName = 'Broto Resiliente';
    phaseColor = 'text-teal-400';
    ringColor = 'stroke-teal-500/50';
    glowColor = 'shadow-teal-500/20';
  } else if (streakDays >= 21) {
    PhaseIcon = Sun;
    phaseName = 'Árvore da Vida';
    phaseColor = 'text-amber-400';
    ringColor = 'stroke-amber-500/50';
    glowColor = 'shadow-amber-500/20';
  }

  // Calculate progress for the circular bar (max out at 30 days for visual loop)
  const progress = Math.min((streakDays % 30) / 30, 1);
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className={cn("bg-[#0f1123]/80 backdrop-blur-md rounded-3xl p-6 border border-indigo-900/30 flex flex-col items-center justify-center relative overflow-hidden", glowColor, "shadow-2xl")}>
      <div className="absolute top-0 right-0 p-24 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 to-transparent pointer-events-none blur-2xl" />
      
      <div className="flex items-center w-full justify-between mb-4 relative z-10">
        <h3 className="text-lg font-bold text-indigo-50">Constância (Eco-Streak)</h3>
        <div className="flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full border border-white/5">
           <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
           <span className="font-mono text-orange-400 font-bold">{streakDays}</span>
        </div>
      </div>

      {/* Circular Progress & Phase Visual */}
      <div className="relative w-32 h-32 flex items-center justify-center my-6">
        {/* Background Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
           <circle 
             cx="50" cy="50" r="45" 
             fill="none" 
             strokeWidth="4" 
             className="stroke-indigo-950" 
           />
           {/* Progress Ring */}
           <motion.circle 
             cx="50" cy="50" r="45" 
             fill="none" 
             strokeWidth="4" 
             strokeDasharray={circumference}
             strokeDashoffset={circumference}
             animate={{ strokeDashoffset }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className={ringColor}
             strokeLinecap="round"
           />
        </svg>

        {/* Center Icon */}
        <motion.div 
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           key={phaseName}
           className={cn("w-16 h-16 rounded-full bg-black/50 border border-white/5 flex items-center justify-center shadow-inner relative z-10")}
        >
           <PhaseIcon className={cn("w-8 h-8", phaseColor)} />
           {streakDays >= 21 && (
             <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 rounded-full border border-amber-500/30 border-dashed"
             />
           )}
        </motion.div>
      </div>

      <div className="text-center relative z-10">
         <div className="text-xs text-indigo-300/60 uppercase tracking-widest font-bold mb-1">Estágio Atual</div>
         <div className={cn("text-xl font-bold flex items-center justify-center gap-2", phaseColor)}>
           {phaseName} {streakDays >= 21 && <Sparkles className="w-4 h-4" />}
         </div>
      </div>
    </div>
  );
}
