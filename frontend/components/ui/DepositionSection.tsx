import { motion } from "framer-motion";
import { MessageSquareQuote, ChevronRight, Lightbulb } from "lucide-react";

const questions = [
  {
    category: "Timeline Inconsistency",
    question: "Mr. Sharma, your email dated March 8th references 'the signed agreement.' Can you explain how you discussed a signed agreement four days before the contract's stated execution date of March 12th?",
    basis: "Conflict #1 — Contract date vs. email timestamp",
    sources: ["Contract_NDA_2024.pdf §2.1", "Email #14, 08-Mar-2023"],
    strategy: "Establish knowledge of pre-dating",
  },
  {
    category: "Undisclosed Entity",
    question: "Can you describe the nature of your relationship with Apex Holdings Pvt. Ltd., and explain why this entity received three financial transfers yet was not listed in the contract's party schedule?",
    basis: "Conflict #2 — Undisclosed party involvement",
    sources: ["Financial_Statement_Q3.xlsx Row 142", "Contract Schedule A"],
    strategy: "Reveal hidden corporate relationships",
  },
  {
    category: "Witness Credibility",
    question: "Ms. Mehta, on page 47 of your deposition transcript you stated you had 'no knowledge of any amendment.' How do you reconcile this with your signature appearing on the June 15th amendment document?",
    basis: "Conflict #3 — Conflicting witness statement",
    sources: ["Transcript Page 47", "Amendment_June2023.pdf Page 2"],
    strategy: "Impeach witness credibility",
  },
];

const DepositionSection = () => {
  return (
    <section className="py-24 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Mock UI — left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="order-2 lg:order-1"
          >
            <div className="space-y-4">
              {questions.map((q, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-border bg-card p-5 shadow-lg"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border border-blue-400/20 bg-blue-400/10 text-blue-400">
                      {q.category}
                    </span>
                  </div>
                  <p className="font-body text-sm leading-relaxed mb-4 text-foreground/90">
                    "{q.question}"
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-3 h-3 text-primary flex-shrink-0" />
                    <span className="font-body text-[11px] text-primary font-medium">{q.strategy}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-body text-muted-foreground">
                    <span>Based on:</span>
                    {q.sources.map((s, j) => (
                      <span key={j} className="px-1.5 py-0.5 rounded bg-secondary">{s}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Text — right */}
          <motion.div
            className="order-1 lg:order-2 lg:sticky lg:top-32"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 mb-5">
              <MessageSquareQuote className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-body text-xs font-semibold uppercase tracking-widest text-blue-400">Step 4</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-700 mb-5">
              Suggested <span className="text-blue-400">Deposition</span> Questions
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              The AI doesn't just find problems — it crafts <strong className="text-foreground">strategic deposition questions</strong> designed 
              to expose each inconsistency. Every question includes the legal strategy behind it 
              and links directly to its source evidence.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Questions are generated using <strong className="text-foreground">LangGraph's state machine</strong>, 
              which maintains long-term memory across the entire document set — remembering a detail 
              from page 10 to debunk a statement on page 900.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DepositionSection;