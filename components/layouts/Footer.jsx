"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlinePhone } from "react-icons/hi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // 🏛️ Estilos Habvia Luxury
  const linkStyle = "text-white/50 hover:text-[#D4A017] transition-all duration-300 text-[10px] uppercase tracking-[0.2em] block py-1 hover:translate-x-1";
  const iconBoxStyle = "w-10 h-10 flex items-center justify-center border border-white/10 text-white/80 hover:border-[#D4A017] hover:text-[#D4A017] transition-all duration-400 rounded-sm";

  return (
    <footer className="bg-[#1B2A4E] text-white border-t border-[#D4A017]/30">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          
          {/* 🏛️ Columna 1: Branding & Identidad */}
          <div className="space-y-10">
            <div className="flex items-center">
              <img src="/logo1.png" alt="Habvia Logo" className="h-12 brightness-0 invert" />
            </div>
            <p className="text-white/40 text-[11px] leading-relaxed max-w-xs font-medium uppercase tracking-wider">
              Desarrollamos proyectos que trascienden. Excelencia arquitectónica y compromiso con el futuro urbano de Lima.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.facebook.com/HabviaInmobiliaria/" target="_blank" rel="noopener noreferrer" className={iconBoxStyle}>
                <FaFacebookF size={14} />
              </a>
              <a href="https://www.instagram.com/habvia.inmobiliaria/" target="_blank" rel="noopener noreferrer" className={iconBoxStyle}>
                <FaInstagram size={14} />
              </a>
              <a href="https://www.tiktok.com/@habvia.inmobiliariaperu" target="_blank" rel="noopener noreferrer" className={iconBoxStyle}>
                <FaTiktok size={14} />
              </a>
              <a href="https://www.youtube.com/@HABVIAInmobiliaria" target="_blank" rel="noopener noreferrer" className={iconBoxStyle}>
                <FaYoutube size={14} />
              </a>
              <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer" className={iconBoxStyle}>
                <FaWhatsapp size={14} />
              </a>
            </div>
          </div>

          {/* 🔗 Columna 2: Navegación Estructural (Ajustada) */}
          <div>
            <h4 className="text-[#D4A017] font-bold uppercase tracking-[0.4em] text-[9px] mb-10 border-l border-[#D4A017] pl-4">
              Navegación Center
            </h4>
            <ul className="space-y-5">
              <li><Link href="/" className={linkStyle}>Principal</Link></li>
              <li><Link href="/nosotros" className={linkStyle}>Nuestra Historia</Link></li>
              <li><Link href="/contacto" className={linkStyle}>Central de Contacto</Link></li>
              <li><Link href="/admin/login" className={linkStyle}>Acceso Corporativo</Link></li>
            </ul>
          </div>

          {/* 🏗️ Columna 3: Ecosistema Habvia (General) */}
          <div>
            <h4 className="text-[#D4A017] font-bold uppercase tracking-[0.4em] text-[9px] mb-10 border-l border-[#D4A017] pl-4">
              Ecosistema
            </h4>
            <ul className="space-y-5">
              <li><Link href="#" className={linkStyle}>Garantía Inmobiliaria</Link></li>
              <li><Link href="#" className={linkStyle}>Procesos Constructivos</Link></li>
              <li><Link href="#" className={linkStyle}>Sostenibilidad</Link></li>
              <li><Link href="#" className={linkStyle}>Atención al Propietario</Link></li>
            </ul>
          </div>

          {/* 📍 Columna 4: Datos de Contacto (Dirección Real) */}
          <div>
            <h4 className="text-[#D4A017] font-bold uppercase tracking-[0.4em] text-[9px] mb-10 border-l border-[#D4A017] pl-4">
              Ubicación & HQ
            </h4>
            <div className="space-y-8">
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="p-2 border border-white/5 group-hover:border-[#D4A017]/50 transition-colors">
                  <HiOutlineLocationMarker className="text-[#D4A017]" size={18} />
                </div>
                <p className="text-white/50 text-[10px] leading-relaxed uppercase tracking-[0.15em]">
                  Jirón Francisco Bejarano 468 <br /> 
                  <span className="text-white/30">San Juan de Miraflores, Lima</span>
                </p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-2 border border-white/5">
                  <HiOutlinePhone className="text-[#D4A017]" size={18} />
                </div>
                <p className="text-white/50 text-[10px] tracking-[0.2em]">+51 987 654 321</p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-2 border border-white/5">
                  <HiOutlineMail className="text-[#D4A017]" size={18} />
                </div>
                <p className="text-white/50 text-[10px] tracking-[0.1em] lowercase">contacto@habvia.com</p>
              </div>
            </div>
          </div>

        </div>

        {/* 📜 Barra Legal Inferior */}
        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] tracking-[0.3em] text-white/20 uppercase font-medium">
            © {currentYear} HABVIA INMOBILIARIA. All Rights Reserved.
          </p>
          <div className="flex gap-10 text-[9px] tracking-[0.3em] text-white/20 uppercase font-medium">
            <Link href="#" className="hover:text-[#D4A017] transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-[#D4A017] transition-colors">Términos</Link>
            <Link href="#" className="hover:text-[#D4A017] transition-colors">Libro de Reclamos</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}