"use client";

import { motion } from "framer-motion";
import { HiOutlineCheckBadge, HiOutlinePresentationChartLine, HiOutlineUserGroup } from "react-icons/hi2";

const REASONS = [
  {
    id: 1,
    icon: <HiOutlineCheckBadge size={40} />,
    title: "CALIDAD GARANTIZADA",
    desc: "Utilizamos materiales de primera y procesos constructivos certificados para asegurar la durabilidad de tu hogar.",
  },
  {
    id: 2,
    icon: <HiOutlinePresentationChartLine size={40} />,
    title: "ALTA VALORIZACIÓN",
    desc: "Nuestros proyectos se ubican en zonas estratégicas de alto crecimiento, asegurando que tu inversión crezca año tras año.",
  },
  {
    id: 3,
    icon: <HiOutlineUserGroup size={40} />,
    title: "ENFOQUE HUMANO",
    desc: "Diseñamos pensando en las personas. Espacios funcionales que priorizan la luz natural, ventilación y comodidad.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* 📝 Bloque de Texto Izquierda (Col 5) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-[#D4A017]"></div>
                <p className="text-[#D4A017] font-bold tracking-[0.4em] uppercase text-[10px]">
                  VALOR DIFERENCIAL
                </p>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-light text-[#2C3E73] leading-[1.1] uppercase mb-8">
                ¿POR QUÉ ELEGIR <br />
                <span className="font-bold">HABVIA?</span>
              </h2>
              
              <p className="text-gray-500 text-lg font-light leading-relaxed mb-10 border-l border-gray-200 pl-8">
                Nos diferenciamos por nuestro compromiso inquebrantable con la excelencia arquitectónica y la transparencia en cada etapa del proyecto.
              </p>
            </motion.div>
          </div>

          {/* 🗂️ Grid de Razones Derecha (Col 7) */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8 lg:gap-12">
            {REASONS.map((reason, idx) => (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group border-b border-gray-100 pb-8 hover:border-[#D4A017] transition-colors duration-500"
              >
                <div className="text-[#D4A017] mb-6 transition-transform duration-500 group-hover:-translate-y-2">
                  {reason.icon}
                </div>
                <h3 className="text-[#2C3E73] font-bold tracking-[0.2em] text-xs mb-4 uppercase">
                  {reason.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">
                  {reason.desc}
                </p>
              </motion.div>
            ))}

            {/* Cuadro decorativo vacío para completar el grid o info extra */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-[#2C3E73] p-10 flex flex-col justify-center items-center text-center"
            >
              <p className="text-[#D4A017] text-4xl font-bold mb-2">100%</p>
              <p className="text-white text-[9px] font-bold tracking-[0.3em] uppercase">
                Compromiso <br /> de Entrega
              </p>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}