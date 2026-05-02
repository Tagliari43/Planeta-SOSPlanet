import { Navbar as NavbarProps } from 'lucide-react'; // Removing this unused import
import { Logo } from './Logo';

interface NavProps {
  onOpenModal?: () => void;
}

export function Navbar({ onOpenModal }: NavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Logo size="md" />
        <span className="text-xl font-bold text-green-900 tracking-tight">Planeta SOSPlanet</span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <a href="#sobre" className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors">Sobre</a>
        <a href="#missao" className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors">Nossa Missão</a>
        <a href="#token" className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors">Token SOS</a>
        <a href="#projetos" className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors">Projetos</a>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenModal}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm"
        >
          Compre o token SOS.
        </button>
      </div>
    </nav>
  );
}
