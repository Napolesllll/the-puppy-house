"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, X, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Variants } from "framer-motion"
import { useBreeds } from "@/hooks/useBreeds";


const cardVariants: Variants = {
  hover: {
    scale: 1.05,
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1], // equivalente a easeInOut
    },
  },
}

const BreedCard = ({
  href,
  imgSrc,
  title,
  description,
  delay = 0,
}: {
  href: string;
  imgSrc: string;
  title: string;
  description: string;
  delay?: number;
}) => {
  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        whileHover="hover"
        variants={cardVariants}
        className="group relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/50 bg-gradient-to-br from-zinc-800 to-zinc-900 text-white cursor-pointer border border-amber-500/20 hover:border-amber-500/50 transition-all h-full"
      >
        {/* Glow effect background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-600/0 via-amber-500/0 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        />

        <div className="relative h-72 w-full overflow-hidden">
          <Image 
            src={imgSrc} 
            alt={title} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/30 transition-all duration-500" />
        </div>
        <div className="p-6 text-center relative z-20">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center mb-3"
          >
            <PawPrint className="text-amber-500 drop-shadow-lg" size={32} />
          </motion.div>
          <h3 className="text-2xl font-black mb-2 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

const ClientesModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderImages = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
    );
  };

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen, sliderImages.length]);

  const testimonios = [
    {
      id: 1,
      nombre: "María González",
      mascota: "Max - Golden Retriever",
      comentario:
        "¡Increíble experiencia! Max llegó sano y feliz. El proceso fue muy profesional.",
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      mascota: "Luna - Bulldog Francés",
      comentario:
        "Luna es la alegría de nuestro hogar. Gracias por tanta dedicación.",
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      mascota: "Rocky - Pastor Alemán",
      comentario:
        "El acompañamiento post-adopción fue excepcional. 100% recomendados.",
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-zinc-900 via-black to-zinc-950 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón de cerrar */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 z-20 bg-amber-500 hover:bg-amber-600 text-white rounded-full p-2 transition-colors shadow-lg"
          >
            <X size={20} />
          </button>

          <div className="p-8 text-white relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nuestros{" "}
                <span className="text-amber-500">Clientes Satisfechos</span>
              </h2>
              <p className="text-zinc-300">
                Familias felices que han encontrado a su compañero perfecto
              </p>
            </div>

            {/* Slider de imágenes */}
            <div className="mb-8 overflow-hidden rounded-xl relative">
              {/* Flecha izquierda */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Flecha derecha */}
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200 backdrop-blur-sm"
              >
                <ChevronRight size={24} />
              </button>

              <div
                className="relative h-[300px] md:h-[400px] transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {sliderImages.map((item, index) => (
                  <div
                    key={item}
                    className="w-full absolute top-0 h-full flex items-center justify-center"
                    style={{ left: `${index * 100}%` }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={`/clientes-felices/carousel${item}.jpg`}
                        alt={`Cliente feliz ${item}`}
                        fill
                        className="object-scale-down rounded-xl"
                        sizes="(max-width: 768px) 100vw, 75vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicadores de progreso */}
            <div className="flex justify-center mb-8 space-x-2">
              {sliderImages.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-amber-500" : "bg-zinc-600"
                  }`}
                />
              ))}
            </div>

            {/* Testimonios */}
            <div className="grid md:grid-cols-3 gap-6">
              {testimonios.map((testimonio, index) => (
                <motion.div
                  key={testimonio.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700"
                >
                  <div className="mb-4">
                    <h3 className="font-bold text-lg text-amber-400">
                      {testimonio.nombre}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {testimonio.mascota}
                    </p>
                  </div>
                  <p className="text-zinc-300 italic text-sm">
                    &quot;{testimonio.comentario}&quot;
                  </p>
                  <div className="flex mt-3 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const BreedSections = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { breeds, loading } = useBreeds();

  // Agrupar razas por categoría con sus detalles
  const categoriesMap = new Map();
  
  breeds.forEach((breed) => {
    if (!categoriesMap.has(breed.categoryId)) {
      categoriesMap.set(breed.categoryId, {
        id: breed.categoryId,
        name: breed.category.name,
        slug: breed.category.slug,
        description: breed.category.description,
        image: breed.category.image,
      });
    }
  });

  const categories = Array.from(categoriesMap.values()).sort((a, b) => {
    // Orden específico: pequeñas, medianas, grandes
    const order = { pequenas: 0, medianas: 1, grandes: 2 };
    const aOrder = order[a.slug as keyof typeof order] ?? 999;
    const bOrder = order[b.slug as keyof typeof order] ?? 999;
    return aOrder - bOrder;
  });

  return (
    <>
      <section className="relative bg-gradient-to-b from-black via-zinc-950 to-black py-20 px-6 overflow-hidden">
        {/* Animated background orbs */}
        <motion.div
          className="absolute top-20 -left-40 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl opacity-30"
          animate={{
            y: [0, 40, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 -right-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl opacity-30"
          animate={{
            y: [0, -40, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10">
          {/* Título con efectos */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
                <span className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                  Explora por Tamaño
                </span>
              </h2>
            </motion.div>

            {/* Decorative line */}
            <motion.div
              className="flex items-center justify-center gap-4 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="w-12 h-1 bg-gradient-to-r from-transparent to-amber-500"
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <span className="text-amber-400 font-semibold text-sm">Encuentre su compañero perfecto</span>
              <motion.div
                className="w-12 h-1 bg-gradient-to-l from-transparent to-amber-500"
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.div>
          </motion.div>

          {loading ? (
            <div className="max-w-6xl mx-auto text-center text-zinc-400">
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Cargando categorías...
              </motion.p>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
              {categories.map((category, idx) => (
                <BreedCard
                  key={category.id}
                  href={`/razas/${category.slug}`}
                  imgSrc={category.image || "/placeholder.jpg"}
                  title={category.name}
                  description={category.description || "Explora esta categoría de razas"}
                  delay={idx * 0.15}
                />
              ))}
            </div>
          )}

          {/* Card de Clientes Satisfechos mejorada */}
          <motion.div
            className="flex justify-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              whileHover="hover"
              variants={cardVariants}
              className="group relative rounded-2xl overflow-hidden shadow-2xl shadow-amber-900/60 bg-gradient-to-br from-zinc-800 to-zinc-900 text-white cursor-pointer max-w-sm border border-amber-500/30 hover:border-amber-500/60 transition-all"
              onClick={() => setIsModalOpen(true)}
            >
              {/* Animated glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-600/20 via-transparent to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
              />

              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src="/clientes-felices/carousel1.jpg"
                  alt="Clientes Satisfechos"
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-6xl drop-shadow-lg"
                  >
                    ❤️
                  </motion.div>
                </div>
              </div>
              <div className="p-6 text-center relative z-20">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-3"
                >
                  <Heart className="mx-auto text-amber-500 drop-shadow-lg" size={32} />
                </motion.div>
                <h3 className="text-2xl font-black mb-2 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                  Clientes Satisfechos
                </h3>
                <p className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">
                  Descubre las experiencias de familias felices con sus mascotas.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <ClientesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default BreedSections;
