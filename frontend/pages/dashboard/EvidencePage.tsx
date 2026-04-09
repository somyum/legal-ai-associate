import { motion } from "framer-motion";
import { LinkIcon, FileText, Hash, ShieldCheck } from "lucide-react";

const evidenceLinks = [
  {
    finding: "Contract pre-dating discovered",
    severity: "Critical",
    links: [
      { doc: "Contract_NDA_2024.pdf", location: "Page 3, Section 2.1, Line 14", hash: "sha256:a3f8...c91d" },
      { doc: "Email_Thread_May.eml", location: "Email #14, Timestamp: 08-Mar-2023 14:22 IST", hash: "sha256:7b2e...f403" },
    ],
  },
  {
    finding: "Undisclosed shell corporation",
    severity: "High",
    links: [
      { doc: "Financial_Statement_Q3.xlsx", location: "Sheet 'Transfers', Row 142, Col D-F", hash: "sha256:d1c4...88a7" },
      { doc: "Contract_NDA_2024.pdf", location: "Schedule A — Party Listing (absence)", hash: "sha256:a3f8...c91d" },
      { doc: "Indian Kanoon", location: "Apex Holdings — 2 prior fraud cases found", hash: "api:ik-2024-0891" },
    ],
  },
  {
    finding: "Witness statement contradiction",
    severity: "Medium",
    links: [
      { doc: "Witness_Transcript_Sharma.pdf", location: "Page 47, Lines 8-12", hash: "sha256:e5a1...2f7b" },
      { doc: "Amendment_June2023.pdf", location: "Page 2, Signatory block", hash: "sha256:9c3f...b12e" },
    ],
  },
];

const EvidencePage = () => {
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold mb-1">Source Evidence Links</h2>
        <p className="text-sm text-muted-foreground">Cryptographic audit trail — every finding hard-linked to its source</p>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border mb-6">
        <ShieldCheck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold mb-1">Evidentiary Integrity Verified</p>
          <p className="text-xs text-muted-foreground">All {evidenceLinks.reduce((a, e) => a + e.links.length, 0)} evidence links verified with document hash matching. Zero unsupported claims.</p>
        </div>
      </div>

      <div className="space-y-4">
        {evidenceLinks.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded-full bg-violet-400/10 flex items-center justify-center flex-shrink-0">
                <LinkIcon className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <h4 className="text-sm font-semibold flex-1">{item.finding}</h4>
              <span className="text-[10px] text-muted-foreground">{item.links.length} sources</span>
            </div>

            <div className="space-y-2">
              {item.links.map((link, j) => (
                <div key={j} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border/30">
                  <FileText className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">{link.doc}</p>
                    <p className="text-[11px] text-muted-foreground">{link.location}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Hash className="w-3 h-3 text-muted-foreground/50" />
                    <span className="text-[10px] text-muted-foreground/50 font-mono">{link.hash}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EvidencePage;