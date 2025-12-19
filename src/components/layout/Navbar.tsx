import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

interface NavbarProps {
  variant?: "transparent" | "solid";
}

export const Navbar = ({ variant = "transparent" }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isTransparent = variant === "transparent";

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent ? "bg-transparent" : "bg-card shadow-card"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              isTransparent ? "bg-accent" : "bg-primary"
            )}>
              <Home className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className={cn(
              "font-display text-xl font-bold",
              isTransparent ? "text-primary-foreground" : "text-foreground"
            )}>
              RealEstateX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }
                }}
                className={cn(
                  "font-body font-medium transition-colors duration-200",
                  isTransparent 
                    ? "text-primary-foreground/80 hover:text-accent" 
                    : "text-foreground/80 hover:text-accent"
                )}
              >
                {link.name}
              </a>
            ))}
            <Link to="/admin">
              <Button variant={isTransparent ? "hero" : "cta"} size="lg">
                Admin Panel
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className={cn("w-6 h-6", isTransparent ? "text-primary-foreground" : "text-foreground")} />
            ) : (
              <Menu className={cn("w-6 h-6", isTransparent ? "text-primary-foreground" : "text-foreground")} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className={cn(
              "flex flex-col gap-4 p-4 rounded-lg",
              isTransparent ? "bg-primary/90 backdrop-blur-sm" : "bg-card"
            )}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("#")) {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }
                  }}
                  className={cn(
                    "font-body font-medium py-2 transition-colors",
                    isTransparent ? "text-primary-foreground" : "text-foreground"
                  )}
                >
                  {link.name}
                </a>
              ))}
              <Link to="/admin">
                <Button variant="cta" size="lg" className="w-full">
                  Admin Panel
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
