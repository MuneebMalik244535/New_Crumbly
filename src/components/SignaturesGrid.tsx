import React from 'react';
import { ArrowRight, Plus, Eye, Flame } from 'lucide-react';
import { Product } from '../types';

interface SignaturesGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SignaturesGrid: React.FC<SignaturesGridProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  // First 8 items are the flagship signatures
  const signatures = products.slice(0, 8);

  return (
    <section className="w-full bg-[#faf3e8] py-16 md:py-24 border-y border-[#e8d2b5]/50" id="signatures">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#e8d2b5]/60">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#8b501a] font-bold block mb-2">
              Couture Recipe Directory
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2b1712] tracking-tight uppercase">
              THE CRUMBLY SIGNATURES
            </h2>
          </div>
          <p className="font-sans text-base text-[#504442] max-w-md italic">
            Meet the cookies worth coming back for. Heavyweight, unapologetically rich, and baked on continuous repeat.
          </p>
        </div>

        {/* 8 Dynamic Signature Cards in Asymmetric Editorial Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {signatures.map((product, idx) => {
            const isOffset = idx % 2 === 1; // subtle offset for alternating columns
            return (
              <article
                key={product.id}
                className={`group flex flex-col bg-[#f5ede2] rounded-xl overflow-hidden border border-[#e8d2b5] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isOffset ? 'lg:translate-y-4' : ''
                }`}
              >
                {/* Visual Image container */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-[4/3] overflow-hidden bg-[#e0d9ce] p-3 cursor-pointer"
                >
                  <div className="w-full h-full rounded overflow-hidden relative">
                    <img
                      alt={product.name}
                      src={product.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-2 right-2 bg-[#8b501a] text-white font-sans text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow">
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-[#fff8f1]/90 text-[#2b1712] font-sans text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                        <Eye className="w-3.5 h-3.5" /> Quick View
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content details */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-serif text-xl text-[#2b1712] group-hover:text-[#8b501a] transition-colors cursor-pointer leading-snug font-semibold"
                      >
                        {product.name}
                      </h3>
                      <span className="font-sans text-xs font-bold text-[#8b501a] whitespace-nowrap tabular-nums">
                        Rs. {product.pricePkr} / ${product.priceUsd.toFixed(2)}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#504442] line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#e8d2b5]/50 flex items-center justify-between">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-[#827471] font-medium">
                      {product.subBadge || `${product.weightGrams}g`}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="font-sans text-xs uppercase tracking-wider text-[#2b1712] hover:text-[#8b501a] font-bold flex items-center gap-1"
                      >
                        Tasting Notes <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        aria-label={`Add ${product.name} to order`}
                        className="w-7 h-7 rounded-full bg-[#2b1712] text-white hover:bg-[#8b501a] transition-colors flex items-center justify-center shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
