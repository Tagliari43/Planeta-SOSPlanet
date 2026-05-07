import { Mail, Send, Twitter, Instagram, Linkedin, Github, MountainSnow, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import { Logo } from './Logo';
import { nexusService } from '../services/nexusService';
import { motion } from 'motion/react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await nexusService.registerRadarSubscription(email);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setEmail('');
        }, 4000);
      } catch (error) {
        console.error("Erro ao registrar no radar", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#061009] dark:bg-[#040806] text-green-50 mt-12 transition-colors">
      {/* Earth/Soil transition divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 -translate-y-full flex">
        <svg 
          className="relative block w-full h-[60px] md:h-[120px] fill-[#061009] dark:fill-[#040806] transition-colors"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto pt-20 px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-green-900/40 pb-16 mb-8 relative">
          
          {/* Scroll to Top button */}
          <button 
            onClick={scrollToTop}
            className="absolute -top-6 right-0 w-12 h-12 bg-green-900/50 hover:bg-green-800 text-green-400 rounded-full flex items-center justify-center border border-green-800/30 transition-colors shadow-lg group hover:-translate-y-2"
          >
            <ChevronUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Col 1 */}
          <div className="space-y-6 md:pr-4">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <span className="text-2xl font-bold tracking-tight text-white">SOSPlanet</span>
            </div>
            <p className="text-green-100/60 leading-relaxed text-sm font-medium pr-4">
              Enraizando tecnologia no solo terrestre para cultivar um futuro mais verde, sustentável e descentralizado. A semente foi plantada.
            </p>
            <div className="flex items-center gap-4 text-green-700 dark:text-green-900/80 pt-2">
              <span className="relative group">
                <button disabled className="w-10 h-10 rounded-full bg-[#0a180e] flex items-center justify-center opacity-50 cursor-not-allowed">
                  <Twitter className="w-4 h-4" />
                </button>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Em Breve</div>
              </span>
              <span className="relative group">
                <button disabled className="w-10 h-10 rounded-full bg-[#0a180e] flex items-center justify-center opacity-50 cursor-not-allowed">
                  <Instagram className="w-4 h-4" />
                </button>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Em Breve</div>
              </span>
              <span className="relative group">
                <button disabled className="w-10 h-10 rounded-full bg-[#0a180e] flex items-center justify-center opacity-50 cursor-not-allowed">
                  <Linkedin className="w-4 h-4" />
                </button>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Em Breve</div>
              </span>
              <span className="relative group">
                <button disabled className="w-10 h-10 rounded-full bg-[#0a180e] flex items-center justify-center opacity-50 cursor-not-allowed">
                  <Github className="w-4 h-4" />
                </button>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Em Breve</div>
              </span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="md:pl-4">
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2 tracking-wide uppercase text-xs">
              <MountainSnow className="w-4 h-4 text-green-500" />
              Navegação
            </h4>
            <ul className="space-y-4 text-sm text-green-100/60 font-medium font-mono">
              <li><a href="#sobre" className="hover:text-green-400 hover:tracking-wide transition-all inline-flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-green-500/0 hover:bg-green-500 transition-colors"></span> Sobre o Core</a></li>
              <li><a href="#missao" className="hover:text-green-400 hover:tracking-wide transition-all inline-flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-green-500/0 hover:bg-green-500 transition-colors"></span> Nossa Missão</a></li>
              <li><a href="#token" className="hover:text-green-400 hover:tracking-wide transition-all inline-flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-green-500/0 hover:bg-green-500 transition-colors"></span> Tokenomics</a></li>
              <li><a href="#projetos" className="hover:text-green-400 hover:tracking-wide transition-all inline-flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-green-500/0 hover:bg-green-500 transition-colors"></span> Projetos Ativos</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2 tracking-wide uppercase text-xs">
              <MountainSnow className="w-4 h-4 text-green-500 opacity-0" />
              Ecossistema
            </h4>
            <ul className="space-y-4 text-sm text-green-100/60 font-medium font-mono">
              <li><span className="opacity-60 transition-all inline-flex items-center gap-2 cursor-not-allowed"><span className="w-1 h-1 rounded-full bg-gray-500"></span> Relatório Técnico <span className="text-[9px] bg-green-900/50 text-green-400 px-1.5 py-0.5 rounded ml-1">Em breve</span></span></li>
              <li><span className="opacity-60 transition-all inline-flex items-center gap-2 cursor-not-allowed"><span className="w-1 h-1 rounded-full bg-gray-500"></span> Documentação <span className="text-[9px] bg-green-900/50 text-green-400 px-1.5 py-0.5 rounded ml-1">Em breve</span></span></li>
              <li><span className="opacity-60 transition-all inline-flex items-center gap-2 cursor-not-allowed"><span className="w-1 h-1 rounded-full bg-gray-500"></span> Roadmap <span className="text-[9px] bg-green-900/50 text-green-400 px-1.5 py-0.5 rounded ml-1">Em breve</span></span></li>
              <li><span className="opacity-60 transition-all inline-flex items-center gap-2 cursor-not-allowed"><span className="w-1 h-1 rounded-full bg-gray-500"></span> Eco-FAQ <span className="text-[9px] bg-green-900/50 text-green-400 px-1.5 py-0.5 rounded ml-1">Em breve</span></span></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-xs">Radar de Notícias</h4>
            <p className="text-xs text-green-100/50 mb-5 leading-relaxed">
              Mantenha-se escaneando o horizonte. Seja avisado sobre a listagem do token e novas intervenções ecológicas.
            </p>
            {!submitted ? (
              <form onSubmit={handleSubscribe} className="space-y-3 relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-green-800" />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail" 
                    className="bg-[#0a180e] border border-green-900/30 focus:border-green-500/50 rounded-lg pl-10 pr-4 py-3 outline-none text-sm w-full text-white placeholder:text-green-900 transition-all shadow-inner"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors px-4 py-2.5 rounded-lg flex items-center justify-center text-sm font-semibold gap-2"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                       Sintonizar Radar <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </form>
            ) : (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-green-900/30 border border-green-800/50 rounded-lg p-4 text-center"
               >
                 <Send className="w-5 h-5 text-green-400 mx-auto mb-2" />
                 <p className="text-green-300 text-sm font-medium">Radar sintonizado! Bem-vindo à Nação</p>
               </motion.div>
            )}
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-green-100/40">
          <div className="flex flex-col gap-2">
            <p>© 2026 SOSPlaneta. Todos os direitos reservados.</p>
            <p className="text-[10px] text-green-100/30">Nação SOSPlanet. Token utilitário para governança descentralizada e regenerativa.</p>
            <p className="text-[9px] text-green-100/20 max-w-sm">O Token SOS é um utility token de governança descentralizada e ação regenerativa ecossistêmica. Não constitui promessa de lucro ou recomendação de investimento.</p>
          </div>
          <div className="flex items-center gap-1">
             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
             Criado e cultivado por Eder Rodrigo Tagliari na rede.
          </div>
        </div>
      </div>
    </footer>
  );
}

