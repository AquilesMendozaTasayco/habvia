"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NosotrosSection() {
  // Variantes para animar el contenedor y los hijos de forma orquestada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Retraso entre cada elemento hijo
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full py-24 bg-white overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} // Se activa cuando entra en el scroll
        variants={containerVariants}
      >
        
        {/* 📝 Columna de Texto */}
        <div className="relative z-10">
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-[#D4A017]"></div>
            <p className="text-[#D4A017] font-bold tracking-[0.2em] uppercase text-sm">
              Nuestra Esencia
            </p>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-light text-[#2C3E73] leading-tight">
            Construimos espacios para <br />
            <span className="font-bold text-[#2C3E73]">una mejor vida.</span>
          </motion.h2>

          <motion.div variants={itemVariants} className="mt-8 space-y-6 text-gray-600 text-lg leading-relaxed max-w-xl">
            <p>
              En <span className="text-[#2C3E73] font-semibold">Habvia</span> no solo levantamos estructuras; diseñamos entornos donde el bienestar y la modernidad convergen para crear hogares con propósito.
            </p>
            <p>
              Cada proyecto es una promesa de valorización e inversión segura, 
              seleccionando ubicaciones estratégicas que garantizan comodidad y funcionalidad en cada metro cuadrado.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10">
            <Link
              href="/nosotros"
              className="inline-block border-2 border-[#2C3E73] text-[#2C3E73] px-10 py-4 font-bold tracking-widest uppercase text-sm hover:bg-[#2C3E73] hover:text-white transition-all duration-300"
            >
              Conoce nuestra historia
            </Link>
          </motion.div>
        </div>

        {/* 🖼️ Columna de Imagen */}
        <motion.div 
          className="relative group"
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }
          }}
        >
          {/* Cuadro decorativo de fondo */}
          <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#D4A017] z-0 hidden md:block transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
          
          {/* Contenedor de Imagen */}
          <div className="relative w-full h-[400px] md:h-[550px] z-10 shadow-2xl transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2">
            <Image
              src="/img1.png"
              alt="Arquitectura Habvia"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Badge de Experiencia */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -top-6 -left-6 bg-[#D4A017] p-6 z-20 hidden lg:block shadow-lg"
          >
            <p className="text-[#2C3E73] text-4xl font-bold">10+</p>
            <p className="text-[#2C3E73] text-xs font-bold tracking-tighter uppercase leading-tight">
              Años de <br /> Trayectoria
            </p>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}