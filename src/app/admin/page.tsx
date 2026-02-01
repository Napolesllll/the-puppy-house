// src/app/admin/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, PawPrint, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<"categories" | "breeds" | "promotions">(
    "categories"
  );

  const menuItems = [
    {
      id: "categories" as const,
      label: "Categorías",
      icon: "🏷️",
      description: "Gestiona las categorías de razas",
    },
    {
      id: "breeds" as const,
      label: "Razas",
      icon: "🐕",
      description: "Gestiona las razas y sus datos",
    },
    {
      id: "promotions" as const,
      label: "Promociones",
      icon: "🎁",
      description: "Gestiona ofertas y promociones especiales",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white">
      {/* Navbar Sticky */}
      <div className="sticky top-0 z-[9999] backdrop-blur-xl bg-zinc-900/95 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <PawPrint className="w-8 h-8 text-amber-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">The Puppy House Admin</h1>
              <p className="text-xs text-amber-400/70">Panel de administración</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
              >
                Ir al sitio
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                router.push("/admin/login");
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 hover:text-amber-300 transition-all font-medium text-sm shadow-lg shadow-amber-500/20"
            >
              <LogOut size={16} />
              Cerrar sesión
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Grid de opciones principales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveSection(item.id)}
              className={`p-8 rounded-2xl border-2 transition-all text-left ${
                activeSection === item.id
                  ? "bg-gradient-to-br from-amber-500/20 to-rose-500/20 border-amber-400 shadow-lg shadow-amber-400/20"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.label}</h3>
              <p className="text-zinc-300 text-sm">{item.description}</p>
              <div className="mt-4 flex items-center gap-2 text-amber-400">
                <span className="text-xs font-medium">ACCEDER</span>
                <ChevronRight size={16} />
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Contenido dinámico */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === "categories" && (
            <Link href="/admin/categories">
              <AdminSectionCard
                title="Gestión de Categorías"
                description="Crea, edita y elimina categorías de razas"
              />
            </Link>
          )}

          {activeSection === "breeds" && (
            <Link href="/admin/breeds">
              <AdminSectionCard
                title="Gestión de Razas"
                description="Administra todas las razas, precios e imágenes"
              />
            </Link>
          )}

          {activeSection === "promotions" && (
            <Link href="/admin/promotions">
              <AdminSectionCard
                title="Gestión de Promociones"
                description="Crea y administra ofertas especiales y descuentos"
              />
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const AdminSectionCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur cursor-pointer hover:border-amber-400/50 transition-colors"
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-zinc-300 mb-6">{description}</p>
      <div className="flex items-center gap-2 text-amber-400">
        <span className="text-sm font-medium">Acceder →</span>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;