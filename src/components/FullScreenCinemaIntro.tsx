import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, Volume2, VolumeX, Play, Pause, ChevronDown, Sparkles } from 'lucide-react';

interface FullScreenCinemaIntroProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoReady?: () => void;
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

const VIDEO_SRC = '/assets/video_website_landing/01.mp4';
const POSTER_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBRkd5ezEIiDkfi32SLRytC3LryvnM9yWk6z2Ia5D0gz8v1Yp6pamIDW31-o0NjRVtZD75orvW9mRebYhBWaoy8BtyZaiUy17POogQH-wAMRQ5nc5e-uf8zwlF7qZ6EiqGlI09cw00ZWRuwLDX7J6wViIk4OF6yor-KwQQeV_oaloVlYxhiywx3IaS8V3s1dlZbeQljM5tV58dh60QwFvuPaDYo4xgYFbOEiVSxPI19vzv2L1FcVuW3SQ';

export const FullScreenCinemaIntro: React.FC<FullScreenCinemaIntroProps> = ({
  isOpen,
  onClose,
  onVideoReady,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaderFadingOut, setIsLoaderFadingOut] = useState(false);
  const [isExitingToSite, setIsExitingToSite] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showFallbackButton, setShowFallbackButton] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasStartedPlaybackRef = useRef(false);

  // Lock body scroll while the cinema intro is showing.
  // This prevents the underlying SceneOneScrollSequence from advancing
  // its frame position while the intro video is playing.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Ensure video element has native inline and muted attributes for mobile WebKit / iOS Safari
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.muted = true;
    video.defaultMuted = true;
  }, []);

  // Check reduced motion preference
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(query.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);

  // Exit transition to the website (550ms smooth fade/scale)
  const handleEnterSite = useCallback(() => {
    if (isExitingToSite) return;
    setIsExitingToSite(true);
    window.scrollTo(0, 0);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setTimeout(() => {
      onClose();
    }, 550);
  }, [isExitingToSite, onClose]);

  // Video canplay event: black loading screen dissolves and video plays PROPER FULL SCREEN
  const handleCanPlay = useCallback(() => {
    if (hasStartedPlaybackRef.current) return;
    hasStartedPlaybackRef.current = true;

    onVideoReady?.();

    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }

    // Smoothly dissolve black loading screen over 400ms
    setIsLoaderFadingOut(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  }, [onVideoReady]);

  // Handle video error: fallback smoothly to site with poster
  const handleVideoError = useCallback(() => {
    console.warn('Hero video failed to load, falling back to website.');
    setIsLoaderFadingOut(true);
    setTimeout(() => {
      setIsLoading(false);
      handleEnterSite();
    }, 500);
  }, [handleEnterSite]);

  // 3.4s timeout fallback: show "Enter Crumbly" button if loading takes longer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading && !hasStartedPlaybackRef.current) {
        setShowFallbackButton(true);
      }
    }, 3400);

    return () => clearTimeout(timer);
  }, [isLoading]);

  // Check if video is already ready in cache
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 2 && !hasStartedPlaybackRef.current) {
      handleCanPlay();
    }
  }, [handleCanPlay]);

  // Allow entering site via keyboard (Escape or Enter)
  useEffect(() => {
    if (!isOpen || isLoading) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        handleEnterSite();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isLoading, handleEnterSite]);

  // Canvas particle system for the black loading screen
  useEffect(() => {
    if (!isLoading) return;

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
    const particleCount = prefersReducedMotion ? 0 : isMobile ? 20 : 40;

    const crumbColors = ['#4A2921', '#3D2018', '#8B501A', '#5C3124', '#26120C'];
    const caramelColors = ['#FEB071', '#FFDCC3', '#FFAE5D', '#FBD38D'];
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isCaramel = Math.random() > 0.45;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.4 + 0.15),
        size: isCaramel ? Math.random() * 2.2 + 1.2 : Math.random() * 3.2 + 1.5,
        alpha: Math.random() * 0.4,
        maxAlpha: isCaramel ? 0.6 : 0.45,
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
        p.x += p.vx + Math.sin(tick + (p.pulseOffset || 0)) * 0.2;
        p.y += p.vy;
        if (p.angle !== undefined && p.vAngle !== undefined) p.angle += p.vAngle;

        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        if (p.type === 'caramel') {
          const currentAlpha =
            p.maxAlpha * (0.65 + 0.35 * Math.sin(tick * 2 + (p.pulseOffset || 0)));
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
          gradient.addColorStop(0, `rgba(255, 230, 200, ${currentAlpha})`);
          gradient.addColorStop(0.35, `rgba(254, 176, 113, ${currentAlpha * 0.7})`);
          gradient.addColorStop(1, 'rgba(139, 80, 26, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.save();
          ctx.translate(p.x, p.y);
          if (p.angle !== undefined) ctx.rotate(p.angle);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.75, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    if (!prefersReducedMotion) render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isLoading, prefersReducedMotion]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const target = pos * duration;
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden bg-black transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExitingToSite
          ? 'opacity-0 scale-[1.03] pointer-events-none'
          : 'opacity-100 scale-100 pointer-events-auto'
      }`}
    >
      {/* 1. PROPER FULL SCREEN VIDEO LAYER */}
      <div
        onWheel={(e) => {
          if (e.deltaY > 25) handleEnterSite();
        }}
        className="relative w-full h-full select-none flex items-center justify-center overflow-hidden"
      >
        {/* Ambient warm chocolate blur backdrop for mobile portrait:
            Fills the screen with a soft luxury chocolate ambient glow,
            ensuring zero harsh black cutoffs on tall phone screens */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none landscape:hidden">
          <img
            alt=""
            aria-hidden="true"
            src={POSTER_SRC}
            className="w-full h-full object-cover blur-3xl opacity-35 scale-125 brightness-75 select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#180905]/85 via-black/40 to-[#180905]/90" />
        </div>

        {/* Base Poster to eliminate any black flicker */}
        <img
          alt="Crumbly Atelier Macro Film Still"
          src={POSTER_SRC}
          className="absolute inset-0 w-full h-full object-contain landscape:object-cover"
        />

        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          autoPlay
          muted={isMuted}
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          onLoadedData={handleCanPlay}
          onError={handleVideoError}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnterSite}
          className="relative z-10 w-full h-full object-contain landscape:object-cover"
        />

        {/* Center Play button if video is paused */}
        {!isLoading && !isPlaying && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label="Play video"
            className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 hover:bg-black/80 border border-white/30 text-[#FEB071] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl cursor-pointer"
          >
            <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-[#FEB071] translate-x-0.5" />
          </button>
        )}

        {/* Interactive Overlay Controls */}
        {!isLoading && (
          <>
            {/* Top Right: Clear "Skip Intro" Button */}
            <div
              className="absolute z-20"
              style={{
                top: 'max(1.25rem, env(safe-area-inset-top, 1.25rem))',
                right: 'max(1.25rem, env(safe-area-inset-right, 1.25rem))',
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnterSite();
                }}
                aria-label="Skip to Story"
                className="group px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-black/60 hover:bg-[#FEB071] hover:text-[#180905] text-white text-xs font-semibold uppercase tracking-widest border border-white/20 hover:border-[#FEB071] backdrop-blur-md transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <span>Skip Intro</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Bottom Center: Radiant "ENTER CRUMBLY STORY" Action Button */}
            <div
              className="absolute z-20 flex flex-col items-center gap-2 pointer-events-auto select-none"
              style={{
                bottom: 'max(2.5rem, env(safe-area-inset-bottom, 2.5rem))',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnterSite();
                }}
                className="group px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-gradient-to-r from-[#FEB071] via-[#FFDCC3] to-[#FEB071] hover:from-[#FFAE5D] hover:to-[#FEB071] text-[#221008] font-bold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-[0_8px_32px_rgba(254,176,113,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
              >
                <span>Enter Crumbly Story</span>
                <ArrowRight className="w-4 h-4 text-[#221008] group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <span className="text-[10px] sm:text-[11px] text-[#FFF7EC]/70 tracking-[0.22em] uppercase font-sans drop-shadow-md">
                or scroll down to begin
              </span>
            </div>

            {/* Bottom Left: Audio Icon Toggle */}
            <div
              className="absolute z-20"
              style={{
                bottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))',
                left: 'max(1.25rem, env(safe-area-inset-left, 1.25rem))',
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                className="w-11 h-11 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-[#FEB071]" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

            {/* Bottom Edge: Slender Caramel Progress Line */}
            <div
              className="absolute inset-x-0 z-20 h-[3px] bg-black/30"
              style={{
                bottom: 'env(safe-area-inset-bottom, 0px)',
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-[#FEB071] via-[#FFDCC3] to-[#FEB071] transition-all duration-75 shadow-[0_0_8px_rgba(254,176,113,0.8)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </>
        )}
      </div>

      {/* 2. BLACK SCREEN LOADING OVERLAY (Active only until video is loaded) */}
      {isLoading && (
        <aside
          aria-label="Loading Crumbly Haute Pâtisserie"
          aria-live="polite"
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-700 ease-out ${
            isLoaderFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            backgroundColor: '#000000',
            backgroundImage:
              'radial-gradient(circle at 50% 45%, #2B1712 0%, #150906 50%, #000000 100%)',
          }}
        >
          {/* Particle canvas */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none w-full h-full"
          />

          {/* Centered CRUMBLY Wordmark on black loading screen */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 text-center max-w-xl mx-auto">
            <div className="flex items-center gap-2 mb-3 sm:mb-4 opacity-85">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FEB071] animate-pulse" />
              <span className="font-sans text-[9px] sm:text-[11px] uppercase tracking-[0.24em] sm:tracking-[0.32em] text-[#FEB071] font-semibold">
                Continuous Oven Cycles · 180°C
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl tracking-[0.16em] sm:tracking-[0.24em] uppercase text-[#FFF7EC] font-bold drop-shadow-[0_8px_32px_rgba(254,176,113,0.18)] translate-x-[0.08em] sm:translate-x-[0.12em]">
              CRUMBLY
            </h1>

            <p className="font-serif italic text-xs sm:text-base text-[#EFE7DC]/75 tracking-wider mt-2.5 sm:mt-3 font-light">
              Haute Pâtisserie &amp; Molten Confections
            </p>

            {/* Timeout Fallback: Enter Crumbly Button (if >3.4s) */}
            <div
              className={`transition-all duration-500 ease-out mt-7 flex flex-col items-center ${
                showFallbackButton
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-3 pointer-events-none'
              }`}
            >
              <button
                type="button"
                onClick={handleEnterSite}
                className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#FEB071]/50 bg-[#FFF7EC]/10 hover:bg-[#FFF7EC]/20 text-[#FFF7EC] font-sans text-xs uppercase tracking-[0.2em] font-semibold backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_0_24px_rgba(254,176,113,0.35)] transition-all duration-300 hover:scale-[1.03] cursor-pointer"
              >
                <span>Enter Crumbly</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FEB071] group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Thin Animated Caramel Progress Indicator */}
          <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 w-48 sm:w-64 max-w-[80vw] z-10 pointer-events-none">
            <div className="w-full h-[2px] bg-[#4A2921]/70 rounded-full overflow-hidden relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
              <div
                className={`absolute inset-y-0 w-2/5 rounded-full bg-gradient-to-r from-transparent via-[#FEB071] via-[#FFDCC3] to-transparent shadow-[0_0_10px_rgba(254,176,113,0.8)] ${
                  prefersReducedMotion ? 'opacity-70 left-1/4' : 'animate-caramel-stream'
                }`}
              />
            </div>
            <span className="font-sans text-[9px] uppercase tracking-[0.26em] text-[#EFE7DC]/55">
              Preparing Fresh Batch
            </span>
          </div>
        </aside>
      )}
    </div>
  );
};
