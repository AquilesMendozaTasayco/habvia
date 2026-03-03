"use client";

import { motion } from "framer-motion";
import { HiOutlineLightBulb, HiOutlineShieldCheck, HiOutlineTrendingUp } from "react-icons/hi";

const CARDS = [
  {
    id: 1,
    title: "MISIÓN",
    icon: <HiOutlineShieldCheck size={32} />,
    text: "Transformar el entorno urbano mediante proyectos inmobiliarios de alta calidad, garantizando seguridad, rentabilidad y bienestar para nuestros clientes.",
  },
  {
    id: 2,
    title: "VISIÓN",
    icon: <HiOutlineLightBulb size={32} />,
    text: "Ser la inmobiliaria líder en innovación y diseño arquitectónico en Lima, reconocida por nuestra integridad y compromiso con el desarrollo sostenible.",
  },
  {
    id: 3,
    title: "OBJETIVOS",
    icon: <HiOutlineTrendingUp size={32} />,
    text: "Maximizar el valor de cada m², entregar proyectos en los tiempos acordados y superar las expectativas de confort de cada una de nuestras familias.",
  },
];

export default function MisionVisionSection() {
  return (
    <section className="relative w-full py-28 overflow-hidden bg-[#1B2A4E]">
      
      {/* 🖼️ Imagen de Fondo con Filtro Oscuro */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img1.png" // Reemplaza con una foto de edificio o textura de lujo
          alt="Habvia Background"
          className="w-full h-full object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-[#1B2A4E]/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 📝 Encabezado Central */}
        <div className="text-center mb-20">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="w-10 h-[1px] bg-[#D4A017]"></div>
            <p className="text-[#D4A017] font-bold tracking-[0.4em] uppercase text-[10px]">
              FILOSOFÍA CORPORATIVA
            </p>
            <div className="w-10 h-[1px] bg-[#D4A017]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white uppercase tracking-tight">
            Nuestros <span className="font-bold">PILARES</span>
          </h2>
        </div>

        {/* 🗂️ Grid de Tarjetas de Vidrio (Bordes Rectos) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
          {CARDS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className={`relative p-12 flex flex-col items-center text-center group transition-all duration-500
                ${idx !== 2 ? "md:border-r border-b md:border-b-0 border-white/10" : ""}
                hover:bg-white/[0.03]`}
            >
              {/* Icono Dorado */}
              <div className="mb-8 text-[#D4A017] transition-transform duration-500 group-hover:scale-110">
                {item.icon}
              </div>

              {/* Título con línea inferior */}
              <h3 className="text-white font-bold tracking-[0.3em] text-sm mb-6 uppercase">
                {item.title}
                <div className="w-8 h-[2px] bg-[#D4A017] mx-auto mt-4 transition-all duration-500 group-hover:w-16"></div>
              </h3>

              {/* Texto de la Card */}
              <p className="text-white/60 font-light leading-relaxed text-sm tracking-wide">
                {item.text}
              </p>

              {/* Decoración en las esquinas (Opcional para look técnico) */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}