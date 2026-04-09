import { motion } from "framer-motion";
import { Users, Calendar, Building2, User, MapPin } from "lucide-react";

const entities = [
  { type: "Person", name: "Rajesh Sharma", role: "Defendant, Director", icon: User, color: "text-blue-400 bg-blue-400/10" },
  { type: "Organization", name: "Apex Holdings Pvt. Ltd.", role: "Shell Corp (flagged)", icon: Building2, color: "text-red-400 bg-red-400/10" },
  { type: "Person", name: "Priya Mehta", role: "Witness, CFO", icon: User, color: "text-emerald-400 bg-emerald-400/10" },
  { type: "Organization", name: "State Bank of India", role: "Financial Institution", icon: Building2, color: "text-primary bg-primary/10" },
];

const dates = [
  { date: "12 Mar 2023", event: "Contract signed between parties", confidence: "98%" },
  { date: "15 Jun 2023", event: "Amendment clause activated", confidence: "94%" },
  { date: "02 Sep 2023", event: "Email: Undisclosed payment referenced", confidence: "87%" },
  { date: "19 Nov 2023", event: "Court filing — Case No. 4521/2023", confidence: "99%" },
];

const DetectedPartiesSection = () => {
  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Mock UI — left side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="order-2 lg:order-1"
          >
            <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-primary/5">
              {/* Entities */}
              <div className="mb-6">
                <h4 className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" /> Extracted Entities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {entities.map((entity, i) => (
                    <motion.div
                      key={entity.name}
                      className="p-3 rounded-lg bg-secondary/50 border border-border/50"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${entity.color}`}>
                          <entity.icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">{entity.type}</span>
                      </div>
                      <p className="font-body text-sm font-semibold">{entity.name}</p>
                      <p className="font-body text-xs text-muted-foreground">{entity.role}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> Key Dates Extracted
                </h4>
                <div className="space-y-2">
                  {dates.map((d, i) => (
                    <motion.div
                      key={d.date}
                      className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/30 border border-border/30"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                    >
                      <span className="font-body text-xs text-primary font-semibold whitespace-nowrap w-24">{d.date}</span>
                      <span className="font-body text-xs text-muted-foreground flex-1">{d.event}</span>
                      <span className="font-body text-[10px] text-emerald-400 font-medium">{d.confidence}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text — right side */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 mb-5">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-body text-xs font-semibold uppercase tracking-widest text-emerald-400">Step 2</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-700 mb-5">
              Detected <span className="text-emerald-400">Parties</span> & Dates
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Powered by <strong className="text-foreground">GliNER zero-shot extraction</strong>, the system identifies 
              every party, organization, date, clause, and amendment — without any pre-training on your specific documents.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Entities are automatically mapped into the <strong className="text-foreground">Neo4j knowledge graph</strong>, 
              creating a web of relationships between people, companies, and events that reveals hidden connections 
              no manual review could catch.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DetectedPartiesSection;