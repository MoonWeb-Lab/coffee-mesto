import React from 'react';
import { MapPin, Clock, Instagram, Coffee, Heart, Send } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-[#F4EFE6] border-t border-[#E8E0D5] pt-12 pb-24 text-[#6B625B] text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-[#E5DDD1]">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white border border-[#E0D7CA] flex items-center justify-center p-1 shadow-warm-sm">
                <img
                  src="./images/logo.webp"
                  alt="Логотип Кофе Место"
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="text-[#1E1916] font-bold text-sm tracking-tight">
                {CAFE_INFO.name}
              </h4>
            </div>

            <p className="text-[#6B625B] leading-relaxed text-xs max-w-sm">
              Кофейня в центре Минска. Готовим сытные и сладкие завтраки до 18:00 каждый день, варим спешелти кофе свежей обжарки Spiritus.
            </p>

            <div className="flex items-center gap-2 text-[#6B625B] text-xs pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#C86428] flex-shrink-0" />
              <span>{CAFE_INFO.address} (м. {CAFE_INFO.subway})</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[#1E1916] font-bold text-sm">Время работы и контакты</h4>
            <div className="space-y-2 text-[#6B625B] text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C86428]" />
                <span>{CAFE_INFO.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-[#C86428]" />
                <span>Предзаказы и бронь: {CAFE_INFO.telegramBot}</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-[#C86428]" />
                <a
                  href={`https://instagram.com/${CAFE_INFO.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1E1916] transition-colors underline font-medium"
                >
                  @{CAFE_INFO.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MoonWeb Lab Badge & Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[#9E958C] text-[11px]">
          <div>
            © {new Date().getFullYear()} «{CAFE_INFO.name}». Онлайн-меню и сервис предзаказа.
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-[#E8E0D5] px-3.5 py-1.5 rounded-full text-[#6B625B] shadow-warm-sm">
            <span>Разработано в</span>
            <Heart className="w-3 h-3 text-[#C86428] fill-[#C86428]" />
            <span className="font-bold text-[#1E1916]">MoonWeb Lab</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
