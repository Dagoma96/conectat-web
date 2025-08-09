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

      {/* Flowise Chat integrado */}
      <BubbleChat
        chatflowid="a68d34c9-80fe-4ccb-bdec-bef5d165d2de"
        apiHost="http://localhost:3000"
        theme={{
          button: {
            backgroundColor: '#004d4d',
            right: 20,
            bottom: 20,
            size: 60,
            dragAndDrop: true,
            iconColor: '#ffffff',
            customIconSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
            autoWindowOpen: { autoOpen: true, openDelay: 2, autoOpenOnMobile: false }
          },
          tooltip: {
            showTooltip: true,
            tooltipMessage: '¡Hola 👋!',
            tooltipBackgroundColor: '#000000',
            tooltipTextColor: '#ffffff',
            tooltipFontSize: 16
          },
          chatWindow: {
            title: 'Asistente de ConectaT',
            welcomeMessage: '¡Hola! Soy Áron, tu asistente virtual de ConectaT. ¿En qué puedo ayudarte hoy?',
            backgroundColor: '#ffffff',
            height: 700,
            width: 400
          }
        }}
      />
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