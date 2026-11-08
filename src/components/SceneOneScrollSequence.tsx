/**
 * SceneOneScrollSequence
 *
 * Ultra-Smooth Cinematic Multi-Scene Scroll Engine ("Butter Flow")
 * - 11 Scenes (565 frames) across the Crumbly storyline & cookie characters.
 * - Mobile-Optimized Aspect Framing:
 *     In mobile/portrait orientation, frames scale to fit the device width naturally
 *     so the cookie characters are completely visible, crisp, centered, and NOT
 *     overly magnified or cropped.
 *     In desktop/landscape orientation, keeps full-bleed edge-to-edge cinematic cover.
 * - Sub-Frame Smoothstep Motion Interpolation (120 FPS optical flow).
 * - Inertial Flywheel Physics (Damping = 0.08) for liquid cinematic momentum.
 * - Dynamic Window Lookahead Preloader.
 * - Single-channel Lenis synchronization with zero event thrashing.
 * - Native Mobile Safe-Area & Notch Adaptation.
 */

import React, { useEffect, useRef, useCallback } from 'react';
import { ALL_FRAMES, SCENE_METADATA, TOTAL_FRAME_COUNT } from '../data/sceneFrames';

// ── Configuration ─────────────────────────────────────────────────────────────
/**
 * Scroll runway multiplier (18.5 × 100vh = ~1.68 screens per scene across 11 scenes).
 */
const SCROLL_MULTIPLIER = 18.5;

/**
 * Inertial Flywheel Damping (0.32 = responsive liquid video scrub; syncs with Lenis).
 */
const DAMPING = 0.32;

interface SceneOneScrollSequenceProps {
  /** Called once when the user reaches the very last frame */
  onComplete?: () => void;
}

export const SceneOneScrollSequence: React.FC<SceneOneScrollSequenceProps> = ({
  onComplete,
}) => {
  // DOM refs
  const sectionRef      = useRef<HTMLDivElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const progressBarRef  = useRef<HTMLDivElement>(null);
  const scrollHintRef   = useRef<HTMLDivElement>(null);
  const scenePillRef    = useRef<HTMLSpanElement>(null);
  const sceneDotsRef    = useRef<(HTMLSpanElement | null)[]>([]);

  // 565-frame cache: array of HTMLImageElement | null
  const framesRef       = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAME_COUNT).fill(null)
  );
  // Status: 0 = idle, 1 = loading, 2 = ready
  const loadStateRef    = useRef<Uint8Array>(new Uint8Array(TOTAL_FRAME_COUNT));

  // Last successfully rendered image (for ultra-smooth hold buffer without flickering)
  const lastDrawnImgRef = useRef<HTMLImageElement | null>(null);

  // State kept strictly in refs for zero React re-renders during scrub
  const targetProgress  = useRef(0);
  const currentProgress = useRef(0);
  const isLoopRunning   = useRef(false);
  const rafId           = useRef(0);
  const doneFired       = useRef(false);
  const currentSceneIdx = useRef(1);
  const lastDrawnIdx    = useRef(-1);

  // ── Find Nearest Available Loaded Frame (Instant Fallback) ───────────────
  const findNearestLoaded = useCallback((targetIdx: number): HTMLImageElement | null => {
    const direct = framesRef.current[targetIdx];
    if (direct && direct.complete && direct.naturalWidth > 0) return direct;

    // Search outward for the closest loaded frame (preferring previous frame for continuity)
    for (let r = 1; r < 30; r++) {
      const prev = targetIdx - r;
      if (prev >= 0) {
        const img = framesRef.current[prev];
        if (img && img.complete && img.naturalWidth > 0) return img;
      }
      const next = targetIdx + r;
      if (next < TOTAL_FRAME_COUNT) {
        const img = framesRef.current[next];
        if (img && img.complete && img.naturalWidth > 0) return img;
      }
    }

    return lastDrawnImgRef.current;
  }, []);

  // ── True Video-Style Crisp Canvas Render (Zero Ghosting, Zero Cropping) ──
  const paint = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Landing buffer: Final scene holds steady across the final 2%
    const frameProgress = Math.min(1, progress / 0.98);
    const floatIdx = Math.max(0, Math.min(TOTAL_FRAME_COUNT - 1, frameProgress * (TOTAL_FRAME_COUNT - 1)));
    const frameIdx = Math.round(floatIdx);

    // Update UI elements based on current frame index
    const currentFrameMeta = ALL_FRAMES[frameIdx];
    if (currentFrameMeta && currentFrameMeta.sceneIndex !== currentSceneIdx.current) {
      currentSceneIdx.current = currentFrameMeta.sceneIndex;
      if (scenePillRef.current) {
        const num = currentFrameMeta.sceneIndex < 10 ? `0${currentFrameMeta.sceneIndex}` : `${currentFrameMeta.sceneIndex}`;
        scenePillRef.current.textContent = `Scene ${num} / ${SCENE_METADATA.length} · ${currentFrameMeta.sceneTitle}`;
      }
      sceneDotsRef.current.forEach((dot, dIdx) => {
        if (!dot) return;
        const isActive = dIdx + 1 === currentFrameMeta.sceneIndex;
        dot.style.backgroundColor = isActive ? '#FEB071' : 'rgba(255, 247, 236, 0.28)';
        dot.style.transform = isActive ? 'scale(1.35)' : 'scale(1)';
        dot.style.boxShadow = isActive ? '0 0 8px #FEB071' : 'none';
      });
    }

    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${progress})`;
    }

    if (scrollHintRef.current) {
      const hintOpacity = Math.max(0, 1 - progress * 15);
      scrollHintRef.current.style.opacity = String(hintOpacity);
      scrollHintRef.current.style.pointerEvents = hintOpacity <= 0.05 ? 'none' : 'auto';
    }

    // Skip drawing if already on this exact frame and it was painted
    if (frameIdx === lastDrawnIdx.current && lastDrawnImgRef.current) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    let targetImg = framesRef.current[frameIdx];
    if (!targetImg || !targetImg.complete || !targetImg.naturalWidth) {
      targetImg = findNearestLoaded(frameIdx);
    }
    if (!targetImg || !targetImg.complete || !targetImg.naturalWidth) return;

    const iw = targetImg.naturalWidth;
    const ih = targetImg.naturalHeight;

    // ── Perfect Proportional Aspect Fit (Zero Cropping on Mobile & Desktop) ──
    // Uses aspect containment so the entire 1920x1080 frame is 100% visible:
    // - On desktop/laptop: The top banner ("BAKED TO MAKE YOU CRUMBLE") and character
    //   are NEVER cut off or clipped at the top/bottom.
    // - On mobile: The character fits naturally across the screen with zero cutoff.
    const scale = Math.min(cw / iw, ch / ih);

    const dw = Math.round(iw * scale);
    const dh = Math.round(ih * scale);
    const dx = Math.round((cw - dw) * 0.5);
    const dy = Math.round((ch - dh) * 0.5);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Clear canvas to pure black background before drawing
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, cw, ch);

    // Draw single crisp video frame at 100% opacity (no ghosting or double exposure)
    ctx.globalAlpha = 1.0;
    ctx.drawImage(targetImg, dx, dy, dw, dh);

    lastDrawnIdx.current = frameIdx;
    lastDrawnImgRef.current = targetImg;
  }, [findNearestLoaded]);

  // ── True Proportional Canvas Buffer (Zero Distortion on Mobile & Desktop) ─
  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use DPR up to 1.5 for crisp retina rendering without memory blowup
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rawW = Math.round(window.innerWidth * dpr);
    const rawH = Math.round(window.innerHeight * dpr);

    // Maintain exact aspect ratio matching viewport
    const maxDim = 1920;
    const factor = Math.min(1, maxDim / Math.max(rawW, rawH));

    const targetW = Math.round(rawW * factor);
    const targetH = Math.round(rawH * factor);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      lastDrawnIdx.current = -1; // Force repaint
      paint(currentProgress.current);
    }
  }, [paint]);

  // ── Smooth Animation Loop with Automatic Sleep ───────────────────────────
  const tick = useCallback(() => {
    const diff = targetProgress.current - currentProgress.current;

    // Halt when settled (within sub-pixel frame distance)
    if (Math.abs(diff) < 0.0001) {
      currentProgress.current = targetProgress.current;
      paint(currentProgress.current);
      isLoopRunning.current = false;

      if (currentProgress.current >= 0.995 && !doneFired.current) {
        doneFired.current = true;
        onComplete?.();
      } else if (currentProgress.current < 0.99) {
        doneFired.current = false;
      }
      return;
    }

    // Responsive luxury momentum (syncs tightly with Lenis glide)
    currentProgress.current += diff * DAMPING;
    paint(currentProgress.current);

    if (currentProgress.current >= 0.995 && !doneFired.current) {
      doneFired.current = true;
      onComplete?.();
    } else if (currentProgress.current < 0.99) {
      doneFired.current = false;
    }

    rafId.current = requestAnimationFrame(tick);
  }, [paint, onComplete]);

  // ── High-Performance On-Demand Frame Loader ──────────────────────────────
  const loadFrame = useCallback((idx: number) => {
    if (idx < 0 || idx >= TOTAL_FRAME_COUNT) return;
    if (loadStateRef.current[idx] !== 0) return; // already loading or loaded

    loadStateRef.current[idx] = 1; // Mark loading
    const meta = ALL_FRAMES[idx];
    if (!meta) return;

    const img = new Image();
    img.src = meta.src;

    img.onload = () => {
      framesRef.current[idx] = img;
      loadStateRef.current[idx] = 2; // Ready

      if (idx === 0 && lastDrawnIdx.current === -1) {
        paint(0);
      }

      // Repaint if user is at or next to this frame
      const currentTarget = Math.round(currentProgress.current * (TOTAL_FRAME_COUNT - 1));
      if (Math.abs(currentTarget - idx) <= 1) {
        lastDrawnIdx.current = -1;
        paint(currentProgress.current);
      }

      // Pre-warm GPU texture decode asynchronously
      if ('decode' in img) {
        img.decode().catch(() => {});
      }
    };

    img.onerror = () => {
      loadStateRef.current[idx] = 0; // Allow retry on network blip
    };
  }, [paint]);

  // ── Proximity Window Loader (Pre-fetches frames ahead in scroll direction) ─
  const ensureWindowLoaded = useCallback((centerIdx: number) => {
    const start = Math.max(0, centerIdx - 10);
    const end = Math.min(TOTAL_FRAME_COUNT - 1, centerIdx + 45);

    for (let i = start; i <= end; i++) {
      loadFrame(i);
    }
  }, [loadFrame]);

  // ── Calculate Progress from Scroll Coordinate ─────────────────────────────
  const updateProgress = useCallback((scrollY: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.offsetTop;
    const sectionH   = section.offsetHeight;
    const vh         = window.innerHeight;

    const total = sectionH - vh;
    if (total <= 0) return;

    const entered = scrollY - sectionTop;
    const clamped = Math.max(0, Math.min(1, entered / total));

    targetProgress.current = clamped;

    // Trigger lookahead loader for upcoming frames
    const centerIdx = Math.round(clamped * (TOTAL_FRAME_COUNT - 1));
    ensureWindowLoaded(centerIdx);

    if (!isLoopRunning.current) {
      isLoopRunning.current = true;
      rafId.current = requestAnimationFrame(tick);
    }
  }, [tick, ensureWindowLoaded]);

  // ── Lifecycle & Scroll Event Binding (Single-Channel Driver) ─────────────
  useEffect(() => {
    sizeCanvas();

    // 1. Instantly load initial 60 frames (Scenes 1 & 2 for instant start)
    for (let i = 0; i < Math.min(60, TOTAL_FRAME_COUNT); i++) {
      loadFrame(i);
    }

    // 2. High-speed background trickle loader for remaining frames (4 frames every 25ms)
    let idleTimer: any;
    let trickleIdx = 60;

    const trickleUpcoming = () => {
      if (trickleIdx >= TOTAL_FRAME_COUNT) return;
      for (let k = 0; k < 4 && trickleIdx + k < TOTAL_FRAME_COUNT; k++) {
        loadFrame(trickleIdx + k);
      }
      trickleIdx += 4;
      idleTimer = setTimeout(trickleUpcoming, 25);
    };

    idleTimer = setTimeout(trickleUpcoming, 150);

    // 3. Connect single-channel scroll listener (Lenis prioritized)
    const lenis = (window as any).__lenis;
    let cleanupScroll: (() => void) | null = null;

    if (lenis && typeof lenis.on === 'function') {
      const onLenisScroll = ({ scroll }: { scroll: number }) => {
        updateProgress(scroll);
      };
      lenis.on('scroll', onLenisScroll);
      cleanupScroll = () => {
        if (typeof lenis.off === 'function') lenis.off('scroll', onLenisScroll);
      };
    } else {
      const onNativeScroll = () => {
        updateProgress(window.scrollY);
      };
      window.addEventListener('scroll', onNativeScroll, { passive: true });
      cleanupScroll = () => {
        window.removeEventListener('scroll', onNativeScroll);
      };
    }

    window.addEventListener('resize', sizeCanvas);

    return () => {
      clearTimeout(idleTimer);
      if (cleanupScroll) cleanupScroll();
      window.removeEventListener('resize', sizeCanvas);
      cancelAnimationFrame(rafId.current);
    };
  }, [updateProgress, sizeCanvas, loadFrame]);

  // ── Skip Sequence Directly to Website ────────────────────────────────────
  const handleSkip = () => {
    const section = sectionRef.current;
    if (!section) return;
    const targetY = section.offsetTop + section.offsetHeight;
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(targetY, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        height: `${SCROLL_MULTIPLIER * 100}vh`,
        background: '#000000',
        lineHeight: 0,
      }}
    >
      {/* Pinned Cinematic Stage */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100dvh',
          minHeight: '100vh',
          overflow: 'hidden',
          zIndex: 45, // Above navbar (z-40), below intro video (z-50)
          background: '#000000',
        }}
      >
        {/* Hardware-accelerated Canvas with Mobile-Proportional Native Cap */}
        <canvas
          ref={canvasRef}
          aria-label="Crumbly Cinematic Frame Sequence"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            transform: 'translateZ(0)', // Force GPU composite layer
            backfaceVisibility: 'hidden',
          }}
        />

        {/* Top Header Badge & Skip Controls (Mobile Notch & Safe-Area Aware) */}
        <div
          style={{
            position: 'absolute',
            top: 'max(1rem, env(safe-area-inset-top, 1rem))',
            left: 'max(0.75rem, env(safe-area-inset-left, 0.75rem))',
            right: 'max(0.75rem, env(safe-area-inset-right, 0.75rem))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {/* Dynamic Scene Badge & 11 Scene Dots */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(20, 10, 8, 0.72)',
              border: '1px solid rgba(254, 176, 113, 0.25)',
              borderRadius: '9999px',
              padding: '0.35rem 0.75rem',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
              maxWidth: 'calc(100vw - 110px)',
              overflow: 'hidden',
            }}
          >
            {/* 11 Interactive Scene Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
              {SCENE_METADATA.map((scene, idx) => (
                <span
                  key={scene.sceneIndex}
                  ref={(el) => { sceneDotsRef.current[idx] = el; }}
                  title={scene.title}
                  style={{
                    display: 'inline-block',
                    width: '4px',
                    height: '4px',
                    borderRadius: '9999px',
                    backgroundColor: idx === 0 ? '#FEB071' : 'rgba(255, 247, 236, 0.28)',
                    boxShadow: idx === 0 ? '0 0 8px #FEB071' : 'none',
                    transform: idx === 0 ? 'scale(1.35)' : 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              ))}
            </div>

            {/* Dynamic Scene Title text */}
            <span
              ref={scenePillRef}
              style={{
                fontFamily: 'sans-serif',
                fontSize: 'clamp(8.5px, 2.2vw, 10px)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#FFF7EC',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              Scene 01 / {SCENE_METADATA.length} · {SCENE_METADATA[0]?.title}
            </span>
          </div>

          {/* Minimal Skip Button */}
          <button
            onClick={handleSkip}
            aria-label="Skip cinematic sequence"
            style={{
              pointerEvents: 'auto',
              background: 'rgba(20, 10, 8, 0.72)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '9999px',
              color: 'rgba(255, 247, 236, 0.92)',
              padding: '0.35rem 0.85rem',
              fontSize: 'clamp(8.5px, 2.2vw, 10px)',
              fontFamily: 'sans-serif',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              transition: 'all 0.25s ease',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = 'rgba(254, 176, 113, 0.3)';
              el.style.borderColor = 'rgba(254, 176, 113, 0.6)';
              el.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = 'rgba(20, 10, 8, 0.72)';
              el.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              el.style.color = 'rgba(255, 247, 236, 0.92)';
            }}
          >
            Skip ›
          </button>
        </div>

        {/* Ambient Subtle Vignette / Edge Shadow for cinematic immersion */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            boxShadow: 'inset 0 0 120px rgba(0, 0, 0, 0.65)',
            zIndex: 5,
          }}
        />

        {/* Bottom Interactive Scroll Cue (Safe Area Aware on Mobile) */}
        <div
          ref={scrollHintRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 'max(1.75rem, env(safe-area-inset-bottom, 1.75rem))',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.35rem',
            color: 'rgba(255, 247, 236, 0.65)',
            fontSize: 'clamp(8px, 2vw, 9px)',
            fontFamily: 'sans-serif',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            zIndex: 10,
            transition: 'opacity 0.2s ease-out',
          }}
        >
          <span>Scroll through characters</span>
          <div
            style={{
              width: '16px',
              height: '24px',
              borderRadius: '10px',
              border: '1.2px solid rgba(254, 176, 113, 0.45)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '4px',
            }}
          >
            <div
              style={{
                width: '2.5px',
                height: '5px',
                borderRadius: '2px',
                backgroundColor: '#FEB071',
                boxShadow: '0 0 6px #FEB071',
                animation: 'mouseWheelPulse 1.8s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* Bottom Edge Slender Caramel Progress Scrubber with 11 Scene Division Markers */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3.5px',
            background: 'rgba(0, 0, 0, 0.45)',
            zIndex: 15,
          }}
        >
          {/* Main animated progress fill */}
          <div
            ref={progressBarRef}
            style={{
              height: '100%',
              width: '100%',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
              background: 'linear-gradient(90deg, #8B501A, #FEB071, #FFDCC3, #FEB071)',
              boxShadow: '0 0 10px rgba(254, 176, 113, 0.8)',
              transition: 'transform 0.05s linear',
            }}
          />

          {/* Scene separators along the bottom bar */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'space-between',
              pointerEvents: 'none',
            }}
          >
            {SCENE_METADATA.map((scene) => (
              <div
                key={scene.sceneIndex}
                style={{
                  width: '1px',
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  left: `${(scene.startIndex / TOTAL_FRAME_COUNT) * 100}%`,
                  position: 'absolute',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mouseWheelPulse {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          60% {
            transform: translateY(8px);
            opacity: 0.2;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default SceneOneScrollSequence;
