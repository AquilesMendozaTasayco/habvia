"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PageHero({ title, description, image }) {
  // Dividimos el título para aplicar estilos diferentes a la última palabra
  const words = title.split(' ');
  const lastWord = words.pop();
  const firstPart = words.join(' ');

  return (
    <section className="relative w-full h-[45vh] min-h-[420px] flex items-center overflow-hidden bg-[#1B2A4E]">
      
      {/* 🖼️ Imagen de fondo con zoom out */}
      <motion.div 
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* 🟦 Overlay Azul Sutil (Transparencia equilibrada) */}
      <div className="absolute inset-0 z-10 bg-[#2C3E73]/50 backdrop-blur-[1px]" />

      {/* 📝 Contenido con Padding Top para respetar el Navbar */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-16 w-full pt-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Subtítulo pegado al título */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-[2px] bg-[#D4A017]"></div>
            <p className="text-[#D4A017] font-bold tracking-[0.3em] uppercase text-[9px] md:text-[10px]">
              HABVIA INMOBILIARIA
            </p>
          </div>

          {/* Título Monumental - Más cerca del subtítulo */}
          <h1 className="text-5xl md:text-7xl font-light text-white leading-[0.95] tracking-tight uppercase">
            {firstPart} <span className="font-bold block md:inline">{lastWord}</span>
          </h1>

          {description && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 border-l border-[#D4A017] pl-5 max-w-xl"
            >
              <p className="text-sm md:text-base text-white/80 font-light leading-relaxed tracking-wide italic">
                {description}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Línea inferior dorada minimalista */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4A017]/40 z-40" />
    </section>
  );
}