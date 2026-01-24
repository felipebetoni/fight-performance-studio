import React from 'react';
import { MessageCircle, CalendarCheck, Activity, Target, MapPin, Clock, Users, Dumbbell } from './ui/Icons';
import { WHATSAPP_LINK } from '../constants';

const Process: React.FC = () => {
  return (
    <>
      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase italic">Como Funciona</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { icon: MessageCircle, title: "Contato", desc: "Pelo WhatsApp" },
               { icon: CalendarCheck, title: "Agendamento", desc: "Aula experimental" },
               { icon: Activity, title: "Avaliação", desc: "Física inicial" },
               { icon: Target, title: "Personal Fight", desc: "Início dos treinos" },
             ].map((step, idx) => (
               <div key={idx} className="flex flex-col items-center text-center group">
                 <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 relative z-10 group-hover:bg-brand-red transition-colors duration-300">
                   <step.icon className="w-8 h-8 text-brand-dark group-hover:text-white" />
                   <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-dark text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">
                     {idx + 1}
                   </div>
                 </div>
                 <h3 className="font-bold text-xl mb-1">{step.title}</h3>
                 <p className="text-gray-500">{step.desc}</p>
                 {/* Connector Line (Desktop) */}
                 {idx < 3 && (
                   <div className="hidden lg:block absolute w-full h-0.5 bg-gray-200 top-10 left-1/2 -z-0 translate-x-12 max-w-[200px]" />
                 )}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Logistics */}
      <section className="py-20 bg-brand-light relative overflow-hidden">
        <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-5xl mx-auto border-t-8 border-brand-red">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase italic mb-4">
                        Aulas Presenciais Personalizadas
                    </h2>
                    <p className="text-xl text-brand-red font-bold">Sem academia. O treino vai até você.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                        <Clock className="w-10 h-10 text-brand-red mb-4" />
                        <h3 className="font-bold text-lg mb-2">Duração</h3>
                        <p className="text-gray-600">60 Minutos</p>
                    </div>

                    <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                        <Users className="w-10 h-10 text-brand-red mb-4" />
                        <h3 className="font-bold text-lg mb-2">Modalidades</h3>
                        <p className="text-gray-600">Individual ou Dupla</p>
                    </div>

                    <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                        <MapPin className="w-10 h-10 text-brand-red mb-4" />
                        <h3 className="font-bold text-lg mb-2">Local do Aluno</h3>
                        <p className="text-gray-600">Residência, Condomínio, Parques ou Praças</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Process;