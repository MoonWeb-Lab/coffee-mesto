import React from 'react';
import { MapPin, Clock, Instagram, ShoppingBag } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, cartTotal, onOpenCart }) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8E0D5]/80 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden border border-[#E0D7CA] bg-white flex items-center justify-center p-1 shadow-warm-sm flex-shrink-0">
            <img
              src="./images/logo.webp"
              alt="Логотип Кофе Место"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#1E1916]">
                {CAFE_INFO.name}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#F3E8DC] text-[#8C4015] px-2 py-0.5 rounded-full">
                Кофейня
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-[#6B625B] mt-0.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#C86428]" />
                {CAFE_INFO.address}
              </span>
              <span className="hidden sm:inline text-[#D8CEBF]">•</span>
              <span className="hidden sm:inline text-[#786F66]">
                м. {CAFE_INFO.subway}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Working hours pill on desktop */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-[#6B625B] bg-white px-3 py-1.5 rounded-full border border-[#E8E0D5] shadow-warm-sm">
            <Clock className="w-3.5 h-3.5 text-[#C86428]" />
            <span>Пн-Пт 09:00 - 22:00</span>
          </div>

          <a
            href={`https://instagram.com/${CAFE_INFO.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white border border-[#E8E0D5] flex items-center justify-center text-[#6B625B] hover:text-[#C86428] hover:border-[#C86428]/40 transition-colors shadow-warm-sm"
            title="Instagram заведения"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#C86428] hover:bg-[#B0531C] active:bg-[#984414] text-white font-semibold text-xs active:scale-95 transition-all shadow-md shadow-[#C86428]/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden xs:inline">Заказ</span>
            {cartCount > 0 && (
              <span className="bg-white text-[#C86428] text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                {cartTotal} BYN
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
