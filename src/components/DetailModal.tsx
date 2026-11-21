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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-white border border-[#E8E0D5] rounded-3xl overflow-hidden flex flex-col z-10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#6B625B] hover:text-[#1E1916] flex items-center justify-center border border-[#E8E0D5] shadow-sm transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image Section */}
        <div className="relative w-full bg-[#FAF7F2] overflow-hidden flex items-center justify-center">
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
            className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-semibold text-[#1E1916] hover:text-[#C86428] border border-[#E8E0D5] flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C86428]" />
            <span>{showFullStory ? 'Компактный вид' : 'Оригинал из сторис'}</span>
          </button>

          {item.badge && (
            <div className="absolute top-3.5 left-3.5">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#F3E8DC] text-[#8C4015] border border-[#E8D8C8] shadow-sm">
                {item.badge}
              </span>
            </div>
          )}
        </div>

        {/* Details Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#1E1916] tracking-tight">{item.name}</h2>
              <span className="text-xs text-[#6B625B] mt-0.5 inline-block">Порция: {item.weight}</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-[#C86428]">
                {item.price} <span className="text-xs font-normal text-[#6B625B]">BYN</span>
              </span>
            </div>
          </div>

          <p className="text-sm text-[#6B625B] leading-relaxed">
            {item.description}
          </p>

          {/* Recommendation if any */}
          {item.recommendation && (
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FBF1EB] border border-[#F3E8DC] text-xs text-[#8C4015]">
              <Info className="w-4 h-4 text-[#C86428] flex-shrink-0 mt-0.5" />
              <span>{item.recommendation}</span>
            </div>
          )}

          {/* Ingredients */}
          {item.ingredients && (
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#1E1916] uppercase tracking-wider">Состав:</span>
              <p className="text-xs text-[#6B625B] leading-relaxed bg-[#FAF7F2] p-3 rounded-2xl border border-[#EFE9DF]">
                {item.ingredients}
              </p>
            </div>
          )}

          {/* KBJU Grid */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E1916] uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-[#C86428]" />
              <span>Энергетическая ценность (на 100 г):</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-[#FAF7F2] p-2.5 rounded-2xl border border-[#EFE9DF]">
                <div className="text-[10px] text-[#9E958C]">Калории</div>
                <div className="text-sm font-bold text-[#1E1916] mt-0.5">{item.kbju.calories}</div>
                <div className="text-[9px] text-[#9E958C]">ккал</div>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-2xl border border-[#EFE9DF]">
                <div className="text-[10px] text-[#9E958C]">Белки</div>
                <div className="text-sm font-bold text-[#1E1916] mt-0.5">{item.kbju.protein}</div>
                <div className="text-[9px] text-[#9E958C]">грамм</div>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-2xl border border-[#EFE9DF]">
                <div className="text-[10px] text-[#9E958C]">Жиры</div>
                <div className="text-sm font-bold text-[#1E1916] mt-0.5">{item.kbju.fat}</div>
                <div className="text-[9px] text-[#9E958C]">грамм</div>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-2xl border border-[#EFE9DF]">
                <div className="text-[10px] text-[#9E958C]">Углеводы</div>
                <div className="text-sm font-bold text-[#1E1916] mt-0.5">{item.kbju.carbs}</div>
                <div className="text-[9px] text-[#9E958C]">грамм</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer / Add to Cart */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E8E0D5] flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-[#6B625B] block">К оплате:</span>
            <span className="text-lg font-black text-[#1E1916]">
              {item.price * (cartQuantity > 0 ? cartQuantity : 1)} BYN
            </span>
          </div>

          <div className="flex items-center gap-3">
            {cartQuantity > 0 ? (
              <div className="flex items-center gap-3 bg-white border border-[#E8E0D5] rounded-full px-2.5 py-1.5 shadow-warm-sm">
                <button
                  onClick={() => onRemoveFromCart(item)}
                  className="w-7 h-7 rounded-full bg-[#FAF7F2] hover:bg-[#F3EFE7] text-[#1E1916] border border-[#E8E0D5] flex items-center justify-center transition-colors active:scale-95"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-black text-[#C86428] min-w-4 text-center">
                  {cartQuantity}
                </span>
                <button
                  onClick={() => onAddToCart(item)}
                  className="w-7 h-7 rounded-full bg-[#C86428] hover:bg-[#B0531C] text-white flex items-center justify-center transition-colors active:scale-95 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAddToCart(item)}
                className="px-5 py-2.5 rounded-full bg-[#C86428] hover:bg-[#B0531C] text-white font-bold text-xs flex items-center gap-2 active:scale-95 transition-all shadow-md shadow-[#C86428]/20"
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
