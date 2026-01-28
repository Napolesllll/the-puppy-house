// src/types/admin.ts
export interface CreateCategoryInput {
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  slug?: string;
  description?: string;
  image?: string;
}

export interface CreateBreedInput {
  name: string;
  description: string;
  image: string;
  desde?: string;
  categoryId: string;
  malePrice: number;
  femalePrice: number;
  images?: string[];
}

export interface UpdateBreedInput {
  name?: string;
  description?: string;
  image?: string;
  desde?: string;
  malePrice?: number;
  femalePrice?: number;
  images?: string[];
}

export interface BreedWithDetails {
  id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
  desde?: string;
  categoryId: string;
  prices?: {
    malePrice: number;
    femalePrice: number;
  };
  images?: Array<{
    id: string;
    url: string;
    order: number;
  }>;
}
