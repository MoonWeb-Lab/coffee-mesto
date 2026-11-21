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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white border border-[#E4E4E0] rounded-2xl overflow-hidden flex flex-col z-10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md text-[#666663] hover:text-[#141414] flex items-center justify-center border border-[#E4E4E0] shadow-clean-sm transition-colors active:scale-95"
          aria-label="Закрыть окно"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image Section */}
        <div className="relative w-full bg-[#F4F4F1] overflow-hidden flex items-center justify-center">
          <img
            src={showFullStory ? item.fullImage : item.image}
            alt={item.name}
            width="800"
            height="600"
            className={`w-full object-cover transition-all duration-300 ${
              showFullStory ? 'max-h-[50vh] object-contain' : 'aspect-[4/3] object-cover'
            }`}
          />

          {/* Toggle view button */}
          <button
            onClick={() => setShowFullStory(!showFullStory)}
            className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md text-[11px] font-medium text-[#141414] hover:text-[#2C5E43] border border-[#E4E4E0] flex items-center gap-1.5 shadow-clean-sm transition-colors active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2C5E43]" />
            <span>{showFullStory ? 'Компактный вид' : 'Оригинал из меню'}</span>
          </button>

          {item.badge && (
            <div className="absolute top-3.5 left-3.5">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-white/95 text-[#2C5E43] border border-[#D2E2D8] shadow-clean-sm">
                {item.badge}
              </span>
            </div>
          )}
        </div>

        {/* Details Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#141414] tracking-tight">{item.name}</h2>
              <span className="text-xs text-[#666663] mt-0.5 inline-block">Порция: {item.weight}</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-[#2C5E43]">
                {item.price} <span className="text-xs font-normal text-[#666663]">BYN</span>
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#666663] leading-relaxed">
            {item.description}
          </p>

          {/* Recommendation if any */}
          {item.recommendation && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#EAF1ED] border border-[#D2E2D8] text-xs text-[#1C3E2C]">
              <Info className="w-4 h-4 text-[#2C5E43] flex-shrink-0 mt-0.5" />
              <span>{item.recommendation}</span>
            </div>
          )}

          {/* Ingredients */}
          {item.ingredients && (
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#141414] uppercase tracking-wider">Состав:</span>
              <p className="text-xs text-[#666663] leading-relaxed bg-[#F4F4F1] p-3 rounded-xl border border-[#E4E4E0]">
                {item.ingredients}
              </p>
            </div>
          )}

          {/* KBJU Grid */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#141414] uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-[#2C5E43]" />
              <span>Энергетическая ценность на 100 г:</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-[#F4F4F1] p-2.5 rounded-xl border border-[#E4E4E0]">
                <div className="text-[10px] text-[#888884]">Калории</div>
                <div className="text-sm font-bold text-[#141414] mt-0.5">{item.kbju.calories}</div>
                <div className="text-[9px] text-[#888884]">ккал</div>
              </div>
              <div className="bg-[#F4F4F1] p-2.5 rounded-xl border border-[#E4E4E0]">
                <div className="text-[10px] text-[#888884]">Белки</div>
                <div className="text-sm font-bold text-[#141414] mt-0.5">{item.kbju.protein}</div>
                <div className="text-[9px] text-[#888884]">грамм</div>
              </div>
              <div className="bg-[#F4F4F1] p-2.5 rounded-xl border border-[#E4E4E0]">
                <div className="text-[10px] text-[#888884]">Жиры</div>
                <div className="text-sm font-bold text-[#141414] mt-0.5">{item.kbju.fat}</div>
                <div className="text-[9px] text-[#888884]">грамм</div>
              </div>
              <div className="bg-[#F4F4F1] p-2.5 rounded-xl border border-[#E4E4E0]">
                <div className="text-[10px] text-[#888884]">Углеводы</div>
                <div className="text-sm font-bold text-[#141414] mt-0.5">{item.kbju.carbs}</div>
                <div className="text-[9px] text-[#888884]">грамм</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer / Add to Cart */}
        <div className="p-4 bg-[#F4F4F1] border-t border-[#E4E4E0] flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-[#666663] block">К оплате:</span>
            <span className="text-lg font-bold text-[#141414]">
              {item.price * (cartQuantity > 0 ? cartQuantity : 1)} BYN
            </span>
          </div>

          <div className="flex items-center gap-3">
            {cartQuantity > 0 ? (
              <div className="flex items-center gap-2 bg-white border border-[#E4E4E0] rounded-xl px-2 py-1 shadow-clean-sm">
                <button
                  onClick={() => onRemoveFromCart(item)}
                  className="w-7 h-7 rounded-lg bg-[#F4F4F1] hover:bg-[#EFEFEA] text-[#141414] border border-[#E4E4E0] flex items-center justify-center transition-colors active:scale-95"
                  aria-label="Уменьшить количество"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-[#2C5E43] min-w-4 text-center">
                  {cartQuantity}
                </span>
                <button
                  onClick={() => onAddToCart(item)}
                  className="w-7 h-7 rounded-lg bg-[#2C5E43] hover:bg-[#234B35] text-white flex items-center justify-center transition-colors active:scale-95 shadow-clean-sm"
                  aria-label="Увеличить количество"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAddToCart(item)}
                className="px-4 py-2 rounded-xl bg-[#2C5E43] hover:bg-[#234B35] active:bg-[#1A3B2A] text-white font-medium text-xs flex items-center gap-2 active:scale-95 transition-all shadow-clean-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Добавить в заказ</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
