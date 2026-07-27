"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LogoAnimation({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<"entering" | "assembling" | "moving" | "done">("entering");
  const [usePlaceholder, setUsePlaceholder] = useState(true);

  const [targetPos, setTargetPos] = useState({ x: -500, y: -300 });

  useEffect(() => {
    const calculateTarget = () => {
      const el = document.getElementById("static-logo-target");
      if (el) {
        const rect = el.getBoundingClientRect();
        setTargetPos({
          x: rect.left + rect.width / 2 - window.innerWidth / 2,
          y: rect.top + rect.height / 2 - window.innerHeight / 2,
        });
      }
    };
    
    // Calculate after a small delay to ensure DOM is ready
    setTimeout(calculateTarget, 100);
    window.addEventListener("resize", calculateTarget);

    const checkImage = (url: string) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });
    };

    Promise.all([checkImage("/logo-plates/logo-upperplate-removebg-preview.png"), checkImage("/logo-plates/logo-lowerplate-removebg-preview.png")]).then((results) => {
      if (results[0] && results[1]) {
        setUsePlaceholder(false);
      }
    });

    const assembleTimer = setTimeout(() => setPhase("assembling"), 800);
    const moveTimer = setTimeout(() => setPhase("moving"), 2500);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      if (onComplete) onComplete();
    }, 4500);

    return () => {
      clearTimeout(assembleTimer);
      clearTimeout(moveTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div 
      className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden transition-all duration-1000"
      style={{
        background: phase === "moving" ? "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)" : "radial-gradient(circle at center, rgba(212,175,55,0.08) 0%, rgba(0,0,0,0.3) 100%)",
        backdropFilter: phase === "moving" ? "blur(0px)" : "blur(3px)",
      }}
    >
      <motion.div
        className="relative flex items-center justify-center w-64 h-64"
        style={{ filter: phase !== "moving" ? "drop-shadow(0 0 40px rgba(212,175,55,0.4))" : "none" }}
        initial={{ scale: 1, x: 0, y: 0 }}
        animate={
          phase === "moving"
            ? {
                scale: 0.25,
                x: targetPos.x,
                y: targetPos.y,
                opacity: 0,
              }
            : { scale: 1, x: 0, y: 0, opacity: 1 }
        }
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Upper Plate */}
        <motion.div
          className="absolute"
          initial={{ x: "-60vw", y: "-40vh", rotate: -135, scale: 3, opacity: 0 }}
          animate={
            phase === "entering"
              ? { x: "-60vw", y: "-40vh", rotate: -135, scale: 3, opacity: 0 }
              : { x: -3, y: -6, rotate: 0, scale: 1, opacity: 1 }
          }
          transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
        >
          {usePlaceholder ? (
            <div className="w-40 h-24 bg-gradient-to-br from-[#f8cf71] via-[#aa7922] to-[#5c3e07] rounded-[2px] shadow-2xl" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 30%, 50% 30%, 0 100%, 0 45%)' }} />
          ) : (
            <img src="/logo-plates/logo-upperplate-removebg-preview.png" alt="Upper Plate" className="w-40 object-contain drop-shadow-2xl" />
          )}
        </motion.div>

        {/* Lower Plate */}
        <motion.div
          className="absolute"
          initial={{ x: "60vw", y: "40vh", rotate: 135, scale: 3, opacity: 0 }}
          animate={
            phase === "entering"
              ? { x: "60vw", y: "40vh", rotate: 135, scale: 3, opacity: 0 }
              : { x: 3, y: 6, rotate: 0, scale: 1, opacity: 1 }
          }
          transition={{ duration: 1.2, type: "spring", bounce: 0.3, delay: 0.2 }}
        >
          {usePlaceholder ? (
            <div className="w-40 h-24 bg-gradient-to-br from-[#f8cf71] via-[#aa7922] to-[#5c3e07] rounded-[2px] shadow-2xl" style={{ clipPath: 'polygon(50% 70%, 100% 70%, 100% 100%, 0 100%, 0 55%, 70% 0, 100% 0)' }} />
          ) : (
            <img src="/logo-plates/logo-lowerplate-removebg-preview.png" alt="Lower Plate" className="w-40 object-contain drop-shadow-2xl" />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function StaticLogo({ isAnimating }: { isAnimating: boolean }) {
  const [usePlaceholder, setUsePlaceholder] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = "/logo-plates/logo-upperplate-removebg-preview.png";
    img.onload = () => setUsePlaceholder(false);
  }, []);

  return (
    <div 
      id="static-logo-target"
      className="relative w-10 h-10 flex items-center justify-center mr-3 cursor-pointer"
      style={{ opacity: isAnimating ? 0 : 1 }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute left-1/2 -translate-x-1/2 top-12 whitespace-nowrap bg-background/90 backdrop-blur-md border border-border/50 px-4 py-2 rounded-xl shadow-lg z-50 pointer-events-none"
          >
            <p className="text-sm font-semibold text-foreground">FAS FAS Labs</p>
            <p className="text-xs text-muted-foreground">A Product Based Company</p>
          </motion.div>
        )}
      </AnimatePresence>

      {usePlaceholder ? (
        <>
          <div className={`absolute w-10 h-6 bg-gradient-to-br from-[#f8cf71] via-[#aa7922] to-[#5c3e07] rounded-[1px] transform transition-all duration-500 ${isOpen ? '-translate-x-[8px] -translate-y-[8px] scale-110' : '-translate-x-[0.5px] -translate-y-[1.5px] scale-100'}`} style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 30%, 50% 30%, 0 100%, 0 45%)' }} />
          <div className={`absolute w-10 h-6 bg-gradient-to-br from-[#f8cf71] via-[#aa7922] to-[#5c3e07] rounded-[1px] transform transition-all duration-500 ${isOpen ? 'translate-x-[8px] translate-y-[8px] scale-110' : 'translate-x-[0.5px] translate-y-[1.5px] scale-100'}`} style={{ clipPath: 'polygon(50% 70%, 100% 70%, 100% 100%, 0 100%, 0 55%, 70% 0, 100% 0)' }} />
        </>
      ) : (
        <>
          <img src="/logo-plates/logo-upperplate-removebg-preview.png" alt="FAS Logo" className={`absolute w-10 transform transition-all duration-500 ${isOpen ? '-translate-x-[8px] -translate-y-[8px] scale-110' : '-translate-x-[0.5px] -translate-y-[1.5px] scale-100'}`} />
          <img src="/logo-plates/logo-lowerplate-removebg-preview.png" alt="FAS Logo" className={`absolute w-10 transform transition-all duration-500 ${isOpen ? 'translate-x-[8px] translate-y-[8px] scale-110' : 'translate-x-[0.5px] translate-y-[1.5px] scale-100'}`} />
        </>
      )}
    </div>
  );
}
