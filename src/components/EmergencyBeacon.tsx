import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Flame, ShieldAlert, Crosshair, Droplets, MapPin, Users, Coins, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { cn } from '../lib/utils';

interface BeaconAlert {
  id: string;
  type: 'fire' | 'logging' | 'drought' | 'default';
  location: string;
  title: string;
  description: string;
  urgency: 'critical' | 'high' | 'medium';
  sosNeeded: number;
  sosRaised: number;
  timeRemaining: string;
  guardiansDeployed: number;
}

const INITIAL_ALERTS: BeaconAlert[] = [
  {
    id: 'b1',
    type: 'fire',
    location: 'Sul do Amazonas, BR',
    title: 'Foco de Incêndio Não-Autorizado',
    description: 'Imagens de satélite detectaram expansão rápida de chamas na zona de amortecimento. Equipes de brigadistas Paiter Suruí precisam de suprimentos urgentes.',
    urgency: 'critical',
    sosNeeded: 50000,
    sosRaised: 32500,
    timeRemaining: '12h 45m',
    guardiansDeployed: 124
  },
  {
    id: 'b2',
    type: 'logging',
    location: 'Reserva Maya, GT',
    title: 'Ameaça de Extração Ilegal',
    description: 'Alertas acústicos indicam movimentação de maquinário pesado perto da fronteira protegida da Nação SOS. Financiamento necessário para patrulha de drones.',
    urgency: 'high',
    sosNeeded: 25000,
    sosRaised: 4200,
    timeRemaining: '2d 10h',
    guardiansDeployed: 45
  },
  {
    id: 'b3',
    type: 'drought',
    location: 'Corredor Seco, HN',
    title: 'Seca Severa nas Mudas Novas',
    description: 'O Viveiro Comunitário reporta necessidade de caminhões-pipa de emergência para manter 10.000 raízes da última safra vivas.',
    urgency: 'medium',
    sosNeeded: 10000,
    sosRaised: 8500,
    timeRemaining: '4d 02h',
    guardiansDeployed: 12
  }
];

export function EmergencyBeacon() {
  const [alerts, setAlerts] = useState<BeaconAlert[]>(INITIAL_ALERTS);
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [fundAmount, setFundAmount] = useState('');
  const [isFunding, setIsFunding] = useState(false);

  const getUrgencyColor = (urgency: BeaconAlert['urgency']) => {
    switch (urgency) {
      case 'critical': return 'text-red-500 border-red-500/50 bg-red-500/10';
      case 'high': return 'text-orange-500 border-orange-500/50 bg-orange-500/10';
      case 'medium': return 'text-yellow-500 border-yellow-500/50 bg-yellow-500/10';
    }
  };

  const getIcon = (type: BeaconAlert['type']) => {
    switch (type) {
      case 'fire': return <Flame className="w-5 h-5 text-red-500" />;
      case 'logging': return <Crosshair className="w-5 h-5 text-orange-500" />;
      case 'drought': return <Droplets className="w-5 h-5 text-yellow-500" />;
      default: return <ShieldAlert className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleFund = (id: string) => {
    if (!fundAmount || isNaN(Number(fundAmount))) return;
    setIsFunding(true);
    setTimeout(() => {
       setAlerts(prev => prev.map(a => 
         a.id === id ? { ...a, sosRaised: a.sosRaised + Number(fundAmount), guardiansDeployed: a.guardiansDeployed + 1 } : a
       ));
       setIsFunding(false);
       setFundAmount('');
       setSelectedAlert(null);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full relative z-20 max-w-5xl mx-auto"
    >
       <div className="bg-red-950/20 dark:bg-[#140b0b]/60 backdrop-blur-xl rounded-3xl p-8 border border-red-900/30 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 relative z-10">
             <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-950/50 border border-red-500/30 flex items-center justify-center relative">
                   <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
                   <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-red-50 tracking-tight">O Farol de Emergência</h3>
                  <p className="text-gray-500 dark:text-red-200/60 mt-1 flex items-center gap-2 text-sm">
                    Ação Rápida Descentralizada <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Ao Vivo
                  </p>
                </div>
             </div>

             <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-4 text-right flex items-center gap-6">
                <div>
                   <p className="text-[10px] text-red-300/50 uppercase tracking-widest mb-1">Tesouraria de Crise</p>
                   <p className="text-2xl font-mono text-red-400 font-bold">142.500 <span className="text-sm">SOS</span></p>
                </div>
                <div className="w-px h-10 bg-red-900/50" />
                <div>
                   <p className="text-[10px] text-red-300/50 uppercase tracking-widest mb-1">Alertas Ativos</p>
                   <p className="text-2xl font-mono text-red-50 font-bold">{alerts.length}</p>
                </div>
             </div>
          </div>

          {/* Grid de Alertas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
             {alerts.map(alert => {
               const progress = Math.min(100, Math.round((alert.sosRaised / alert.sosNeeded) * 100));
               
               return (
                 <motion.div 
                   key={alert.id}
                   whileHover={{ y: -5 }}
                   className={cn(
                     "bg-black/40 border p-6 rounded-2xl flex flex-col justify-between transition-colors",
                     selectedAlert === alert.id ? "border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.15)]" : "border-red-900/20 hover:border-red-500/30"
                   )}
                 >
                    <div>
                       <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-black/50 border border-red-900/40">
                               {getIcon(alert.type)}
                            </div>
                            <div>
                               <span className={cn("text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full", getUrgencyColor(alert.urgency))}>
                                 {alert.urgency}
                               </span>
                            </div>
                          </div>
                          <div className="text-right">
                             <div className="text-[10px] text-red-200/50 font-mono flex items-center gap-1 justify-end">
                               {alert.timeRemaining} restantes
                             </div>
                          </div>
                       </div>

                       <h4 className="text-lg font-bold text-red-50 mb-2 leading-tight">{alert.title}</h4>
                       <div className="flex items-center gap-1.5 text-xs text-red-200/60 mb-4 font-mono">
                          <MapPin className="w-3 h-3" /> {alert.location}
                       </div>
                       
                       <p className="text-sm text-gray-400 line-clamp-3 mb-6 relative">
                         {alert.description}
                       </p>
                    </div>

                    <div>
                       <div className="flex justify-between text-xs mb-2">
                          <span className="text-red-200/50">Recursos: {progress}%</span>
                          <span className="text-red-400 font-mono font-bold">{alert.sosRaised.toLocaleString()} / {alert.sosNeeded.toLocaleString()} SOS</span>
                       </div>
                       <div className="w-full h-2 bg-red-950 rounded-full overflow-hidden mb-6">
                          <div 
                            className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full relative"
                            style={{ width: `${progress}%` }}
                          >
                             <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                          </div>
                       </div>

                       {selectedAlert === alert.id ? (
                          <div className="bg-red-950/40 p-4 rounded-xl border border-red-900/50">
                             <input 
                               type="number"
                               value={fundAmount}
                               onChange={e => setFundAmount(e.target.value)}
                               placeholder="Quantos SOS enviar?"
                               className="w-full bg-black/50 border border-red-900/50 rounded-lg px-3 py-2 text-red-50 text-sm mb-3 outline-none focus:border-red-500 transition-colors"
                             />
                             <div className="flex gap-2">
                                <button 
                                  onClick={() => setSelectedAlert(null)}
                                  className="px-3 py-2 text-xs text-red-300 hover:text-red-100"
                                >
                                  Cancelar
                                </button>
                                <button 
                                  onClick={() => handleFund(alert.id)}
                                  disabled={isFunding || !fundAmount}
                                  className="flex-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                                >
                                  {isFunding ? (
                                    <span className="animate-pulse">Enviando Tropas...</span>
                                  ) : (
                                    <>Enviar Apoio <ArrowRight className="w-3 h-3" /></>
                                  )}
                                </button>
                             </div>
                          </div>
                       ) : (
                          <div className="flex items-center justify-between gap-4">
                             <div className="flex items-center gap-1.5 text-xs text-red-200/50 font-mono">
                                <Users className="w-3.5 h-3.5" />
                                {alert.guardiansDeployed}
                             </div>
                             <button 
                               onClick={() => setSelectedAlert(alert.id)}
                               className="flex-1 bg-red-900/30 hover:bg-red-800/40 text-red-100 text-xs font-bold py-2.5 rounded-xl border border-red-500/30 transition-colors flex items-center justify-center gap-2"
                             >
                                <HeartHandshake className="w-3.5 h-3.5" /> Apoiar Missão
                             </button>
                          </div>
                       )}
                    </div>
                 </motion.div>
               );
             })}
          </div>

          <div className="mt-8 relative z-10 flex items-center justify-center gap-4 bg-black/40 border border-red-900/30 p-4 rounded-2xl max-w-2xl mx-auto">
             <ShieldCheck className="w-6 h-6 text-red-500" />
             <p className="text-xs text-gray-400">
               O <span className="text-red-400 font-bold">Farol de Emergência</span> utiliza multi-assinatura (Multisig). Os fundos doados são liberados apenas após a equipe em campo comprovar a intervenção (Proof-of-Action) na blockchain via oráculos de satélite e auditoria da comunidade.
             </p>
          </div>
       </div>
    </motion.div>
  );
}
