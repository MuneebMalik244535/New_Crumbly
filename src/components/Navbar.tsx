import React from 'react';
import { ShoppingBag, Sparkles, Clock, Phone } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  activeSection,
  onNavigate,
}) => {
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'signatures', label: 'SIGNATURES' },
    { id: 'menu', label: 'MENU' },
    { id: 'box-builder', label: 'BOX BUILDER' },
    { id: 'our-story', label: 'OUR STORY' },
    { id: 'location', label: 'LOCATION' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#fff8f1]/90 backdrop-blur-xl border-b border-[#e8d2b5]/60 shadow-[0_12px_36px_-4px_rgba(43,23,18,0.06)]">
      {/* Top subtle continuous batch status announcement */}
      <div className="bg-[#2b1712] text-[#fff8f1] px-4 py-1 text-xs flex items-center justify-between">
        <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#feb071] animate-ping" />
            <span className="tracking-widest uppercase text-[11px] font-medium text-[#ffdcc3]">
              Continuous Oven Batch #48 · 180°C Live Bake
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#efe7dc] tracking-wider uppercase">
            <span>Free Insulated Warm Dispatch Over Rs. 2,500</span>
            <span className="text-[#feb071]">·</span>
            <span>Gulberg Flagship Atelier</span>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 distinct zones */}
      <div className="h-20 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="flex items-center gap-3 shrink-0 group cursor-pointer"
        >
          <img
            alt="CRUMBLY Brand Wordmark"
            className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/AEtjO1U1vNA9385E2fdLK9iVgfCovOMnkxUfWgDe0IEvsj6Z3ziNg-NNkfn_2EKkMmaoNmF9QJTuKhw4YMUaWcTQ1QZyqAc0kOCztcggJo5hibWD8sKeKDasUTXjzWdwwh6rR6U9yLywTvlBjxqNkzK50ygUR3xLB00aLwBMItvssDif_ZL_I-ojRI_3Bc1Xi67xe1WiPSzwPDCmXRIpegrZ1k9fnX_ShQwktbvljTIZHs2IeyAKTg0MCVAJH0Bx"
          />
          <span className="font-serif text-2xl tracking-[0.22em] uppercase font-bold text-[#2b1712] hidden sm:inline-block">
            CRUMBLY
          </span>
        </a>

        {/* Zone 2: Navigation Links (single line, no wrapping) */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`font-sans text-xs uppercase tracking-[0.16em] font-semibold transition-all duration-200 whitespace-nowrap shrink-0 relative py-1.5 ${
                  isActive
                    ? 'text-[#2b1712]'
                    : 'text-[#504442] hover:text-[#2b1712]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2b1712] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Bag */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('menu')}
            className="hidden sm:inline-flex items-center justify-center bg-[#2b1712] text-[#fff8f1] font-sans text-xs uppercase tracking-[0.14em] font-semibold px-5 py-2.5 rounded transition-all duration-300 hover:bg-[#361000] hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(43,23,18,0.18)]"
          >
            ORDER NOW
          </button>

          {/* Bag trigger button */}
          <button
            onClick={onOpenCart}
            aria-label="Open Shopping Bag"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#f5ede2] text-[#2b1712] hover:bg-[#feb071]/30 transition-colors border border-[#e8d2b5]"
          >
            <ShoppingBag className="w-5 h-5 text-[#2b1712]" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8b501a] text-white text-[11px] font-bold font-sans w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale">
                {totalItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
