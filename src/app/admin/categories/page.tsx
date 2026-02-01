// src/app/admin/categories/page.tsx
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
  description?: string;
  image?: string;
}

interface FormData {
  name: string;
  slug: string;
  description: string;
  image?: string;
}

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: "", slug: "", description: "", image: "" });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("folder", "the-puppy-house/categories");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (res.ok) {
        const data = await res.json();
        setFormData({ ...formData, image: data.secure_url });
      } else {
        alert("Error al subir imagen");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/categories/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          fetchCategories();
          closeModal();
        }
      } else {
        const res = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          fetchCategories();
          closeModal();
        }
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta categoría?")) {
      try {
        const res = await fetch(`/api/admin/categories/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          fetchCategories();
        } else {
          const error = await res.json();
          alert(error.error || "Error al eliminar");
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: "", slug: "", description: "", image: "" });
  };

  const openEditModal = (category: Category) => {
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      image: category.image,
    });
    setEditingId(category.id);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-900/95 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <ArrowLeft size={24} />
              </button>
            </Link>
            <h1 className="text-3xl font-bold">Gestión de Categorías</h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setFormData({ name: "", slug: "", description: "" });
              setEditingId(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 rounded-lg font-bold text-black transition-all shadow-lg shadow-amber-500/50"
          >
            <Plus size={20} />
            Nueva Categoría
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-zinc-400">Cargando categorías...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-400 mb-6">No hay categorías creadas aún</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              Crear primera categoría
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-amber-400/50 transition-all group overflow-hidden"
              >
                {category.image && (
                  <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm text-zinc-400 mb-3">Slug: {category.slug}</p>
                {category.description && (
                  <p className="text-sm text-zinc-300 mb-4">{category.description}</p>
                )}

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => openEditModal(category)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                    Editar
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleDelete(category.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                    Eliminar
                  </motion.button>
                </div>
              </motion.div>
            ))}
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
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-800 rounded-xl p-8 max-w-md w-full mx-4 border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {editingId ? "Editar Categoría" : "Nueva Categoría"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre *</label>
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
                  <label className="block text-sm font-medium mb-2">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="ej: pequenas"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-amber-400 outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-amber-400 outline-none text-white min-h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Imagen (Cloudinary)
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
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm cursor-pointer"
                    />
                    {uploading && <p className="text-amber-400 text-sm">Subiendo...</p>}
                  </div>
                  {formData.image && (
                    <p className="text-xs text-zinc-400 mt-2">URL: {formData.image}</p>
                  )}
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
