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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#161619] border border-zinc-800 rounded-3xl p-5 overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center pt-2 pb-4">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">Заказ готов к отправке!</h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xs">
            {orderData.form.orderType === 'takeaway'
              ? `Приготовим горячий заказ к ${orderData.form.time} в кофейне на Независимости, 43.`
              : `Забронируем для вас уютный столик на ${orderData.form.guestsCount} персон к ${orderData.form.time}.`}
          </p>
        </div>

        {/* Preview of the Telegram payload */}
        <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800 text-left font-mono text-[11px] text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto mb-4">
          {orderData.message}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <a
            href={telegramShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-sky-500/20"
          >
            <Send className="w-4 h-4" />
            <span>Отправить в Telegram ({CAFE_INFO.telegramBot})</span>
          </a>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-xs flex items-center justify-center gap-2 border border-zinc-800 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Текст заказа скопирован в буфер!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Скопировать текст заказа</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Закрыть и вернуться в меню
          </button>
        </div>
      </div>
    </div>
  );
};
