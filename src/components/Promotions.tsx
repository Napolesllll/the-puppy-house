"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  Percent,
  Star,
  Zap,
  Gift,
  TrendingUp
} from "lucide-react";

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  image: string;
  badge?: string;
  startDate: string;
  endDate: string;
  breed?: {
    name: string;
    slug: string;
  };
}

const Promotions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  // Fetch promociones desde API
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await fetch("/api/promotions", {
          cache: 'no-store',
        });
        const data = await res.json();
        
        // Verificar si data es un array
        const promotionsArray = Array.isArray(data) ? data : [];
        
        // Filtrar solo promociones activas y no expiradas
        const activePromotions = promotionsArray.filter((p: Promotion) => {
          const now = new Date();
          const end = new Date(p.endDate);
          return end > now;
        });
        
        setPromotions(activePromotions);
      } catch (error) {
        console.error("Error fetching promotions:", error);
        setPromotions([]); // Establecer array vacío en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
    
    // Refresco automático cada 30 segundos para ver cambios en tiempo real
    const interval = setInterval(fetchPromotions, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Contador de tiempo restante
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft: { [key: string]: string } = {};
      
      promotions.forEach((promo) => {
        const now = new Date().getTime();
        const end = new Date(promo.endDate).getTime();
        const distance = end - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          
          newTimeLeft[promo.id] = `${days}d ${hours}h ${minutes}m`;
        } else {
          newTimeLeft[promo.id] = "Finalizada";
        }
      });

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [promotions]);

  // Auto-slide cada 5 segundos
  useEffect(() => {
    if (promotions.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [promotions.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % promotions.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  const getBadgeIcon = (badge?: string) => {
    switch (badge?.toUpperCase()) {
      case "NUEVO": return <Star className="w-4 h-4" />;
      case "HOT": return <Zap className="w-4 h-4" />;
      case "LIMITADO": return <Clock className="w-4 h-4" />;
      case "REGALO": return <Gift className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge?.toUpperCase()) {
      case "NUEVO": return "from-blue-500 to-cyan-400";
      case "HOT": return "from-red-500 to-orange-400";
      case "LIMITADO": return "from-purple-500 to-pink-400";
      case "REGALO": return "from-green-500 to-emerald-400";
      default: return "from-amber-500 to-yellow-400";
    }
  };

  if (loading) {
    return (
      <section className="relative py-20 px-6 bg-gradient-to-b from-zinc-900 via-black to-zinc-950 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-zinc-800 rounded w-64 mx-auto mb-4"></div>
            <div className="h-96 bg-zinc-800 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (promotions.length === 0) {
    return (
      <section className="relative py-20 px-6 bg-gradient-to-b from-zinc-900 via-black to-zinc-950 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-amber-400" />
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Próximamente Ofertas Especiales
              </h2>
              <Sparkles className="w-8 h-8 text-amber-400" />
            </div>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              ¡Estamos preparando promociones exclusivas especialmente para ti! Vuelve pronto para obtener descuentos increíbles en nuestros adorables cachorros.
            </p>
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-amber-400"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const currentPromo = promotions[currentIndex];

  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-zinc-900 via-black to-zinc-950 overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Destellos rojos */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-red-500 will-change-transform"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Gradientes flotantes */}
        <motion.div
          className="absolute top-0 -left-20 w-96 h-96 rounded-full bg-red-600 blur-[120px] opacity-20 will-change-transform"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 -right-20 w-96 h-96 rounded-full bg-amber-600 blur-[120px] opacity-20 will-change-transform"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Título de sección */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-amber-400" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              ¡Ofertas Especiales!
            </h2>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-amber-400" />
            </motion.div>
          </div>
          <p className="text-lg text-zinc-400">
            Aprovecha nuestras promociones exclusivas por tiempo limitado
          </p>
        </motion.div>

        {/* Slider principal */}
        <div className="relative">
          {/* Controles de navegación */}
          {promotions.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-4 backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg shadow-red-500/20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-4 backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg shadow-red-500/20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Tarjeta de promoción */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-xl border-2 border-red-500/30 shadow-2xl shadow-red-500/20 will-change-transform"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Imagen */}
                <div className="relative h-96 md:h-auto overflow-hidden group">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative w-full h-full will-change-transform"
                  >
                    <Image
                      src={currentPromo.image}
                      alt={currentPromo.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </motion.div>

                  {/* Badge flotante */}
                  {currentPromo.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 3, -3, 0] }}
                      transition={{
                        scale: { duration: 0.3 },
                        rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      }}
                      className={`absolute top-6 left-6 bg-gradient-to-r ${getBadgeColor(
                        currentPromo.badge
                      )} text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 will-change-transform`}
                    >
                      {getBadgeIcon(currentPromo.badge)}
                      {currentPromo.badge.toUpperCase()}
                    </motion.div>
                  )}

                  {/* Porcentaje de descuento */}
                  <motion.div
                    animate={{
                      scale: [1, 1.08, 1],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-6 right-6 bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-2xl shadow-red-500/50 border-4 border-white/20 will-change-transform"
                  >
                    <Percent className="w-6 h-6 mb-1" />
                    <span className="text-3xl font-black">{currentPromo.discount}</span>
                    <span className="text-xs font-bold">OFF</span>
                  </motion.div>
                </div>

                {/* Contenido */}
                <div className="p-8 md:p-12 flex flex-col justify-center relative">
                  {/* Efectos decorativos */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10">
                    {/* Título */}
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, ease: "easeOut" }}
                      className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
                    >
                      {currentPromo.title}
                    </motion.h3>

                    {/* Descripción */}
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25, ease: "easeOut" }}
                      className="text-lg text-zinc-300 mb-6 leading-relaxed"
                    >
                      {currentPromo.description}
                    </motion.p>

                    {/* Info de la raza */}
                    {currentPromo.breed && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35, ease: "easeOut" }}
                        className="mb-6 inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20"
                      >
                        <span className="text-amber-400 font-semibold text-sm">
                          🐕 {currentPromo.breed.name}
                        </span>
                      </motion.div>
                    )}

                    {/* Contador de tiempo */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45, ease: "easeOut" }}
                      className="mb-8 bg-gradient-to-r from-red-900/40 to-pink-900/40 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-5 h-5 text-red-400" />
                        <span className="text-sm font-semibold text-red-300 uppercase tracking-wide">
                          Tiempo restante
                        </span>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-3xl font-black text-white"
                      >
                        {timeLeft[currentPromo.id] || "Calculando..."}
                      </motion.div>
                    </motion.div>

                    {/* Botón de acción */}
                    <motion.a
                      href={currentPromo.breed ? `/razas/${currentPromo.breed.slug}` : "/razas"}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, ease: "easeOut" }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-500/50 hover:shadow-2xl hover:shadow-red-500/60 transition-all duration-300 group will-change-transform"
                    >
                      <span>¡Aprovecha Ahora!</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        →
                      </motion.div>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicadores de página */}
          {promotions.length > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              {promotions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-12 bg-gradient-to-r from-red-500 to-pink-500"
                      : "w-3 bg-zinc-600 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tarjetas pequeñas de otras promociones */}
        {promotions.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ease: "easeOut" }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {promotions
              .filter((_, i) => i !== currentIndex)
              .slice(0, 3)
              .map((promo, index) => (
                <motion.button
                  key={promo.id}
                  onClick={() => setCurrentIndex(promotions.indexOf(promo))}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="relative rounded-2xl overflow-hidden bg-zinc-800/50 border border-zinc-700 hover:border-red-500/50 transition-all duration-300 group will-change-transform"
                >
                  <div className="relative h-48">
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    
                    {/* Badge pequeño */}
                    {promo.badge && (
                      <div
                        className={`absolute top-3 left-3 bg-gradient-to-r ${getBadgeColor(
                          promo.badge
                        )} text-white px-3 py-1 rounded-full text-xs font-bold`}
                      >
                        {promo.badge}
                      </div>
                    )}

                    {/* Descuento pequeño */}
                    <div className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-14 h-14 flex items-center justify-center font-black text-sm">
                      -{promo.discount}%
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-white font-bold text-lg mb-1 line-clamp-1">
                      {promo.title}
                    </h4>
                    <p className="text-zinc-400 text-sm line-clamp-2">
                      {promo.description}
                    </p>
                  </div>
                </motion.button>
              ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Promotions;