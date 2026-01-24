import React from 'react';
import { CheckCircle2, Star, Trophy, Award, Globe } from './ui/Icons';
import { IMAGES } from '../constants';

const Authority: React.FC = () => {
  return (
    <>
      {/* Stats Bar */}
      <section className="bg-brand-gray py-12 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-white">
            <div className="flex items-center gap-4 bg-brand-dark p-6 rounded-lg shadow-lg border border-gray-800 w-full sm:w-auto flex-1 min-w-[260px] max-w-[320px]">
              <Star className="text-brand-red w-10 h-10 flex-shrink-0" />
              <div>
                <p className="font-black text-2xl">+10 Anos</p>
                <p className="text-gray-400 text-sm">de experiência</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-brand-dark p-6 rounded-lg shadow-lg border border-gray-800 w-full sm:w-auto flex-1 min-w-[260px] max-w-[320px]">
              <Trophy className="text-brand-red w-10 h-10 flex-shrink-0" />
              <div>
                <p className="font-black text-2xl">Atleta Pro</p>
                <p className="text-gray-400 text-sm">de MMA</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-brand-dark p-6 rounded-lg shadow-lg border border-gray-800 w-full sm:w-auto flex-1 min-w-[260px] max-w-[320px]">
              <Award className="text-brand-red w-10 h-10 flex-shrink-0" />
              <div>
                <p className="font-black text-2xl">Faixa Preta</p>
                <p className="text-gray-400 text-sm">2º Dan Karatê</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-brand-dark p-6 rounded-lg shadow-lg border border-gray-800 w-full sm:w-auto flex-1 min-w-[260px] max-w-[320px]">
              <Award className="text-brand-red w-10 h-10 flex-shrink-0" />
              <div>
                <p className="font-black text-2xl">Faixa Marrom</p>
                <p className="text-gray-400 text-sm">Kickboxing</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-brand-dark p-6 rounded-lg shadow-lg border border-gray-800 w-full sm:w-auto flex-1 min-w-[260px] max-w-[320px]">
              <Globe className="text-brand-red w-10 h-10 flex-shrink-0" />
              <div>
                <p className="font-black text-2xl">Internacional</p>
                <p className="text-gray-400 text-sm">Japão 2019 e 2023</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-xl italic font-light text-gray-300">
              "Treinamento orientado por performance e evolução constante."
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 relative">
               <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-brand-red -translate-x-4 -translate-y-4"></div>
               <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-brand-red translate-x-4 translate-y-4"></div>
               <img 
                src={IMAGES.trainer}
                alt="Treinador Alisson" 
                className="w-full h-auto rounded shadow-2xl transition-all duration-500 object-cover aspect-[4/5]"
              />
            </div>
            
            <div className="w-full lg:w-1/2">
              <h4 className="text-brand-red font-bold uppercase tracking-wider mb-2">Sobre o Studio</h4>
              <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 uppercase italic">
                Fight Performance Studio
              </h2>
              
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  O <strong className="text-brand-dark">Fight Performance Studio</strong> é especializado em treinamento de lutas e condicionamento físico, com foco em performance, segurança e resultados reais.
                </p>
                <p>
                  O trabalho é conduzido por <strong className="text-brand-red">Alisson</strong>, atleta profissional de MMA, Faixa Preta 2º Dan em Karatê e Faixa Marrom em Kickboxing, com mais de 10 anos de experiência ministrando aulas para iniciantes e praticantes avançados.
                </p>
                
                <div className="bg-gray-50 p-6 border-l-4 border-brand-red rounded-r-lg">
                  <p className="font-medium text-brand-dark">
                    Cada treino é planejado de forma individual, respeitando objetivos, limitações e nível físico de cada aluno.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Authority;