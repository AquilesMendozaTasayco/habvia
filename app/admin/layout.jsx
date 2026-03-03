"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Sidebar from "@/components/admin/Sidebar";
import { motion } from "framer-motion";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  
  // 🏛️ Identidad Habvia
  const colorHabviaAzul = "#2C3E73";
  const colorHabviaOro = "#D4A017";

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
        if (!isLoginPage) {
          router.push("/admin/login");
        }
      }
    });

    return () => unsubscribe();
  }, [router, isLoginPage]);

  // ⏳ Pantalla de Carga Estilo Habvia (Minimalista y Premium)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <motion.div 
            animate={{ 
              rotate: 360,
              borderTopColor: colorHabviaOro,
              borderRightColor: colorHabviaAzul,
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-10 w-10 rounded-full border-[2px] border-gray-100 mx-auto mb-6"
            style={{ borderTopColor: colorHabviaOro }}
          />
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#2C3E73] opacity-60">
            Panel <span className="text-[#D4A017]">Habvia</span>
          </p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#FDFDFD]">
      {/* Sidebar con estructura técnica */}
      <Sidebar />
      
      <main className="flex-1 overflow-x-hidden">
        {/* Header interno del Admin (opcional, para dar aire) */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 md:px-12">
          <div className="flex items-center gap-4">
            <div className="w-1 h-4 bg-[#D4A017]"></div>
            <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#2C3E73]">
              Gestión de Activos
            </h2>
          </div>
          <div className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
            Administrador
          </div>
        </header>

        {/* Contenido con animación suave */}
        <div className="p-8 md:p-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}