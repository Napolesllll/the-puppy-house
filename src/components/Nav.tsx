"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Section = "inicio" | "sobre" | "contacto" | "clientes";

interface Paw {
  id: number;
  top: number;
  left: number;
  size: number;
  rotation: number;
}

const Nav = ({
  currentSection,
  onNavigate,
  isModalOpen,
}: {
  currentSection: Section;
  onNavigate: (section: Section) => void;
  isModalOpen: boolean; // Nueva prop para saber si el modal está abierto
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pawprints, setPawprints] = useState<Paw[]>([]);
  const [pawprintsMobile, setPawprintsMobile] = useState<Paw[]>([]);

  useEffect(() => {
    // Generar huellas decorativas solo en el cliente
    const generatePawprints = (num: number) =>
      Array.from({ length: num }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 20 + Math.random() * 20,
        rotation: Math.random() * 360,
      }));

    setPawprints(generatePawprints(15));
    setPawprintsMobile(generatePawprints(10));
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav
      className={`bg-gradient-to-b from-black via-zinc-900 to-black text-white fixed top-0 left-0 right-0 w-full shadow-2xl shadow-amber-900/50 transition-all overflow-hidden border-b border-amber-500/30 ${isModalOpen ? "z-10" : "z-50"
        }`}
      aria-label="Navegación principal"
    >
      {/* Animated top glow line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Huellitas escritorio con glow */}
      <div className="absolute inset-0 hidden md:block pointer-events-none z-0 overflow-hidden">
        {pawprints.map((paw) => (
          <motion.div
            key={paw.id}
            className="absolute text-amber-500/30"
            style={{
              top: `${paw.top}%`,
              left: `${paw.left}%`,
              fontSize: `${paw.size}px`,
              transform: `rotate(${paw.rotation}deg)`,
              filter: "blur(0.5px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, delay: Math.random() * 2 }}
          >
            🐾
          </motion.div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-full mx-auto px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between overflow-hidden">
        {/* Logo con efecto luxury */}
        <motion.div
          className="flex-shrink-0"
          whileHover={{ scale: 1.05 }}
        >
          <button
            onClick={() => onNavigate("inicio")}
            aria-label="Ir al inicio"
            className="relative group"
          >
            {/* Glow effect behind logo */}
            <motion.div
              className="absolute -inset-2 bg-amber-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity"
            />

            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
              className="relative"
            >
              <Image
                src="/log1.png"
                alt="Logo The Puppy House"
                width={150}
                height={50}
                className="drop-shadow-lg"
              />
            </motion.div>
          </button>
        </motion.div>

        {/* Menú de escritorio con estilo luxury */}
        <ul className="hidden md:flex space-x-2 flex-shrink-0">
          {[
            { id: "inicio", label: "Inicio", icon: "🏠" },
            { id: "sobre", label: "Sobre Nosotros", icon: "💝" },
            { id: "contacto", label: "Contáctanos", icon: "📞" },
            { id: "clientes", label: "Clientes Felices", icon: "⭐" },
          ].map((item) => (
            <motion.li
              key={item.id}
              whileHover={{ y: -2 }}
            >
              <motion.button
                onClick={() => onNavigate(item.id as Section)}
                className={`relative px-5 py-2.5 rounded-xl font-semibold transition-all text-sm flex items-center gap-2 ${currentSection === item.id
                  ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/40"
                  : "text-white/80 hover:text-white"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Subtle background for inactive items */}
                {currentSection !== item.id && (
                  <motion.div
                    className="absolute inset-0 bg-amber-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ opacity: 0.2 }}
                  />
                )}

                <span className="relative z-10 text-lg">{item.icon}</span>
                <span className="relative z-10">{item.label}</span>

                {/* Animated underline for active */}
                {currentSection === item.id && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 to-amber-600 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            </motion.li>
          ))}
        </ul>

        {/* Botón hamburguesa - móvil con estilo */}
        <motion.div className="md:hidden flex-shrink-0">
          <motion.button
            onClick={toggleMenu}
            aria-label="Abrir menú móvil"
            className="relative group p-2.5 rounded-lg hover:bg-amber-600/20 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-amber-500 group-hover:text-amber-400 transition-colors"
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </motion.svg>

            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 bg-amber-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10"
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Menú móvil centrado */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-black bg-opacity-60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menú centrado con estilo luxury */}
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-amber-500/20 via-transparent to-amber-500/10 blur-3xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="relative w-full max-w-sm bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-8 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-amber-900/50">
                {/* Decorative top accent */}
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Botón cerrar luxury */}
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-6 right-6 text-amber-500 hover:text-amber-400 transition-colors z-20 text-3xl font-light"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  aria-label="Cerrar menú"
                >
                  ✕
                </motion.button>

                {/* Huellitas con glow */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                  {pawprintsMobile.map((paw) => (
                    <motion.div
                      key={`mobile-${paw.id}`}
                      className="absolute text-amber-500/40"
                      style={{
                        top: `${paw.top}%`,
                        left: `${paw.left}%`,
                        fontSize: `${paw.size}px`,
                        transform: `rotate(${paw.rotation}deg)`,
                        filter: "blur(0.5px)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.15, 0], y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      🐾
                    </motion.div>
                  ))}
                </div>

                {/* Logo pequeño */}
                <motion.div
                  className="relative z-10 flex justify-center mb-8"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Image
                    src="/thepuppyhouselogo.png"
                    alt="Logo The Puppy House"
                    width={64}
                    height={64}
                    className="object-contain rounded-full border-2 border-amber-500/50"
                  />
                </motion.div>

                {/* Título decorativo */}
                <div className="relative z-10 text-center mb-8">
                  <h2 className="text-xl font-black bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    The Puppy House
                  </h2>
                  <div className="flex items-center justify-center gap-2 mt-2 text-xs text-amber-300/60">
                    <span className="w-2 h-px bg-amber-500/40" />
                    <span>Tu criadero de confianza</span>
                    <span className="w-2 h-px bg-amber-500/40" />
                  </div>
                </div>

                {/* Links con estilo luxury */}
                <ul className="relative z-10 flex flex-col items-center gap-4 w-full">
                  {[
                    { id: "inicio", label: "Inicio", icon: "🏠" },
                    { id: "sobre", label: "Sobre Nosotros", icon: "💝" },
                    { id: "contacto", label: "Contáctanos", icon: "📞" },
                    { id: "clientes", label: "Clientes Felices", icon: "⭐" },
                  ].map((item, idx) => (
                    <motion.li
                      key={item.id}
                      className="w-full"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <motion.button
                        onClick={() => {
                          onNavigate(item.id as Section);
                          setIsMenuOpen(false);
                        }}
                        className={`py-3 px-6 w-full text-center rounded-2xl font-semibold transition-all flex items-center justify-center gap-3 ${currentSection === item.id
                          ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/50 border border-amber-400/50"
                          : "bg-zinc-800/50 text-white border border-zinc-700/50 hover:border-amber-500/50"
                          }`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>

                {/* Decorative bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
