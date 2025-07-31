import { FaShieldAlt, FaBolt, FaHeart } from 'react-icons/fa';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="w-full bg-gradient-to-br from-teal-50 to-white pt-28 pb-20"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 gap-12">
        {/* Texto principal */}
        <div className="flex-1 text-center md:text-left space-y-7">
          <h1 className="font-heading text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 opacity-0 motion-safe:animate-slide-up">
            Tecnología que <span className="text-teal-700">te entiende</span>
          </h1>

          <p
            className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto md:mx-0 opacity-0 motion-safe:animate-slide-up"
            style={{ animationDelay: '120ms' }}
          >
            En <strong>ConectaT</strong> cuidamos tus dispositivos como si fueran nuestros.
            Compra, vende y repara con total confianza y un servicio cercano.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div
              className="flex items-center gap-3 justify-center md:justify-start opacity-0 motion-safe:animate-fade-in"
              style={{ animationDelay: '250ms' }}
            >
              <FaShieldAlt className="text-teal-700 text-2xl" />
              <span className="text-gray-800 font-medium">Confianza garantizada</span>
            </div>
            <div
              className="flex items-center gap-3 justify-center md:justify-start opacity-0 motion-safe:animate-fade-in"
              style={{ animationDelay: '350ms' }}
            >
              <FaBolt className="text-teal-600 text-2xl" />
              <span className="text-gray-800 font-medium">Reparación rápida</span>
            </div>
            <div
              className="flex items-center gap-3 justify-center md:justify-start opacity-0 motion-safe:animate-fade-in"
              style={{ animationDelay: '450ms' }}
            >
              <FaHeart className="text-teal-500 text-2xl" />
              <span className="text-gray-800 font-medium">Experiencia cercana</span>
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-wrap justify-center md:justify-start gap-5 pt-6">
            <a
              href="#servicios"
              className="bg-teal-700 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-teal-800 transition"
            >
              Conoce nuestros servicios
            </a>
            <a
              href="https://wa.me/573043756405"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-green-600 transition"
            >
              Chatea con nosotros
            </a>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex-1 flex justify-center md:justify-end opacity-0 motion-safe:animate-fade-in">
          <img
            src="/Logo sin Fondo.png"
            alt="ConectaT"
            className="w-full max-w-md md:max-w-lg drop-shadow-2xl rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}