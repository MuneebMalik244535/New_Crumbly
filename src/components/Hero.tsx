import React, { useEffect, useRef } from 'react';
import { Play, Sparkles, Flame, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

interface HeroProps {
  onOrderNow: () => void;
  onExploreSignatures: () => void;
  onOpenVideo: () => void;
  onOpenBoxBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOrderNow,
  onExploreSignatures,
  onOpenVideo,
  onOpenBoxBuilder,
}) => {
  const headingRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth subtle GSAP reveal
      gsap.from(metaRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.from(headingRef.current?.children || [], {
        opacity: 0,
        y: 28,
        stagger: 0.15,
        duration: 1.1,
        ease: 'power3.out',
      });

      gsap.from(mediaRef.current, {
        opacity: 0,
        scale: 0.97,
        duration: 1.3,
        delay: 0.3,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#fff8f1] pt-4 pb-14 md:pb-20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        {/* Overline Meta Grid */}
        <div
          ref={metaRef}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-6 border-b border-[#e8d2b5]/50 text-xs font-sans uppercase tracking-[0.2em] text-[#504442]"
        >
          <div className="flex items-center gap-2.5">
            <span className="inline-flex w-2.5 h-2.5 rounded-full bg-[#8b501a] animate-pulse" />
            <span className="font-semibold text-[#2b1712]">
              Continuous Hot Oven Cycles · 180°C
            </span>
          </div>
          <div className="flex items-center gap-3 text-[#504442] text-[11px]">
            <span>Release 04 / Autumn Harvest</span>
            <span>•</span>
            <span className="text-[#8b501a] font-bold">Flagship Atelier</span>
          </div>
        </div>

        {/* Asymmetrical Editorial Heading Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-8" ref={headingRef}>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[84px] text-[#2b1712] tracking-tight leading-[0.92] uppercase">
              COOKIES
              <br />
              <span className="italic font-normal lowercase tracking-normal text-[#8b501a] font-serif pr-2">
                made to be
              </span>
              <br />
              CRAVED.
            </h1>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end gap-5 pb-1">
            <p className="font-sans text-base md:text-lg text-[#504442] leading-relaxed max-w-md">
              Warm, gooey, loaded with the good stuff. Hand-crafted confections
              baked in continuous small batches with single-origin Belgian chocolate.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOrderNow}
                className="inline-flex items-center justify-center bg-[#2b1712] text-[#fff8f1] font-sans text-xs uppercase tracking-[0.14em] font-bold px-6 py-3.5 rounded transition-all duration-300 hover:bg-[#361000] hover:-translate-y-0.5 shadow-md"
              >
                ORDER NOW
              </button>
              <button
                onClick={onExploreSignatures}
                className="inline-flex items-center justify-center bg-[#f5ede2] text-[#2b1712] font-sans text-xs uppercase tracking-[0.14em] font-bold px-5 py-3.5 rounded transition-all duration-300 hover:bg-[#ffdcc3] hover:text-[#2f1500] shadow-sm border border-[#e8d2b5]"
              >
                EXPLORE SIGNATURES
              </button>
              <button
                onClick={onOpenBoxBuilder}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] font-bold text-[#8b501a] hover:text-[#2b1712] transition-colors py-2"
              >
                Curate Box of 6 <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic Hero Video / Media Container */}
        <div
          ref={mediaRef}
          className="relative w-full rounded-2xl overflow-hidden bg-[#2b1712] text-[#fff8f1] shadow-[0_24px_50px_-12px_rgba(43,23,18,0.35)]"
        >
          <div className="aspect-[16/9] md:aspect-[21/9] w-full relative overflow-hidden group">
            <img
              alt="Cinematic macro editorial film still of a thick, freshly baked Crumbly cookie being slowly broken apart, revealing a steaming molten Nutella and dark Belgian chocolate core oozing outwards."
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRkd5ezEIiDkfi32SLRytC3LryvnM9yWk6z2Ia5D0gz8v1Yp6pamIDW31-o0NjRVtZD75orvW9mRebYhBWaoy8BtyZaiUy17POogQH-wAMRQ5nc5e-uf8zwlF7qZ6EiqGlI09cw00ZWRuwLDX7J6wViIk4OF6yor-KwQQeV_oaloVlYxhiywx3IaS8V3s1dlZbeQljM5tV58dh60QwFvuPaDYo4xgYFbOEiVSxPI19vzv2L1FcVuW3SQ"
            />
            {/* Scrim overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2b1712]/90 via-[#2b1712]/25 to-transparent pointer-events-none" />

            {/* Badges in Top Left */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-wrap items-center gap-2">
              <span className="bg-[#fff8f1]/90 backdrop-blur-md text-[#2b1712] font-sans text-[11px] uppercase tracking-[0.2em] px-3 py-1.5 rounded font-semibold shadow-sm">
                Fresh Batch Out Now
              </span>
              <span className="bg-[#2b1712]/80 backdrop-blur-md text-[#fff8f1] font-sans text-[11px] uppercase tracking-widest px-3 py-1.5 rounded border border-white/10">
                4K 60FPS ATELIER REEL
              </span>
            </div>

            {/* Interactive Play Video Center Aesthetic */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={onOpenVideo}
                aria-label="Play 4K Atelier Film"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#fff8f1]/90 text-[#2b1712] backdrop-blur-md flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 cursor-pointer border border-[#e8d2b5] hover:bg-[#fff8f1]"
              >
                <Play className="w-8 h-8 fill-[#2b1712] text-[#2b1712] translate-x-0.5" />
              </button>
            </div>

            {/* Bottom Label Tag */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[#fff8f1]">
              <div>
                <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#efe7dc] opacity-90 block">
                  Cinematic Reel Feature
                </span>
                <p className="font-serif text-xl md:text-2xl font-semibold">
                  Molten Lava Release — Winter Batch 2025
                </p>
              </div>
              <button
                onClick={onOpenVideo}
                className="font-sans text-xs tracking-wider uppercase text-[#ffdcc3] hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Watch Behind-The-Scenes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
