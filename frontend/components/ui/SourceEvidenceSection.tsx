import { motion } from "framer-motion";
import { LinkIcon, FileText, Hash, ExternalLink, ShieldCheck } from "lucide-react";

const evidenceLinks = [
  {
    finding: "Contract pre-dating discovered",
    links: [
      { doc: "Contract_NDA_2024.pdf", location: "Page 3, Section 2.1, Line 14", hash: "sha256:a3f8...c91d" },
      { doc: "Email_Thread_May.eml", location: "Email #14, Timestamp: 08-Mar-2023 14:22 IST", hash: "sha256:7b2e...f403" },
    ],
  },
  {
    finding: "Undisclosed shell corporation",
    links: [
      { doc: "Financial_Statement_Q3.xlsx", location: "Sheet 'Transfers', Row 142, Col D-F", hash: "sha256:d1c4...88a7" },
      { doc: "Contract_NDA_2024.pdf", location: "Schedule A — Party Listing (absence)", hash: "sha256:a3f8...c91d" },
      { doc: "Indian Kanoon", location: "Apex Holdings — 2 prior fraud cases found", hash: "api:ik-2024-0891" },
    ],
  },
  {
    finding: "Witness statement contradiction",
    links: [
      { doc: "Witness_Transcript_Sharma.pdf", location: "Page 47, Lines 8-12", hash: "sha256:e5a1...2f7b" },
      { doc: "Amendment_June2023.pdf", location: "Page 2, Signatory block", hash: "sha256:9c3f...b12e" },
    ],
  },
];

const SourceEvidenceSection = () => {
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
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 mb-5">
              <LinkIcon className="w-3.5 h-3.5 text-violet-400" />
              <span className="font-body text-xs font-semibold uppercase tracking-widest text-violet-400">Step 5</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-700 mb-5">
              Source <span className="text-violet-400">Evidence</span> Links
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Every single finding, every question, every inconsistency is{" "}
              <strong className="text-foreground">hard-linked to its source evidence</strong> via a 
              cryptographic-style audit trail. No hallucinations. No unsupported claims.
            </p>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 border border-border">
              <ShieldCheck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-body text-sm font-semibold mb-1">Absolute Evidentiary Integrity</p>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  Each evidence link includes document hash verification, exact page/line references, 
                  and timestamps — ensuring courtroom-grade traceability.
                </p>
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
              {evidenceLinks.map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-border bg-card p-5 shadow-lg"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                >
                  <h4 className="font-body text-sm font-semibold mb-3 flex items-center gap-2">
                    <AlertIcon />
                    {item.finding}
                  </h4>
                  <div className="space-y-2">
                    {item.links.map((link, j) => (
                      <div key={j} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-secondary/30 border border-border/30">
                        <FileText className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-xs font-medium">{link.doc}</p>
                          <p className="font-body text-[11px] text-muted-foreground">{link.location}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Hash className="w-3 h-3 text-muted-foreground/50" />
                          <span className="font-body text-[10px] text-muted-foreground/50 font-mono">{link.hash}</span>
                        </div>
                      </div>
                    ))}
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

const AlertIcon = () => (
  <div className="w-5 h-5 rounded-full bg-violet-400/10 flex items-center justify-center flex-shrink-0">
    <LinkIcon className="w-3 h-3 text-violet-400" />
  </div>
);

export default SourceEvidenceSection;
