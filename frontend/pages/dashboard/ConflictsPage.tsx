import { motion } from "framer-motion";
import { AlertTriangle, ArrowRightLeft, ExternalLink } from "lucide-react";
import { Button } from "../../components/ui/button";

const conflicts = [
  {
    id: 1,
    severity: "Critical",
    title: "Contract Date vs Email Timestamp",
    detail: "Contract states execution on 12 Mar 2023, but email from R. Sharma dated 08 Mar 2023 references 'the signed agreement' — 4 days before alleged signing.",
    source1: { doc: "Contract_NDA_2024.pdf", loc: "Page 3, §2.1" },
    source2: { doc: "Email_Thread_May.eml", loc: "Email #14, 08-Mar-2023" },
    impact: "Suggests pre-dating of contract — potential fraud indicator",
    precedent: "Indian Contract Act §17 — Fraud in execution",
  },
  {
    id: 2,
    severity: "High",
    title: "Undisclosed Party Involvement",
    detail: "Apex Holdings Pvt. Ltd. is referenced in 3 financial transfers totaling ₹4.2 Cr but never disclosed in the contract's party schedule.",
    source1: { doc: "Financial_Statement_Q3.xlsx", loc: "Row 142, Cols D-F" },
    source2: { doc: "Contract_NDA_2024.pdf", loc: "Schedule A — Party Listing" },
    impact: "Hidden corporate entity receiving funds — shell company pattern",
    precedent: "Companies Act 2013 §184 — Disclosure of interest",
  },
  {
    id: 3,
    severity: "Medium",
    title: "Conflicting Witness Statements",
    detail: "P. Mehta states 'no knowledge of amendment' in transcript (Page 47), but her signature appears on the amendment document dated 15 Jun 2023.",
    source1: { doc: "Witness_Transcript_Sharma.pdf", loc: "Page 47, Lines 8-12" },
    source2: { doc: "Amendment_June2023.pdf", loc: "Page 2, Signatory block" },
    impact: "Witness credibility can be challenged — possible perjury",
    precedent: "Indian Evidence Act §145 — Cross-examination as to previous statements",
  },
];

const severityStyles: Record<string, { badge: string; border: string; dot: string }> = {
  Critical: { badge: "bg-red-500/10 text-red-400 border-red-500/20", border: "border-red-500/30", dot: "bg-red-400" },
  High: { badge: "bg-orange-500/10 text-orange-400 border-orange-500/20", border: "border-orange-500/30", dot: "bg-orange-400" },
  Medium: { badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", border: "border-yellow-500/30", dot: "bg-yellow-400" },
};

const ConflictsPage = () => {
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold mb-1">Conflicts & Inconsistencies</h2>
        <p className="text-sm text-muted-foreground">Detected by the Recursive Auditor Loop cross-referencing Neo4j graph against vector index</p>
      </div>

      <div className="flex gap-3 mb-6">
        {Object.entries(severityStyles).map(([sev, style]) => (
          <div key={sev} className="flex items-center gap-1.5 text-xs">
            <div className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
            <span className="text-muted-foreground">{sev}</span>
          </div>
        ))}
        <span className="text-xs text-muted-foreground ml-auto">{conflicts.length} total</span>
      </div>

      <div className="space-y-4">
        {conflicts.map((conflict, i) => {
          const style = severityStyles[conflict.severity];
          return (
            <motion.div
              key={conflict.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl border bg-card p-5 ${style.border}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border ${style.badge}`}>
                  {conflict.severity}
                </span>
                <h4 className="text-sm font-semibold flex-1">{conflict.title}</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{conflict.detail}</p>

              {/* Sources */}
              <div className="flex items-center gap-2 text-[11px] mb-3">
                <span className="px-2 py-1 rounded bg-secondary text-muted-foreground">
                  {conflict.source1.doc} — {conflict.source1.loc}
                </span>
                <ArrowRightLeft className="w-3 h-3 text-red-400 flex-shrink-0" />
                <span className="px-2 py-1 rounded bg-secondary text-muted-foreground">
                  {conflict.source2.doc} — {conflict.source2.loc}
                </span>
              </div>

              {/* Impact & Precedent */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-secondary/30 border border-border/30">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Impact</p>
                  <p className="text-xs text-foreground/80">{conflict.impact}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Relevant Precedent</p>
                  <p className="text-xs text-primary">{conflict.precedent}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ConflictsPage;