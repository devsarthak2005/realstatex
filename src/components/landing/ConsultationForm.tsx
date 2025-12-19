import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().email("Please enter a valid email").max(254, "Email too long"),
  mobile: z.string().min(5, "Please enter a valid phone number").max(20, "Phone number too long"),
  city: z.string().min(2, "City must be at least 2 characters").max(100, "City name too long"),
});

export const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          mobile: formData.mobile.trim(),
          city: formData.city.trim(),
        });

      if (error) throw error;
      
      toast.success("Thank you! We'll contact you within 24 hours.");
      setFormData({ fullName: "", email: "", mobile: "", city: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-navy-light/30 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent font-body font-medium mb-6">
              Let's Talk
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
              Get a Free Consultation
            </h2>
            <p className="font-body text-primary-foreground/80 text-lg mb-8">
              Ready to find your perfect property? Our expert consultants are here 
              to guide you every step of the way. Fill out the form and we'll get 
              back to you within 24 hours.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
            {[
                { icon: Phone, text: "+91 9302755266" },
                { icon: Mail, text: "sarthakborse@realstatex.com" },
                { icon: MapPin, text: "123 Premium Ave, Suite 100" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy-light/50 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-body text-primary-foreground/80">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-navy-light/30 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-primary-foreground/10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  variant="consultation"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
              <div>
                <Input
                  variant="consultation"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <Input
                  variant="consultation"
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                {errors.mobile && (
                  <p className="text-red-400 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>
              <div>
                <Input
                  variant="consultation"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                {errors.city && (
                  <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              <Button 
                type="submit" 
                variant="cta" 
                size="xl" 
                className="w-full mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Get Quick Quote
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};