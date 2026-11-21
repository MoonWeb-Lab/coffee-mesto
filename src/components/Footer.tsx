import React from 'react';
import { MapPin, Clock, Instagram, Send } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-[#F4F4F1] border-t border-[#E4E4E0] pt-12 pb-24 text-[#666663] text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-[#E4E4E0]">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white border border-[#E4E4E0] flex items-center justify-center p-1 shadow-clean-sm">
                <img
                  src="./images/logo.webp"
                  alt="Логотип Кофе Место"
                  width="32"
                  height="32"
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="font-serif text-[#141414] font-bold text-sm sm:text-base tracking-tight">
                {CAFE_INFO.name}
              </h4>
            </div>

            <p className="text-[#666663] leading-relaxed text-xs max-w-sm">
              Кофейня в центре Минска. Готовим сытные и сладкие завтраки каждый день до 18:00, завариваем спешелти зерно свежей обжарки Spiritus.
            </p>

            <div className="flex items-center gap-2 text-[#666663] text-xs pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#2C5E43] flex-shrink-0" />
              <span>{CAFE_INFO.address} (м. {CAFE_INFO.subway})</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-[#141414] font-bold text-sm sm:text-base">Время работы и контакты</h4>
            <div className="space-y-2 text-[#666663] text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#2C5E43]" />
                <span>{CAFE_INFO.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-[#2C5E43]" />
                <span>Предзаказы и бронь: {CAFE_INFO.telegramBot}</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-[#2C5E43]" />
                <a
                  href={`https://instagram.com/${CAFE_INFO.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2C5E43] transition-colors underline font-medium"
                >
                  @{CAFE_INFO.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MoonWeb Lab Badge & Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[#888884] text-[11px]">
          <div>
            © {new Date().getFullYear()} «{CAFE_INFO.name}». Меню и сервис предзаказа.
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-[#E4E4E0] px-3 py-1.5 rounded-xl text-[#666663] shadow-clean-sm">
            <span>Разработано в</span>
            <span className="font-bold text-[#141414]">MoonWeb Lab</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
