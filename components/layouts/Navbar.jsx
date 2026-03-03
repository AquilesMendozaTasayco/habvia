"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { HiMenuAlt3, HiX, HiChevronDown } from "react-icons/hi";

const NAV_LINKS = [
  { name: "INICIO", href: "/" },
  { name: "NOSOTROS", href: "/nosotros" },
  // { name: "BLOG", href: "/blog" },
  { name: "CONTACTO", href: "/contacto" },
];

const PROJECTS = [
  { name: "PROYECTO 1", href: "/proyectos/bejarano-468" },
];

const SOCIAL_LINKS = [
  { Icon: FaFacebookF, url: "https://www.facebook.com/HabviaInmobiliaria/?wa_status_inline=true&ref=1" },
  { Icon: FaInstagram, url: "https://www.instagram.com/habvia.inmobiliaria/?wa_status_inline=true" },
  { Icon: FaTiktok, url: "https://www.tiktok.com/@habvia.inmobiliariaperu?_r=1&_t=ZS-93ohjdv8p8R" },
  { Icon: FaYoutube, url: "https://www.youtube.com/@HABVIAInmobiliaria" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyle = "relative text-white/90 hover:text-[#D4A017] transition-colors duration-300 tracking-[0.1em] text-xs font-bold after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-[#D4A017] after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left py-1";

  return (
    <nav 
      className={`w-full fixed top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-[#2C3E73] shadow-lg py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* 🟦 Logo */}
        <Link href="/" className="transition-transform hover:scale-105 flex items-center">
          <Image
            src="/logo1.png"
            alt="Habvia Logo"
            width={150}
            height={45}
            priority
            className="object-contain"
          />
        </Link>

        {/* 💻 Menú Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkStyle}>
              {link.name}
            </Link>
          ))}

          {/* Dropdown Proyectos */}
          <div className="relative group cursor-pointer py-1">
            <div className="flex items-center gap-1.5 text-white/90 group-hover:text-[#D4A017] transition-colors duration-300 tracking-[0.1em] text-xs font-bold">
              <span>PROYECTOS EN VENTA</span>
              <HiChevronDown className="group-hover:rotate-180 transition-transform duration-300 text-sm" />
            </div>

            <div className="absolute left-0 mt-3 w-56 bg-white shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
              {PROJECTS.map((project) => (
                <Link
                  key={project.href}
                  href={project.href}
                  className="block px-5 py-3 text-gray-700 hover:bg-[#2C3E73]/5 hover:text-[#2C3E73] transition-colors border-l-4 border-transparent hover:border-[#D4A017] text-[10px] font-bold tracking-widest"
                >
                  {project.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 🌐 Redes Sociales Desktop */}
        <div className="hidden lg:flex items-center space-x-1">
          {SOCIAL_LINKS.map(({ Icon, url }, idx) => (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-[#D4A017] hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* 📱 Botón Móvil */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-3xl focus:outline-none"
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* 📱 Menú Móvil */}
      <div 
        className={`md:hidden bg-[#243361] border-t border-white/5 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-8 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="block text-white/90 text-sm font-bold tracking-[0.2em] py-2 hover:text-[#D4A017]"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-white/5">
            <p className="text-[#D4A017] text-[10px] font-bold uppercase mb-4 tracking-[0.3em]">Proyectos</p>
            {PROJECTS.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="block text-white/70 py-2 hover:text-[#D4A017] text-xs font-medium"
                onClick={() => setIsOpen(false)}
              >
                {project.name}
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-white/5 flex space-x-6 justify-center text-white/70">
            {SOCIAL_LINKS.map(({ Icon, url }, idx) => (
              <a key={idx} href={url} target="_blank" rel="noreferrer" className="hover:text-[#D4A017] transition-colors">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}