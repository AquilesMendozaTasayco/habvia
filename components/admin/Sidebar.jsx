"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  LayoutDashboard,
  Building2,
  LogOut,
  ChevronRight,
  User,
  Settings,
  Circle
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const colorAzul = "#2C3E73";
  const colorOro = "#D4A017";

  const items = [
    { label: "Banners Hero", href: "/admin/banners", icon: LayoutDashboard },
    { label: "Proyectos", href: "/admin/proyectos", icon: Building2 },
    // { label: "Configuración", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    if (isLoggingOut) return;
    try {
      setIsLoggingOut(true);
      await signOut(auth);
      router.push("/admin/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside 
      className="sticky top-0 h-screen w-[280px] flex-shrink-0 flex flex-col z-50 shadow-2xl border-r border-white/5"
      style={{ backgroundColor: colorAzul }}
    >
      
      {/* 🏛️ HEADER (LOGOTIPO MÁS GRANDE) */}
      <div className="p-10 border-b border-white/5">
        {/* Se incrementó la altura de h-[45px] a h-[65px] */}
        <div className="relative w-full h-[65px] mb-6 brightness-0 invert"> 
          <Image
            src="/logo1.png"
            alt="Habvia Logo"
            fill
            sizes="200px"
            className="object-contain object-left"
            priority
          />
        </div>
        <div className="flex items-center gap-3">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 24 }}
            className="h-[2px]" 
            style={{ backgroundColor: colorOro }} 
          />
          <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/40">
            Console
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-10 space-y-1">
        <p className="px-6 mb-6 text-[8px] font-bold uppercase tracking-[0.4em] text-white/20">
          Management
        </p>

        {items.map((it) => {
          const active = pathname === it.href || pathname.startsWith(it.href + "/");
          const Icon = it.icon;

          return (
            <Link key={it.href} href={it.href} className="block group">
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
                className={`relative flex items-center justify-between px-6 py-4 transition-all duration-500 rounded-sm ${
                  active 
                    ? "bg-white/[0.04] text-white" 
                    : "text-white/40 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-4 z-10">
                  <Icon
                    size={16}
                    strokeWidth={active ? 2 : 1.5}
                    className={`transition-colors duration-500 ${active ? 'text-[#D4A017]' : 'currentColor'}`}
                  />
                  <span 
                    className={`text-[10px] font-bold uppercase tracking-[0.25em] transition-all ${
                      active ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                    }`}
                  >
                    {it.label}
                  </span>
                </div>

                {/* Indicador de Activación Habvia */}
                {active && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute right-0 w-[3px] h-5"
                    style={{ backgroundColor: colorOro }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* 👤 PERFIL Y LOGOUT */}
      <div className="mt-auto p-8 bg-black/10 border-t border-white/5">
        <div className="flex items-center gap-4 mb-8 px-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 overflow-hidden">
            <User size={18} className="text-white/30" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white">Admin</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Circle size={6} fill={colorOro} className="text-[#D4A017] animate-pulse" />
              <p className="text-[8px] font-medium text-white/20 uppercase tracking-tighter italic">System Active</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="group flex w-full items-center justify-center gap-3 py-4 bg-white text-[#2C3E73] font-bold transition-all duration-500 hover:bg-[#D4A017] hover:tracking-[0.1em] disabled:opacity-50"
        >
          <LogOut size={14} className={`${isLoggingOut ? 'animate-spin' : ''}`} />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
            {isLoggingOut ? "Ending..." : "Logout"}
          </span>
        </button>
      </div>
    </aside>
  );
}