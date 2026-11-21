import React from 'react';
import { Plus, Minus, Flame, Eye } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  cartQuantity: number;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
  onOpenDetails: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  cartQuantity,
  onAddToCart,
  onRemoveFromCart,
  onOpenDetails,
}) => {
  return (
    <article className="group relative bg-white border border-[#E8E0D5] rounded-3xl overflow-hidden hover:border-[#D4C9BC] transition-all duration-300 flex flex-col justify-between shadow-warm hover:shadow-warm-lg">
      {/* Image Container with 4:3 ratio */}
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F2] cursor-pointer"
        onClick={() => onOpenDetails(item)}
      >
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F3E8DC] text-[#8C4015] border border-[#E8D8C8] shadow-sm backdrop-blur-sm">
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
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#6B625B] hover:text-[#C86428] border border-[#E8E0D5] flex items-center justify-center shadow-sm opacity-90 group-hover:opacity-100 transition-opacity"
          title="Подробнее о блюде"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Weight tag on image */}
        <div className="absolute bottom-2.5 right-3">
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
            className="text-sm sm:text-base font-bold text-[#1E1916] group-hover:text-[#C86428] transition-colors line-clamp-1 cursor-pointer"
          >
            {item.name}
          </h3>

          <p className="text-xs text-[#6B625B] line-clamp-2 mt-1.5 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* KBJU line without nested box */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#8C827A] pt-0.5">
          <Flame className="w-3.5 h-3.5 text-[#C86428] flex-shrink-0" />
          <span className="truncate">
            {item.kbju.calories} ккал • Б {item.kbju.protein}г • Ж {item.kbju.fat}г • У {item.kbju.carbs}г
          </span>
        </div>

        {/* Price and Cart Action */}
        <div className="pt-2 flex items-center justify-between border-t border-[#EFE9DF]">
          <div>
            <span className="text-base sm:text-lg font-black text-[#1E1916] tracking-tight">
              {item.price} <span className="text-xs font-normal text-[#6B625B]">BYN</span>
            </span>
          </div>

          <div>
            {cartQuantity > 0 ? (
              <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#E8E0D5] rounded-full px-2 py-1 shadow-warm-sm">
                <button
                  onClick={() => onRemoveFromCart(item)}
                  className="w-6 h-6 rounded-full bg-white hover:bg-[#F3EFE7] text-[#1E1916] border border-[#E8E0D5] flex items-center justify-center transition-colors active:scale-95"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-black text-[#C86428] min-w-4 text-center">
                  {cartQuantity}
                </span>
                <button
                  onClick={() => onAddToCart(item)}
                  className="w-6 h-6 rounded-full bg-[#C86428] hover:bg-[#B0531C] text-white flex items-center justify-center transition-colors active:scale-95 shadow-sm"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAddToCart(item)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5EFE6] hover:bg-[#C86428] hover:text-white text-[#1E1916] text-xs font-semibold border border-[#E8E0D5] hover:border-[#C86428] active:scale-95 transition-all duration-200 shadow-warm-sm"
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
