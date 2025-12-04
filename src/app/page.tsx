import { HeroSection } from "@/components/hero-section";
import { ServiceTypesSection } from "@/components/service-types-section";
import { HowItWorks } from "@/components/how-it-works";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServiceTypesSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}