import React from 'react';
import { MapPin } from './ui/Icons';
import { IMAGES } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative flex min-h-[620px] w-full items-center justify-center overflow-hidden sm:min-h-[600px]">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={IMAGES.hero} 
          alt="Treinamento de Luta" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-24 sm:pt-28 md:mt-0 md:pt-0">
        <div className="max-w-3xl">
          <h2 className="text-brand-red font-bold tracking-wider uppercase mb-2 animate-fade-in-up">
            Personal Fight
          </h2>
          <h1 className="mb-5 text-4xl font-black leading-tight text-white uppercase italic drop-shadow-lg sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl">
            Treinamento de <br/>
            Lutas Personalizado <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-500">
              No Seu Local
            </span>
          </h1>
          
          <p className="mb-7 max-w-xl text-base font-light text-gray-200 sm:text-lg md:mb-8 md:text-xl">
            Performance, técnica e condicionamento físico com acompanhamento profissional.
          </p>

          <div className="flex items-start gap-2 text-gray-300">
            <MapPin size={20} className="text-brand-red" />
            <p className="font-medium tracking-wide">Atendimento presencial em Bauru e região</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;