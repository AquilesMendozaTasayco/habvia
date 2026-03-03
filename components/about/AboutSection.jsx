"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  // Variantes para orquestar la aparición de elementos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="w-full py-24 bg-white overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 lg:gap-24 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        
        {/* 🖼️ Columna de Imagen (Lado Izquierdo) */}
        <motion.div 
          className="relative group order-2 md:order-1"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 1 } }
          }}
        >
          {/* Cuadro decorativo de fondo (Bordes Rectos) */}
          <div className="absolute -top-6 -left-6 w-full h-full border border-[#D4A017]/30 z-0 hidden md:block"></div>
          
          {/* Contenedor de Imagen */}
          <div className="relative w-full h-[400px] md:h-[600px] z-10 shadow-2xl overflow-hidden">
            <Image
              src="/img1.png" 
              alt="Arquitectura y Diseño Habvia"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay sutil al hover */}
            <div className="absolute inset-0 bg-[#2C3E73]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Badge de Experiencia Rectangular */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-8 -right-8 bg-[#2C3E73] p-8 z-20 hidden lg:block shadow-xl text-white"
          >
            <p className="text-[#D4A017] text-5xl font-bold leading-none mb-1">10+</p>
            <p className="text-white text-[10px] font-bold tracking-[0.3em] uppercase leading-tight">
              Años de <br /> Excelencia
            </p>
          </motion.div>
        </motion.div>

        {/* 📝 Columna de Texto (Lado Derecho) */}
        <div className="relative z-10 order-1 md:order-2">
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#D4A017]"></div>
            <p className="text-[#D4A017] font-bold tracking-[0.4em] uppercase text-[10px]">
              Nuestra Identidad
            </p>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-light text-[#2C3E73] leading-[1.1] uppercase tracking-tight">
            Pasión por la <br />
            <span className="font-bold">Perfección.</span>
          </motion.h2>

          <motion.div variants={itemVariants} className="mt-10 space-y-8 text-gray-600">
            <p className="text-xl font-light leading-relaxed italic border-l-2 border-[#D4A017] pl-6">
              "En <span className="text-[#2C3E73] font-bold">HABVIA</span>, cada plano es una visión de futuro y cada ladrillo un compromiso con la calidad."
            </p>
            
            <div className="space-y-6 text-base leading-relaxed tracking-wide font-light">
              <p>
                Nos especializamos en transformar terrenos estratégicos en activos de alto valor. Nuestra metodología combina el diseño vanguardista con una rigurosa planificación financiera para asegurar tu inversión.
              </p>
              <p>
                Entendemos que un hogar no es solo un espacio físico, sino el escenario donde se desarrolla tu historia. Por ello, priorizamos la iluminación natural, la ventilación y la optimización de espacios en cada una de nuestras entregas.
              </p>
            </div>
          </motion.div>

          {/* Detalles Técnicos Sutiles */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 grid grid-cols-2 gap-8 border-t border-gray-100 pt-8"
          >
            <div>
              <p className="text-[#2C3E73] font-bold text-xs tracking-widest uppercase mb-1">Ubicación</p>
              <p className="text-gray-500 text-xs uppercase">Lima, Perú</p>
            </div>
            <div>
              <p className="text-[#2C3E73] font-bold text-xs tracking-widest uppercase mb-1">Especialidad</p>
              <p className="text-gray-500 text-xs uppercase">Residencial Premium</p>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}