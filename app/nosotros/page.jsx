import PageHero from "@/components/PageHero";
import AboutSection from "@/components/about/AboutSection"; 
import MisionVisionSection from "@/components/about/MisionVisionSection";
import WhyChooseUs from "@/components/about/WhyChooseUs";

export default function NosotrosPage() {
  return (
    <main className="bg-white">
      <PageHero
        title="Nuestra HISTORIA"
        description="Conoce más sobre nuestra visión, compromiso inmobiliario y la pasión que ponemos en cada estructura."
        image="/img1.png"
      />

      <AboutSection />
      <MisionVisionSection />
      <WhyChooseUs />

    </main>
  );
}