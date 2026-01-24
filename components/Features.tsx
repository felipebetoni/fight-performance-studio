import React from 'react';
import { Shield, Activity, HeartPulse, Briefcase, Scale, Users } from './ui/Icons';
import { IMAGES } from '../constants';

const Features: React.FC = () => {
  return (
    <div className="bg-brand-light">
      {/* What the training delivers */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark uppercase italic mb-4">
            O que o Treino Entrega
          </h2>
          <div className="w-24 h-1 bg-brand-red mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-red transition-colors duration-300">
              <Shield className="w-8 h-8 text-brand-red group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-brand-dark">Defesa Pessoal</h3>
            <p className="text-gray-600">
              Técnicas práticas para situações reais, aumentando autoconfiança, controle emocional e capacidade de reação.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-red transition-colors duration-300">
              <Activity className="w-8 h-8 text-brand-red group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-brand-dark">Condicionamento Físico</h3>
            <p className="text-gray-600">
              Desenvolvimento de força, resistência, agilidade e coordenação motora com treinos estruturados.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-red transition-colors duration-300">
              <HeartPulse className="w-8 h-8 text-brand-red group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-brand-dark">Emagrecimento</h3>
            <p className="text-gray-600">
              Alto gasto calórico, redução do estresse e melhora significativa da saúde física e mental.
            </p>
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-black uppercase italic mb-6">
                Diferenciais do Studio
              </h2>
              <p className="text-xl text-gray-400 mb-8 font-light">
                Performance não é improviso. <span className="text-white font-bold">É método.</span>
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1">
                    <Briefcase className="text-brand-red w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Gestão Profissional</h3>
                    <p className="text-gray-400">Planejamento estratégico de treino, metas claras, avaliações constantes, contrato digital e pagamento seguro.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1">
                    <Scale className="text-brand-red w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Avaliação Física</h3>
                    <p className="text-gray-400">Acompanhamento contínuo de peso, percentual de gordura, massa muscular e evolução física.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1">
                    <Users className="text-brand-red w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Treine com um Amigo</h3>
                    <p className="text-gray-400">Possibilidade de treino em dupla uma vez por mês, aumentando motivação e engajamento.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center">
               <div className="relative w-full max-w-md transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src={IMAGES.differentials} 
                    alt="Fight Performance Studio Brand" 
                    className="w-full h-auto rounded-2xl shadow-2xl border border-gray-800"
                  />
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;