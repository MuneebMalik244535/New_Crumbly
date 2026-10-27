import React from 'react';
import { BRAND_STORY } from '../data/products';

export const BrandStory: React.FC = () => {
  return (
    <section className="w-full bg-[#fff8f1] py-16 md:py-24" id="our-story">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Story Text Block (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-[1px] bg-[#8b501a]" />
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#8b501a] font-semibold">
                The Origins
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2b1712] uppercase tracking-tight leading-tight">
              {BRAND_STORY.headline}
            </h2>

            <div className="space-y-4 font-sans text-sm md:text-base text-[#504442] leading-relaxed">
              <p>
                Crumbly is made for the moments when one cookie just isn’t enough. Born from an obsession with the perfect molten pull and heavyweight texture, we set out to redefine dessert culture with unapologetic indulgence and editorial craftsmanship.
              </p>
              <p>
                Founded in our pastry laboratory with a bespoke copper-lined oven, our bakers spent 18 months perfecting the precise hydration and fat ratios that guarantee our cookies stay crackly outside, yet liquid-molten at their heart.
              </p>
              <blockquote className="font-serif text-lg md:text-xl italic text-[#2b1712] pl-4 border-l-2 border-[#8b501a] py-1">
                "{BRAND_STORY.quote}"
              </blockquote>
            </div>

            {/* Spec Counters */}
            <div className="pt-2 grid grid-cols-3 gap-4 border-t border-[#e8d2b5]/60">
              <div>
                <p className="font-serif text-2xl md:text-3xl text-[#2b1712] font-semibold tabular-nums">
                  180°C
                </p>
                <p className="font-sans text-[11px] text-[#827471] uppercase tracking-wider mt-0.5">
                  Exact Bake Heat
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl md:text-3xl text-[#2b1712] font-semibold tabular-nums">
                  160g+
                </p>
                <p className="font-sans text-[11px] text-[#827471] uppercase tracking-wider mt-0.5">
                  Average Weight
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl md:text-3xl text-[#2b1712] font-semibold tabular-nums">
                  100%
                </p>
                <p className="font-sans text-[11px] text-[#827471] uppercase tracking-wider mt-0.5">
                  Grass-Fed Butter
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Dual Photo Composition (7 Columns) */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-5 md:gap-6 items-center">
            <div className="col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#e0d9ce] aspect-[4/5] border border-[#e8d2b5]">
                <img
                  alt="Editorial lifestyle photography of an artisan pastry chef in crisp baker jacket delicately placing whole roasted hazelnuts and chocolate callets into heavy golden cookie dough trays in a warm sunlit atelier kitchen."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA7219Ja605ZOkg4Qz6DYTjxphJcCD6jpun9K_gN991P8AuZUsy222H6ZXFYmiX6vxzPoegFBA8Nn1WvhWqnpZmphtXrj53UhD5llKxj5VIdFdsQIFLYdcm-bPUFN12NW4Vf4jPHZxUQ4izCLprgBvFHA_MZRpg99UOq3wcMSBgZizC95lerGWEMruvVrWpJUT7Yp6_RH5Amc_OwI2Xq9oCWsYmRojLXW6BplhzRHxqIpSFerMHCcv1g"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="col-span-5 flex flex-col gap-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-[#e0d9ce] aspect-square border border-[#e8d2b5]">
                <img
                  alt="Artisanal macro still life of raw baking components: stacked Belgian chocolate slabs, Madagascar vanilla bean pods, wooden spoon with organic brown sugar, and sea salt flakes on warm parchment paper."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuChBt3KGmTWOMS47ngpD1rr9VMLtmRz6Ll820ezNCKMdg-kImvs3tnZez9zpfURcKWA-jUQ8j-QxfQ-ikcH2u04GPMzgSJuHZROU9qHLS2BrTLFjZItQe470KprQ4i6-w0e_F9ZsmL2tUFh0XcdJ9dsNBekZCVWruhsEax0kCWkToJ9NzqTFgi0EHZ48BbZbT_TVaaOzELqfPe1IhuV3KNNqtx3wmOoT3yYG1SQ_Q-LVGHSkht2gS-ruQ"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="bg-[#f5ede2] p-5 rounded-2xl border border-[#e8d2b5] shadow-sm">
                <span className="font-sans text-[11px] uppercase tracking-widest text-[#8b501a] font-bold block mb-1">
                  Our Atelier Pledge
                </span>
                <p className="font-sans text-xs text-[#504442] leading-relaxed">
                  Zero preservatives, zero premixes. Only pure European cultured butter, farm-fresh eggs, and single-origin Belgian cocoa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
