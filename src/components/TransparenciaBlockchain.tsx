import { motion } from 'motion/react';
import { ShieldCheck, Activity, Link as LinkIcon, Database, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';

interface Transaction {
  id: string;
  type: 'in' | 'out';
  amount: string;
  date: string;
  description: string;
  txId: string;
}

export function TransparenciaBlockchain() {
  const [copied, setCopied] = useState(false);
  // Fake Algorand address for display
  const daoAddress = "SOSX...9A2Z";
  
  const transactions: Transaction[] = [
    {
      id: "tx1",
      type: "in",
      amount: "+150,000 SOS",
      date: "08 Mai 2026",
      description: "Aporte da Comunidade - Fase 2",
      txId: "H7KL...M9OP"
    },
    {
      id: "tx2",
      type: "out",
      amount: "-45,000 SOS",
      date: "05 Mai 2026",
      description: "Financiamento Projeto Reflorestamento AMZ",
      txId: "B2XZ...C4WE"
    },
    {
      id: "tx3",
      type: "in",
      amount: "+32,500 SOS",
      date: "01 Mai 2026",
      description: "Taxa Ecológica da Rede",
      txId: "R9TY...V1QS"
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText("SOSXQPO2Z3VNY3C5N7TWWFGHJ2FPT23XQRWZKUBB45M3R3A2ZW9A2Z");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="transparencia" className="py-24 px-6 bg-[#040806] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-green-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 border border-green-800/50 text-green-400 text-sm font-mono mb-6">
            <Database className="w-4 h-4" />
            <span>A Lente da Verdade</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">Transparência <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Blockchain</span></h2>
          <p className="text-xl text-green-100/70 max-w-4xl mx-auto leading-relaxed">
            Nossa Tesouraria/DAO Opera na rede Algorand. Cada transação é imutável, pública e requer o consentimento da rede. Ninguém mexe no baú sem aprovação.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* DAO Wallet Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col space-y-6"
          >
            <div className="bg-[#0b1410] border border-green-900/40 rounded-3xl p-8 h-full relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 text-green-500 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
                  <Wallet className="w-32 h-32" />
               </div>
               <div className="relative z-10">
                 <h3 className="text-green-500 font-mono text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                   <ShieldCheck className="w-4 h-4" />
                   Cofre Público
                 </h3>
                 <div className="text-4xl font-bold text-white mb-2">2.5M <span className="text-lg text-green-600">SOS</span></div>
                 <p className="text-sm text-green-100/50 mb-8">Saldo atual da Tesouraria</p>

                 <div className="space-y-4">
                   <div>
                     <p className="text-xs text-green-100/40 font-mono mb-1">Endereço da DAO</p>
                     <div 
                       onClick={handleCopy}
                       className="flex items-center justify-between bg-black/50 border border-green-900/30 rounded-xl p-3 cursor-pointer hover:border-green-500/50 transition-colors"
                     >
                       <span className="font-mono text-sm text-green-300">{daoAddress}</span>
                       <span className="text-xs text-green-600 font-bold">{copied ? 'Copiado!' : 'Copiar'}</span>
                     </div>
                   </div>
                   
                   <button className="w-full flex items-center justify-center gap-2 bg-green-950/40 hover:bg-green-900/40 border border-green-800/50 text-green-400 py-3 rounded-xl transition-colors font-medium">
                     <LinkIcon className="w-4 h-4" />
                     Ver no Pera Explorer
                   </button>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Transactions Ledger */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8"
          >
            <div className="bg-[#0b1410] border border-green-900/40 rounded-3xl p-8 h-full">
              <div className="flex justify-between items-center mb-8 border-b border-green-900/30 pb-4">
                 <h3 className="text-xl font-bold text-white flex items-center gap-2">
                   <Activity className="w-5 h-5 text-green-500" />
                   Ledger de Movimentações
                 </h3>
                 <span className="text-xs font-mono text-green-400/60 bg-green-950/30 px-2 py-1 rounded border border-green-900/30">Atualização em Tempo Real</span>
              </div>

              <div className="space-y-4">
                {transactions.map((tx, idx) => (
                  <motion.div 
                    key={tx.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-2xl border border-green-900/20 bg-black/20 hover:bg-black/40 hover:border-green-800/50 transition-colors gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border",
                        tx.type === 'in' 
                          ? "bg-green-950 border-green-800 text-green-400" 
                          : "bg-orange-950 border-orange-800 text-orange-400"
                      )}>
                        {tx.type === 'in' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-white font-medium">{tx.description}</p>
                        <div className="flex text-xs text-green-100/40 font-mono mt-1 gap-3">
                          <span>{tx.date}</span>
                          <span>TxID: {tx.txId}</span>
                        </div>
                      </div>
                    </div>
                    <div className={cn(
                      "font-mono font-bold whitespace-nowrap",
                      tx.type === 'in' ? "text-green-400" : "text-white"
                    )}>
                      {tx.amount}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                 <button className="text-sm font-medium text-green-500 hover:text-green-400 transition-colors">
                   Carregar mais transações
                 </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
