import { TreePine, Users, BookOpen } from 'lucide-react';

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

  return (
    <section id="projetos" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-600 tracking-tight mb-6">Nossos Projetos</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Conheça as iniciativas que estamos desenvolvendo para criar impacto real e duradouro. Com sua participação, podemos expandir esses projetos e iniciar novos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <div key={idx} className="flex flex-col border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full bg-white">
              <div className={`${proj.headerColor} p-12 flex justify-center items-center h-48`}>
                {proj.icon}
              </div>
              <div className="p-8 flex-1 flex flex-col items-center text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{proj.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-8 flex-1">
                  {proj.description}
                </p>
                <button className="w-full border border-gray-200 text-green-700 font-medium py-3 rounded-md hover:bg-gray-50 transition-colors">
                  Saiba mais
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-md transition-colors shadow-sm">
            Ver todos os projetos
          </button>
        </div>
      </div>
    </section>
  );
}
