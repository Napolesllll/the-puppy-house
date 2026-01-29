"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PawPrint, ArrowLeft } from "lucide-react";
import Nav from "@/components/Nav";
import React from "react";

// Lazy loading del modal y swiper solo cuando se necesiten
const LazyModal = lazy(() => import("@/components/BreedModal"));

// Interfaz para las razas desde la BD
interface Breed {
  id: string;
  name: string;
  description: string;
  image: string;
  desde?: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  prices?: Array<{
    id: string;
    malePrice: number;
    femalePrice: number;
  }>;
  images?: Array<{
    id: string;
    url: string;
    order: number;
  }>;
}

const vividColors = ["#ff6b81", "#ff9f43", "#48dbfb", "#1dd1a1", "#f368e0"];

// Tipo para los datos de cada huellita
interface PawData {
  id: number;
  top: number;
  left: number;
  color: string;
  opacity: number;
  animationDelay: number;
}

// Componente de huellitas optimizado con memo - VERSIÓN CORREGIDA
const FloatingPaws = React.memo(() => {
  const [pawsData, setPawsData] = useState<PawData[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Generar datos solo en el cliente para evitar hydration mismatch
    const generatePawsData = () => {
      return Array.from({ length: 20 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        color: vividColors[Math.floor(Math.random() * vividColors.length)],
        opacity: 0.2 + Math.random() * 0.3,
        animationDelay: Math.random() * 10,
      }));
    };

    setPawsData(generatePawsData());
    setIsMounted(true);
  }, []);

  // No renderizar nada hasta que esté montado en el cliente
  if (!isMounted) {
    return <div className="absolute inset-0 -z-10 pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      {pawsData.map((paw) => (
        <PawPrint
          key={paw.id}
          className="absolute w-6 h-6 animate-[floatUp_14s_ease-in-out_infinite]"
          style={{
            top: `${paw.top}%`,
            left: `${paw.left}%`,
            color: paw.color,
            opacity: paw.opacity,
            animationDelay: `${paw.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
});

FloatingPaws.displayName = "FloatingPaws";

// Componente de tarjeta de raza optimizado
const BreedCard = React.memo(
  ({
    breed,
    onOpenModal,
  }: {
    breed: Breed;
    onOpenModal: (breed: Breed) => void;
  }) => (
    <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform transition-all hover:scale-[1.03] group">
      <div className="relative w-full h-80 overflow-hidden bg-white/5">
        <Image
          src={breed.image}
          alt={breed.name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
      </div>

      <div className="p-6 text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">
          {breed.name.split(" ")[0]}
        </h2>
        <p className="text-sm text-zinc-300 line-clamp-3">
          {breed.description.split(" ").slice(0, 5).join(" ")}...
        </p>
        <button
          onClick={() => onOpenModal(breed)}
          className="mt-4 inline-block bg-white/10 px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-white/20 transition duration-300"
        >
          Ver más
        </button>
      </div>
    </div>
  )
);

BreedCard.displayName = "BreedCard";

export default function RazaPage() {
  const { categoria } = useParams() as { categoria: string };
  const router = useRouter();
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreedsByCategory = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Obtener todas las categorías para encontrar el ID por slug
        const categoriesRes = await fetch("/api/admin/categories");
        const categories = await categoriesRes.json();
        
        const category = categories.find((cat: any) => cat.slug === categoria);
        
        if (!category) {
          setError("Categoría no encontrada");
          router.push("/not-found");
          return;
        }
        
        // Obtener razas filtradas por categoría
        const breedsRes = await fetch(`/api/admin/breeds?categoryId=${category.id}`);
        const breedsData = await breedsRes.json();
        
        if (!breedsData || breedsData.length === 0) {
          setError("No hay razas en esta categoría");
        }
        
        setBreeds(breedsData);
      } catch (err) {
        console.error("Error fetching breeds:", err);
        setError("Error al cargar las razas");
      } finally {
        setLoading(false);
      }
    };

    fetchBreedsByCategory();
  }, [categoria, router]);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (footer) {
      footer.style.display = isModalOpen ? "none" : "block";
    }

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      if (footer) footer.style.display = "block";
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const openModal = (breed: Breed) => {
    setSelectedBreed(breed);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBreed(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="relative pt-28 px-4 pb-16 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white overflow-hidden min-h-screen z-10">
        <FloatingPaws />

        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-14 capitalize text-white tracking-wider">
          🐾 Razas {categoria}
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-xl text-zinc-400">Cargando razas...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-xl text-red-400">{error}</p>
          </div>
        ) : breeds.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-xl text-zinc-400">No hay razas en esta categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto z-10 relative">
            {breeds.map((breed) => (
              <BreedCard key={breed.id} breed={breed} onOpenModal={openModal} />
            ))}
          </div>
        )}

        {/* Modal con lazy loading */}
        {isModalOpen && selectedBreed && (
          <Suspense
            fallback={
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
                <div className="bg-zinc-800 rounded-xl p-8 max-w-md mx-4">
                  <div className="animate-pulse text-white text-center">
                    Cargando...
                  </div>
                </div>
              </div>
            }
          >
            <LazyModal breed={selectedBreed} onClose={closeModal} />
          </Suspense>
        )}

        {/* Botón flotante de regreso */}
        {!isModalOpen && (
          <div className="fixed top-6 left-6 z-50 mt-35 flex flex-col items-center gap-2 group">
            <Link href="/" title="Volver al inicio">
              <button
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white p-4 rounded-full shadow-2xl transition-transform duration-300 hover:scale-110 animate-in fade-in"
                aria-label="Volver al inicio"
              >
                <PawPrint className="w-6 h-6 animate-bounce group-hover:animate-none" />
                <ArrowLeft className="w-5 h-5 mt-2 text-white animate-in fade-in delay-100 animate-bounce group-hover:animate-none" />
              </button>
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
