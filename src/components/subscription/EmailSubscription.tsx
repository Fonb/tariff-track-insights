
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

const emailSchema = z.string().email("Please enter a valid email address");

export const EmailSubscription = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Validate email
      emailSchema.parse(email);
      
      // Submit to Supabase
      const { error } = await supabase
        .from('subscriptions')
        .insert([{ email }]);
      
      if (error) throw error;
      
      toast({
        title: "Subscription successful",
        description: "Thank you for subscribing to our updates!",
      });
      
      setEmail('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          variant: "destructive",
          title: "Invalid email",
          description: error.errors[0].message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Subscription failed",
          description: "There was an error processing your request. Please try again.",
        });
        console.error(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow"
          required
        />
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="whitespace-nowrap"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        We'll only send updates about tariff changes. No spam.
      </p>
    </form>
  );
};
