import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Wrench,
  Smartphone,
  Monitor,
  Headphones,
  Tablet,
} from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: ShoppingCart,
      title: 'Compra y Venta',
      description:
        'Encuentra los mejores dispositivos tecnológicos o vende los tuyos con total confianza y precios justos.',
      features: ['Evaluación gratuita', 'Precios competitivos', 'Garantía incluida'],
      color: 'teal',
    },
    {
      icon: Wrench,
      title: 'Reparación Experta',
      description:
        '¿Tu equipo falla? Lo reparamos con rapidez y diagnóstico completamente gratuito.',
      features: ['Diagnóstico gratuito', 'Reparación rápida', 'Garantía de servicio'],
      color: 'teal',
    },
  ];

  const devices = [
    { icon: Monitor, name: 'Computadores', color: 'text-teal-700' },
    { icon: Smartphone, name: 'Celulares', color: 'text-teal-600' },
    { icon: Tablet, name: 'Tablets', color: 'text-teal-500' },
    { icon: Headphones, name: 'Accesorios', color: 'text-teal-400' },
  ];

  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos soluciones completas en tecnología con la calidad y confianza que mereces
          </p>
        </motion.div>

        {/* Servicios */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-gray-200"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className="
                      w-16 h-16 rounded-xl
                      bg-gradient-to-br from-teal-500 to-teal-600
                      flex items-center justify-center flex-shrink-0
                    "
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <span className="w-2 h-2 rounded-full bg-teal-500 mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dispositivos */}
        <motion.div
          className="bg-teal-50 rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="font-heading text-2xl font-bold text-gray-900 text-center mb-8">
            Trabajamos con todos los dispositivos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {devices.map((device, index) => {
              const IconComponent = device.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white rounded-xl hover:shadow-md transition-all duration-200"
                >
                  <IconComponent className={`w-12 h-12 mx-auto mb-3 ${device.color}`} />
                  <p className="font-medium text-gray-900">{device.name}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Botones de acción */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/573043756405?text=¡Hola%20ConectaT!%20Necesito%20un%20diagnóstico%20gratuito%20para%20mi%20dispositivo."
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center px-8 py-4
                bg-gradient-to-r from-teal-600 to-teal-700
                text-white font-semibold rounded-lg
                hover:from-teal-700 hover:to-teal-800
                transition-all duration-200 shadow-lg hover:shadow-xl
                transform hover:-translate-y-1
              "
            >
              🔧 Diagnóstico Gratuito
            </a>
            <button
              onClick={() => {
                const element = document.getElementById('contacto');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="
                inline-flex items-center px-8 py-4
                border-2 border-teal-600 text-teal-600
                font-semibold rounded-lg
                hover:bg-teal-600 hover:text-white
                transition-all duration-200
              "
            >
              📋 Más Información
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;