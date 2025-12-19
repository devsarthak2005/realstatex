import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  {
    id: 1,
    title: "Skyline Apartments",
    description: "Luxury high-rise living with panoramic city views. Modern amenities and premium finishes throughout.",
    image: project1,
    location: "Downtown Metro",
    price: "$450,000",
  },
  {
    id: 2,
    title: "Mediterranean Villa",
    description: "Stunning villa with private pool, lush gardens, and terracotta elegance. Perfect family retreat.",
    image: project2,
    location: "Coastal Heights",
    price: "$1,250,000",
  },
  {
    id: 3,
    title: "Penthouse Suite",
    description: "Breathtaking penthouse with floor-to-ceiling windows and spectacular skyline views.",
    image: project3,
    location: "Financial District",
    price: "$2,800,000",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent font-body font-medium mb-4">
            Featured Listings
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Our Projects
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of premium properties, 
            each offering unique features and exceptional value.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-accent text-accent-foreground font-body font-semibold rounded-full text-sm">
                    {project.price}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-body">{project.location}</span>
                </div>
                
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                
                <p className="font-body text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <Button variant="ghost" className="p-0 h-auto text-accent hover:text-orange-hover font-semibold group/btn">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            View All Projects
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
