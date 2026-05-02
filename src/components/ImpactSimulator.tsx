import { useState } from 'react';
import { motion } from 'motion/react';
import { Trees, Heart, BookOpen, Leaf } from 'lucide-react';

export function ImpactSimulator() {
  const [tokens, setTokens] = useState(10000);

  // Math logic for the visual effect
  // 10.000 SOS -> 50 Trees, 20 Baskets, 1 Class
  const trees = Math.floor(tokens / 200);
  const baskets = Math.floor(tokens / 500);
  const classes = Math.floor(tokens / 10000);

  return (
    <section className="py-24 px-6 bg-white dark:bg-[#0b1410] overflow-hidden relative transition-colors">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-green-400">Simulador de Eco-Impacto</h2>
          <p className="text-gray-600 dark:text-green-100/70 max-w-2xl mx-auto text-lg">
            Descubra o poder de transformação da sua contribuição. Arraste o controle e veja como a compra de tokens SOS reverbera pelo planeta real.
          </p>
        </motion.div>

        <div className="bg-gray-50/50 dark:bg-[#111f18]/60 backdrop-blur-sm border border-gray-100 dark:border-green-900/30 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="mb-12">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-sm font-semibold text-gray-500 dark:text-green-100/50 uppercase tracking-widest mb-1">Seu Investimento Mensal</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-green-600 dark:text-green-400 font-mono tracking-tighter">
                    {tokens.toLocaleString()}
                  </span>
                  <span className="text-xl font-medium text-gray-400 dark:text-green-500/60">SOS</span>
                </div>
              </div>
              <div className="hidden sm:flex w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center text-green-600 dark:text-green-400 shadow-inner">
                <Leaf className="w-6 h-6" />
              </div>
            </div>

            <div className="relative pt-4 pb-2">
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={tokens}
                onChange={(e) => setTokens(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 dark:bg-[#0b1410] rounded-lg appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-green-400/50 dark:border dark:border-green-800/50 accent-green-600 dark:accent-green-500"
              />
              <div className="flex justify-between text-xs font-mono text-gray-400 dark:text-green-100/40 mt-3 px-1">
                <span>1.000 SOS</span>
                <span>100.000 SOS</span>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              key={trees}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white dark:bg-[#0b1410] border border-gray-100 dark:border-green-900/40 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center group hover:border-green-200 dark:hover:border-green-600/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 mb-4 group-hover:scale-110 transition-transform">
                <Trees className="w-6 h-6" />
              </div>
              <motion.div 
                key={`tree-${trees}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl font-bold text-gray-900 dark:text-green-50 font-mono mb-1"
              >
                {trees}
              </motion.div>
              <p className="text-sm font-semibold text-gray-500 dark:text-green-100/60 uppercase tracking-widest">Árvores Plantadas</p>
            </motion.div>

            <motion.div 
              key={`basket-${baskets}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
              className="bg-white dark:bg-[#0b1410] border border-gray-100 dark:border-green-900/40 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center group hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6" />
              </div>
              <motion.div 
                key={`bask-${baskets}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl font-bold text-gray-900 dark:text-green-50 font-mono mb-1"
              >
                {baskets}
              </motion.div>
              <p className="text-sm font-semibold text-gray-500 dark:text-green-100/60 uppercase tracking-widest">Cestas Básicas</p>
            </motion.div>

            <motion.div 
              key={`class-${classes}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              className="bg-white dark:bg-[#0b1410] border border-gray-100 dark:border-green-900/40 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center group hover:border-purple-200 dark:hover:border-purple-900/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <motion.div 
                key={`c-${classes}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl font-bold text-gray-900 dark:text-green-50 font-mono mb-1"
              >
                {classes}
              </motion.div>
              <p className="text-sm font-semibold text-gray-500 dark:text-green-100/60 uppercase tracking-widest">Turmas Conectadas</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
