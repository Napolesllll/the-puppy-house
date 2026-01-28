// src/app/admin/breeds/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, ArrowLeft, X, Upload } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface BreedImage {
  id: string;
  url: string;
  order: number;
}

interface BreedPrice {
  id: string;
  malePrice: number;
  femalePrice: number;
}

interface Breed {
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

interface FormData {
  name: string;
  description: string;
  image: string;
  desde: string;
  categoryId: string;
  malePrice: number;
  femalePrice: number;
  images: string[];
}

export default function BreedsAdmin() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    image: "",
    desde: "",
    categoryId: "",
    malePrice: 0,
    femalePrice: 0,
    images: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [breedsRes, categoriesRes] = await Promise.all([
        fetch("/api/admin/breeds"),
        fetch("/api/admin/categories"),
      ]);
      const breedsData = await breedsRes.json();
      const categoriesData = await categoriesRes.json();
      setBreeds(breedsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert("La imagen principal es requerida");
      return;
    }

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/breeds/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          fetchData();
          closeModal();
        } else {
          alert("Error al actualizar raza");
        }
      } else {
        const res = await fetch("/api/admin/breeds", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          fetchData();
          closeModal();
        } else {
          alert("Error al crear raza");
        }
      }
    } catch (error) {
      console.error("Error saving breed:", error);
      alert("Error al guardar la raza");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta raza?")) {
      try {
        const res = await fetch(`/api/admin/breeds/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          fetchData();
        }
      } catch (error) {
        console.error("Error deleting breed:", error);
      }
    }
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("folder", "mascoticas-med/breeds");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData({ ...formData, image: data.secure_url });
      } else {
        alert("Error al subir imagen principal");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error al subir imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleMultipleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = 10 - formData.images.length;
    
    if (remainingSlots <= 0) {
      alert("Ya has alcanzado el máximo de 10 imágenes");
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    try {
      setUploading(true);
      const uploadedUrls: string[] = [];

      for (const file of filesToUpload) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);
        formDataUpload.append("folder", "mascoticas-med/breeds/gallery");

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formDataUpload,
        });

        if (res.ok) {
          const data = await res.json();
          uploadedUrls.push(data.secure_url);
        }
      }

      if (uploadedUrls.length > 0) {
        setFormData({
          ...formData,
          images: [...formData.images, ...uploadedUrls],
        });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error al subir algunas imágenes");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      image: "",
      desde: "",
      categoryId: "",
      malePrice: 0,
      femalePrice: 0,
      images: [],
    });
  };

  const openEditModal = (breed: Breed) => {
    setFormData({
      name: breed.name,
      description: breed.description,
      image: breed.image,
      desde: breed.desde || "",
      categoryId: breed.categoryId,
      malePrice: breed.prices?.[0]?.malePrice || 0,
      femalePrice: breed.prices?.[0]?.femalePrice || 0,
      images: breed.images?.map((img) => img.url) || [],
    });
    setEditingId(breed.id);
    setIsModalOpen(true);
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Filtrar razas por búsqueda y categoría
  const filteredBreeds = breeds.filter((breed) => {
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategoryId || breed.categoryId === selectedCategoryId;
    return matchesSearch && matchesCategory;
  });

  // Organizar razas filtradas por categoría
  const breedsByCategory = categories
    .map((cat) => ({
      ...cat,
      breeds: filteredBreeds.filter((b) => b.categoryId === cat.id),
    }))
    .filter((cat) => cat.breeds.length > 0 || !selectedCategoryId);

  // Stats
  const totalBreeds = breeds.length;
  const filteredCount = filteredBreeds.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-amber-500/40">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <ArrowLeft size={24} />
              </button>
            </Link>
            <h1 className="text-3xl font-bold">Gestión de Razas</h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setFormData({
                name: "",
                description: "",
                image: "",
                desde: "",
                categoryId: "",
                malePrice: 0,
                femalePrice: 0,
                images: [],
              });
              setEditingId(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-400 hover:to-amber-500 rounded-lg font-black text-lg shadow-2xl hover:shadow-yellow-500/50 transition-all text-black"
          >
            <Plus size={26} />
            Nueva Raza
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-zinc-400">Cargando razas...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Barra de búsqueda y filtros */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <div className="space-y-4">
                {/* Búsqueda */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="🔍 Buscar raza por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-3 rounded-lg bg-black/30 border border-amber-400/30 focus:border-amber-400 outline-none text-white placeholder-zinc-400 transition-all"
                  />
                </div>

                {/* Filtro por categoría */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategoryId("")}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      !selectedCategoryId
                        ? "bg-gradient-to-r from-amber-400 to-rose-400 text-black"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    Todas ({totalBreeds})
                  </button>
                  {categories.map((cat) => {
                    const count = breeds.filter((b) => b.categoryId === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategoryId(cat.id)}
                        className={`px-4 py-2 rounded-full font-medium transition-all ${
                          selectedCategoryId === cat.id
                            ? "bg-gradient-to-r from-amber-400 to-rose-400 text-black"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`}
                      >
                        {cat.name} ({count})
                      </button>
                    );
                  })}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-sm text-zinc-300">
                    Mostrando <span className="text-amber-400 font-bold">{filteredCount}</span> de{" "}
                    <span className="text-amber-400 font-bold">{totalBreeds}</span> razas
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="text-xs px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors"
                    >
                      Limpiar búsqueda
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Razas organizadas por categoría */}
            {breedsByCategory.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-zinc-400 mb-4">
                  {searchTerm ? "No se encontraron razas con ese nombre" : "No hay razas creadas"}
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 rounded-lg font-medium transition-all"
                >
                  Crear primera raza
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 w-full"
              >
                {breedsByCategory.map((category) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-white/20 rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm"
                  >
                    {/* Encabezado de categoría colapsible */}
                    <motion.button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-amber-500/20 to-rose-500/20 hover:from-amber-500/30 hover:to-rose-500/30 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`transition-transform ${expandedCategories.has(category.id) ? "rotate-90" : ""}`}>
                          <svg
                            className="w-5 h-5 text-amber-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <h2 className="text-xl font-bold text-amber-400">
                            {category.name}
                          </h2>
                          <p className="text-sm text-zinc-400">
                            {category.breeds.length} raza{category.breeds.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    </motion.button>

                    {/* Contenido colapsible */}
                    <AnimatePresence>
                      {expandedCategories.has(category.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-white/10 w-full"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 w-full">
                            {category.breeds.map((breed, index) => (
                              <motion.div
                                key={breed.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="p-2 rounded-lg bg-black/40 border border-white/10 hover:border-amber-400/50 transition-all group overflow-hidden flex flex-col"
                              >
                                <div className="relative w-full h-24 mb-1.5 rounded-lg overflow-hidden bg-white/5">
                                  {breed.image && (
                                    <Image
                                      src={breed.image}
                                      alt={breed.name}
                                      fill
                                      className="object-contain p-2"
                                    />
                                  )}
                                </div>

                                <h3 className="text-xs font-bold mb-0.5 line-clamp-1 text-amber-400">
                                  {breed.name}
                                </h3>
                                <p className="text-xs text-zinc-400 mb-1 line-clamp-1">
                                  {breed.description}
                                </p>

                                <div className="bg-white/5 p-1 rounded mb-1.5 text-xs space-y-0.5">
                                  <div className="flex justify-between">
                                    <span className="text-zinc-400">♂:</span>
                                    <span className="text-amber-400 font-semibold text-xs">
                                      ${breed.prices?.[0]?.malePrice?.toLocaleString() || "0"}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-zinc-400">♀:</span>
                                    <span className="text-rose-400 font-semibold text-xs">
                                      ${breed.prices?.[0]?.femalePrice?.toLocaleString() || "0"}
                                    </span>
                                  </div>
                                </div>

                                {breed.images && breed.images.length > 0 && (
                                  <p className="text-xs text-zinc-500 mb-1">📷 {breed.images.length}</p>
                                )}

                                <div className="flex gap-1.5 mt-auto">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => openEditModal(breed)}
                                    className="flex-1 flex items-center justify-center gap-0.5 px-1.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded text-xs"
                                  >
                                    <Edit2 size={10} />
                                    Editar
                                  </motion.button>

                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => handleDelete(breed.id)}
                                    className="flex-1 flex items-center justify-center gap-0.5 px-1.5 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-xs"
                                  >
                                    <Trash2 size={10} />
                                    Eliminar
                                  </motion.button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-800 rounded-xl p-8 max-w-2xl w-full border border-white/20 my-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {editingId ? "Editar Raza" : "Nueva Raza"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {/* Básicos */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Categoría *
                  </label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-amber-400 outline-none text-white"
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-amber-400 outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Descripción *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-amber-400 outline-none text-white min-h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Imagen Principal (Cloudinary) *
                  </label>
                  {formData.image && (
                    <div className="mb-3 relative w-full h-32 rounded-lg overflow-hidden border border-white/20">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageUpload}
                      disabled={uploading}
                      className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm cursor-pointer"
                    />
                    {uploading && <p className="text-amber-400 text-sm">Subiendo...</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Desde (ej: "a partir de")
                  </label>
                  <input
                    type="text"
                    value={formData.desde}
                    onChange={(e) =>
                      setFormData({ ...formData, desde: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-amber-400 outline-none text-white"
                  />
                </div>

                {/* Precios */}
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <h3 className="font-semibold mb-4">Precios</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Precio Macho *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.malePrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            malePrice: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-amber-400 outline-none text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Precio Hembra *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.femalePrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            femalePrice: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-amber-400 outline-none text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Imágenes adicionales */}
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">
                      Galería (Máx. 10 imágenes) - {formData.images.length}/10
                    </h3>
                  </div>

                  {formData.images.length < 10 && (
                    <div className="mb-4">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleMultipleImagesUpload}
                        disabled={uploading}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm cursor-pointer"
                      />
                      {uploading && (
                        <p className="text-amber-400 text-sm mt-2">Subiendo imágenes...</p>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-3">
                    {formData.images.map((url, index) => (
                      <div
                        key={index}
                        className="relative group rounded-lg overflow-hidden border border-white/20"
                      >
                        <div className="relative w-full h-24">
                          <Image
                            src={url}
                            alt={`Imagen ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg"
                        >
                          <X size={20} className="text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="submit"
                    className="flex-1 py-2 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 rounded-lg font-medium transition-all"
                  >
                    {editingId ? "Actualizar" : "Crear"}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all"
                  >
                    Cancelar
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
