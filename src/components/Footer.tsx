import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenCart: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCart }) => {
  return (
    <footer className="w-full bg-[#2b1712] text-[#fff8f1] border-t border-[#4a2921]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 pt-16 pb-12">
        {/* Brand Banner */}
        <div className="mb-14 pb-10 border-b border-white/10">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#ffdcc3] block mb-2 font-semibold">
            Haute Pâtisserie &amp; Artisanal Confections
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-medium tracking-tight mb-3">
            CRUMBLY
          </h2>
          <p className="font-serif text-lg md:text-xl text-[#efe7dc] italic max-w-2xl font-light">
            Sensory alchemy sculpted in warm cocoa, toasted grains, and decadent patience.
          </p>
        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14 font-sans text-xs">
          {/* Column 1: Directory */}
          <div className="flex flex-col gap-3">
            <h3 className="uppercase tracking-[0.16em] text-[#ffdcc3] font-bold">
              Directory
            </h3>
            <div className="flex flex-col gap-2 text-[#efe7dc]">
              <button
                onClick={() => onNavigate('home')}
                className="text-left hover:text-white transition-colors"
              >
                HOME
              </button>
              <button
                onClick={() => onNavigate('signatures')}
                className="text-left hover:text-white transition-colors"
              >
                SIGNATURES
              </button>
              <button
                onClick={() => onNavigate('menu')}
                className="text-left hover:text-white transition-colors"
              >
                MENU
              </button>
              <button
                onClick={() => onNavigate('box-builder')}
                className="text-left hover:text-white transition-colors"
              >
                BOX BUILDER
              </button>
              <button
                onClick={() => onNavigate('our-story')}
                className="text-left hover:text-white transition-colors"
              >
                OUR STORY
              </button>
              <button
                onClick={() => onNavigate('location')}
                className="text-left hover:text-white transition-colors"
              >
                LOCATION
              </button>
            </div>
          </div>

          {/* Column 2: Ordering Platforms */}
          <div className="flex flex-col gap-3">
            <h3 className="uppercase tracking-[0.16em] text-[#ffdcc3] font-bold">
              Ordering Platforms
            </h3>
            <div className="flex flex-col gap-2 text-[#efe7dc]">
              <button
                onClick={onOpenCart}
                className="text-left hover:text-white transition-colors"
              >
                Direct Boutique Bag &amp; Warm Dispatch
              </button>
              <a
                href="https://foodpanda.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Foodpanda Curated
              </a>
              <a
                href="https://wa.me/?text=Hello%20Crumbly%20Atelier!"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                WhatsApp Private Concierge
              </a>
              <span className="text-white/60">Corporate &amp; Bespoke Gifting</span>
            </div>
          </div>

          {/* Column 3: Social & Experience */}
          <div className="flex flex-col gap-3">
            <h3 className="uppercase tracking-[0.16em] text-[#ffdcc3] font-bold">
              Social &amp; Experience
            </h3>
            <div className="flex flex-col gap-2 text-[#efe7dc]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram @CRUMBLY
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                TikTok Atelier Chronicles
              </a>
              <span className="text-white/60">Private Tasting Invitations</span>
              <span className="text-white/60">Seasonal Tasting Pass</span>
            </div>
          </div>

          {/* Column 4: Boutique & Hours */}
          <div className="flex flex-col gap-3">
            <h3 className="uppercase tracking-[0.16em] text-[#ffdcc3] font-bold">
              Boutique &amp; Hours
            </h3>
            <div className="text-[#efe7dc] flex flex-col gap-1.5 leading-relaxed">
              <p>High Street, Sector F-7 / Gulberg Commercial Hub</p>
              <p>Monday — Thursday: 13:00 — 01:00</p>
              <p>Friday — Sunday: 13:00 — 02:30</p>
              <p className="text-[#ffdcc3] font-mono pt-1">
                concierge@crumbly-patisserie.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#efe7dc]/80 font-sans">
          <p>© CRUMBLY Haute Pâtisserie. All rights reserved. Crafted for decadent cravings.</p>
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Editorial
            </span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Indulgence
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
