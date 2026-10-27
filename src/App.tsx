import React, { useState } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, CategoryType } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignaturesGrid } from './components/SignaturesGrid';
import { MoltenSpotlight } from './components/MoltenSpotlight';
import { CategoryShowcase } from './components/CategoryShowcase';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { BrandStory } from './components/BrandStory';
import { AtelierMenu } from './components/AtelierMenu';
import { BespokeBoxBuilder } from './components/BespokeBoxBuilder';
import { OrderSection } from './components/OrderSection';
import { LocationSection } from './components/LocationSection';
import { InstagramFeed } from './components/InstagramFeed';
import { ClimaxCTA } from './components/ClimaxCTA';
import { Footer } from './components/Footer';
import { ProductDetailDrawer } from './components/ProductDetailDrawer';
import { CartDrawer } from './components/CartDrawer';
import { VideoModal } from './components/VideoModal';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customBoxes, setCustomBoxes] = useState<
    Array<{
      id: string;
      title: string;
      itemsCount: number;
      ribbon: string;
      giftNote: string;
      pricePkr: number;
    }>
  >([]);

  const [activeSection, setActiveSection] = useState<string>('home');
  const [activeMenuCategory, setActiveMenuCategory] = useState<CategoryType | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    warmth: 'freshly-warmed' | 'ambient' = 'freshly-warmed'
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedWarmth === warmth
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedWarmth: warmth }];
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantity: newQty };
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddBoxToCart = (boxData: {
    title: string;
    items: Product[];
    ribbon: string;
    giftNote: string;
    pricePkr: number;
  }) => {
    const newBox = {
      id: `box-${Date.now()}`,
      title: boxData.title,
      itemsCount: boxData.items.length,
      ribbon: boxData.ribbon,
      giftNote: boxData.giftNote,
      pricePkr: boxData.pricePkr,
    };
    setCustomBoxes((prev) => [...prev, newBox]);
    setIsCartOpen(true);
  };

  const handleRemoveBox = (id: string) => {
    setCustomBoxes((prev) => prev.filter((b) => b.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
    setCustomBoxes([]);
  };

  // Navigation handlers
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromShowcase = (category: CategoryType) => {
    setActiveMenuCategory(category);
    handleNavigate('menu');
  };

  // Find Nutella Lava for spotlight
  const nutellaLavaProduct = PRODUCTS.find((p) => p.id === 'nutella-lava') || PRODUCTS[0];

  return (
    <div className="min-h-screen bg-[#fff8f1] text-[#1e1b15] font-sans selection:bg-[#ffdcc3] selection:text-[#2f1500]">
      {/* Fixed Luxury Navigation */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Sections Stack matching the attached lookbook */}
      <main className="pt-28 md:pt-32">
        {/* SECTION 1: HERO */}
        <div id="home">
          <Hero
            onOrderNow={() => handleNavigate('menu')}
            onExploreSignatures={() => handleNavigate('signatures')}
            onOpenVideo={() => setIsVideoOpen(true)}
            onOpenBoxBuilder={() => handleNavigate('box-builder')}
          />
        </div>

        {/* SECTION 2: THE CRUMBLY SIGNATURES */}
        <SignaturesGrid
          products={PRODUCTS}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
        />

        {/* SECTION 3: HERO PRODUCT SPOTLIGHT — NUTELLA LAVA */}
        <MoltenSpotlight
          lavaProduct={nutellaLavaProduct}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
        />

        {/* SECTION 4: FIND YOUR CRAVING (CATEGORY COLLECTION) */}
        <CategoryShowcase onSelectCategory={handleSelectCategoryFromShowcase} />

        {/* SECTION 5: BRAND PHILOSOPHY & CULINARY CREED */}
        <BrandPhilosophy />

        {/* SECTION 6: MODERN BRAND STORY */}
        <BrandStory />

        {/* SECTION 7: BESPOKE ATELIER BOX BUILDER */}
        <BespokeBoxBuilder
          products={PRODUCTS}
          onAddBoxToCart={handleAddBoxToCart}
        />

        {/* SECTION 8: ATELIER INTERACTIVE MENU */}
        <AtelierMenu
          products={PRODUCTS}
          activeCategory={activeMenuCategory}
          onCategoryChange={setActiveMenuCategory}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
        />

        {/* SECTION 9: ORDER SECTION & DELIVERY PLATFORMS */}
        <OrderSection
          onOpenCart={() => setIsCartOpen(true)}
          onNavigateToLocation={() => handleNavigate('location')}
        />

        {/* SECTION 10: BOUTIQUE FLAGSHIP LOCATION */}
        <LocationSection />

        {/* SECTION 11: CRUMBLY ON YOUR FEED */}
        <InstagramFeed onOpenVideo={() => setIsVideoOpen(true)} />

        {/* SECTION 12: FINAL HERO CLIMAX CTA */}
        <ClimaxCTA
          onOrderNow={() => handleNavigate('menu')}
          onOpenVideo={() => setIsVideoOpen(true)}
        />
      </main>

      {/* FOOTER */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Tasting Notes Slide-over Drawer */}
      <ProductDetailDrawer
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag & Dispatch Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        customBoxes={customBoxes}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onRemoveBox={handleRemoveBox}
        onClearCart={handleClearCart}
      />

      {/* 4K Cinematic Dessert Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </div>
  );
}
