import React, { useState } from 'react';
import { Heart, ExternalLink, Play, Film, MessageCircle } from 'lucide-react';

interface InstagramFeedProps {
  onOpenVideo: () => void;
}

export const InstagramFeed: React.FC<InstagramFeedProps> = ({ onOpenVideo }) => {
  const [likes, setLikes] = useState<Record<number, number>>({
    0: 1420,
    1: 890,
    2: 2100,
    3: 3450,
    4: 1120,
  });
  const [userLiked, setUserLiked] = useState<Record<number, boolean>>({});

  const toggleLike = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const isLiked = userLiked[index];
    setUserLiked({ ...userLiked, [index]: !isLiked });
    setLikes({ ...likes, [index]: likes[index] + (isLiked ? -1 : 1) });
  };

  const feedItems = [
    {
      id: 0,
      title: 'The Gooey Pull',
      alt: 'Editorial Instagram close up shot of two hands breaking a thick warm Nutella cookie in half with gooey melted chocolate stretch caught mid air in warm kitchen light.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDnAUyzji0JDT9UsLgyvJx5xQ2ufIJPC47NTj7DkzPgslpp1vnHd_62EW5w5MMq0Evaamm0f2-0UHMHqGbu8TX4-1ZSuQXY8FUm22ICpAj6ZjpF57iZwOTGmkHISNHbVUTrY7r-qcrsg0vgNVavE74rKHjh_AEsldRFiDpmv0QMCKEB2irj1hhoCkxg3lckdgiiPNdaMGGujnE029OBUNr24CQnqmPUsclUWhvsY6ydqNcRaYiPYTAYZw',
    },
    {
      id: 1,
      title: 'Bakery Speed Racks',
      alt: 'Behind the scenes bakery aesthetic shot of large cooling speed racks loaded with dozens of steaming freshly baked cookies with golden crackled tops in stainless steel professional atelier kitchen.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCGJhWAzgcS-mSkJJcupZVv5YAdxSnF0KUDKu_FyGzWfJBaVg8kq9b4gnPOjgbqHznAh5vf1BKWypMyF8uqAKToEuQbGUCwIphFdwknPImilqBIOfHLP6VvkWUQMkucNk6nI3AEswT7MilP2uldXrg5KmuYW3E44OL8lb9kvBAGxNWOnU-okbwYbf9opsACgfqGcbzvEE6n24klOr7mybbe9nKushv7V_fGhyqf6VUqYiVnTjWv1EvhMw',
    },
    {
      id: 2,
      title: 'Packaging Unboxing',
      alt: 'Editorial flatlay photo of elegant deep chocolate-brown luxury pastry box tied with raw textured linen ribbon being unboxed on a stone table, showing six gourmet cookies neatly nested inside parchment.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ4vhdVeuzLKM0rIFwVpfj1WTvcurNWS2N_yUZjA_vJo4_xJEZsEHHuO16DP73z3LHwwYg8bpHm7q6IpdMIhb_ZVnvTEASvEjQcWqX5itKyOgSsfDOJBsJBjuSl5wvUmpdkrlQk5YabhQHHhZlRoegkHipEkNUbGp-djygrsXsiNaYJDNAnVSOt-sIlb9XCF-Rp_J6knYuCXZMjsEu_xldKf5lnQ4AJ9TvsK4OcUM8i1SWGCGUIthsuw',
    },
    {
      id: 3,
      title: 'Macro Reel Highlight',
      alt: 'Cinematic macro still from a high frame rate video reel showing hot melted chocolate sauce drizzling over a fresh baked cast-iron cookie skillet with flecks of sea salt glistening under amber spotlights.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD2AY7IulhV5gRK0lC96I37jBXCcntidwTvlKGKZkuIpPlaWG8K27IusJR-VMjxcsC4I35hMGbDqV9M-wG_lOS0KbhhZfsMSREZOK4wBwZkbMZopkp7l9ekmi4ssU37JXwBB4RXMjKupnVug9E6fEDYvPbFRNdj0RmKh7s7YGkZ6ApoGjufKRb_emJ8sNElDXzq-S2Kai9n_Zk9vGPBqWQdzO9NNRQ9uL34pX19iM7pxCnXUNcK0c2zng',
      isVideo: true,
    },
    {
      id: 4,
      title: 'Storefront Rave',
      alt: 'Editorial lifestyle photography of a customer smiling while holding a warm Crumbly cookie wrapped in kraft paper outside the boutique storefront during golden hour dusk.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB5tvCgygMYiePtZtgyXTAoqbevmhxlTnSwzNqSFPC_zhynmmP07-GPyGURN98VhqMMztTfAid5clfaacUDNyGNwWcCwC0AVoMJJJhzqdPz2ITGcUhLcQKvR-NPGCqmfyScMeD1fElsF3yGxeU-cx0AgA2JXt2DC2PiviBCcLVbsarwLte2coe1ro1a7CKFxzz2O4waUvP-dsIu3WIyuAzaLQvUWx2wAsnF4OML795-Tv28jlCDfzJDqw',
    },
  ];

  return (
    <section className="w-full bg-[#fff8f1] py-16 md:py-24" id="social">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-[#e8d2b5]/60">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#8b501a] font-bold block mb-2">
              Social Chronicles
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2b1712] tracking-tight uppercase">
              CRUMBLY ON YOUR FEED
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-[#8b501a] font-bold hover:text-[#2b1712] transition-colors"
          >
            <span>FOLLOW @CRUMBLY</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* 5-Column Editorial Instagram Feed */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {feedItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.isVideo) {
                  onOpenVideo();
                }
              }}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm bg-[#e0d9ce] cursor-pointer border border-[#e8d2b5]"
            >
              <img
                alt={item.alt}
                src={item.image}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {item.isVideo && (
                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md rounded-full p-1.5 text-white">
                  <Film className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Hover overlay with likes */}
              <div className="absolute inset-0 bg-[#2b1712]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white p-3 text-center">
                {item.isVideo ? (
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-1">
                    <Play className="w-5 h-5 fill-white" />
                  </div>
                ) : (
                  <button
                    onClick={(e) => toggleLike(e, idx)}
                    className="flex items-center gap-1.5 text-xs font-sans font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full backdrop-blur-md transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        userLiked[idx] ? 'fill-red-500 text-red-500' : 'text-white'
                      }`}
                    />
                    <span className="tabular-nums font-mono">{likes[idx]}</span>
                  </button>
                )}
                <span className="font-sans text-[11px] font-medium tracking-wide">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
