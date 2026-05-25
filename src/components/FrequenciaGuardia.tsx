import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RadioReceiver, Radio, Send, MapPin, AlertTriangle, Fingerprint, Sparkles, AudioWaveform, Wifi } from 'lucide-react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  sender: string;
  senderRank: string;
  text: string;
  type: 'message' | 'alert';
  timestamp: string;
  isSelf: boolean;
  biome?: string;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg_1',
    sender: 'Lumina',
    senderRank: 'Broto Resiliente',
    text: 'A umidade no setor leste voltou ao normal após as missões hídricas. Agradeço aos Guardiões locais!',
    type: 'message',
    timestamp: '14:23',
    isSelf: false,
  },
  {
    id: 'msg_2',
    sender: 'Kael',
    senderRank: 'Árvore da Vida',
    text: 'Guardiões do Sul, agrupamento na Zona 4 amanhã ao amanhecer para manejo do solo.',
    type: 'message',
    timestamp: '14:31',
    isSelf: false,
  },
  {
    id: 'msg_alert_1',
    sender: '0x9a...2b44',
    senderRank: 'Semente Estelar',
    text: 'Guardião no Cerrado solicita apoio para plantio! Foco em leguminosas.',
    type: 'alert',
    timestamp: '14:45',
    isSelf: false,
    biome: 'Cerrado'
  }
];

export function FrequenciaGuardia() {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsTransmitting(true);
    
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'Eder Tagliari', // Usuário Atual
        senderRank: 'Guardião Primordial',
        text: inputText,
        type: 'message',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: true
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      setIsTransmitting(false);
    }, 800);
  };

  const handlePingAction = () => {
    setIsTransmitting(true);
    
    setTimeout(() => {
      const newAlert: Message = {
        id: Date.now().toString(),
        sender: 'Eder Tagliari',
        senderRank: 'Guardião Primordial',
        text: 'Guardião convoca apoio para ação ecológica urgente na sua região!',
        type: 'alert',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: true,
        biome: 'Oceano Local'
      };
      
      setMessages(prev => [...prev, newAlert]);
      setIsTransmitting(false);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto h-[80vh] min-h-[600px] flex flex-col pb-10"
    >
      {/* Header - A Frequência */}
      <div className="bg-[#020d14]/90 backdrop-blur-xl rounded-t-3xl p-6 border border-cyan-900/40 relative overflow-hidden flex-shrink-0 z-10 flex items-center justify-between">
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
        
        <div className="flex items-center gap-4">
           <div className="w-14 h-14 rounded-full border-2 border-cyan-500/30 flex items-center justify-center relative overflow-hidden bg-cyan-950/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <div className="absolute inset-0 bg-cyan-400/20 animate-ping opacity-20" />
              <RadioReceiver className="w-6 h-6 text-cyan-400" />
           </div>
           <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                 Frequência Guardiã
                 <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-mono border border-emerald-500/30">
                    <Wifi className="w-3 h-3" /> ON-AIR
                 </div>
              </h2>
              <p className="text-cyan-200/60 text-sm">Central Global P2P • Escutando a malha da Terra</p>
           </div>
        </div>

        <div className="hidden md:flex flex-col items-end">
           <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: ['4px', '24px', '4px'] }}
                  transition={{ duration: 1 + Math.random(), repeat: Infinity, delay: Math.random() }}
                  className="w-1.5 bg-cyan-500/50 rounded-full"
                />
              ))}
           </div>
           <span className="text-[10px] text-cyan-500/50 font-mono tracking-widest">SINAL FORTE</span>
        </div>
      </div>

      {/* Área de Chat (Radar View) */}
      <div className="flex-1 bg-gradient-to-b from-[#020d14]/90 to-[#041a1a]/90 backdrop-blur-md border-x border-cyan-900/40 overflow-y-auto p-6 space-y-6 relative scrollbar-thin scrollbar-thumb-cyan-900/50 scrollbar-track-transparent">
         {/* Background elements */}
         <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(6,182,212,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
         <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
         
         {/* Radar sweep effect */}
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full overflow-hidden pointer-events-none opacity-10"
         >
           <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-cyan-500 origin-right" />
         </motion.div>

         {/* Rendering Messages */}
         <AnimatePresence>
            {messages.map((msg) => {
               if (msg.type === 'alert') {
                  return (
                     <motion.div 
                       key={msg.id}
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="w-full flex justify-center my-6 relative z-10"
                     >
                        <div className="bg-orange-950/60 border border-orange-500/50 rounded-2xl p-4 max-w-lg w-full shadow-[0_0_30px_rgba(249,115,22,0.15)] flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left relative overflow-hidden group">
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                           <div className="w-12 h-12 rounded-full bg-orange-900/50 flex items-center justify-center shrink-0 border border-orange-500/40 relative">
                              <div className="absolute inset-0 rounded-full border border-orange-400 animate-ping opacity-40" />
                              <AlertTriangle className="w-6 h-6 text-orange-400" />
                           </div>
                           <div className="flex-1">
                              <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                                 <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Alerta P2P</span>
                                 <span className="text-[10px] text-gray-400">({msg.timestamp})</span>
                              </div>
                              <p className="text-orange-50 font-medium mb-2">{msg.text}</p>
                              <div className="flex items-center gap-4 justify-center md:justify-start text-[10px] font-mono text-orange-300/70">
                                 <span className="flex items-center gap-1"><Fingerprint className="w-3 h-3" /> {msg.sender}</span>
                                 {msg.biome && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {msg.biome}</span>}
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  );
               }

               return (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex w-full relative z-10", msg.isSelf ? "justify-end" : "justify-start")}
                  >
                     <div className={cn(
                        "max-w-[85%] md:max-w-md rounded-2xl p-4 relative group", 
                        msg.isSelf 
                          ? "bg-cyan-950/60 border border-cyan-500/30 rounded-tr-none shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
                          : "bg-emerald-950/40 border border-emerald-900/50 rounded-tl-none backdrop-blur-sm"
                     )}>
                        {/* Audio Wave Particles for self messages */}
                        {msg.isSelf && (
                           <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <AudioWaveform className="w-4 h-4 text-cyan-400/50" />
                           </div>
                        )}
                        {!msg.isSelf && (
                           <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Sparkles className="w-4 h-4 text-emerald-400/50" />
                           </div>
                        )}

                        <div className="flex justify-between items-center mb-2">
                           <div className="flex items-center gap-2">
                              {msg.isSelf ? (
                                <Fingerprint className="w-3 h-3 text-cyan-500" />
                              ) : (
                                <Radio className="w-3 h-3 text-emerald-500" />
                              )}
                              <span className={cn("text-xs font-bold font-mono", msg.isSelf ? "text-cyan-300" : "text-emerald-400")}>
                                 {msg.sender}
                              </span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded border bg-black/40 text-gray-400 border-white/5 uppercase">
                                 {msg.senderRank}
                              </span>
                           </div>
                           <span className="text-[10px] text-gray-500 font-mono">{msg.timestamp}</span>
                        </div>
                        <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                     </div>
                  </motion.div>
               );
            })}
         </AnimatePresence>
         <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-[#0A1015]/95 backdrop-blur-xl rounded-b-3xl p-4 md:p-6 border border-cyan-900/40 relative z-20 flex-shrink-0">
         <div className="flex flex-col md:flex-row gap-4 items-center">
            
            <button 
               onClick={handlePingAction}
               disabled={isTransmitting}
               className="w-full md:w-auto flex items-center justify-center gap-2 bg-orange-950/40 hover:bg-orange-900/60 border border-orange-500/50 text-orange-400 text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-xl transition-all disabled:opacity-50"
            >
               <AlertTriangle className="w-4 h-4" /> Convocar Ação
            </button>

            <form onSubmit={handleSendMessage} className="flex-1 flex gap-2 w-full relative group">
               <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <AudioWaveform className={cn("w-4 h-4 transition-colors", isTransmitting ? "text-cyan-400 animate-pulse" : "text-gray-600")} />
               </div>
               <input 
                 type="text" 
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 disabled={isTransmitting}
                 placeholder="Transmita uma mensagem para a Frequência Guardiã..."
                 className="flex-1 bg-black/50 border border-cyan-900/50 hover:border-cyan-700 focus:border-cyan-500 rounded-xl py-3 pl-10 pr-4 text-cyan-50 placeholder-cyan-800/50 outline-none transition-all font-medium disabled:opacity-50"
               />
               <button 
                 type="submit"
                 disabled={isTransmitting || !inputText.trim()}
                 className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-900/50 text-white p-3 rounded-xl transition-colors shrink-0 flex items-center justify-center disabled:opacity-50"
               >
                 <Send className="w-5 h-5" />
               </button>
            </form>
         </div>
      </div>
    </motion.div>
  );
}
