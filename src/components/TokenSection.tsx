import { CircleDollarSign, ShieldCheck, Globe, RefreshCw } from 'lucide-react';
import { Logo } from './Logo';
import { motion } from 'motion/react';

interface TokenSectionProps {
  onOpenModal?: () => void;
}

export function TokenSection({ onOpenModal }: TokenSectionProps) {
  const tokenFeatures = [
    {
      icon: <CircleDollarSign className="w-5 h-5 text-green-600" />,
      title: 'Valor com Propósito',
      description: 'O SOS Token não é apenas um investimento financeiro, mas um investimento no futuro do nosso planeta.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-green-600" />,
      title: 'Segurança Blockchain',
      description: 'Todas as transações são seguras e transparentes, garantindo que o impacto possa ser verificado.'
    },
    {
      icon: <Globe className="w-5 h-5 text-green-600" />,
      title: 'Impacto Global',
      description: 'Começando pela Amazônia, nossa visão se expande para ecossistemas em todo o mundo.'
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-green-600" />,
      title: 'Economia Circular',
      description: 'Criamos um ecossistema econômico onde o valor gerado retorna para causas ambientais e sociais.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="token" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 tracking-tight mb-6">O token SOS</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Nossa criptomoeda foi projetada com um propósito: financiar a mudança que queremos ver no mundo. Cada token representa um compromisso com nosso planeta e seu futuro.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Mini Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {tokenFeatures.map((feat, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-green-50/50 border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-default"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-4 border border-green-100 text-green-600">
                  <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.4 }}>
                    {feat.icon}
                  </motion.div>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{feat.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Big Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-[1.2] border-2 border-green-500 rounded-2xl p-8 md:p-10 shadow-lg bg-white relative hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-center mb-8">
              <Logo size="lg" className="shadow-md" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Nome do Token</span>
                <span className="text-gray-900 font-semibold text-right">Planeta SOSPlanet</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Símbolo</span>
                <span className="text-gray-900 font-semibold text-right">SOS</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Plataforma</span>
                <span className="text-gray-900 font-semibold text-right">Algorand</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium">ID do token</span>
                <span className="text-gray-900 font-semibold text-right">735028557</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Fornecimento Total</span>
                <span className="text-gray-900 font-semibold text-right">1.000.000.000 SOS</span>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="text-gray-600 font-medium">Status</span>
                <span className="text-green-600 font-semibold text-right">Ativo</span>
              </div>
            </div>

            <div className="mt-8 bg-green-50 p-4 rounded-xl text-center">
              <p className="text-green-800 font-medium text-sm">
                10% de cada transação é direcionado para projetos de reflorestamento e ações sociais
              </p>
            </div>
            
            <div className="mt-6 flex justify-center">
              <a href="#" className="text-green-600 font-medium hover:text-green-800 text-sm flex items-center gap-1 transition-colors">
                Ver no Algorand Explorer <RefreshCw className="w-3 h-3 ml-1" />
              </a>
            </div>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex items-center gap-4 text-sm font-medium"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenModal}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-md transition-colors shadow-sm"
          >
            Comprar Token SOS
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-green-500 text-green-700 hover:bg-green-50 px-6 py-2.5 rounded-md transition-colors"
          >
            Relatório técnico
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
