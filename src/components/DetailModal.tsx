import React, { useState } from 'react';
import { X, Flame, Plus, Minus, Info, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';

interface DetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  cartQuantity: number;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  item,
  onClose,
  cartQuantity,
  onAddToCart,
  onRemoveFromCart,
}) => {
  const [showFullStory, setShowFullStory] = useState(false);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-[#161619] border border-zinc-800 rounded-3xl overflow-hidden flex flex-col z-10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md text-zinc-300 hover:text-white flex items-center justify-center border border-zinc-700/60 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image Section */}
        <div className="relative w-full bg-zinc-950 overflow-hidden flex items-center justify-center">
          <img
            src={showFullStory ? item.fullImage : item.image}
            alt={item.name}
            className={`w-full object-cover transition-all duration-300 ${
              showFullStory ? 'max-h-[50vh] object-contain' : 'aspect-[4/3] object-cover'
            }`}
          />

          {/* Toggle view button */}
          <button
            onClick={() => setShowFullStory(!showFullStory)}
            className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-medium text-zinc-300 hover:text-white border border-zinc-700/60 flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{showFullStory ? 'Компактное фото' : 'Оригинал из сторис'}</span>
          </button>

          {item.badge && (
            <div className="absolute top-3.5 left-3.5">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-black/80 text-amber-400 border border-amber-500/40 backdrop-blur-sm">
                {item.badge}
              </span>
            </div>
          )}
        </div>

        {/* Details Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">{item.name}</h2>
              <span className="text-xs text-zinc-400 mt-0.5 inline-block">Порция: {item.weight}</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-amber-400">
                {item.price} <span className="text-xs text-zinc-400">BYN</span>
              </span>
            </div>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">
            {item.description}
          </p>

          {/* Recommendation if any */}
          {item.recommendation && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{item.recommendation}</span>
            </div>
          )}

          {/* Ingredients */}
          {item.ingredients && (
            <div className="space-y-1">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Состав:</span>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800">
                {item.ingredients}
              </p>
            </div>
          )}

          {/* KBJU Grid */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Энергетическая ценность (на 100 г):</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                <div className="text-[10px] text-zinc-500">Калории</div>
                <div className="text-sm font-bold text-white mt-0.5">{item.kbju.calories}</div>
                <div className="text-[9px] text-zinc-500">ккал</div>
              </div>
              <div className="bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                <div className="text-[10px] text-zinc-500">Белки</div>
                <div className="text-sm font-bold text-white mt-0.5">{item.kbju.protein}</div>
                <div className="text-[9px] text-zinc-500">грамм</div>
              </div>
              <div className="bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                <div className="text-[10px] text-zinc-500">Жиры</div>
                <div className="text-sm font-bold text-white mt-0.5">{item.kbju.fat}</div>
                <div className="text-[9px] text-zinc-500">грамм</div>
              </div>
              <div className="bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                <div className="text-[10px] text-zinc-500">Углеводы</div>
                <div className="text-sm font-bold text-white mt-0.5">{item.kbju.carbs}</div>
                <div className="text-[9px] text-zinc-500">грамм</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer / Add to Cart */}
        <div className="p-4 bg-zinc-900/80 border-t border-zinc-800 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-zinc-400 block">К оплате</span>
            <span className="text-lg font-bold text-white">
              {item.price * (cartQuantity > 0 ? cartQuantity : 1)} BYN
            </span>
          </div>

          <div className="flex items-center gap-3">
            {cartQuantity > 0 ? (
              <div className="flex items-center gap-3 bg-zinc-800 border border-zinc-700 rounded-full px-2 py-1.5">
                <button
                  onClick={() => onRemoveFromCart(item)}
                  className="w-7 h-7 rounded-full bg-zinc-700 hover:bg-zinc-600 text-white flex items-center justify-center transition-colors active:scale-95"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-bold text-amber-400 min-w-4 text-center">
                  {cartQuantity}
                </span>
                <button
                  onClick={() => onAddToCart(item)}
                  className="w-7 h-7 rounded-full bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center transition-colors active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAddToCart(item)}
                className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs flex items-center gap-2 active:scale-95 transition-all shadow-md shadow-amber-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить в заказ</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
