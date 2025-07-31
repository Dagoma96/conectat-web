import React, { useState } from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';

type HeaderProps = {
  activeSection: string;
};

export default function Header({ activeSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'beneficios', label: 'Beneficios' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50 motion-safe:animate-fade-in">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo + Nombre */}
        <div className="flex items-center space-x-3">
          <img
            src="/Logo sin Fondo.png"
            alt="ConectaT logo"
            className="w-12 h-12 object-contain"
          />
          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="text-gray-900">Conecta</span>
            <span className="text-teal-700">T</span>
          </h1>
        </div>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`text-gray-800 font-medium hover:text-teal-700 transition ${
                activeSection === link.id ? 'text-teal-700 font-semibold' : ''
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Redes sociales + WhatsApp */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-teal-700 text-lg">
            <FaFacebookF />
          </a>
          <a href="#" className="text-gray-600 hover:text-teal-700 text-lg">
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-600 hover:text-teal-700 text-lg">
            <FiMessageSquare />
          </a>
          <a
            href="https://wa.me/573043756405"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            WhatsApp
          </a>
        </div>

        {/* Botón menú móvil */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4 space-y-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="block text-gray-800 font-medium hover:text-teal-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center space-x-3 pt-3">
            <a href="#" className="text-gray-600 hover:text-teal-700 text-lg">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-600 hover:text-teal-700 text-lg">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-600 hover:text-teal-700 text-lg">
              <FiMessageSquare />
            </a>
          </div>
          <a
            href="https://wa.me/573043756405"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}