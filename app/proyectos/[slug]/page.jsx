import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { proyectos, getProyectoBySlug } from "@/data/proyectos";

function BadgeEstado({ estado }) {
  const isPreventa = (estado || "").toLowerCase().includes("pre");
  return (
    <span className={`px-4 py-1 text-[10px] tracking-[0.2em] font-bold uppercase border ${
      isPreventa 
        ? "bg-[#D4A017] text-[#2C3E73] border-[#D4A017]" 
        : "bg-transparent text-white border-white/40"
    }`}>
      {estado}
    </span>
  );
}

export default async function ProyectoPage({ params }) {
  const { slug } = await params;

  const p = getProyectoBySlug(slug);
  if (!p) return notFound();

  return (
    <main className="bg-white">
      {/* 🏛️ HERO MONUMENTAL */}
      <section className="relative w-full h-screen min-h-[650px] overflow-hidden">
        <Image
          src={p.heroImagen}
          alt={p.nombre}
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-[#1a2544]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E73] via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-end pb-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <BadgeEstado estado={p.estado} />
              <div className="w-12 h-[1px] bg-[#D4A017]"></div>
              <span className="text-white text-[11px] font-bold tracking-[0.3em] uppercase">
                {p.ubicacion}
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-light text-white leading-none uppercase tracking-tighter">
              {p.nombre}
            </h1>

            <p className="mt-6 text-[#D4A017] text-2xl md:text-4xl font-light italic leading-none tracking-widest uppercase">
              {p.lema}
            </p>

            <p className="mt-8 text-lg text-white/70 max-w-2xl font-light leading-relaxed">
              {p.descripcionCorta}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={p.brochureUrl}
                target="_blank"
                className="bg-[#D4A017] text-[#2C3E73] px-10 py-5 font-bold tracking-[0.2em] uppercase text-[11px] hover:bg-white transition-all duration-500"
              >
                Descargar Brochure
              </Link>
              <a
                href="#contacto"
                className="border border-white text-white px-10 py-5 font-bold tracking-[0.2em] uppercase text-[11px] hover:bg-white hover:text-[#2C3E73] transition-all duration-500"
              >
                Cotizar ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 🏛️ SOBRE EL PROYECTO (DISEÑO EDITORIAL) */}
      <section className="w-full py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-[2px] bg-[#D4A017]"></div>
              <p className="text-[#D4A017] font-bold tracking-[0.4em] uppercase text-[10px]">
                Concepto Arquitectónico
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-[#2C3E73] uppercase leading-tight mb-8">
              {p.resumen?.titulo}
            </h2>
            <p className="text-gray-500 font-light leading-relaxed text-lg italic border-l-2 border-[#D4A017] pl-8">
              {p.resumen?.texto}
            </p>

            <div className="mt-12 flex flex-wrap gap-6">
              <Link
                href={p.brochureUrl}
                target="_blank"
                className="text-[#2C3E73] font-bold tracking-[0.2em] uppercase text-[11px] border-b-2 border-[#D4A017] pb-2 hover:text-[#D4A017] transition-all"
              >
                Ver brochure completo
              </Link>
              <a
                href="#planos"
                className="text-gray-400 font-bold tracking-[0.2em] uppercase text-[11px] border-b-2 border-transparent pb-2 hover:text-[#D4A017] transition-all"
              >
                Explorar planos
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative group">
            <div className="absolute -bottom-6 -left-6 w-full h-full border border-[#D4A017]/20 -z-10 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 duration-700"></div>
            <div className="relative w-full h-[550px] overflow-hidden shadow-2xl">
              <Image
                src={p.portadaImagen}
                alt={`${p.nombre} - fachada`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 📐 CARACTERÍSTICAS (GRID TÉCNICO) */}
      <section className="w-full py-24 bg-[#2C3E73] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-0 border border-white/10">
            {p.caracteristicas?.map((c, idx) => (
              <div 
                key={idx} 
                className="p-12 border-r border-b md:border-b-0 border-white/10 hover:bg-white/[0.03] transition-colors"
              >
                <p className="text-[#D4A017] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                  {c.titulo}
                </p>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📏 PLANOS (TIPOLOGÍAS) */}
      <section id="planos" className="w-full py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-[#D4A017] font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Ingeniería</p>
            <h2 className="text-4xl font-light text-[#2C3E73] uppercase">
              Tipologías <span className="font-bold underline decoration-[#D4A017] decoration-2 underline-offset-8">disponibles</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {p.planos?.map((pl, idx) => (
              <a
                key={idx}
                href={pl.imagen}
                target="_blank"
                rel="noreferrer"
                className="group block border border-gray-100 p-4 hover:border-[#D4A017] transition-all duration-500"
              >
                <div className="relative w-full h-72 overflow-hidden bg-gray-50">
                  <Image
                    src={pl.imagen}
                    alt={pl.nombre}
                    fill
                    className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <p className="font-bold text-[#2C3E73] uppercase tracking-widest text-sm">{pl.nombre}</p>
                  <span className="text-[10px] font-bold text-[#D4A017] tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">VER PLANO +</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 🖼️ GALERÍA (MOSAICO) */}
      <section className="w-full py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <p className="text-[#D4A017] font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Visuales</p>
          <h2 className="text-4xl font-light text-[#2C3E73] uppercase">Experiencia <span className="font-bold">Habvia</span></h2>
        </div>
        <div className="max-w-[1600px] mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {p.galeria?.map((g, idx) => (
            <div key={idx} className="relative h-[400px] overflow-hidden group">
              <Image
                src={g.src}
                alt={`${p.nombre} - ${g.categoria}`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#2C3E73]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white font-bold tracking-[0.3em] uppercase text-[10px] border border-white px-6 py-3">
                  {g.categoria}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🏗️ RECORRIDOS 3D */}
      <section className="w-full py-32 bg-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#D4A017] font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Inmersión</p>
          <h2 className="text-4xl font-light text-[#2C3E73] uppercase mb-12">Recorridos <span className="font-bold">Virtuales</span></h2>

          {(!p.recorridos3d || p.recorridos3d.length === 0) ? (
            <p className="text-gray-400 font-light italic text-lg">Próximamente agregaremos recorridos 3D.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 text-left">
              {p.recorridos3d.map((r, idx) => (
                <a
                  key={idx}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-10 border border-gray-100 hover:border-[#D4A017] transition-all flex flex-col justify-between h-64 group"
                >
                  <p className="text-xl font-bold text-[#2C3E73] uppercase">{r.titulo}</p>
                  <p className="text-[11px] font-bold text-[#D4A017] tracking-[0.3em] uppercase group-hover:translate-x-2 transition-transform">Iniciar Recorrido 3D →</p>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 📊 AVANCE DE OBRAS */}
      <section className="w-full py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <p className="text-[#D4A017] font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Seguimiento</p>
              <h2 className="text-4xl font-light text-[#2C3E73] uppercase">Estado de <span className="font-bold">Construcción</span></h2>
            </div>
          </div>

          {(!p.avanceObras || p.avanceObras.length === 0) ? (
            <p className="text-gray-400 font-light italic">Próximamente publicaremos actualizaciones del avance de obra.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {p.avanceObras.map((a, idx) => (
                <div key={idx} className="bg-white border-b-4 border-transparent hover:border-[#D4A017] transition-all">
                  {a.imagen && (
                    <div className="relative w-full h-64 overflow-hidden">
                      <Image src={a.imagen} alt={a.titulo} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-8">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{a.fecha}</p>
                    <p className="text-lg font-bold text-[#2C3E73] uppercase mb-6">{a.titulo}</p>
                    {typeof a.progreso === "number" && (
                      <div className="space-y-3">
                        <div className="h-[2px] w-full bg-gray-100">
                          <div className="h-full bg-[#D4A017]" style={{ width: `${a.progreso}%` }} />
                        </div>
                        <p className="text-[10px] font-bold text-[#D4A017] tracking-widest">{a.progreso}% COMPLETADO</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 📩 CONTACTO / FORMULARIO (ALTO CONTRASTE) */}
      <section id="contacto" className="w-full py-32 bg-[#2C3E73]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-white">
            <p className="text-[#D4A017] font-bold tracking-[0.4em] uppercase text-[10px] mb-6">Inversión</p>
            <h2 className="text-5xl font-light uppercase leading-[1.1] mb-8">
              ¿Deseas conocer más <br /> sobre <span className="font-bold">{p.nombre}</span>?
            </h2>
            <p className="text-white/60 font-light text-lg max-w-md leading-relaxed">
              Un asesor especializado se pondrá en contacto para brindarte detalles técnicos y comerciales.
            </p>
          </div>

          <form className="bg-white p-10 md:p-16 shadow-2xl">
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border-b border-gray-200 focus-within:border-[#D4A017] transition-colors">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Nombres</label>
                  <input type="text" className="w-full bg-transparent py-3 text-sm outline-none font-medium" placeholder="EJ. JUAN PÉREZ" />
                </div>
                <div className="border-b border-gray-200 focus-within:border-[#D4A017] transition-colors">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Teléfono</label>
                  <input type="tel" className="w-full bg-transparent py-3 text-sm outline-none font-medium" placeholder="+51 000 000 000" />
                </div>
              </div>
              <div className="border-b border-gray-200 focus-within:border-[#D4A017] transition-colors">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Correo</label>
                <input type="email" className="w-full bg-transparent py-3 text-sm outline-none font-medium" placeholder="CORREO@EJEMPLO.COM" />
              </div>
              <div className="border-b border-gray-200 focus-within:border-[#D4A017] transition-colors">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Mensaje</label>
                <textarea rows={3} className="w-full bg-transparent py-3 text-sm outline-none font-medium resize-none" placeholder={`HOLA, DESEO INFORMACIÓN DE ${p.nombre.toUpperCase()}...`}></textarea>
              </div>
              <button className="w-full bg-[#2C3E73] text-white py-6 font-bold tracking-[0.4em] uppercase text-[10px] hover:bg-[#D4A017] hover:text-[#2C3E73] transition-all duration-500">
                Enviar Solicitud
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return proyectos.map((p) => ({ slug: p.slug }));
}