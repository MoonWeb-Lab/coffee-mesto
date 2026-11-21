import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, Coffee, Calendar, Phone, User, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, OrderType, OrderForm } from '../types';
import { CAFE_INFO } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onAddToCart: (item: CartItem['item']) => void;
  onRemoveFromCart: (item: CartItem['item']) => void;
  onClearCart: () => void;
  onOrderSuccess: (orderData: { form: OrderForm; items: CartItem[]; total: number; message: string }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
  onOrderSuccess,
}) => {
  const [orderType, setOrderType] = useState<OrderType>('takeaway');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('Через 20 минут');
  const [customTime, setCustomTime] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const total = items.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Пожалуйста, укажите ваше имя');
      return;
    }
    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMessage('Пожалуйста, укажите контактный телефон');
      return;
    }
    setErrorMessage('');

    const visitTime = customTime.trim() ? customTime.trim() : time;

    // Format text for Telegram (strictly no em/en dashes)
    const formattedMessage = [
      `☕️ Заказ в «${CAFE_INFO.name}»`,
      `Формат: ${orderType === 'takeaway' ? 'Забрать с собой ко времени' : 'Бронь столика с предзаказом'}`,
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Время визита: ${visitTime}`,
      orderType === 'table' ? `Количество гостей: ${guestsCount}` : '',
      '',
      'Позиции заказа:',
      ...items.map((ci, idx) => `${idx + 1}. ${ci.item.name} x ${ci.quantity} = ${ci.item.price * ci.quantity} BYN`),
      '',
      `Итого к оплате: ${total} BYN`,
      comment.trim() ? `Пожелания: ${comment.trim()}` : '',
      `Адрес кофейни: ${CAFE_INFO.address}`
    ].filter(Boolean).join('\n');

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    onOrderSuccess({
      form: {
        name,
        phone,
        time: visitTime,
        orderType,
        guestsCount: orderType === 'table' ? guestsCount : undefined,
        comment
      },
      items,
      total,
      message: formattedMessage
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-white border-l border-[#E4E4E0] flex flex-col z-10 shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#E4E4E0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-base font-bold text-[#141414]">Ваш заказ</h2>
            <span className="text-xs bg-[#EAF1ED] text-[#1C3E2C] font-semibold px-2.5 py-0.5 rounded-lg border border-[#D2E2D8]">
              {items.reduce((acc, i) => acc + i.quantity, 0)} шт
            </span>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-[#888884] hover:text-red-600 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg"
                title="Очистить корзину"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Очистить</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-[#F4F4F1] border border-[#E4E4E0] text-[#666663] hover:text-[#141414] flex items-center justify-center transition-colors active:scale-95"
              aria-label="Закрыть окно корзины"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#F4F4F1] border border-[#E4E4E0] flex items-center justify-center text-[#888884] mb-3">
              <Coffee className="w-7 h-7 text-[#2C5E43]" />
            </div>
            <h3 className="font-serif text-sm font-bold text-[#141414]">В заказе пока пусто</h3>
            <p className="text-xs text-[#666663] mt-1 max-w-xs leading-relaxed">
              Выберите драники, сырники, боул или напиток в меню, чтобы оформить предзаказ к удобному времени.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-5 py-2.5 rounded-xl bg-[#2C5E43] hover:bg-[#234B35] text-white text-xs font-medium transition-colors shadow-clean-sm active:scale-95"
            >
              Перейти к меню
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Format Switcher */}
            <div className="bg-[#F4F4F1] p-1 rounded-xl border border-[#E4E4E0] flex items-center gap-1 text-xs font-medium">
              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`flex-1 py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  orderType === 'takeaway'
                    ? 'bg-[#2C5E43] text-white shadow-clean-sm font-semibold'
                    : 'text-[#666663] hover:text-[#141414]'
                }`}
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>С собой ко времени</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('table')}
                className={`flex-1 py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  orderType === 'table'
                    ? 'bg-[#2C5E43] text-white shadow-clean-sm font-semibold'
                    : 'text-[#666663] hover:text-[#141414]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Забронировать стол</span>
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-[#666663] uppercase tracking-wider block">
                Выбранные позиции:
              </span>
              {items.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="bg-[#F4F4F1] border border-[#E4E4E0] rounded-xl p-2.5 flex items-center gap-3 shadow-clean-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    width="56"
                    height="56"
                    className="w-14 h-14 rounded-lg object-cover bg-white flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs font-bold text-[#141414] truncate">{item.name}</h4>
                    <span className="text-xs font-semibold text-[#2C5E43] mt-0.5 block">{item.price} BYN</span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1 bg-white px-1.5 py-1 rounded-lg border border-[#E4E4E0] shadow-clean-sm">
                    <button
                      onClick={() => onRemoveFromCart(item)}
                      className="w-5 h-5 rounded hover:bg-[#F4F4F1] text-[#141414] flex items-center justify-center transition-colors active:scale-95"
                      aria-label="Уменьшить"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-[#141414] min-w-4 text-center">{quantity}</span>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="w-5 h-5 rounded bg-[#2C5E43] hover:bg-[#234B35] text-white flex items-center justify-center transition-colors shadow-clean-sm active:scale-95"
                      aria-label="Увеличить"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmitOrder} className="space-y-3 pt-2 border-t border-[#E4E4E0]">
              <span className="text-[11px] font-semibold text-[#666663] uppercase tracking-wider block">
                Данные для кухни и бариста:
              </span>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-[#141414] mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#2C5E43]" />
                  <span>Ваше имя</span>
                </label>
                <input
                  type="text"
                  placeholder="Как к вам обращаться"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#F4F4F1] border border-[#E4E4E0] rounded-xl text-xs text-[#141414] placeholder-[#888884] focus:outline-none focus:border-[#2C5E43] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#141414] mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#2C5E43]" />
                  <span>Телефон для связи</span>
                </label>
                <input
                  type="tel"
                  placeholder="+375 (29) 000-00-00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#F4F4F1] border border-[#E4E4E0] rounded-xl text-xs text-[#141414] placeholder-[#888884] focus:outline-none focus:border-[#2C5E43] focus:bg-white transition-colors"
                />
              </div>

              {/* Time selection */}
              <div>
                <label className="text-xs font-medium text-[#141414] mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#2C5E43]" />
                  <span>Когда будете в кофейне:</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5 mb-1.5">
                  {['Через 15 мин', 'Через 30 мин', 'Через 45 мин'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => {
                        setTime(t);
                        setCustomTime('');
                      }}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-medium border transition-colors ${
                        time === t && !customTime
                          ? 'bg-[#EAF1ED] border-[#2C5E43] text-[#1C3E2C] font-semibold shadow-clean-sm'
                          : 'bg-[#F4F4F1] border-[#E4E4E0] text-[#666663] hover:text-[#141414]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Или точное время (например: к 14:45)"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#F4F4F1] border border-[#E4E4E0] rounded-xl text-xs text-[#141414] placeholder-[#888884] focus:outline-none focus:border-[#2C5E43] focus:bg-white transition-colors"
                />
              </div>

              {/* Table guests count if table reservation */}
              {orderType === 'table' && (
                <div>
                  <label className="text-xs font-medium text-[#141414] mb-1 block">
                    Количество гостей:
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5, 6].map((count) => (
                      <button
                        type="button"
                        key={count}
                        onClick={() => setGuestsCount(count)}
                        className={`w-8 h-8 rounded-xl text-xs font-semibold border transition-colors ${
                          guestsCount === count
                            ? 'bg-[#2C5E43] text-white border-[#2C5E43] shadow-clean-sm'
                            : 'bg-[#F4F4F1] border-[#E4E4E0] text-[#666663] hover:text-[#141414]'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Comment */}
              <div>
                <label className="text-xs font-medium text-[#141414] mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#2C5E43]" />
                  <span>Пожелания к заказу (по желанию):</span>
                </label>
                <input
                  type="text"
                  placeholder="Например: кофе на растительном молоке"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#F4F4F1] border border-[#E4E4E0] rounded-xl text-xs text-[#141414] placeholder-[#888884] focus:outline-none focus:border-[#2C5E43] focus:bg-white transition-colors"
                />
              </div>
            </form>
          </div>
        )}

        {/* Drawer Footer with Submit Button */}
        {items.length > 0 && (
          <div className="p-4 bg-[#F4F4F1] border-t border-[#E4E4E0] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#666663]">Сумма заказа:</span>
              <span className="text-lg font-bold text-[#141414]">
                {total} <span className="text-xs font-normal text-[#666663]">BYN</span>
              </span>
            </div>

            <button
              onClick={handleSubmitOrder}
              className="w-full py-3 px-4 rounded-xl bg-[#2C5E43] hover:bg-[#234B35] active:bg-[#1A3B2A] text-white font-medium text-xs tracking-wide flex items-center justify-center gap-2 active:scale-95 transition-all shadow-clean-sm"
            >
              <Send className="w-4 h-4" />
              <span>
                {orderType === 'takeaway' ? 'Заказать с собой к указанному времени' : 'Подтвердить бронь столика'}
              </span>
            </button>

            <p className="text-[10px] text-[#888884] text-center">
              Заказ мгновенно сформируется для отправки в Telegram кофейни. Оплата при получении.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
