// app/loading.tsx
"use client";   // porque LoadingScreen es client component

import LoadingScreen from "@/components/LoadingScreen";

export default function Loading() {
    return <LoadingScreen />;   // sin onComplete → se oculta sola después del 100 %
}