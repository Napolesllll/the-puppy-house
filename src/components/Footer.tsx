"use client";

import React, { useState, useEffect } from "react";
import { PawPrint as PawIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaTiktok } from "react-icons/fa";

export type Section = "inicio" | "sobre" | "contacto" | "clientes";

interface FooterProps {
  currentSection?: Section;
  onNavigate?: (section: Section) => void;
}

interface Paw {
  id: number;
  top: number;
  left: number;
  color: string;
  opacity: number;
  delay: number;
}

// Mapeo de sección a ruta
const sectionHref: Record<Section, string> = {
  inicio: "/",
  sobre: "/sobre-nosotros",
  contacto: "/contacto",
  clientes: "/clientes-felices",
};

// Colores vivos para las huellas
const vividColors = ["#ff6b81", "#ff9f43", "#48dbfb", "#1dd1a1", "#f368e0"];

export default function Footer({ currentSection, onNavigate }: FooterProps) {
  const [pawprints, setPawprints] = useState<Paw[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Generar huellas solo en el cliente
      const prints: Paw[] = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        color: vividColors[Math.floor(Math.random() * vividColors.length)],
        opacity: 0.1 + Math.random() * 0.2,
        delay: Math.random() * 10,
      }));
      setPawprints(prints);
    }
  }, []);

  const links = [
    { id: "inicio", label: "Inicio" },
    { id: "sobre", label: "Sobre nosotros" },
    { id: "contacto", label: "Contacto" },
    { id: "clientes", label: "Clientes felices" },
  ] as const;

  return (
    <footer className="relative bg-gradient-to-br from-black via-zinc-900 to-black text-white py-20 px-6 z-10 overflow-hidden border-t border-red-500/30">
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-0 -left-40 w-96 h-96 bg-red-600/15 rounded-full blur-3xl opacity-40"
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl opacity-40"
        animate={{
          y: [0, -50, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="footerGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerGrid)" />
        </svg>
      </div>

      {/* Animated paw prints with glow */}
      <AnimatePresence>
        {pawprints.map((paw) => (
          <motion.div
            key={paw.id}
            className="absolute w-8 h-8 drop-shadow-lg"
            style={{
              top: `${paw.top}%`,
              left: `${paw.left}%`,
              color: paw.color,
              opacity: paw.opacity,
              filter: "drop-shadow(0 0 8px currentColor)",
            }}
            initial={{ y: 20, opacity: 0, scale: 0.5 }}
            animate={{ 
              y: [-20, -40, -20],
              opacity: paw.opacity,
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: paw.delay,
              repeatType: "loop",
            }}
          >
            <PawIcon strokeWidth={1.5} />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Decorative top line */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="h-1 flex-grow bg-gradient-to-r from-transparent to-red-500/60"
            animate={{ scaleX: [0, 1] }}
            transition={{ duration: 1 }}
          />
          <span className="text-red-400 font-semibold text-xs">MASCOTICAS MEDELLÍN</span>
          <motion.div
            className="h-1 flex-grow bg-gradient-to-l from-transparent to-red-500/60"
            animate={{ scaleX: [0, 1] }}
            transition={{ duration: 1 }}
          />
        </motion.div>

        {/* Logo con glow effect */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mb-8 relative group inline-block"
        >
          {/* Glow background */}
          <motion.div
            className="absolute -inset-4 bg-red-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity"
          />

          {onNavigate ? (
            <button
              onClick={() => onNavigate("inicio")}
              aria-label="Ir al inicio"
              className="mx-auto relative"
            >
              <Image
                src="/LOGO.png"
                alt="Logo Mascoticas"
                width={150}
                height={50}
                className="drop-shadow-2xl"
              />
            </button>
          ) : (
            <Link href="/" className="relative">
              <Image
                src="/LOGO.png"
                alt="Logo Mascoticas"
                width={150}
                height={50}
                className="drop-shadow-2xl"
              />
            </Link>
          )}
        </motion.div>

        {/* Tagline con efecto */}
        <motion.p
          className="text-xl text-zinc-200 mb-12 font-light tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Encuentra a tu <span className="text-red-400 font-semibold">mejor amigo peludo</span>. <span className="text-red-500">¡Juntos hasta el fin!</span>
        </motion.p>

        {/* Grid de contenido con estilo luxury */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12 relative z-10">
          {/* Enlaces */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="group relative p-6 rounded-2xl border border-red-500/20 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-red-500/5"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-transparent to-red-500/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"
            />
            
            <h3 className="text-lg font-black mb-4 text-red-400 drop-shadow-lg relative z-10">
              🔗 Enlaces
            </h3>
            <ul className="space-y-3 text-sm relative z-10">
              {links.map((item, idx) => (
                <motion.li 
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                >
                  {onNavigate ? (
                    <button
                      onClick={() => onNavigate(item.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg transition-all font-medium ${
                        currentSection === item.id
                          ? "text-red-400 bg-red-500/20 border border-red-500/40"
                          : "text-zinc-300 hover:text-red-300 hover:bg-red-500/10"
                      }`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={sectionHref[item.id]}
                      className={`block px-3 py-1.5 rounded-lg transition-all font-medium ${
                        currentSection === item.id
                          ? "text-red-400 bg-red-500/20 border border-red-500/40"
                          : "text-zinc-300 hover:text-red-300 hover:bg-red-500/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Redes sociales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group relative p-6 rounded-2xl border border-red-500/20 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-red-500/5"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-transparent to-red-500/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"
            />

            <h3 className="text-lg font-black mb-5 text-red-400 drop-shadow-lg relative z-10">
              🎵 Síguenos
            </h3>
            <div className="flex justify-center gap-6 text-3xl text-zinc-400 relative z-10">
              {[
                {
                  Icon: FaTiktok,
                  url: "https://www.tiktok.com/@mascoticasbucaramedellin?_r=1&_t=ZS-93SpvqrQcJW",
                  label: "TikTok",
                },
              ].map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  whileTap={{ scale: 0.85 }}
                  className="text-red-500 hover:text-red-400 transition-colors drop-shadow-lg"
                  title={link.label}
                >
                  <link.Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="group relative p-6 rounded-2xl border border-red-500/20 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm hover:bg-red-500/5"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-transparent to-red-500/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"
            />

            <h3 className="text-lg font-black mb-5 text-red-400 drop-shadow-lg relative z-10">
              📞 Contacto
            </h3>
            <div className="text-sm text-zinc-300 space-y-3 relative z-10">
              <motion.div
                className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:border-red-500/40 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-xs text-red-400 font-semibold mb-1">Email</p>
                <p className="text-zinc-200">jeananderson2208@gmail.com</p>
              </motion.div>
              <motion.div
                className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:border-red-500/40 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-xs text-red-400 font-semibold mb-1">Teléfono</p>
                <p className="text-zinc-200">+57 316 316 9143</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Decorative bottom line */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-px flex-grow bg-gradient-to-r from-transparent to-red-500/40"
            animate={{ scaleX: [0, 1] }}
            transition={{ duration: 1, delay: 0.6 }}
          />
          <motion.div
            className="text-red-500/60"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ❤️ 🐾 ❤️
          </motion.div>
          <motion.div
            className="h-px flex-grow bg-gradient-to-l from-transparent to-red-500/40"
            animate={{ scaleX: [0, 1] }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </motion.div>

        {/* Copyright con estilo */}
        <motion.div
          className="text-sm text-zinc-400 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="font-semibold text-red-400/80">© 2025 Mascoticas</p>
          <p>Todos los derechos reservados. 🐕❤️</p>
        </motion.div>
      </div>
    </footer>
  );
}
