import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const faqs = [
  {
    question: "Como o blockchain ajuda a Amazônia?",
    answer: "O blockchain oferece transparência total e rastreabilidade irrefutável. Cada etapa de investimento em projetos de reflorestamento é registrada e auditável publicamente, garantindo que a ajuda chegue ao local exato, sem intermediários opacos."
  },
  {
    question: "O que é a Central do Orquestrador e o Nexus?",
    answer: "A Central do Orquestrador é a nossa interface de comunicação com o 'Nexus', a inteligência artificial central do SOSPlanet. Ela servirá como um painel onde a comunidade poderá ver, em tempo real, quais regiões ecológicas estão recebendo intervenções e interagir inteligentemente com o ecossistema."
  },
  {
    question: "Como a economia circular do SOSPlanet funciona?",
    answer: "Parte das transações do nosso Token SOS alimenta diretamente o fundo de impacto. Esses recursos são alocados em ações ambientais, projetos sociais e inovação. O impacto gera reconhecimento, que atrai mais participantes, valorizando o ecossistema num ciclo contínuo sustentável."
  },
  {
    question: "Como posso adquirir e apoiar o projeto?",
    answer: "Nosso projeto está estruturado na robusta e ecológica blockchain Algorand. O Token SOS pode ser acompanhado usando o ID do ativo. Para apoiar, você pode interagir com o endereço da central ou aguardar o lançamento completo das ferramentas de dApp de impacto."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <section className="py-24 px-6 bg-white dark:bg-[#0b1410] transition-colors relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-green-400">Eco-FAQ</h2>
          <p className="text-gray-600 dark:text-green-100/70 text-lg">
            Esclareça suas dúvidas sobre o ecossistema SOSPlanet Sustentável e nosso propósito de regeneração.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-gray-100 dark:border-green-900/40 rounded-2xl bg-gray-50/50 dark:bg-[#111f18]/60 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-2xl"
              >
                <span className="font-semibold text-gray-900 dark:text-green-50 pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="shrink-0 w-8 h-8 flex flex-col items-center justify-center rounded-full bg-white dark:bg-[#0b1410] shadow-sm border border-gray-100 dark:border-green-900/30 text-green-600 dark:text-green-400"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 text-gray-600 dark:text-green-100/60 leading-relaxed border-t border-gray-100 dark:border-green-900/20 max-w-2xl">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
