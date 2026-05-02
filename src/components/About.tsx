import { motion } from 'motion/react';

export function About() {
  return (
    <section id="sobre" className="py-24 px-6 bg-white flex flex-col items-center text-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-green-900 tracking-tight mb-8">
          Sobre a SOSPlanet
        </h2>
        
        <p className="text-xl text-gray-600 mb-20 max-w-3xl mx-auto leading-relaxed">
          A SOSPlanet é uma iniciativa inovadora que utiliza a tecnologia blockchain para enfrentar alguns dos desafios mais urgentes do nosso planeta, começando pelo Brasil e expandindo globalmente.
        </p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <blockquote className="text-lg md:text-2xl italic text-green-800 font-medium leading-relaxed mb-6">
            "Acredito que podemos mudar nossa realidade e a de todos que precisamos. A tecnologia pode ser a descoberta para as transformações sociais e ambientais que nosso planeta necessita."
          </blockquote>
          <p className="text-gray-500 font-medium">
            — Eder Rodrigo Tagliari, Fundador da SOSPlanet
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
