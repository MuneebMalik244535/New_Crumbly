import React from 'react';
import { BRAND_STORY } from '../data/products';

export const BrandPhilosophy: React.FC = () => {
  return (
    <section className="w-full bg-[#efe7dc] py-16 md:py-24 border-y border-[#e8d2b5]/60" id="philosophy">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Big Statement Headline */}
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#8b501a] font-bold block mb-3">
            Our Culinary Creed
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-[#2b1712] uppercase tracking-tight leading-[1.05]">
            BAKED FRESH. LOADED GENEROUSLY. SERVED WARM.
          </h2>
        </div>

        {/* Three Pillars Layout with Asymmetrical Whitespace */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {BRAND_STORY.pillars.map((pillar, idx) => {
            const isCenter = idx === 1;
            return (
              <div
                key={pillar.num}
                className={`flex flex-col gap-4 bg-[#fff8f1] p-8 md:p-9 rounded-2xl border border-[#e8d2b5] shadow-sm hover:shadow-lg transition-all duration-300 ${
                  isCenter ? 'md:-translate-y-4 border-[#8b501a]/30' : ''
                }`}
              >
                <span className="font-serif text-5xl md:text-6xl text-[#8b501a]/30 font-semibold leading-none">
                  {pillar.num}
                </span>
                <h3 className="font-serif text-2xl text-[#2b1712] uppercase font-semibold">
                  {pillar.title}
                </h3>
                <p className="font-sans text-sm md:text-base text-[#504442] leading-relaxed">
                  {pillar.desc}
                </p>
                <div className="pt-2 font-sans text-xs text-[#8b501a] font-bold uppercase tracking-wider mt-auto">
                  {pillar.tag}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
