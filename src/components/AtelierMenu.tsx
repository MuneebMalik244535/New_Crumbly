import React, { useState } from 'react';
import { Search, Plus, Check, ArrowRight, Sparkles } from 'lucide-react';
import { Product, CategoryType } from '../types';

interface AtelierMenuProps {
  products: Product[];
  activeCategory: CategoryType | 'all';
  onCategoryChange: (category: CategoryType | 'all') => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const AtelierMenu: React.FC<AtelierMenuProps> = ({
  products,
  activeCategory,
  onCategoryChange,
  onSelectProduct,
  onAddToCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const tabs: { id: CategoryType | 'all'; label: string }[] = [
    { id: 'all', label: 'ALL CONFECTIONS' },
    { id: 'cookies', label: 'COOKIES' },
    { id: 'dough', label: 'COOKIE DOUGH' },
    { id: 'brownies', label: 'BROWNIES' },
    { id: 'combos', label: 'COMBOS' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeCategory === 'all' ? true : p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1800);
  };

  return (
    <section className="w-full bg-[#faf3e8] py-16 md:py-24 border-y border-[#e8d2b5]/60" id="menu">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Section Title & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#e8d2b5]/60">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#8b501a] font-bold block mb-2">
              Current Batch Offerings
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2b1712] tracking-tight uppercase">
              THE ATELIER MENU
            </h2>
          </div>

          {/* Interactive Category Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#f5ede2] p-1.5 rounded-xl border border-[#e8d2b5]">
            {tabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onCategoryChange(tab.id)}
                  className={`px-4 py-2 rounded-lg font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2b1712] text-[#fff8f1] shadow-sm'
                      : 'text-[#504442] hover:text-[#2b1712] hover:bg-[#fff8f1]/50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search bar & batch information */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-[#827471] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search flavours, ingredients, cacao %..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#fff8f1] border border-[#e8d2b5] rounded-lg pl-10 pr-4 py-2 text-xs font-sans text-[#2b1712] placeholder:text-[#827471] focus:outline-none focus:border-[#8b501a] focus:ring-1 focus:ring-[#8b501a]"
            />
          </div>
          <div className="text-xs font-sans text-[#504442] flex items-center gap-2">
            <span>Showing {filteredProducts.length} artisan items</span>
            <span>•</span>
            <span className="text-[#8b501a] font-semibold">Continuous rotations every 2 hours</span>
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = recentlyAddedId === product.id;
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-[#fff8f1] p-6 rounded-2xl border border-[#e8d2b5] shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-5 group cursor-pointer hover:border-[#8b501a]/50"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-serif text-xl text-[#2b1712] group-hover:text-[#8b501a] transition-colors leading-tight font-semibold">
                      {product.name}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="font-sans text-sm font-bold text-[#8b501a] block tabular-nums">
                        Rs. {product.pricePkr}
                      </span>
                      <span className="font-sans text-[10px] text-[#827471] block">
                        ${product.priceUsd.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <p className="font-sans text-xs text-[#504442] leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#e8d2b5]/50">
                  <span className="font-sans text-[11px] text-[#827471] uppercase tracking-wider font-medium">
                    {product.subBadge || `${product.weightGrams}g`}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="font-sans text-xs uppercase tracking-wider text-[#2b1712] hover:text-[#8b501a] font-semibold px-2 py-1"
                    >
                      Notes
                    </button>
                    <button
                      onClick={(e) => handleAdd(e, product)}
                      className={`px-3 py-1.5 rounded font-sans text-xs uppercase tracking-wider font-bold transition-all duration-200 flex items-center gap-1 ${
                        isAdded
                          ? 'bg-[#8b501a] text-white shadow-sm'
                          : 'bg-[#f5ede2] text-[#2b1712] hover:bg-[#2b1712] hover:text-[#fff8f1]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" /> Add to Box
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
