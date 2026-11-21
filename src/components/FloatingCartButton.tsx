import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface FloatingCartButtonProps {
  count: number;
  total: number;
  onOpen: () => void;
}

export const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({
  count,
  total,
  onOpen,
}) => {
  if (count === 0) return null;

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 px-4 max-w-md mx-auto pointer-events-none animate-slideUp">
      <button
        onClick={onOpen}
        className="pointer-events-auto w-full py-3 px-4 rounded-xl bg-[#2C5E43] hover:bg-[#234B35] active:bg-[#1A3B2A] text-white font-medium flex items-center justify-between shadow-clean-lg active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-white text-[#2C5E43] flex items-center justify-center text-xs font-bold shadow-sm">
            {count}
          </div>
          <span className="text-xs font-semibold">Ваш заказ</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">{total} BYN</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};
