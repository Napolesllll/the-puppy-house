"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PawPrint, ArrowLeft } from "lucide-react";
import Nav from "@/components/Nav";
import React from "react";

const LazyModal = lazy(() => import("@/components/BreedModal"));

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

interface PawData {
  id: number;
  top: number;
  left: number;
  color: string;
  opacity: number;
  animationDelay: number;
}

/* ✅ FUNCIÓN CLAVE — SOLUCIÓN A TU PROBLEMA */
const prettyCategoryName = (slug: string) => {
  const map: Record<string, string> = {
    pequenas: "Pequeñas",
    medianas: "Medianas",
    grandes: "Grandes",
  };

  return map[slug] ?? slug;
};

const FloatingPaws = React.memo(() => {
  const [pawsData, setPawsData] = useState<PawData[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
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

        const categoriesRes = await fetch("/api/admin/categories");
        const categories = await categoriesRes.json();

        const category = categories.find((cat: any) => cat.slug === categoria);

        if (!category) {
          setError("Categoría no encontrada");
          router.push("/not-found");
          return;
        }

        const breedsRes = await fetch(
          `/api/admin/breeds?categoryId=${category.id}`
        );

        const breedsData = await breedsRes.json();

        if (!breedsData || breedsData.length === 0) {
          setError("No hay razas en esta categoría");
        }

        const sortedBreeds = breedsData.sort((a: Breed, b: Breed) => {
          if (a.name.toLowerCase().includes("pomerania")) return -1;
          if (b.name.toLowerCase().includes("pomerania")) return 1;
          return a.name.localeCompare(b.name);
        });

        setBreeds(sortedBreeds);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las razas");
      } finally {
        setLoading(false);
      }
    };

    fetchBreedsByCategory();
  }, [categoria, router]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
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
    <section className="relative pt-28 px-4 pb-16 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white overflow-hidden min-h-screen">
      <FloatingPaws />

      {/* ✅ AQUÍ ESTÁ LA MAGIA */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-white tracking-wider">
        🐾  {prettyCategoryName(categoria)}
      </h1>

      {loading ? (
        <div className="flex justify-center py-20 text-zinc-400">
          Cargando razas...
        </div>
      ) : error ? (
        <div className="flex justify-center py-20 text-amber-400">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {breeds.map((breed) => (
            <BreedCard key={breed.id} breed={breed} onOpenModal={openModal} />
          ))}
        </div>
      )}

      {isModalOpen && selectedBreed && (
        <Suspense fallback={<div className="text-center">Cargando...</div>}>
          <LazyModal breed={selectedBreed} onClose={closeModal} />
        </Suspense>
      )}

      {!isModalOpen && (
        <div className="fixed top-6 left-6 z-50">
          <Link href="/">
            <button className="bg-white/10 hover:bg-white/20 border border-white/30 text-white p-4 rounded-full shadow-2xl transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}
