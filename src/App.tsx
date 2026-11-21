import React, { useState, useMemo } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { MenuCard } from './components/MenuCard';
import { DetailModal } from './components/DetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { FloatingCartButton } from './components/FloatingCartButton';
import { Footer } from './components/Footer';
import { MENU_ITEMS } from './data/menuData';
import { MenuItem, CartItem, OrderForm } from './types';

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

  const featuredItem = useMemo(
    () => MENU_ITEMS.find((it) => it.id === 'draniki-salmon') || MENU_ITEMS[0],
    []
  );

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#F4F4F1] text-[#141414] flex flex-col font-sans selection:bg-[#EAF1ED] selection:text-[#2C5E43]">
        {/* Header */}
        <Header
          cartCount={cartCount}
          cartTotal={cartTotal}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Hero Section */}
        <Hero
          featuredItem={featuredItem}
          onAddToCart={handleAddToCart}
          onOpenDetails={(it) => setSelectedItem(it)}
        />

        {/* Sticky Category and Search Navigation */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Menu Catalog Grid */}
        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 w-full">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#141414] tracking-tight flex items-center gap-2">
              <span>Меню завтраков и кофе</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-[#EAF1ED] text-[#1C3E2C] border border-[#D2E2D8]">
                {filteredItems.length}
              </span>
            </h2>
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-16 text-center bg-white border border-[#E4E4E0] rounded-2xl p-8 shadow-clean">
              <p className="font-serif text-sm font-bold text-[#141414]">Блюд не найдено</p>
              <p className="text-xs text-[#666663] mt-1">
                По запросу «{searchQuery}» ничего не нашлось. Попробуйте сбросить поиск.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 rounded-xl bg-[#2C5E43] text-xs font-medium text-white hover:bg-[#234B35] transition-colors shadow-clean-sm active:scale-95"
              >
                Сбросить поиск
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item, index) => {
                const cartItem = cart.find((ci) => ci.item.id === item.id);
                return (
                  <MenuCard
                    key={item.id}
                    item={item}
                    priority={index === 0}
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
