import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trees, GraduationCap, Coins, ShieldCheck, Activity, Leaf, Eye, Vote, Sparkles, CheckCircle2, ChevronRight, Fingerprint, Lock, Sprout, MapPin, Calendar, Atom, FileText, Image as ImageIcon, Droplets, RefreshCcw, ArrowUpDown, Wind, BellRing, Target, Medal, Award, Flame, Crown, Network, Flower, Share2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { cn } from '../lib/utils';

interface GuardianDashboardProps {
  walletAddress: string;
}

function SporesParticles() {
  const particles = Array.from({ length: 40 });
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen hidden dark:block">
      {particles.map((_, i) => {
        const startX = Math.random() * 100;
        const duration = Math.random() * 20 + 20; // 20s to 40s
        const delay = Math.random() * -40; // Pre-populate
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-400 shadow-[0_0_8px_2px_rgba(74,222,128,0.4)]"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
            }}
            initial={{
              x: `${startX}vw`,
              y: '105vh',
              opacity: 0,
            }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.4, 0.8, 0.4, 0],
              x: `${startX + (Math.random() * 20 - 10)}vw`,
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: delay,
            }}
          />
        );
      })}
    </div>
  );
}

const impactData = [
  { month: 'Jan', arvores: 5 },
  { month: 'Fev', arvores: 12 },
  { month: 'Mar', arvores: 25 },
  { month: 'Abr', arvores: 42 },
  { month: 'Mai', arvores: 68 },
  { month: 'Jun', arvores: 105 },
];

const allocationData = [
  { name: 'Reflorestamento', value: 65, color: '#22c55e' },
  { name: 'Educação', value: 25, color: '#3b82f6' },
  { name: 'Tecnologia', value: 10, color: '#f59e0b' },
];

const timelineEvents = [
  { id: 1, type: 'nature', title: '500 Árvores plantadas no Lote Amazônia Sul', tx: '0x8A2B...9F1C', date: 'Hoje, 14:30', icon: <Trees className="w-4 h-4"/>, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { id: 2, type: 'social', title: '200 Cestas Básicas entregues em Manaus', tx: '0x9B4C...2E8D', date: 'Ontem, 09:15', icon: <Leaf className="w-4 h-4"/>, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 3, type: 'edu', title: 'Laboratório STEM inaugurado (Escola Rio Claro)', tx: '0x7C1A...1D4B', date: '12 Mai 2026', icon: <GraduationCap className="w-4 h-4"/>, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
];

const daoProposals = [
  { id: 1, title: 'Priorizar Fundo de Educação Tecnológica vs Expansão de Reflorestamento', optionA: 'Educação', optionB: 'Reflorestamento', votesA: 45, votesB: 55, active: true },
  { id: 2, title: 'Nova Parceria de Monitoramento Neural (Santuário)', optionA: 'Aprovar', optionB: 'Rejeitar', votesA: 82, votesB: 18, active: true },
];

export function GuardianDashboard({ walletAddress }: GuardianDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'eye' | 'dao' | 'viveiro' | 'mural' | 'fonte' | 'circulo' | 'codice' | 'arvore'>('overview');
  const [votingProposal, setVotingProposal] = useState<number | null>(null);
  const [algoAmount, setAlgoAmount] = useState('');
  const [stakingAmount, setStakingAmount] = useState(100);
  const [stakingSeasons, setStakingSeasons] = useState(1);
  const sosAmount = (Number(algoAmount) || 0) * 1500;
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapSuccessEffect, setSwapSuccessEffect] = useState(false);

  const handleSwap = () => {
    if (!algoAmount) return;
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      setSwapSuccessEffect(true);
      setTimeout(() => {
        setSwapSuccessEffect(false);
        setAlgoAmount('');
      }, 3000);
    }, 2500);
  };

  const [pendingO2, setPendingO2] = useState(42.8);
  const [totalO2, setTotalO2] = useState(1250);
  const [isHarvesting, setIsHarvesting] = useState(false);
  const [showHarvestEffect, setShowHarvestEffect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPendingO2(prev => Number((prev + 0.1).toFixed(1)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleHarvest = () => {
    if (pendingO2 <= 0) return;
    setIsHarvesting(true);
    setTimeout(() => {
      setTotalO2(prev => Number((prev + pendingO2).toFixed(1)));
      setPendingO2(0);
      setIsHarvesting(false);
      setShowHarvestEffect(true);
      setTimeout(() => setShowHarvestEffect(false), 2000);
    }, 1500);
  };

  const mockWhispers = [
    "🌿 Guardião 0x7F... financiou 50 mudas de Jatobá",
    "✨ Proposta 'Laboratório STEM' aprovada no Quênia!",
    "💧 Guardião 0x2A... purificou 100 ALGO em SOS",
    "🦋 Novo Viveiro Digital ativado na Amazônia"
  ];
  const [whisperIdx, setWhisperIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWhisperIdx(prev => (prev + 1) % mockWhispers.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const [farolProgress, setFarolProgress] = useState(30);
  const [isChanneling, setIsChanneling] = useState(false);
  const [showFlare, setShowFlare] = useState(false);

  const handleCanalizar = () => {
    setIsChanneling(true);
    setShowFlare(true);
    setTimeout(() => {
      setFarolProgress(prev => Math.min(prev + 15, 100));
      setIsChanneling(false);
      setTimeout(() => setShowFlare(false), 500);
    }, 1500);
  };

  const [unlockedBadges, setUnlockedBadges] = useState<number[]>([1, 2]);
  const [newlyUnlocked, setNewlyUnlocked] = useState<{id: number, title: string, icon: any, color: string, glow: string} | null>(null);

  const allBadges = [
    { id: 1, title: 'A Primeira Semente', icon: <Sprout className="w-6 h-6" />, color: 'text-amber-500', glow: 'shadow-amber-500/50', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-700/50' },
    { id: 2, title: 'Gota de Prata', icon: <Droplets className="w-6 h-6" />, color: 'text-gray-400 dark:text-gray-300', glow: 'shadow-gray-400/50', bg: 'bg-gray-100 dark:bg-gray-800/40', border: 'border-gray-300 dark:border-gray-600/50' },
    { id: 3, title: 'Voz da Floresta', icon: <BellRing className="w-6 h-6" />, color: 'text-green-500', glow: 'shadow-green-500/50', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-700/50' },
    { id: 4, title: 'Alma do Rio', icon: <Activity className="w-6 h-6" />, color: 'text-blue-500', glow: 'shadow-blue-500/50', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-700/50' },
    { id: 5, title: 'Semeador Elevado', icon: <Trees className="w-6 h-6" />, color: 'text-emerald-500', glow: 'shadow-emerald-500/50', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-700/50' },
    { id: 6, title: 'Guardião Ancestral', icon: <Crown className="w-6 h-6" />, color: 'text-yellow-500', glow: 'shadow-yellow-500/50', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-700/50' },
  ];

  const handleUnlockBadge = (b: any) => {
    if (!unlockedBadges.includes(b.id)) {
      setUnlockedBadges(prev => [...prev, b.id]);
      setNewlyUnlocked(b);
      setTimeout(() => setNewlyUnlocked(null), 4000);
    }
  };

  const [voteWeight, setVoteWeight] = useState(50);
  const [voteSuccess, setVoteSuccess] = useState<number | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [minted, setMinted] = useState(false);

  const handleMint = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      setMinted(true);
    }, 4000); // 4s animation
  };

  const handleVote = (id: number) => {
    setVoteSuccess(id);
    setTimeout(() => {
      setVoteSuccess(null);
      setVotingProposal(null);
      setVoteWeight(50);
    }, 3000);
  };

  const SEMENTE_PROGRESS = 65;
  const radius = 34; // For a w-16 h-16 container roughly
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (SEMENTE_PROGRESS / 100) * circumference;

  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  const handleSliderMove = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!isDraggingSlider || !sliderRef.current) return;
    
    let clientX = 0;
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
    } else {
      clientX = (event as React.MouseEvent | MouseEvent).clientX;
    }
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseUp = () => {
    setIsDraggingSlider(false);
  };

  useEffect(() => {
    if (isDraggingSlider) {
      window.addEventListener('mousemove', handleSliderMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleSliderMove);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleSliderMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleSliderMove);
      window.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleSliderMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleSliderMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDraggingSlider]);

  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-[#060c08] min-h-screen transition-colors relative overflow-hidden">
      <SporesParticles />
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-[#111f18]/80 backdrop-blur-md border border-gray-200 dark:border-green-900/40 rounded-3xl p-8 mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 dark:bg-green-500/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="flex items-center gap-6 relative z-10">
            {/* Gamification Avatar with Radial Progress */}
            <div className="relative flex items-center justify-center w-24 h-24 shrink-0">
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r={radius} stroke="currentColor" strokeWidth="3" fill="transparent" className="text-gray-200 dark:text-green-900/30" />
                <circle 
                  cx="40" cy="40" r={radius} 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  fill="transparent" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="round" 
                  className="text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)] transition-all duration-1000 ease-out" 
                />
              </svg>
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-green-400 to-green-600 p-[2px] shadow-lg shadow-green-500/20 relative z-10">
                <div className="w-full h-full bg-white dark:bg-[#0b1410] rounded-full flex items-center justify-center">
                   <ShieldCheck className="w-8 h-8 text-green-500" />
                </div>
              </div>
              {/* Level indicator */}
              <div className="absolute -bottom-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-md shadow-green-500/30 border border-green-400/50 flex items-center gap-1 z-20">
                <Leaf className="w-3 h-3" />
                Broto
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-green-50 tracking-tight">Portal do Guardião</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-mono text-gray-500 dark:text-green-100/60 break-all">{walletAddress}</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse drop-shadow-[0_0_4px_rgba(34,197,94,0.8)]"></span>
                <span className="text-xs text-green-600 dark:text-green-400 font-semibold uppercase tracking-wider">Conectado</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-green-100/50 mt-2 font-medium">35 XP para o nível <span className="text-green-600 dark:text-green-400 font-bold">Árvore</span></p>
            </div>
          </div>
          
          <div className="bg-green-50/50 dark:bg-[#0b1410]/50 border border-green-100 dark:border-green-800/50 rounded-2xl px-6 py-4 flex items-center gap-4 text-left min-w-[200px] backdrop-blur-sm relative z-10">
             <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400 shadow-inner">
               <Activity className="w-5 h-5" />
             </div>
             <div>
               <p className="text-xs text-gray-500 dark:text-green-100/50 uppercase tracking-wider font-semibold">Impacto Global</p>
               <p className="text-xl font-bold text-green-700 dark:text-green-300 tracking-tight">Semeador Elevado</p>
             </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setActiveTab('overview')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'overview' 
                 ? "bg-green-600 text-white shadow-md shadow-green-500/20" 
                 : "bg-white dark:bg-[#111f18] text-gray-600 dark:text-green-100/60 border border-gray-200 dark:border-green-900/40 hover:bg-gray-50 dark:hover:bg-green-900/20"
            )}
          >
            <Activity className="w-4 h-4" /> Visão Geral
          </button>
          <button 
            onClick={() => setActiveTab('eye')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'eye' 
                 ? "bg-green-600 text-white shadow-md shadow-green-500/20" 
                 : "bg-white dark:bg-[#111f18] text-gray-600 dark:text-green-100/60 border border-gray-200 dark:border-green-900/40 hover:bg-gray-50 dark:hover:bg-green-900/20"
            )}
          >
            <Eye className="w-4 h-4" /> Olho de Gaia
          </button>
          <button 
            onClick={() => setActiveTab('dao')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'dao' 
                 ? "bg-green-600 text-white shadow-md shadow-green-500/20" 
                 : "bg-white dark:bg-[#111f18] text-gray-600 dark:text-green-100/60 border border-gray-200 dark:border-green-900/40 hover:bg-gray-50 dark:hover:bg-green-900/20"
            )}
          >
            <Vote className="w-4 h-4" /> Conselho da Floresta
          </button>
          <button 
            onClick={() => setActiveTab('viveiro')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'viveiro' 
                 ? "bg-green-600 text-white shadow-md shadow-green-500/20" 
                 : "bg-white dark:bg-[#111f18] text-gray-600 dark:text-green-100/60 border border-gray-200 dark:border-green-900/40 hover:bg-gray-50 dark:hover:bg-green-900/20"
            )}
          >
            <Sprout className="w-4 h-4" /> Viveiro Digital
          </button>
          <button 
            onClick={() => setActiveTab('mural')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'mural' 
                 ? "bg-green-600 text-white shadow-md shadow-green-500/20" 
                 : "bg-white dark:bg-[#111f18] text-gray-600 dark:text-green-100/60 border border-gray-200 dark:border-green-900/40 hover:bg-gray-50 dark:hover:bg-green-900/20"
            )}
          >
            <ImageIcon className="w-4 h-4" /> Eco-Mural
          </button>
          <button 
            onClick={() => setActiveTab('fonte')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'fonte' 
                 ? "bg-green-600 text-white shadow-md shadow-green-500/20" 
                 : "bg-white dark:bg-[#111f18] text-gray-600 dark:text-green-100/60 border border-gray-200 dark:border-green-900/40 hover:bg-gray-50 dark:hover:bg-green-900/20"
            )}
          >
            <Droplets className="w-4 h-4" /> A Fonte
          </button>
          <button 
            onClick={() => setActiveTab('circulo')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'circulo' 
                 ? "bg-green-600 text-white shadow-md shadow-green-500/20" 
                 : "bg-white dark:bg-[#111f18] text-gray-600 dark:text-green-100/60 border border-gray-200 dark:border-green-900/40 hover:bg-gray-50 dark:hover:bg-green-900/20"
            )}
          >
            <Crown className="w-4 h-4" /> Círculo
          </button>
          <button 
            onClick={() => setActiveTab('codice')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'codice' 
                 ? "bg-green-600 text-white shadow-md shadow-green-500/20" 
                 : "bg-white dark:bg-[#111f18] text-gray-600 dark:text-green-100/60 border border-gray-200 dark:border-green-900/40 hover:bg-gray-50 dark:hover:bg-green-900/20"
            )}
          >
            <Award className="w-4 h-4" /> Códice
          </button>
          <button 
            onClick={() => setActiveTab('arvore')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'arvore' 
                 ? "bg-green-600 text-white shadow-md shadow-green-500/20" 
                 : "bg-white dark:bg-[#111f18] text-gray-600 dark:text-green-100/60 border border-gray-200 dark:border-green-900/40 hover:bg-gray-50 dark:hover:bg-green-900/20"
            )}
          >
            <Flower className="w-4 h-4" /> A Árvore
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/60 dark:bg-[#111f18]/40 backdrop-blur-md rounded-3xl p-6 border border-gray-100 dark:border-green-900/30 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-100/50 dark:bg-green-900/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-[#0b1410] border border-green-100 dark:border-green-800/50 flex items-center justify-center mb-4 text-green-600 dark:text-green-400 relative z-10">
              <Trees className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-green-100/60 uppercase tracking-wide relative z-10">Árvores Financiadas</h3>
            <div className="text-4xl font-bold text-gray-900 dark:text-green-50 mt-2 relative z-10">105</div>
            <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-2 relative z-10 flex items-center gap-1">+37 neste ciclo <Leaf className="w-3 h-3" /></p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/60 dark:bg-[#111f18]/40 backdrop-blur-md rounded-3xl p-6 border border-gray-100 dark:border-green-900/30 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-[#0b1410] border border-blue-100 dark:border-blue-900/50 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 relative z-10">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-green-100/60 uppercase tracking-wide relative z-10">Crianças Apoiadas</h3>
            <div className="text-4xl font-bold text-gray-900 dark:text-green-50 mt-2 relative z-10">42</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-2 relative z-10">Programas de educação</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/60 dark:bg-[#111f18]/40 backdrop-blur-md rounded-3xl p-6 border border-gray-100 dark:border-green-900/30 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-100/50 dark:bg-amber-900/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-[#0b1410] border border-amber-100 dark:border-amber-900/50 flex items-center justify-center mb-4 text-amber-600 dark:text-amber-400 relative z-10">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-green-100/60 uppercase tracking-wide relative z-10">Saldo Token SOS</h3>
            <div className="text-4xl font-bold text-gray-900 dark:text-green-50 mt-2 relative z-10">14,250</div>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-2 relative z-10">Em hold ativo</p>
          </motion.div>

          {/* Colheita de O2 */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/60 dark:bg-[#111f18]/40 backdrop-blur-md rounded-3xl p-6 border border-gray-100 dark:border-green-900/30 relative overflow-hidden group flex flex-col justify-between">
            <AnimatePresence>
              {showHarvestEffect && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-400/40 to-transparent mix-blend-screen"
                />
              )}
            </AnimatePresence>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-teal-100/50 dark:bg-teal-900/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="flex justify-between items-start mb-2 relative z-10">
              <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-[#0b1410] border border-teal-100 dark:border-teal-900/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <Wind className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-green-100/50">Total</p>
                <p className="text-lg font-bold text-teal-700 dark:text-teal-400">{totalO2}</p>
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-green-100/60 uppercase tracking-wide">Energia Pendente</h3>
              <div className="text-3xl font-bold text-gray-900 dark:text-green-50 mt-1 mb-4 flex items-baseline gap-1">
                {pendingO2.toFixed(1)} <span className="text-xs font-medium text-teal-500 dark:text-teal-400">O2</span>
              </div>
              
              <button 
                onClick={handleHarvest}
                disabled={isHarvesting || pendingO2 === 0}
                className="w-full relative overflow-hidden group bg-gradient-to-r from-teal-500 to-green-500 text-white font-bold py-2.5 rounded-xl shadow-md shadow-teal-500/20 transition-all disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isHarvesting ? (
                  <Atom className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Colher O2 <Sparkles className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Farol da Esperança */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mb-8 bg-amber-500/5 dark:bg-amber-900/10 backdrop-blur-md rounded-3xl p-8 border border-amber-500/20 dark:border-amber-500/30 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 to-transparent rounded-full pointer-events-none blur-3xl" />
          
          <AnimatePresence>
            {showFlare && (
              <motion.div 
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-[800px] bg-gradient-to-t from-amber-500/80 via-amber-300/40 to-transparent pointer-events-none origin-bottom blur-xl z-20 mix-blend-screen"
              />
            )}
          </AnimatePresence>

          <div className="relative z-10 max-w-md">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 font-bold uppercase tracking-wider text-xs mb-3">
              <Flame className="w-4 h-4 animate-pulse" /> Missão Coletiva Ativa
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-amber-50 tracking-tight leading-tight mb-2">O Farol da Esperança</h3>
            <p className="text-gray-600 dark:text-amber-100/70 font-medium">Resgatar 10 Hectares de Mata Atlântica. O tempo está se esgotando, precisamos de energia vital.</p>
            
            <button 
              onClick={handleCanalizar}
              disabled={isChanneling || farolProgress >= 100}
              className="mt-6 relative overflow-hidden group bg-gradient-to-r from-amber-600 to-orange-500 text-white font-bold py-3 px-8 rounded-2xl shadow-lg shadow-amber-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isChanneling ? (
                 <Atom className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <Target className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Canalizar SOS</span>
                </>
              )}
            </button>
          </div>

          <div className="relative w-48 h-48 shrink-0 z-10 flex items-center justify-center group flex-col">
            <div className="text-center mb-2">
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{farolProgress}%</span>
            </div>
            <div className="relative w-24 h-32 scale-y-110 drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
               <svg viewBox="0 0 100 150" className="w-full h-full">
                 <defs>
                   <clipPath id="dropClip">
                     <path d="M50 0 C50 0 100 70 100 100 C100 127.614 77.6142 150 50 150 C22.3858 150 0 127.614 0 100 C0 70 50 0 50 0Z" />
                   </clipPath>
                 </defs>
                 <path d="M50 0 C50 0 100 70 100 100 C100 127.614 77.6142 150 50 150 C22.3858 150 0 127.614 0 100 C0 70 50 0 50 0Z" fill="#78350f" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
                 <g clipPath="url(#dropClip)">
                   <rect x="0" y={150 - (farolProgress / 100) * 150} width="100" height="150" fill="#f59e0b" className="transition-all duration-1000 ease-out" />
                 </g>
               </svg>
            </div>
          </div>
        </motion.div>

        {/* Charts and Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/80 dark:bg-[#111f18]/60 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-green-900/30 h-[380px] flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 dark:text-green-50 mb-6 font-mono">Curva de Impacto Ecológico</h3>
            <div className="flex-1 min-h-0">
               <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={impactData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorArvores" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--chart-grid)" opacity={0.2} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111f18', borderColor: '#064e3b', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#4ade80' }}
                  />
                  <Area type="monotone" dataKey="arvores" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorArvores)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/80 dark:bg-[#111f18]/60 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-green-900/30 h-[380px] flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 dark:text-green-50 mb-6 font-mono">Alocação de Energia</h3>
            <div className="flex-1 min-h-0 flex items-center justify-center relative">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={allocationData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={90}
                     paddingAngle={5}
                     dataKey="value"
                     stroke="none"
                   >
                     {allocationData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#111f18', borderColor: '#064e3b', borderRadius: '8px', color: '#fff' }}
                     itemStyle={{ color: '#fff' }}
                   />
                 </PieChart>
               </ResponsiveContainer>
               {/* Centro do gráfico */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                 <span className="text-2xl font-bold text-gray-900 dark:text-green-50">100%</span>
                 <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-green-100/50">Auditado</p>
               </div>
            </div>
            <div className="flex justify-center gap-4 mt-2 flex-wrap">
               {allocationData.map((item, idx) => (
                 <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-green-100/80 font-medium">
                   <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                   {item.name}
                 </div>
               ))}
            </div>
          </motion.div>
        </div>

        {/* A Teia de Micélio */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8 bg-white/80 dark:bg-[#111f18]/60 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-green-900/30 relative overflow-hidden flex flex-col">
           <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-inner">
               <Network className="w-5 h-5" />
             </div>
             <div>
               <h3 className="text-xl font-bold text-gray-900 dark:text-teal-50 tracking-tight">A Teia de Micélio</h3>
               <p className="text-sm text-gray-500 dark:text-green-100/60 mt-1">Conexões Sincronizadas da Rede Guardian (Live P2P)</p>
             </div>
           </div>

           <div className="relative w-full h-[300px] border border-gray-100 dark:border-green-900/30 rounded-2xl overflow-hidden bg-gray-50/50 dark:bg-black/20 flexitems-center justify-center">
             <div className="absolute inset-0 z-0">
               <svg className="w-full h-full">
                 <defs>
                   <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
                     <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
                     <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
                   </linearGradient>
                 </defs>
                 {Array.from({ length: 15 }).map((_, i) => (
                   <motion.path
                     key={i}
                     d={`M 50% 50% L ${20 + Math.random() * 60}% ${20 + Math.random() * 60}%`}
                     stroke="url(#lineGrad)"
                     strokeWidth="1"
                     strokeDasharray="4 4"
                     initial={{ pathLength: 0, opacity: 0 }}
                     animate={{ pathLength: 1, opacity: [0, 0.5, 0.2] }}
                     transition={{ duration: 3 + Math.random() * 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                   />
                 ))}
               </svg>
             </div>
             {/* Center Node */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.6)] z-10 group cursor-pointer">
               <div className="absolute w-full h-full bg-teal-400 rounded-full animate-ping opacity-50" />
               <Share2 className="w-6 h-6 text-white" />
               <div className="absolute top-full mt-2 w-max bg-black/80 px-3 py-1.5 rounded-lg text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                 Você: O Centro da Conexão
               </div>
             </div>
             
             {/* Surrounding Nodes */}
             {Array.from({ length: 8 }).map((_, i) => {
               const angle = (i * 360) / 8 + Math.random() * 20;
               const radius = 30 + Math.random() * 15;
               const top = `calc(50% + ${Math.sin((angle * Math.PI) / 180) * radius}%)`;
               const left = `calc(50% + ${Math.cos((angle * Math.PI) / 180) * radius}%)`;
               const scale = 0.5 + Math.random() * 0.5;
               
               return (
                 <div 
                   key={i}
                   className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer group z-10"
                   style={{ top, left, transform: `translate(-50%, -50%) scale(${scale})` }}
                 >
                   <motion.div 
                     className="w-full h-full bg-green-500 rounded-full"
                     animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                     transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
                   />
                   <div className="absolute bottom-full mb-2 shrink-0 bg-black/80 px-2.5 py-1 rounded-lg text-green-300 text-[10px] font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-green-500/30">
                     Sincronia On-Chain P2P
                   </div>
                 </div>
               );
             })}
           </div>
        </motion.div>
            </motion.div>
          )}

          {activeTab === 'eye' && (
            <motion.div
              key="eye"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white/80 dark:bg-[#111f18]/60 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-green-900/30">
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">
                     <Eye className="w-5 h-5" />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-gray-900 dark:text-green-50 tracking-tight">O Olho de Gaia</h3>
                     <p className="text-sm text-gray-500 dark:text-green-100/60 transition-colors">Feed de Rastreabilidade Orgânica via Blockchain.</p>
                   </div>
                </div>

                <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[2.25rem] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-green-900/30 before:to-transparent">
                  {timelineEvents.map((event, idx) => (
                    <motion.div 
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15 }}
                      className="relative pl-12 md:pl-20 py-4 group"
                    >
                      <div className={cn("absolute left-0 w-10 h-10 md:w-16 md:h-16 flex items-center justify-center rounded-full border-4 border-white dark:border-[#111f18] transition-colors shadow-sm", event.bg, event.color)}>
                         {event.icon}
                      </div>

                      <div className="bg-white/50 dark:bg-[#0b1410]/50 backdrop-blur-sm border border-gray-100 dark:border-green-900/30 rounded-2xl p-5 hover:border-gray-300 dark:hover:border-green-700/50 transition-all shadow-sm group-hover:-translate-y-1">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                           <div>
                             <h4 className="text-lg font-bold text-gray-900 dark:text-green-100">{event.title}</h4>
                             <div className="flex items-center gap-2 mt-2">
                               <Fingerprint className="w-3.5 h-3.5 text-gray-400" />
                               <span className="text-xs font-mono text-gray-500 dark:text-green-400/80 bg-gray-100 dark:bg-green-900/20 px-2 py-0.5 rounded text-ellipsis overflow-hidden break-all">TxID: {event.tx}</span>
                             </div>
                           </div>
                           <div className="text-sm text-gray-400 font-medium whitespace-nowrap bg-gray-50 dark:bg-[#0b1410] px-3 py-1 rounded-full border border-gray-100 dark:border-green-900/40">
                             {event.date}
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'dao' && (
            <motion.div
              key="dao"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white/80 dark:bg-[#111f18]/60 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-green-900/30">
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">
                     <Vote className="w-5 h-5" />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-gray-900 dark:text-green-50 tracking-tight">Conselho da Floresta</h3>
                     <p className="text-sm text-gray-500 dark:text-green-100/60 transition-colors">Decida as próximas raízes de impacto do ecossistema.</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {daoProposals.map((proposal, idx) => (
                    <motion.div 
                      key={proposal.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white/50 dark:bg-[#0b1410]/50 border border-gray-200 dark:border-green-900/40 rounded-3xl p-6 relative overflow-hidden group hover:border-green-300 dark:hover:border-green-700/50 transition-colors"
                    >
                      {/* Inner success animation */}
                      <AnimatePresence>
                        {voteSuccess === proposal.id && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-20 bg-green-500/90 dark:bg-green-900/95 backdrop-blur-sm flex flex-col items-center justify-center text-white"
                          >
                            <motion.div 
                              initial={{ scale: 0 }} 
                              animate={{ scale: 1, rotate: 360 }} 
                              transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                              <Sparkles className="w-12 h-12 text-yellow-300 mb-3" />
                            </motion.div>
                            <p className="font-bold text-lg mb-1 tracking-tight">Voto registrado eternamente na Blockchain</p>
                            <p className="text-sm text-green-100/80">O Conselho agradece a sua sabedoria.</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex justify-between items-start mb-6">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-green-50 leading-snug max-w-[80%]">{proposal.title}</h4>
                        <span className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">Ativa</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-xs font-semibold mb-2">
                          <span className="text-gray-600 dark:text-green-300">{proposal.optionA} ({proposal.votesA}%)</span>
                          <span className="text-gray-600 dark:text-green-300">{proposal.optionB} ({proposal.votesB}%)</span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 dark:bg-green-900/30 rounded-full overflow-hidden flex">
                          <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${proposal.votesA}%` }}></div>
                          <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${proposal.votesB}%` }}></div>
                        </div>
                      </div>

                      {votingProposal === proposal.id ? (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-4 border-t border-gray-100 dark:border-green-900/30"
                        >
                          <p className="text-sm text-gray-600 dark:text-green-100/70 mb-3 font-semibold">Peso do Voto (Tokens SOS)</p>
                          <input 
                            type="range" 
                            min="1" 
                            max="100" 
                            value={voteWeight} 
                            onChange={(e) => setVoteWeight(parseInt(e.target.value))}
                            className="w-full mb-4 accent-green-600 dark:accent-green-500"
                          />
                          <div className="flex justify-between text-xs font-mono text-gray-500 dark:text-green-400/80 mb-6">
                             <span>1</span>
                             <span>Peso atual: {voteWeight}0 SOS</span>
                             <span>100</span>
                          </div>
                          <div className="flex gap-2">
                             <button
                               onClick={() => setVotingProposal(null)}
                               className="flex-1 py-3 text-sm font-semibold rounded-xl bg-gray-100 dark:bg-[#0b1410] text-gray-600 dark:text-green-100/60 hover:bg-gray-200 dark:hover:bg-green-900/40 transition-colors"
                             >
                               Cancelar
                             </button>
                             <button
                               onClick={() => handleVote(proposal.id)}
                               className="flex-[2] py-3 text-sm font-semibold rounded-xl bg-green-600 text-white hover:bg-green-500 transition-colors shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                             >
                               <CheckCircle2 className="w-4 h-4" /> Confirmar Voto
                             </button>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="pt-4 border-t border-gray-100 dark:border-green-900/30 flex justify-end">
                           <button
                             onClick={() => setVotingProposal(proposal.id)}
                             className="px-5 py-2.5 rounded-full bg-[#0b1410] hover:bg-gray-900 dark:bg-green-900/50 dark:hover:bg-green-800 text-white dark:text-green-300 font-semibold text-sm transition-all shadow-sm flex items-center gap-2"
                           >
                              Votar na Proposta <ChevronRight className="w-4 h-4" />
                           </button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === 'viveiro' && (
            <motion.div
              key="viveiro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white/80 dark:bg-[#111f18]/60 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-green-900/30">
                <div className="flex items-center gap-3 mb-8">
                   <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">
                     <Sprout className="w-5 h-5" />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-gray-900 dark:text-green-50 tracking-tight">Viveiro Digital</h3>
                     <p className="text-sm text-gray-500 dark:text-green-100/60 transition-colors">Digitalize a vida. Transforme tokens SOS em NFTs que lastreiam árvores reais.</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-green-50">Semente Ancestral #01</h4>
                    <p className="text-gray-600 dark:text-green-100/70 leading-relaxed font-medium">
                      Este Eco-NFT representa uma muda certificada da espécie <span className="italic text-green-700 dark:text-green-400">Hevea brasiliensis</span>. Ao mintar este ativo, você transfere 200 SOS para o contrato inteligente, garantindo o plantio, o monitoramento por satélite e o cuidado vitalício desta árvore no mundo real.
                    </p>
                    <div className="bg-gray-50 dark:bg-[#0b1410] border border-gray-100 dark:border-green-900/30 rounded-2xl p-6 grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1 text-gray-500 dark:text-green-100/50">
                          <MapPin className="w-4 h-4" /> <span className="text-xs uppercase tracking-widest font-bold">Local</span>
                        </div>
                        <p className="text-sm font-mono font-semibold text-gray-800 dark:text-green-300">Lat: -3.465<br/>Lon: -62.215</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1 text-gray-500 dark:text-green-100/50">
                          <Calendar className="w-4 h-4" /> <span className="text-xs uppercase tracking-widest font-bold">Reserva</span>
                        </div>
                        <p className="text-sm font-mono font-semibold text-gray-800 dark:text-green-300">Reserva de<br/>Desenvolvimento</p>
                      </div>
                    </div>
                    
                    {!minted && (
                      <button 
                        onClick={handleMint}
                        disabled={isMinting}
                        className="w-full relative overflow-hidden group bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all disabled:opacity-80 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isMinting ? (
                          <>
                            <Atom className="w-5 h-5 animate-spin text-green-100" />
                            <span>Solidificando Contrato na Blockchain...</span>
                          </>
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                            <Lock className="w-5 h-5 relative z-10" />
                            <span className="relative z-10">Mintar Eco-NFT (200 SOS)</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* NFT Visuals */}
                  <div className="flex justify-center relative">
                    <div className={cn(
                      "relative w-full max-w-[320px] aspect-[3/4] rounded-3xl p-6 border transition-all duration-1000 flex flex-col justify-end overflow-hidden",
                      minted 
                        ? "bg-white/10 dark:bg-[#111f18]/80 backdrop-blur-md border-green-400/50 shadow-[0_0_50px_rgba(74,222,128,0.2)]" 
                        : "bg-gray-100 dark:bg-[#0b1410] border-gray-200 dark:border-green-900/40 opacity-80 filter grayscale-[50%]"
                    )}>
                      {/* Tree Inner Art */}
                      <div className="absolute inset-x-0 bottom-0 top-1/4 bg-gradient-to-t from-green-900/80 to-transparent flex items-end justify-center pb-8 z-0">
                         {minted && (
                           <>
                             {/* Beams of light */}
                             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-400/30 via-transparent to-transparent opacity-80 mix-blend-screen animate-pulse"></div>
                             {/* Simulated tree shape */}
                             <motion.div 
                               initial={{ scaleY: 0, opacity: 0 }}
                               animate={{ scaleY: 1, opacity: 1 }}
                               transition={{ duration: 1.5, ease: "easeOut" }}
                               className="w-1.5 h-32 bg-green-400/80 rounded-t-full shadow-[0_0_15px_rgba(74,222,128,1)] relative origin-bottom"
                             >
                               {/* Branches */}
                               <div className="absolute bottom-12 right-0 w-8 h-1 bg-green-400/80 rounded-full rotate-45 origin-left shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
                               <div className="absolute bottom-20 left-0 w-6 h-1 bg-green-400/80 rounded-full -rotate-45 origin-right shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
                               <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-green-500/20 rounded-full blur-md"></div>
                             </motion.div>
                           </>
                         )}
                         {!minted && (
                           <div className="w-1.5 h-16 bg-gray-400 dark:bg-green-900/50 rounded-t-full relative">
                             <div className="absolute bottom-6 right-0 w-4 h-1 bg-gray-400 dark:bg-green-900/50 rounded-full rotate-45 origin-left"></div>
                           </div>
                         )}
                      </div>

                      {/* Overlays / locking state */}
                      <AnimatePresence>
                        {isMinting && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-green-900/80 backdrop-blur-md flex items-center justify-center z-10"
                          >
                             <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-400 rounded-full animate-spin"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="relative z-20 mt-auto bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 w-full">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-bold text-sm">Hevea brasiliensis</span>
                          {minted ? (
                            <span className="text-[10px] bg-green-500 text-green-950 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Vivo</span>
                          ) : (
                            <span className="text-[10px] bg-gray-500 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Semente</span>
                          )}
                        </div>
                        <div className="text-[10px] font-mono text-gray-300">
                           {minted ? 'Tx: 0x4F...7D2E' : 'Aguardando Ativação'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === 'mural' && (
            <motion.div
              key="mural"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white/80 dark:bg-[#111f18]/60 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-green-900/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">
                       <FileText className="w-5 h-5" />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold text-gray-900 dark:text-green-50 tracking-tight">O Mural da Verdade</h3>
                       <p className="text-sm text-gray-500 dark:text-green-100/60 transition-colors">A confiança não se exige, se prova na terra e na blockchain.</p>
                     </div>
                   </div>
                   
                   <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800/50 shadow-sm shadow-blue-500/10">
                     <ShieldCheck className="w-4 h-4" />
                     <span className="text-xs font-bold uppercase tracking-wider">On-Chain Proof - Algorand</span>
                   </div>
                </div>

                <div 
                  ref={sliderRef}
                  className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize border-4 border-white dark:border-[#0b1410] shadow-xl shadow-green-900/5 select-none"
                  onMouseDown={(e) => { setIsDraggingSlider(true); handleSliderMove(e); }}
                  onTouchStart={(e) => { setIsDraggingSlider(true); handleSliderMove(e); }}
                >
                  {/* Base Layer: Arid Land */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544867885-2333f61544ad?q=80&w=1600&auto=format&fit=crop')" }}
                  >
                    <div className="absolute inset-0 bg-[#8c5a2b]/30 mix-blend-multiply"></div>
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider z-0">
                      Antes (Lote #04 - 2023)
                    </div>
                  </div>

                  {/* Top Layer: Lush Forest */}
                  <div 
                    className="absolute inset-y-0 left-0 bg-cover bg-left pointer-events-none"
                    style={{ 
                      width: `${sliderPosition}%`,
                      backgroundImage: "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?q=80&w=1600&auto=format&fit=crop')"
                    }}
                  >
                    <div className="absolute inset-0 bg-green-900/20 mix-blend-overlay"></div>
                    <div className="absolute bottom-4 left-4 bg-green-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                      Depois (Hoje)
                    </div>
                  </div>

                  {/* Slider Drag Handle */}
                  <div 
                    className="absolute inset-y-0 w-1 bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none"
                    style={{ left: `calc(${sliderPosition}% - 2px)` }}
                  >
                     <div className="w-10 h-10 bg-white border-2 border-green-500 rounded-full flex items-center justify-center shadow-lg pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform">
                       <div className="flex gap-1 text-green-600">
                         <ChevronRight className="w-4 h-4 rotate-180" />
                         <ChevronRight className="w-4 h-4" />
                       </div>
                     </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 dark:bg-[#0b1410] p-4 rounded-xl border border-gray-100 dark:border-green-900/30">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-green-100/70 font-medium">
                     <Fingerprint className="w-4 h-4 text-green-500" />
                     Auditoria de Imagem de Satélite verificada às <span className="font-mono text-gray-900 dark:text-green-400">14:02:44 UTC</span>
                  </div>
                  <a href="#" className="text-xs font-bold text-green-600 dark:text-green-400 hover:text-green-700 hover:underline uppercase tracking-wider flex items-center gap-1">
                    Ver contrato na Explorer <ChevronRight className="w-3 h-3" />
                  </a>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === 'fonte' && (
            <motion.div
              key="fonte"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white/80 dark:bg-[#111f18]/60 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-green-900/30 relative overflow-hidden max-w-2xl mx-auto">
                {/* Glow effects */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                
                <AnimatePresence>
                  {swapSuccessEffect && (
                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-30 bg-green-500/10 backdrop-blur-sm border-2 border-green-500/50 rounded-3xl flex items-center justify-center"
                     >
                        <motion.div 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }} 
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="bg-white dark:bg-[#0b1410] p-6 rounded-full shadow-2xl shadow-green-500/40"
                        >
                          <CheckCircle2 className="w-16 h-16 text-green-500" />
                        </motion.div>
                     </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col items-center text-center gap-3 mb-10 relative z-10">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-green-100 to-teal-100 dark:from-green-900/40 dark:to-teal-900/40 flex items-center justify-center text-green-600 dark:text-green-400 shadow-inner">
                     <Droplets className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="text-2xl font-bold text-gray-900 dark:text-green-50 tracking-tight">A Fonte</h3>
                     <p className="text-sm text-gray-500 dark:text-green-100/60 mt-1">Converta energia nativa (ALGO) na semente da vida (SOS).</p>
                   </div>
                </div>

                <div className="space-y-4 relative z-10">
                  {/* From Input */}
                  <div className="bg-gray-50 dark:bg-[#060c08] border border-gray-200 dark:border-green-900/40 rounded-2xl p-4 transition-colors focus-within:border-green-400 dark:focus-within:border-green-500/50">
                    <div className="flex justify-between text-xs font-semibold text-gray-400 dark:text-green-100/50 mb-2 px-1">
                      <span>VOCÊ PAGA</span>
                      <span>Saldo: 4,500 ALGO</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input 
                        type="number"
                        placeholder="0.0"
                        value={algoAmount}
                        onChange={(e) => setAlgoAmount(e.target.value)}
                        className="bg-transparent border-none text-3xl font-bold text-gray-900 dark:text-green-50 w-full focus:ring-0 outline-none p-0"
                      />
                      <div className="flex items-center gap-2 bg-white dark:bg-[#111f18] px-3 py-1.5 rounded-xl border border-gray-200 dark:border-green-900/40 shadow-sm shrink-0">
                         <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-[10px] font-bold">A</div>
                         <span className="font-bold text-gray-900 dark:text-white">ALGO</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Switch */}
                  <div className="flex justify-center -my-6 relative z-20">
                     <div className="bg-white dark:bg-[#111f18] p-2 rounded-xl border border-gray-200 dark:border-green-900/40 shadow-sm text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors cursor-pointer">
                        <ArrowUpDown className={cn("w-5 h-5", isSwapping && "animate-spin text-green-500")} />
                     </div>
                  </div>

                  {/* To Output */}
                  <div className="bg-gray-50 dark:bg-[#060c08] border border-gray-200 dark:border-green-900/40 rounded-2xl p-4 transition-colors">
                    <div className="flex justify-between text-xs font-semibold text-gray-400 dark:text-green-100/50 mb-2 px-1">
                      <span>VOCÊ RECEBE</span>
                      <span>1 ALGO = 1,500 SOS</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input 
                        type="number"
                        disabled
                        value={sosAmount > 0 ? sosAmount : ''}
                        placeholder="0.0"
                        className="bg-transparent border-none text-3xl font-bold text-gray-900 dark:text-green-50 w-full focus:ring-0 outline-none p-0 cursor-not-allowed opacity-80"
                      />
                      <div className="flex items-center gap-2 bg-white dark:bg-[#111f18] px-3 py-1.5 rounded-xl border border-gray-200 dark:border-green-900/40 shadow-sm shrink-0">
                         <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold"><Leaf className="w-3 h-3"/></div>
                         <span className="font-bold text-gray-900 dark:text-white">SOS</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleSwap}
                    disabled={isSwapping || (!algoAmount && true)}
                    className="w-full relative overflow-hidden group bg-gradient-to-r from-green-600 to-teal-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
                  >
                    {isSwapping ? (
                      <>
                        <RefreshCcw className="w-5 h-5 animate-spin" />
                        <span>Purificando energia na rede...</span>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                        <Sparkles className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Purificar / Trocar</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === 'circulo' && (
            <motion.div
              key="circulo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white/80 dark:bg-[#111f18]/60 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-green-900/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500/10 to-transparent rounded-full pointer-events-none blur-3xl mix-blend-screen" />
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-200 to-yellow-500 dark:from-yellow-900/40 dark:to-amber-600/40 flex items-center justify-center text-yellow-600 dark:text-yellow-400 shadow-inner">
                    <Crown className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-amber-50 tracking-tight">O Círculo dos Anciões</h3>
                    <p className="text-sm text-gray-500 dark:text-green-100/60 mt-1">Os maiores canalizadores de energia vital de Gaia.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { rank: 1, name: 'Semeador do Sol', wallet: '0x1F...4B8A', o2: '14,250 O2', trees: 105, role: 'Guardião Ancestral', color: 'text-yellow-500 dark:text-yellow-400', glow: 'shadow-[0_0_20px_rgba(234,179,8,0.3)]', bg: 'bg-yellow-50 dark:bg-yellow-500/10', border: 'border-yellow-200 dark:border-yellow-500/30' },
                    { rank: 2, name: 'Voz dos Rios', wallet: '0x8C...2D1F', o2: '12,840 O2', trees: 82, role: 'Alma da Água', color: 'text-gray-400 dark:text-gray-300', glow: 'shadow-[0_0_20px_rgba(156,163,175,0.3)]', bg: 'bg-gray-50 dark:bg-gray-500/10', border: 'border-gray-200 dark:border-gray-500/30' },
                    { rank: 3, name: 'Raiz Profunda', wallet: '0x3E...9A4C', o2: '10,500 O2', trees: 64, role: 'Protetor da Terra', color: 'text-orange-600 dark:text-orange-500', glow: 'shadow-[0_0_20px_rgba(234,88,12,0.3)]', bg: 'bg-orange-50 dark:bg-orange-500/10', border: 'border-orange-200 dark:border-orange-500/30' },
                    { rank: 4, name: 'Brotador Cósmico', wallet: '0x5A...1B9C', o2: '8,200 O2', trees: 45, role: 'Semeador Elevado', color: 'text-green-600', glow: '', bg: 'bg-white dark:bg-[#0b1410]/50', border: 'border-gray-100 dark:border-green-900/30' },
                    { rank: 5, name: 'Vento Suave', wallet: '0x99...2F0A', o2: '6,400 O2', trees: 30, role: 'Guardião Aprendiz', color: 'text-green-600', glow: '', bg: 'bg-white dark:bg-[#0b1410]/50', border: 'border-gray-100 dark:border-green-900/30' },
                  ].map((guardian) => (
                    <motion.div 
                      key={guardian.rank}
                      whileHover={{ scale: 1.01 }}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border transition-all group relative",
                        guardian.bg, guardian.border, guardian.glow
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn("w-8 text-center font-bold text-lg", guardian.color)}>
                          {guardian.rank}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center overflow-hidden relative">
                           <Leaf className={cn("w-5 h-5", guardian.color)} />
                           {/* Tooltip on hover */}
                           <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 bg-black/80 flex items-center justify-center transition-opacity cursor-help" title={guardian.role}>
                              <Crown className="w-4 h-4 text-white" />
                           </div>
                        </div>
                        <div>
                          <p className={cn("font-bold", guardian.rank <= 3 ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-green-100")}>{guardian.name}</p>
                          <p className="text-xs text-gray-500 dark:text-green-100/50 font-mono">{guardian.wallet}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-right">
                        <div>
                           <p className="text-xs text-gray-400 dark:text-green-100/50 uppercase font-bold tracking-wider mb-1">Mudas</p>
                           <p className="text-sm font-bold text-gray-900 dark:text-green-50 flex items-center gap-1 justify-end">{guardian.trees} <Trees className="w-3 h-3 text-green-500"/></p>
                        </div>
                        <div className="bg-white/50 dark:bg-black/20 px-4 py-2 rounded-xl">
                           <p className="text-xs text-gray-400 dark:text-green-100/50 uppercase font-bold tracking-wider mb-1">Energia</p>
                           <p className={cn("text-base font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r", guardian.rank <= 3 ? "from-yellow-500 to-amber-500" : "from-teal-400 to-green-500")}>{guardian.o2}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'codice' && (
            <motion.div
              key="codice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white/80 dark:bg-[#111f18]/60 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-green-900/30 relative overflow-hidden">
                 
                 <AnimatePresence>
                   {newlyUnlocked && (
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.5 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 1.1 }}
                       transition={{ type: "spring", bounce: 0.6 }}
                       className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-3xl"
                     >
                        <div className={cn("p-8 rounded-3xl border-2 flex flex-col items-center gap-4 bg-[#0b1410] shadow-[0_0_50px_rgba(0,0,0,0.5)]", newlyUnlocked.border, newlyUnlocked.glow)}>
                           <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
                           <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                              className="absolute w-64 h-64 border border-white/5 rounded-full pointer-events-none border-dashed"
                           />
                           <div className={cn("w-24 h-24 rounded-full flex items-center justify-center relative z-10", newlyUnlocked.bg, newlyUnlocked.color)}>
                              <div className="scale-150">
                                {newlyUnlocked.icon}
                              </div>
                           </div>
                           <div className="text-center relative z-10">
                              <p className="text-sm font-bold text-green-400 uppercase tracking-widest mb-2 animate-pulse">Relíquia Desbloqueada</p>
                              <h4 className="text-3xl font-bold text-white tracking-tight">{newlyUnlocked.title}</h4>
                           </div>
                        </div>
                     </motion.div>
                   )}
                 </AnimatePresence>

                 <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">
                       <Award className="w-6 h-6" />
                     </div>
                     <div>
                       <h3 className="text-2xl font-bold text-gray-900 dark:text-green-50 tracking-tight">O Códice de Gaia</h3>
                       <p className="text-sm text-gray-500 dark:text-green-100/60 mt-1">Honrarias forjadas na blockchain. {unlockedBadges.length}/{allBadges.length} desbloqueadas.</p>
                     </div>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {allBadges.map((badge) => {
                      const isUnlocked = unlockedBadges.includes(badge.id);
                      return (
                        <motion.div 
                           key={badge.id}
                           whileHover={{ scale: 1.02 }}
                           onClick={() => !isUnlocked && handleUnlockBadge(badge)}
                           className={cn(
                             "relative p-6 rounded-3xl border transition-all cursor-pointer overflow-hidden flex flex-col items-center text-center gap-4",
                             isUnlocked 
                               ? cn(badge.bg, badge.border, badge.glow)
                               : "bg-gray-50 dark:bg-[#0b1410] border-gray-100 dark:border-green-900/30 opacity-70 grayscale hover:grayscale-0 hover:opacity-100"
                           )}
                        >
                           {isUnlocked && <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />}
                           <div className={cn(
                             "w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-inner z-10",
                             isUnlocked ? "bg-white/50 dark:bg-black/20 " + badge.color : "bg-gray-200 dark:bg-gray-800 text-gray-400"
                           )}>
                              {badge.icon}
                           </div>
                           <div className="z-10">
                              <h4 className={cn("font-bold transition-colors", isUnlocked ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400")}>{badge.title}</h4>
                              {!isUnlocked && <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1"><Lock className="w-3 h-3"/> Trancafiado</p>}
                           </div>
                        </motion.div>
                      )
                    })}
                 </div>

              </div>
            </motion.div>
          )}

          {activeTab === 'arvore' && (
            <motion.div
              key="arvore"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white/80 dark:bg-[#111f18]/60 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-green-900/30">
                <div className="flex flex-col md:flex-row gap-10">
                  {/* Controls */}
                  <div className="flex-1 space-y-8">
                     <div className="flex items-center gap-3">
                       <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400 shadow-inner">
                         <Flower className="w-6 h-6" />
                       </div>
                       <div>
                         <h3 className="text-2xl font-bold text-gray-900 dark:text-green-50 tracking-tight">A Árvore da Vida</h3>
                         <p className="text-sm text-gray-500 dark:text-green-100/60 mt-1">Staking Simbiótico: Plante sementes digitais para colher impacto real.</p>
                       </div>
                     </div>

                     <div>
                       <label className="text-sm font-bold text-gray-700 dark:text-green-100/80 uppercase tracking-widest mb-4 block">Energia Vital (SOS)</label>
                       <input 
                         type="range" 
                         min="100" 
                         max="10000" 
                         step="100"
                         value={stakingAmount}
                         onChange={(e) => setStakingAmount(Number(e.target.value))}
                         className="w-full h-2 bg-gray-200 dark:bg-green-900/40 rounded-lg appearance-none cursor-pointer accent-green-500"
                       />
                       <div className="flex justify-between mt-2 text-xs font-mono text-green-600 dark:text-green-400 font-bold">
                         <span>100 SOS</span>
                         <span className="text-lg">{stakingAmount} SOS</span>
                         <span>10000 SOS</span>
                       </div>
                     </div>

                     <div>
                       <label className="text-sm font-bold text-gray-700 dark:text-green-100/80 uppercase tracking-widest mb-4 block">Ciclo Sazonal (Estações)</label>
                       <div className="grid grid-cols-3 gap-4">
                         {[1, 2, 4].map(s => (
                            <button
                               key={s}
                               onClick={() => setStakingSeasons(s)}
                               className={cn(
                                 "py-3 rounded-2xl border font-bold text-sm transition-all relative overflow-hidden",
                                 stakingSeasons === s 
                                   ? "bg-gradient-to-r from-green-500 to-green-600 text-white border-transparent shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                                   : "bg-gray-50 dark:bg-[#0b1410] border-gray-200 dark:border-green-900/30 text-gray-500 dark:text-green-100/50 hover:border-green-500/50 transition-colors"
                               )}
                            >
                               {stakingSeasons === s && <motion.div layoutId="season-highlight" className="absolute inset-0 bg-white/20" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />}
                               <span className="relative z-10">{s} Estaç{s > 1 ? 'ões' : 'ão'}</span>
                            </button>
                         ))}
                       </div>
                     </div>

                     <button className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all active:scale-[0.98] group relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                        <span className="relative z-10">Plantar Semente</span>
                     </button>
                  </div>

                  {/* Hologram Representation */}
                  <div className="flex-1 relative min-h-[400px] flex items-center justify-center bg-[#0b1410] rounded-3xl border border-green-900/40 overflow-hidden shadow-inner">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/30 via-transparent to-transparent pointer-events-none" />
                     
                     <div className="relative z-10 w-full h-[300px] flex items-end justify-center">
                        <svg viewBox="0 0 200 300" className="w-[80%] h-[120%] overflow-visible drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">
                           <defs>
                             <linearGradient id="treeGrad" x1="0" y1="1" x2="0" y2="0">
                               <stop offset="0%" stopColor="#10b981" />
                               <stop offset="100%" stopColor="#34d399" />
                             </linearGradient>
                           </defs>
                           
                           {/* Trunk */}
                           <motion.path 
                              d="M95 300 L105 300 L102 180 L98 180 Z"
                              fill="url(#treeGrad)"
                              initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
                              animate={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)" }}
                              transition={{ duration: 1, ease: "easeOut" }}
                           />
                           
                           {/* Branches based on Seasons and Amount */}
                           {stakingSeasons >= 1 && (
                             <motion.g
                               initial={{ opacity: 0, scale: 0, originX: '100px', originY: '180px' }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{ delay: 0.5, type: 'spring', bounce: 0.4 }}
                             >
                                <path d="M100 190 Q60 140 30 150 Q70 120 100 180" fill="none" stroke="url(#treeGrad)" strokeWidth={2 + stakingAmount / 2000} strokeLinecap="round" />
                                <path d="M100 190 Q140 140 170 150 Q130 120 100 180" fill="none" stroke="url(#treeGrad)" strokeWidth={2 + stakingAmount / 2000} strokeLinecap="round" />
                             </motion.g>
                           )}
                           
                           {stakingSeasons >= 2 && (
                             <motion.g
                               initial={{ opacity: 0, scale: 0, originX: '100px', originY: '140px' }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{ delay: 0.7, type: 'spring', bounce: 0.4 }}
                             >
                                <path d="M100 140 Q40 80 20 70 Q60 50 100 120" fill="none" stroke="url(#treeGrad)" strokeWidth={1.5 + stakingAmount / 3000} strokeLinecap="round" />
                                <path d="M100 140 Q160 80 180 70 Q140 50 100 120" fill="none" stroke="url(#treeGrad)" strokeWidth={1.5 + stakingAmount / 3000} strokeLinecap="round" />
                             </motion.g>
                           )}
                           
                           {stakingSeasons >= 4 && (
                             <motion.g
                               initial={{ opacity: 0, scale: 0, originX: '100px', originY: '100px' }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{ delay: 0.9, type: 'spring', bounce: 0.4 }}
                             >
                                <path d="M100 100 Q70 30 50 10 Q80 -10 100 70" fill="none" stroke="url(#treeGrad)" strokeWidth={1 + stakingAmount / 5000} strokeLinecap="round" />
                                <path d="M100 100 Q130 30 150 10 Q120 -10 100 70" fill="none" stroke="url(#treeGrad)" strokeWidth={1 + stakingAmount / 5000} strokeLinecap="round" />
                                <path d="M100 90 L100 -10" fill="none" stroke="url(#treeGrad)" strokeWidth={1 + stakingAmount / 5000} strokeLinecap="round" />
                             </motion.g>
                           )}

                           {/* Leaves/Aura dependent on amount */}
                           <motion.circle 
                             cx="100" cy={120 - stakingSeasons * 20}
                             r={20 + stakingAmount / 150 * (stakingSeasons/2)}
                             fill="url(#treeGrad)"
                             opacity="0.1"
                             animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.25, 0.1] }}
                             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                           />
                           
                        </svg>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Sussurro da Floresta */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={whisperIdx}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 max-w-sm pointer-events-none"
          >
             <div className="bg-white/90 dark:bg-[#111f18]/90 backdrop-blur-md border border-gray-200 dark:border-green-900/50 rounded-2xl p-4 shadow-xl shadow-green-900/10 flex items-start gap-4">
               <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center shrink-0">
                 <BellRing className="w-4 h-4 text-green-600 dark:text-green-400" />
               </div>
               <div>
                 <p className="text-xs font-bold text-gray-400 dark:text-green-100/50 uppercase tracking-wider mb-1">O Sussurro da Floresta</p>
                 <p className="text-sm font-medium text-gray-800 dark:text-green-100 leading-tight">
                   {mockWhispers[whisperIdx]}
                 </p>
               </div>
             </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
