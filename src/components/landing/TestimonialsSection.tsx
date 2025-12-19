import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    designation: "CEO, TechSquare",
    description: "RealEstateX made our office relocation seamless. Their understanding of corporate needs and premium listings is unmatched. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Michael Chen",
    designation: "Founder, StartupHub",
    description: "Found my dream home within weeks! The team's dedication and market knowledge saved us both time and money. A truly professional experience.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    designation: "Director, DesignCo",
    description: "The consultation service was exceptional. They understood exactly what I was looking for and delivered beyond expectations. Five stars!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-body font-medium mb-4">
            Client Stories
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Happy Clients
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued clients 
            have to say about their experience with us.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-accent-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="pt-4">
                <p className="font-body text-foreground/80 leading-relaxed mb-6">
                  "{testimonial.description}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-accent/20"
                  />
                  <div>
                    <h4 className="font-display font-bold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground">
                      {testimonial.designation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
