import React from 'react';
import { MapPin } from './ui/Icons';
import { IMAGES } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={IMAGES.hero} 
          alt="Treinamento de Luta" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40"></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative mt-16 md:mt-0">
        <div className="max-w-3xl">
          <h2 className="text-brand-red font-bold tracking-wider uppercase mb-2 animate-fade-in-up">
            Personal Fight
          </h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase italic leading-tight mb-6 drop-shadow-lg">
            Treinamento de <br/>
            Lutas Personalizado <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-500">
              No Seu Local
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl font-light">
            Performance, técnica e condicionamento físico com acompanhamento profissional.
          </p>

          <div className="flex items-center text-gray-400 gap-2">
            <MapPin size={20} className="text-brand-red" />
            <p className="font-medium tracking-wide">Atendimento presencial em Bauru e região</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;