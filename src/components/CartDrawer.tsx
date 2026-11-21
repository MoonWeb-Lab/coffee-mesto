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

    // Format text for Telegram
    const formattedMessage = [
      `☕️ Заказ в «${CAFE_INFO.name}»`,
      `Формат: ${orderType === 'takeaway' ? 'Забрать с собой ко времени' : 'Бронь столика с предзаказом'}`,
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Время визита: ${visitTime}`,
      orderType === 'table' ? `Количество гостей: ${guestsCount}` : '',
      '',
      'Позиции:',
      ...items.map((ci, idx) => `${idx + 1}. ${ci.item.name} x ${ci.quantity} = ${ci.item.price * ci.quantity} BYN`),
      '',
      `Итого к оплате: ${total} BYN`,
      comment.trim() ? `Комментарий: ${comment.trim()}` : '',
      `Адрес заведения: ${CAFE_INFO.address}`
    ].filter(Boolean).join('\n');

    // Fire celebratory confetti!
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-[#141417] border-l border-zinc-800 flex flex-col z-10 shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white">Ваш заказ</h2>
            <span className="text-xs bg-zinc-800 text-amber-400 font-semibold px-2 py-0.5 rounded-full">
              {items.reduce((acc, i) => acc + i.quantity, 0)} шт
            </span>
          </div>

          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                title="Очистить корзину"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Очистить</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-3">
              <Coffee className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-semibold text-white">В заказе пока пусто</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs">
              Выберите драники, сырники или кофе из меню, чтобы оформить быстрый предзаказ.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
            >
              Перейти в меню
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Format Switcher */}
            <div className="bg-zinc-900 p-1 rounded-xl border border-zinc-800 flex items-center gap-1 text-xs font-medium">
              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`flex-1 py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  orderType === 'takeaway'
                    ? 'bg-amber-500 text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
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
                    ? 'bg-amber-500 text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Забронировать стол</span>
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                Выбранные блюда:
              </span>
              {items.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-2.5 flex items-center gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover bg-zinc-950 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-white truncate">{item.name}</h4>
                    <span className="text-[11px] text-zinc-400 mt-0.5 block">{item.price} BYN</span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5 bg-zinc-800 px-1.5 py-0.5 rounded-full border border-zinc-700">
                    <button
                      onClick={() => onRemoveFromCart(item)}
                      className="w-5 h-5 rounded-full hover:bg-zinc-700 text-white flex items-center justify-center"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-amber-400 min-w-3 text-center">{quantity}</span>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center hover:bg-amber-400"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmitOrder} className="space-y-3 pt-2 border-t border-zinc-800">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                Данные для кухни и бариста:
              </span>

              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="text-xs text-zinc-400 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Ваше имя</span>
                </label>
                <input
                  type="text"
                  placeholder="Как к вам обращаться"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Телефон для связи</span>
                </label>
                <input
                  type="tel"
                  placeholder="+375 (29) 000-00-00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Time selection */}
              <div>
                <label className="text-xs text-zinc-400 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Когда будете в заведении:</span>
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
                      className={`py-1.5 px-2 rounded-lg text-[11px] border transition-colors ${
                        time === t && !customTime
                          ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-medium'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Или точное время (например, к 14:45)"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Table guests count if table reservation */}
              {orderType === 'table' && (
                <div>
                  <label className="text-xs text-zinc-400 mb-1 block">
                    Количество гостей:
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5, 6].map((count) => (
                      <button
                        type="button"
                        key={count}
                        onClick={() => setGuestsCount(count)}
                        className={`w-8 h-8 rounded-lg text-xs font-semibold border transition-colors ${
                          guestsCount === count
                            ? 'bg-amber-500 text-black border-amber-500'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
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
                <label className="text-xs text-zinc-400 mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Пожелания к заказу (по желанию):</span>
                </label>
                <input
                  type="text"
                  placeholder="Например, кофе на овсяном молоке, без лука"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </form>
          </div>
        )}

        {/* Drawer Footer with Submit Button */}
        {items.length > 0 && (
          <div className="p-4 bg-zinc-950 border-t border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Сумма заказа:</span>
              <span className="text-lg font-bold text-white">
                {total} <span className="text-xs font-normal text-zinc-400">BYN</span>
              </span>
            </div>

            <button
              onClick={handleSubmitOrder}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-amber-500/20"
            >
              <Send className="w-4 h-4" />
              <span>
                {orderType === 'takeaway' ? 'Заказать с собой к указанному времени' : 'Подтвердить бронь столика'}
              </span>
            </button>

            <p className="text-[10px] text-zinc-500 text-center">
              Заказ мгновенно сформируется для отправки в Telegram кофейни. Оплата при получении.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
