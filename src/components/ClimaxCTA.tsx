import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';

interface ClimaxCTAProps {
  onOrderNow: () => void;
  onOpenVideo: () => void;
}

export const ClimaxCTA: React.FC<ClimaxCTAProps> = ({ onOrderNow, onOpenVideo }) => {
  return (
    <section className="w-full bg-[#2b1712] text-[#fff8f1] py-16 md:py-24 relative overflow-hidden">
      {/* Atmospheric warm lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8b501a]/15 to-[#2b1712] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 relative z-10 text-center flex flex-col items-center">
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#ffdcc3] font-bold mb-3 block">
          Warm Batches In The Oven
        </span>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl uppercase tracking-tight leading-none text-white mb-2">
          STILL THINKING ABOUT IT?
        </h2>

        <p className="font-serif text-2xl md:text-3xl text-[#ffdcc3] italic font-normal mb-8">
          Get your Crumbly.
        </p>

        <div className="mb-12">
          <button
            onClick={onOrderNow}
            className="inline-flex items-center gap-3 bg-[#feb071] text-[#2b1712] font-sans text-xs uppercase tracking-[0.16em] px-8 md:px-10 py-4 rounded-xl font-bold transition-all duration-300 hover:bg-[#ffdcc3] hover:scale-105 shadow-2xl"
          >
            <span>ORDER NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Final Climax Dessert Media Frame */}
        <div className="w-full max-w-4xl rounded-2xl overflow-hidden bg-white/5 p-2.5 border border-white/10 shadow-2xl">
          <div
            onClick={onOpenVideo}
            className="aspect-[21/9] w-full relative rounded-xl overflow-hidden group cursor-pointer"
          >
            <img
              alt="Sensory grand finale culinary photograph of an array of Crumbly confections: bubbling cast iron cookie dough skillets, thick molten cookies broken open with hazelnut and chocolate lava."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCUeA5TQxgjQL0HVM2hGmagaoXEjtQfhGALnYvzWA7iiJNpIwigifhru-0IV_pgDkjIfkKeOgj4ae1cDPCADlKlnai9GOIHYk3kMYOlyPN8jmKV54pO-8GaHG4ZI4JipkNJjZpFoiXESydLClVj27LvGzH8JpfZkujOh4cAdPRTLidTi2IHUXHmsFF2l69dTPJ2s_ZtKFoA_S8Rj4erO4HEbPDGIOkzEovj8vUFFJWWuWCg_3MQdzyRw"
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2b1712] via-transparent to-transparent opacity-70" />
            <div className="absolute bottom-4 inset-x-6 flex items-center justify-between text-[#efe7dc] font-sans text-[11px] uppercase tracking-widest">
              <span>[ CINEMATIC DESSERT CONTAINER — CLICK TO PLAY REEL ]</span>
              <span className="text-[#ffdcc3] font-bold">CRUMBLY HAUTE PÂTISSERIE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
