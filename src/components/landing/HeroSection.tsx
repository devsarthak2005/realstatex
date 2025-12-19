import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent font-body font-medium mb-6 animate-fade-in">
            Premium Real Estate Services
          </span>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Not Your Average{" "}
            <span className="text-gradient">Realtor</span>
          </h1>
          
          <p className="font-body text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            Consultation, Design & Marketing — We provide comprehensive real estate solutions 
            tailored to your unique needs. Your dream property awaits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-200">
            <Button 
              variant="hero" 
              size="xl"
              onClick={scrollToContact}
              className="animate-pulse-glow"
            >
              Get Free Consultation
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Our Projects
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fade-in-up animation-delay-300">
          {[
            { value: "15+", label: "Years Experience" },
            { value: "500+", label: "Properties Sold" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "50+", label: "Expert Agents" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="font-body text-sm text-primary-foreground/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  );
};
