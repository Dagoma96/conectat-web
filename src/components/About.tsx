import React from "react";
import { motion, cubicBezier } from "framer-motion";
import type { Variants } from "framer-motion";
import { Users, Award, Clock, Heart } from "lucide-react";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: cubicBezier(0.16, 1, 0.3, 1) },
  },
};

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Experiencia Cercana",
      description:
        "Creamos espacios para aprender, conectar y descubrir lo último en innovación tecnológica.",
    },
    {
      icon: Award,
      title: "Calidad Garantizada",
      description:
        "Productos y servicios con garantía y respaldo de años de experiencia.",
    },
    {
      icon: Clock,
      title: "Eficiencia",
      description:
        "Procesos optimizados para soluciones rápidas sin comprometer calidad.",
    },
    {
      icon: Users,
      title: "Confianza",
      description:
        "Relaciones duraderas basadas en transparencia y compromiso.",
    },
  ];

  return (
    <section
      id="nosotros"
      className="relative py-20 bg-gradient-to-br from-teal-50 to-white"
    >
      {/* Decoración de fondo */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 left-0 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />
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
          <motion.h2
            variants={item}
            className="font-heading text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
          >
            Sobre <span className="text-teal-600">ConectaT</span>
          </motion.h2>
          <motion.p
            variants={item}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Somos más que una tienda de tecnología: tu aliado estratégico en el mundo digital.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Texto */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            <motion.h3
              variants={item}
              className="font-heading text-2xl font-bold text-gray-900"
            >
              Eficiencia con corazón, tecnología que te entiende
            </motion.h3>
            <motion.div
              variants={item}
              className="space-y-4 text-gray-600 leading-relaxed"
            >
              <p>
                En ConectaT creemos que la tecnología debe ser accesible, confiable y estar al servicio de las personas.
              </p>
              <p>
                Nuestro equipo brinda soluciones que marcan la diferencia: desde diagnóstico gratuito hasta garantía extendida.
              </p>
              <p>
                Innovamos constantemente para inspirar el aprendizaje y conectar con las últimas tendencias.
              </p>
            </motion.div>
          </motion.div>

          {/* Visual / Métricas */}
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">5+</div>
                  <div className="text-sm text-gray-600">Años de experiencia</div>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">1000+</div>
                  <div className="text-sm text-gray-600">Clientes satisfechos</div>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">98%</div>
                  <div className="text-sm text-gray-600">Reparaciones exitosas</div>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">24h</div>
                  <div className="text-sm text-gray-600">Tiempo promedio</div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 italic">
                  "Tecnología que conecta, servicio que inspira"
                </p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full opacity-20 blur-2xl" />
          </motion.div>
        </div>

        {/* Valores */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}