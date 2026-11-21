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
        className="pointer-events-auto w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center justify-between shadow-xl shadow-amber-500/25 active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-black/80 text-amber-400 flex items-center justify-center text-xs font-bold">
            {count}
          </div>
          <span className="text-xs uppercase tracking-wider">Корзина предзаказа</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-black">{total} BYN</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};
