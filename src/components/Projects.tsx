import { TreePine, Users, BookOpen, Clock, Activity, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface ActiveProject {
  id: string;
  title: string;
  description: string;
  status: string;
  progress: number;
  icon_name?: string;
  header_color?: string;
}

export function Projects() {
  const [projects, setProjects] = useState<ActiveProject[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackProjects = [
    {
      id: "1",
      icon_name: 'TreePine',
      title: 'Reflorestamento Amazônico',
      description: 'Restauração de áreas degradadas da Floresta Amazônica com plantio de espécies nativas e monitoramento via tecnologia blockchain para garantir transparência.',
      header_color: 'bg-[#2A7543]',
      status: 'Em andamento',
      progress: 35
    },
    {
      id: "2",
      icon_name: 'Users',
      title: 'Alimentação Solidária',
      description: 'Distribuição de cestas básicas e refeições para comunidades vulneráveis, com foco em nutrição adequada e produção local sustentável.',
      header_color: 'bg-[#AB6C4A]',
      status: 'Em andamento',
      progress: 60
    },
    {
      id: "3",
      icon_name: 'BookOpen',
      title: 'Educação do Futuro',
      description: 'Desenvolvimento de plataforma educacional com IA para personalizar o aprendizado e torná-lo acessível a crianças em áreas remotas.',
      header_color: 'bg-[#18A058]',
      status: 'Planejamento',
      progress: 15
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!supabase) return;
        const { data, error } = await supabase
          .from('active_projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Erro ao buscar active_projects:", error);
          setProjects(fallbackProjects);
        } else if (data && data.length > 0) {
          setProjects(data as ActiveProject[]);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (err) {
        console.error("Supabase fail:", err);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    if (supabase) {
      const sub = supabase
        .channel('active_projects_updates')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'active_projects' }, payload => {
          fetchProjects(); // Recarrega todos para garantir ordem
        })
        .subscribe();
      return () => { sub.unsubscribe(); };
    }
  }, []);

  const getIcon = (name?: string) => {
    switch(name) {
      case 'Users': return <Users className="w-10 h-10 text-white" />;
      case 'BookOpen': return <BookOpen className="w-10 h-10 text-white" />;
      default: return <TreePine className="w-10 h-10 text-white" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="projetos" className="py-24 px-6 bg-white dark:bg-transparent overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-900/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 border border-green-800/50 text-green-400 text-sm font-mono mb-6">
            <Target className="w-4 h-4" />
            <span>Realidade no Solo</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-500 tracking-tight mb-6">Projetos Semente</h2>
          <p className="text-xl text-gray-600 dark:text-green-100/80 max-w-4xl mx-auto leading-relaxed">
            Acompanhe o impacto da nossa nação emergente em tempo real. Cada recurso é direcionado com propósito e transparência.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {projects.map((proj, idx) => (
              <motion.div 
                key={proj.id || idx} 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="flex flex-col border border-gray-100 dark:border-green-900/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full bg-white dark:bg-[#0C1611]/80 backdrop-blur-sm dark:shadow-green-900/20 group cursor-pointer"
              >
                <div className={`${proj.header_color || 'bg-[#18A058]'} p-12 flex justify-center items-center h-48 transition-colors duration-300 opacity-90 group-hover:opacity-100 relative`}>
                  <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-2">
                     <Activity className="w-3 h-3 text-green-300" />
                     <span className="text-xs font-medium text-white">{proj.status || 'Ativo'}</span>
                  </div>
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                    {getIcon(proj.icon_name)}
                  </motion.div>
                </div>
                <div className="p-8 flex-1 flex flex-col items-center text-center dark:bg-white/5">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{proj.title}</h3>
                  <p className="text-gray-600 dark:text-green-100/70 leading-relaxed mb-8 flex-1 text-sm">
                    {proj.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="w-full mb-8">
                     <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-500 dark:text-green-400/60 font-mono">Progresso</span>
                        <span className="text-green-600 dark:text-green-400 font-bold font-mono">{proj.progress || 0}%</span>
                     </div>
                     <div className="w-full bg-gray-100 dark:bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-200 dark:border-gray-800">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${proj.progress || 0}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="bg-green-500 h-full rounded-full"
                        ></motion.div>
                     </div>
                  </div>

                  <button className="w-full border border-gray-200 dark:border-green-800/50 text-green-700 dark:text-green-400 font-medium py-3 rounded-xl group-hover:bg-green-50 dark:group-hover:bg-green-900/30 group-hover:border-green-300 dark:group-hover:border-green-600 transition-colors shadow-sm">
                    Ver relatório
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
