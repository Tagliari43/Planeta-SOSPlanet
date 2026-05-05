import { useEffect, useState } from 'react';
import { CircleDollarSign, ShieldCheck, Globe, RefreshCw } from 'lucide-react';
import { Logo } from './Logo';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { supabase } from '../lib/supabase';

interface TokenSectionProps {
  onOpenModal?: () => void;
}

const tokenomicsData = [
  { name: 'Reflorestamento', value: 40, color: '#16a34a' }, // green-600
  { name: 'Projetos Sociais', value: 30, color: '#22c55e' }, // green-500
  { name: 'Liquidez/Ecossistema', value: 20, color: '#d97706' }, // amber-600 (earthy)
  { name: 'Inovação', value: 10, color: '#ca8a04' }, // yellow-600 (gold)
];

export function TokenSection({ onOpenModal }: TokenSectionProps) {
  const [tokenStats, setTokenStats] = useState({
    nome: 'Planeta SOSPlanet',
    simbolo: 'SOS',
    plataforma: 'Algorand',
    id: '735028557',
    fornecimentoTotal: '1.000.000.000 SOS',
    status: 'Ativo'
  });

  useEffect(() => {
    const fetchState = async () => {
      try {
        if (!supabase) return;
        const { data, error } = await supabase
          .from('portal_state')
          .select('data')
          .eq('id', 1)
          .single();
        
        if (data && data.data && !error) {
           const dbData = data.data as any;
           setTokenStats(prevState => ({ 
             ...prevState, 
             ...dbData,
             ...(dbData.tokenSupply && { fornecimentoTotal: dbData.tokenSupply }),
             ...(dbData.tokenSymbol && { simbolo: dbData.tokenSymbol }),
             ...(dbData.tokenPlatform && { plataforma: dbData.tokenPlatform })
           }));
        }
      } catch (e) {
        console.error("Falha ao buscar estado do portal em Token", e);
      }
    };
    
    if (supabase) {
      fetchState();
      
      const subscription = supabase
        .channel('portal_state_changes_token')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'portal_state', filter: 'id=eq.1' }, payload => {
          if (payload.new && payload.new.data) {
             const dbData = payload.new.data as any;
             setTokenStats(prevState => ({ 
               ...prevState, 
               ...dbData,
               ...(dbData.tokenSupply && { fornecimentoTotal: dbData.tokenSupply }),
               ...(dbData.tokenSymbol && { simbolo: dbData.tokenSymbol }),
               ...(dbData.tokenPlatform && { plataforma: dbData.tokenPlatform })
             }));
          }
        })
        .subscribe();
        
      return () => {
        subscription.unsubscribe();
      }
    }
  }, []);
  const tokenFeatures = [
    {
      icon: <CircleDollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />,
      title: 'Valor com Propósito',
      description: 'O SOS Token não é apenas um investimento financeiro, mas um investimento no futuro do nosso planeta.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400" />,
      title: 'Segurança Blockchain',
      description: 'Todas as transações são seguras e transparentes, garantindo que o impacto possa ser verificado.'
    },
    {
      icon: <Globe className="w-5 h-5 text-green-600 dark:text-green-400" />,
      title: 'Impacto Global',
      description: 'Começando pela Amazônia, nossa visão se expande para ecossistemas em todo o mundo.'
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-green-600 dark:text-green-400" />,
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
    <section id="token" className="py-24 px-6 bg-white dark:bg-[#0b1410] overflow-hidden transition-colors">
      <div className="max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 dark:text-green-400 tracking-tight mb-6">O token SOS</h2>
          <p className="text-xl text-gray-600 dark:text-green-100/80 max-w-4xl mx-auto leading-relaxed">
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
                className="bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-default"
              >
                <div className="w-10 h-10 rounded-full bg-white dark:bg-[#111f18] flex items-center justify-center shadow-sm mb-4 border border-green-100 dark:border-green-800/50 text-green-600 dark:text-green-400">
                  <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.4 }}>
                    {feat.icon}
                  </motion.div>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-green-200 mb-2">{feat.title}</h4>
                <p className="text-gray-600 dark:text-green-100/60 text-sm leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Big Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-[1.2] border-2 border-green-500 dark:border-green-600/50 rounded-2xl p-8 md:p-10 shadow-lg bg-white dark:bg-[#0b1410] relative hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-center mb-8">
              <Logo size="lg" className="shadow-md" />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-green-900/30">
                <span className="text-gray-600 dark:text-green-100/70 font-medium">Nome do Token</span>
                <span className="text-gray-900 dark:text-green-50 font-semibold text-right">{tokenStats.nome || "Planeta SOSPlanet"}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-green-900/30">
                <span className="text-gray-600 dark:text-green-100/70 font-medium">Símbolo</span>
                <span className="text-gray-900 dark:text-green-50 font-semibold text-right">{tokenStats.simbolo || "SOS"}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-green-900/30">
                <span className="text-gray-600 dark:text-green-100/70 font-medium">Plataforma</span>
                <span className="text-gray-900 dark:text-green-50 font-semibold text-right">{tokenStats.plataforma || "Algorand"}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-green-900/30">
                <span className="text-gray-600 dark:text-green-100/70 font-medium">ID do token</span>
                <span className="text-gray-900 dark:text-green-50 font-semibold text-right">{tokenStats.id || "735028557"}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-green-900/30">
                <span className="text-gray-600 dark:text-green-100/70 font-medium">Fornecimento Total</span>
                <span className="text-gray-900 dark:text-green-50 font-semibold text-right">{tokenStats.fornecimentoTotal || "1.000.000.000 SOS"}</span>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="text-gray-600 dark:text-green-100/70 font-medium">Status</span>
                <span className="text-green-600 dark:text-green-400 font-semibold text-right">{tokenStats.status || "Ativo"}</span>
              </div>
            </div>

            <div className="mt-8 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center">
              <p className="text-green-800 dark:text-green-300 font-medium text-sm">
                10% de cada transação é direcionado para projetos de reflorestamento e ações sociais
              </p>
            </div>
            
            <div className="mt-6 flex justify-center">
              <a href="#" className="text-green-600 dark:text-green-400 font-medium hover:text-green-800 dark:hover:text-green-300 text-sm flex items-center gap-1 transition-colors">
                Ver no Algorand Explorer <RefreshCw className="w-3 h-3 ml-1" />
              </a>
            </div>
          </motion.div>

        </div>

        {/* Tokenomics Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-green-400 tracking-tight">A Anatomia do Token</h3>
            <p className="text-gray-600 dark:text-green-100/70 mt-3 max-w-2xl mx-auto">Distribuição visual e transparente dos recursos do ecossistema SOSPlanet.</p>
          </div>
          
          <div className="bg-white dark:bg-[#111f18]/50 border border-gray-100 dark:border-green-900/30 rounded-3xl p-6 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="w-full md:w-1/2 h-[300px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#1f2937', fontWeight: 500 }}
                  />
                  <Pie
                    data={tokenomicsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={3}
                    dataKey="value"
                    animationDuration={1500}
                    animationBegin={200}
                  >
                    {tokenomicsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity duration-300 outline-none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full md:w-1/2 space-y-6">
              {tokenomicsData.map((item, idx) => (
                <div key={idx} className="flex items-center group">
                  <div className="w-4 h-4 rounded-full mr-4 shrink-0 transition-transform group-hover:scale-125" style={{ backgroundColor: item.color }}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-gray-800 dark:text-green-50">{item.name}</span>
                      <span className="font-bold text-gray-900 dark:text-green-300">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-4 text-sm font-medium"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenModal}
            className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white px-6 py-2.5 rounded-md transition-colors shadow-sm"
          >
            Apoiar Nação
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-green-500 dark:border-green-700 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 px-6 py-2.5 rounded-md transition-colors"
          >
            Relatório técnico
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
