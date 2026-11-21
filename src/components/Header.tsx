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
    <header className="relative bg-[#141416] border-b border-zinc-800/80">
      {/* Top Banner Notice */}
      <div className="bg-zinc-900 text-zinc-300 text-xs py-1.5 px-4 text-center border-b border-zinc-800 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>{CAFE_INFO.tagline}</span>
        <span className="text-zinc-600">•</span>
        <span className="text-zinc-400">Кофе {CAFE_INFO.coffeeRoastery}</span>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand Monogram & Title */}
        <div className="flex items-center gap-3">
          {/* Real Avatar Logo from Instagram profile */}
          <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-700 bg-white flex items-center justify-center p-1.5 shadow-md flex-shrink-0">
            <img 
              src="./images/logo.webp" 
              alt="Логотип Кофе Место" 
              className="w-full h-full object-contain" 
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white">{CAFE_INFO.name}</h1>
              <span className="text-[10px] font-medium uppercase tracking-wider bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">
                Кофейня
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400 mt-0.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                {CAFE_INFO.address}
              </span>
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <a
            href="https://instagram.com/coffee_mesto"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
            title="Instagram заведения"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-amber-500 text-black font-semibold text-xs hover:bg-amber-400 active:scale-95 transition-all shadow-md shadow-amber-500/10"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden xs:inline">Заказ</span>
            {cartCount > 0 && (
              <span className="bg-black text-amber-400 text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                {cartTotal} BYN
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Sub info row on mobile */}
      <div className="max-w-2xl mx-auto px-4 pb-3 flex items-center justify-between text-[11px] text-zinc-400">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-zinc-500" />
          <span>{CAFE_INFO.hours}</span>
        </div>
        <div className="text-zinc-500">
          м. {CAFE_INFO.subway}
        </div>
      </div>
    </header>
  );
};
