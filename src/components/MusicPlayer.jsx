import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";

const MusicPlayer = () => {
  const [permission, setPermission] = useState(() => {
    return localStorage.getItem("audio_permission");
  });
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const dragControls = useDragControls();
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/song.mp3");
      audioRef.current.loop = true;
    }
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  useEffect(() => {
    if (permission === "true" && audioRef.current && isVisible) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [permission, isVisible]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - bounds.left, bounds.width));
    const percent = x / bounds.width;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  const handleChoice = (choice) => {
    localStorage.setItem("audio_permission", choice ? "true" : "false");
    setPermission(choice ? "true" : "false");
  };

  if (permission === "false") return null;
  if (!isVisible && permission === "true") return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-mono text-xs select-none">
      <AnimatePresence mode="wait">
        {!permission ? (
          <motion.div
            key="prompt"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-64 bg-[#080808] border border-border p-4 flex flex-col gap-4 shadow-2xl"
          >
            <div className="text-text/80 tracking-widest uppercase text-[10px]">play bgm?</div>
            <div className="flex justify-end gap-4 text-[10px] tracking-widest uppercase">
              <button onClick={() => handleChoice(false)} className="text-text/40 hover:text-text transition-colors">
                [ no thanks ]
              </button>
              <button onClick={() => handleChoice(true)} className="text-text hover:text-white transition-colors">
                [ play ]
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="player"
            drag
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-72 bg-[#080808] border border-border flex flex-col shadow-2xl"
          >
            {/* Titlebar */}
            <div 
              className="h-6 border-b border-border bg-[#080808] flex items-center px-2 justify-between cursor-move"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="flex gap-3 items-center pl-1 text-[10px] text-text/40 font-mono">
                <button 
                  onClick={() => setIsVisible(false)}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="hover:text-text transition-colors leading-none"
                  title="close"
                >
                  x
                </button>
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="hover:text-text transition-colors leading-none"
                  title="minimize"
                >
                  —
                </button>
              </div>
              <div className="text-[9px] text-text/30 uppercase tracking-widest">
                audio.sh
              </div>
            </div>

            {/* Body */}
            <motion.div 
              initial={false}
              animate={{ height: isMinimized ? 0 : "auto", opacity: isMinimized ? 0 : 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-4 border-b border-transparent">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <span className="text-text/90 truncate tracking-wider text-[11px] uppercase">la petite fille de la mer</span>
                    <span className="text-text/40 text-[9px] truncate tracking-widest uppercase">tiredminds (vangelis)</span>
                  </div>
                  <button 
                    onClick={togglePlay} 
                    className="shrink-0 text-text/60 hover:text-text transition-colors text-[10px] uppercase tracking-widest w-12 text-right"
                  >
                    {isPlaying ? "[ || ]" : "[  > ]"}
                  </button>
                </div>
                
                {/* Progress bar */}
                <div 
                  className="h-1 bg-border/50 cursor-pointer relative"
                  onClick={handleSeek}
                >
                  <div 
                    className="absolute top-0 left-0 h-full bg-text/80 transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicPlayer;
