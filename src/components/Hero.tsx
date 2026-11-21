import React from 'react';
import { Sparkles, UtensilsCrossed, Coffee, ArrowDown, Plus } from 'lucide-react';
import { MenuItem } from '../types';

interface HeroProps {
  featuredItem?: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onOpenDetails: (item: MenuItem) => void;
}

export const Hero: React.FC<HeroProps> = ({ featuredItem, onAddToCart, onOpenDetails }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFE6] to-[#FAF7F2] border-b border-[#E8E0D5]/70 py-6 sm:py-9">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E8E0D5] text-[#8C4015] text-xs font-medium shadow-warm-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C86428]" />
              <span>Кофейня возле площади Победы</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1E1916] leading-tight">
              Утренний кофе и неспешные завтраки на Независимости
            </h1>

            <p className="text-sm sm:text-base text-[#6B625B] leading-relaxed max-w-xl">
              Готовим домашние драники, боулы, тосты и панкейки каждый день до 18:00. Завариваем спешелти зерно свежей обжарки Spiritus. Выберите блюда и оформите быстрый предзаказ ко времени вашего прихода.
            </p>

            {/* Micro badges row */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8E0D5] text-[#1E1916] font-medium shadow-warm-sm">
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#C86428]" />
                <span>Завтраки до 18:00</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8E0D5] text-[#1E1916] font-medium shadow-warm-sm">
                <Coffee className="w-3.5 h-3.5 text-[#C86428]" />
                <span>Зерно Spiritus Coffee</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E8E0D5] text-[#1E1916] font-medium shadow-warm-sm">
                <span>⚡ Быстрый предзаказ</span>
              </div>
            </div>
          </div>

          {/* Right Featured Card Showcase */}
          {featuredItem && (
            <div className="lg:col-span-5">
              <div className="relative bg-white rounded-3xl p-3.5 sm:p-4 border border-[#E8E0D5] shadow-warm hover:shadow-warm-lg transition-shadow duration-300">
                <div 
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF7F2] cursor-pointer group"
                  onClick={() => onOpenDetails(featuredItem)}
                >
                  <img
                    src={featuredItem.image}
                    alt={featuredItem.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#C86428] shadow-sm backdrop-blur-sm border border-[#E8E0D5]/60">
                      ★ Выбор гостей
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-black/60 text-white backdrop-blur-sm">
                      {featuredItem.weight}
                    </span>
                  </div>
                </div>

                <div className="mt-3.5 flex items-center justify-between gap-3">
                  <div>
                    <h3 
                      onClick={() => onOpenDetails(featuredItem)}
                      className="text-sm sm:text-base font-bold text-[#1E1916] hover:text-[#C86428] transition-colors cursor-pointer line-clamp-1"
                    >
                      {featuredItem.name}
                    </h3>
                    <p className="text-xs text-[#6B625B] line-clamp-1 mt-0.5">
                      {featuredItem.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <span className="text-base font-black text-[#1E1916]">
                      {featuredItem.price} <span className="text-xs font-normal text-[#6B625B]">BYN</span>
                    </span>
                    <button
                      onClick={() => onAddToCart(featuredItem)}
                      className="px-3 py-1.5 rounded-full bg-[#C86428] hover:bg-[#B0531C] active:bg-[#984414] text-white text-xs font-semibold flex items-center gap-1 active:scale-95 transition-all shadow-sm"
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
