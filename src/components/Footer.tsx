import React from 'react';
import { MapPin, Clock, Instagram, Coffee, Heart, Send } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-[#111113] border-t border-zinc-800/80 pt-10 pb-24 text-zinc-400 text-xs">
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-zinc-800/60">
          <div className="space-y-2">
            <h4 className="text-white font-semibold flex items-center gap-2 text-sm">
              <Coffee className="w-4 h-4 text-amber-500" />
              <span>{CAFE_INFO.name}</span>
            </h4>
            <p className="text-zinc-400 leading-relaxed text-xs">
              Городская кофейня и бистро завтраков в самом сердце Минска. Готовим сытные и сладкие завтраки до 18:00 каждый день.
            </p>
            <div className="flex items-center gap-2 text-zinc-400 text-xs pt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <span>{CAFE_INFO.address} (м. {CAFE_INFO.subway})</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-semibold text-sm">Время работы и контакты</h4>
            <div className="space-y-1 text-zinc-400 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span>{CAFE_INFO.hours}</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span>Предзаказы: {CAFE_INFO.telegramBot}</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <a
                  href={`https://instagram.com/${CAFE_INFO.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline"
                >
                  @{CAFE_INFO.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MoonWeb Lab Badge & Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} «{CAFE_INFO.name}». Меню и предзаказ.
          </div>

          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-zinc-400">
            <span>Разработано с</span>
            <Heart className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-zinc-200">MoonWeb Lab</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
