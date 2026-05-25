import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trees, GraduationCap, Coins, ShieldCheck, Shield, Activity, Leaf, Eye, Vote, Sparkles, CheckCircle2, ChevronRight, Fingerprint, Lock, Sprout, MapPin, Calendar, Atom, FileText, Image as ImageIcon, Droplets, RefreshCcw, ArrowUpDown, Wind, BellRing, Target, Medal, Award, Flame, Crown, Network, Flower, Share2, Globe, CloudRain, Sun, Moon, Link, X, ShieldAlert, BookOpen, Landmark } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { cn } from '../lib/utils';
import { GaiaFloatChat } from './GaiaFloatChat';
import { EmergencyBeacon } from './EmergencyBeacon';
import { GuardianJourney } from './GuardianJourney';
import { MercadoRegen } from './MercadoRegen';
import { PulsoVital } from './PulsoVital';
import { DiarioTesouro } from './DiarioTesouro';
import { PortalCrepusculo } from './PortalCrepusculo';
import { ConselhoTerra } from './ConselhoTerra';
import { AtlasRestauracao } from './AtlasRestauracao';
import { GuardianPassport } from './GuardianPassport';
import { EcoQuestBoard } from './EcoQuestBoard';
import { FrequenciaGuardia } from './FrequenciaGuardia';
import { KnowledgeTree } from './KnowledgeTree';
import { GuildHall } from './GuildHall';

interface GuardianDashboardProps {
  walletAddress: string;
  biome?: 'amazon' | 'reef' | 'savanna';
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

export function GuardianDashboard({ walletAddress, biome = 'amazon' }: GuardianDashboardProps) {
  const guardianName = "Eder Tagliari";
  const currentRank = "Guardião Primordial";
  const [activeTab, setActiveTab] = useState<'overview' | 'eye' | 'dao' | 'viveiro' | 'mural' | 'fonte' | 'circulo' | 'codice' | 'arvore' | 'raiz' | 'mercado' | 'ponte' | 'ninho' | 'espelho' | 'trilha' | 'altar' | 'bosque' | 'propagador' | 'farol' | 'jornada' | 'pulso' | 'diario' | 'crepusculo' | 'conselho' | 'atlas' | 'passaporte' | 'chamados' | 'frequencia' | 'academia' | 'guildas'>('guildas');
  const [gaiaMood, setGaiaMood] = useState<'dew' | 'rain' | 'twilight'>('dew');
  const [votingProposal, setVotingProposal] = useState<number | null>(null);
  const [algoAmount, setAlgoAmount] = useState('');
  const [stakingAmount, setStakingAmount] = useState(100);
  const [stakingSeasons, setStakingSeasons] = useState(1);
  const [proposalText, setProposalText] = useState('');
  const [isProposing, setIsProposing] = useState(false);
  const [hasProposed, setHasProposed] = useState(false);
  const [mapTarget, setMapTarget] = useState<'amazon' | 'congo' | 'se-asia' | null>(null);
  
  // Altar e Bosque states
  const [altarNectar, setAltarNectar] = useState(65); // 0 to 100
  const [isHarvestingAltar, setIsHarvestingAltar] = useState(false);
  const [bosqueNodes, setBosqueNodes] = useState(Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    address: `0x${Math.random().toString(16).slice(2, 6).toUpperCase()}...${Math.random().toString(16).slice(2, 6).toUpperCase()}`,
    level: Math.floor(Math.random() * 10) + 1,
    size: Math.random() * 0.8 + 0.4
  })));
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  
  // Coro da Floresta / Fireflies State
  const [fireflies, setFireflies] = useState<{id: number, text: string, xPos: number}[]>([]);
  const [coroInput, setCoroInput] = useState('');
  const [fireflyIdCounter, setFireflyIdCounter] = useState(0);

  const [gaiaVoiceOpen, setGaiaVoiceOpen] = useState(false);

  const handleSendFirefly = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coroInput.trim()) return;
    const newFirefly = { id: fireflyIdCounter, text: coroInput, xPos: Math.random() * 80 + 10 };
    setFireflies(prev => [...prev, newFirefly]);
    setFireflyIdCounter(prev => prev + 1);
    setCoroInput('');
    // Remove after 15 seconds
    setTimeout(() => {
       setFireflies(prev => prev.filter(f => f.id !== newFirefly.id));
    }, 15000);
  };

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
  const [isMigratingVortex, setIsMigratingVortex] = useState(false);
  const [ninhoIndex, setNinhoIndex] = useState(0);

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
    <section className={cn("py-24 px-6 min-h-screen transition-colors relative overflow-hidden duration-1000", biome === 'amazon' ? 'bg-gray-50 dark:bg-[#060c08]' : biome === 'reef' ? 'bg-cyan-50 dark:bg-[#031015]' : 'bg-amber-50 dark:bg-[#140b03]')}>
      
      {/* Biome Overlay Transition */}
      <AnimatePresence>
         {biome === 'reef' && (
            <motion.div key="reef" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1.5}} className="absolute inset-0 pointer-events-none z-[1] bg-cyan-900/10 mix-blend-color" />
         )}
         {biome === 'savanna' && (
            <motion.div key="savanna" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1.5}} className="absolute inset-0 pointer-events-none z-[1] bg-orange-900/10 mix-blend-color" />
         )}
      </AnimatePresence>

      {/* Gaia Mood Overlay */}
      <AnimatePresence>
         {gaiaMood === 'dew' && (
            <motion.div key="dew" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1.5}} className="absolute inset-0 pointer-events-none z-[1] bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent mix-blend-overlay" />
         )}
         {gaiaMood === 'rain' && (
            <motion.div key="rain" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1.5}} className="absolute inset-0 pointer-events-none z-[1] bg-blue-900/10 mix-blend-overlay overflow-hidden">
               {/* Rain effect */}
               {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={`rain-${i}`}
                    className="absolute w-[1px] bg-gradient-to-b from-transparent via-blue-400/40 to-transparent"
                    style={{
                      left: `${Math.random() * 100}%`,
                      height: `${Math.random() * 100 + 50}px`,
                      top: `-${Math.random() * 20 + 20}%`
                    }}
                    animate={{
                      top: '120%'
                    }}
                    transition={{
                      duration: Math.random() * 0.8 + 0.6,
                      repeat: Infinity,
                      ease: "linear",
                      delay: Math.random() * 2
                    }}
                  />
               ))}
            </motion.div>
         )}
         {gaiaMood === 'twilight' && (
            <motion.div key="twilight" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1.5}} className="absolute inset-0 pointer-events-none z-[1] bg-gradient-to-br from-orange-500/10 via-purple-500/10 to-transparent mix-blend-overlay" />
         )}
      </AnimatePresence>
      <div className="absolute inset-0 z-[2] pointer-events-none"><SporesParticles /></div>
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

        {/* Navigation Tabs - PORTAL CONECTADO AO PLANETA */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setActiveTab('mercado')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'mercado' 
                 ? "bg-green-600 text-white shadow-md shadow-green-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-green-900/40 hover:bg-green-900/20"
            )}
          >
            <Sparkles className="w-4 h-4" /> Mercado Regen
          </button>
          <button 
            onClick={() => setActiveTab('altar')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'altar' 
                 ? "bg-green-600 text-white shadow-md shadow-green-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-green-900/40 hover:bg-green-900/20"
            )}
          >
            <Droplets className="w-4 h-4" /> O Altar
          </button>
          <button 
            onClick={() => setActiveTab('dao')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'dao' 
                 ? "bg-green-600 text-white shadow-md shadow-green-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-green-900/40 hover:bg-green-900/20"
            )}
          >
            <Vote className="w-4 h-4" /> O Canto dos Anciões
          </button>
          <button 
            onClick={() => setActiveTab('bosque')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'bosque' 
                 ? "bg-green-600 text-white shadow-md shadow-green-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-green-900/40 hover:bg-green-900/20"
            )}
          >
            <Network className="w-4 h-4" /> Constelações
          </button>
          <button 
            onClick={() => setActiveTab('propagador')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'propagador' 
                 ? "bg-green-600 text-white shadow-md shadow-green-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-green-900/40 hover:bg-green-900/20"
            )}
          >
            <Share2 className="w-4 h-4" /> Propagador
          </button>
          <button 
            onClick={() => setActiveTab('farol')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'farol' 
                 ? "bg-red-600 text-white shadow-md shadow-red-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-red-900/40 hover:bg-red-900/20"
            )}
          >
            <ShieldAlert className="w-4 h-4" /> O Farol
          </button>
          <button 
            onClick={() => setActiveTab('jornada')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'jornada' 
                 ? "bg-green-600 text-white shadow-md shadow-green-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-green-900/40 hover:bg-green-900/20"
            )}
          >
            <CheckCircle2 className="w-4 h-4" /> Jornada
          </button>
          <button 
            onClick={() => setActiveTab('pulso')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'pulso' 
                 ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-blue-900/40 hover:bg-blue-900/20"
            )}
          >
            <Activity className="w-4 h-4" /> Pulso Vital
          </button>
          <button 
            onClick={() => setActiveTab('diario')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'diario' 
                 ? "bg-amber-600 text-white shadow-md shadow-amber-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-amber-900/40 hover:bg-amber-900/20"
            )}
          >
            <BookOpen className="w-4 h-4" /> Diário e Tesouro
          </button>
          <button 
            onClick={() => setActiveTab('crepusculo')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'crepusculo' 
                 ? "bg-purple-600 text-white shadow-md shadow-purple-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-purple-900/40 hover:bg-purple-900/20"
            )}
          >
            <Moon className="w-4 h-4" /> Portal do Crepúsculo
          </button>
          <button 
            onClick={() => setActiveTab('conselho')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'conselho' 
                 ? "bg-yellow-600 text-white shadow-md shadow-yellow-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-yellow-900/40 hover:bg-yellow-900/20"
            )}
          >
            <Landmark className="w-4 h-4" /> Conselho da Terra
          </button>
          <button 
            onClick={() => setActiveTab('atlas')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'atlas' 
                 ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-cyan-900/40 hover:bg-cyan-900/20"
            )}
          >
            <Globe className="w-4 h-4" /> Atlas da Restauração
          </button>
          <button 
            onClick={() => setActiveTab('chamados')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'chamados' 
                 ? "bg-red-600 text-white shadow-md shadow-red-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-red-900/40 hover:bg-red-900/20"
            )}
          >
            <Target className="w-4 h-4" /> Chamado da Terra
          </button>
          <button 
            onClick={() => setActiveTab('frequencia')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'frequencia' 
                 ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-cyan-900/40 hover:bg-cyan-900/20"
            )}
          >
            <Network className="w-4 h-4" /> Frequência Guardiã
          </button>
          <button 
            onClick={() => setActiveTab('academia')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'academia' 
                 ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-indigo-900/40 hover:bg-indigo-900/20"
            )}
          >
            <GraduationCap className="w-4 h-4" /> Academia Regen
          </button>
          <button 
            onClick={() => setActiveTab('guildas')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'guildas' 
                 ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-emerald-900/40 hover:bg-emerald-900/20"
            )}
          >
            <Shield className="w-4 h-4" /> Alianças (Guildas)
          </button>
          <button 
            onClick={() => setActiveTab('passaporte')}
            className={cn(
               "px-5 py-2.5 rounded-full font-medium text-sm transition-all whitespace-nowrap flex items-center gap-2",
               activeTab === 'passaporte' 
                 ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                 : "bg-[#0b1410] text-gray-400 border border-blue-900/40 hover:bg-blue-900/20"
            )}
          >
            <Shield className="w-4 h-4" /> Passaporte Holográfico
          </button>
        </div>

        {/* Gaia Mood Switcher */}
        <div className="flex justify-start mb-6 -mt-2 relative z-20">
          <div className="bg-white/80 dark:bg-[#111f18]/80 backdrop-blur-md rounded-full p-1.5 flex gap-1 border border-gray-200 dark:border-green-900/40 shadow-sm">
             <button
               onClick={() => setGaiaMood('dew')}
               title="Manhã de Orvalho"
               className={cn("p-2 rounded-full transition-all", gaiaMood === 'dew' ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400" : "text-gray-400 hover:text-emerald-500")}
             >
               <Sun className="w-4 h-4" />
             </button>
             <button
               onClick={() => setGaiaMood('rain')}
               title="Chuva Noturna"
               className={cn("p-2 rounded-full transition-all", gaiaMood === 'rain' ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400" : "text-gray-400 hover:text-blue-500")}
             >
               <CloudRain className="w-4 h-4" />
             </button>
             <button
               onClick={() => setGaiaMood('twilight')}
               title="Crepúsculo Solar"
               className={cn("p-2 rounded-full transition-all", gaiaMood === 'twilight' ? "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400" : "text-gray-400 hover:text-amber-500")}
             >
               <Moon className="w-4 h-4" />
             </button>
          </div>
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

        {/* O Eco-Mapa Interativo */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mt-8 bg-white/80 dark:bg-[#111f18]/60 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-green-900/30 relative overflow-hidden flex flex-col">
           <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
               <Globe className="w-5 h-5" />
             </div>
             <div>
               <h3 className="text-xl font-bold text-gray-900 dark:text-blue-50 tracking-tight">O Eco-Mapa Interativo</h3>
               <p className="text-sm text-gray-500 dark:text-blue-100/60 mt-1">O Pulsar dos Biomas: Aloque energia vital nos pulmões do planeta.</p>
             </div>
           </div>

           <div className="relative w-full h-[400px] border border-gray-100 dark:border-blue-900/30 rounded-2xl overflow-hidden bg-[#0b1410] flex items-center justify-center">
             <div className="absolute inset-0 z-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain opacity-30 dark:opacity-20 mix-blend-screen overflow-hidden" />
             
             {/* Map Nodes */}
             {[
               { id: 'amazon', top: '65%', left: '30%', name: 'Amazônia', flora: '85%', water: '92%', o2: '12k', color: 'bg-emerald-500', shadow: 'shadow-emerald-500' },
               { id: 'congo', top: '65%', left: '52%', name: 'Congo', flora: '78%', water: '88%', o2: '9.5k', color: 'bg-green-500', shadow: 'shadow-green-500' },
               { id: 'se-asia', top: '55%', left: '75%', name: 'Sudeste Asiático', flora: '62%', water: '75%', o2: '7.2k', color: 'bg-teal-500', shadow: 'shadow-teal-500' }
             ].map((node) => (
                <div 
                  key={node.id} 
                  className="absolute"
                  style={{ top: node.top, left: node.left, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={() => setMapTarget(node.id as any)}
                  onMouseLeave={() => setMapTarget(null)}
                >
                  <div className={cn("w-4 h-4 rounded-full cursor-pointer relative z-20 shadow-[0_0_15px_rgba(34,197,94,0.8)] border-2 border-[#0b1410]", node.color)}>
                     <div className={cn("absolute inset-0 rounded-full animate-ping opacity-60", node.color)} />
                  </div>
                  
                  <AnimatePresence>
                    {mapTarget === node.id && (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.8, y: 10 }}
                         animate={{ opacity: 1, scale: 1, y: 0 }}
                         exit={{ opacity: 0, scale: 0.8, y: 10 }}
                         transition={{ duration: 0.2 }}
                         className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-white/20 dark:bg-black/60 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl z-30 pointer-events-none"
                       >
                         <h4 className="text-white font-bold text-lg mb-3 tracking-tight flex items-center gap-2">
                           <MapPin className="w-4 h-4 text-emerald-400" /> {node.name}
                         </h4>
                         <div className="space-y-3">
                           <div>
                             <div className="flex justify-between text-xs text-white/80 font-bold mb-1">
                               <span>Resgate de Flora Ativo</span>
                               <span className="text-emerald-400">{node.flora}</span>
                             </div>
                             <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                               <div className="h-full bg-emerald-400" style={{ width: node.flora }} />
                             </div>
                           </div>
                           <div>
                             <div className="flex justify-between text-xs text-white/80 font-bold mb-1">
                               <span>Umidade Restaurada</span>
                               <span className="text-blue-400">{node.water}</span>
                             </div>
                             <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                               <div className="h-full bg-blue-400" style={{ width: node.water }} />
                             </div>
                           </div>
                           <div className="pt-2 mt-2 border-t border-white/10 flex justify-between items-center text-xs font-mono">
                             <span className="text-white/60">Geração de O2</span>
                             <span className="text-emerald-300 font-bold">{node.o2} SOS/dia</span>
                           </div>
                         </div>
                       </motion.div>
                    )}
                  </AnimatePresence>
                </div>
             ))}
           </div>
        </motion.div>

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
               <div className="bg-white/80 dark:bg-[#080d0a]/80 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-emerald-900/30 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
                  <div className="flex items-center justify-center gap-3 mb-10 relative z-10 text-center">
                     <div>
                       <h3 className="text-3xl font-bold text-gray-900 dark:text-emerald-50 tracking-tight flex items-center justify-center gap-3">
                         <Vote className="w-8 h-8 text-emerald-400" /> O Canto dos Anciões
                       </h3>
                       <p className="text-gray-500 dark:text-emerald-100/60 mt-2">Canalize sua energia vital (Tokens) nas esferas de deliberação. O equilíbrio do ecossistema responde ao peso da sua vontade.</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {daoProposals.map((proposal, idx) => (
                      <div key={proposal.id} className="bg-white/50 dark:bg-[#0b1410] border border-gray-100 dark:border-emerald-900/40 rounded-3xl p-6 relative flex flex-col hover:border-emerald-500/30 transition-all shadow-xl">
                         <div className="mb-8 text-center flex-1">
                            <span className="inline-block bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Tensão Ativa</span>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-emerald-50 leading-snug">{proposal.title}</h4>
                         </div>

                         {/* Esferas de Energia */}
                         <div className="relative flex justify-between items-end h-40">
                            {/* Esfera A Favor (Luz Esmeralda) */}
                            <div className="flex flex-col items-center group relative cursor-pointer w-1/2">
                               <p className="text-xs font-bold text-emerald-400 mb-2">{proposal.optionA} ({proposal.votesA}%)</p>
                               <div className="relative flex justify-center items-center h-24 w-full">
                                  <motion.button 
                                     onClick={(e) => {
                                        const btn = e.currentTarget;
                                        setVoteSuccess(proposal.id);
                                        for(let i=0; i<40; i++) {
                                           const p = document.createElement('div');
                                           p.className = `fixed w-2 h-2 rounded-full pointer-events-none z-50 bg-emerald-400`;
                                           const rect = btn.getBoundingClientRect();
                                           p.style.left = `${e.clientX}px`;
                                           p.style.top = `${e.clientY}px`;
                                           p.style.boxShadow = '0 0 15px #34d399';
                                           document.body.appendChild(p);
                                           const tx = (rect.left + rect.width / 2) - e.clientX + (Math.random() * 40 - 20);
                                           const ty = (rect.top + rect.height / 2) - e.clientY + (Math.random() * 40 - 20);
                                           p.animate([
                                              { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                                              { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
                                           ], { duration: 600 + Math.random() * 400, easing: 'ease-in' }).onfinish = () => p.remove();
                                        }
                                     }}
                                     className="w-16 h-16 rounded-full bg-emerald-500 relative z-10 hover:w-20 hover:h-20 transition-all duration-300"
                                     style={{ scale: 0.8 + (proposal.votesA / 100) }}
                                     animate={{ boxShadow: ['0 0 20px rgba(52,211,153,0.4)', '0 0 50px rgba(52,211,153,0.8)', '0 0 20px rgba(52,211,153,0.4)'] }}
                                     transition={{ duration: 3, repeat: Infinity }}
                                  >
                                     <div className="absolute inset-0 bg-white/20 rounded-full blur-[2px]" />
                                     <div className="absolute inset-0 bg-emerald-300/30 rounded-full animate-ping opacity-50" />
                                  </motion.button>
                               </div>
                               <button className="mt-4 px-4 py-1.5 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/30 rounded-full text-emerald-300 text-xs font-bold transition-colors">
                                  Canalizar Luz
                               </button>
                            </div>

                            <div className="absolute left-1/2 bottom-8 -translate-x-1/2 h-16 w-px bg-gradient-to-b from-transparent via-emerald-900/50 to-transparent" />

                            {/* Esfera Contra (Sombra Terrena) */}
                            <div className="flex flex-col items-center group relative cursor-pointer w-1/2">
                               <p className="text-xs font-bold text-amber-500 mb-2">{proposal.optionB} ({proposal.votesB}%)</p>
                               <div className="relative flex justify-center items-center h-24 w-full">
                                  <motion.button 
                                     onClick={(e) => {
                                        const btn = e.currentTarget;
                                        setVoteSuccess(proposal.id);
                                        for(let i=0; i<40; i++) {
                                           const p = document.createElement('div');
                                           p.className = `fixed w-2 h-2 rounded-full pointer-events-none z-50 bg-amber-500`;
                                           const rect = btn.getBoundingClientRect();
                                           p.style.left = `${e.clientX}px`;
                                           p.style.top = `${e.clientY}px`;
                                           p.style.boxShadow = '0 0 15px #f59e0b';
                                           document.body.appendChild(p);
                                           const tx = (rect.left + rect.width / 2) - e.clientX + (Math.random() * 40 - 20);
                                           const ty = (rect.top + rect.height / 2) - e.clientY + (Math.random() * 40 - 20);
                                           p.animate([
                                              { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                                              { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
                                           ], { duration: 600 + Math.random() * 400, easing: 'ease-in' }).onfinish = () => p.remove();
                                        }
                                     }}
                                     className="w-16 h-16 rounded-full bg-amber-600 relative z-10 hover:w-20 hover:h-20 transition-all duration-300"
                                     style={{ scale: 0.8 + (proposal.votesB / 100) }}
                                     animate={{ boxShadow: ['0 0 20px rgba(245,158,11,0.2)', '0 0 40px rgba(245,158,11,0.5)', '0 0 20px rgba(245,158,11,0.2)'] }}
                                     transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                                  >
                                     <div className="absolute inset-0 bg-black/40 rounded-full blur-[2px] mix-blend-overlay" />
                                     <div className="absolute inset-0 bg-amber-400/20 rounded-full animate-pulse opacity-40" />
                                  </motion.button>
                               </div>
                               <button className="mt-4 px-4 py-1.5 bg-amber-900/20 hover:bg-amber-900/40 border border-amber-700/30 rounded-full text-amber-500 text-xs font-bold transition-colors">
                                  Canalizar Terreno
                               </button>
                            </div>
                         </div>
                      </div>
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
                  <span className="text-xs font-bold text-green-600/50 dark:text-green-400/50 uppercase tracking-wider flex items-center gap-1 cursor-not-allowed">
                    Ver contrato na Explorer <ChevronRight className="w-3 h-3" />
                    <span className="text-[9px] bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded ml-1">Em breve</span>
                  </span>
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

          {activeTab === 'raiz' && (
            <motion.div
              key="raiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white/80 dark:bg-[#111f18]/60 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-green-900/30 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-10 relative z-10">
                   <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
                     <Activity className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="text-2xl font-bold text-gray-900 dark:text-emerald-50 tracking-tight">A Raiz da Verdade</h3>
                     <p className="text-sm text-gray-500 dark:text-emerald-100/60 mt-1">Histórico vivo de transações gravadas permanentemente em Algorand.</p>
                   </div>
                </div>

                <div className="relative pl-8 pb-8">
                   {/* Central glowing line */}
                   <div className="absolute left-[39px] top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-emerald-500 via-emerald-700 to-transparent"></div>

                   {/* Transactions Nodes */}
                   <div className="space-y-10 relative z-10">
                     {[
                        { date: 'Agora Mesmo', title: 'Energia Canalizada', amount: '+150 O2', type: 'reward', desc: 'Resgate de Flora Ativa no Farol da Esperança', isNew: true },
                        { date: 'Há 2 dias', title: 'Semente Ancestral #01', amount: '-200 SOS', type: 'nft', desc: 'Mint da muda Hevea brasiliensis', hash: 'TXN_A8F9...3B12', isNew: false },
                        { date: 'Há 5 dias', title: 'Voto no Conselho', amount: '-10 SOS', type: 'dao', desc: 'Apoio à Expansão para o Sudeste Asiático', hash: 'TXN_C4D2...9E71', isNew: false },
                        { date: 'Há 1 semana', title: 'Swap Efetuado', amount: '+1,500 SOS', type: 'swap', desc: 'Conversão de 1 ALGO para Energia Vital', hash: 'TXN_F1A2...4C98', isNew: false },
                     ].map((txn, idx) => (
                        <motion.div 
                           key={idx}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: idx * 0.15 + 0.3 }}
                           className="relative"
                        >
                           {/* The Node */}
                           <div className={cn(
                             "absolute -left-[45px] top-2 w-6 h-6 rounded-full border-4 border-[#111f18] transition-all cursor-pointer group flex items-center justify-center",
                             txn.isNew ? "bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)]" : "bg-emerald-800"
                           )}>
                             {txn.isNew && <div className="absolute w-full h-full bg-emerald-400 rounded-full animate-ping opacity-50" />}
                             <div className="w-1 h-1 bg-[#111f18] rounded-full"></div>
                           </div>

                           {/* Content Card */}
                           <div className={cn(
                             "bg-[#0b1410]/80 backdrop-blur-md rounded-2xl p-5 border transition-all hover:border-emerald-500/50 group relative overflow-hidden",
                             txn.isNew ? "border-emerald-500/40" : "border-emerald-900/30"
                           )}>
                              {txn.isNew && <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none" />}
                              
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                                <div className="flex items-center gap-3">
                                  <h4 className={cn("text-lg font-bold tracking-tight", txn.isNew ? "text-emerald-50" : "text-emerald-100/80")}>{txn.title}</h4>
                                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{txn.date}</span>
                                </div>
                                <div className={cn("font-mono font-bold text-lg", txn.amount.startsWith('+') ? "text-green-400" : "text-amber-500")}>
                                  {txn.amount}
                                </div>
                              </div>
                              <p className="text-sm text-emerald-100/60 mb-3">{txn.desc}</p>
                              
                              {txn.hash && (
                                <motion.div 
                                  className="mt-3 cursor-pointer overflow-hidden rounded-xl border border-amber-500/20 bg-amber-900/10 flex items-center justify-between p-1 pr-2"
                                  whileHover={{ scale: 1.01 }}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="bg-amber-500/20 text-amber-500 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                      <Lock className="w-3 h-3" /> Hash
                                    </div>
                                    <span className="text-amber-200/80 font-mono text-sm">{txn.hash}</span>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-amber-500/50" />
                                </motion.div>
                              )}
                           </div>
                        </motion.div>
                     ))}
                   </div>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === 'mercado' && (
             <MercadoRegen />
          )}

          {activeTab === 'ponte' && (
            <motion.div
              key="ponte"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
               <div className="bg-white/80 dark:bg-[#111f18]/60 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-green-900/30 relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#0b1410] to-[#0b1410] z-[-1] pointer-events-none" />
                  
                  <div className="text-center mb-10 relative z-10 w-full max-w-lg mx-auto mt-4">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-emerald-50 tracking-tight flex items-center justify-center gap-3">
                      <Link className="w-8 h-8 text-emerald-400" /> A Ponte Cósmica
                    </h3>
                    <p className="text-gray-500 dark:text-emerald-100/60 mt-2">Atravesse o véu das redes. Traga sua energia de outras cadeias para fortalecer o eixo de SOSPlanet.</p>
                  </div>

                  {/* VORTEX */}
                  <div className="relative w-64 h-64 flex items-center justify-center mb-12">
                     <motion.div 
                       className="absolute w-full h-full rounded-full border-t-2 border-emerald-500/50"
                       animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
                       transition={{ duration: 3, repeat: Infinity, ease: "linear" }} 
                     />
                     <motion.div 
                       className="absolute w-4/5 h-4/5 rounded-full border-b-2 border-green-400/50"
                       animate={{ rotate: -360, scale: [1, 1.2, 1] }} 
                       transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
                     />
                     <motion.div 
                       className="absolute w-3/5 h-3/5 rounded-full bg-gradient-to-tr from-emerald-500/30 to-teal-500/30 blur-md"
                       animate={{ rotate: 360, scale: [1, 0.8, 1] }} 
                       transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
                     />
                     <div className="w-16 h-16 bg-black rounded-full shadow-[0_0_50px_rgba(52,211,153,1)] z-10 flex items-center justify-center relative overflow-hidden">
                        <AnimatePresence>
                           {isMigratingVortex && (
                              <motion.div 
                                className="absolute inset-0 bg-emerald-400 mix-blend-screen"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                              />
                           )}
                        </AnimatePresence>
                     </div>
                     
                     <AnimatePresence>
                       {isMigratingVortex && (
                          <div className="absolute inset-0 pointer-events-none">
                             {[...Array(12)].map((_, i) => (
                               <motion.div
                                 key={`vortex-p-${i}`}
                                 className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]"
                                 initial={{ 
                                   top: `${Math.random() * 100}%`, 
                                   left: `${Math.random() * 100}%`, 
                                   opacity: 0,
                                   scale: 0.5
                                 }}
                                 animate={{ 
                                   top: '50%',
                                   left: '50%',
                                   opacity: [0, 1, 0],
                                   scale: [0.5, 1.5, 0]
                                 }}
                                 transition={{ 
                                   duration: 1.5, 
                                   ease: "circIn",
                                   delay: Math.random() * 0.5
                                 }}
                               />
                             ))}
                          </div>
                       )}
                     </AnimatePresence>
                  </div>

                  <div className="flex bg-[#0b1410] border border-emerald-900/50 p-2 rounded-2xl gap-2 w-full max-w-sm mb-8 relative z-10">
                     <select className="bg-transparent text-emerald-100 font-medium py-3 px-4 border-none outline-none w-1/3 text-center appearance-none cursor-pointer">
                        <option>ETH</option>
                        <option>SOL</option>
                        <option>MATIC</option>
                     </select>
                     <div className="w-px bg-emerald-900/50" />
                     <input type="text" placeholder="0.0" className="bg-transparent flex-1 text-right text-emerald-50 font-mono font-bold text-lg outline-none pr-4" />
                  </div>

                  <button 
                    onClick={() => {
                       setIsMigratingVortex(true);
                       setTimeout(() => setIsMigratingVortex(false), 2000);
                    }}
                    disabled={isMigratingVortex}
                    className="relative group bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg px-8 py-4 rounded-full transition-all overflow-hidden z-10 shadow-[0_0_30px_rgba(5,150,105,0.4)] hover:shadow-[0_0_50px_rgba(5,150,105,0.6)]"
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                     {isMigratingVortex ? 'Transmutando...' : 'Migrar Moedas'}
                  </button>
               </div>
            </motion.div>
          )}

          {activeTab === 'ninho' && (
            <motion.div
              key="ninho"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
               <div className="bg-white/80 dark:bg-[#111f18]/60 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-green-900/30 overflow-hidden relative min-h-[500px]">
                  <div className="text-center mb-12 relative z-10">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-emerald-50 tracking-tight flex items-center justify-center gap-3">
                      <Sprout className="w-8 h-8 text-emerald-400" /> O Ninho da Renovação
                    </h3>
                    <p className="text-gray-500 dark:text-emerald-100/60 mt-2">Incubadora Descentralizada. Regue as sementes que transformarão o amanhã.</p>
                  </div>

                  {/* Seed Carousel */}
                  <div className="relative h-80 flex items-center justify-center py-10 perspective-[1000px] pointer-events-none mt-16">
                     <div className="absolute w-full flex justify-center pointer-events-auto h-full items-center">
                        {[
                          { title: 'Drones Semeadores', author: '@EcoNerd', desc: 'Flotilha automatizada de semeadura em encostas de difícil acesso no cerrado.', goal: '50k SOS' },
                          { title: 'Filtros Solares', author: '@AquaViva', desc: 'Purificação acessível para 5 comunidades ribeirinhas.', goal: '30k SOS' },
                          { title: 'Painéis Vivos', author: '@BioHack', desc: 'Paredes cobertas de musgo modificado para absorver 10x mais CO2.', goal: '80k SOS' }
                        ].map((seed, idx) => {
                           const offset = idx - ninhoIndex;
                           const isActive = offset === 0;
                           const xPos = offset * 250;
                           const scale = isActive ? 1.1 : 0.8;
                           const zPos = isActive ? 0 : -200;
                           const opacity = isActive ? 1 : 0.4;

                           return (
                             <motion.div 
                               key={idx}
                               animate={{ x: xPos, scale, z: zPos, opacity, rotateY: offset * -15 }}
                               transition={{ type: "spring", stiffness: 200, damping: 20 }}
                               className="absolute w-72 h-[260px] bg-[#0A100D]/90 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-6 shadow-2xl cursor-pointer flex flex-col"
                               style={{ transformStyle: 'preserve-3d' }}
                               onClick={() => setNinhoIndex(idx)}
                             >
                                <div className="w-12 h-12 bg-emerald-900/40 rounded-full flex items-center justify-center mb-4 border border-emerald-500/50 text-emerald-400">
                                  <Leaf className="w-6 h-6" />
                                </div>
                                <h4 className="text-lg font-bold text-emerald-50 mb-1">{seed.title}</h4>
                                <span className="text-xs text-emerald-400 font-mono mb-4 block">{seed.author}</span>
                                <p className="text-sm text-emerald-100/60 leading-tight mb-6 flex-1 overflow-hidden">{seed.desc}</p>
                                <div className="flex justify-between items-end border-t border-emerald-900/50 pt-4 mt-auto">
                                  <div>
                                    <span className="text-[10px] uppercase tracking-widest text-emerald-500 block mb-1">Meta</span>
                                    <span className="font-mono text-emerald-50 font-bold">{seed.goal}</span>
                                  </div>
                                  <button className={cn(
                                    "px-4 py-2 font-bold transition-all border rounded-xl",
                                    isActive ? "bg-emerald-500 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-110 -translate-y-1" : "bg-transparent text-emerald-500 border-emerald-500/30 scale-90 opacity-0"
                                  )}>
                                    Regar
                                  </button>
                                </div>
                             </motion.div>
                           )
                        })}
                     </div>
                  </div>
                  
                  {/* Prev/Next overlay clicks */}
                  <div className="absolute inset-y-0 left-0 w-1/4 z-10 cursor-pointer" onClick={() => setNinhoIndex(prev => Math.max(0, prev - 1))} />
                  <div className="absolute inset-y-0 right-0 w-1/4 z-10 cursor-pointer" onClick={() => setNinhoIndex(prev => Math.min(2, prev + 1))} />
               </div>
            </motion.div>
          )}

          {activeTab === 'espelho' && (
            <motion.div
              key="espelho"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
               <div className="bg-white/80 dark:bg-[#07130c]/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 dark:border-emerald-900/30 overflow-hidden relative min-h-[500px]">
                  <div className="text-center mb-16 relative z-10">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-emerald-50 tracking-tight flex items-center justify-center gap-3">
                      <Droplets className="w-8 h-8 text-blue-400" /> O Espelho d'Água
                    </h3>
                    <p className="text-gray-500 dark:text-blue-100/60 mt-2">Transparência vital. Observe o fluxo da energia nutrindo todo o ecossistema.</p>
                  </div>

                  <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center mt-10">
                     {/* Fonte Central */}
                     <motion.div 
                       className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-b from-blue-400 to-emerald-400 flex items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.4)] z-20"
                       animate={{ boxShadow: ['0 0 20px rgba(56,189,248,0.4)', '0 0 60px rgba(56,189,248,0.8)', '0 0 20px rgba(56,189,248,0.4)'] }}
                       transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                     >
                       <div className="w-20 h-20 rounded-full bg-[#07130c] flex items-center justify-center border-4 border-blue-500/30">
                         <span className="text-white font-bold text-sm text-center leading-tight">Tesouraria<br/>SOS</span>
                       </div>
                     </motion.div>

                     {/* SVG Curves */}
                     <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="none">
                        {/* Reflorestamento (50%) */}
                        <path id="path-reflorest" d="M400,80 C400,200 150,200 150,300" fill="none" stroke="url(#blue-green)" strokeWidth="6" className="opacity-30" />
                        <motion.path 
                           d="M400,80 C400,200 150,200 150,300" fill="none" stroke="url(#blue-green)" strokeWidth="8" strokeLinecap="round" strokeDasharray="20 40"
                           animate={{ strokeDashoffset: -100 }}
                           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        
                        {/* Liquidez (30%) */}
                        <path id="path-liq" d="M400,80 C400,200 400,200 400,300" fill="none" stroke="url(#blue-blue)" strokeWidth="4" className="opacity-30" />
                        <motion.path 
                           d="M400,80 C400,200 400,200 400,300" fill="none" stroke="url(#blue-blue)" strokeWidth="6" strokeLinecap="round" strokeDasharray="15 30"
                           animate={{ strokeDashoffset: -100 }}
                           transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        />
                        
                        {/* Inovação (20%) */}
                        <path id="path-inov" d="M400,80 C400,200 650,200 650,300" fill="none" stroke="url(#blue-purple)" strokeWidth="3" className="opacity-30" />
                        <motion.path 
                           d="M400,80 C400,200 650,200 650,300" fill="none" stroke="url(#blue-purple)" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 20"
                           animate={{ strokeDashoffset: -100 }}
                           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />

                        <defs>
                          <linearGradient id="blue-green" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#34d399" />
                          </linearGradient>
                          <linearGradient id="blue-blue" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#60a5fa" />
                          </linearGradient>
                          <linearGradient id="blue-purple" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#a78bfa" />
                          </linearGradient>
                        </defs>
                     </svg>

                     {/* Destinations */}
                     <div className="absolute top-[300px] left-[150px] -translate-x-1/2 -translate-y-1/2 group">
                        <div className="bg-emerald-900/60 border border-emerald-500/50 backdrop-blur-md rounded-2xl p-4 w-40 text-center shadow-lg transition-transform group-hover:scale-110 relative z-20">
                           <Trees className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                           <h5 className="text-emerald-50 font-bold mb-1">Reflorestamento</h5>
                           <p className="text-emerald-400 font-mono text-sm">50%</p>
                           <div className="absolute inset-0 bg-emerald-400/0 group-hover:bg-emerald-400/10 transition-colors rounded-2xl pointer-events-none" />
                        </div>
                     </div>

                     <div className="absolute top-[300px] left-[400px] -translate-x-1/2 -translate-y-1/2 group">
                        <div className="bg-blue-900/60 border border-blue-500/50 backdrop-blur-md rounded-2xl p-4 w-40 text-center shadow-lg transition-transform group-hover:scale-110 relative z-20">
                           <RefreshCcw className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                           <h5 className="text-blue-50 font-bold mb-1">Liquidez SOS</h5>
                           <p className="text-blue-400 font-mono text-sm">30%</p>
                           <div className="absolute inset-0 bg-blue-400/0 group-hover:bg-blue-400/10 transition-colors rounded-2xl pointer-events-none" />
                        </div>
                     </div>

                     <div className="absolute top-[300px] left-[650px] -translate-x-1/2 -translate-y-1/2 group">
                        <div className="bg-purple-900/60 border border-purple-500/50 backdrop-blur-md rounded-2xl p-4 w-40 text-center shadow-lg transition-transform group-hover:scale-110 relative z-20">
                           <Atom className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                           <h5 className="text-purple-50 font-bold mb-1">Inovação Beta</h5>
                           <p className="text-purple-400 font-mono text-sm">20%</p>
                           <div className="absolute inset-0 bg-purple-400/0 group-hover:bg-purple-400/10 transition-colors rounded-2xl pointer-events-none" />
                        </div>
                     </div>

                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'trilha' && (
            <motion.div
              key="trilha"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
               <div className="bg-[#0b1410] rounded-3xl p-8 border border-emerald-900/40 relative overflow-hidden flex flex-col items-center">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
                  
                  <div className="text-center mb-10 relative z-10 w-full max-w-lg mx-auto">
                    <h3 className="text-3xl font-bold text-emerald-50 tracking-tight flex items-center justify-center gap-3">
                      <MapPin className="w-8 h-8 text-emerald-400" /> A Trilha do Despertar
                    </h3>
                    <p className="text-emerald-100/60 mt-2">Sua jornada de evolução ecológica. Cada passo enraíza o seu legado e a sua alma.</p>
                  </div>

                  <div className="relative w-full max-w-sm mx-auto h-[600px] flex flex-col items-center justify-between py-10">
                     {/* Conexão Vertical (Tronco/Rail) */}
                     <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-1.5 bg-gray-800 rounded-full" />
                     <div className="absolute top-10 bottom-1/2 left-1/2 -translate-x-1/2 w-2 bg-gradient-to-t from-emerald-600 via-emerald-400 to-emerald-300 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
                     
                     {[
                        { level: 5, id: 'anciao', title: 'Ancião de Gaia', icon: Crown, status: 'locked', desc: 'Conquista a governança máxima e aura onipresente.' },
                        { level: 4, id: 'arvore', title: 'Árvore Sábia', icon: Trees, status: 'locked', desc: 'Produz sementes nativas e abriga projetos massivos.' },
                        { level: 3, id: 'tronco', title: 'Tronco Jovem', icon: Activity, status: 'unlocked', desc: 'Estabelece propostas no Conselho de Guardiões.' },
                        { level: 2, id: 'broto', title: 'Broto Desperto', icon: Sprout, status: 'unlocked', desc: 'Primeiras raízes cravadas no solo. Voto simples.' },
                        { level: 1, id: 'semente', title: 'Semente Dormida', icon: Leaf, status: 'unlocked', desc: 'Chegada ao ecossistema. Primeira respiração digital.' },
                     ].map((node, i) => (
                        <div key={node.id} className="relative z-10 flex flex-col items-center group w-full">
                           <div className={cn(
                             "w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all cursor-pointer relative",
                             node.status === 'unlocked' 
                               ? "bg-emerald-900 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.5)] group-hover:scale-110" 
                               : "bg-gray-900 border-gray-700 text-gray-600"
                           )}>
                             {node.status === 'unlocked' && <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />}
                             <node.icon className="w-6 h-6" />
                           </div>
                           
                           {/* Holographic Tooltip */}
                           <div className="absolute left-[calc(50%+2.5rem)] top-1/2 -translate-y-1/2 ml-4 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              <div className={cn(
                                "p-3 rounded-xl backdrop-blur-md border shadow-xl", 
                                node.status === 'unlocked' ? "bg-emerald-900/80 border-emerald-500/50" : "bg-gray-900/80 border-gray-700/50"
                              )}>
                                 <h5 className={cn("font-bold text-sm mb-1", node.status === 'unlocked' ? "text-emerald-50" : "text-gray-400")}>{node.title}</h5>
                                 <p className={cn("text-xs", node.status === 'unlocked' ? "text-emerald-200/80" : "text-gray-500")}>{node.desc}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'altar' && (
            <motion.div
              key="altar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white/80 dark:bg-[#0b1410]/80 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-emerald-900/30 overflow-hidden relative min-h-[500px] flex flex-col items-center justify-center">
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-[#0b1410] to-[#0b1410] pointer-events-none" />
                 
                 <div className="text-center z-10 mb-10">
                   <h3 className="text-3xl font-bold text-gray-900 dark:text-emerald-50 tracking-tight flex items-center justify-center gap-3">
                     <Flame className="w-8 h-8 text-emerald-400" /> O Altar de Transmutação
                   </h3>
                   <p className="text-gray-500 dark:text-emerald-100/60 mt-2 max-w-lg mx-auto">Sua energia vital (SOS) está enraizada no ecossistema. Observe a Seiva da Floresta se acumular com o tempo e colha os frutos da sua resiliência.</p>
                 </div>

                 <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center">
                    {/* Glowing drops falling */}
                    <div className="relative w-full h-32 flex justify-center overflow-hidden">
                       {Array.from({ length: 5 }).map((_, i) => (
                          <motion.div
                             key={i}
                             className="absolute w-1.5 h-4 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                             initial={{ y: -50, opacity: 0 }}
                             animate={{ y: 200, opacity: [0, 1, 0] }}
                             transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() * 2, ease: 'easeIn' }}
                             style={{ left: `calc(50% + ${Math.random() * 40 - 20}px)` }}
                          />
                       ))}
                    </div>

                    {/* Lótus / Frasco de Cristal em SVG */}
                    <div className="relative w-48 h-48 mt-[-20px]">
                       <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                          {/* Lótus Base */}
                          <path d="M50 90 Q 75 90 85 60 Q 65 80 50 85 Q 35 80 15 60 Q 25 90 50 90 Z" fill="rgba(6,78,59,0.5)" stroke="#34d399" strokeWidth="1" />
                          <path d="M50 85 Q 70 70 80 40 Q 60 60 50 75 Q 40 60 20 40 Q 30 70 50 85 Z" fill="rgba(6,78,59,0.7)" stroke="#34d399" strokeWidth="1" />
                          <path d="M50 75 Q 65 50 70 20 Q 55 45 50 60 Q 45 45 30 20 Q 35 50 50 75 Z" fill="rgba(6,78,59,0.9)" stroke="#34d399" strokeWidth="1" />
                          
                          {/* Liquido Brilhante (Néctar/Seiva) */}
                          <g style={{ transform: `scaleY(${altarNectar / 100})`, transformOrigin: 'bottom', transition: 'transform 1s ease-out' }}>
                             <path d="M50 80 Q 60 60 70 30 Q 55 45 50 55 Q 45 45 30 30 Q 40 60 50 80 Z" fill="url(#nectarGrad)" className="mix-blend-screen" />
                          </g>

                          <defs>
                            <linearGradient id="nectarGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.8" />
                              <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
                            </linearGradient>
                          </defs>
                       </svg>
                       <div className="absolute inset-x-0 bottom-10 flex justify-center pointer-events-none">
                          <span className="text-emerald-300 font-mono font-bold text-lg drop-shadow-md">{altarNectar.toFixed(2)} SOS</span>
                       </div>
                    </div>

                    <button 
                       onClick={(e) => {
                          if(altarNectar === 0) return;
                          setIsHarvestingAltar(true);
                          const btn = e.currentTarget;
                          for(let i=0; i<40; i++) {
                             const p = document.createElement('div');
                             p.className = `fixed w-2 h-2 rounded-full pointer-events-none z-[100] bg-emerald-300`;
                             const rect = btn.getBoundingClientRect();
                             p.style.left = `${rect.left + rect.width / 2}px`;
                             p.style.top = `${rect.top}px`;
                             p.style.boxShadow = '0 0 15px #34d399';
                             document.body.appendChild(p);
                             const angle = Math.random() * Math.PI * 2;
                             const velocity = Math.random() * 100 + 50;
                             const tx = Math.cos(angle) * velocity;
                             const ty = Math.sin(angle) * velocity - 100;
                             p.animate([
                                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
                             ], { duration: 800 + Math.random() * 400, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' }).onfinish = () => p.remove();
                          }
                          setTimeout(() => {
                             setAltarNectar(0);
                             setIsHarvestingAltar(false);
                          }, 1000);
                       }}
                       disabled={isHarvestingAltar || altarNectar === 0}
                       className="mt-8 px-8 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-emerald-950 font-bold rounded-full transition-all shadow-[0_0_30px_rgba(52,211,153,0.3)] hover:shadow-[0_0_50px_rgba(52,211,153,0.6)]"
                    >
                       {isHarvestingAltar ? 'Transmutando...' : 'Colher Seiva (Claim)'}
                    </button>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'bosque' && (
            <motion.div
              key="bosque"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-[#050806] rounded-3xl overflow-hidden relative min-h-[600px] border border-emerald-900/20">
                 {/* Estrelas de fundo */}
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-screen" />
                 
                 <div className="absolute top-8 left-8 z-20">
                   <h3 className="text-2xl font-bold text-emerald-50 tracking-tight flex items-center justify-start gap-3">
                     <Network className="w-6 h-6 text-emerald-400" /> Bosque das Constelações
                   </h3>
                   <p className="text-emerald-100/50 mt-1 max-w-sm text-sm">O micélio global de heróis da plataforma. Passe o cursor para ver os Guardiões sincronizados.</p>
                 </div>

                 {/* Espaço de Constelações Parallax Mapeadas */}
                 <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <motion.div 
                       className="relative w-full h-full pointer-events-auto"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 1 }}
                    >
                       {/* Fios de micélio conectando nós aleatórios */}
                       <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                          {bosqueNodes.slice(0, 20).map((node, i) => {
                             const nextNode = bosqueNodes[(i + 1) % 20];
                             return (
                               <line 
                                 key={`edge-${i}`}
                                 x1={`${node.x}%`} 
                                 y1={`${node.y}%`} 
                                 x2={`${nextNode.x}%`} 
                                 y2={`${nextNode.y}%`} 
                                 stroke="#34d399" 
                                 strokeWidth="0.5"
                                 strokeDasharray="4 4"
                               />
                             )
                          })}
                       </svg>

                       {/* Nós */}
                       {bosqueNodes.map(node => (
                          <motion.div
                             key={node.id}
                             onMouseEnter={() => setHoveredNode(node.id)}
                             onMouseLeave={() => setHoveredNode(null)}
                             className="absolute rounded-full cursor-url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 16 16%22><circle cx=%228%22 cy=%228%22 r=%224%22 fill=%22%2310b981%22/></svg>') 8 8, auto pointer-events-auto"
                             style={{
                                left: `${node.x}%`,
                                top: `${node.y}%`,
                                width: `${node.size * 10}px`,
                                height: `${node.size * 10}px`,
                             }}
                             animate={{
                                y: ['-2px', '2px', '-2px'],
                                boxShadow: hoveredNode === node.id ? '0 0 20px #34d399' : '0 0 5px #047857'
                             }}
                             transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
                          >
                             <div className={cn("w-full h-full rounded-full bg-emerald-500", hoveredNode === node.id ? "opacity-100" : "opacity-60")} />
                             
                             {/* Tooltip on Hover */}
                             <AnimatePresence>
                               {hoveredNode === node.id && (
                                  <motion.div 
                                     initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                     animate={{ opacity: 1, y: 0, scale: 1 }}
                                     exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                     className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-emerald-950/90 border border-emerald-500/30 p-2 rounded-lg shadow-xl backdrop-blur-sm z-50 pointer-events-none"
                                  >
                                     <p className="text-emerald-50 text-xs font-mono font-bold mb-1">{node.address}</p>
                                     <div className="flex items-center gap-1">
                                        <Shield className="w-3 h-3 text-emerald-400" />
                                        <span className="text-[10px] text-emerald-200 uppercase tracking-widest">Lvl {node.level}</span>
                                     </div>
                                  </motion.div>
                               )}
                             </AnimatePresence>
                          </motion.div>
                       ))}
                    </motion.div>
                 </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {activeTab === 'propagador' && (
           <motion.div 
             key="propagador"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             transition={{ duration: 0.3 }}
             className="w-full relative z-20"
           >
              <div className="bg-white/80 dark:bg-[#080d0a]/80 backdrop-blur-md rounded-3xl p-8 border border-gray-100 dark:border-emerald-900/30 overflow-hidden relative">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
                 
                 <div className="flex flex-col mb-10 relative z-10 text-center">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-emerald-50 tracking-tight flex items-center justify-center gap-3">
                      <Share2 className="w-8 h-8 text-emerald-400" /> Propagador de Consciência
                    </h3>
                    <p className="text-gray-500 dark:text-emerald-100/60 mt-2">Gere seu Eco-Card único, comprove seu impacto on-chain e traga novos Guardiões para a nação SOS.</p>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6 relative z-10">
                       <div className="bg-emerald-900/20 border border-emerald-900/40 p-6 rounded-2xl relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
                             <Fingerprint className="w-24 h-24" />
                          </div>
                          <h4 className="text-xl font-bold text-emerald-50 mb-2 flex items-center gap-2">
                            A Sua Assinatura Digital
                          </h4>
                          <p className="text-sm text-emerald-100/70 mb-6">Ao Mintar SOS e realizar ações climáticas de reflorestamento, sua identidade gera um selo verde verificável pela Algorand.</p>
                          
                          <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all">
                             <RefreshCcw className="w-5 h-5" /> Gerar Meu Eco-Card
                          </button>
                       </div>

                       <div className="bg-black/30 border border-gray-800 p-6 rounded-2xl relative z-10">
                         <h4 className="font-bold text-gray-300 mb-4 text-sm uppercase tracking-widest">Ações para Compartilhar</h4>
                         <div className="space-y-3">
                            <div className="bg-gray-900/50 hover:bg-gray-800 p-4 rounded-xl border border-gray-800 cursor-pointer transition-colors flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-emerald-900/40 border border-emerald-800 flex items-center justify-center text-emerald-400">
                                     <Vote className="w-5 h-5" />
                                  </div>
                                  <div>
                                     <h5 className="font-bold text-gray-200">Última Votação</h5>
                                     <p className="text-xs text-gray-500">Expansão da Amazônia</p>
                                  </div>
                               </div>
                               <Share2 className="w-5 h-5 text-gray-500" />
                            </div>

                            <div className="bg-gray-900/50 hover:bg-gray-800 p-4 rounded-xl border border-gray-800 cursor-pointer transition-colors flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-blue-900/40 border border-blue-800 flex items-center justify-center text-blue-400">
                                     <Coins className="w-5 h-5" />
                                  </div>
                                  <div>
                                     <h5 className="font-bold text-gray-200">Aporte de Tesouraria</h5>
                                     <p className="text-xs text-gray-500">+1.500 SOS Mintados</p>
                                  </div>
                               </div>
                               <Share2 className="w-5 h-5 text-gray-500" />
                            </div>
                         </div>
                       </div>
                    </div>

                    {/* Eco-Card Preview generator */}
                    <div className="flex items-center justify-center relative py-6">
                       <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
                       
                       <div className="w-full max-w-sm aspect-[4/5] bg-gradient-to-br from-[#0f1d17] to-[#040806] rounded-3xl border border-emerald-500/30 shadow-2xl p-6 relative overflow-hidden flex flex-col justify-between group">
                          {/* Inner glowing elements */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#0b1410]/0 to-[#0b1410]/0 pointer-events-none"></div>

                          {/* Visual Logo / ID */}
                          <div className="relative z-10 flex justify-between items-start">
                             <div>
                                <h3 className="font-black text-2xl tracking-tighter text-white">SOSPlanet</h3>
                                <p className="text-[10px] text-emerald-400 font-mono tracking-widest mt-1 uppercase">Guardião Oficial</p>
                             </div>
                             <div className="w-12 h-12 bg-emerald-900/40 rounded-full border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                               <MapPin className="w-6 h-6" />
                             </div>
                          </div>

                          {/* User Data */}
                          <div className="relative z-10 my-auto text-center space-y-4">
                             <div className="w-24 h-24 mx-auto bg-emerald-950 border-2 border-emerald-500/30 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                               <Crown className="w-10 h-10 text-emerald-400" />
                             </div>
                             <div>
                               <h2 className="text-xl font-bold text-emerald-50 font-mono">{guardianName}</h2>
                               <p className="text-gray-400 text-xs tracking-widest uppercase mt-1">{currentRank}</p>
                             </div>
                             
                             <div className="grid grid-cols-2 gap-2 mt-4 text-left">
                                <div className="bg-black/40 border border-gray-800 p-3 rounded-xl backdrop-blur-sm">
                                   <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">O2 Gerado</p>
                                   <p className="text-emerald-400 font-bold font-mono">1.240 <span className="text-xs">kg</span></p>
                                </div>
                                <div className="bg-black/40 border border-gray-800 p-3 rounded-xl backdrop-blur-sm">
                                   <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Árvores</p>
                                   <p className="text-white font-bold font-mono">15 <span className="text-xs">seed</span></p>
                                </div>
                             </div>
                          </div>

                          {/* Signature / Web3 Proof */}
                          <div className="relative z-10 pt-4 border-t border-emerald-900/30 flex justify-between items-center text-[10px] font-mono text-gray-500">
                             <span>Proof-of-Regeneration</span>
                             <span className="text-emerald-500/50">Tx: 0x5a...8f9c</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </motion.div>
        )}

        {activeTab === 'farol' && (
           <EmergencyBeacon />
        )}

        {activeTab === 'jornada' && (
           <GuardianJourney />
        )}

        {activeTab === 'pulso' && (
           <PulsoVital />
        )}

        {activeTab === 'diario' && (
           <DiarioTesouro />
        )}

        {activeTab === 'crepusculo' && (
           <PortalCrepusculo />
        )}

        {activeTab === 'conselho' && (
           <ConselhoTerra />
        )}

        {activeTab === 'atlas' && (
           <AtlasRestauracao />
        )}

        {activeTab === 'passaporte' && (
           <GuardianPassport />
        )}

        {activeTab === 'chamados' && (
           <EcoQuestBoard />
        )}

        {activeTab === 'frequencia' && (
           <FrequenciaGuardia />
        )}

        {activeTab === 'academia' && (
           <KnowledgeTree />
        )}

        {activeTab === 'guildas' && (
           <GuildHall />
        )}

        {/* A Voz de Gaia (Orquestrador) */}
        <GaiaFloatChat isOpen={gaiaVoiceOpen} setIsOpen={setGaiaVoiceOpen} />

        {/* Fireflies (O Coro da Floresta) */}
        <AnimatePresence>
          {fireflies.map(ff => (
             <motion.div
               key={ff.id}
               initial={{ opacity: 0, top: '100vh', left: `${ff.xPos}vw`, scale: 0.5 }}
               animate={{ 
                 opacity: [0, 1, 1, 0], 
                 top: '-10vh',
                 left: [
                   `${ff.xPos}vw`, 
                   `${ff.xPos + 5}vw`, 
                   `${ff.xPos - 5}vw`, 
                   `${ff.xPos + 2}vw`
                 ],
               }}
               exit={{ opacity: 0, scale: 0 }}
               transition={{ duration: 12, ease: "easeInOut" }}
               className="fixed z-50 pointer-events-none flex items-center gap-2"
             >
                <div className="px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-100/90 text-sm font-medium shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                  {ff.text}
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-300 animate-ping shadow-[0_0_10px_#6ee7b7]" />
             </motion.div>
          ))}
        </AnimatePresence>

        {/* Coro da Floresta Input */}
        <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-40 max-w-xs">
           <form onSubmit={handleSendFirefly} className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-500 dark:text-emerald-100/50 uppercase tracking-widest pl-2">O Coro da Floresta</label>
              <div className="flex bg-white/90 dark:bg-[#111f18]/90 backdrop-blur-md border border-gray-200 dark:border-green-900/50 rounded-full p-1.5 shadow-xl shadow-green-900/10">
                 <input 
                   type="text" 
                   value={coroInput}
                   onChange={e => setCoroInput(e.target.value)}
                   placeholder="Sopre sua intenção..."
                   maxLength={60}
                   className="bg-transparent border-none outline-none text-sm px-3 text-gray-800 dark:text-emerald-50 placeholder-gray-400 dark:placeholder-emerald-800/50 w-full min-w-[200px]"
                 />
                 <button 
                   type="submit"
                   disabled={!coroInput.trim()}
                   className="w-8 h-8 shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900/40 hover:bg-emerald-200 dark:hover:bg-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-colors disabled:opacity-50"
                 >
                   <Wind className="w-4 h-4" />
                 </button>
              </div>
           </form>
        </div>

      </div>
    </section>
  );
}
