import { motion } from "framer-motion";
import { AlertTriangle, ArrowRightLeft } from "lucide-react";

const conflicts = [
  {
    id: 1,
    severity: "Critical",
    title: "Contract Date vs Email Timestamp",
    detail: "Contract states execution on 12 Mar 2023, but email from R. Sharma dated 08 Mar 2023 references 'the signed agreement' — 4 days before alleged signing.",
    source1: "Contract_NDA_2024.pdf — Page 3, §2.1",
    source2: "Email_Thread_May.eml — Email #14",
  },
  {
    id: 2,
    severity: "High",
    title: "Undisclosed Party Involvement",
    detail: "Apex Holdings Pvt. Ltd. is referenced in 3 financial transfers but never disclosed in the contract's party schedule.",
    source1: "Financial_Statement_Q3.xlsx — Row 142",
    source2: "Contract_NDA_2024.pdf — Schedule A",
  },
  {
    id: 3,
    severity: "Medium",
    title: "Conflicting Witness Statements",
    detail: "P. Mehta states 'no knowledge of amendment' in transcript (Page 47), but her signature appears on the amendment document dated 15 Jun 2023.",
    source1: "Witness_Transcript_Sharma.pdf — Page 47",
    source2: "Amendment_June2023.pdf — Page 2",
  },
];

const severityStyles: Record<string, string> = {
  Critical: "bg-red-500/10 text-red-400 border-red-500/20",
  High: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const ConflictSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 mb-5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span className="font-body text-xs font-semibold uppercase tracking-widest text-red-400">Step 3</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-700 mb-5">
              Conflict / <span className="text-red-400">Inconsistency</span> Found
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              The <strong className="text-foreground">Recursive Auditor Loop</strong> autonomously cross-references 
              graph-based facts against raw evidence in the vector index. When a factual inconsistency is detected, 
              the graph triggers a <strong className="text-foreground">Self-Correction Edge</strong> — prompting 
              the agent to re-investigate and query eCourts and Indian Kanoon for relevant precedents.
            </p>
            <div className="flex items-center gap-4 text-sm font-body">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="text-muted-foreground">Critical</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                <span className="text-muted-foreground">High</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="text-muted-foreground">Medium</span>
              </div>
            </div>
          </motion.div>

          {/* Mock UI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="space-y-4">
              {conflicts.map((conflict, i) => (
                <motion.div
                  key={conflict.id}
                  className="rounded-xl border border-border bg-card p-5 shadow-lg"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border ${severityStyles[conflict.severity]}`}>
                      {conflict.severity}
                    </span>
                    <h4 className="font-body text-sm font-semibold flex-1">{conflict.title}</h4>
                  </div>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">{conflict.detail}</p>
                  <div className="flex items-center gap-2 text-[11px] font-body">
                    <span className="px-2 py-1 rounded bg-secondary text-muted-foreground truncate max-w-[200px]">{conflict.source1}</span>
                    <ArrowRightLeft className="w-3 h-3 text-red-400 flex-shrink-0" />
                    <span className="px-2 py-1 rounded bg-secondary text-muted-foreground truncate max-w-[200px]">{conflict.source2}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConflictSection;