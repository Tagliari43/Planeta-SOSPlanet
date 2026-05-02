import { TreePine, Coffee, Sun, BookOpen } from 'lucide-react';

export function Features() {
  const features = [
    { icon: <TreePine className="w-8 h-8 text-green-700" />, label: 'Reflorestamento' },
    { icon: <Coffee className="w-8 h-8 text-amber-700" />, label: 'Combate à Pobreza' },
    { icon: <Sun className="w-8 h-8 text-green-500" />, label: 'Energia Limpa' },
    { icon: <BookOpen className="w-8 h-8 text-green-800" />, label: 'Educação' },
  ];

  return (
    <section className="py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-12 md:gap-24">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3">
            <div className={`p-4 rounded-full ${idx === 1 ? 'bg-amber-50' : 'bg-green-50'} shadow-sm`}>
              {feature.icon}
            </div>
            <span className="font-medium text-gray-700">{feature.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
