import { Mail, Globe, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-[#1b4332] text-green-50 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-green-800/50 pb-12 mb-8">
        
        {/* Col 1 */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="text-xl font-bold tracking-tight text-white">Planeta SOSPlanet</span>
          </div>
          <p className="text-green-100/80 leading-relaxed text-sm">
            Usando tecnologia blockchain para criar um planeta mais verde, justo e sustentável para as futuras gerações.
          </p>
          <div className="flex items-center gap-4 text-green-300">
            <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Github className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-white font-semibold mb-6">Planeta SOSPlanet</h4>
          <ul className="space-y-4 text-sm text-green-100/80">
            <li><a href="#sobre" className="hover:text-white transition-colors">Sobre</a></li>
            <li><a href="#missao" className="hover:text-white transition-colors">Nossas Missão</a></li>
            <li><a href="#token" className="hover:text-white transition-colors">Token SOS</a></li>
            <li><a href="#projetos" className="hover:text-white transition-colors">Projetos</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-white font-semibold mb-6">Recursos</h4>
          <ul className="space-y-4 text-sm text-green-100/80">
            <li><a href="#" className="hover:text-white transition-colors">Relatório técnico</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Roteiro</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Perguntas frequentes</a></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="text-white font-semibold mb-6">Inscreva-se</h4>
          <p className="text-sm text-green-100/80 mb-4 leading-relaxed">
            Receba atualizações sobre o lançamento do token e nossas iniciativas.
          </p>
          <div className="flex bg-green-900/50 rounded-md border border-green-800 overflow-hidden focus-within:border-green-500 transition-colors">
            <input 
              type="email" 
              placeholder="Seu e-mail" 
              className="bg-transparent px-4 py-2.5 outline-none text-sm w-full text-white placeholder:text-green-300/50"
            />
            <button className="bg-green-600 hover:bg-green-500 transition-colors px-4 flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto text-center text-sm text-green-100/60">
        © 2026 SOSPlaneta. Todos os direitos reservados. Criado por Eder Rodrigo Tagliari.
      </div>
    </footer>
  );
}
