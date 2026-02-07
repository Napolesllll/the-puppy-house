"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;   // opcional → para ClientRoot
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps = {}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  // Progreso realista
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return 100;
        return prev + Math.random() * 12 + 5;
      });
    }, 280);

    // Seguridad: máximo 8 segundos
    const maxTimer = setTimeout(() => setProgress(100), 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(maxTimer);
    };
  }, []);

  // Cuando llega al 100 % → oculta (usa onComplete si existe, sino interno)
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        } else {
          setIsVisible(false);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  if (!isVisible) return null;

  const pawTrail = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 10 + i * 12,
    delay: i * 0.1,
  }));

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-tr from-black via-zinc-900 to-amber-950 text-white overflow-hidden"
    >
      {/* Fondo grid */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-full h-full opacity-5">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Orbes animados */}
      <motion.div
        className="absolute top-10 sm:top-20 left-10 sm:left-20 w-32 sm:w-48 h-32 sm:h-48 rounded-full bg-amber-500 blur-3xl opacity-20"
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-pink-600 blur-3xl opacity-15"
        animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Huellas flotando */}
      <div className="absolute top-1/4 left-0 right-0 flex justify-center">
        <div className="relative w-full max-w-2xl h-20">
          {pawTrail.map((paw) => (
            <motion.div
              key={paw.id}
              className="absolute text-3xl sm:text-5xl"
              style={{ left: `${paw.x}%` }}
              animate={{ y: [0, -20, 0], opacity: [0, 1, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: paw.delay, ease: "easeInOut" }}
            >
              🐾
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 py-8">
        {/* Logo flotante */}
        <motion.div
          className="mb-8 sm:mb-12 relative"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500 border-r-pink-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-amber-500 blur-2xl opacity-30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/thepuppyhouselogo.png"
              alt="The Puppy House"
              width={150}
              height={150}
              className="object-contain rounded-2xl border-3 border-amber-500 shadow-2xl shadow-amber-900/80 relative z-10 sm:w-52 sm:h-52"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-8 sm:mb-10"
        >
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 sm:mb-4 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl">
              The Puppy House
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-2xl font-semibold text-amber-300 mb-4 sm:mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Tu criadero de confianza
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-2 mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {["C", "a", "r", "g", "a", "n", "d", "o"].map((letter, i) => (
              <motion.span
                key={i}
                className="text-white/60 text-sm sm:text-base font-medium"
                animate={{ opacity: [0.4, 1, 0.4], y: [0, -8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Barra de progreso */}
        <motion.div
          className="w-full max-w-xs sm:max-w-sm mb-6 sm:mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden border border-amber-500/50">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 via-pink-500 to-amber-600"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="text-center text-xs sm:text-sm text-zinc-400 mt-2">
            {Math.round(progress)}%
          </p>
        </motion.div>

        {/* Línea decorativa */}
        <motion.div
          className="w-16 sm:w-24 h-1 bg-gradient-to-r from-amber-500/0 via-amber-500 to-amber-500/0 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Corazones y perrito flotantes */}
      <motion.div
        className="absolute top-1/3 right-5 sm:right-10 text-3xl sm:text-5xl"
        animate={{ y: [0, -30, 0], x: [0, 10, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        ❤️
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-5 sm:left-10 text-2xl sm:text-4xl"
        animate={{ y: [0, -20, 0], x: [0, -10, 0], opacity: [0, 0.8, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        🐕
      </motion.div>

      {/* Partículas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-500 rounded-full"
            style={{ left: `${(i * 5 + 7) % 100}%`, bottom: "-10px" }}
            animate={{ y: -600, opacity: [0, 0.6, 0] }}
            transition={{ duration: 2 + (i % 2), delay: (i % 5) * 0.2, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;