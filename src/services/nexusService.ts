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
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Email registrado com sucesso no Radar do Santuário."
        });
      }, 1500);
    });
  }
};
