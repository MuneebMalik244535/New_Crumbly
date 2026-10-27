import React, { useState } from 'react';
import { X, Flame, Plus, Minus, Check, Sparkles, AlertCircle, Info } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailDrawerProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, warmth: 'freshly-warmed' | 'ambient') => void;
}

export const ProductDetailDrawer: React.FC<ProductDetailDrawerProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [warmth, setWarmth] = useState<'freshly-warmed' | 'ambient'>('freshly-warmed');
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity, warmth);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Sliding Drawer Container */}
      <div className="relative w-full max-w-lg bg-[#4a2921] text-[#fff8f1] h-full shadow-2xl flex flex-col z-10 overflow-hidden border-l border-[#8a5237]/40 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 md:p-6 border-b border-white/10 flex items-center justify-between bg-[#361000]/60">
          <div>
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#ffdcc3] font-bold block">
              Atelier Tasting Notes
            </span>
            <h3 className="font-serif text-2xl text-white font-semibold">
              {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
          {/* Main Visual */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/30 border border-white/10">
            <img
              alt={product.name}
              src={product.image}
              className="w-full h-full object-cover"
            />
            {product.cacaoPercentage && (
              <span className="absolute bottom-3 left-3 bg-[#2b1712]/90 backdrop-blur-md text-[#ffdcc3] text-xs font-mono px-3 py-1 rounded-lg border border-white/10">
                {product.cacaoPercentage}% Single-Origin Cacao
              </span>
            )}
            <span className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs font-sans px-3 py-1 rounded-lg">
              {product.weightGrams}g Portion
            </span>
          </div>

          {/* Description */}
          <div>
            <p className="font-sans text-sm text-[#efe7dc] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Flavour Profile Gauge Component */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#ffdcc3] font-bold block">
              Sensory Profile Evaluation
            </span>

            <div className="space-y-3 font-sans text-xs">
              <div>
                <div className="flex justify-between text-[#efe7dc] mb-1">
                  <span>Molten Fluidity</span>
                  <span className="font-mono text-[#ffdcc3] font-bold">
                    {product.sensoryProfile.moltenFluidity}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#feb071] rounded-full"
                    style={{ width: `${product.sensoryProfile.moltenFluidity}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#efe7dc] mb-1">
                  <span>Hazelnut / Cocoa Density</span>
                  <span className="font-mono text-[#ffdcc3] font-bold">
                    {product.sensoryProfile.hazelnutDensity}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#feb071] rounded-full"
                    style={{ width: `${product.sensoryProfile.hazelnutDensity}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#efe7dc] mb-1">
                  <span>Edge Crunch Crispness</span>
                  <span className="font-mono text-[#ffdcc3] font-bold">
                    {product.sensoryProfile.edgeCrunch}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#feb071] rounded-full"
                    style={{ width: `${product.sensoryProfile.edgeCrunch}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Aroma & Texture Breakdown */}
          <div className="space-y-3 bg-white/5 border border-white/10 rounded-2xl p-5 text-xs font-sans">
            <div>
              <span className="text-[#ffdcc3] uppercase font-bold tracking-wider block mb-0.5">
                Aromatic Bouquet
              </span>
              <p className="text-[#efe7dc]">{product.tastingNotes.aroma}</p>
            </div>
            <div className="pt-2 border-t border-white/10">
              <span className="text-[#ffdcc3] uppercase font-bold tracking-wider block mb-0.5">
                Bespoke Pairings
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.tastingNotes.pairings.map((pair, i) => (
                  <span
                    key={i}
                    className="bg-white/10 text-white px-2.5 py-1 rounded-md text-[11px]"
                  >
                    {pair}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Heating Guide */}
          <div className="bg-[#b8753c]/20 border border-[#b8753c]/40 rounded-2xl p-4 flex items-start gap-3 text-xs">
            <Flame className="w-5 h-5 text-[#feb071] shrink-0 mt-0.5" />
            <div>
              <p className="font-sans font-bold text-[#ffdcc3] uppercase tracking-wider mb-0.5">
                Optimal Molten Reheat
              </p>
              <p className="text-[#efe7dc] leading-relaxed">
                Microwave for 18–22 seconds, or preheated oven at 160°C for 3 minutes until the center glistens with hot cocoa butter.
              </p>
            </div>
          </div>

          {/* Allergens & Ingredients */}
          <div className="text-xs text-white/60 space-y-1 font-sans">
            <p>
              <strong className="text-white/80">Ingredients:</strong>{' '}
              {product.ingredients.join(', ')}.
            </p>
            <p>
              <strong className="text-white/80">Allergens:</strong>{' '}
              {product.allergens.join(', ')}.
            </p>
          </div>
        </div>

        {/* Sticky Purchase Footer */}
        <div className="p-5 md:p-6 border-t border-white/10 bg-[#361000] space-y-4">
          <div className="flex items-center justify-between">
            {/* Warmth option */}
            <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl">
              <button
                onClick={() => setWarmth('freshly-warmed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
                  warmth === 'freshly-warmed'
                    ? 'bg-[#feb071] text-[#2b1712] font-bold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Hot Oven Warm
              </button>
              <button
                onClick={() => setWarmth('ambient')}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-colors ${
                  warmth === 'ambient'
                    ? 'bg-[#feb071] text-[#2b1712] font-bold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Ambient (Later)
              </button>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-2 py-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white hover:bg-white/20"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-sm font-bold w-6 text-center tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white hover:bg-white/20"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="font-sans text-[11px] uppercase tracking-wider text-white/60 block">
                Total Amount
              </span>
              <span className="font-sans text-xl font-bold text-[#feb071] tabular-nums">
                Rs. {(product.pricePkr * quantity).toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleAdd}
              className="flex-1 bg-[#feb071] text-[#2b1712] hover:bg-[#ffdcc3] font-sans text-xs uppercase tracking-wider font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-[#2b1712]" /> ADDED TO BAG!
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> ADD TO BAG
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
