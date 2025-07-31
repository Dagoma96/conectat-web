import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import emailjs from '@emailjs/browser';

type Status = 'idle' | 'loading' | 'success' | 'error';

// ⬇️ Reemplaza por tus credenciales reales
const EMAILJS_SERVICE_ID = 'service_56ztlmx';
const EMAILJS_TEMPLATE_ID = 'template_tkwuobb';
const EMAILJS_PUBLIC_KEY = 'mRo3mktUIzCoDQf1Z';

// Variants tipados + easing como cubic‑bézier
const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }, // ≈ easeOut
  },
};

const banner: Variants = {
  hidden: { opacity: 0, y: -12, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: 'auto',
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    height: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }, // ≈ easeInOut
  },
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setErrorMessage('Por favor, completa todos los campos.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Por favor, ingresa un correo electrónico válido.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      setStatus('error');
      return;
    }

    try {
      setStatus('loading');

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name: formData.name, email: formData.email, message: formData.message },
        { publicKey: EMAILJS_PUBLIC_KEY } // con @emailjs/browser va como objeto
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Hubo un problema al enviar tu mensaje. Intenta de nuevo.');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="space-y-6"
      aria-busy={status === 'loading'}
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout">
        {status === 'success' && (
          <motion.div
            key="success"
            variants={banner}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-800 text-sm"
          >
            ✅ ¡Tu mensaje fue enviado con éxito! Te contactaremos pronto.
          </motion.div>
        )}
        {status === 'error' && errorMessage && (
          <motion.div
            key="error"
            variants={banner}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-800 text-sm"
          >
            ❌ {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={item}>
        <label htmlFor="name" className="block font-semibold text-gray-800">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/70"
          aria-required="true"
        />
      </motion.div>

      <motion.div variants={item}>
        <label htmlFor="email" className="block font-semibold text-gray-800">Correo</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tucorreo@email.com"
          className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/70"
          aria-required="true"
        />
      </motion.div>

      <motion.div variants={item}>
        <label htmlFor="message" className="block font-semibold text-gray-800">Mensaje</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="¿Cómo podemos ayudarte?"
          className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/70"
          aria-required="true"
        />
      </motion.div>

      <motion.div variants={item}>
        <motion.button
          type="submit"
          disabled={status === 'loading'}
          whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
          whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
          className={`w-full py-3 text-white font-semibold rounded-lg transition ${
            status === 'loading'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 shadow-md'
          }`}
        >
          {status === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;