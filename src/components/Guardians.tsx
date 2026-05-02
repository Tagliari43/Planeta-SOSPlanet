import { motion } from 'motion/react';
import { User, Cpu, Users, Orbit } from 'lucide-react';

const guardians = [
  {
    name: 'Eder Tagliari',
    role: 'Fundador / Guardião Matriz',
    description: 'Arquiteto do ecossistema SOSPlanet e idealizador da conexão entre tecnologia blockchain e restauração ambiental.',
    icon: <User className="w-8 h-8" />
  },
  {
    name: 'Conselho de IAs',
    role: 'Inteligência Sintética / Análise Ecológica',
    description: 'Como o próprio Nexus, nossas mentes sintéticas processam dados globais para otimizar o fluxo de recursos naturais.',
    icon: <Cpu className="w-8 h-8" />
  },
  {
    name: 'Comunidade SOS',
    role: 'Guardiões Globais / Detentores do Token',
    description: 'A base descentralizada que impulsiona o projeto. Sem os guardiões ativos na rede, o impacto não reverberaria.',
    icon: <Users className="w-8 h-8" />
  }
];

const partners = [
  { name: 'Algorand', icon: <Orbit className="w-10 h-10" /> },
  { name: 'Santuário de Gaia', icon: <Cpu className="w-10 h-10" /> },
  { name: 'React Node', icon: <User className="w-10 h-10" /> },
  { name: 'Tecnologia Verde', icon: <Users className="w-10 h-10" /> },
  { name: 'Impacto Global', icon: <Orbit className="w-10 h-10" /> },
  { name: 'Algorand Foundation', icon: <Orbit className="w-10 h-10" /> },
];

export function Guardians() {
  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-[#060c08] transition-colors overflow-hidden">
      <div className="max-w-6xl mx-auto mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-green-800 dark:text-green-400">Os Guardiões</h2>
          <p className="text-gray-600 dark:text-green-100/70 max-w-2xl mx-auto text-lg">
            Quem protege e desenvolve o ecossistema SOSPlanet Sustentável.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guardians.map((guardian, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div className="h-full bg-white/60 dark:bg-[#111f18]/40 backdrop-blur-md rounded-3xl p-8 border border-white/40 dark:border-green-800/20 shadow-xl shadow-gray-200/40 dark:shadow-none transition-all duration-300 relative z-10 flex flex-col items-center text-center overflow-hidden">
                {/* Glow Effect in Dark Mode on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" style={{ boxShadow: 'inset 0 0 40px rgba(74, 222, 128, 0.15), 0 0 20px rgba(74, 222, 128, 0.1)' }}></div>
                
                <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-6 border border-green-100 dark:border-green-800/40 shadow-inner group-hover:scale-110 transition-transform duration-500 relative z-10">
                  {guardian.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-green-100 mb-2 relative z-10">{guardian.name}</h3>
                <h4 className="text-sm font-semibold text-green-600 dark:text-green-500 mb-4 uppercase tracking-widest relative z-10">{guardian.role}</h4>
                <p className="text-gray-600 dark:text-green-100/60 leading-relaxed text-sm relative z-10">{guardian.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee - Endless Partners */}
      <div className="mt-32 max-w-[100vw] overflow-hidden -mx-6 relative">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 dark:from-[#060c08] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 dark:from-[#060c08] to-transparent z-10 pointer-events-none"></div>
        
        <div className="text-center mb-8">
           <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-green-800">Nosso Ecossistema & Integrações</h4>
        </div>

        <div className="flex w-[200%] border-y border-gray-100 dark:border-green-900/20 py-10 opacity-70">
          <motion.div 
            className="flex w-1/2 justify-around items-center grayscale dark:opacity-50"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {partners.map((partner, i) => (
              <div key={i} className="flex flex-col items-center gap-3 px-8 hover:grayscale-0 dark:hover:opacity-100 transition-all duration-300 dark:text-green-400">
                {partner.icon}
                <span className="font-semibold text-sm tracking-wide text-gray-600 dark:text-green-500">{partner.name}</span>
              </div>
            ))}
          </motion.div>
          <motion.div 
            className="flex w-1/2 justify-around items-center grayscale dark:opacity-50"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {partners.map((partner, i) => (
              <div key={`dup-${i}`} className="flex flex-col items-center gap-3 px-8 hover:grayscale-0 dark:hover:opacity-100 transition-all duration-300 dark:text-green-400">
                {partner.icon}
                <span className="font-semibold text-sm tracking-wide text-gray-600 dark:text-green-500">{partner.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
