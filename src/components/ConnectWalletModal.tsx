import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wallet, ShieldCheck, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (address: string) => void;
}

const wallets = [
  { id: 'pera', name: 'Pera Wallet', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { id: 'defly', name: 'Defly Wallet', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
  { id: 'algosigner', name: 'AlgoSigner', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
];

export function ConnectWalletModal({ isOpen, onClose, onConnect }: ConnectWalletModalProps) {
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = (walletId: string) => {
    setConnecting(walletId);
    // Simulate network delay
    setTimeout(() => {
      setConnecting(null);
      onConnect("SOSX...9A2Z");
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-[#0b1410] rounded-2xl shadow-xl z-50 overflow-hidden border border-gray-100 dark:border-green-900/40 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800/40">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-green-50 tracking-tight">Conectar Carteira</h3>
                  <p className="text-sm text-gray-500 dark:text-green-100/60">Acesse o Portal do Guardião</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-green-300 transition-colors p-2 rounded-full hover:bg-gray-50 dark:hover:bg-green-900/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {wallets.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => handleConnect(wallet.id)}
                  disabled={connecting !== null}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300",
                    connecting === wallet.id 
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-600" 
                      : "border-gray-200 dark:border-green-800/40 hover:border-green-400 dark:hover:border-green-600 hover:bg-gray-50 dark:hover:bg-[#111f18] bg-white dark:bg-[#0b1410]",
                    connecting !== null && connecting !== wallet.id && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs", wallet.color)}>
                      {wallet.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-green-100">{wallet.name}</span>
                  </div>
                  
                  {connecting === wallet.id ? (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sincronizando...</span>
                    </div>
                  ) : (
                    <ShieldCheck className="w-5 h-5 text-gray-300 dark:text-green-800" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 dark:text-green-100/40">
                 Ao conectar, você autoriza o acesso seguro à rede Algorand para visualização do seu impacto.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
