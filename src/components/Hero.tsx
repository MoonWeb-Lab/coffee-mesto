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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFE6] to-[#FAF7F2] border-b border-[#E8E0D5]/70 pt-3.5 pb-2.5 sm:pt-5 sm:pb-4 lg:pt-6 lg:pb-4">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#E8E0D5] text-[#8C4015] text-[11px] font-medium shadow-warm-sm">
              <Sparkles className="w-3 h-3 text-[#C86428]" />
              <span>Кофейня возле площади Победы</span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#1E1916] leading-snug">
              Утренний кофе и неспешные завтраки на Независимости
            </h1>

            <p className="text-xs sm:text-sm text-[#6B625B] leading-relaxed max-w-xl">
              Готовим драники, боулы, тосты и сырники каждый день до 18:00. Завариваем спешелти зерно свежей обжарки Spiritus. Оформите предзаказ ко времени визита.
            </p>

            {/* Badges row */}
            <div className="pt-0.5 flex flex-wrap items-center gap-1.5 text-[11px]">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E8E0D5] text-[#1E1916] font-medium shadow-warm-sm">
                <UtensilsCrossed className="w-3 h-3 text-[#C86428]" />
                <span>Завтраки до 18:00</span>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E8E0D5] text-[#1E1916] font-medium shadow-warm-sm">
                <Coffee className="w-3 h-3 text-[#C86428]" />
                <span>Зерно Spiritus</span>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E8E0D5] text-[#1E1916] font-medium shadow-warm-sm">
                <span>⚡ Предзаказ без очереди</span>
              </div>
            </div>
          </div>

          {/* Right Featured Card Showcase (Visible on desktop to keep mobile screen compact) */}
          {featuredItem && (
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative bg-white rounded-2xl p-3 border border-[#E8E0D5] shadow-warm hover:shadow-warm-lg transition-shadow duration-300">
                <div 
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF7F2] cursor-pointer group"
                  onClick={() => onOpenDetails(featuredItem)}
                >
                  <img
                    src={featuredItem.image}
                    alt={featuredItem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[#C86428] shadow-sm backdrop-blur-sm border border-[#E8E0D5]/60">
                      ★ Выбор гостей
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/60 text-white backdrop-blur-sm">
                      {featuredItem.weight}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <div>
                    <h3 
                      onClick={() => onOpenDetails(featuredItem)}
                      className="text-sm font-bold text-[#1E1916] hover:text-[#C86428] transition-colors cursor-pointer line-clamp-1"
                    >
                      {featuredItem.name}
                    </h3>
                    <p className="text-[11px] text-[#6B625B] line-clamp-1">
                      {featuredItem.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-black text-[#1E1916]">
                      {featuredItem.price} <span className="text-[10px] font-normal text-[#6B625B]">BYN</span>
                    </span>
                    <button
                      onClick={() => onAddToCart(featuredItem)}
                      className="px-2.5 py-1 rounded-full bg-[#C86428] hover:bg-[#B0531C] active:bg-[#984414] text-white text-[11px] font-semibold flex items-center gap-1 active:scale-95 transition-all shadow-sm"
                    >
                      <Plus className="w-3 h-3" />
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
