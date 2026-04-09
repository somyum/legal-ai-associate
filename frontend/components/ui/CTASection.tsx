import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./button";

const CTASection = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      <motion.div
        className="relative max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-4xl md:text-5xl font-700 mb-6">
          Justice Shouldn't Wait
        </h2>
        <p className="font-body text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Thousands of cases are pending. Give your legal team an AI associate 
          that remembers every detail and never misses an inconsistency.
        </p>
        <Button size="lg" className="font-body text-base px-10 py-6 font-semibold group">
          Join the Waitlist
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </section>
  );
};

export default CTASection;