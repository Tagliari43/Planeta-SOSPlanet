import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, TreePine, Leaf, Network, Globe, Sprout, Sparkles, Lock, Unlock, Brain, ArrowUpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

// Definição da Árvore de Conhecimento
interface SkillNode {
  id: string;
  label: string;
  type: 'root' | 'trunk' | 'canopy';
  x: number;
  y: number;
  req: string[];
  icon: React.ElementType;
  description: string;
}

const NODES: SkillNode[] = [
  // Canopy (Copa)
  { id: 'dao', label: 'DAO Avançada', type: 'canopy', x: 20, y: 15, req: ['eco_regen'], icon: Globe, description: 'Governança descentralizada focada no planeta.' },
  { id: 'sensors', label: 'Sensores Oraculares', type: 'canopy', x: 50, y: 10, req: ['botany', 'eco_regen'], icon: Network, description: 'Interação com APIs IoT para dados e biomas em tempo real.' },
  { id: 'p2p', label: 'Arquitetura P2P', type: 'canopy', x: 80, y: 15, req: ['eco_regen'], icon: Brain, description: 'Design de redes ponto a ponto para ressonância global.' },
  
  // Trunk (Tronco)
  { id: 'permaculture', label: 'Permacultura', type: 'trunk', x: 25, y: 45, req: ['ecology'], icon: Sprout, description: 'Sistemas sustentáveis inspirados por ecossistemas naturais.' },
  { id: 'eco_regen', label: 'Economia Regen', type: 'trunk', x: 50, y: 40, req: ['ecology', 'web3'], icon: ArrowUpCircle, description: 'Criação de modelos que curam em vez de extrair.' },
  { id: 'botany', label: 'Botânica', type: 'trunk', x: 75, y: 45, req: ['ecology'], icon: TreePine, description: 'Ciência das plantas, vital para os Eco-Streaks.' },

  // Roots (Raízes)
  { id: 'ecology', label: 'Introd. Ecologia', type: 'root', x: 35, y: 80, req: [], icon: Leaf, description: 'Base biológica e entendimento sistêmico do meio ambiente.' },
  { id: 'web3', label: 'Fundamentos Web3', type: 'root', x: 65, y: 80, req: [], icon: BookOpen, description: 'Carteiras, block explorers, e imutabilidade dos dados.' },
];

const CONNECTIONS = [
  { from: 'ecology', to: 'permaculture' },
  { from: 'ecology', to: 'eco_regen' },
  { from: 'ecology', to: 'botany' },
  { from: 'web3', to: 'eco_regen' },
  { from: 'eco_regen', to: 'dao' },
  { from: 'botany', to: 'sensors' },
  { from: 'eco_regen', to: 'sensors' },
  { from: 'eco_regen', to: 'p2p' },
];

export function KnowledgeTree() {
  const [unlockedNodes, setUnlockedNodes] = useState<string[]>(['ecology', 'web3']);
  const [animatingNode, setAnimatingNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);

  const canUnlock = (node: SkillNode) => {
    return node.req.every(reqId => unlockedNodes.includes(reqId));
  };

  const handleUnlock = (nodeId: string) => {
    if (unlockedNodes.includes(nodeId)) return;
    
    setAnimatingNode(nodeId);
    setTimeout(() => {
      setUnlockedNodes(prev => [...prev, nodeId]);
      setAnimatingNode(null);
    }, 1500); // 1.5s para a animação de partículas
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 max-w-7xl mx-auto pb-10"
    >
      {/* Header - Academia Regen */}
      <div className="bg-[#050614]/90 backdrop-blur-md rounded-3xl p-8 border border-indigo-900/40 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
        <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-600/10 rounded-[100%] blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0a120e] to-[#041a1a] border border-emerald-500/30 flex items-center justify-center relative shadow-[0_0_40px_rgba(16,185,129,0.15)] overflow-hidden shrink-0">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 to-transparent" />
             <Brain className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
              Árvore do Conhecimento
            </h2>
            <p className="text-emerald-200/70 mt-2 max-w-2xl text-lg">
              A Academia Regen unida à Web3. Desbloqueie raízes neurais e eleve os atributos passivos do seu Passaporte Holográfico.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Mapa da Árvore de Habilidades */}
        <div className="lg:col-span-2">
           <div className="bg-[#03060a]/90 backdrop-blur-md border border-indigo-900/40 rounded-3xl p-6 relative overflow-hidden h-[600px] shadow-2xl flex items-center justify-center">
              
              {/* Estilização da Árvore (Background Grid) */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="relative w-full max-w-2xl h-[500px]">
                 {/* Linhas Conectoras */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {CONNECTIONS.map((conn, idx) => {
                       const fromNode = NODES.find(n => n.id === conn.from)!;
                       const toNode = NODES.find(n => n.id === conn.to)!;
                       const isUnlocked = unlockedNodes.includes(fromNode.id) && unlockedNodes.includes(toNode.id);
                       
                       return (
                          <line 
                            key={idx}
                            x1={fromNode.x} y1={fromNode.y}
                            x2={toNode.x} y2={toNode.y}
                            stroke={isUnlocked ? "rgba(16, 185, 129, 0.6)" : "rgba(30, 58, 138, 0.3)"}
                            strokeWidth={isUnlocked ? "0.8" : "0.4"}
                            strokeDasharray={isUnlocked ? "none" : "1,1"}
                            className={cn(isUnlocked ? "transition-colors duration-1000" : "")}
                          />
                       );
                    })}
                 </svg>

                 {/* Rendering Nodes */}
                 {NODES.map((node) => {
                    const isUnlocked = unlockedNodes.includes(node.id);
                    const isAnimating = animatingNode === node.id;
                    const isAvailable = canUnlock(node) && !isUnlocked;
                    
                    const NodeIcon = node.icon;

                    return (
                       <button
                         key={node.id}
                         onClick={() => setSelectedNode(node)}
                         className={cn(
                            "absolute -translate-x-1/2 -translate-y-1/2 transition-all p-3 rounded-2xl z-20 group border-2 flex flex-col items-center gap-2",
                            isUnlocked 
                              ? "bg-emerald-950/60 border-emerald-500/50 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                              : isAvailable
                                ? "bg-indigo-950/60 border-indigo-500/50 hover:border-emerald-500/80 hover:bg-emerald-950/40 cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                                : "bg-[#050b14] border-blue-900/30 opacity-70 cursor-not-allowed grayscale"
                         )}
                         style={{ left: `${node.x}%`, top: `${node.y}%` }}
                       >
                          {/* Animação de Ascensão (Partículas) */}
                          {isAnimating && (
                             <motion.div 
                               className="absolute inset-0 z-0 pointer-events-none"
                             >
                               {[...Array(8)].map((_, i) => (
                                 <motion.div
                                   key={i}
                                   initial={{ y: 0, opacity: 1, scale: 0.5, x: 0 }}
                                   animate={{ 
                                      y: -100 - Math.random() * 50, 
                                      opacity: 0, 
                                      scale: 1.5,
                                      x: (Math.random() - 0.5) * 50
                                   }}
                                   transition={{ duration: 1.5, ease: "easeOut" }}
                                   className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,1)]"
                                 />
                               ))}
                             </motion.div>
                          )}

                          <div className={cn(
                             "w-12 h-12 rounded-xl flex items-center justify-center relative z-10 transition-colors",
                             isUnlocked ? "bg-emerald-900/50" : isAvailable ? "bg-indigo-900/50" : "bg-black/50"
                          )}>
                             <NodeIcon className={cn("w-6 h-6", isUnlocked ? "text-emerald-400" : isAvailable ? "text-indigo-400" : "text-blue-800")} />
                          </div>
                          
                          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-center pointer-events-none min-w-[120px]">
                             <div className={cn("text-xs font-bold whitespace-nowrap", isUnlocked ? "text-emerald-100" : "text-blue-200/50")}>
                                {node.label}
                             </div>
                             <div className="flex items-center justify-center mt-1">
                                {isUnlocked ? (
                                   <Unlock className="w-3 h-3 text-emerald-500" />
                                ) : (
                                   <Lock className="w-3 h-3 text-blue-800" />
                                )}
                             </div>
                          </div>
                       </button>
                    )
                 })}
              </div>
           </div>
        </div>

        {/* Info Lateral da Habilidade Selecionada */}
        <div className="lg:col-span-1 space-y-6">
           <AnimatePresence mode="wait">
             {selectedNode ? (
               <motion.div 
                 key={selectedNode.id}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="space-y-6"
               >
                 <div className="bg-[#060b17]/90 backdrop-blur-xl border border-indigo-900/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-16 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 to-transparent pointer-events-none" />
                    
                    <div className="flex items-center gap-4 mb-6">
                       <div className="w-14 h-14 rounded-2xl bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-center shrink-0">
                          <selectedNode.icon className="w-7 h-7 text-indigo-400" />
                       </div>
                       <div>
                          <h3 className="text-xl font-bold text-white">{selectedNode.label}</h3>
                          <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest border border-indigo-500/30 px-2 py-0.5 rounded-full bg-indigo-900/20">
                             Nível: {selectedNode.type === 'root' ? 'SEMENTE' : selectedNode.type === 'trunk' ? 'TRONCO' : 'COPA'}
                          </span>
                       </div>
                    </div>

                    <p className="text-sm text-indigo-100/70 leading-relaxed mb-6 font-medium">
                       {selectedNode.description}
                    </p>

                    <div className="space-y-4">
                       <div className="bg-black/40 border border-indigo-900/50 rounded-2xl p-4">
                          <div className="text-xs uppercase text-gray-500 font-bold mb-2">Requisitos</div>
                          {selectedNode.req.length === 0 ? (
                             <span className="text-xs text-gray-400 font-mono">Conhecimento Base (Livre)</span>
                          ) : (
                             <div className="flex flex-wrap gap-2">
                                {selectedNode.req.map(rId => {
                                   const reqNode = NODES.find(n => n.id === rId)!;
                                   const isReqMet = unlockedNodes.includes(rId);
                                   return (
                                      <span key={rId} className={cn(
                                         "text-[10px] uppercase font-mono px-2 py-1 rounded border flex items-center gap-1",
                                         isReqMet ? "bg-emerald-900/30 border-emerald-500/30 text-emerald-400" : "bg-red-900/30 border-red-500/30 text-red-400"
                                      )}>
                                         {reqNode.label} {isReqMet ? '✓' : '✗'}
                                      </span>
                                   )
                                })}
                             </div>
                          )}
                       </div>

                       {!unlockedNodes.includes(selectedNode.id) && canUnlock(selectedNode) && (
                          <button 
                            onClick={() => handleUnlock(selectedNode.id)}
                            disabled={animatingNode !== null}
                            className="w-full relative group overflow-hidden bg-gradient-to-r from-emerald-900 to-indigo-900 text-white px-4 py-3 rounded-xl text-sm font-bold border border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                             <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                             <Sparkles className="w-5 h-5 text-yellow-400" />
                             Despertar Conhecimento
                          </button>
                       )}

                       {unlockedNodes.includes(selectedNode.id) && (
                          <div className="w-full text-center py-3 text-sm font-bold text-emerald-400 border border-emerald-500/30 rounded-xl bg-emerald-900/20 flex justify-center items-center gap-2">
                             <Unlock className="w-4 h-4" /> Sabedoria Adquirida
                          </div>
                       )}

                       {!unlockedNodes.includes(selectedNode.id) && !canUnlock(selectedNode) && (
                          <div className="w-full text-center py-3 text-sm font-bold text-blue-800 border border-blue-900/30 rounded-xl bg-black/40 flex justify-center items-center gap-2">
                             <Lock className="w-4 h-4" /> Requisitos Pendentes
                          </div>
                       )}
                    </div>
                 </div>

                 <div className="bg-gradient-to-br from-yellow-900/20 to-emerald-900/10 border border-yellow-500/20 rounded-3xl p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                       <Sparkles className="w-5 h-5 text-yellow-400" />
                       <h4 className="text-yellow-50 font-bold">Fragmentos de Sabedoria</h4>
                    </div>
                    <p className="text-xs text-yellow-200/70 leading-relaxed font-mono">
                      Cada nó ativado na Árvore do Conhecimento injeta novos dados no seu Passaporte Holográfico, aumentando seu poder multiplicador na DAO e credibilidade comunitária.
                    </p>
                 </div>
               </motion.div>
             ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full border border-dashed border-indigo-900/40 rounded-3xl flex flex-col items-center justify-center p-8 text-center bg-black/20"
                >
                   <Brain className="w-12 h-12 text-indigo-900 mb-4" />
                   <p className="text-indigo-200/50 text-sm font-mono uppercase tracking-widest">Selecione um nó de conhecimento na árvore</p>
                </motion.div>
             )}
           </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
