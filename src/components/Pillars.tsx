import { TreePine, Heart, Lightbulb, GraduationCap } from 'lucide-react';

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

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-green-600 tracking-tight mb-6">Nossas</h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          A SOSPlanet está comprometida com quatro pilares fundamentais para transformar nosso planeta e criar um futuro mais sustentável e justo para todos.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 text-left lg:grid-cols-4 gap-6">
        {pillars.map((pillar, idx) => (
          <div key={idx} className="flex flex-col border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className={`${pillar.headerColor} p-6 flex justify-center items-center h-32`}>
              {pillar.icon}
            </div>
            <div className="p-6 bg-white flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
