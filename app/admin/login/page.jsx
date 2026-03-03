"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Lock, Mail, ChevronRight, Loader2, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🏛️ Identidad Habvia
  const colorAzul = "#2C3E73";
  const colorOro = "#D4A017";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/banners");
    } catch (err) {
      setError("Credenciales no reconocidas por el sistema.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* Fondo Arquitectónico Sutil */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ 
          backgroundImage: `radial-gradient(${colorAzul} 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[460px] bg-white border border-gray-100 shadow-[0_30px_100px_-20px_rgba(44,62,115,0.1)] relative z-10"
      >
        {/* Línea de Autoridad Habvia */}
        <div className="h-[3px] w-full flex">
          <div className="h-full w-full" style={{ backgroundColor: colorAzul }} />
        </div>

        <div className="p-12 md:p-16">
          <div className="text-center mb-12">
            <motion.div 
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              className="inline-flex items-center justify-center mb-6"
            >
              <Award className="h-10 w-10 font-light" style={{ color: colorOro }} />
            </motion.div>
            
            <h1 className="text-3xl font-light uppercase tracking-[0.2em] text-[#2C3E73]">
              HAB<span className="font-bold">VIA</span>
            </h1>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-[1px] w-8 bg-gray-200" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
                Administrative Portal
              </p>
              <div className="h-[1px] w-8 bg-gray-200" />
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {/* Campo Email */}
            <div className="space-y-3">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
                Identidad Digital
              </label>
              <div className="relative group">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-[#D4A017] transition-colors" />
                <input
                  type="email"
                  placeholder="admin@habvia.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-b border-gray-200 bg-transparent pl-8 py-3 text-sm font-light text-[#2C3E73] outline-none transition-all focus:border-[#2C3E73]"
                />
              </div>
            </div>

            {/* Campo Password */}
            <div className="space-y-3">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 flex items-center gap-2">
                Clave de Acceso
              </label>
              <div className="relative group">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 group-focus-within:text-[#D4A017] transition-colors" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border-b border-gray-200 bg-transparent pl-8 py-3 text-sm font-light text-[#2C3E73] outline-none transition-all focus:border-[#2C3E73]"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-50 border-l-2 border-[#D4A017] p-4"
              >
                <p className="text-[10px] font-bold uppercase text-[#D4A017] tracking-widest">
                  Error de autenticación
                </p>
                <p className="text-[11px] text-gray-500 mt-1">{error}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative flex items-center justify-center py-6 px-6 text-[10px] font-bold uppercase tracking-[0.4em] text-white transition-all duration-500 hover:tracking-[0.5em] active:scale-[0.99] disabled:opacity-50 overflow-hidden group"
              style={{ backgroundColor: colorAzul }}
            >
              <div className="absolute inset-0 w-0 bg-[#D4A017] transition-all duration-500 group-hover:w-full -z-0 opacity-20" />
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              ) : (
                <span className="relative z-10 flex items-center">
                  Ingresar al sistema
                  <ChevronRight className="ml-2 h-3 w-3" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-16 text-center">
            <p className="text-[9px] font-medium uppercase tracking-[0.5em] text-gray-300">
              © 2026 Habvia <span className="mx-2">|</span> High-End Assets
            </p>
          </div>
        </div>
      </motion.div>

      {/* Acento Decorativo Final */}
      <div className="absolute bottom-10 left-10 flex gap-10 opacity-20">
        <div className="w-[1px] h-20 bg-[#D4A017]" />
        <div className="text-[10px] font-light text-[#2C3E73] [writing-mode:vertical-rl] uppercase tracking-[0.8em]">
          Architecture & Soul
        </div>
      </div>
    </div>
  );
}