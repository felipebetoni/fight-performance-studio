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
        isScrolled ? 'bg-brand-dark shadow-lg py-2' : 'bg-brand-dark/95 shadow-lg py-2 md:bg-transparent md:shadow-none md:py-4'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-2 px-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {/* Logo Container */}
          <div className="relative flex h-12 w-auto shrink-0 items-center justify-center sm:h-16 md:h-24">
            <img 
              src={IMAGES.logo} 
              alt="Fight Performance Studio Logo" 
              className="h-full w-auto object-contain" 
            />
          </div>
          
          <div className="flex min-w-0 flex-col max-[359px]:hidden">
            <h1 className="truncate text-sm font-black tracking-tighter text-white uppercase italic leading-none sm:text-lg md:text-xl">
              FIGHT <span className="text-brand-red">PERFORMANCE</span>
            </h1>
            <span className="text-[9px] tracking-widest text-gray-300 uppercase leading-none sm:text-[10px]">
              Studio
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3 md:gap-4">
          <a 
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full p-2 transition-colors ${isScrolled ? 'text-white hover:text-brand-red' : 'text-white hover:text-brand-red bg-black/20 hover:bg-black/40'}`}
            aria-label="Instagram"
          >
            <Instagram size={20} className="sm:h-6 sm:w-6" />
          </a>

          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2 text-xs font-bold text-white shadow-md transition-colors hover:bg-[#128C7E] sm:gap-2 sm:px-4 sm:text-sm"
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline">Agendar pelo WhatsApp</span>
            <span className="sm:hidden">Agendar</span>
          </a>
          <a
            href="/professor"
            className="flex items-center gap-1.5 rounded-full border border-white/50 px-2.5 py-2 text-xs font-bold text-white transition hover:border-white hover:bg-white/10 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <UserRound size={17} />
            <span className="hidden sm:inline">Área do professor</span>
            <span className="sm:hidden">Prof.</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;