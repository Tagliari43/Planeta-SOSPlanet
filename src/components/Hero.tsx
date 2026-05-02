import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenModal?: () => void;
}

export function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="pt-40 pb-20 px-6 sm:px-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background patterns could go here, for now using faint radial gradient or shapes */}
      <div className="absolute top-1/4 left-10 w-12 h-12 bg-green-50 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-10 right-20 w-24 h-24 bg-green-50 rounded-full blur-2xl opacity-60"></div>

      <div className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        Lançando em breve - SOS Token
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-green-900 tracking-tight max-w-4xl leading-tight mb-6">
        SOSPlanet - Salvando o Planeta com Blockchain
      </h1>

      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10">
        Uma plataforma revolucionária que usa criptomoeda para reflorestar a Amazônia, reduzir a pobreza, implementar energia limpa e revolucionar a educação.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button 
          onClick={onOpenModal}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-md flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          Participar do Movimento <ArrowRight className="w-4 h-4" />
        </button>
        <button className="border border-green-200 text-green-700 hover:bg-green-50 px-6 py-3 rounded-md font-medium transition-colors w-full sm:w-auto justify-center">
          Saiba Mais
        </button>
      </div>
    </section>
  );
}
