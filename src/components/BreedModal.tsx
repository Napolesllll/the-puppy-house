"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { PawPrint } from "lucide-react";
import Image from "next/image";

interface BreedModalProps {
  breed: {
    id: string;
    name: string;
    description: string;
    image: string;
    desde?: string;
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
  };
  onClose: () => void;
}

const BreedModal = ({ breed, onClose }: BreedModalProps) => {
  // Usar imágenes de la BD si existen, sino usar la imagen principal
  const breedImages = breed.images && breed.images.length > 0 
    ? breed.images.map(img => img.url)
    : [breed.image];

  const malePrice = breed.prices?.[0]?.malePrice || 0;
  const femalePrice = breed.prices?.[0]?.femalePrice || 0;
  return (
    <div className="fixed inset-0 bg-black/50 flex mt-20 items-center justify-center z-[1000] backdrop-blur-sm">
      <div className="bg-zinc-800 rounded-xl p-4 md:p-8 max-w-4xl w-full mx-4 relative flex flex-col md:flex-row gap-4 md:gap-6 border-2 border-white/10 backdrop-blur-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-4 md:right-4 text-white text-xl md:text-2xl hover:text-amber-400 transition-colors z-10"
        >
          ✕
        </button>

        <div className="w-full md:w-1/2">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            className="h-64 md:h-96 shadow-xl rounded-xl overflow-hidden"
          >
            {breedImages.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full bg-white/5">
                  <Image
                    src={imageUrl}
                    alt={`${breed.name} - ${index + 1}`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
              {breed.name}
              <PawPrint className="ml-3 inline-block w-6 h-6 md:w-8 md:h-8 text-amber-400" />
            </h2>
            <div className="mb-4 md:mb-6">
              <p className="text-base md:text-lg text-zinc-300 leading-relaxed overflow-y-auto max-h-32 md:max-h-48 pr-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
                {breed.description}
              </p>
            </div>
          </div>

          <div className="bg-white/5 p-3 md:p-4 rounded-xl border border-amber-400/20 space-y-3">
            {breed.desde && (
              <p className="text-xs md:text-sm text-amber-300 text-center font-medium">
                {breed.desde}
              </p>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-xs md:text-sm text-amber-400">♂</span>
                  <p className="text-lg md:text-xl font-semibold text-amber-400">
                    Macho
                  </p>
                </div>
                <p className="text-xl md:text-2xl font-bold text-white">
                  ${malePrice.toLocaleString()}
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-xs md:text-sm text-rose-400">♀</span>
                  <p className="text-lg md:text-xl font-semibold text-rose-400">
                    Hembra
                  </p>
                </div>
                <p className="text-xl md:text-2xl font-bold text-white">
                  ${femalePrice.toLocaleString()}
                </p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-zinc-400 text-center mt-2">
              * Cuando en la precio dice a partir de, significa que el precio
              puede variar dependiendo de la calidad del cachorro y su pedigree.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreedModal;
