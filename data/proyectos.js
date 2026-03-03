export const proyectos = [
  {
    slug: "bejarano-468",
    nombre: "Proyecto Bejarano 468",
    estado: "Preventa",
    ubicacion: "San Juan de Miraflores",
    lema: "¡Espacios que se adaptan a tu vida!",
    descripcionCorta:
      "Departamentos modernos diseñados para tu comodidad, con excelente ubicación y proyección de valorización.",

    heroImagen: "/img1.png",
    portadaImagen: "/img1.png",

    brochureUrl: "/brochures/bejarano-468.pdf",

    resumen: {
      titulo: "Vive donde siempre soñaste",
      texto:
        "Bejarano 468 es un proyecto inmobiliario pensado para familias y personas que buscan comodidad, funcionalidad y una inversión segura. Espacios bien distribuidos y acabados modernos.",
    },

    caracteristicas: [
      { titulo: "Tipologías", desc: "1, 2 y 3 dormitorios" },
      { titulo: "Metrajes", desc: "45 m² a 117 m²" },
      { titulo: "Opciones", desc: "Flats y Dúplex" },
      { titulo: "Ubicación", desc: "Zona estratégica" },
    ],

    planos: [
      { nombre: "TIPICO 1101", imagen: "/proyectos/bejarano/planos/tipico-1101.png" },
      { nombre: "TIPICO 701-901", imagen: "/proyectos/bejarano/planos/tipico-701-901.png" },
      { nombre: "TIPICO 602-802-1002", imagen: "/proyectos/bejarano/planos/tipico-602-802-1002.png" },
      { nombre: "TIPICO 402-502", imagen: "/proyectos/bejarano/planos/tipico-402-502.png" },
      { nombre: "TIPICO 401-501-601-801-1001", imagen: "/proyectos/bejarano/planos/tipico-401-501-601-801-1001.png" },
      { nombre: "TIPICO 302", imagen: "/proyectos/bejarano/planos/tipico-302.png" },
      { nombre: "TIPICO 301", imagen: "/proyectos/bejarano/planos/tipico-301.png" },
    ],

    galeria: [
      { categoria: "Fachadas", src: "/proyectos/bejarano/galeria/fachada-1.png" },
      { categoria: "Fachadas", src: "/proyectos/bejarano/galeria/fachada-2.png" },
      { categoria: "Interiores", src: "/proyectos/bejarano/galeria/interior-1.png" },
      { categoria: "Interiores", src: "/proyectos/bejarano/galeria/interior-2.png" },
      { categoria: "Planos 2D", src: "/proyectos/bejarano/galeria/plano-2d-1.png" },
      { categoria: "Planos 2D", src: "/proyectos/bejarano/galeria/plano-2d-2.png" },
      { categoria: "Redes", src: "/proyectos/bejarano/galeria/red-1.png" },
    ],

    recorridos3d: [
      // { titulo: "Recorrido 3D - Dpto 2D", url: "https://..." }
    ],

    avanceObras: [
      // { fecha: "2026-02-12", titulo: "Cimentación", progreso: 20, imagen: "/..." }
    ],
  },
];

export function getProyectoBySlug(slug) {
  return proyectos.find((p) => p.slug === slug);
}