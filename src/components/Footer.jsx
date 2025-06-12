import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Twitter, Youtube, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { title: 'Empresa', links: [
      { label: 'Acerca de nosotros', path: '/acerca-de-nosotros' },
      { label: 'Carreras', path: '/carreras' },
      { label: 'Prensa', path: '/prensa' },
    ]},
    { title: 'Comunidad', links: [
      { label: 'Foro', path: '/foro' },
      { label: 'Eventos', path: '/proximos-eventos' },
      { label: 'Blog', path: '/noticias' },
    ]},
    { title: 'Legal', links: [
      { label: 'Privacidad', path: '/privacidad' },
      { label: 'Términos', path: '/terminos' },
      { label: 'Ajustes de Cookies', path: '/ajustes' },
    ]},
    { title: 'Soporte', links: [
      { label: 'Ayuda', path: '/ayuda' },
      { label: 'Contacto', path: '/contacto' },
      { label: 'Ajustes', path: '/ajustes' },
    ]},
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-8">
          <div className="col-span-2 lg:col-span-2 pr-8">
            <Link to="/" className="flex items-center space-x-2 mb-4">
               <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 25H35V40H20V25Z" fill="hsl(var(--primary))"/>
                <path d="M42.5 25H57.5V40H42.5V25Z" fill="hsl(var(--primary))"/>
                <path d="M65 25H80V40H65V25Z" fill="hsl(var(--primary))"/>
                <path d="M30 47.5H45V62.5H30V47.5Z" fill="hsl(var(--primary))"/>
                <path d="M52.5 47.5H67.5V62.5H52.5V47.5Z" fill="hsl(var(--primary))"/>
              </svg>
              <span className="orbitron-font text-xl font-bold text-foreground">notmine.com</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tu portal definitivo para noticias, guías y la vibrante comunidad de Minecraft. Explora, crea y conecta.
            </p>
          </div>
          {footerLinks.map(section => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link 
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} notmine.com. Todos los derechos reservados. Minecraft es una marca registrada de Mojang Synergies AB.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map(social => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;