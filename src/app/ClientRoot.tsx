"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import LoadingScreen from "@/components/LoadingScreen";
import DogAssistant from "@/components/DogAssistant";
import FloatingThoughts from "@/components/FloatingThoughts";
import WhatsappButton from "@/components/WhatsappButton";
import { Section } from "@/components/Footer";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const [currentSection, setCurrentSection] = useState<Section>("inicio");
  const [showLoading, setShowLoading] = useState(true);   // ← nuevo
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith("/admin");
  const isBreedRoute = pathname?.startsWith("/razas");
  const shouldShowNav = !isAdminRoute && !isBreedRoute;

  const handleNavigate = (section: Section) => {
    setCurrentSection(section);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Loading con animación de salida suave */}
      <AnimatePresence mode="wait">
        {showLoading && (
          <LoadingScreen
            key="loading-screen"
            onComplete={() => setShowLoading(false)}
          />
        )}
      </AnimatePresence>

      {shouldShowNav && (
        <Nav
          currentSection={currentSection}
          onNavigate={handleNavigate}
          isModalOpen={false}
        />
      )}

      <main className="flex-grow">{children}</main>

      <div
        role="complementary"
        className="fixed bottom-6 right-6 flex items-center gap-6 z-50"
      >
        <WhatsappButton />
        <FloatingThoughts />
        <div className="ml-4">
          <DogAssistant />
        </div>
      </div>
    </div>
  );
}