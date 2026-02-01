"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Percent,
  Image as ImageIcon,
  Tag,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Breed {
  id: string;
  name: string;
  slug: string;
}

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  image: string;
  badge?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isFeatured: boolean;
  breedId?: string;
  breed?: {
    name: string;
    slug: string;
  };
}

const AdminPromotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount: 0,
    image: "",
    badge: "",
    startDate: "",
    endDate: "",
    isActive: true,
    isFeatured: false,
    breedId: "",
  });

  const badgeOptions = ["NUEVO", "HOT", "LIMITADO", "REGALO", "ESPECIAL"];

  useEffect(() => {
    fetchPromotions();
    fetchBreeds();
  }, []);

  const fetchPromotions = async () => {
    try {
      setError(null);
      const res = await fetch("/api/admin/promotions");
      
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
      
      const data = await res.json();
      
      // ✅ CORRECCIÓN: Asegurar que data sea un array
      if (Array.isArray(data)) {
        setPromotions(data);
      } else if (data && typeof data === 'object' && Array.isArray(data.promotions)) {
        // Si viene envuelto en un objeto {promotions: [...]}
        setPromotions(data.promotions);
      } else {
        console.error("Formato inesperado de datos:", data);
        setPromotions([]);
        setError("Formato de datos inesperado del servidor");
      }
    } catch (error) {
      console.error("Error fetching promotions:", error);
      setPromotions([]);
      setError("Error al cargar promociones. Verifica la conexión a la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBreeds = async () => {
    try {
      const res = await fetch("/api/admin/breeds");
      
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
      
      const data = await res.json();
      
      // ✅ CORRECCIÓN: Asegurar que data sea un array
      if (Array.isArray(data)) {
        setBreeds(data);
      } else if (data && typeof data === 'object' && Array.isArray(data.breeds)) {
        setBreeds(data.breeds);
      } else {
        console.error("Formato inesperado de breeds:", data);
        setBreeds([]);
      }
    } catch (error) {
      console.error("Error fetching breeds:", error);
      setBreeds([]);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("folder", "the-puppy-house/promotions");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (!res.ok) {
        throw new Error("Error al subir imagen");
      }

      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.secure_url }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error al subir la imagen. Intenta con otra imagen.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Si es creación (POST), validar todos los campos obligatorios
    if (!editingId) {
      if (!formData.title || !formData.description || !formData.image) {
        alert("Por favor completa todos los campos obligatorios");
        return;
      }

      if (!formData.startDate || !formData.endDate) {
        alert("Por favor selecciona las fechas de inicio y fin");
        return;
      }
    } else {
      // Si es edición, validar que al menos algo haya cambiado
      const currentPromo = promotions.find(p => p.id === editingId);
      if (!currentPromo) {
        alert("Promoción no encontrada");
        return;
      }

      // Detectar si algo cambió
      const hasChanges = 
        formData.title !== currentPromo.title ||
        formData.description !== currentPromo.description ||
        formData.discount !== currentPromo.discount ||
        formData.image !== currentPromo.image ||
        formData.badge !== (currentPromo.badge || "") ||
        formData.startDate !== new Date(currentPromo.startDate).toISOString().slice(0, 16) ||
        formData.endDate !== new Date(currentPromo.endDate).toISOString().slice(0, 16) ||
        formData.isActive !== currentPromo.isActive ||
        formData.isFeatured !== currentPromo.isFeatured ||
        formData.breedId !== (currentPromo.breedId || "");

      if (!hasChanges) {
        alert("No hay cambios para guardar");
        return;
      }
    }

    const url = editingId
      ? `/api/admin/promotions/${editingId}`
      : "/api/admin/promotions";
    const method = editingId ? "PATCH" : "POST";

    try {
      // Para edición, solo enviar los campos que realmente changed
      let bodyToSend: any = {
        ...formData,
        discount: Number(formData.discount),
        breedId: formData.breedId || null,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyToSend),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al guardar");
      }

      await fetchPromotions();
      resetForm();
      alert(editingId ? "Promoción actualizada" : "Promoción creada exitosamente");
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Error al guardar la promoción");
    }
  };

  const handleEdit = (promotion: Promotion) => {
    setFormData({
      title: promotion.title,
      description: promotion.description,
      discount: promotion.discount,
      image: promotion.image,
      badge: promotion.badge || "",
      startDate: new Date(promotion.startDate).toISOString().slice(0, 16),
      endDate: new Date(promotion.endDate).toISOString().slice(0, 16),
      isActive: promotion.isActive,
      isFeatured: promotion.isFeatured,
      breedId: promotion.breedId || "",
    });
    setEditingId(promotion.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta promoción?")) return;

    try {
      const res = await fetch(`/api/admin/promotions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar");
      }

      await fetchPromotions();
      alert("Promoción eliminada exitosamente");
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar la promoción");
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const res = await fetch(`/api/admin/promotions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.details || "Error al actualizar estado");
      }

      await fetchPromotions();
      alert("Estado actualizado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Error al cambiar el estado de la promoción");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      discount: 0,
      image: "",
      badge: "",
      startDate: "",
      endDate: "",
      isActive: true,
      isFeatured: false,
      breedId: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-zinc-400">Cargando promociones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft size={20} />
              </motion.button>
            </Link>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                Gestión de Promociones
              </h1>
              <p className="text-zinc-400 mt-1">
                Administra las ofertas especiales
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingId(null);
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 font-bold shadow-lg shadow-amber-500/40 transition-all text-lg"
          >
            <Plus size={24} />
            Nueva Promoción
          </motion.button>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300">
            <p className="font-semibold">⚠️ {error}</p>
            <p className="text-sm mt-1">
              Asegúrate de que la base de datos esté corriendo y que las migraciones se hayan ejecutado.
            </p>
          </div>
        )}

        {/* Formulario Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto"
            onClick={resetForm}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-zinc-900 rounded-2xl p-8 max-w-3xl w-full border border-amber-500/30 shadow-2xl shadow-amber-500/20 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6">
                <h2 className="text-3xl font-bold">
                  {editingId ? "Editar Promoción" : "Nueva Promoción"}
                </h2>
                {editingId && (
                  <p className="text-sm text-zinc-400 mt-2">
                    💡 Edita solo los campos que desees cambiar
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Título */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-zinc-300">
                    Título {!editingId && "*"}
                  </label>
                  <input
                    type="text"
                    required={!editingId}
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-amber-500 outline-none transition-colors text-white"
                    placeholder="Ej: ¡50% de Descuento en Golden Retriever!"
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-zinc-300">
                    Descripción {!editingId && "*"}
                  </label>
                  <textarea
                    required={!editingId}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-amber-500 outline-none transition-colors resize-none text-white"
                    placeholder="Descripción detallada de la promoción..."
                  />
                </div>

                {/* Grid de campos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Descuento */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-zinc-300">
                      Descuento (%) {!editingId && "*"}
                    </label>
                    <div className="relative">
                      <Percent
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                      />
                      <input
                        type="number"
                        required={!editingId}
                        min="0"
                        max="100"
                        value={formData.discount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            discount: Number(e.target.value),
                          })
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-amber-500 outline-none transition-colors text-white"
                      />
                    </div>
                  </div>

                  {/* Badge */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-zinc-300">
                      Badge (Opcional)
                    </label>
                    <div className="relative">
                      <Tag
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                      />
                      <select
                        value={formData.badge}
                        onChange={(e) =>
                          setFormData({ ...formData, badge: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-amber-500 outline-none transition-colors appearance-none text-white"
                      >
                        <option value="">Sin badge</option>
                        {badgeOptions.map((badge) => (
                          <option key={badge} value={badge}>
                            {badge}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Fecha inicio */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-zinc-300">
                      Fecha de Inicio {!editingId && "*"}
                    </label>
                    <div className="relative">
                      <Calendar
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                      />
                      <input
                        type="datetime-local"
                        required={!editingId}
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData({ ...formData, startDate: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-amber-500 outline-none transition-colors text-white"
                      />
                    </div>
                  </div>

                  {/* Fecha fin */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-zinc-300">
                      Fecha de Fin {!editingId && "*"}
                    </label>
                    <div className="relative">
                      <Calendar
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                      />
                      <input
                        type="datetime-local"
                        required={!editingId}
                        value={formData.endDate}
                        onChange={(e) =>
                          setFormData({ ...formData, endDate: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-amber-500 outline-none transition-colors text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Raza relacionada */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-zinc-300">
                    Raza Relacionada (Opcional)
                  </label>
                  <select
                    value={formData.breedId}
                    onChange={(e) =>
                      setFormData({ ...formData, breedId: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:border-amber-500 outline-none transition-colors text-white"
                  >
                    <option value="">Ninguna (promoción general)</option>
                    {breeds.map((breed) => (
                      <option key={breed.id} value={breed.id}>
                        {breed.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Imagen */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-zinc-300">
                    Imagen de Promoción {!editingId && "*"}
                  </label>
                  <div className="space-y-4">
                    {formData.image ? (
                      <div className="relative group">
                        <div className="relative h-48 rounded-xl overflow-hidden border-2 border-amber-500/50 bg-zinc-800">
                          <Image
                            key={formData.image}
                            src={`${formData.image}?t=${Date.now()}`}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized
                            priority
                          />
                        </div>
                        <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl cursor-pointer">
                          <div className="text-center">
                            <span className="text-white font-semibold block mb-2">Cambiar imagen</span>
                            {uploadingImage && <span className="text-sm text-amber-300">Subiendo...</span>}
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploadingImage}
                          />
                        </label>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-3 px-6 py-8 rounded-xl bg-zinc-800 border-2 border-dashed border-zinc-700 hover:border-amber-500 cursor-pointer transition-colors group">
                        <div className="text-center">
                          <ImageIcon size={24} className={`mx-auto mb-2 transition-colors ${uploadingImage ? 'text-amber-400' : 'text-zinc-400 group-hover:text-amber-400'}`} />
                          <span className="text-zinc-300 font-medium block">
                            {uploadingImage
                              ? "Subiendo a Cloudinary..."
                              : "Haz clic para seleccionar imagen"}
                          </span>
                          <span className="text-xs text-zinc-500 mt-1">
                            PNG, JPG o WebP (máx. 5MB)
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="w-5 h-5 rounded bg-zinc-800 border-zinc-600 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-zinc-300 font-medium">Activa</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) =>
                        setFormData({ ...formData, isFeatured: e.target.checked })
                      }
                      className="w-5 h-5 rounded bg-zinc-800 border-zinc-600 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-zinc-300 font-medium">Destacada</span>
                  </label>
                </div>

                {/* Botones */}
                <div className="flex gap-4 pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 font-bold shadow-lg shadow-amber-500/30"
                  >
                    {editingId ? "Actualizar" : "Crear"} Promoción
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={resetForm}
                    whileHover={{ scale: 1.02 }}
                    className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 font-medium"
                  >
                    Cancelar
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Lista de promociones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-2xl overflow-hidden bg-zinc-800/50 border border-zinc-700 hover:border-amber-500/50 transition-all group"
            >
              {/* Imagen */}
              <div className="relative h-48">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {promo.badge && (
                    <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                      {promo.badge}
                    </span>
                  )}
                  {promo.isFeatured && (
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ⭐ DESTACADA
                    </span>
                  )}
                </div>

                {/* Descuento */}
                <div className="absolute top-3 right-3 bg-amber-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-black shadow-lg">
                  -{promo.discount}%
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 line-clamp-1">
                  {promo.title}
                </h3>
                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                  {promo.description}
                </p>

                {promo.breed && (
                  <div className="mb-4 inline-block bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold">
                    🐕 {promo.breed.name}
                  </div>
                )}

                <div className="text-xs text-zinc-500 mb-4 space-y-1">
                  <div>Inicio: {new Date(promo.startDate).toLocaleString()}</div>
                  <div>Fin: {new Date(promo.endDate).toLocaleString()}</div>
                </div>

                {/* Botones */}
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleActive(promo.id, promo.isActive)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      promo.isActive
                        ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                        : "bg-zinc-700 text-zinc-400 hover:bg-zinc-600"
                    }`}
                  >
                    {promo.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                    {promo.isActive ? "Activa" : "Inactiva"}
                  </button>

                  <button
                    onClick={() => handleEdit(promo)}
                    className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(promo.id)}
                    className="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mensaje cuando no hay promociones */}
        {promotions.length === 0 && !loading && !error && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎁</div>
            <p className="text-2xl text-zinc-400 mb-4">
              No hay promociones creadas
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowForm(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 font-bold"
            >
              Crear Primera Promoción
            </motion.button>
          </div>
        )}

        {/* Floating Action Button - Más visible */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(239, 68, 68, 0.6)",
              "0 0 40px rgba(239, 68, 68, 0.9)",
              "0 0 20px rgba(239, 68, 68, 0.6)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => {
            setEditingId(null);
            resetForm();
            setShowForm(true);
          }}
          className="fixed bottom-10 right-10 w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-pink-500 hover:from-amber-600 hover:to-pink-600 flex items-center justify-center text-white z-[999] transition-all border-3 border-white/30"
        >
          <Plus size={32} />
        </motion.button>
      </div>
    </div>
  );
};

export default AdminPromotions; 