import { Link } from "react-router-dom";
import { Home, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Home className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-background">
                RealEstateX
              </span>
            </Link>
            <p className="font-body text-background/60 text-sm mb-6">
              Your trusted partner in finding the perfect property. 
              Consultation, design, and marketing excellence.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent transition-colors group"
                >
                  <Icon className="w-5 h-5 text-background/60 group-hover:text-accent-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-background mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "Our Services", "Projects", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="font-body text-background/60 hover:text-accent transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-background mb-4">Services</h4>
            <ul className="space-y-3">
              {["Buy Property", "Sell Property", "Rent Property", "Investment"].map((link) => (
                <li key={link}>
                  <a href="#" className="font-body text-background/60 hover:text-accent transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-background mb-4">Contact</h4>
            <ul className="space-y-3 font-body text-background/60 text-sm">
              <li>123 Premium Avenue</li>
              <li>Suite 100, Metro City</li>
              <li>+1 (555) 123-4567</li>
              <li>hello@realestatex.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-background/40 text-sm">
            © 2024 RealEstateX. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
              <a key={link} href="#" className="font-body text-background/40 hover:text-accent transition-colors text-sm">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
