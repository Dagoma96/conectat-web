// src/App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// @ts-ignore
import { BubbleChat } from 'flowise-embed-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Benefits from './components/Benefits';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import GlobalErrorCatcher from './components/GlobalErrorCatcher';
import { scrollToSection } from './utils/scrollToSection';

function MainPage() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const sections = ['inicio', 'servicios', 'nosotros', 'beneficios', 'contacto'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let current = 'inicio';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      setTimeout(() => scrollToSection(hash), 400);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Barra de progreso */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-teal-600 to-teal-700 z-[60] transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      />
      <GlobalErrorCatcher />
      <ErrorBoundary label="Header">
        <Header activeSection={activeSection} />
      </ErrorBoundary>
      <main>
        <ErrorBoundary label="Hero">
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary label="Services">
          <Services />
        </ErrorBoundary>
        <ErrorBoundary label="About">
          <About />
        </ErrorBoundary>
        <ErrorBoundary label="Benefits">
          <Benefits />
        </ErrorBoundary>
        <ErrorBoundary label="Contact">
          <Contact />
        </ErrorBoundary>
      </main>
      <ErrorBoundary label="Footer">
        <Footer />
      </ErrorBoundary>
      
      {/* Flowise Chat integrado - VERSIÓN WEB */}
      <BubbleChat
        chatflowid="b7b475eb-3916-496c-b596-ded330f20326" // ID del chatbot en Flowise Cloud
        apiHost="https://cloud.flowiseai.com" // URL de Flowise Cloud
        theme={{
          button: {
            backgroundColor: '#1E6B63', // Verde principal actualizado
            right: 20,
            bottom: 20,
            size: 60,
            dragAndDrop: true,
            iconColor: '#ffffff', // Color blanco para el icono
            // Usamos un SVG de robot con antenas (estilo moderno) codificado en base64
            customIconSrc: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='3' y='4' width='18' height='12' rx='2.5' fill='%23FFFFFF' stroke='%23000000' stroke-width='0.8'/%3E%3Ccircle cx='8' cy='9' r='1.25' fill='%23000000'/%3E%3Ccircle cx='16' cy='9' r='1.25' fill='%23000000'/%3E%3Crect x='9' y='13' width='6' height='1' rx='0.5' fill='%23000000'/%3E%3Cline x1='6.5' y1='4' x2='5' y2='1.8' stroke='%23FFFFFF' stroke-width='0.9' stroke-linecap='round'/%3E%3Ccircle cx='5' cy='1.45' r='0.85' fill='%23FFFFFF' stroke='%23000000' stroke-width='0.5'/%3E%3Cline x1='17.5' y1='4' x2='19' y2='1.8' stroke='%23FFFFFF' stroke-width='0.9' stroke-linecap='round'/%3E%3Ccircle cx='19' cy='1.45' r='0.85' fill='%23FFFFFF' stroke='%23000000' stroke-width='0.5'/%3E%3C/svg%3E",
            autoWindowOpen: { autoOpen: true, openDelay: 2, autoOpenOnMobile: false }
          },
          tooltip: {
            showTooltip: true,
            tooltipMessage: '¿Necesitas ayuda?',
            tooltipBackgroundColor: '#1E6B63', // Verde principal actualizado
            tooltipTextColor: '#ffffff',
            tooltipFontSize: 14
          },
          chatWindow: {
            title: 'Asistente ConectaT',
            welcomeMessage: '¡Hola! Soy Áron, tu asistente virtual. ¿En qué puedo ayudarte hoy?',
            backgroundColor: '#ffffff',
            height: 700,
            width: 400,
            // Estilos para los mensajes del bot
            botMessage: {
              backgroundColor: '#f0f9f4', // Verde muy claro para fondo
              textColor: '#1E6B63', // Verde principal para texto
            },
            // Estilos para los mensajes del usuario
            userMessage: {
              backgroundColor: '#1E6B63', // Verde principal actualizado
              textColor: '#ffffff', // Texto blanco
            },
            // Estilos para el input de texto
            textInput: {
              backgroundColor: '#f8f9fa',
              textColor: '#333333',
              sendButtonColor: '#1E6B63', // Verde principal actualizado
              placeholder: 'Escribe tu requerimiento....' // Texto del placeholder actualizado
            },
            // Color para el texto "Powered by"
            poweredByTextColor: '#1E6B63' // Verde principal actualizado
          }
        }}
      />
      
      {/* Estilos adicionales para mejorar el diseño */}
      <style>{`
        /* Variables de color para fácil personalización */
        :root {
          --primary-green: #1E6B63; /* Verde principal actualizado */
          --primary-green-dark: #17554d; /* Verde oscuro para gradientes */
          --primary-green-light: #e8f5f1; /* Verde muy claro para fondos */
          --primary-green-text: #1E6B63; /* Verde para texto */
          --gray-light: #f8f9fa; /* Gris claro */
          --gray-border: #e9ecef; /* Gris para bordes */
        }
        
        /* Estilos globales para el chatbot */
        .flowise-chatbot-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }
        
        /* Estilos para la ventana del chat */
        .flowise-chatbot-window {
          border-radius: 16px !important;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12) !important;
          border: 1px solid var(--gray-border) !important;
          overflow: hidden !important;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        }
        
        /* Estilos para el encabezado del chat */
        .flowise-chatbot-header {
          background: linear-gradient(135deg, var(--primary-green) 0%, var(--primary-green-dark) 100%) !important;
          padding: 16px 20px !important;
          border-bottom: none !important;
        }
        
        /* Estilos para el título del chat */
        .flowise-chatbot-title {
          color: #ffffff !important;
          font-weight: 600 !important;
          font-size: 18px !important;
          letter-spacing: -0.2px !important;
        }
        
        /* Estilos para el botón de cerrar */
        .flowise-chatbot-close-button {
          color: rgba(255, 255, 255, 0.8) !important;
          font-size: 20px !important;
          transition: all 0.2s ease !important;
        }
        
        .flowise-chatbot-close-button:hover {
          color: #ffffff !important;
          transform: rotate(90deg) !important;
        }
        
        /* Estilos para el contenedor de mensajes */
        .flowise-chatbot-messages-container {
          padding: 16px !important;
          background-color: #ffffff !important;
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(30, 107, 99, 0.1) 1px, transparent 0) !important;
          background-size: 20px 20px !important;
        }
        
        /* Estilos para los mensajes del bot */
        .flowise-chatbot-bot-message {
          background-color: var(--primary-green-light) !important;
          color: var(--primary-green-text) !important;
          border-radius: 18px 18px 18px 4px !important;
          padding: 12px 16px !important;
          margin-bottom: 12px !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04) !important;
          max-width: 80% !important;
          animation: messageSlideIn 0.3s ease-out !important;
          position: relative !important;
        }
        
        /* Estilos para los mensajes del usuario */
        .flowise-chatbot-user-message {
          background: linear-gradient(135deg, var(--primary-green) 0%, var(--primary-green-dark) 100%) !important;
          color: #ffffff !important;
          border-radius: 18px 18px 4px 18px !important;
          padding: 12px 16px !important;
          margin-bottom: 12px !important;
          box-shadow: 0 2px 8px rgba(30, 107, 99, 0.3) !important;
          max-width: 80% !important;
          margin-left: auto !important;
          animation: messageSlideIn 0.3s ease-out !important;
          position: relative !important;
        }
        
        /* Estilos para el contenedor del input */
        .flowise-chatbot-input-container {
          padding: 16px !important;
          background-color: #ffffff !important;
          border-top: 1px solid var(--gray-border) !important;
        }
        
        /* Estilos para el input de texto */
        .flowise-chatbot-text-input {
          border-radius: 24px !important;
          border: 1px solid var(--gray-border) !important;
          padding: 12px 20px !important;
          font-size: 14px !important;
          background-color: var(--gray-light) !important;
          color: #333333 !important;
          transition: all 0.2s ease !important;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05) !important;
        }
        
        .flowise-chatbot-text-input:focus {
          outline: none !important;
          border-color: var(--primary-green) !important;
          box-shadow: 0 0 0 3px rgba(30, 107, 99, 0.2) !important;
          background-color: '#ffffff' !important;
        }
        
        .flowise-chatbot-text-input::placeholder {
          color: #adb5bd !important;
        }
        
        /* Estilos para el botón de enviar */
        .flowise-chatbot-send-button {
          background: linear-gradient(135deg, var(--primary-green) 0%, var(--primary-green-dark) 100%) !important;
          color: white !important;
          border-radius: 50% !important;
          width: 40px !important;
          height: 40px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin-left: 8px !important;
          transition: all 0.2s ease !important;
          box-shadow: 0 2px 8px rgba(30, 107, 99, 0.3) !important;
        }
        
        .flowise-chatbot-send-button:hover {
          transform: scale(1.05) !important;
          box-shadow: 0 4px 12px rgba(30, 107, 99, 0.4) !important;
        }
        
        .flowise-chatbot-send-button:active {
          transform: scale(0.95) !important;
        }
        
        /* Estilos para el texto "Powered by" */
        .flowise-chatbot-powered-by {
          color: var(--primary-green) !important;
          font-size: 12px !important;
          padding: 8px 16px !important;
          background-color: var(--gray-light) !important;
          border-top: 1px solid var(--gray-border) !important;
        }
        
        /* Estilos para el botón del chat */
        .flowise-chatbot-button {
          border-radius: 50% !important;
          box-shadow: 0 4px 15px rgba(30, 107, 99, 0.4) !important;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
          animation: pulse 2s infinite, float 3s ease-in-out infinite !important;
        }
        
        .flowise-chatbot-button:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 6px 20px rgba(30, 107, 99, 0.6) !important;
        }
        
        /* ESTILOS PARA ASEGURAR QUE EL ÍCONO SEA BLANCO */
        .flowise-chatbot-button svg,
        .flowise-chatbot-button img {
          filter: brightness(0) invert(1) !important;
        }
        
        /* Estilos para el tooltip */
        .flowise-chatbot-tooltip {
          border-radius: 8px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          animation: fadeInUp 0.5s ease-out !important;
        }
        
        /* Animaciones */
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 4px 15px rgba(30, 107, 99, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 6px 20px rgba(30, 107, 99, 0.6); }
          100% { transform: scale(1); box-shadow: 0 4px 15px rgba(30, 107, 99, 0.4); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Mejoras para móviles */
        @media (max-width: 640px) {
          .flowise-chatbot-window {
            width: 100% !important;
            height: 100% !important;
            border-radius: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
          }
          
          .flowise-chatbot-button {
            right: 16px !important;
            bottom: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;