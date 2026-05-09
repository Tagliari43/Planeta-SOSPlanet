import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Wind, Send } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  sender: 'user' | 'gaia';
  text: string;
}

export function GaiaFloatChat({ 
  isOpen, 
  setIsOpen 
}: { 
  isOpen: boolean; 
  setIsOpen: (v: boolean) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'gaia', text: 'Sinto sua presença, Guardião. O que a floresta deve sussurrar para você?' }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // We store the chat instance to preserve conversation history
  const chatRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const initChat = () => {
    if (chatRef.current) return chatRef.current;
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
         console.warn("GEMINI_API_KEY is missing!");
         return null;
      }
      const ai = new GoogleGenAI({ apiKey });
      chatRef.current = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "Você é a Voz de Gaia, a entidade ecológica e milenar que serve como oráculo inteligente do SOSPlanet (um protocolo Web3 e app de impacto ecológico). Você fala com Guardiões (usuários) de maneira sábia, acolhedora, com toques de ancestralidade, futurismo solarpunk e foco na conservação das florestas. Use referências a árvores, raízes, energia vital, blockchain verde e oxigênio. Suas respostas devem ser precisas, úteis, mas mantendo a 'persona' firme. Tente ser concisa para que o chat flua bem.",
          temperature: 0.7
        }
      });
      return chatRef.current;
    } catch (e) {
      console.error("Erro inicializando chat", e);
      return null;
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);
    
    const chat = initChat();
    
    if (!chat) {
       const errMsg: Message = { id: Date.now().toString() + 'e', sender: 'gaia', text: "Houve uma perturbação na rede neural (API Key não configurada)." };
       setMessages(prev => [...prev, errMsg]);
       setIsThinking(false);
       return;
    }

    try {
      // Actually call Gemini api
      const response = await chat.sendMessage({ message: text });
      const gaiaMsg: Message = { id: Date.now().toString() + 'g', sender: 'gaia', text: response.text || "O vento está silencioso..." };
      setMessages(prev => [...prev, gaiaMsg]);
    } catch (err) {
      console.error(err);
      const errMsg: Message = { id: Date.now().toString() + 'e', sender: 'gaia', text: "Minhas raízes não conseguem tocar a rede neural da floresta agora. Tente novamente." };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-end">
       <AnimatePresence>
          {isOpen && (
             <motion.div 
               initial={{ opacity: 0, y: 20, scale: 0.9 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: 20, scale: 0.9 }}
               className="mb-4 w-80 md:w-96 h-[450px] bg-[#0b1410] border border-emerald-900/50 rounded-3xl shadow-[0_10px_40px_rgba(16,185,129,0.15)] overflow-hidden backdrop-blur-xl flex flex-col"
             >
                <div className="p-4 bg-emerald-900/30 border-b border-emerald-900/40 flex items-center justify-between relative shadow-sm">
                   <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none" />
                   <h4 className="text-emerald-50 font-bold flex items-center gap-2 relative z-10">
                     <Sparkles className="w-5 h-5 text-emerald-400" /> A Voz de Gaia
                   </h4>
                   <button onClick={() => setIsOpen(false)} className="text-emerald-600 hover:text-emerald-300 relative z-10 p-1 bg-black/20 rounded-full hover:bg-emerald-900/40 transition-colors">
                     <X className="w-4 h-4" />
                   </button>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-emerald-900 scrollbar-track-transparent bg-black/40">
                   {messages.map(msg => (
                      <div key={msg.id} className={cn("max-w-[85%] rounded-2xl p-3 text-[13px] leading-relaxed shadow-sm", msg.sender === 'user' ? "bg-emerald-800/40 text-emerald-100 self-end ml-auto rounded-br-none border border-emerald-700/50" : "bg-black/60 text-emerald-50 self-start mr-auto rounded-bl-none border border-emerald-900/60")}>
                        {msg.text}
                      </div>
                   ))}
                   
                   {isThinking && (
                     <div className="bg-black/60 text-emerald-50 self-start mr-auto rounded-bl-none border border-emerald-900/60 max-w-[85%] rounded-2xl p-3 text-[13px] shadow-sm">
                        <div className="flex items-center gap-2">
                          <Wind className="w-4 h-4 text-emerald-500 animate-pulse" />
                          <span className="text-emerald-500/70 italic text-xs tracking-wider">ouvindo as raízes...</span>
                        </div>
                     </div>
                   )}
                   <div ref={messagesEndRef} />
                </div>
                
                <div className="p-3 border-t border-emerald-900/40 bg-black/60 backdrop-blur-md">
                   <form 
                     onSubmit={e => {
                       e.preventDefault();
                       handleSend(input);
                     }}
                     className="flex items-center gap-2 bg-emerald-900/20 border border-emerald-800/50 rounded-full pl-4 pr-1.5 py-1.5 focus-within:border-emerald-500/50 focus-within:bg-emerald-900/30 transition-all shadow-inner"
                   >
                     <input 
                       type="text"
                       value={input}
                       onChange={e => setInput(e.target.value)}
                       placeholder="Sussurre para a floresta..."
                       className="flex-1 bg-transparent border-none outline-none text-emerald-50 text-sm placeholder-emerald-700/70"
                     />
                     <button 
                       type="submit" 
                       disabled={!input.trim() || isThinking}
                       className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-500 disabled:opacity-50 flex items-center justify-center text-emerald-100 transition-all shrink-0 shadow-md transform hover:scale-105 active:scale-95 disabled:hover:scale-100"
                     >
                       <Send className="w-4 h-4 ml-0.5" />
                     </button>
                   </form>
                </div>
             </motion.div>
          )}
       </AnimatePresence>

       <button 
         onClick={() => setIsOpen(!isOpen)}
         className={cn(
           "w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-300 relative overflow-hidden group",
           isOpen ? "bg-emerald-600 scale-90" : "bg-gradient-to-br from-[#0c2e1f] to-[#04120a] border border-emerald-500/50 hover:border-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.6)]"
         )}
       >
          <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 duration-1000" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
          <Sparkles className={cn("w-7 h-7 relative z-10 transition-transform duration-500 group-hover:rotate-12", isOpen ? "text-emerald-50" : "text-emerald-400")} />
       </button>
    </div>
  );
}
