import React from 'react';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

interface SocialLinksProps {
  variant?: 'header' | 'footer';
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ variant = 'footer', className = '' }) => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/conectat.tech',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/conectat.tech',
      color: 'hover:text-pink-600'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/573043756405?text=¡Hola%20ConectaT!%20Me%20interesa%20conocer%20más%20sobre%20sus%20servicios.',
      color: 'hover:text-green-600'
    }
  ];

  const baseClasses = variant === 'header' 
    ? 'flex items-center space-x-3'
    : 'flex space-x-4';

  return (
    <div className={`${baseClasses} ${className}`}>
      {socialLinks.map((social) => {
        const IconComponent = social.icon;
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              variant === 'header'
                ? `p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 ${social.color} transition-all duration-200`
                : `w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 group text-gray-400 ${social.color}`
            }`}
            aria-label={`Seguir en ${social.name}`}
          >
            <IconComponent className={variant === 'header' ? 'w-5 h-5' : 'w-5 h-5 group-hover:scale-110 transition-transform duration-200'} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;