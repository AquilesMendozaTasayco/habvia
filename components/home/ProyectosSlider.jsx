"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";

const proyectos = [
  {
    id: "bejarano-468",
    titulo: "BEJARANO 468",
    estado: "PREVENTA",
    descripcion:
      "Espacios modernos diseñados para tu comodidad, en una ubicación estratégica y con excelente proyección de valorización.",
    caracteristicas: [
      "Departamentos de 1, 2 y 3 dormitorios",
      "Áreas desde 45 m² hasta 117 m²",
      "Opciones Flats y Dúplex",
      "Ubicación: San Juan de Miraflores",
    ],
    imagenPrincipal: "/dia.jpeg",
    imagenHover: "/noche.jpeg",
    href: "/proyectos/bejarano-468",
  },
  // Puedes agregar más proyectos aquí
];

function BadgeEstado({ estado }) {
  return (
    <span className="bg-[#D4A017] text-[#2C3E73] px-4 py-1 text-[10px] font-bold tracking-[0.2em] uppercase">
      {estado}
    </span>
  );
}

export default function ProyectosSlider() {
  const [index, setIndex] = useState(0);
  const total = proyectos.length;
  const proyecto = proyectos[index];

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="w-full py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 🏛️ Header Seccional */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-[#D4A017]"></div>
              <p className="text-[#D4A017] font-bold tracking-[0.3em] uppercase text-xs">
                Inversiones Exclusivas
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-[#2C3E73] leading-tight">
              Nuestros <span className="font-bold">PROYECTOS</span>
            </h2>
          </div>

          {/* Controles Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={prev}
              className="p-4 border border-[#2C3E73]/10 text-[#2C3E73] hover:bg-[#D4A017] hover:border-[#D4A017] transition-all duration-300"
            >
              <HiOutlineArrowLeft size={20} />
            </button>
            <button
              onClick={next}
              className="p-4 border border-[#2C3E73]/10 text-[#2C3E73] hover:bg-[#D4A017] hover:border-[#D4A017] transition-all duration-300"
            >
              <HiOutlineArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* 🖼️ Contenedor del Slide */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={proyecto.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Imagen Izquierda (Efecto Swap) */}
            <div className="group relative w-full h-[400px] md:h-[550px] overflow-hidden shadow-2xl">
              <Image
                src={proyecto.imagenPrincipal}
                alt={proyecto.titulo}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-0"
                priority
              />
              <Image
                src={proyecto.imagenHover}
                alt={proyecto.titulo}
                fill
                className="object-cover scale-105 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
              />
              <div className="absolute top-0 left-0 z-10">
                <BadgeEstado estado={proyecto.estado} />
              </div>
              <div className="absolute inset-0 bg-[#2C3E73]/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Info Derecha */}
            <div className="space-y-8">
              <h3 className="text-3xl md:text-4xl font-bold text-[#2C3E73] tracking-tight">
                {proyecto.titulo}
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed font-light italic">
                "{proyecto.descripcion}"
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {proyecto.caracteristicas.map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-[#D4A017]" />
                    <span className="text-gray-700 text-sm uppercase tracking-wider font-medium">{c}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex flex-col sm:flex-row items-center gap-8">
                <Link
                  href={proyecto.href}
                  className="w-full sm:w-auto inline-block border-2 border-[#2C3E73] text-[#2C3E73] px-10 py-4 font-bold tracking-[0.2em] uppercase text-xs hover:bg-[#2C3E73] hover:text-white transition-all duration-300"
                >
                  Ver Detalles
                </Link>

                {/* Indicadores Lineales */}
                <div className="flex items-center gap-3">
                  {proyectos.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setIndex(i)}
                      className={`h-[2px] transition-all duration-500 ${
                        i === index ? "w-12 bg-[#D4A017]" : "w-6 bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles Móvil */}
        <div className="mt-12 flex md:hidden items-center gap-2">
          <button onClick={prev} className="flex-1 py-4 border border-[#2C3E73] text-[#2C3E73] font-bold uppercase text-[10px] tracking-widest">
            Anterior
          </button>
          <button onClick={next} className="flex-1 py-4 bg-[#2C3E73] text-white font-bold uppercase text-[10px] tracking-widest">
            Siguiente
          </button>
        </div>

      </div>
    </section>
  );
}