import PageHero from "@/components/PageHero";
import ContactForm from "@/components/contact/ContactForm";

// 📍 Componente interno para el Mapa (Estilo Premium)
function ContactMap() {
  return (
    <section className="w-full h-[500px] grayscale contrast-[1.1] brightness-[0.9] hover:grayscale-0 transition-all duration-1000 border-t border-gray-100">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.771146757138!2d-79.0305047!3d-8.1347071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad394f2fe5919b%3A0xb94b098dd0d2ad79!2sMz%20A%20Lote%2015A%20Dpto%201001%20Urb.%20Las%20Hortencias%20de%20California!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="filter invert-[90%] hue-rotate-[180deg] contrast-[1.2]"
      ></iframe>
    </section>
  );
}

export default function ContactoPage() {
  return (
    <main className="bg-white">
      {/* 🏔️ PageHero: Título dividido automáticamente (Light + Bold) */}
      <PageHero
        title="Ponte en CONTACTO"
        description="Estamos listos para asesorarte. Visítanos en nuestras oficinas o envíanos un mensaje para iniciar tu próxima inversión."
        image="/img1.png" 
      />

      {/* 📩 Formulario y Datos de Oficina (Bloque Monolítico) */}
      <ContactForm />
      
      {/* 📍 Mapa de Ubicación Full Width */}
      <ContactMap />

      {/* 🏛️ Footer de Ubicación Rápida */}
      <div className="bg-[#2C3E73] py-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-[1px] bg-[#D4A017]"></div>
          <p className="text-[#D4A017] text-[10px] font-bold tracking-[0.5em] uppercase">
            Trujillo • La Libertad • Perú
          </p>
        </div>
      </div>
    </main>
  );
}