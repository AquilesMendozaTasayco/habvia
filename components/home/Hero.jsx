"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const slides = [
  {
    id: 1,
    lema: "EXCLUSIVIDAD EN CADA DETALLE",
    subtitulo: "Proyectos inmobiliarios diseñados para una nueva forma de vivir.",
    imagen: "/img1.png",
    boton: "DESCUBRIR PROYECTO",
    href: "/proyectos/proyecto-1",
  },
  {
    id: 2,
    lema: "EL HOGAR QUE SIEMPRE SOÑASTE",
    subtitulo: "Ubicaciones privilegiadas con acabados de primera clase.",
    imagen: "/img1.png",
    boton: "VER DETALLES",
    href: "/proyectos/proyecto-2",
  },
  {
    id: 3,
    lema: "INVERSIÓN SEGURA Y MODERNA",
    subtitulo: "Garantizamos plusvalía y confort en cada metro cuadrado.",
    imagen: "/img1.png",
    boton: "MÁS INFORMACIÓN",
    href: "/proyectos/proyecto-3",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating]);

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 1000);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[90vh] md:h-screen bg-black overflow-hidden">
      
      {/* 🖼️ Imágenes de Fondo con Zoom Suave */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url(${slide.imagen})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transitionProperty: "opacity, transform",
            transitionDuration: "1500ms"
          }}
        />
      ))}

      {/* 🏛️ Contenido Central */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-3xl text-white">
          
          <div className="overflow-hidden">
            <p className={`text-[#D4A017] font-bold tracking-[0.3em] uppercase text-sm md:text-base transition-transform duration-700 ${isAnimating ? "translate-y-full" : "translate-y-0"}`}>
              HABVIA INMOBILIARIA
            </p>
          </div>

          <div className="overflow-hidden mt-2">
            <h1 className={`text-4xl md:text-7xl font-light leading-tight transition-transform duration-700 delay-100 ${isAnimating ? "translate-y-full" : "translate-y-0"}`}>
              {slides[index].lema.split(" ").map((word, i) => (
                <span key={i} className={i === 1 ? "font-bold" : ""}>{word} </span>
              ))}
            </h1>
          </div>

          <div className="overflow-hidden mt-6">
            <p className={`text-lg md:text-xl text-white/70 max-w-xl transition-transform duration-700 delay-200 ${isAnimating ? "translate-y-full" : "translate-y-0"}`}>
              {slides[index].subtitulo}
            </p>
          </div>

          <div className="mt-10">
            <Link
              href={slides[index].href}
              className="inline-block border-2 border-[#D4A017] text-white hover:bg-[#D4A017] hover:text-[#2C3E73] font-bold px-10 py-4 transition-all duration-300 tracking-widest text-sm"
            >
              {slides[index].boton}
            </Link>
          </div>
        </div>
      </div>

      {/* ↔️ Controles (Flechas) - Ocultas en móvil para limpieza */}
      <div className="hidden md:flex absolute inset-0 items-center justify-between px-8 z-20 pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto p-3 border border-white/20 text-white hover:bg-[#D4A017] hover:border-[#D4A017] transition-all duration-300"
        >
          <HiOutlineChevronLeft size={30} />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto p-3 border border-white/20 text-white hover:bg-[#D4A017] hover:border-[#D4A017] transition-all duration-300"
        >
          <HiOutlineChevronRight size={30} />
        </button>
      </div>

      {/* 🔢 Indicadores Rectangulares */}
      <div className="absolute bottom-10 right-6 md:right-12 flex gap-4 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setIndex(i);
                setTimeout(() => setIsAnimating(false), 1000);
              }
            }}
            className="group flex items-center gap-2 focus:outline-none"
          >
            <span className={`text-xs font-bold transition-colors ${i === index ? "text-[#D4A017]" : "text-white/40"}`}>
              0{i + 1}
            </span>
            <div
              className={`h-[2px] transition-all duration-500 ${
                i === index ? "w-12 bg-[#D4A017]" : "w-6 bg-white/20 group-hover:bg-white/50"
              }`}
            />
          </button>
        ))}
      </div>

      {/* 🌫️ Gradiente inferior para mejorar legibilidad del scroll */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </section>
  );
}