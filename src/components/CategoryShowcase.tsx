import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CategoryType } from '../types';

interface CategoryShowcaseProps {
  onSelectCategory: (category: CategoryType) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  const categories: {
    id: CategoryType;
    index: string;
    title: string;
    desc: string;
    count: string;
    image: string;
  }[] = [
    {
      id: 'cookies',
      index: 'Category 01',
      title: 'COOKIES',
      desc: 'Thick, chewy, crisp edges with molten centers that melt with every single bite.',
      count: '6 Variations',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApkVSkDk6a49mVGmjoSKy3kdx10ctedIGBmDs2lMyQzirI8Bx_fNWzbiL8ejKkmpKJlZoVQxBm500E1mCTHSKJm_BjSzyxLqbn28T_4zwqq2uIdqMY-0D9oHvGm1wPUl8ADVMtmLv32o5qclXigMOmpLyPRSD1NYmSpKTdZkc4y3fpnBc0uXPiNB_Wf99YpWpl2G5S25IqBmLRblixTjGrh-mER0EJgxt3pBmsSwm6fWbxsa4Zt7KHwA',
    },
    {
      id: 'dough',
      index: 'Category 02',
      title: 'COOKIE DOUGH',
      desc: 'Served warm in signature cast iron pans with generous molten cores.',
      count: '4 Variations',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBMrX4j2eNl51cth9OltmFQLgV_ASZn7LVy75v7gTmbDCRL0Di6w4qy_oBcbeUB56blKfXMRQJD7GinW8UtAX6pCFOkO6zsayt7dGpXFyi0ojqNJHX0KcPvBYEx-rCjnCNKDbvVDzHRLU03B_WKCCfbaZRBtYdbKC5b02kkLpgZA9KHAFTD8ir9Hx7qPdaqg6GaTwRJWh_d9OUoPKfp8UUi9ZrFqTHB6GIax70clsZJ6CiMOIr_XP85g',
    },
    {
      id: 'brownies',
      index: 'Category 03',
      title: 'BROWNIES',
      desc: 'Rich, dense, double-baked dark cocoa squares crowned with Maldon sea salt.',
      count: '3 Variations',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArcLPm8rTjfzYtgetbLl3q-KMwPbOYRPGgQ0ER-Fwl0VTzdpksEDTx7w-MnoccXUU_yujTgL-rwhHHLzcKPzh-z1oZaYW3PsRl0botd_8h_sKZNlsGdhYo9R5_pLrhuwFCnrYkX5qx0XrzLYZqPsgxxIxkA--ujm9PYfgtba0VUFQTjjevZqmNPrVGUHcr9Y8Abl8ddLV8UD0a6vz53JAiS3rDKN2IQWzRvxw4rkswoUy45-2c-lke3Q',
    },
    {
      id: 'combos',
      index: 'Category 04',
      title: 'ICE CREAM COMBOS',
      desc: 'Artisanal vanilla bean paired with fresh warm bakes for the ultimate hot-cold contrast.',
      count: 'Custom Duets',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqhdq4jlopOWHx4L19TwKCEIgR6tgk3zWeuUbYiKW7JRmHwOI5X0WM8ATUwa_1Ldgw2V8GbcrAD3uzW9vCrY1owcKbwwsoZY6-Ku-gDmocpkwYWpknF_ETSwx_fMGR19f6WjrGSEVHUWQiv3Vy4fYBOUFvulerfJKxmy1b19sk9IMLJBuYIV-X5EgSMXsOfq4iW-fDYT34A3TMPQR2EZaUDkx5VcXpD4mc_U6VUlK42G7cuGsX238Z6Q',
    },
  ];

  return (
    <section className="w-full bg-[#fff8f1] py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-[#e8d2b5]/60">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#8b501a] font-bold block mb-2">
              Catering To Every Texture
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2b1712] tracking-tight uppercase">
              FIND YOUR CRAVING
            </h2>
          </div>
          <p className="font-sans text-base text-[#504442] max-w-sm">
            Four distinct avenues of indulgence, calibrated for chew, molten warmth, and cool contrast.
          </p>
        </div>

        {/* High-Fashion Split Grid (4 Categories) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative flex flex-col bg-[#f5ede2] rounded-xl overflow-hidden border border-[#e8d2b5] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
            >
              <div className="aspect-[3/4] w-full relative overflow-hidden bg-[#e0d9ce]">
                <img
                  alt={cat.title}
                  src={cat.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2b1712]/85 via-[#2b1712]/20 to-transparent" />
                <div className="absolute bottom-5 inset-x-5 text-white flex flex-col gap-1">
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#ffdcc3] font-semibold">
                    {cat.index}
                  </span>
                  <h3 className="font-serif text-2xl tracking-tight font-bold">
                    {cat.title}
                  </h3>
                  <p className="font-sans text-xs text-[#efe7dc] line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>
              <div className="p-3.5 bg-[#f5ede2] flex items-center justify-between border-t border-[#e8d2b5]/60">
                <span className="font-sans text-[11px] uppercase tracking-wider text-[#504442] font-semibold">
                  {cat.count}
                </span>
                <span className="font-sans text-xs uppercase tracking-wider text-[#8b501a] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  EXPLORE <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
