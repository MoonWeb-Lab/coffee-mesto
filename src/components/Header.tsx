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
    <header className="sticky top-0 z-30 bg-[#F4F4F1]/90 backdrop-blur-md border-b border-[#E4E4E0] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#E4E4E0] bg-white flex items-center justify-center p-1 shadow-clean-sm flex-shrink-0">
            <img
              src="./images/logo.webp"
              alt="Логотип Кофе Место"
              width="44"
              height="44"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#141414]">
                {CAFE_INFO.name}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#E3ECE7] text-[#1C3E2C] border border-[#D2E2D8] px-2 py-0.5 rounded-md">
                Кофейня
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] text-[#666663] mt-0.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#2C5E43]" />
                <span>{CAFE_INFO.address}</span>
              </span>
              <span className="hidden sm:inline text-[#D0D0C8]">•</span>
              <span className="hidden sm:inline">
                м. {CAFE_INFO.subway}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-[#666663] bg-white px-3 py-1.5 rounded-xl border border-[#E4E4E0] shadow-clean-sm">
            <Clock className="w-3.5 h-3.5 text-[#2C5E43]" />
            <span>Пн-Пт 09:00 - 22:00</span>
          </div>

          <a
            href={`https://instagram.com/${CAFE_INFO.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-white border border-[#E4E4E0] flex items-center justify-center text-[#666663] hover:text-[#2C5E43] hover:border-[#2C5E43]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C5E43] focus-visible:ring-offset-2 active:scale-95 transition-all shadow-clean-sm"
            title="Instagram заведения"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#2C5E43] hover:bg-[#234B35] active:bg-[#1A3B2A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C5E43] focus-visible:ring-offset-2 text-white font-medium text-xs active:scale-95 transition-all shadow-clean-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden xs:inline">Заказ</span>
            {cartCount > 0 && (
              <span className="bg-white text-[#2C5E43] text-[11px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                {cartTotal} BYN
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
