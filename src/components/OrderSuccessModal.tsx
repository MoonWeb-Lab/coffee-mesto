import React, { useState } from 'react';
import { CheckCircle2, Copy, Send, X, Check } from 'lucide-react';
import { OrderForm, CartItem } from '../types';
import { CAFE_INFO } from '../data/menuData';

interface OrderSuccessModalProps {
  orderData: {
    form: OrderForm;
    items: CartItem[];
    total: number;
    message: string;
  } | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ orderData, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!orderData) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(orderData.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const telegramShareUrl = `https://t.me/share/url?url=&text=${encodeURIComponent(orderData.message)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white border border-[#E4E4E0] rounded-2xl p-5 overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-[#F4F4F1] border border-[#E4E4E0] text-[#666663] hover:text-[#141414] flex items-center justify-center transition-colors active:scale-95"
          aria-label="Закрыть"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center pt-2 pb-4">
          <div className="w-12 h-12 rounded-xl bg-[#EAF1ED] border border-[#D2E2D8] flex items-center justify-center text-[#2C5E43] mb-3">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-lg font-bold text-[#141414] tracking-tight">Заказ готов к отправке</h2>
          <p className="text-xs text-[#666663] mt-1 max-w-xs leading-relaxed">
            {orderData.form.orderType === 'takeaway'
              ? `Приготовим горячий заказ к ${orderData.form.time} в кофейне на Независимости, 43.`
              : `Забронируем столик на ${orderData.form.guestsCount} персон к ${orderData.form.time}.`}
          </p>
        </div>

        {/* Preview of the Telegram payload */}
        <div className="bg-[#F4F4F1] p-3 rounded-xl border border-[#E4E4E0] text-left font-mono text-[11px] text-[#141414] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto mb-4">
          {orderData.message}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <a
            href={telegramShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-[#2C5E43] hover:bg-[#234B35] active:bg-[#1A3B2A] text-white font-medium text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-clean-sm"
          >
            <Send className="w-4 h-4" />
            <span>Отправить в Telegram ({CAFE_INFO.telegramBot})</span>
          </a>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-4 rounded-xl bg-[#F4F4F1] hover:bg-[#EFEFEA] text-[#141414] font-medium text-xs flex items-center justify-center gap-2 border border-[#E4E4E0] transition-colors active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#2C5E43]" />
                <span className="text-[#2C5E43] font-semibold">Текст заказа скопирован в буфер!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#666663]" />
                <span>Скопировать текст заказа</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs text-[#888884] hover:text-[#141414] transition-colors"
          >
            Вернуться к меню
          </button>
        </div>
      </div>
    </div>
  );
};
