import React from 'react';
import { CheckCircle2, Dumbbell } from './ui/Icons';
import { WHATSAPP_LINK } from '../constants';

const Audience: React.FC = () => {
  const audienceList = [
    "Iniciantes em lutas",
    "Pessoas que buscam emagrecimento",
    "Quem deseja aprender defesa pessoal",
    "Homens e mulheres de diferentes idades"
  ];

  return (
    <div className="bg-brand-dark text-white">
      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Checklist */}
            <div className="w-full lg:w-1/2">
                <h2 className="text-3xl md:text-5xl font-black uppercase italic mb-8 leading-tight">
                    Para quem é o <br/>
                    <span className="text-brand-red">Personal Fight?</span>
                </h2>

                <ul className="space-y-6">
                    {audienceList.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-4 text-xl font-light">
                            <CheckCircle2 className="text-brand-red w-6 h-6 flex-shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Results Box */}
            <div className="w-full lg:w-1/2">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-2xl border border-gray-700 shadow-2xl relative overflow-hidden">
                    <Dumbbell className="absolute top-0 right-0 w-64 h-64 text-white/5 -rotate-45 transform translate-x-12 -translate-y-12" />
                    
                    <h3 className="text-2xl font-bold mb-6 text-white uppercase tracking-wider relative z-10">
                        Resultados & Experiência
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed relative z-10 mb-8">
                        Mais de uma década ajudando alunos a desenvolver condicionamento físico, técnica, disciplina e confiança por meio do treinamento de lutas e performance corporal.
                    </p>
                    
                    <div className="w-full h-px bg-gray-700 mb-8 relative z-10"></div>
                    
                    <div className="relative z-10 text-center">
                        <p className="text-white font-bold text-xl mb-6">Eleve seu treino a outro nível.</p>
                        <a 
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-full bg-brand-red hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors shadow-lg shadow-red-900/30 uppercase tracking-wide"
                        >
                            Agendar Aula Experimental
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Audience;