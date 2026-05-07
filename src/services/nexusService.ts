import { supabase } from '../lib/supabase';

export interface NexusMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const mockResponses = [
  "Sinal captado do lado externo. Analisando as flutuações do ecossistema...",
  "Entendido, Guardião. Esta coordenada já foi registrada no núcleo de Gaia.",
  "Estou processando dados vitais da região amazônica. A taxa de reflorestamento precisa de nossa atenção.",
  "Sua força vital alimenta nossa rede neural. Conectando aos micélios digitais do Santuário...",
  "O protocolo de mitigação de carbono está ativo. Como você sugere escalarmos este impacto?"
];

export const nexusService = {
  async sendToNexus(message: string): Promise<string> {
    return new Promise((resolve) => {
      // Simulate network delay between 1.5s and 3s
      const delay = Math.floor(Math.random() * 1500) + 1500;
      setTimeout(() => {
        const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        resolve(randomResponse);
      }, delay);
    });
  },

  async registerRadarSubscription(email: string): Promise<{ success: boolean; message: string }> {
    if (!supabase) {
        return { success: false, message: "Database connection failed" };
    }
    
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert([
        { email, status: 'active' } // data_inscricao should be default now() based on DB schema usually
      ]);
      
      if (error) {
        console.error("Error inserting newsletter subscription:", error.message);
        throw error;
      }
      
      return {
        success: true,
        message: "Email registrado com sucesso no Radar do Santuário."
      };
    } catch (err) {
      console.error(err);
      return { success: false, message: "Erro ao registrar email" };
    }
  }
};
