import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/Logo sin Fondo.png"
            alt="ConectaT logo"
            className="w-10 h-10 object-contain"
          />
          <h2 className="text-xl font-bold">
            <span className="text-white">Conecta</span>
            <span className="text-teal-400">T</span>
          </h2>
        </div>

        {/* Menú de enlaces */}
        <nav className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
          <a href="#inicio" className="hover:text-teal-400 transition">
            Inicio
          </a>
          <a href="#servicios" className="hover:text-teal-400 transition">
            Servicios
          </a>
          <a href="#nosotros" className="hover:text-teal-400 transition">
            Nosotros
          </a>
          <a href="#beneficios" className="hover:text-teal-400 transition">
            Beneficios
          </a>
          <a href="#contacto" className="hover:text-teal-400 transition">
            Contacto
          </a>
        </nav>

        {/* Redes sociales */}
        <div className="flex space-x-4 text-lg">
          <a href="#" className="hover:text-teal-400 transition">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-teal-400 transition">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-teal-400 transition">
            <FiMessageSquare />
          </a>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} ConectaT. Todos los derechos reservados.
      </div>
    </footer>
  );
}