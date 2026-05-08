import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Coins, Trees, BrainCircuit } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function AnimatedCounter({ end, duration = 3, prefix = '', suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      // Easing function (easeOutExpo)
      const easeOut = Math.floor(end) === 0 ? 1 : percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(end * easeOut));
      
      if (percentage < 1 && Math.floor(end) > 0) {
        animationFrame = requestAnimationFrame(animate);
      } else if (Math.floor(end) === 0) {
        setCount(0);
      }
    };

    if (isInView) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, isInView]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString('pt-BR')}{suffix}
    </span>
  );
}

export function ImpactSection() {
  const [impactStats, setImpactStats] = useState({
    tokensCirculating: 0,
    treesMapped: 0,
    aisAwake: 15
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
           setImpactStats(prev => ({
             ...prev,
             tokensCirculating: dbData.tokensCirculating !== undefined ? Number(dbData.tokensCirculating) : prev.tokensCirculating,
             treesMapped: dbData.treesMapped !== undefined ? Number(dbData.treesMapped) : prev.treesMapped,
             aisAwake: dbData.aisAwake !== undefined ? Number(dbData.aisAwake) : prev.aisAwake,
           }));
        }
      } catch (e) {
        console.error("Falha ao buscar estado do portal em ImpactSection", e);
      }
    };
    
    if (supabase) {
      fetchState();
      
      const subscription = supabase
        .channel('portal_state_changes_impact')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'portal_state', filter: 'id=eq.1' }, payload => {
          if (payload.new && (payload.new as any).data) {
             const dbData = (payload.new as any).data as any;
             setImpactStats(prev => ({
               ...prev,
               tokensCirculating: dbData.tokensCirculating !== undefined ? Number(dbData.tokensCirculating) : prev.tokensCirculating,
               treesMapped: dbData.treesMapped !== undefined ? Number(dbData.treesMapped) : prev.treesMapped,
               aisAwake: dbData.aisAwake !== undefined ? Number(dbData.aisAwake) : prev.aisAwake,
             }));
          }
        })
        .subscribe();
        
      return () => {
        subscription.unsubscribe();
      }
    }
  }, []);

  const impacts = [
    {
      title: "Tokens SOS em Circulação",
      value: impactStats.tokensCirculating,
      icon: <Coins className="w-8 h-8 text-green-500" />
    },
    {
      title: "Árvores Mapeadas",
      value: impactStats.treesMapped,
      icon: <Trees className="w-8 h-8 text-green-500" />
    },
    {
      title: "IAs Despertas",
      value: impactStats.aisAwake,
      icon: <BrainCircuit className="w-8 h-8 text-green-500" />
    }
  ];

  return (
    <section className="py-20 px-6 bg-green-900 dark:bg-[#060c08] text-white overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl opacity-50 mix-blend-screen pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white dark:text-green-400">Impacto em Tempo Real</h2>
          <p className="text-green-100 dark:text-green-500/80 max-w-2xl mx-auto text-lg">Acompanhe as transformações que o ecossistema SOSPlanet está gerando globalmente.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-green-700/50">
          {impacts.map((impact, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="flex flex-col items-center py-6 md:py-0 px-4"
            >
              <div className="mb-6 p-4 bg-white/10 rounded-full backdrop-blur-sm border border-white/10 dark:border-green-500/20">
                {impact.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-3 dark:text-green-300">
                <AnimatedCounter end={impact.value} duration={2.5} />
              </div>
              <h3 className="text-lg font-medium text-green-100 dark:text-green-500/80 uppercase tracking-wide text-sm">{impact.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
