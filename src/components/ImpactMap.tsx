import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

const activeNodes = [
  { id: 1, name: 'Amazônia, Brasil', x: 30, y: 55, active: true },
  { id: 2, name: 'Mata Atlântica, Brasil', x: 35, y: 65, active: false },
  { id: 3, name: 'Congo Basin', x: 55, y: 60, active: false },
  { id: 4, name: 'Sudoeste Asiático', x: 80, y: 50, active: false }
];

export function ImpactMap() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-[#060c08] transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-green-800 dark:text-green-400">Nosso Alcance</h2>
          <p className="text-gray-600 dark:text-green-100/70 max-w-2xl mx-auto text-lg">
            Acompanhe o despertar do ecossistema. A energia vital começa na Amazônia e se espalha globalmente através da nossa rede.
          </p>
        </motion.div>

        <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] md:aspect-[2/1] bg-green-50 dark:bg-[#0b1410] rounded-3xl border border-green-100 dark:border-green-900/30 overflow-hidden shadow-inner flex items-center justify-center">
          
          {/* Decorative Grid / Globe abstraction */}
          <div className="absolute inset-0 opacity-20 dark:opacity-30 flex items-center justify-center">
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
          {activeNodes.map((node, idx) => (
            <div 
              key={node.id}
              className="absolute"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
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
                  <div className="bg-gray-900 dark:bg-[#1a2d24] text-white dark:text-green-100 text-xs py-1.5 px-3 rounded-md shadow-lg border border-gray-700 dark:border-green-800 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-green-400" />
                    <span className="font-medium">{node.name}</span>
                    {node.active && <span className="ml-1 px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-300 text-[10px] font-bold uppercase tracking-wider">Ativo</span>}
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
          ))}
          
        </div>
        
        <div className="mt-8 flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 relative">
              <div className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-75"></div>
            </div>
            <span className="text-gray-600 dark:text-green-100/70">Núcleo Ativo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-50"></div>
            <span className="text-gray-600 dark:text-green-100/70">Mapeamento em Progresso</span>
          </div>
        </div>
      </div>
    </section>
  );
}
