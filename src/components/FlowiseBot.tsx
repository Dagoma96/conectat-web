import { useEffect, useState } from 'react';

const FlowiseBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Cargar el script de Flowise dinámicamente
  useEffect(() => {
    if (document.getElementById('flowise-chat-script')) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'flowise-chat-script';
    script.src = 'http://localhost:3000/api/v1/prediction/a68d34c9-80fe-4ccb-bdec-bef5d165d2de';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    
    document.body.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Detectar cuando el chat se abre/cierra
  useEffect(() => {
    if (!scriptLoaded) return;

    const checkChatStatus = () => {
      const chatWindow = document.querySelector('[class*="chat-window"]');
      if (chatWindow) {
        const display = window.getComputedStyle(chatWindow).display;
        setIsChatOpen(display !== 'none');
        if (display !== 'none') setHasNewMessage(false);
      }
    };

    const observer = new MutationObserver(checkChatStatus);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Verificación inicial
    checkChatStatus();
    
    return () => observer.disconnect();
  }, [scriptLoaded]);

  // Simular nuevo mensaje cuando el chat está cerrado
  useEffect(() => {
    if (!isChatOpen && scriptLoaded) {
      const timer = setTimeout(() => {
        setHasNewMessage(true);
      }, 10000); // Después de 10 segundos
      return () => clearTimeout(timer);
    }
  }, [isChatOpen, scriptLoaded]);

  const toggleChat = () => {
    if (!scriptLoaded) return;
    
    const chatWindow = document.querySelector('[class*="chat-window"]');
    if (chatWindow) {
      const display = window.getComputedStyle(chatWindow).display;
      if (display === 'none') {
        // Si está cerrado, lo abrimos
        const chatButton = document.querySelector('[class*="chat-button"]');
        if (chatButton) {
          (chatButton as HTMLElement).click();
        }
      } else {
        // Si está abierto, lo cerramos
        const closeButton = document.querySelector('[class*="close-button"]');
        if (closeButton) {
          (closeButton as HTMLElement).click();
        }
      }
    }
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) setHasNewMessage(false);
  };

  return (
    <>
      {/* Nuestro botón personalizado */}
      <button
        onClick={toggleChat}
        style={{
          position: 'fixed',
          right: 20,
          bottom: 20,
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: '#00b894',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0, 184, 148, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'pulse 2s infinite, float 3s ease-in-out infinite',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 184, 148, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 184, 148, 0.4)';
        }}
      >
        {/* SVG del logo de mensajería con estilos en línea para forzar color blanco */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          style={{ 
            width: 30, 
            height: 30,
            filter: 'brightness(0) invert(1)' // Filtro para convertir a blanco
          }}
        >
          <path 
            d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" 
            fill="white" // Forzar color blanco
          />
        </svg>
      </button>
      
      {/* Tooltip personalizado */}
      {!isChatOpen && (
        <div
          style={{
            position: 'fixed',
            right: 90,
            bottom: 35,
            backgroundColor: '#00695c',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: 14,
            fontWeight: 500,
            zIndex: 9998,
            animation: 'fadeInUp 0.5s ease-out',
            pointerEvents: 'none',
          }}
        >
          ¡Hola 👋! ¿Necesitas ayuda?
        </div>
      )}
      
      {/* Indicador de nuevo mensaje */}
      {hasNewMessage && !isChatOpen && (
        <div 
          style={{
            position: 'fixed',
            right: 30,
            bottom: 90,
            backgroundColor: '#ff6b6b',
            color: 'white',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 'bold',
            zIndex: 9999,
            animation: 'pulse 1.5s infinite',
            boxShadow: '0 2px 10px rgba(255, 107, 107, 0.5)',
          }}
        >
          !
        </div>
      )}

      {/* Estilos para animaciones y para forzar el color del SVG */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 4px 15px rgba(0, 184, 148, 0.4); }
            50% { transform: scale(1.05); box-shadow: 0 6px 20px rgba(0, 184, 148, 0.6); }
            100% { transform: scale(1); box-shadow: 0 4px 15px rgba(0, 184, 148, 0.4); }
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
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          /* Ocultar elementos de Flowise que no queremos */
          [class*="chat-button"] {
            display: none !important;
          }
          
          [class*="chat-tooltip"] {
            display: none !important;
          }
          
          /* Efectos para la ventana de chat */
          [class*="chat-window"] {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
            transition: all 0.3s ease !important;
            border: 1px solid #e0e0e0 !important;
            border-radius: 12px !important;
          }
          
          /* Efectos para los mensajes */
          [class*="bot-message"] {
            background-color: #00b894 !important;
            color: white !important;
            border-radius: 18px !important;
            animation: slideIn 0.3s ease-out !important;
            margin-bottom: 8px !important;
            padding: 12px 16px !important;
            max-width: 80% !important;
          }
          
          [class*="user-message"] {
            background-color: #00695c !important;
            color: white !important;
            border-radius: 18px !important;
            animation: slideIn 0.3s ease-out !important;
            margin-bottom: 8px !important;
            padding: 12px 16px !important;
            max-width: 80% !important;
          }
          
          /* Efectos para el input de texto */
          [class*="text-input"] {
            border-radius: 24px !important;
            border: 1px solid #e0e0e0 !important;
            padding: 12px 20px !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05) !important;
          }
          
          [class*="text-input"]:focus {
            outline: none !important;
            border-color: #00b894 !important;
            box-shadow: 0 0 0 3px rgba(0, 184, 148, 0.2) !important;
          }
          
          /* Efectos para el botón de enviar */
          [class*="send-button"] {
            transition: all 0.3s ease !important;
          }
          
          [class*="send-button"]:hover {
            transform: scale(1.1) !important;
          }
          
          /* Animación para mensajes entrantes */
          [class*="message"]:last-child {
            animation: slideIn 0.3s ease-out !important;
          }
          
          /* Forzar el color del SVG a blanco */
          .chat-icon svg path {
            fill: white !important;
          }
        `}
      </style>
    </>
  );
};

export default FlowiseBot;