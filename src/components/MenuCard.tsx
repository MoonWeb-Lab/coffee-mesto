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
    <article className="group relative bg-[#151518] border border-zinc-850 rounded-2xl overflow-hidden hover:border-zinc-700/80 transition-all duration-300 flex flex-col justify-between shadow-sm">
      {/* Image Container with 4:3 ratio */}
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900 cursor-pointer"
        onClick={() => onOpenDetails(item)}
      >
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-900/90 text-amber-400 border border-amber-500/30 backdrop-blur-sm shadow-sm">
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
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-zinc-300 hover:text-white flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity"
          title="Подробнее о блюде"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        {/* Weight tag on image */}
        <div className="absolute bottom-2 right-2.5">
          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-black/70 text-zinc-300 backdrop-blur-sm">
            {item.weight}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          <h3 
            onClick={() => onOpenDetails(item)}
            className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {item.name}
          </h3>

          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* KBJU line */}
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 bg-zinc-900/60 px-2 py-1 rounded-lg border border-zinc-800/50">
          <Flame className="w-3 h-3 text-amber-500 flex-shrink-0" />
          <span className="truncate">
            {item.kbju.calories} ккал • Б {item.kbju.protein}г • Ж {item.kbju.fat}г • У {item.kbju.carbs}г
          </span>
        </div>

        {/* Price and Cart Action */}
        <div className="pt-1 flex items-center justify-between border-t border-zinc-800/80">
          <div>
            <span className="text-base font-bold text-white tracking-tight">
              {item.price} <span className="text-xs font-normal text-zinc-400">BYN</span>
            </span>
          </div>

          <div>
            {cartQuantity > 0 ? (
              <div className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-full px-1.5 py-1">
                <button
                  onClick={() => onRemoveFromCart(item)}
                  className="w-6 h-6 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white flex items-center justify-center transition-colors active:scale-95"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold text-amber-400 min-w-4 text-center">
                  {cartQuantity}
                </span>
                <button
                  onClick={() => onAddToCart(item)}
                  className="w-6 h-6 rounded-full bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center transition-colors active:scale-95"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAddToCart(item)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-200 text-xs font-medium border border-zinc-700/80 hover:border-amber-500 active:scale-95 transition-all duration-200"
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
