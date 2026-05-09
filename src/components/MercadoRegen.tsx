import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, TreePine, Sparkles, Gem, ShieldCheck, Cpu, Droplets, Leaf, Fingerprint, Coins, Package, ArrowRight, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

// Tipos Mockados para Database
interface MarketItem {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: 'ECO-XP' | 'SOS';
  type: 'bioativo' | 'nft' | 'powerup' | 'equipamento';
  rarity: 'comum' | 'raro' | 'epico' | 'lendario';
  stock: number;
  image: string;
}

interface InventoryItem {
  id: string;
  itemId: string;
  acquiredAt: string;
  quantity: number;
}

const MOCK_ITEMS: MarketItem[] = [
  {
    id: 'm1',
    title: 'Sementes de Mogno Ancestral',
    description: 'Um pacote de sementes rastreadas 100% on-chain. Plante em sua área para gerar rendimento ecológico.',
    price: 3500,
    currency: 'ECO-XP',
    type: 'bioativo',
    rarity: 'raro',
    stock: 142,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm2',
    title: 'Fragmento de Proteção: Guardião',
    description: 'Adiciona um multiplicador de 1.5x em todas as recompensas de patrulha nos próximos 7 dias.',
    price: 7500,
    currency: 'ECO-XP',
    type: 'powerup',
    rarity: 'epico',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm3',
    title: 'NFT: A Última Árvore de Sangue',
    description: 'Arte generativa respaldada em dados de satélite da reserva Xingu. Destrava status na DAO.',
    price: 500,
    currency: 'SOS',
    type: 'nft',
    rarity: 'lendario',
    stock: 5,
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073e0f?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'm4',
    title: 'Drone de Análise NDVI (Aluguel)',
    description: 'Aluguel de varredura por drone para validar seu bioma e emitir Proof-of-Action de altíssima precisão.',
    price: 15000,
    currency: 'ECO-XP',
    type: 'equipamento',
    rarity: 'epico',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1508614589041-ebd9f5ac742f?auto=format&fit=crop&q=80&w=600',
  },
];

const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'inv1', itemId: 'm1', acquiredAt: '2026-05-08T10:00:00Z', quantity: 2 },
  { id: 'inv2', itemId: 'm2', acquiredAt: '2026-05-01T15:30:00Z', quantity: 1 }
];

export function MercadoRegen() {
  const [activeTab, setActiveTab] = useState<'store' | 'inventory'>('store');
  const [balanceXP, setBalanceXP] = useState(14250);
  const [balanceSOS, setBalanceSOS] = useState(120);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  
  const handlePurchase = (item: MarketItem) => {
    setPurchasing(item.id);
    
    // Simulate transaction delay
    setTimeout(() => {
      setPurchasing(null);
      if (item.currency === 'ECO-XP') {
        setBalanceXP(prev => prev - item.price);
      } else {
        setBalanceSOS(prev => prev - item.price);
      }
    }, 1500);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'comum': return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
      case 'raro': return 'text-blue-400 border-blue-500/30 bg-blue-500/10 shadow-[0_0_10px_rgba(59,130,246,0.3)]';
      case 'epico': return 'text-purple-400 border-purple-500/30 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.4)] relative font-bold';
      case 'lendario': return 'text-amber-400 border-amber-500/40 bg-amber-500/10 shadow-[0_0_20px_rgba(251,191,36,0.5)] relative font-bold animate-pulse-slow';
      default: return 'text-emerald-400';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* HUD Superior - Saldo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#111f18]/80 backdrop-blur-md rounded-3xl p-6 border border-emerald-900/40 relative overflow-hidden flex items-center shadow-xl">
           <div className="absolute top-0 right-0 p-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 to-transparent rounded-full pointer-events-none blur-3xl" />
           <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center w-full">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-900 p-[1px] shadow-[0_0_20px_rgba(16,185,129,0.2)] shrink-0">
                 <div className="w-full h-full bg-[#0a120e] rounded-2xl flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-emerald-400" />
                 </div>
              </div>
              <div className="text-center md:text-left flex-1">
                 <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
                   O Mercado Regen <Sparkles className="w-5 h-5 text-emerald-400" />
                 </h2>
                 <p className="text-emerald-200/60 mt-1">Transforme seu impacto em bioativos, equipamentos e NFTs on-chain.</p>
              </div>
           </div>
        </div>

        <div className="bg-[#0b1410] border border-emerald-900/30 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden shadow-xl">
           <div className="flex justify-between items-center mb-4">
             <span className="text-xs text-emerald-500/70 uppercase tracking-widest font-bold">Suas Carteiras</span>
             <Wallet className="w-4 h-4 text-emerald-600" />
           </div>
           <div className="space-y-3">
              <div className="flex justify-between items-center bg-black/40 px-4 py-3 rounded-xl border border-emerald-900/20">
                 <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-300">ECO-XP</span>
                 </div>
                 <span className="font-mono font-bold text-yellow-400 text-lg">{balanceXP.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center bg-black/40 px-4 py-3 rounded-xl border border-emerald-900/20">
                 <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-medium text-gray-300">SOS Token</span>
                 </div>
                 <span className="font-mono font-bold text-emerald-400 text-lg">{balanceSOS.toLocaleString()}</span>
              </div>
           </div>
        </div>
      </div>

      {/* Navegação Vitrine / Inventário */}
      <div className="flex gap-2">
         <button 
           onClick={() => setActiveTab('store')}
           className={cn("px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2", activeTab === 'store' ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 border border-emerald-500/50" : "bg-[#111f18]/60 text-gray-400 border border-emerald-900/30 hover:text-emerald-300 hover:bg-emerald-900/20")}
         >
           <Gem className="w-4 h-4" /> Vitrine de Aportes
         </button>
         <button 
           onClick={() => setActiveTab('inventory')}
           className={cn("px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2", activeTab === 'inventory' ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 border border-emerald-500/50" : "bg-[#111f18]/60 text-gray-400 border border-emerald-900/30 hover:text-emerald-300 hover:bg-emerald-900/20")}
         >
           <Package className="w-4 h-4" /> Meu Inventário Criptografado
         </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'store' && (
          <motion.div key="store" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_ITEMS.map((item) => (
              <div key={item.id} className="group bg-[#0b1410] rounded-3xl overflow-hidden border border-emerald-900/30 flex flex-col hover:border-emerald-500/50 transition-colors shadow-lg">
                 <div className="h-48 relative overflow-hidden bg-black/50">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1410] to-transparent opacity-90" />
                    
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                       <span className={cn("text-[10px] uppercase font-black px-3 py-1 rounded-full backdrop-blur-md border", getRarityColor(item.rarity))}>
                         {item.rarity}
                       </span>
                    </div>
                    
                    <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-200/50 bg-black/60 px-2 py-1 rounded-md border border-emerald-900/40 flex items-center gap-1">
                      <Fingerprint className="w-3 h-3" /> Estoque: {item.stock}
                    </div>
                 </div>

                 <div className="p-5 flex-1 flex flex-col relative z-10 bg-gradient-to-b from-transparent to-[#050a08]/50">
                    <div className="mb-4">
                       <h3 className="font-bold text-white text-lg leading-tight mb-2 tracking-tight group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                       <p className="text-sm text-emerald-100/60 leading-relaxed line-clamp-3">{item.description}</p>
                    </div>

                    <div className="mt-auto space-y-4">
                       <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-900/50 to-transparent" />
                       
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            {item.currency === 'ECO-XP' ? (
                              <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30">
                                <Zap className="w-4 h-4 text-yellow-500" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                                <Coins className="w-4 h-4 text-emerald-400" />
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className="text-[10px] text-gray-500 uppercase font-black tracking-wider">Custo</span>
                              <span className={cn("font-bold text-lg font-mono leading-none", item.currency === 'ECO-XP' ? "text-yellow-400" : "text-emerald-400")}>
                                {item.price.toLocaleString()}
                              </span>
                            </div>
                         </div>
                       </div>

                       <button 
                         onClick={() => handlePurchase(item)}
                         disabled={purchasing === item.id || (item.currency === 'ECO-XP' ? balanceXP < item.price : balanceSOS < item.price)}
                         className="w-full relative overflow-hidden rounded-xl bg-emerald-950/50 hover:bg-emerald-900 text-emerald-100 font-bold py-3 transition-all border border-emerald-600/30 disabled:opacity-50 disabled:cursor-not-allowed group/btn hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:hover:shadow-none"
                       >
                         {purchasing === item.id ? (
                           <span className="flex items-center justify-center gap-2">
                             <Cpu className="w-4 h-4 animate-spin text-emerald-400" /> 
                             Processando...
                           </span>
                         ) : (item.currency === 'ECO-XP' ? balanceXP < item.price : balanceSOS < item.price) ? (
                           <span>Saldo Insuficiente</span>
                         ) : (
                           <span className="flex items-center justify-center gap-2 group-hover/btn:gap-3 transition-all">
                             Adquirir <ArrowRight className="w-4 h-4 text-emerald-400" />
                           </span>
                         )}
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                       </button>
                    </div>
                 </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'inventory' && (
          <motion.div key="inventory" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="bg-[#111f18]/40 border border-emerald-900/30 rounded-3xl p-8 overflow-hidden min-h-[400px]">
             {MOCK_INVENTORY.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-64 text-emerald-200/40">
                 <Package className="w-16 h-16 mb-4 opacity-50" />
                 <p>Seu inventário de bioativos está vazio.</p>
                 <button onClick={() => setActiveTab('store')} className="mt-4 text-emerald-400 hover:text-emerald-300 underline font-medium">Explorar Mercado</button>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {MOCK_INVENTORY.map(inv => {
                   const details = MOCK_ITEMS.find(m => m.id === inv.itemId);
                   if (!details) return null;
                   return (
                     <div key={inv.id} className="bg-black/40 border border-emerald-900/40 rounded-2xl p-4 flex gap-4 hover:bg-emerald-900/10 transition-colors">
                        <div className="w-24 h-24 rounded-xl overflow-hidden relative shrink-0 border border-emerald-900/50">
                           <img src={details.image} alt={details.title} className="w-full h-full object-cover opacity-80" />
                           <div className="absolute bottom-0 right-0 bg-black/80 backdrop-blur text-emerald-400 font-mono text-xs font-bold px-2 py-1 rounded-tl-xl border-t border-l border-emerald-900/50">
                              x{inv.quantity}
                           </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                           <span className={cn("text-[8px] uppercase font-black px-2 py-0.5 rounded-full mb-2 self-start", getRarityColor(details.rarity))}>
                             {details.rarity}
                           </span>
                           <h4 className="font-bold text-white leading-tight">{details.title}</h4>
                           <p className="text-xs text-emerald-200/50 font-mono mt-2 flex items-center gap-1">
                             <ShieldCheck className="w-3 h-3 text-emerald-500" />
                             Adquirido: {new Date(inv.acquiredAt).toLocaleDateString()}
                           </p>
                        </div>
                     </div>
                   )
                 })}
               </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Add Wallet icon temporarily
function Wallet(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a8 8 0 0 1-8 8H5a2 2 0 0 1-2-2V4" />
      <path d="M22 12V9a1 1 0 0 0-1-1h-2" />
      <path d="M22 17v-1.5a1.5 1.5 0 0 0-1.5-1.5H19" />
    </svg>
  )
}
