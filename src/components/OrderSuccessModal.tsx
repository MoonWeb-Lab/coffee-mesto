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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white border border-[#E8E0D5] rounded-3xl p-5 overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8E0D5] text-[#6B625B] hover:text-[#1E1916] flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center pt-2 pb-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-[#1E1916] tracking-tight">Заказ готов к отправке!</h2>
          <p className="text-xs text-[#6B625B] mt-1 max-w-xs leading-relaxed">
            {orderData.form.orderType === 'takeaway'
              ? `Приготовим горячий заказ к ${orderData.form.time} в кофейне на Независимости, 43.`
              : `Забронируем для вас столик на ${orderData.form.guestsCount} персон к ${orderData.form.time}.`}
          </p>
        </div>

        {/* Preview of the Telegram payload */}
        <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EFE9DF] text-left font-mono text-[11px] text-[#1E1916] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto mb-4">
          {orderData.message}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <a
            href={telegramShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#C86428] hover:bg-[#B0531C] active:bg-[#984414] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md shadow-[#C86428]/20"
          >
            <Send className="w-4 h-4" />
            <span>Отправить в Telegram ({CAFE_INFO.telegramBot})</span>
          </a>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EFE7] text-[#1E1916] font-semibold text-xs flex items-center justify-center gap-2 border border-[#E8E0D5] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Текст заказа скопирован в буфер!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#6B625B]" />
                <span>Скопировать текст заказа</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs text-[#9E958C] hover:text-[#1E1916] transition-colors"
          >
            Закрыть и вернуться к меню
          </button>
        </div>
      </div>
    </div>
  );
};
