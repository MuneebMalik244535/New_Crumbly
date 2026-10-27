import React from 'react';
import { ArrowRight, MessageSquare, MapPin, Instagram, Bike, Sparkles } from 'lucide-react';

interface OrderSectionProps {
  onOpenCart: () => void;
  onNavigateToLocation: () => void;
}

export const OrderSection: React.FC<OrderSectionProps> = ({
  onOpenCart,
  onNavigateToLocation,
}) => {
  return (
    <section className="w-full bg-[#fff8f1] py-16 md:py-24" id="order-now">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="bg-[#2b1712] text-[#fff8f1] rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-2xl border border-[#4a2921]">
          {/* Subtle warm glow overlay */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#8b501a]/25 blur-3xl pointer-events-none" />

          <div className="max-w-2xl flex flex-col gap-5 relative z-10">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#ffdcc3] font-bold">
              Fast Warm Delivery
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-tight">
              YOUR CRAVING IS WAITING.
            </h2>

            <p className="font-sans text-base md:text-lg text-[#efe7dc] leading-relaxed">
              Order fresh batches dispatched immediately from our stone ovens. Insulated packaging preserves internal molten warmth straight to your door.
            </p>

            {/* Direct Platform Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
              {/* Direct Atelier Bag */}
              <button
                onClick={onOpenCart}
                className="flex items-center justify-between p-4 bg-white/10 hover:bg-[#feb071] hover:text-[#2b1712] rounded-xl transition-all duration-300 text-left group border border-white/10"
              >
                <div className="flex items-center gap-2.5">
                  <Bike className="w-4 h-4 text-[#ffdcc3] group-hover:text-[#2b1712]" />
                  <span className="font-sans text-xs uppercase font-bold tracking-wider">
                    Direct Atelier Bag
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Foodpanda */}
              <a
                href="https://foodpanda.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-left group border border-white/10"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff2b85]" />
                  <span className="font-sans text-xs uppercase font-bold tracking-wider">
                    Foodpanda
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#ffdcc3]" />
              </a>

              {/* WhatsApp Concierge */}
              <a
                href="https://wa.me/?text=Hello%20Crumbly%20Atelier!%20I%20would%20like%20to%20order%20a%20fresh%20warm%20batch%20of%20cookies."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-left group border border-white/10"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-[#25d366]" />
                  <span className="font-sans text-xs uppercase font-bold tracking-wider">
                    WhatsApp Desk
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#ffdcc3]" />
              </a>

              {/* Get Directions */}
              <button
                onClick={onNavigateToLocation}
                className="flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-left group border border-white/10"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#ffdcc3]" />
                  <span className="font-sans text-xs uppercase font-bold tracking-wider">
                    Get Directions
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#ffdcc3]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
