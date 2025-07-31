import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const phone = '573043756405';
  const message = encodeURIComponent('¡Hola ConectaT! Me gustaría más información.');
  const url = `https://wa.me/${phone}?text=${message}`;

  const content = (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="
        fixed 
        bottom-5 md:bottom-8 
        right-5 md:right-8 
        left-auto top-auto 
        z-[120] 
        inline-flex items-center justify-center 
        rounded-full shadow-lg 
        bg-green-500 hover:bg-green-600 
        text-white 
        w-14 h-14 md:w-16 md:h-16 
        focus:outline-none focus-visible:ring-2 focus-visible:ring-green-300 
        transition
        pointer-events-auto
      "
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      // Evita que quede muy pegado a los bordes en móviles con notch
      style={{
        paddingRight: 'env(safe-area-inset-right)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <FaWhatsapp className="text-2xl md:text-3xl" />
      <span className="sr-only">WhatsApp</span>
      {/* Halo/ping suave */}
      <span className="absolute inset-0 -z-10 rounded-full animate-ping bg-green-500 opacity-20" aria-hidden="true" />
    </motion.a>
  );

  // Renderiza fuera del árbol de tu App para que ningún contenedor lo afecte
  return createPortal(content, document.body);
}