"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    const handleLoad = () => setIsVisible(false);
    window.addEventListener("load", handleLoad);

    // Simular progreso
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 30;
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
      clearInterval(progressInterval);
    };
  }, []);

  if (!isVisible) return null;

  // Generar posiciones aleatorias para huellas siguiendo un patrón
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-tr from-black via-zinc-900 to-red-950 text-white overflow-hidden"
    >
      {/* Animated grid background */}
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

      {/* Animated orbs in background */}
      <motion.div
        className="absolute top-10 sm:top-20 left-10 sm:left-20 w-32 sm:w-48 h-32 sm:h-48 rounded-full bg-red-500 blur-3xl opacity-20"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-pink-600 blur-3xl opacity-15"
        animate={{
          y: [0, -40, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Paw trail animation */}
      <div className="absolute top-1/4 left-0 right-0 flex justify-center">
        <div className="relative w-full max-w-2xl h-20">
          {pawTrail.map((paw) => (
            <motion.div
              key={paw.id}
              className="absolute text-3xl sm:text-5xl"
              style={{ left: `${paw.x}%` }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: paw.delay,
                ease: "easeInOut",
              }}
            >
              🐾
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 py-8">
        {/* Floating logo with rotation */}
        <motion.div
          className="mb-8 sm:mb-12 relative"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Rotating background ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-500 border-r-pink-500"
            animate={{ rotate: 360 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Pulsing glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500 blur-2xl opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Logo */}
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/LOGO.png"
              alt="Mascoticas"
              width={150}
              height={150}
              className="object-contain rounded-2xl border-3 border-red-500 shadow-2xl shadow-red-900/80 relative z-10 sm:w-52 sm:h-52"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Text content with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-8 sm:mb-10"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 sm:mb-4 leading-tight"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl">
              Mascoticas
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-2xl font-semibold text-red-300 mb-4 sm:mb-6"
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
                animate={{
                  opacity: [0.4, 1, 0.4],
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.08,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Custom progress bar */}
        <motion.div
          className="w-full max-w-xs sm:max-w-sm mb-6 sm:mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden border border-red-500/50">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 via-pink-500 to-red-600"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 90)}%` }}
              transition={{
                duration: 0.5,
              }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <p className="text-center text-xs sm:text-sm text-zinc-400 mt-2">
            {Math.round(Math.min(progress, 90))}%
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating hearts in corners */}
      <motion.div
        className="absolute top-1/3 right-5 sm:right-10 text-3xl sm:text-5xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 10, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ❤️
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-5 sm:left-10 text-2xl sm:text-4xl"
        animate={{
          y: [0, -20, 0],
          x: [0, -10, 0],
          opacity: [0, 0.8, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        🐕
      </motion.div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            style={{
              left: `${(i * 5 + 7) % 100}%`,
              bottom: `-10px`,
            }}
            animate={{
              y: -600,
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2 + (i % 2),
              delay: (i % 5) * 0.2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
