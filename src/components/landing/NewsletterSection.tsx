import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email").max(254, "Email too long");

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate email
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error: dbError } = await supabase
        .from('subscribers')
        .insert({
          email: email.trim().toLowerCase(),
        });

      if (dbError) {
        // Handle duplicate email
        if (dbError.code === '23505') {
          toast.info("You're already subscribed to our newsletter!");
        } else {
          throw dbError;
        }
      } else {
        toast.success("Welcome! You've been subscribed to our newsletter.");
      }
      
      setEmail("");
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-accent relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-0 w-full h-px bg-accent-foreground" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-accent-foreground" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-accent-foreground" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Content */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-accent-foreground/10 rounded-xl flex items-center justify-center">
              <Mail className="w-7 h-7 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-accent-foreground">
                Subscribe Us
              </h3>
              <p className="font-body text-accent-foreground/80">
                Get the latest properties & real estate news
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full md:w-auto">
            <div className="flex gap-3">
              <div className="flex-1 md:w-80">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="rounded"
                  className="w-full bg-accent-foreground text-foreground placeholder:text-muted-foreground border-0"
                />
              </div>
              <Button 
                type="submit" 
                size="lg"
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground hover:bg-navy-dark shrink-0"
              >
                {isSubmitting ? "..." : "Subscribe"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};