import React, { useState } from 'react';
import { Flame, ArrowRight, Check, Sparkles, Thermometer } from 'lucide-react';
import { Product } from '../types';

interface MoltenSpotlightProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  lavaProduct?: Product;
}

export const MoltenSpotlight: React.FC<MoltenSpotlightProps> = ({
  onSelectProduct,
  onAddToCart,
  lavaProduct,
}) => {
  const [warmthLevel, setWarmthLevel] = useState<number>(20); // in seconds
  const [addedNotice, setAddedNotice] = useState(false);

  // Dynamic sensory calculation based on warmth level
  const fluidity = Math.min(99, Math.max(70, Math.round(75 + warmthLevel * 0.95)));
  const edgeCrunch = Math.max(75, Math.round(92 - warmthLevel * 0.3));
  const aroma = Math.min(100, Math.round(80 + warmthLevel * 0.8));

  const handleQuickAdd = () => {
    if (lavaProduct) {
      onAddToCart(lavaProduct);
      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 2200);
    }
  };

  return (
    <section className="w-full bg-[#2b1712] text-[#fff8f1] py-16 md:py-24 relative overflow-hidden">
      {/* Diffused warm ambient glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#8b501a]/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#feb071]/15 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Editorial Content */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-white/10 rounded font-sans text-[11px] uppercase tracking-[0.2em] text-[#ffdcc3] font-semibold">
                Flagship Feature
              </span>
              <span className="text-[#efe7dc] font-sans text-xs">
                • Timed Continuous Release
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#fff8f1] uppercase leading-none">
              THE ONE
              <br />
              <span className="italic font-normal lowercase text-[#ffdcc3] font-serif">
                that
              </span>
              <br />
              MELTS FIRST.
            </h2>

            <p className="font-sans text-base md:text-lg text-[#efe7dc] max-w-lg leading-relaxed">
              Warm cookie dough. Rich chocolate. A center worth breaking into.
              Crafted with an uncompromising ratio of 60% molten hazelnut filling to 40% crisp, golden caramelized crust.
            </p>

            {/* Interactive Flavour Profile Gauge Component */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#ffdcc3] font-semibold flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-[#feb071]" /> Interactive Warmth Simulation
                </span>
                <span className="text-xs text-[#ffdcc3] tabular-nums font-mono">
                  {warmthLevel}s @ 180°C
                </span>
              </div>

              {/* Interactive Warmth Slider */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] uppercase tracking-wider text-white/70">Milder</span>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={warmthLevel}
                  onChange={(e) => setWarmthLevel(Number(e.target.value))}
                  className="w-full accent-[#feb071] h-1.5 bg-white/20 rounded-lg cursor-pointer"
                />
                <span className="text-[11px] uppercase tracking-wider text-white/70">Ultra Molten</span>
              </div>

              {/* Sensory Bars */}
              <div className="space-y-3 font-sans text-xs pt-1">
                <div>
                  <div className="flex justify-between text-[#efe7dc] mb-1">
                    <span>Molten Lava Fluidity</span>
                    <span className="font-semibold text-[#ffdcc3] tabular-nums font-mono">{fluidity}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#feb071] rounded-full transition-all duration-300"
                      style={{ width: `${fluidity}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#efe7dc] mb-1">
                    <span>Deep Hazelnut Density</span>
                    <span className="font-semibold text-[#ffdcc3] tabular-nums font-mono">92%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#feb071] w-[92%] rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#efe7dc] mb-1">
                    <span>Edge Crunch Crispness</span>
                    <span className="font-semibold text-[#ffdcc3] tabular-nums font-mono">{edgeCrunch}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#feb071] rounded-full transition-all duration-300"
                      style={{ width: `${edgeCrunch}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Trigger */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={handleQuickAdd}
                className="inline-flex items-center gap-2 bg-[#feb071] text-[#2b1712] font-sans text-xs uppercase tracking-[0.14em] px-7 py-3.5 rounded font-bold shadow-xl hover:bg-[#ffdcc3] transition-all duration-300 hover:scale-[1.02]"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-[#2b1712]" /> ADDED TO BAG!
                  </>
                ) : (
                  <>
                    TRY THE LAVA <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {lavaProduct && (
                <button
                  onClick={() => onSelectProduct(lavaProduct)}
                  className="font-sans text-xs uppercase tracking-widest text-[#ffdcc3] hover:text-white transition-colors underline underline-offset-4"
                >
                  Full Tasting Notes
                </button>
              )}

              <div className="flex items-baseline gap-2 ml-auto">
                <span className="font-sans text-[11px] text-[#efe7dc] uppercase tracking-wider">
                  Serving portion:
                </span>
                <span className="font-sans text-xs text-white font-bold">
                  250g Skillet (Rs. 750)
                </span>
              </div>
            </div>
          </div>

          {/* Right: Dedicated High-End Media Container */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/5 p-2.5 border border-white/10">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                <img
                  alt="Stunning cinematic food film still of a spoon plunging into a warm Nutella Lava Cookie Dough, lifting a huge stretch of molten hazelnut chocolate ganache with gentle steam rising into dark mood lighting."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf62-MBF3siEdhWLMngD_I3DOIkSB5v3UIUapbjdw66XAh5qWj3xCgz-S-erxidOUlRdJdvvBhQzD7NG-qrb4fhJIyqB8-K09wm0yiHuHmUPxEsFhl6IKODPblhxVlNRHVrBreyd5b2EyM8NT-4yMMkTL7UpwdykP28UDRJKdn5etWclChK3kKX7eydZzeib46XtKFP9pTvufxVKASyDmpoSM_Zt8Q-tpkZZ3f7CnJYuIIa5jqMvdcMg"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2b1712] via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Steam & Oven metadata badge */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#2b1712]/90 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-[#8b501a]/50 text-[#ffdcc3]">
                      <Flame className="w-5 h-5 text-[#feb071]" />
                    </span>
                    <div>
                      <p className="font-sans text-xs text-white uppercase font-bold tracking-wider">
                        Baked to order at 180°C
                      </p>
                      <p className="font-sans text-xs text-[#efe7dc]">
                        Zero holding trays. Straight from flame to box.
                      </p>
                    </div>
                  </div>
                  <span className="font-sans text-[11px] tracking-widest text-[#ffdcc3] uppercase bg-white/10 px-3 py-1.5 rounded font-semibold self-start sm:self-center">
                    Instant Freshness
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
