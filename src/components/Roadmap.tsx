import { motion } from 'motion/react';
import { Sprout, Leaf, TreeDeciduous, Trees } from 'lucide-react';

const phases = [
  {
    id: 1,
    title: 'Fase 1: A Semente',
    description: 'Nascimento da SOSPlanet e Arquitetura do sistema. Concepção da Conexão Neural e base de contratos inteligentes.',
    icon: <Sprout className="w-6 h-6" />,
    status: 'completed'
  },
  {
    id: 2,
    title: 'Fase 2: O Broto',
    description: 'Lançamento do Token SOS na blockchain Algorand. Formação das primeiras parcerias de preservação.',
    icon: <Leaf className="w-6 h-6" />,
    status: 'active'
  },
  {
    id: 3,
    title: 'Fase 3: A Árvore',
    description: 'Primeiros plantios reais na Amazônia, monitorados e auditados via Blockchain com prova de impacto.',
    icon: <TreeDeciduous className="w-6 h-6" />,
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'Fase 4: A Floresta',
    description: 'Escala global. Autossuficiência do ecossistema, integração de IAs autônomas para preservação.',
    icon: <Trees className="w-6 h-6" />,
    status: 'upcoming'
  }
];

export function Roadmap() {
  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-[#080f0c] transition-colors relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-green-800 dark:text-green-400">A Jornada Evolutiva</h2>
          <p className="text-gray-600 dark:text-green-100/70 max-w-2xl mx-auto text-lg">
            Nossa rota de crescimento é orgânica. Cada fase representa o amadurecimento do nosso compromisso com a regeneração do planeta.
          </p>
        </motion.div>

        <div className="relative">
          {/* Central Vertical Line (The Stem) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-green-100 dark:bg-green-900/30 rounded-full">
            <motion.div 
              className="w-full bg-gradient-to-b from-green-400 to-green-600 rounded-full origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{ height: "100%" }}
            />
          </div>

          <div className="space-y-16">
            {phases.map((phase, idx) => (
              <motion.div 
                key={phase.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`flex items-center w-full ${idx % 2 === 0 ? 'justify-start' : 'justify-end'} relative`}
              >
                {/* Node Icon */}
                <div className="absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center border-4 border-gray-50 dark:border-[#080f0c] z-10 transition-colors shadow-sm
                  bg-white dark:bg-[#111f18] text-green-600 dark:text-green-400
                ">
                  <motion.div
                     initial={{ scale: 0 }}
                     whileInView={{ scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.4, delay: 0.5 + (idx * 0.2) }}
                  >
                    {phase.icon}
                  </motion.div>
                  {phase.status === 'active' && (
                     <div className="absolute inset-0 rounded-full animate-ping border-2 border-green-400 opacity-50"></div>
                  )}
                </div>

                {/* Content Box */}
                <div className={`w-[calc(50%-3rem)] md:w-[calc(50%-4rem)] ${idx % 2 === 0 ? 'text-right pr-4 md:pr-8' : 'text-left pl-4 md:pl-8'}`}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-[#111f18]/80 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-green-900/30 hover:shadow-md transition-shadow relative"
                  >
                    {/* Connecting smaller line to the center stem for desktop */}
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-0.5 bg-green-200 dark:bg-green-800 ${idx % 2 === 0 ? '-right-8' : '-left-8'}`}></div>
                    
                    <span className="inline-block px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-3">
                      {phase.status === 'completed' && 'Concluído'}
                      {phase.status === 'active' && 'Em andamento'}
                      {phase.status === 'upcoming' && 'Em breve'}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-green-50 mb-2">{phase.title}</h3>
                    <p className="text-gray-600 dark:text-green-100/70 text-sm leading-relaxed">{phase.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
