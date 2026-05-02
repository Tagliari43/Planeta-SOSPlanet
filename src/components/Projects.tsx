import { TreePine, Users, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

export function Projects() {
  const projects = [
    {
      icon: <TreePine className="w-10 h-10 text-white" />,
      title: 'Reflorestamento Amazônico',
      description: 'Restauração de áreas degradadas da Floresta Amazônica com plantio de espécies nativas e monitoramento via tecnologia blockchain para garantir transparência.',
      headerColor: 'bg-[#2A7543]',
    },
    {
      icon: <Users className="w-10 h-10 text-white" />,
      title: 'Alimentação Solidária',
      description: 'Distribuição de cestas básicas e refeições para comunidades vulneráveis, com foco em nutrição adequada e produção local sustentável.',
      headerColor: 'bg-[#AB6C4A]',
    },
    {
      icon: <BookOpen className="w-10 h-10 text-white" />,
      title: 'Educação do Futuro',
      description: 'Desenvolvimento de plataforma educacional com IA para personalizar o aprendizado e torná-lo acessível a crianças em áreas remotas.',
      headerColor: 'bg-[#18A058]'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="projetos" className="py-24 px-6 bg-white dark:bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-500 tracking-tight mb-6">Nossos Projetos</h2>
          <p className="text-xl text-gray-600 dark:text-green-100 max-w-4xl mx-auto leading-relaxed">
            Conheça as iniciativas que estamos desenvolvendo para criar impacto real e duradouro. Com sua participação, podemos expandir esses projetos e iniciar novos.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {projects.map((proj, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="flex flex-col border border-gray-100 dark:border-green-900/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full bg-white dark:bg-[#0b1410] dark:shadow-green-900/20 group cursor-pointer"
            >
              <div className={`${proj.headerColor} p-12 flex justify-center items-center h-48 transition-colors duration-300 opacity-90 group-hover:opacity-100`}>
                <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                  {proj.icon}
                </motion.div>
              </div>
              <div className="p-8 flex-1 flex flex-col items-center text-center dark:bg-white/5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-green-300 mb-4">{proj.title}</h3>
                <p className="text-gray-600 dark:text-green-100/70 leading-relaxed mb-8 flex-1">
                  {proj.description}
                </p>
                <button className="w-full border border-gray-200 dark:border-green-800 text-green-700 dark:text-green-400 font-medium py-3 rounded-md group-hover:bg-green-50 dark:group-hover:bg-green-900/50 group-hover:border-green-300 dark:group-hover:border-green-600 transition-colors">
                  Saiba mais
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-md transition-colors shadow-sm"
          >
            Ver todos os projetos
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
