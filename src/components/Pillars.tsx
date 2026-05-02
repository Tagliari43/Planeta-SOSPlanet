import { TreePine, Heart, Lightbulb, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export function Pillars() {
  const pillars = [
    {
      icon: <TreePine className="w-8 h-8 text-white" />,
      title: 'Reflorestamento',
      description: 'Restaurar a Floresta Amazônica e outros ecossistemas degradados, começando pelo Brasil, ou liberando nosso planeta.',
      headerColor: 'bg-green-800'
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: 'Combate à Pobreza',
      description: 'Fornecer alimentos e cestas básicas para pessoas em situação de vulnerabilidade, garantindo dignidade e segurança alimentar.',
      headerColor: 'bg-[#a66a4f]' // Brown/Terra
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-white" />,
      title: 'Energia Limpa',
      description: 'Implementar soluções de energia renovável e acessível, reduzindo a dependência de combustíveis fósseis.',
      headerColor: 'bg-green-600'
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-white" />,
      title: 'Educação Inovadora',
      description: 'Transformar o sistema educacional com tecnologia e IA, tornando o ensino de qualidade acessível para todos.',
      headerColor: 'bg-green-700'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-green-600 tracking-tight mb-6">Nossas</h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          A SOSPlanet está comprometida com quatro pilares fundamentais para transformar nosso planeta e criar um futuro mais sustentável e justo para todos.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 text-left lg:grid-cols-4 gap-6"
      >
        {pillars.map((pillar, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            className="flex flex-col border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className={`${pillar.headerColor} p-6 flex justify-center items-center h-32 opacity-90 group-hover:opacity-100 transition-opacity`}>
              <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }} transition={{ duration: 0.5 }}>
                {pillar.icon}
              </motion.div>
            </div>
            <div className="p-6 bg-white flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {pillar.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
