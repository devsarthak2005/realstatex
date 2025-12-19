import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProjectsSection } from "@/components/landing/ProjectsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { ConsultationForm } from "@/components/landing/ConsultationForm";
import { NewsletterSection } from "@/components/landing/NewsletterSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar variant="transparent" />
      <main>
        <HeroSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ConsultationForm />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
