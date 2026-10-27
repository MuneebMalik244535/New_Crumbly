import React, { useState } from 'react';
import { Package, Plus, Trash2, Check, Sparkles, Gift } from 'lucide-react';
import { Product } from '../types';

interface BespokeBoxBuilderProps {
  products: Product[];
  onAddBoxToCart: (customBox: {
    title: string;
    items: Product[];
    ribbon: string;
    giftNote: string;
    pricePkr: number;
  }) => void;
}

export const BespokeBoxBuilder: React.FC<BespokeBoxBuilderProps> = ({
  products,
  onAddBoxToCart,
}) => {
  const [boxSize, setBoxSize] = useState<6 | 12>(6);
  const [selectedCookies, setSelectedCookies] = useState<Product[]>([]);
  const [selectedRibbon, setSelectedRibbon] = useState<string>('Terracotta Silk');
  const [giftNote, setGiftNote] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Filter products to individual cookies/doughs suitable for the box
  const availableCookies = products.filter(
    (p) => p.category === 'cookies' || p.category === 'dough' || p.category === 'brownies'
  );

  const ribbons = [
    { name: 'Terracotta Silk', color: '#b8753c' },
    { name: 'Espresso Velvet', color: '#2b1712' },
    { name: 'Gold Foil Stamp', color: '#d4af37' },
    { name: 'Raw Natural Linen', color: '#e8d2b5' },
  ];

  const handleAddCookie = (cookie: Product) => {
    if (selectedCookies.length < boxSize) {
      setSelectedCookies([...selectedCookies, cookie]);
    }
  };

  const handleRemoveSlot = (index: number) => {
    const updated = [...selectedCookies];
    updated.splice(index, 1);
    setSelectedCookies(updated);
  };

  const basePrice = boxSize === 6 ? 3850 : 7400;
  const isBoxFull = selectedCookies.length === boxSize;

  const handleCommitBox = () => {
    if (!isBoxFull) return;
    onAddBoxToCart({
      title: boxSize === 6 ? 'Curated Box of 6' : 'Grand Atelier Dozen (12)',
      items: selectedCookies,
      ribbon: selectedRibbon,
      giftNote: giftNote,
      pricePkr: basePrice,
    });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedCookies([]);
      setGiftNote('');
    }, 2500);
  };

  return (
    <section className="w-full bg-[#fff8f1] py-16 md:py-24" id="box-builder">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#e8d2b5]/60">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#8b501a] font-bold block mb-2">
              Bespoke Gifting &amp; Assortment Selector
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2b1712] tracking-tight uppercase">
              THE ATELIER BOX BUILDER
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-[#f5ede2] p-1.5 rounded-xl border border-[#e8d2b5]">
            <button
              onClick={() => {
                setBoxSize(6);
                if (selectedCookies.length > 6) setSelectedCookies(selectedCookies.slice(0, 6));
              }}
              className={`px-4 py-2 rounded-lg font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                boxSize === 6
                  ? 'bg-[#2b1712] text-[#fff8f1] shadow-sm'
                  : 'text-[#504442] hover:text-[#2b1712]'
              }`}
            >
              Box of Six (Rs. 3,850)
            </button>
            <button
              onClick={() => setBoxSize(12)}
              className={`px-4 py-2 rounded-lg font-sans text-xs uppercase tracking-wider font-semibold transition-all ${
                boxSize === 12
                  ? 'bg-[#2b1712] text-[#fff8f1] shadow-sm'
                  : 'text-[#504442] hover:text-[#2b1712]'
              }`}
            >
              Grand Dozen (Rs. 7,400)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: The Visual Carton with Dashed Placeholder Slots */}
          <div className="lg:col-span-7 bg-[#2b1712] text-[#fff8f1] rounded-3xl p-6 md:p-8 shadow-2xl border border-[#4a2921]">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-[#feb071]" />
                <div>
                  <h3 className="font-serif text-xl tracking-wide uppercase font-semibold">
                    Signature Embossed Carton
                  </h3>
                  <span className="font-sans text-xs text-[#efe7dc]">
                    {selectedCookies.length} of {boxSize} slots filled
                  </span>
                </div>
              </div>
              <span className="font-sans text-xs uppercase tracking-widest text-[#ffdcc3] bg-white/10 px-3 py-1 rounded">
                Ribbon: {selectedRibbon}
              </span>
            </div>

            {/* Grid of Cookie Slots */}
            <div
              className={`grid gap-4 mb-6 ${
                boxSize === 6
                  ? 'grid-cols-2 sm:grid-cols-3'
                  : 'grid-cols-3 sm:grid-cols-4'
              }`}
            >
              {Array.from({ length: boxSize }).map((_, index) => {
                const cookie = selectedCookies[index];
                if (cookie) {
                  return (
                    <div
                      key={index}
                      className="group relative aspect-square rounded-2xl overflow-hidden bg-[#361000] border border-[#feb071]/40 p-2 flex flex-col justify-between shadow-inner"
                    >
                      <img
                        alt={cookie.name}
                        src={cookie.image}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-[#2b1712]/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                        <span className="font-serif text-xs font-bold leading-tight mb-2">
                          {cookie.name}
                        </span>
                        <button
                          onClick={() => handleRemoveSlot(index)}
                          className="p-1.5 rounded-full bg-red-600/80 text-white hover:bg-red-700 transition-colors"
                          title="Remove from slot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-sm text-[9px] font-mono px-1.5 py-0.5 rounded text-white/90">
                        #{index + 1}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={index}
                    className="aspect-square rounded-2xl border-2 border-dashed border-[#8a5237] hover:border-[#feb071] transition-colors flex flex-col items-center justify-center p-3 text-center bg-white/[0.03]"
                  >
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#feb071] mb-1.5 text-xs font-mono">
                      {index + 1}
                    </span>
                    <span className="font-sans text-[11px] uppercase tracking-wider text-white/50">
                      Empty Slot
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Customization Details: Ribbon & Note */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-[#ffdcc3] mb-2 font-semibold">
                  Choose Velvet / Silk Ribbon
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {ribbons.map((r) => (
                    <button
                      key={r.name}
                      onClick={() => setSelectedRibbon(r.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium flex items-center gap-2 border transition-all ${
                        selectedRibbon === r.name
                          ? 'border-[#feb071] bg-[#feb071]/20 text-white'
                          : 'border-white/10 text-white/70 hover:border-white/30'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-white/30"
                        style={{ backgroundColor: r.color }}
                      />
                      {r.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs uppercase tracking-wider text-[#ffdcc3] mb-1.5 font-semibold">
                  Complimentary Calligraphy Gift Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. For my favorite sweet tooth. Happy Birthday!"
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  maxLength={120}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs font-sans text-[#fff8f1] placeholder:text-white/40 focus:outline-none focus:border-[#feb071]"
                />
              </div>

              {/* Commit button */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-sans text-[11px] uppercase tracking-wider text-white/60 block">
                    Curated Box Total
                  </span>
                  <span className="font-sans text-xl font-bold text-[#feb071] tabular-nums">
                    Rs. {basePrice.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleCommitBox}
                  disabled={!isBoxFull}
                  className={`px-7 py-3 rounded-xl font-sans text-xs uppercase tracking-wider font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                    isBoxFull
                      ? 'bg-[#feb071] text-[#2b1712] hover:bg-[#ffdcc3] hover:scale-[1.02]'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                >
                  {showSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-[#2b1712]" /> CURATED BOX ADDED!
                    </>
                  ) : isBoxFull ? (
                    <>
                      <Package className="w-4 h-4 text-[#2b1712]" /> ADD CUSTOM CARTON TO BAG
                    </>
                  ) : (
                    `SELECT ${boxSize - selectedCookies.length} MORE COOKIES`
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Available Cookie Selector Catalog */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-[#f5ede2] p-5 rounded-2xl border border-[#e8d2b5]">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#8b501a] font-bold block mb-1">
                Step 1: Choose Confections
              </span>
              <p className="font-sans text-xs text-[#504442]">
                Click <Plus className="w-3.5 h-3.5 inline mx-0.5 text-[#8b501a]" /> on any cookie below to place it into your custom box.
              </p>
            </div>

            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
              {availableCookies.map((cookie) => {
                const countInBox = selectedCookies.filter((c) => c.id === cookie.id).length;
                return (
                  <div
                    key={cookie.id}
                    className="p-3.5 rounded-xl bg-[#fff8f1] border border-[#e8d2b5] flex items-center justify-between gap-3 hover:border-[#8b501a]/50 transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        alt={cookie.name}
                        src={cookie.image}
                        className="w-14 h-14 object-cover rounded-lg border border-[#e8d2b5]"
                      />
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-[#2b1712] leading-snug">
                          {cookie.name}
                        </h4>
                        <span className="font-sans text-[11px] text-[#827471] block">
                          {cookie.subBadge || `${cookie.weightGrams}g`} · {cookie.cacaoPercentage}% Cacao
                        </span>
                        {countInBox > 0 && (
                          <span className="font-sans text-[10px] font-bold text-[#8b501a] uppercase">
                            ({countInBox} in box)
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddCookie(cookie)}
                      disabled={isBoxFull}
                      aria-label={`Add ${cookie.name} to box`}
                      className={`px-3 py-1.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1 ${
                        isBoxFull
                          ? 'bg-[#efe7dc] text-[#827471] cursor-not-allowed'
                          : 'bg-[#2b1712] text-[#fff8f1] hover:bg-[#8b501a]'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
