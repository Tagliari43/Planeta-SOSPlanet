import { useState, useEffect } from 'react';
import { X, Heart, Leaf, Lightbulb, BookOpen, Rocket, Copy, Check, Globe } from 'lucide-react';
import { cn } from '../lib/utils';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'motion/react';

interface BuyTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationAddress = ({ coin, address, warning, copiedAddress, onCopy }: any) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
      <span className="font-semibold text-gray-800 text-sm">{coin}:</span>
      <button 
        onClick={() => onCopy(address)}
        className="text-green-600 hover:text-green-700 flex items-center justify-center gap-1 text-xs font-medium bg-green-50 px-3 py-1.5 rounded transition-colors self-start sm:self-auto"
      >
        {copiedAddress === address ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copiedAddress === address ? 'Copiado!' : 'Copiar endereço'}
      </button>
    </div>
    <div className="font-mono text-xs text-gray-800 break-words sm:break-all whitespace-pre-wrap bg-white p-3 border border-gray-200 rounded mb-2 select-all overflow-wrap-anywhere">
      {address}
    </div>
    <p className="text-xs text-red-600 font-medium">{warning}</p>
  </div>
);

export function BuyTokenModal({ isOpen, onClose }: BuyTokenModalProps) {
  const [activeTab, setActiveTab] = useState<'missao' | 'participar' | 'futuro'>('missao');
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (showToast) {
      timeout = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showToast]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(text);
    setShowToast(true);
    setTimeout(() => setCopiedAddress(null), 2000);
  };


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="bg-white rounded-2xl shadow-2xl w-[95vw] md:max-w-4xl h-[85vh] max-h-[850px] overflow-hidden relative z-10 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Options */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <div className="flex flex-col">
              <h2 className="font-bold text-gray-900 leading-none">SOSPlanet</h2>
              <span className="text-xs font-medium text-green-600 mt-1">Juntos pelo nosso planeta</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-100">
          <button
            onClick={() => setActiveTab('missao')}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 flex items-center justify-center gap-2",
              activeTab === 'missao' ? "border-green-600 text-green-700" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            )}
          >
            <Heart className="w-4 h-4" /> O Coração da Missão
          </button>
          <button
            onClick={() => setActiveTab('participar')}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 flex items-center justify-center gap-2",
              activeTab === 'participar' ? "border-green-600 text-green-700" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            )}
          >
            <Leaf className="w-4 h-4" /> Como Participar
          </button>
          <button
            onClick={() => setActiveTab('futuro')}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 flex items-center justify-center gap-2",
              activeTab === 'futuro' ? "border-green-600 text-green-700" : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            )}
          >
            <Globe className="w-4 h-4" /> Ecossistema e Futuro
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'missao' && (
            <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-300">
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-800 flex items-center gap-2">
                  <Heart className="w-6 h-6" /> O Propósito do SOS Token
                </h3>
                
                <div className="border-l-4 border-green-500 pl-4 py-1 my-4">
                  <p className="text-green-800 italic font-medium leading-relaxed">
                    "Você não está apenas adquirindo um token, está semeando um futuro mais verde e justo, um futuro onde a esperança floresce." - Lumina
                  </p>
                </div>
                
                <p className="text-gray-700 leading-relaxed text-[15px]">
                  O <strong className="text-gray-900">SOS Token</strong> é a força vital que impulsiona a grandiosa missão da SOSPlanet. Cada token não é um mero ativo digital; ele representa um compromisso ativo e uma participação direta na regeneração do nosso planeta e no empoderamento de suas comunidades.
                </p>
              </div>

              <div className="bg-green-50/50 border border-green-100 rounded-2xl p-6 md:p-8">
                <h3 className="font-semibold text-green-800 mb-6 text-lg">Cada SOS Token visa financiar ações concretas como:</h3>

                <ul className="space-y-5">
                  <li className="flex gap-4 text-gray-700">
                    <div className="bg-green-100 p-2 rounded-full shrink-0 h-fit">
                      <Leaf className="w-5 h-5 text-green-700" />
                    </div>
                    <span className="leading-relaxed pt-1">Plantio de árvores em áreas críticas, começando pela Amazônia, nosso pulmão global.</span>
                  </li>
                  <li className="flex gap-4 text-gray-700">
                    <div className="bg-amber-100 p-2 rounded-full shrink-0 h-fit">
                      <Heart className="w-5 h-5 text-amber-700" />
                    </div>
                    <span className="leading-relaxed pt-1">Fornecimento de alimentos e recursos essenciais para comunidades em situação de vulnerabilidade.</span>
                  </li>
                  <li className="flex gap-4 text-gray-700">
                    <div className="bg-yellow-100 p-2 rounded-full shrink-0 h-fit">
                      <Lightbulb className="w-5 h-5 text-yellow-600" />
                    </div>
                    <span className="leading-relaxed pt-1">Implementação e fomento de projetos de energia limpa e sustentável para todos.</span>
                  </li>
                  <li className="flex gap-4 text-gray-700">
                    <div className="bg-blue-100 p-2 rounded-full shrink-0 h-fit">
                      <BookOpen className="w-5 h-5 text-blue-700" />
                    </div>
                    <span className="leading-relaxed pt-1">Desenvolvimento de plataformas educacionais inovadoras, potencializadas por IA, para democratizar o conhecimento.</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center py-4">
                <p className="text-green-700 font-bold text-lg flex flex-col sm:flex-row items-center justify-center gap-2">
                  <Rocket className="w-6 h-6 text-green-600" /> 
                  <span className="leading-relaxed text-center sm:text-left">
                    **Lançamento Oficial: Estamos em contagem regressiva!** <br className="hidden sm:block"/> Fique conectado para ser parte desta história desde o início!
                  </span>
                </p>
              </div>
            </div>
          )}

          {activeTab === 'participar' && (
            <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-300">
              <div>
                <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <Leaf className="w-6 h-6" /> Prepare-se para Impulsionar a Mudança!
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  O SOS Token ainda não está disponível para aquisição pública, mas sua jornada como um Guardião da Terra pode começar a se desenhar agora! Estamos trabalhando intensamente para um lançamento transparente e de grande impacto.
                </p>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-2 text-lg">
                  <Rocket className="w-5 h-5 text-blue-600" /> Adquirindo Seus SOS Tokens (Em Breve)
                </h4>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">Assim que o lançamento oficial ocorrer, você poderá adquirir SOS Tokens através de:</p>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2 mb-4 leading-relaxed">
                  <li>Plataformas de Troca Descentralizadas (DEXs) parceiras (mais informações em breve).</li>
                  <li>Nosso portal oficial SOSPlanet (detalhes serão anunciados).</li>
                </ul>
                <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <span className="font-bold text-blue-900 block mb-1">Como se preparar:</span> 
                    Comece a se familiarizar com carteiras digitais compatíveis com as redes blockchain selecionadas e o processo de aquisição da criptomoeda nativa destas redes. Publicaremos guias detalhados para facilitar sua jornada!
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2 text-xl">
                  <Heart className="w-6 h-6 text-red-500" /> Apoie Diretamente e Ajude a SOSPlanet Hoje!
                </h4>
                <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                  Sua contribuição direta é fundamental para o reflorestamento, combate à fome e para impulsionar nossas iniciativas. Cada doação nos aproxima de um planeta mais saudável e justo. Obrigado!
                </p>

                <div className="space-y-4">
                  <DonationAddress 
                    coin="Bitcoin (BTC)" 
                    address="1Jez12SqdGtMQrKdTiBWWvRYB4sPY8a4S" 
                    warning="Atenção: Envie apenas BTC para este endereço."
                    copiedAddress={copiedAddress}
                    onCopy={copyToClipboard}
                  />
                  <DonationAddress 
                    coin="USDT (Redes ERC20/BEP20/Polygon etc.)" 
                    address="0x3637ff4fbcf6d91f6f6e0c4a2913e532d8b909b5" 
                    warning="Atenção: Envie apenas USDT (verifique a rede correta compatível com este endereço, como ETH, BNB, Polygon) para este endereço."
                    copiedAddress={copiedAddress}
                    onCopy={copyToClipboard}
                  />
                  <DonationAddress 
                    coin="Ethereum (ETH) e Tokens ERC20" 
                    address="0x3637ff4fbcf6d91f6f6e0c4a2913e532d8b909b5" 
                    warning="Atenção: Envie apenas ETH ou tokens ERC20 para este endereço."
                    copiedAddress={copiedAddress}
                    onCopy={copyToClipboard}
                  />
                  <DonationAddress 
                    coin="BNB (BEP20) e Tokens BEP20" 
                    address="0x3637ff4fbcf6d91f6f6e0c4a2913e532d8b909b5" 
                    warning="Atenção: Envie apenas BNB ou tokens BEP20 para este endereço."
                    copiedAddress={copiedAddress}
                    onCopy={copyToClipboard}
                  />
                  <DonationAddress 
                    coin="Algorand (ALGO)" 
                    address="JOK5TYXGOWD5NZ57ESGFECNWOSSQYXD7VUMNZAJIPXHWR2QVOPQV77MAZI" 
                    warning="Atenção: Envie apenas ALGO para este endereço."
                    copiedAddress={copiedAddress}
                    onCopy={copyToClipboard}
                  />
                </div>

                <div className="mt-8 bg-amber-50 border border-amber-200 p-5 rounded-2xl text-sm text-amber-900 leading-relaxed shadow-sm">
                  <span className="font-bold flex items-center gap-2 mb-2"><Globe className="w-4 h-4"/> Programa Guardiões Frequentes (Em Desenvolvimento):</span> 
                  Reconhecemos e valorizamos seu compromisso contínuo! Doadores regulares (ex: 3 contribuições em 30 dias) serão elegíveis a bônus especiais em SOS Tokens. Limite de bônus por ciclo (ex: 50 SOS). Detalhes completos serão anunciados em breve!
                </div>

                <div className="mt-6 p-5 border border-gray-200 bg-gray-50 rounded-2xl text-xs text-gray-600 leading-relaxed">
                  <span className="font-bold text-gray-800 block mb-1 uppercase tracking-wider text-[10px]">Aviso Importante sobre Riscos e Investimentos</span> 
                  Investir em criptoativos e participar de projetos em estágio inicial envolve riscos significativos, incluindo a volatilidade de preços e a possibilidade de perda de capital. A SOSPlanet se esforça pela transparência e pelo impacto positivo, mas é crucial que você participe com consciência, invista apenas valores que pode se permitir perder e sempre realize sua própria pesquisa (DYOR - Do Your Own Research) antes de tomar qualquer decisão financeira. Este material não constitui aconselhamento financeiro.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'futuro' && (
            <div className="p-6 md:p-8 space-y-10 animate-in fade-in duration-300">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-800">Construindo um Ecossistema Sustentável e de Impacto</h3>
                <p className="text-gray-700 leading-relaxed text-[15px]">
                  O SOS Token é projetado para ser a espinha dorsal de um ecossistema vibrante, transparente e auto-sustentável, inteiramente focado em gerar impacto positivo e duradouro para o nosso planeta e suas comunidades.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-green-200 before:to-transparent">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-green-100 text-green-700 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 font-bold">1</div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Negociação e Liquidez</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Após o lançamento e listagens planejadas, você terá a liberdade de negociar tokens. Focaremos em DEXs parceiras que compartilham valores de transparência para um ambiente justo.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-green-100 text-green-700 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 font-bold">2</div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Fortalecendo a Missão</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Cada transação e token mantido contribui ativamente para a saúde do ecossistema. Esta participação coletiva fortalece a capacidade de financiar projetos de impacto.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-green-100 text-green-700 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 font-bold">3</div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 shadow-sm">
                    <h4 className="text-lg font-bold text-green-900 mb-2">Visão de Valor Real</h4>
                    <p className="text-green-800 leading-relaxed text-sm">
                      O verdadeiro valor está ligado ao impacto no mundo real: cada árvore plantada, comunidade apoiada e mente capacitada. Este é o legado que estamos construindo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl text-center">
                <p className="text-gray-600 font-medium text-sm leading-relaxed max-w-xl mx-auto">
                  Mais detalhes sobre nossa tokenomics completa, o roadmap de desenvolvimento do ecossistema, futuras listagens e parcerias estratégicas serão divulgados em nosso <span className="font-bold text-gray-800">Whitepaper oficial</span>. Fique conectado!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions for all tabs (Newsletter etc) */}
        <div className="bg-gray-50 border-t border-gray-200 p-6 sm:p-8 flex flex-col items-center mt-auto shrink-0 z-20">
          <div className="w-full max-w-lg space-y-6">
            <div className="text-center">
              <h4 className="font-bold text-gray-900 mb-3">Mantenha-se Conectado! Seja o Primeiro a Saber!</h4>
              <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20 transition-all shadow-sm">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail para novidades..." 
                  className="bg-transparent px-4 py-3 outline-none text-sm w-full text-gray-900 placeholder:text-gray-400"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 flex items-center justify-center transition-colors">
                   Inscrever-se
                </button>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Discord</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Telegram</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">Twitter/X</a>
              </div>
            </div>
            
            {(activeTab === 'missao' || activeTab === 'participar') && (
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <h4 className="font-bold text-green-800 mb-4 flex items-center justify-center gap-2 text-sm uppercase tracking-wider"><Globe className="w-4 h-4"/> Nosso Impacto <span className="text-gray-500 lowercase normal-case">(Juntos Fazemos Acontecer!)</span></h4>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div>
                    <div className="font-black text-xl text-green-700 mb-1">5,000+</div>
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase">Árvores Plantadas</div>
                  </div>
                  <div className="border-x border-gray-200 px-2 sm:px-4">
                    <div className="font-black text-xl text-green-700 mb-1">2,500+</div>
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase">Refeições Doadas</div>
                  </div>
                  <div>
                    <div className="font-black text-xl text-green-700 mb-1">100+</div>
                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase">Projetos Apoiados</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
      </div>
      
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-medium text-sm"
          >
            <Check className="w-5 h-5 bg-white/20 rounded-full p-0.5" />
            Endereço da Carteira Copiado com Sucesso!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
