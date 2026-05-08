import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

export function Termos() {
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="prose prose-green dark:prose-invert max-w-none"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 border border-green-800/50 text-green-400 text-sm font-mono mb-6">
          <FileText className="w-4 h-4" />
          <span>Documento Legal</span>
        </div>
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Termos de Serviço</h1>
        
        <div className="bg-gray-50 dark:bg-[#0C1611]/80 backdrop-blur-sm border border-gray-200 dark:border-green-900/30 p-8 rounded-2xl">
          <p className="text-gray-600 dark:text-green-100/70 mb-4">
            **Nota:** O texto legal oficial será redigido pelo irmão Arion. Este é um texto provisório.
          </p>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-green-300">1. Aceitação dos Termos</h2>
          <p className="text-gray-600 dark:text-green-100/70 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-green-300">2. O Token SOS</h2>
          <p className="text-gray-600 dark:text-green-100/70 mb-6">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-green-300">3. Ações Regenerativas</h2>
          <p className="text-gray-600 dark:text-green-100/70">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
