import React, { useState, useMemo } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { MenuCard } from './components/MenuCard';
import { DetailModal } from './components/DetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { FloatingCartButton } from './components/FloatingCartButton';
import { Footer } from './components/Footer';
import { MENU_ITEMS } from './data/menuData';
import { MenuItem, CartItem, OrderForm } from './types';
import { Sparkles, UtensilsCrossed } from 'lucide-react';

export const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [orderSuccessData, setOrderSuccessData] = useState<{
    form: OrderForm;
    items: CartItem[];
    total: number;
    message: string;
  } | null>(null);

  // Cart Handlers
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter((ci) => ci.item.id !== item.id);
      }
      return prev.map((ci) =>
        ci.item.id === item.id ? { ...ci, quantity: ci.quantity - 1 } : ci
      );
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const cartTotal = useMemo(
    () => cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0),
    [cart]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, ci) => sum + ci.quantity, 0),
    [cart]
  );

  // Filtered Items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.ingredients &&
          item.ingredients.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#0d0d0f] text-zinc-100 flex flex-col font-sans">
        {/* Header */}
        <Header
          cartCount={cartCount}
          cartTotal={cartTotal}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Hero Section / Mini Highlights */}
        <section className="bg-gradient-to-b from-[#141417] to-[#0d0d0f] border-b border-zinc-850 px-4 py-5">
          <div className="max-w-2xl mx-auto">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                    Завтраки и бранчи весь день
                  </h2>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                    Драники, сырники, боулы и шакшука со свежей обжаркой Spiritus. Выберите блюда и оформите заказ ко времени визита.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-zinc-400 border-t sm:border-t-0 sm:border-l border-zinc-800 pt-2 sm:pt-0 sm:pl-4">
                <UtensilsCrossed className="w-3.5 h-3.5 text-amber-500" />
                <span>Готовим до 18:00</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Category and Search Bar */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Menu Catalog Grid */}
        <main className="flex-1 max-w-2xl mx-auto px-4 py-6 w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <span>Каталог блюд</span>
              <span className="text-xs font-normal text-zinc-500">
                ({filteredItems.length})
              </span>
            </h2>
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-16 text-center bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
              <p className="text-sm font-semibold text-zinc-300">Ничего не найдено</p>
              <p className="text-xs text-zinc-500 mt-1">
                По запросу «{searchQuery}» блюд не найдено. Попробуйте сбросить поиск.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 px-4 py-1.5 rounded-full bg-zinc-800 text-xs text-zinc-200 hover:bg-zinc-700 transition-colors"
              >
                Сбросить фильтр
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const cartItem = cart.find((ci) => ci.item.id === item.id);
                return (
                  <MenuCard
                    key={item.id}
                    item={item}
                    cartQuantity={cartItem ? cartItem.quantity : 0}
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveFromCart}
                    onOpenDetails={(it) => setSelectedItem(it)}
                  />
                );
              })}
            </div>
          )}
        </main>

        {/* Floating Cart Button (Mobile) */}
        <FloatingCartButton
          count={cartCount}
          total={cartTotal}
          onOpen={() => setIsCartOpen(true)}
        />

        {/* Modals & Drawers */}
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          cartQuantity={
            selectedItem
              ? cart.find((ci) => ci.item.id === selectedItem.id)?.quantity || 0
              : 0
          }
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
        />

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onOrderSuccess={(orderData) => {
            setIsCartOpen(false);
            setOrderSuccessData(orderData);
          }}
        />

        <OrderSuccessModal
          orderData={orderSuccessData}
          onClose={() => setOrderSuccessData(null)}
        />

        {/* Footer */}
        <Footer />
      </div>
    </LazyMotion>
  );
};

export default App;
