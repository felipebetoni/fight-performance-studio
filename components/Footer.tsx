import React from 'react';
import { Phone, MapPin, Instagram } from './ui/Icons';
import { WHATSAPP_LINK, INSTAGRAM_LINK, LOCATION_TEXT } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8 border-t border-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-black italic uppercase mb-4">
              FIGHT <span className="text-brand-red">PERFORMANCE</span> STUDIO
            </h2>
            <p className="text-gray-400 max-w-sm mb-6">
              Personal Fight – Treinamento de Lutas Personalizado. Performance, disciplina e resultado onde você estiver.
            </p>
            <div className="flex gap-4">
              <a 
                href={INSTAGRAM_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-red transition-colors flex items-center gap-2"
              >
                <Instagram size={20} />
                <span className="text-sm font-medium">@alissonmlpereira</span>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-6 border-b border-gray-800 pb-2 inline-block">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-brand-red mt-1" />
                <div>
                    <span className="block text-white">WhatsApp</span>
                    <a href={WHATSAPP_LINK} className="hover:text-brand-red transition-colors">
                        (14) 99619-0682
                    </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-brand-red mt-1" />
                <div>
                    <span className="block text-white">Local</span>
                    <span>{LOCATION_TEXT}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-6 border-b border-gray-800 pb-2 inline-block">Legal</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-brand-red transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Fight Performance Studio. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;