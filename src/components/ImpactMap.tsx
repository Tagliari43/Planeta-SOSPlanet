import { motion } from 'motion/react';
import { MapPin, TreePine, Map as MapIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface ImpactCoordinate {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  active: boolean;
  trees_count?: number;
}

const fallbackNodes = [
  { id: '1', name: 'Amazônia, Brasil', latitude: -3.4653, longitude: -62.2159, active: true, trees_count: 15200 },
  { id: '2', name: 'Mata Atlântica, Brasil', latitude: -22.9068, longitude: -43.1729, active: false, trees_count: 5000 },
  { id: '3', name: 'Congo Basin', latitude: -0.7893, longitude: 21.0885, active: false, trees_count: 0 },
  { id: '4', name: 'Sudoeste Asiático', latitude: 3.2028, longitude: 114.6953, active: false, trees_count: 0 }
];

export function ImpactMap() {
  const [nodes, setNodes] = useState<ImpactCoordinate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        if (!supabase) return;
        const { data, error } = await supabase
          .from('impact_coordinates')
          .select('*');

        if (error) {
          console.error("Erro ao buscar impact_coordinates:", error);
          setNodes(fallbackNodes);
        } else if (data && data.length > 0) {
          setNodes(data as ImpactCoordinate[]);
        } else {
          setNodes(fallbackNodes);
        }
      } catch (err) {
        console.error("Supabase fail:", err);
        setNodes(fallbackNodes);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();

    if (supabase) {
      const sub = supabase
        .channel('impact_coordinates_updates')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'impact_coordinates' }, payload => {
          fetchCoordinates();
        })
        .subscribe();
      return () => { sub.unsubscribe(); };
    }
  }, []);

  // Simple equirectangular projection
  const getX = (lng: number) => ((lng + 180) / 360) * 100;
  const getY = (lat: number) => ((90 - lat) / 180) * 100;

  return (
    <section id="mapa" className="py-24 px-6 bg-white dark:bg-[#060c08] transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 border border-green-800/50 text-green-400 text-sm font-mono mb-6">
            <MapIcon className="w-4 h-4" />
            <span>Atlas Global</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-green-800 dark:text-green-400">Mapa de Impacto</h2>
          <p className="text-gray-600 dark:text-green-100/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Acompanhe o despertar do ecossistema. A energia vital começa nas bases e se espalha globalmente através da nossa rede. Cada ponto representa uma comunidade regenerada.
          </p>
        </motion.div>

        <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] md:aspect-[2/1] bg-green-50 dark:bg-[#0b1410] rounded-3xl border border-green-100 dark:border-green-900/30 overflow-hidden shadow-inner flex items-center justify-center">
          
          {/* Decorative Grid / Globe abstraction */}
          <div className="absolute inset-0 opacity-20 dark:opacity-30 flex items-center justify-center pointer-events-none">
            {/* Horizontal Lines */}
            <div className="absolute inset-x-0 h-px bg-green-600 top-1/4"></div>
            <div className="absolute inset-x-0 h-px bg-green-600 top-2/4"></div>
            <div className="absolute inset-x-0 h-px bg-green-600 top-3/4"></div>
            {/* Vertical Lines */}
            <div className="absolute inset-y-0 w-px bg-green-600 left-1/4"></div>
            <div className="absolute inset-y-0 w-px bg-green-600 left-2/4"></div>
            <div className="absolute inset-y-0 w-px bg-green-600 left-3/4"></div>
            
            {/* Stylized waves/curves representing earth connections */}
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-green-600/40 fill-none" preserveAspectRatio="none">
              <path d="M 0 50 Q 25 30, 50 50 T 100 50" strokeWidth="0.5" />
              <path d="M 0 50 Q 25 70, 50 50 T 100 50" strokeWidth="0.5" />
              <path d="M 30 0 Q 50 25, 30 50 T 30 100" strokeWidth="0.5" />
              <path d="M 70 0 Q 50 25, 70 50 T 70 100" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Central Glow representing the core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/20 dark:bg-green-500/10 rounded-full blur-[80px] pointer-events-none"></div>

          {/* Map Points */}
          {!loading && nodes.map((node, idx) => {
            const xPos = getX(node.longitude);
            const yPos = getY(node.latitude);
            
            return (
              <div 
                key={node.id}
                className="absolute"
                style={{ left: `${xPos}%`, top: `${yPos}%` }}
              >
                <div className="relative group">
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (idx * 0.2), type: "spring" }}
                    className="relative z-10 w-4 h-4 bg-green-500 dark:bg-green-400 rounded-full cursor-pointer flex items-center justify-center border-2 border-white dark:border-[#0b1410] shadow-md"
                  >
                    <div className={`absolute inset-0 rounded-full ${node.active ? 'animate-ping opacity-75 bg-green-400' : 'bg-green-300 opacity-0 group-hover:opacity-100 group-hover:animate-ping'}`}></div>
                  </motion.div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-max z-20">
                    <div className="bg-gray-900 dark:bg-[#1a2d24] text-white dark:text-green-100 text-xs p-3 rounded-xl shadow-lg border border-gray-700 dark:border-green-800 flex flex-col gap-2 min-w-[150px]">
                      <div className="flex items-center gap-1.5 border-b border-gray-700 dark:border-green-900/50 pb-2">
                        <MapPin className="w-3 h-3 text-green-400" />
                        <span className="font-bold flex-1">{node.name}</span>
                        {node.active && <span className="px-1.5 py-0.5 rounded border border-green-500/30 bg-green-500/20 text-green-300 text-[9px] font-bold uppercase tracking-wider">Ativo</span>}
                      </div>
                      {node.trees_count !== undefined && (
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-gray-400 dark:text-green-100/50 flex items-center gap-1">
                            <TreePine className="w-3 h-3" /> Árvores:
                          </span>
                          <span className="font-mono font-bold text-green-400">{node.trees_count.toLocaleString('pt-BR')}</span>
                        </div>
                      )}
                    </div>
                    {/* Arrow */}
                    <div className="w-2 h-2 bg-gray-900 dark:bg-[#1a2d24] absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45 border-r border-b border-gray-700 dark:border-green-800"></div>
                  </div>
                  
                  {/* Connecting lines for active nodes to center or each other */}
                  {node.active && (
                     <svg className="absolute top-1/2 left-1/2 w-[200px] h-[200px] overflow-visible pointer-events-none stroke-green-500/30 dark:stroke-green-400/20 fill-none" style={{ zIndex: 0 }}>
                       <circle cx="0" cy="0" r="40" strokeWidth="1" className="animate-pulse" />
                       <circle cx="0" cy="0" r="80" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                     </svg>
                  )}
                </div>
              </div>
            );
          })}
          
        </div>
        
        <div className="mt-8 flex justify-center gap-8 text-sm">
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-green-900/20">
            <div className="w-3 h-3 rounded-full bg-green-500 relative">
              <div className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-75"></div>
            </div>
            <span className="text-gray-600 dark:text-green-100/70 font-medium tracking-wide">Núcleo Ativo</span>
          </div>
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-green-900/20">
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-50"></div>
            <span className="text-gray-600 dark:text-green-100/70 font-medium tracking-wide">Mapeamento em Progresso</span>
          </div>
        </div>
      </div>
    </section>
  );
}
