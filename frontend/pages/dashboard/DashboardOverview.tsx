import { Upload, Users, AlertTriangle, MessageSquareQuote, LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const cards = [
  { title: "Upload Evidence", desc: "Upload contracts, emails, transcripts", icon: Upload, href: "/dashboard/upload", count: "4 files", color: "text-primary" },
  { title: "Detected Parties", desc: "Entities, dates & relationships", icon: Users, href: "/dashboard/parties", count: "7 entities", color: "text-emerald-400" },
  { title: "Conflicts Found", desc: "Inconsistencies & contradictions", icon: AlertTriangle, href: "/dashboard/conflicts", count: "3 conflicts", color: "text-red-400" },
  { title: "Deposition Questions", desc: "AI-generated strategic questions", icon: MessageSquareQuote, href: "/dashboard/deposition", count: "3 questions", color: "text-blue-400" },
  { title: "Source Evidence", desc: "Cryptographic audit trail", icon: LinkIcon, href: "/dashboard/evidence", count: "8 links", color: "text-violet-400" },
];

const DashboardOverview = () => {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold mb-2">Case: NDA Dispute — Sharma vs. Mehta Corp.</h2>
        <p className="text-muted-foreground text-sm">AI-powered analysis across 4 uploaded documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={card.href}
              className="block rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5 group"
            >
              <div className="flex items-center justify-between mb-3">
                <card.icon className={`w-5 h-5 ${card.color}`} />
                <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">{card.count}</span>
              </div>
              <h3 className="font-body text-sm font-semibold mb-1 group-hover:text-primary transition-colors">{card.title}</h3>
              <p className="text-xs text-muted-foreground">{card.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 rounded-xl border border-border bg-card p-5"
      >
        <h3 className="font-body text-sm font-semibold mb-3">Analysis Timeline</h3>
        <div className="space-y-3">
          {[
            { time: "2 min ago", event: "3 conflicts detected across documents", severity: "critical" },
            { time: "3 min ago", event: "7 entities extracted via GliNER", severity: "info" },
            { time: "5 min ago", event: "4 documents parsed successfully", severity: "success" },
            { time: "5 min ago", event: "Case analysis initiated", severity: "info" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-xs">
              <span className="text-muted-foreground w-16 flex-shrink-0">{item.time}</span>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                item.severity === "critical" ? "bg-red-400" : item.severity === "success" ? "bg-emerald-400" : "bg-primary"
              }`} />
              <span className="text-foreground/80">{item.event}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;
