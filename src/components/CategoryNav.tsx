import React from 'react';
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
  return (
    <div className="sticky top-[69px] z-20 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E0D5] transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-2 pb-2 sm:pt-2.5 sm:pb-2.5">
        {/* Search bar */}
        <div className="relative mb-2 sm:mb-2.5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E958C]" />
          <input
            type="text"
            placeholder="Найти драники, сырники, боул или кофе..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#E8E0D5] rounded-2xl text-xs sm:text-sm text-[#1E1916] placeholder-[#9E958C] focus:outline-none focus:border-[#C86428] focus:ring-1 focus:ring-[#C86428]/30 shadow-warm-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9E958C] hover:text-[#1E1916]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories scrollable row */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  if (searchQuery) onSearchChange('');
                }}
                className={`flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1E1916] text-white shadow-warm-sm font-semibold scale-[1.02]'
                    : 'bg-white text-[#6B625B] hover:text-[#1E1916] hover:bg-[#F3EFE7] border border-[#E8E0D5]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
