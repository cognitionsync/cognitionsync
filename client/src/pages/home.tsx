import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import TrustStrip from "@/components/trust-strip";
import ServicesSection from "@/components/services-section";
import ApproachSection from "@/components/approach-section";
import WorkSection from "@/components/work-section";
import AboutSection from "@/components/about-section";
import EngagementSection from "@/components/engagement-section";
import FaqSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <TrustStrip />
        <ServicesSection />
        <ApproachSection />
        <WorkSection />
        <AboutSection />
        <EngagementSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
