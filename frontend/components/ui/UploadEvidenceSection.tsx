import { motion } from "framer-motion";
import { Upload, FileText, FileSpreadsheet, Mail, CheckCircle2 } from "lucide-react";

const mockFiles = [
  { name: "Contract_NDA_2024.pdf", size: "2.4 MB", icon: FileText, status: "Parsed" },
  { name: "Email_Thread_May.eml", size: "840 KB", icon: Mail, status: "Parsed" },
  { name: "Financial_Statement_Q3.xlsx", size: "1.1 MB", icon: FileSpreadsheet, status: "Parsing..." },
  { name: "Witness_Transcript_Sharma.pdf", size: "5.7 MB", icon: FileText, status: "Queued" },
];

const UploadEvidenceSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 mb-5">
              <Upload className="w-3.5 h-3.5 text-primary" />
              <span className="font-body text-xs font-semibold uppercase tracking-widest text-primary">Step 1</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-700 mb-5">
              Upload <span className="text-primary">Evidence</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Drag and drop contracts, emails, financial statements, court transcripts — in any format. 
              Our advanced OCR pipeline powered by <strong className="text-foreground">IBM Docling</strong> and{" "}
              <strong className="text-foreground">Unstructured.io</strong> handles scanned documents, 
              complex tables, and multi-column layouts that standard parsers miss.
            </p>
            <ul className="space-y-3 font-body text-sm text-muted-foreground">
              {["PDF, DOCX, XLSX, EML, images", "Scanned document OCR", "Table structure preservation", "Batch upload thousands of files"].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Mock UI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-primary/5">
              {/* Drop zone */}
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center mb-6 hover:border-primary/40 transition-colors">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="font-body text-sm text-muted-foreground">
                  Drop files here or <span className="text-primary font-semibold cursor-pointer">browse</span>
                </p>
                <p className="font-body text-xs text-muted-foreground/60 mt-1">Supports PDF, DOCX, XLSX, EML, JPG, PNG</p>
              </div>

              {/* File list */}
              <div className="space-y-3">
                {mockFiles.map((file, i) => (
                  <motion.div
                    key={file.name}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <file.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm truncate">{file.name}</p>
                      <p className="font-body text-xs text-muted-foreground">{file.size}</p>
                    </div>
                    <span className={`font-body text-xs font-medium px-2 py-0.5 rounded-full ${
                      file.status === "Parsed" 
                        ? "bg-emerald-500/10 text-emerald-400" 
                        : file.status === "Parsing..." 
                        ? "bg-primary/10 text-primary" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {file.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UploadEvidenceSection;
