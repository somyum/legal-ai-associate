import { motion } from "framer-motion";
import { Upload, Users, AlertTriangle, MessageSquareQuote, LinkIcon } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Evidence",
    description: "Drop contracts, emails, transcripts — any format. Our OCR pipeline powered by Docling handles scanned documents, tables, and complex layouts.",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "Detected Parties & Dates",
    description: "Zero-shot entity extraction identifies parties, dates, clauses, and amendments automatically — no manual tagging required.",
    color: "text-emerald-400",
  },
  {
    icon: AlertTriangle,
    title: "Conflict / Inconsistency Found",
    description: "The Recursive Auditor cross-references graph-based facts against raw evidence. Contradicting dates, conflicting statements — nothing hides.",
    color: "text-red-400",
  },
  {
    icon: MessageSquareQuote,
    title: "Suggested Deposition Questions",
    description: "AI generates strategic questions based on discovered inconsistencies, each hard-linked to its source evidence with full audit trail.",
    color: "text-blue-400",
  },
  {
    icon: LinkIcon,
    title: "Source Evidence Links",
    description: "Every finding traces back to exact pages, paragraphs, and timestamps. Zero hallucinations — absolute evidentiary integrity.",
    color: "text-violet-400",
  },
];

const WorkflowSection = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-700 mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            From raw evidence to courtroom-ready strategy in minutes, not months.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 1 ? "md:text-right" : ""}`}>
                  <div className={`inline-flex items-center gap-3 mb-3 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center border border-border">
                      <step.icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <span className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-600 mb-3">{step.title}</h3>
                  <p className="font-body text-muted-foreground leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>

                {/* Center node */}
                <div className="hidden md:flex w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_20px_hsl(var(--primary)/0.4)] flex-shrink-0" />

                {/* Spacer for layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;