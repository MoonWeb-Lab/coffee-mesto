import React from 'react';
import { Plus, Minus, Flame, Eye } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  cartQuantity: number;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
  onOpenDetails: (item: MenuItem) => void;
  priority?: boolean;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  cartQuantity,
  onAddToCart,
  onRemoveFromCart,
  onOpenDetails,
  priority = false,
}) => {
  return (
    <article className="group relative bg-white border border-[#E4E4E0] rounded-2xl overflow-hidden hover:border-[#2C5E43]/40 transition-all duration-300 flex flex-col justify-between shadow-clean hover:shadow-clean-lg">
      {/* Image Container with 4:3 ratio */}
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4F4F1] cursor-pointer"
        onClick={() => onOpenDetails(item)}
      >
        <img
          src={item.image}
          alt={item.name}
          width="800"
          height="600"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-white/95 text-[#2C5E43] border border-[#D2E2D8] shadow-clean-sm backdrop-blur-sm">
              {item.badge}
            </span>
          </div>
        )}

        {/* Quick view button overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(item);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md text-[#666663] hover:text-[#2C5E43] border border-[#E4E4E0] flex items-center justify-center shadow-clean-sm opacity-90 group-hover:opacity-100 transition-all active:scale-95"
          title="Подробнее о блюде"
          aria-label="Подробнее о блюде"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Weight tag on image */}
        <div className="absolute bottom-2.5 right-2.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/60 text-white backdrop-blur-sm">
            {item.weight}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 
            onClick={() => onOpenDetails(item)}
            className="font-serif text-sm sm:text-base font-bold text-[#141414] group-hover:text-[#2C5E43] transition-colors line-clamp-1 cursor-pointer"
          >
            {item.name}
          </h3>

          <p className="text-xs text-[#666663] line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* KBJU line without nested box */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#888884] pt-0.5">
          <Flame className="w-3.5 h-3.5 text-[#2C5E43] flex-shrink-0" />
          <span className="truncate">
            {item.kbju.calories} ккал • Б {item.kbju.protein}г • Ж {item.kbju.fat}г • У {item.kbju.carbs}г
          </span>
        </div>

        {/* Price and Cart Action */}
        <div className="pt-2.5 flex items-center justify-between border-t border-[#EFEFEA]">
          <div>
            <span className="text-base sm:text-lg font-bold text-[#141414] tracking-tight">
              {item.price} <span className="text-xs font-normal text-[#666663]">BYN</span>
            </span>
          </div>

          <div>
            {cartQuantity > 0 ? (
              <div className="flex items-center gap-1.5 bg-[#F4F4F1] border border-[#E4E4E0] rounded-xl px-2 py-1 shadow-clean-sm">
                <button
                  onClick={() => onRemoveFromCart(item)}
                  className="w-6 h-6 rounded-lg bg-white hover:bg-[#EFEFEA] text-[#141414] border border-[#E4E4E0] flex items-center justify-center transition-colors active:scale-95"
                  aria-label="Уменьшить количество"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold text-[#2C5E43] min-w-4 text-center">
                  {cartQuantity}
                </span>
                <button
                  onClick={() => onAddToCart(item)}
                  className="w-6 h-6 rounded-lg bg-[#2C5E43] hover:bg-[#234B35] text-white flex items-center justify-center transition-colors active:scale-95 shadow-clean-sm"
                  aria-label="Увеличить количество"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAddToCart(item)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#2C5E43] hover:bg-[#234B35] active:bg-[#1A3B2A] text-white text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C5E43] focus-visible:ring-offset-1 active:scale-95 transition-all shadow-clean-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>В заказ</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
