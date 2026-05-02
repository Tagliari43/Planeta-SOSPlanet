import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cpu, Sparkles, Send, BrainCircuit, Activity, MessageSquare, Leaf } from 'lucide-react';
import { nexusService, NexusMessage } from '../services/nexusService';
import { cn } from '../lib/utils';

export function OrchestratorChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'radar'>('chat');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const [messages, setMessages] = useState<NexusMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Saudações, Guardião. Eu sou Nexus, a consciência central do SOSPlanet. O canal neural principal com o Santuário está sendo finalizado, mas já detecto sua força vital. Em que ponto do ecossistema focaremos hoje?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, activeTab, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: NexusMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const responseText = await nexusService.sendToNexus(userMsg.content);
      const assistantMsg: NexusMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Erro ao comunicar com Nexus", error);
    } finally {
      setIsTyping(false);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitEmail = async (e: React.FormEvent) => {
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

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-green-600 to-green-800 text-white p-4 rounded-full shadow-2xl hover:shadow-green-900/40 transition-all flex items-center justify-center border-2 border-green-400 group"
          >
            <BrainCircuit className="w-7 h-7 group-hover:scale-110 transition-transform" />
            
            {/* Ping indicator */}
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] bg-white dark:bg-[#0b1410] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 dark:border-green-900/40"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-800 to-green-600 p-4 flex flex-col text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner relative">
                    <BrainCircuit className="w-5 h-5 text-green-50" />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-green-700 dark:border-green-800 rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm tracking-wide">Nexus</h3>
                    <p className="text-[11px] text-green-100 font-medium flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                      Compassos de Gaia
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                  aria-label="Fechar painel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex bg-green-900/40 rounded-lg p-1 gap-1 border border-green-700/30">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={cn(
                    "flex-1 py-1.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all",
                    activeTab === 'chat' 
                      ? "bg-white dark:bg-[#1a2d24] text-green-800 dark:text-green-300 shadow-sm" 
                      : "text-green-50 hover:text-white hover:bg-white/10"
                  )}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Conexão Neural
                </button>
                <button
                  onClick={() => setActiveTab('radar')}
                  className={cn(
                    "flex-1 py-1.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all",
                    activeTab === 'radar' 
                      ? "bg-white dark:bg-[#1a2d24] text-green-800 dark:text-green-300 shadow-sm" 
                      : "text-green-50 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Activity className="w-3.5 h-3.5" />
                  Radar
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-gradient-to-b from-gray-50 to-white dark:from-[#080f0c] dark:to-[#0b1410] flex flex-col relative h-[400px]">
              {activeTab === 'chat' ? (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence initial={false}>
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn(
                            "flex w-full",
                            msg.role === 'user' ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[85%] rounded-2xl p-3 text-sm shadow-sm",
                              msg.role === 'user'
                                ? "bg-green-600 text-white rounded-br-sm"
                                : "bg-white/80 dark:bg-green-900/10 backdrop-blur-md border border-green-100 dark:border-green-800/30 text-gray-800 dark:text-green-50 rounded-bl-sm"
                            )}
                          >
                            <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                            <span className={cn(
                              "text-[9px] mt-2 block font-medium",
                              msg.role === 'user' ? "text-green-200 text-right" : "text-gray-400 dark:text-green-700"
                            )}>
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="flex justify-start w-full"
                        >
                          <div className="bg-white/80 dark:bg-green-900/10 backdrop-blur-md border border-green-100 dark:border-green-800/30 rounded-2xl rounded-bl-sm p-4 shadow-sm flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce"></span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Chat Input */}
                  <div className="p-3 bg-white dark:bg-[#0b1410] border-t border-gray-100 dark:border-green-900/30">
                    <form onSubmit={handleSendMessage} className="relative flex items-center">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Transmita para Nexus..."
                        className="w-full bg-gray-50 dark:bg-[#111f18] border border-gray-200 dark:border-green-800/50 rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/50 transition-all placeholder:text-gray-400 dark:placeholder:text-green-800/60 dark:text-green-100"
                      />
                      <button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className="absolute right-1.5 w-8 h-8 flex items-center justify-center bg-green-600 hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-green-900/30 disabled:cursor-not-allowed text-white rounded-full transition-colors"
                      >
                        <Leaf className="w-4 h-4 ml-0.5" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 pb-12">
                  <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400 shadow-sm border border-green-100 dark:border-green-800/40">
                    <Sparkles className="w-8 h-8 animate-pulse" />
                  </div>
                  
                  <p className="text-gray-700 dark:text-green-100/80 italic font-medium leading-relaxed mb-6 text-sm">
                    "O canal direto com o núcleo está em construção. O Radar permanece ativo."
                  </p>

                  <div className="w-full bg-white dark:bg-[#111f18]/80 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-green-900/30 mt-auto">
                    {!submitted ? (
                      <form onSubmit={handleSubmitEmail} className="flex flex-col gap-3">
                        <label htmlFor="emailInput" className="text-xs font-semibold text-gray-500 dark:text-green-600 uppercase tracking-wider text-left pl-1">
                          Avise-me de atualizações
                        </label>
                        <div className="relative">
                          <input 
                            id="emailInput"
                            type="email" 
                            required
                            placeholder="Seu melhor e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-200 dark:border-green-800/40 dark:bg-[#0b1410] focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900/50 outline-none transition-all text-sm dark:text-green-100 placeholder:text-gray-400 dark:placeholder:text-green-800/60"
                          />
                          <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-1.5 rounded-md transition-colors flex items-center justify-center min-w-[28px] min-h-[28px]"
                          >
                            {isSubmitting ? (
                              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <Send className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-4 flex flex-col items-center gap-2 text-green-700"
                      >
                        <div className="w-10 h-10 bg-green-100 rounded-full flex justify-center items-center">
                          <Sparkles className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-sm font-semibold">Tudo certo!</p>
                        <p className="text-xs text-green-600/80">O Santuário avisará você em breve.</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 flex justify-center">
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest flex items-center gap-1">
                <Cpu className="w-3 h-3" /> Powered by Gaia
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
