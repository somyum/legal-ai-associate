import { motion } from "framer-motion";
import { Brain, Database, Globe, Cpu } from "lucide-react";

const techs = [
  {
    icon: Brain,
    name: "LangGraph",
    role: "The Brain",
    desc: "State-driven architecture orchestrating specialized legal AI agents.",
  },
  {
    icon: Database,
    name: "Neo4j",
    role: "Long-Term Memory",
    desc: "Graph database mapping relationships between witnesses, corporations, and timelines.",
  },
  {
    icon: Globe,
    name: "Indian Kanoon & eCourts",
    role: "Legal Data Pipeline",
    desc: "Real-time case law, precedent citations, judge details, and order history.",
  },
  {
    icon: Cpu,
    name: "GliNER + Docling",
    role: "Entity Extraction & OCR",
    desc: "Zero-shot extraction of legal entities with advanced table and document parsing.",
  },
];

const TechStackSection = () => {
  return (
    <section className="py-24 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-700 mb-4">
            Powered By <span className="text-primary">Cutting-Edge</span> Tech
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Not a chatbot — a state machine with long-term memory.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="group p-8 rounded-2xl bg-secondary/30 border border-border hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <tech.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="font-body text-xs uppercase tracking-widest text-primary font-semibold">{tech.role}</span>
                  <h3 className="font-display text-xl font-600 mt-1 mb-2">{tech.name}</h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">{tech.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;