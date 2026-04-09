import { motion } from "framer-motion";
import { Users, Calendar, Building2, User, MapPin, Hash } from "lucide-react";

const entities = [
  { name: "Rajesh Sharma", type: "Individual", role: "Signatory / Email Author", docs: ["Contract_NDA_2024.pdf", "Email_Thread_May.eml"], icon: User },
  { name: "Priya Mehta", type: "Individual", role: "Witness / Signatory", docs: ["Witness_Transcript_Sharma.pdf", "Amendment_June2023.pdf"], icon: User },
  { name: "Mehta Corp Pvt. Ltd.", type: "Corporation", role: "Primary Party", docs: ["Contract_NDA_2024.pdf"], icon: Building2 },
  { name: "Apex Holdings Pvt. Ltd.", type: "Shell Corporation", role: "Undisclosed Party", docs: ["Financial_Statement_Q3.xlsx"], flag: true, icon: Building2 },
  { name: "Sharma & Associates LLP", type: "Law Firm", role: "Representing Counsel", docs: ["Contract_NDA_2024.pdf"], icon: Building2 },
];

const dates = [
  { date: "12 Mar 2023", event: "Contract Execution Date (stated)", source: "Contract_NDA_2024.pdf §2.1", flag: true },
  { date: "08 Mar 2023", event: "Email referencing 'signed agreement'", source: "Email #14", flag: true },
  { date: "15 Jun 2023", event: "Amendment signed by P. Mehta", source: "Amendment_June2023.pdf" },
  { date: "22 Sep 2023", event: "Q3 Financial transfers to Apex Holdings", source: "Financial_Statement_Q3.xlsx" },
  { date: "14 Nov 2023", event: "Witness deposition recorded", source: "Witness_Transcript_Sharma.pdf" },
];

const PartiesPage = () => {
  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold mb-1">Detected Parties & Dates</h2>
        <p className="text-sm text-muted-foreground">Entities extracted via GliNER zero-shot NER, mapped to Neo4j knowledge graph</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entities */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" /> Entities ({entities.length})
          </h3>
          <div className="space-y-2">
            {entities.map((entity, i) => (
              <motion.div
                key={entity.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`rounded-lg border p-4 ${
                  entity.flag ? "border-red-500/30 bg-red-500/5" : "border-border bg-card"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <entity.icon className={`w-4 h-4 ${entity.flag ? "text-red-400" : "text-emerald-400"}`} />
                  <span className="text-sm font-semibold flex-1">{entity.name}</span>
                  {entity.flag && (
                    <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                      Flagged
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground space-y-1 ml-7">
                  <p><span className="text-foreground/60">Type:</span> {entity.type}</p>
                  <p><span className="text-foreground/60">Role:</span> {entity.role}</p>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {entity.docs.map((d) => (
                      <span key={d} className="px-1.5 py-0.5 rounded bg-secondary text-[10px]">{d}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" /> Timeline ({dates.length} events)
          </h3>
          <div className="relative">
            <div className="absolute left-[7px] top-3 bottom-3 w-px bg-border" />
            <div className="space-y-4">
              {dates.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-3 relative"
                >
                  <div className={`w-[15px] h-[15px] rounded-full flex-shrink-0 mt-1 z-10 ${
                    d.flag ? "bg-red-400" : "bg-primary"
                  }`} />
                  <div className={`flex-1 rounded-lg border p-3 ${
                    d.flag ? "border-red-500/30 bg-red-500/5" : "border-border bg-card"
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-semibold">{d.date}</span>
                      {d.flag && <span className="text-[10px] text-red-400 font-bold">⚠ CONFLICT</span>}
                    </div>
                    <p className="text-xs text-foreground/80">{d.event}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{d.source}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartiesPage;
