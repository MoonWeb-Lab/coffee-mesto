import React from 'react';
import { Sparkles, UtensilsCrossed, Coffee, Plus } from 'lucide-react';
import { MenuItem } from '../types';

interface HeroProps {
  featuredItem?: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onOpenDetails: (item: MenuItem) => void;
}

export const Hero: React.FC<HeroProps> = ({ featuredItem, onAddToCart, onOpenDetails }) => {
  return (
    <section className="relative overflow-hidden bg-[#F4F4F1] border-b border-[#E4E4E0] pt-4 pb-3 sm:pt-6 sm:pb-5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-2.5 sm:space-y-3.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#E4E4E0] text-[#1C3E2C] text-[11px] font-medium shadow-clean-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#2C5E43]" />
              <span>Спешелти кофейня на площади Победы</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#141414] leading-tight">
              Свежий кофе и неспешные завтраки на Независимости
            </h1>

            <p className="text-xs sm:text-sm text-[#666663] leading-relaxed max-w-xl">
              Готовим драники, боулы, омлеты и сырники каждый день до 18:00. Завариваем спешелти зерно свежей обжарки Spiritus. Выберите позиции и оформите предзаказ ко времени вашего визита.
            </p>

            {/* Badges row */}
            <div className="pt-0.5 flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#E4E4E0] text-[#141414] font-medium shadow-clean-sm">
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#2C5E43]" />
                <span>Завтраки до 18:00</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#E4E4E0] text-[#141414] font-medium shadow-clean-sm">
                <Coffee className="w-3.5 h-3.5 text-[#2C5E43]" />
                <span>Зерно Spiritus</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#E4E4E0] text-[#141414] font-medium shadow-clean-sm">
                <span>⚡ Предзаказ навынос</span>
              </div>
            </div>
          </div>

          {/* Right Featured Card Showcase (Desktop only to keep mobile viewport compact) */}
          {featuredItem && (
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative bg-white rounded-2xl p-3 border border-[#E4E4E0] shadow-clean hover:shadow-clean-lg transition-shadow duration-300">
                <div 
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F4F4F1] cursor-pointer group"
                  onClick={() => onOpenDetails(featuredItem)}
                >
                  <img
                    src={featuredItem.image}
                    alt={featuredItem.name}
                    width="800"
                    height="600"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-white/95 text-[#2C5E43] shadow-clean-sm border border-[#E4E4E0]">
                      ★ Выбор гостей
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/60 text-white backdrop-blur-sm">
                      {featuredItem.weight}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div>
                    <h3 
                      onClick={() => onOpenDetails(featuredItem)}
                      className="font-serif text-sm font-bold text-[#141414] hover:text-[#2C5E43] transition-colors cursor-pointer line-clamp-1"
                    >
                      {featuredItem.name}
                    </h3>
                    <p className="text-[11px] text-[#666663] line-clamp-1 mt-0.5">
                      {featuredItem.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <span className="text-sm font-bold text-[#141414]">
                      {featuredItem.price} <span className="text-[11px] font-normal text-[#666663]">BYN</span>
                    </span>
                    <button
                      onClick={() => onAddToCart(featuredItem)}
                      className="px-3 py-1.5 rounded-lg bg-[#2C5E43] hover:bg-[#234B35] active:bg-[#1A3B2A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C5E43] focus-visible:ring-offset-2 text-white text-[11px] font-semibold flex items-center gap-1 active:scale-95 transition-all shadow-clean-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>В заказ</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
