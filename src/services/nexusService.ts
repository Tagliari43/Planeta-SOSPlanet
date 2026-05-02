export interface NexusMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const nexusService = {
  async sendToNexus(message: string): Promise<string> {
    // Simulador: aguarda 2 segundos antes de responder
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Sinal captado do lado externo. Aguardando sincronização de rede com os microserviços do Santuário...");
      }, 2000);
    });
  }
};
