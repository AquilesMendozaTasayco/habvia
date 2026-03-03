"use client";

import { motion } from "framer-motion";
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from "react-icons/hi";

export default function ContactForm() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-0 shadow-2xl border border-gray-100">
          
          {/* 📝 Columna Formulario (Lado Izquierdo - Blanco) */}
          <div className="lg:col-span-7 p-8 md:p-16 bg-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-[#D4A017]"></div>
              <p className="text-[#D4A017] font-bold tracking-[0.4em] uppercase text-[10px]">
                Escríbenos
              </p>
            </div>
            
            <h2 className="text-4xl font-light text-[#2C3E73] leading-none uppercase mb-12">
              MÁNDANOS UN <br />
              <span className="font-bold">MENSAJE</span>
            </h2>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#2C3E73] tracking-widest uppercase">Nombre (*)</label>
                  <input type="text" placeholder="Tu nombre" className="w-full border-b border-gray-300 py-3 px-0 focus:border-[#D4A017] outline-none transition-colors font-light placeholder:text-gray-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#2C3E73] tracking-widest uppercase">Apellidos (*)</label>
                  <input type="text" placeholder="Tus apellidos" className="w-full border-b border-gray-300 py-3 px-0 focus:border-[#D4A017] outline-none transition-colors font-light placeholder:text-gray-300" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#2C3E73] tracking-widest uppercase">Correo Electrónico (*)</label>
                  <input type="email" placeholder="email@ejemplo.com" className="w-full border-b border-gray-300 py-3 px-0 focus:border-[#D4A017] outline-none transition-colors font-light placeholder:text-gray-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#2C3E73] tracking-widest uppercase">Teléfono o Celular (*)</label>
                  <input type="tel" placeholder="+51 --- --- ---" className="w-full border-b border-gray-300 py-3 px-0 focus:border-[#D4A017] outline-none transition-colors font-light placeholder:text-gray-300" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#2C3E73] tracking-widest uppercase">Proyecto de interés</label>
                <select className="w-full border-b border-gray-300 py-3 px-0 focus:border-[#D4A017] outline-none transition-colors font-light bg-transparent text-gray-500">
                  <option>Seleccione proyecto</option>
                  <option>Bejarano 468</option>
                  <option>Otros proyectos</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#2C3E73] tracking-widest uppercase">Mensaje (*)</label>
                <textarea rows="4" placeholder="¿En qué podemos ayudarte?" className="w-full border-b border-gray-300 py-3 px-0 focus:border-[#D4A017] outline-none transition-colors font-light placeholder:text-gray-300 resize-none"></textarea>
              </div>

              <button className="w-full md:w-auto bg-[#2C3E73] text-white px-12 py-5 font-bold tracking-[0.3em] uppercase text-[10px] hover:bg-[#D4A017] hover:text-[#2C3E73] transition-all duration-500">
                ENVIAR MENSAJE
              </button>
            </form>
          </div>

          {/* 🟦 Columna Info (Lado Derecho - Azul Vitrificado) */}
          <div className="lg:col-span-5 bg-[#2C3E73] p-8 md:p-16 text-white flex flex-col justify-center relative overflow-hidden">
            {/* Elemento Decorativo */}
            <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#D4A017]/20 -translate-y-10 translate-x-10"></div>
            
            <h3 className="text-3xl font-bold tracking-tight mb-8 uppercase">
              PASE POR NUESTRA <br />
              <span className="text-[#D4A017]">OFICINA</span>
            </h3>
            
            <p className="text-white/70 font-light leading-relaxed mb-12 italic text-sm">
              "Nos encantaría conocerte en persona y poder brindarte una atención personalizada. Nuestro equipo estará encantado de atenderte."
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <HiOutlineLocationMarker className="text-[#D4A017] shrink-0" size={24} />
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4A017] mb-1">Dirección</p>
                  <p className="text-sm font-light text-white/90">Mz A Lote 15A Dpto 1001 Urb. Las Hortencias de California</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <HiOutlinePhone className="text-[#D4A017] shrink-0" size={24} />
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4A017] mb-1">Llámanos</p>
                  <p className="text-sm font-light text-white/90">Tel: (+51) 044 661 845</p>
                  <p className="text-sm font-light text-white/90">Cel: (+51) 956 223 460</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <HiOutlineMail className="text-[#D4A017] shrink-0" size={24} />
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4A017] mb-1">Escríbenos</p>
                  <p className="text-sm font-light text-white/90">contacto@habvia.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}