import Navbar from "../components/ui/Navbar";
import HeroSection from "../components/ui/HeroSection";
import UploadEvidenceSection from "../components/ui/UploadEvidenceSection";
import DetectedPartiesSection from "../components/ui/DetectedPartiesSection";
import ConflictSection from "../components/ui/ConflictSection";
import DepositionSection from "../components/ui/DepositionSection";
import SourceEvidenceSection from "../components/ui/SourceEvidenceSection";
import TechStackSection from "../components/ui/TechStackSection";
import CTASection from "../components/ui/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <Navbar />
      <HeroSection />
      <UploadEvidenceSection />
      <DetectedPartiesSection />
      <ConflictSection />
      <DepositionSection />
      <SourceEvidenceSection />
      <div id="tech">
        <TechStackSection />
      </div>
      <div id="contact">
        <CTASection />
      </div>
      <footer className="border-t border-border py-8 px-6 text-center">
        <p className="font-body text-sm text-muted-foreground">
          © 2026 LegalAI Associate. Building justice, one case at a time.
        </p>
      </footer>
    </div>
  );
};

export default Index;