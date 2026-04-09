import { Scale } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Scale className="w-5 h-5 text-primary" />
          <span className="font-display text-lg font-700">LegalAI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-body text-sm text-muted-foreground">
          <a href="#workflow" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#tech" className="hover:text-foreground transition-colors">Technology</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          
          <Link to="/dashboard" className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            Open Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;