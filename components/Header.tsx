import React, { useState, useEffect } from 'react';
import { MessageCircle, Instagram, UserRound } from './ui/Icons';
import { WHATSAPP_LINK, INSTAGRAM_LINK, IMAGES } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-brand-dark shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Logo Container */}
          <div className="relative h-16 w-auto md:h-24 flex items-center justify-center">
            <img 
              src={IMAGES.logo} 
              alt="Fight Performance Studio Logo" 
              className="h-full w-auto object-contain" 
            />
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-black text-white tracking-tighter uppercase italic leading-none">
              FIGHT <span className="text-brand-red">PERFORMANCE</span>
            </h1>
            <span className="text-[10px] text-gray-300 tracking-widest uppercase leading-none">
              Studio
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <a 
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-colors ${isScrolled ? 'text-white hover:text-brand-red' : 'text-white hover:text-brand-red bg-black/20 hover:bg-black/40'}`}
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>

          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-full font-bold text-sm transition-colors shadow-md"
          >
            <MessageCircle size={18} />
            <span className="hidden md:inline">Agendar pelo WhatsApp</span>
            <span className="md:hidden">Agendar</span>
          </a>
          <a
            href="/professor"
            className="flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
          >
            <UserRound size={17} />
            <span className="hidden md:inline">Área do professor</span>
            <span className="md:hidden">Professor</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;