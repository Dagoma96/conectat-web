import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section
      id="contacto"
      className="relative py-20 bg-gradient-to-br from-teal-50 to-white"
    >
      {/* Decoración de fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Título */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contáctanos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos listos para ayudarte con tus dispositivos o cualquier consulta que tengas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-teal-100 p-3 rounded-full">
                <MapPin className="text-teal-600 w-6 h-6" />
              </div>
              <p className="text-gray-700">
                Carrera 83D # 53A-34, Cali, Colombia
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-teal-100 p-3 rounded-full">
                <Phone className="text-teal-600 w-6 h-6" />
              </div>
              <p className="text-gray-700">+57 304 375 6405</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-teal-100 p-3 rounded-full">
                <Mail className="text-teal-600 w-6 h-6" />
              </div>
              <p className="text-gray-700">ConectaT09@outlook.com</p>
            </div>

            <a
              href="https://wa.me/573043756405"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Escríbenos por WhatsApp
            </a>
          </motion.div>

          {/* Formulario */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nombre
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Mensaje
              </label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Enviar mensaje
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}