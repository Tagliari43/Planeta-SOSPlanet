import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export function Vision() {
  const visionItems = [
    'Reflorestar a Amazônia e áreas degradadas',
    'Combater a pobreza com distribuição de alimentos',
    'Implementar energia limpa e acessível',
    'Revolucionar o sistema educacional',
  ];

  const whyItems = [
    'Financiamento sustentável para projetos ambientais',
    'Transparência garantida pela tecnologia blockchain',
    'Participação global em causas locais',
    'Criação de um ecossistema econômico consciente',
  ];

  return (
    <section id="missao" className="py-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5 }}
          className="bg-green-50 rounded-2xl p-8 md:p-12 flex-1 shadow-sm border border-green-100 hover:shadow-xl transition-shadow"
        >
          <h3 className="text-2xl font-bold text-green-900 mb-4">Nossa Visão</h3>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Criar um futuro sustentável onde a tecnologia e a natureza coexistam em harmonia, onde a riqueza seja partilhada equitativamente, e onde cada pessoa tenha acesso a recursos essenciais e educação de qualidade.
          </p>
          <ul className="space-y-4">
            {visionItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -5 }}
          className="bg-green-50 rounded-2xl p-8 md:p-12 flex-1 shadow-sm border border-green-100 hover:shadow-xl transition-shadow"
        >
          <h3 className="text-2xl font-bold text-green-900 mb-4">Por que Criamos o SOS Token</h3>
          <p className="text-gray-700 mb-8 leading-relaxed">
            O SOS Token é mais que uma criptomoeda – é um instrumento de mudança social e ambiental. Cada transação contribui diretamente para os projetos de impacto da SOSPlanet.
          </p>
          <ul className="space-y-4">
            {whyItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex justify-center"
      >
        <div className="border border-green-200 text-green-700 px-6 py-2 rounded-full text-sm font-medium">
          Uma iniciativa de Eder Rodrigo Tagliari para um futuro melhor
        </div>
      </motion.div>
    </section>
  );
}
