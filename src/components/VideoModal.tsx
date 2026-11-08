import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      document.body.style.overflow = 'hidden';
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

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

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Dark Ambient Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050000]/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl bg-[#2b1712] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10 flex flex-col">
        {/* Top Control Bar */}
        <div className="p-4 px-6 flex items-center justify-between border-b border-white/10 bg-[#1e1b15]/60">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#ffdcc3] font-bold">
              4K 60FPS Atelier Dessert Reel · 180°C Continuous Cycle
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close video reel"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-video w-full bg-black overflow-hidden group">
          <video
            ref={videoRef}
            src="/assets/video_website_landing/01.mp4"
            poster="https://lh3.googleusercontent.com/aida-public/AB6AXuAf62-MBF3siEdhWLMngD_I3DOIkSB5v3UIUapbjdw66XAh5qWj3xCgz-S-erxidOUlRdJdvvBhQzD7NG-qrb4fhJIyqB8-K09wm0yiHuHmUPxEsFhl6IKODPblhxVlNRHVrBreyd5b2EyM8NT-4yMMkTL7UpwdykP28UDRJKdn5etWclChK3kKX7eydZzeib46XtKFP9pTvufxVKASyDmpoSM_Zt8Q-tpkZZ3f7CnJYuIIa5jqMvdcMg"
            autoPlay
            playsInline
            muted={isMuted}
            loop
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Floating Live Keyframe Chapter Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 font-sans text-xs">
            <span className="bg-[#2b1712]/80 backdrop-blur-md px-3 py-1 rounded text-[#ffdcc3] border border-white/10">
              Macro Pull: Nutella Lava 60% Core
            </span>
            <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[#efe7dc] text-[11px]">
              Single-Estate Belgian Chocolate · Hand-Salted Maldon
            </span>
          </div>

          {/* Play / Pause Large Center Overlay on Click */}
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
          >
            {!isPlaying && (
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                <Play className="w-8 h-8 fill-white text-white translate-x-0.5" />
              </div>
            )}
          </div>

          {/* Bottom Player Controls */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col gap-2">
            {/* Scrubber Bar */}
            <div
              onClick={handleSeek}
              className="w-full h-1.5 bg-white/20 hover:h-2 rounded-full overflow-hidden cursor-pointer transition-all"
            >
              <div
                className="h-full bg-[#feb071] rounded-full transition-all duration-75"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-sans text-[#efe7dc]">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isMuted ? 'Muted' : 'Atelier Sounds'}</span>
                </button>
                <span className="font-mono text-[11px]">
                  {formatTime(currentTime)} / {formatTime(duration || 60)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#feb071]">
                  RAW 4K MASTER · ATELIER EDITION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
