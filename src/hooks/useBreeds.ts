// src/hooks/useBreeds.ts
import { useState, useEffect } from 'react';

export interface BreedPrice {
  id: string;
  malePrice: number;
  femalePrice: number;
}

export interface BreedImage {
  id: string;
  url: string;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BreedData {
  id: string;
  name: string;
  description: string;
  image: string;
  desde?: string;
  categoryId: string;
  category: Category;
  prices?: BreedPrice[];
  images?: BreedImage[];
}

export interface GroupedBreeds {
  [key: string]: BreedData[];
}

export const useBreeds = () => {
  const [breeds, setBreeds] = useState<BreedData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/breeds');
        if (!response.ok) throw new Error('Error fetching breeds');
        const data = await response.json();
        setBreeds(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  const getBreedsByCategory = (categorySlug: string): BreedData[] => {
    return breeds.filter((breed) => breed.category.slug === categorySlug);
  };

  const groupBreedsByCategory = (): GroupedBreeds => {
    return breeds.reduce(
      (acc, breed) => {
        const categorySlug = breed.category.slug;
        if (!acc[categorySlug]) {
          acc[categorySlug] = [];
        }
        acc[categorySlug].push(breed);
        return acc;
      },
      {} as GroupedBreeds
    );
  };

  return {
    breeds,
    loading,
    error,
    getBreedsByCategory,
    groupBreedsByCategory,
  };
};
