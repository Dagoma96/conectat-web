import { useState, useEffect, useRef } from "react";
import { FaRobot, FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRedirectToWhatsApp, setShouldRedirectToWhatsApp] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleChatbot = () => {
    setIsOpen((prev) => !prev);
  };

  // Detectar mensaje desde el iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "redirect_to_whatsapp") {
        setShouldRedirectToWhatsApp(true);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Redirigir a WhatsApp
  useEffect(() => {
    if (shouldRedirectToWhatsApp) {
      window.open("https://wa.me/573043756405", "_blank");
      setShouldRedirectToWhatsApp(false);
    }
  }, [shouldRedirectToWhatsApp]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Cerrar si se hace clic fuera del chatbot
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="fixed bottom-5 md:bottom-8 right-5 md:right-8 z-[120] flex flex-col items-end space-y-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot"
            ref={wrapperRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative z-50 mb-4"
          >
            <iframe
              ref={iframeRef}
              src="https://conectat-chatbot.vercel.app" // 👈 usar ruta embed del chatbot
              title="ChatBot ConectaT"
              className="rounded-2xl shadow-2xl border border-gray-200 bg-white"
              style={{
                width: "420px",
                minHeight: "80vh",
                maxHeight: "90vh",
                maxWidth: "90vw",
                backgroundColor: "#ffffff",
                overflow: "hidden",
              }}
              scrolling="no"
            ></iframe>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleChatbot}
        aria-label="Abrir chatbot"
        aria-expanded={isOpen}
        className="w-16 h-16 md:w-16 md:h-16 bg-teal-600 text-white rounded-full shadow-xl flex items-center justify-center text-2xl
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300
                 transition pointer-events-auto relative
                 hover:bg-teal-700 hover:scale-110"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          paddingRight: "env(safe-area-inset-right)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {isOpen ? <FaWhatsapp /> : <FaRobot />}
        <span
          className="absolute inset-0 -z-10 rounded-full animate-ping bg-teal-500 opacity-30"
          aria-hidden="true"
        />
      </motion.button>
    </div>
  );
};

export default ChatBot;