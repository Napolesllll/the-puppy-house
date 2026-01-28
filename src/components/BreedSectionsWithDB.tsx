// src/components/BreedSectionsWithDB.tsx (Ejemplo de implementación con BD)
// Este archivo es una REFERENCIA de cómo integrar useBreeds en BreedSections
// No reemplaza el archivo actual hasta que configures la BD

"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, X, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Variants } from "framer-motion";
import { useBreeds } from "@/hooks/useBreeds";

const cardVariants: Variants = {
  hover: {
    scale: 1.05,
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 0.4,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
};

const BreedCard = ({
  href,
  imgSrc,
  title,
  description,
}: {
  href: string;
  imgSrc: string;
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      whileHover="hover"
      variants={cardVariants}
      className="rounded-2xl overflow-hidden shadow-lg bg-zinc-800 text-white cursor-pointer"
    >
      <Link href={href}>
        <div className="relative h-72 w-full">
          <Image src={imgSrc} alt={title} fill className="object-cover" />
        </div>
        <div className="p-6 text-center">
          <PawPrint className="mx-auto mb-2 text-white" size={32} />
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-zinc-300">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default function BreedSectionsWithDB() {
  const { groupBreedsByCategory, loading } = useBreeds();
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      const grouped = groupBreedsByCategory();
      const categories = Object.entries(grouped).map(([slug, breeds]) => ({
        slug,
        name: breeds[0]?.category?.name || slug,
        breeds,
      }));
      setCategoriesData(categories);
    }
  }, [loading, groupBreedsByCategory]);

  if (loading) {
    return (
      <div className="w-full py-20 text-center">
        <p className="text-zinc-400">Cargando razas...</p>
      </div>
    );
  }

  return (
    <>
      {categoriesData.map((category) => (
        <section key={category.slug} className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-center mb-4 text-white"
            >
              <span className="text-amber-400">{category.name}</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {category.breeds.map((breed: any) => (
                <BreedCard
                  key={breed.id}
                  href={`/razas/${category.slug}?id=${breed.id}`}
                  imgSrc={breed.image}
                  title={breed.name}
                  description={breed.description}
                />
              ))}
            </motion.div>
          </div>
        </section>
      ))}
    </>
  );
}
