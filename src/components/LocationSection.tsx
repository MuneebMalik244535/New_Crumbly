import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, Check, Sparkles } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyHotline = () => {
    navigator.clipboard.writeText('+920518442786');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-[#faf3e8] py-16 md:py-24 border-t border-[#e8d2b5]/60" id="location">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#e8d2b5]/60">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#8b501a] font-bold block mb-2">
              Flagship Atelier &amp; Salon
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2b1712] tracking-tight uppercase">
              COME FIND US
            </h2>
          </div>
          <p className="font-sans text-base text-[#504442] max-w-sm">
            Experience the aroma of live baking in our warm travertine and smoked oak boutique parlor.
          </p>
        </div>

        {/* Luxury Architectural Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Architectural Map & Exterior Image (7 Columns) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-md bg-[#e0d9ce] min-h-[420px] relative border border-[#e8d2b5]">
            <img
              alt="Crumbly Boutique Flagship Storefront Interior"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYR-5W6o_Dfvsf9xyRuv_7jgFxlQA6fnHi4FS96hadcnxc4gWLx4l4YFWrc31Axg3BNmaohKssIuRm4uwVi0atQBXGC0hZFTQ8T7SKNyC6gI09fCprWnWrflfRV9TQ0Y9l2PrX3zO42G6aWiIGBEvnOEiFB5qI4IVO6uVEJ7Zn1KPHx7T-fFShgtibWp7lGIwd7DXr4DQ8QREc3MksHrf1Q2dvnMF7uVJj2FPtP2Z32EuaVFJ_sb_Fdg"
              className="w-full h-full object-cover min-h-[420px]"
            />
            {/* Map Overlay Pill */}
            <div className="absolute bottom-5 left-5 bg-[#fff8f1]/95 backdrop-blur-md px-5 py-4 rounded-xl shadow-lg border border-[#e8d2b5] max-w-sm">
              <p className="font-sans text-[11px] text-[#8b501a] uppercase font-bold tracking-widest flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#8b501a]" /> CRUMBLY Atelier &amp; Salon
              </p>
              <p className="font-sans text-sm text-[#2b1712] font-semibold mt-1">
                High Street, Sector F-7 / Gulberg
              </p>
              <p className="font-sans text-xs text-[#827471] mt-0.5">
                Valet parking available · Heated outdoor terrace seating
              </p>
            </div>
          </div>

          {/* Location Metadata Card (5 Columns) */}
          <div className="lg:col-span-5 bg-[#fff8f1] p-8 md:p-9 rounded-2xl border border-[#e8d2b5] shadow-sm flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-sans text-xs uppercase tracking-widest text-[#8b501a] font-bold block mb-1">
                  Flagship Address
                </span>
                <p className="font-serif text-2xl text-[#2b1712] font-semibold">
                  Boutique Flagship, High Street
                </p>
                <p className="font-sans text-sm text-[#504442] mt-0.5">
                  Sector F-7 / Gulberg Commercial Boulevard
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-[#e8d2b5]/60">
                <span className="font-sans text-xs uppercase tracking-widest text-[#8b501a] font-bold block">
                  Operating Hours
                </span>
                <div className="flex items-center justify-between font-sans text-xs pb-2 border-b border-[#f5ede2]">
                  <span className="text-[#2b1712]">Monday — Thursday</span>
                  <span className="font-semibold text-[#2b1712] tabular-nums">
                    1:00 PM – 1:00 AM
                  </span>
                </div>
                <div className="flex items-center justify-between font-sans text-xs">
                  <span className="text-[#8b501a] font-semibold">Friday — Sunday</span>
                  <span className="font-semibold text-[#2b1712] tabular-nums">
                    1:00 PM – 2:30 AM
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#e8d2b5]/60">
                <span className="font-sans text-xs uppercase tracking-widest text-[#8b501a] font-bold block mb-1">
                  Concierge &amp; Private Tastings
                </span>
                <p className="font-sans text-xs font-semibold text-[#2b1712]">
                  +92 (051) 844-CRUMB · concierge@crumbly.com
                </p>
                <p className="font-sans text-xs text-[#504442] mt-1">
                  Custom wedding dessert stations, dessert tables, and VIP event catering.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e8d2b5]/60 flex items-center gap-3">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center bg-[#2b1712] text-[#fff8f1] font-sans text-xs uppercase tracking-wider font-semibold py-3 rounded-lg hover:bg-[#361000] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" /> Google Maps
              </a>
              <button
                onClick={handleCopyHotline}
                className="flex-1 text-center bg-[#f5ede2] text-[#2b1712] font-sans text-xs uppercase tracking-wider font-semibold py-3 rounded-lg hover:bg-[#ffdcc3] transition-colors flex items-center justify-center gap-1.5 border border-[#e8d2b5]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Phone className="w-3.5 h-3.5" />}
                {copied ? 'Copied Number!' : 'Call Hotline'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
