import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { CATEGORIES } from '../data/menuData';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(Boolean(searchQuery));
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleToggleSearch = () => {
    if (isSearchOpen) {
      if (searchQuery) onSearchChange('');
      setIsSearchOpen(false);
    } else {
      setIsSearchOpen(true);
    }
  };

  return (
    <div className="sticky top-[65px] z-20 bg-[#F4F4F1]/95 backdrop-blur-md border-b border-[#E4E4E0] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center gap-2">
          {/* Categories row (slides or shrinks when search is open) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1 min-w-0">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id && !searchQuery;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    if (searchQuery) onSearchChange('');
                    setIsSearchOpen(false);
                  }}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C5E43] focus-visible:ring-offset-1 active:scale-95 ${
                    isActive
                      ? 'bg-[#2C5E43] text-white border-[#2C5E43] shadow-clean-sm font-semibold'
                      : 'bg-white text-[#666663] hover:text-[#141414] hover:bg-[#EFEFEA] border-[#E4E4E0]'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Compact Search Trigger / Inline Input */}
          <div className="flex items-center flex-shrink-0">
            {isSearchOpen ? (
              <div className="flex items-center gap-1 bg-white border border-[#2C5E43] rounded-xl px-2.5 py-1 shadow-clean-sm animate-fadeIn">
                <Search className="w-3.5 h-3.5 text-[#2C5E43] flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Поиск по меню..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-36 sm:w-56 text-xs text-[#141414] placeholder-[#888884] bg-transparent focus:outline-none py-0.5"
                />
                <button
                  onClick={handleToggleSearch}
                  className="text-[#888884] hover:text-[#141414] focus-visible:outline-none rounded p-0.5"
                  title="Закрыть поиск"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleToggleSearch}
                className="w-8 h-8 rounded-xl bg-white border border-[#E4E4E0] flex items-center justify-center text-[#666663] hover:text-[#2C5E43] hover:border-[#2C5E43]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C5E43] active:scale-95 transition-all shadow-clean-sm"
                title="Искать блюдо"
                aria-label="Искать блюдо"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
