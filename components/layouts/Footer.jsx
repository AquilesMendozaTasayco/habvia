"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlinePhone } from "react-icons/hi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Estilos de enlaces para reutilizar
  const linkStyle = "text-white/60 hover:text-[#D4A017] transition-colors duration-300 text-xs uppercase tracking-widest block py-1";
  const iconBoxStyle = "w-10 h-10 flex items-center justify-center border border-white/10 text-white/80 hover:border-[#D4A017] hover:text-[#D4A017] transition-all duration-300";

  return (
    <footer className="bg-[#1B2A4E] text-white border-t border-[#D4A017]/40">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
          
          {/* 🏛️ Columna 1: Branding & Identidad */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              {/* Aquí iría tu imagen de logo invertida a blanco */}
              <img src="/logo1.png" alt="Habvia Logo" className="h-10 brightness-0 invert" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs font-light">
              Desarrollamos proyectos que trascienden. Excelencia arquitectónica y compromiso con el futuro urbano.
            </p>
            <div className="flex gap-2">
              {[FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp].map((Icon, idx) => (
                <a key={idx} href="#" className={iconBoxStyle}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* 🔗 Columna 2: Navegación Estructural */}
          <div>
            <h4 className="text-[#D4A017] font-bold uppercase tracking-[0.3em] text-[10px] mb-8 border-l-2 border-[#D4A017] pl-3">
              Menú Principal
            </h4>
            <ul className="space-y-4">
              <li><Link href="/" className={linkStyle}>Inicio</Link></li>
              <li><Link href="/nosotros" className={linkStyle}>Nosotros</Link></li>
              <li><Link href="/proyectos" className={linkStyle}>Proyectos</Link></li>
              <li><Link href="/blog" className={linkStyle}>Inversiones</Link></li>
              <li><Link href="/contacto" className={linkStyle}>Contacto</Link></li>
            </ul>
          </div>

          {/* 🏗️ Columna 3: Portafolio Rápido */}
          <div>
            <h4 className="text-[#D4A017] font-bold uppercase tracking-[0.3em] text-[10px] mb-8 border-l-2 border-[#D4A017] pl-3">
              Destacados
            </h4>
            <ul className="space-y-4">
              <li><Link href="#" className={linkStyle}>Residencial Olivos</Link></li>
              <li><Link href="#" className={linkStyle}>Edificio Mirador</Link></li>
              <li><Link href="#" className={linkStyle}>Luxury Towers</Link></li>
              <li><Link href="#" className={linkStyle}>Condominio Prado</Link></li>
            </ul>
          </div>

          {/* 📍 Columna 4: Datos de Contacto */}
          <div>
            <h4 className="text-[#D4A017] font-bold uppercase tracking-[0.3em] text-[10px] mb-8 border-l-2 border-[#D4A017] pl-3">
              Contacto
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <HiOutlineLocationMarker className="text-[#D4A017] mt-1" size={20} />
                <p className="text-white/60 text-xs leading-relaxed uppercase tracking-wider">
                  Av. Principal 123, San Isidro <br /> Lima, Perú
                </p>
              </div>
              <div className="flex items-center gap-4 group">
                <HiOutlinePhone className="text-[#D4A017]" size={20} />
                <p className="text-white/60 text-xs tracking-widest">+51 987 654 321</p>
              </div>
              <div className="flex items-center gap-4 group">
                <HiOutlineMail className="text-[#D4A017]" size={20} />
                <p className="text-white/60 text-xs tracking-widest lowercase">contacto@habvia.com</p>
              </div>
            </div>
          </div>

        </div>

        {/* 📜 Barra Legal Inferior */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase">
            © {currentYear} HABVIA INMOBILIARIA. Desarrollo de alto valor.
          </p>
          <div className="flex gap-8 text-[10px] tracking-[0.2em] text-white/30 uppercase">
            <Link href="#" className="hover:text-[#D4A017] transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-[#D4A017] transition-colors">Legales</Link>
            <Link href="#" className="hover:text-[#D4A017] transition-colors">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}