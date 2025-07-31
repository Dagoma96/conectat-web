import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Benefits from './components/Benefits';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { scrollToSection } from './utils/scrollToSection';

import ErrorBoundary from './components/ErrorBoundary';       // 👈 Error boundary por sección
import GlobalErrorCatcher from './components/GlobalErrorCatcher'; // 👈 Catcher de errores globales

function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const sections = ['inicio', 'servicios', 'nosotros', 'beneficios', 'contacto'];

    const handleScroll = () => {
      // Detectar sección activa
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

      // Calcular porcentaje de scroll
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    // Navegación directa con hash
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      setTimeout(() => scrollToSection(hash), 400);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // calcular estado inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Barra de progreso */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-teal-600 to-teal-700 z-[60] transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 👇 Captura errores globales (useEffect/promesas) y los muestra arriba */}
      <GlobalErrorCatcher />

      {/* Encabezado */}
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

      <ErrorBoundary label="WhatsAppButton">
        <WhatsAppButton />
      </ErrorBoundary>
    </div>
  );
}

export default App;