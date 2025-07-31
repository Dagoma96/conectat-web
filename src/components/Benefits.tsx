import React from 'react';
import { motion, cubicBezier } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Star, Gift, Shield, Zap, Users, Trophy } from 'lucide-react';

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: cubicBezier(0.16, 1, 0.3, 1) }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: cubicBezier(0.16, 1, 0.3, 1) }
  }
};

export default function Benefits() {
  const benefits = [
    {
      icon: Gift,
      title: 'Descuentos Exclusivos',
      description:
        'Accede a ofertas especiales y descuentos en productos y servicios como cliente frecuente.',
      highlight: 'Hasta 20% OFF'
    },
    {
      icon: Zap,
      title: 'Servicio Prioritario',
      description:
        'Atención preferencial y tiempos de respuesta más rápidos en reparaciones y consultas.',
      highlight: 'Atención VIP'
    },
    {
      icon: Shield,
      title: 'Garantía Extendida',
      description:
        'Protección adicional para tus dispositivos con garantías extendidas sin costo extra.',
      highlight: 'Garantía Plus'
    },
    {
      icon: Trophy,
      title: 'Programa de Puntos',
      description:
        'Acumula puntos con cada compra y canjéalos por productos, servicios o descuentos.',
      highlight: 'Puntos ConectaT'
    }
  ];

  const membershipLevels = [
    {
      name: 'Bronce',
      color: 'from-amber-400 to-amber-600',
      requirement: '3 compras',
      benefits: ['5% descuento', 'Diagnóstico gratuito', 'Soporte básico']
    },
    {
      name: 'Plata',
      color: 'from-gray-400 to-gray-600',
      requirement: '6 compras',
      benefits: ['10% descuento', 'Garantía extendida', 'Soporte prioritario']
    },
    {
      name: 'Oro',
      color: 'from-yellow-400 to-yellow-600',
      requirement: '10 compras',
      benefits: ['15% descuento', 'Servicio a domicilio', 'Asesoría personalizada']
    },
    {
      name: 'Platino',
      color: 'from-teal-400 to-teal-600',
      requirement: '15+ compras',
      benefits: ['20% descuento', 'Acceso anticipado', 'Eventos exclusivos']
    }
  ];

  return (
    <section id="beneficios" className="relative py-20 bg-white">
      {/* Decoración de fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 right-0 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemUp} className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Beneficios para Clientes Frecuentes
          </motion.h2>
          <motion.p variants={itemUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Únete a nuestro programa de beneficios y disfruta de ventajas exclusivas diseñadas para ti
          </motion.p>
        </motion.div>

        {/* Beneficios principales */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={itemUp}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.2, ease: cubicBezier(0.2, 0.8, 0.2, 1) }}
                className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
              >
                {/* Decoración circular */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-200 to-teal-300 rounded-full opacity-20 translate-x-8 -translate-y-8" />
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="inline-block bg-gradient-to-r from-teal-600 to-teal-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {benefit.highlight}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Niveles de membresía */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-teal-50 rounded-2xl p-8"
        >
          <h3 className="font-heading text-2xl font-bold text-gray-900 text-center mb-8">
            Niveles de Membresía
          </h3>
          <motion.div variants={container} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membershipLevels.map((level, index) => (
              <motion.div
                key={index}
                variants={itemUp}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.2, ease: cubicBezier(0.2, 0.8, 0.2, 1) }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${level.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{level.name}</h4>
                <p className="text-sm text-gray-500 mb-4">Requiere: {level.requirement}</p>
                <ul className="space-y-2">
                  {level.benefits.map((b, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-center justify-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-2" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA final */}
        <motion.div
          variants={itemUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 text-center"
        >
          <div className="inline-block w-full sm:w-auto bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 text-white shadow-lg">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-3">¿Listo para comenzar a disfrutar estos beneficios?</h3>
            <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
              Únete a nuestra comunidad de clientes frecuentes y comienza a acumular beneficios desde tu primera compra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/573043756405?text=¡Hola%20ConectaT!%20Me%20interesa%20unirme%20al%20programa%20de%20beneficios%20para%20clientes%20frecuentes."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/70"
                aria-label="Unirse al programa por WhatsApp"
              >
                🎁 Únete por WhatsApp
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById('contacto');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                type="button"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-teal-600 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                📋 Más Detalles
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}