import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRedirectToWhatsApp, setShouldRedirectToWhatsApp] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Abre/cierra el chatbot
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Escuchar mensaje desde el iframe para escalar a humano
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'redirect_to_whatsapp') {
        setShouldRedirectToWhatsApp(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Redirige a WhatsApp si se solicita desde el bot
  useEffect(() => {
    if (shouldRedirectToWhatsApp) {
      window.open('https://wa.me/573043756405', '_blank');
      setShouldRedirectToWhatsApp(false);
    }
  }, [shouldRedirectToWhatsApp]);

  return (
    <div className="fixed bottom-5 md:bottom-8 right-5 md:right-8 z-[120] flex flex-col items-end space-y-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative z-50 mb-4"
          >
            <iframe
              ref={iframeRef}
              src="https://conectat-chatbot.vercel.app"
              width="370"
              height="540"
              title="ChatBot ConectaT"
              className="w-[440px] md:w-[800px] h-[620px] max-w-[95vw] max-h-[85vh] rounded-xl shadow-2xl border border-gray-200 bg-white overflow-auto"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                backgroundColor: '#ffffff',
              }}
            ></iframe>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleChatbot}
        aria-label="Abrir chatbot"
        className="w-16 h-16 md:w-16 md:h-16 bg-teal-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300
                 transition pointer-events-auto relative
                 hover:bg-teal-700 hover:scale-105"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        style={{
          paddingRight: 'env(safe-area-inset-right)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {isOpen ? <FaWhatsapp /> : <FaRobot />}
        <span
          className="absolute inset-0 -z-10 rounded-full animate-ping bg-teal-500 opacity-20"
          aria-hidden="true"
        />
      </motion.button>
    </div>
  );
};

export default ChatBot;