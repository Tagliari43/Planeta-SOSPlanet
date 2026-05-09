import { motion } from 'motion/react';
import { Vote, CheckCircle2, XCircle, AlertCircle, Users } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'executed' | 'rejected';
  yes_votes: number;
  no_votes: number;
  created_at?: string;
  end_date?: string;
}

const fallbackProposals: Proposal[] = [
  {
    id: "prop-1",
    title: "Expansão do Santuário para a Floresta do Congo",
    description: "Alocar 15% do fundo de regeneração para iniciar o plantio na bacia do Congo com ONGs parceiras que possuem histórico comprovado de regeneração.",
    status: "active",
    yes_votes: 145000,
    no_votes: 12000,
    end_date: "2026-06-01"
  },
  {
    id: "prop-2",
    title: "Atualização da Taxa de Sustentabilidade",
    description: "Alterar a taxa algorítmica de transação de 1% para 1.5% durante ciclos de seca severa nas florestas globais para focar em combate a incêndios.",
    status: "executed",
    yes_votes: 450000,
    no_votes: 350000
  },
  {
    id: "prop-3",
    title: "Parceria Corporativa de Carbono Neutral GCorp",
    description: "Permitir que a GCorp utilize nossos tokens SOS para neutralizar emissões, injetando 5M de liquidez na DAO.",
    status: "rejected",
    yes_votes: 80000,
    no_votes: 520000
  }
];

export function DaoGovernance() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        if (!supabase) return;
        const { data, error } = await supabase
          .from('dao_proposals')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Erro ao buscar dao_proposals:", error);
          setProposals(fallbackProposals);
        } else if (data && data.length > 0) {
          setProposals(data as Proposal[]);
        } else {
          setProposals(fallbackProposals);
        }
      } catch (err) {
        console.error("Supabase fail:", err);
        setProposals(fallbackProposals);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();

    if (supabase) {
      const sub = supabase
        .channel('dao_proposals_updates')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'dao_proposals' }, payload => {
          fetchProposals();
        })
        .subscribe();
      return () => { sub.unsubscribe(); };
    }
  }, []);

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'active':
        return { icon: <AlertCircle className="w-4 h-4" />, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30', label: 'Em Votação' };
      case 'executed':
        return { icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', label: 'Aprovada & Executada' };
      case 'rejected':
        return { icon: <XCircle className="w-4 h-4" />, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30', label: 'Rejeitada' };
      default:
        return { icon: <AlertCircle />, color: 'text-gray-500', bg: 'bg-gray-500/10', border: 'border-gray-500/30', label: status };
    }
  };

  return (
    <section id="governato" className="py-24 px-6 bg-[#020503] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 flex justify-center opacity-5 pointer-events-none">
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-green-500 to-transparent"></div>
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-green-500 to-transparent ml-64"></div>
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-green-500 to-transparent -ml-64"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 border border-green-800/50 text-green-400 text-sm font-mono mb-6">
            <Vote className="w-4 h-4" />
            <span>Governança Descentralizada</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">A <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Voz</span> do Coletivo</h2>
          <p className="text-xl text-green-100/70 max-w-2xl mx-auto leading-relaxed">
            Aqui o futuro da nação SOS é forjado. Propostas, debates e votos on-chain onde cada Guardião molda os próximos passos.
          </p>
        </motion.div>

        <div className="space-y-6">
          {!loading && proposals.map((prop, idx) => {
            const statusConfig = getStatusConfig(prop.status);
            const totalVotes = (prop.yes_votes || 0) + (prop.no_votes || 0);
            const yesPercentage = totalVotes > 0 ? Math.round(((prop.yes_votes || 0) / totalVotes) * 100) : 0;
            const noPercentage = totalVotes > 0 ? 100 - yesPercentage : 0;

            return (
              <motion.div 
                key={prop.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#0b1410] border border-green-900/30 rounded-3xl p-6 md:p-8 hover:border-green-800/60 transition-colors shadow-black/50 shadow-xl"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={cn("px-3 py-1 rounded-full border text-xs font-bold font-mono tracking-wide flex items-center gap-1.5", statusConfig.bg, statusConfig.border, statusConfig.color)}>
                        {statusConfig.icon} {statusConfig.label}
                      </span>
                      {prop.status === 'active' && prop.end_date && (
                        <span className="text-xs font-mono text-green-100/40">Acaba em {new Date(prop.end_date).toLocaleDateString()}</span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{prop.title}</h3>
                    <p className="text-green-100/60 leading-relaxed text-sm md:text-base">{prop.description}</p>
                  </div>
                  
                  {prop.status === 'active' && (
                    <div className="md:w-48 flex-shrink-0">
                      <button className="w-full bg-green-500 hover:bg-green-600 text-[#0b1410] font-bold py-3 rounded-xl transition-colors shadow-[0_0_20px_rgba(34,197,94,0.3)] shadow-green-500/20 active:scale-95 flex items-center justify-center gap-2">
                        <Vote className="w-4 h-4" />
                        Votar Agora
                      </button>
                      <p className="text-center text-xs text-green-100/30 mt-3 font-mono">Requer Carteira Conectada</p>
                    </div>
                  )}
                </div>

                {/* Progress Bar Area */}
                <div className="pt-6 border-t border-green-900/40">
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-500" />
                      <span className="text-green-100/80 font-mono font-medium text-sm">
                        {totalVotes.toLocaleString('pt-BR')} <span className="text-green-100/40 text-xs">poder votante</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-full h-3 flex rounded-full overflow-hidden border border-green-900/50 bg-black">
                     <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: `${yesPercentage}%` }}
                       viewport={{ once: true }}
                       transition={{ duration: 1, delay: 0.2 }}
                       className="h-full bg-emerald-500"
                     ></motion.div>
                     <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: `${noPercentage}%` }}
                       viewport={{ once: true }}
                       transition={{ duration: 1, delay: 0.2 }}
                       className="h-full bg-red-500/80"
                     ></motion.div>
                  </div>
                  
                  <div className="flex justify-between mt-2 font-mono text-xs">
                    <span className="text-emerald-400 font-bold">{yesPercentage}% Sim</span>
                    <span className="text-red-400 font-bold">{noPercentage}% Não</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center flex justify-center">
           <button className="text-green-500 font-mono font-medium border border-green-900/50 px-6 py-2 rounded-full hover:bg-green-900/20 transition-colors">
              Ver Histórico Completo
           </button>
        </div>
      </div>
    </section>
  );
}
