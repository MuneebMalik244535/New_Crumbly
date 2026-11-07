import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  isHeroVideoReady: boolean;
  isVideoError: boolean;
  onTransitionStart?: () => void;
  onLoadingComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  type: 'crumb' | 'caramel';
  angle?: number;
  vAngle?: number;
  pulseSpeed?: number;
  pulseOffset?: number;
  color: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isHeroVideoReady,
  isVideoError,
  onTransitionStart,
  onLoadingComplete,
}) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isExited, setIsExited] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasTriggeredExitRef = useRef(false);

  // Check reduced-motion preference
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);
    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Dismiss / Transition sequence: 500-700ms smooth fadeout
  const handleTransitionOut = useCallback(() => {
    if (hasTriggeredExitRef.current) return;
    hasTriggeredExitRef.current = true;

    setIsFadingOut(true);
    onTransitionStart?.();

    // 650ms fadeout duration (matches 500-700ms requirement)
    setTimeout(() => {
      setIsExited(true);
      onLoadingComplete();
    }, 650);
  }, [onTransitionStart, onLoadingComplete]);

  // Video canplay event handler: dismiss as soon as hero video can play
  useEffect(() => {
    if (isHeroVideoReady && !hasTriggeredExitRef.current) {
      handleTransitionOut();
    }
  }, [isHeroVideoReady, handleTransitionOut]);

  // If video fails to load, gracefully continue with poster image immediately
  useEffect(() => {
    if (isVideoError && !hasTriggeredExitRef.current) {
      console.info('Crumbly Hero video fallback: displaying poster image without blocking.');
      handleTransitionOut();
    }
  }, [isVideoError, handleTransitionOut]);

  // If loading takes longer than 3.5 seconds (3-4s requirement), show "Enter Crumbly" button
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!hasTriggeredExitRef.current) {
        setShowEnterButton(true);
      }
    }, 3400);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Canvas particle system: subtle floating cookie crumbs & gentle caramel light particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isMobile = width < 768;
    const particleCount = prefersReducedMotion ? 0 : isMobile ? 22 : 45;

    // Cookie crumb & caramel colors
    const crumbColors = ['#4A2921', '#3D2018', '#8B501A', '#5C3124', '#26120C'];
    const caramelColors = ['#FEB071', '#FFDCC3', '#FFAE5D', '#FBD38D'];

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isCaramel = Math.random() > 0.45;
      const size = isCaramel ? Math.random() * 2.2 + 1.2 : Math.random() * 3.4 + 1.5;
      const maxAlpha = isCaramel ? Math.random() * 0.45 + 0.25 : Math.random() * 0.5 + 0.2;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.45 + 0.15), // Gentle upward drift like warm oven currents
        size,
        alpha: Math.random() * maxAlpha,
        maxAlpha,
        type: isCaramel ? 'caramel' : 'crumb',
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.02,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
        color: isCaramel
          ? caramelColors[Math.floor(Math.random() * caramelColors.length)]
          : crumbColors[Math.floor(Math.random() * crumbColors.length)],
      });
    }

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 0.015;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particles
        p.x += p.vx + Math.sin(tick + (p.pulseOffset || 0)) * 0.2;
        p.y += p.vy;
        if (p.angle !== undefined && p.vAngle !== undefined) {
          p.angle += p.vAngle;
        }

        // Wrap around boundaries smoothly
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        if (p.type === 'caramel') {
          // Gentle pulsing caramel amber light particle with soft radial glow
          const currentAlpha =
            p.maxAlpha * (0.65 + 0.35 * Math.sin(tick * 2 + (p.pulseOffset || 0)));

          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 3.5
          );
          gradient.addColorStop(0, `rgba(255, 230, 200, ${currentAlpha})`);
          gradient.addColorStop(0.35, `rgba(254, 176, 113, ${currentAlpha * 0.7})`);
          gradient.addColorStop(1, 'rgba(139, 80, 26, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Subtle organic tumbling cookie crumb
          ctx.save();
          ctx.translate(p.x, p.y);
          if (p.angle !== undefined) ctx.rotate(p.angle);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;

          // Slightly irregular crumb shape
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.75, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    if (!prefersReducedMotion) {
      render();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [prefersReducedMotion]);

  if (isExited) return null;

  return (
    <aside
      aria-label="Loading Crumbly Haute Pâtisserie"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFadingOut
          ? 'opacity-0 scale-[1.01] pointer-events-none'
          : 'opacity-100 scale-100 pointer-events-auto'
      }`}
      style={{
        backgroundColor: '#2B1712',
        backgroundImage:
          'radial-gradient(circle at 50% 45%, #3a2019 0%, #2B1712 65%, #1d0f0b 100%)',
      }}
    >
      {/* Floating Canvas: crumbs & caramel embers */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none w-full h-full"
      />

      {/* Subtle Warm Luxury Ambient Vignette Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(15,7,5,0.6)_100%)]"
      />

      {/* Main Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-xl mx-auto">
        {/* Curated Pre-header Tag */}
        <div className="flex items-center gap-2 mb-4 opacity-85">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FEB071] animate-pulse" />
          <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[#FEB071] font-semibold">
            Continuous Oven Cycles · 180°C
          </span>
        </div>

        {/* Centered CRUMBLY Wordmark in Warm Cream Typography (#FFF7EC) */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-[0.24em] uppercase text-[#FFF7EC] font-bold drop-shadow-[0_8px_32px_rgba(254,176,113,0.18)] translate-x-[0.12em]">
          CRUMBLY
        </h1>

        {/* Sensory Tagline */}
        <p className="font-serif italic text-sm sm:text-base text-[#EFE7DC]/75 tracking-wider mt-3 font-light">
          Haute Pâtisserie &amp; Molten Confections
        </p>

        {/* Enter Crumbly Button (Shown if loading exceeds 3-4s or on slow networks) */}
        <div
          className={`transition-all duration-500 ease-out mt-7 flex flex-col items-center ${
            showEnterButton
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={handleTransitionOut}
            className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#FEB071]/50 bg-[#FFF7EC]/10 hover:bg-[#FFF7EC]/20 text-[#FFF7EC] font-sans text-xs uppercase tracking-[0.2em] font-semibold backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_0_24px_rgba(254,176,113,0.35)] transition-all duration-300 hover:scale-[1.03] cursor-pointer"
          >
            <span>Enter Crumbly</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FEB071] group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#EFE7DC]/50 mt-2">
            Proceed with Atelier Still
          </span>
        </div>
      </div>

      {/* Bottom Caramel Animated Progress Bar */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 w-48 sm:w-64 max-w-[80vw] z-10 pointer-events-none">
        {/* Slender caramel track */}
        <div className="w-full h-[2px] bg-[#4A2921]/70 rounded-full overflow-hidden relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
          {/* Animated liquid caramel streaming shimmer */}
          <div
            className={`absolute inset-y-0 w-2/5 rounded-full bg-gradient-to-r from-transparent via-[#FEB071] via-[#FFDCC3] to-transparent shadow-[0_0_10px_rgba(254,176,113,0.8)] ${
              prefersReducedMotion ? 'opacity-70 left-1/4' : 'animate-caramel-stream'
            }`}
          />
        </div>

        {/* Subtle, non-deceptive status label */}
        <span className="font-sans text-[9px] uppercase tracking-[0.26em] text-[#EFE7DC]/55">
          Preparing Fresh Batch
        </span>
      </div>
    </aside>
  );
};
