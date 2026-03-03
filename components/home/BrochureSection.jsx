"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineDownload } from "react-icons/hi";

export default function BrochureSection() {
  return (
    <section className="relative w-full py-16 overflow-hidden group">
      
      {/* 🖼️ Imagen de Fondo (Efecto sutil) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
        style={{ 
          backgroundImage: "url('/img1.png')", 
        }}
      />

      {/* 🟦 Overlay Azul Vidrio (Reduje la opacidad a /90 para que sea más sólido y elegante) */}
      <div className="absolute inset-0 z-10 bg-[#2C3E73]/90 backdrop-blur-sm" />

      {/* Línea decorativa dorada superior */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4A017]/30 z-20" />

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-20 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        
        {/* 📝 Texto Compacto */}
        <div className="max-w-xl text-center md:text-left flex-1">
          <h3 className="text-2xl md:text-3xl font-light text-white leading-tight">
            Descubre los detalles de <br />
            <span className="font-bold uppercase tracking-tight text-[#D4A017]">nuestro portafolio.</span>
          </h3>
          <p className="mt-2 text-white/70 text-base font-light">
            Planos, acabados y proyecciones de inversión en un solo documento.
          </p>
        </div>

        {/* 📥 Botón Ajustado (Bordes rectos) */}
        <motion.div
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="flex-shrink-0"
        >
          <Link
            href="/brochure.pdf"
            target="_blank"
            className="flex items-center gap-3 bg-[#D4A017] text-[#2C3E73] font-bold px-8 py-4 transition-all duration-300 hover:bg-white tracking-widest uppercase text-xs"
          >
            <HiOutlineDownload size={18} />
            Descargar brochure
          </Link>
        </motion.div>

      </motion.div>
    </section>
  );
}