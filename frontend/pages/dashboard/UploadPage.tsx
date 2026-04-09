import { useState } from "react";
import { Upload, FileText, FileSpreadsheet, Mail, CheckCircle2, Trash2, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/ui/button";

const initialFiles = [
  { id: 1, name: "Contract_NDA_2024.pdf", size: "2.4 MB", icon: FileText, status: "Parsed", pages: 48 },
  { id: 2, name: "Email_Thread_May.eml", size: "840 KB", icon: Mail, status: "Parsed", pages: 12 },
  { id: 3, name: "Financial_Statement_Q3.xlsx", size: "1.1 MB", icon: FileSpreadsheet, status: "Parsed", pages: 6 },
  { id: 4, name: "Witness_Transcript_Sharma.pdf", size: "5.7 MB", icon: FileText, status: "Parsed", pages: 124 },
];

const UploadPage = () => {
  const [files, setFiles] = useState(initialFiles);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold mb-1">Upload Evidence</h2>
        <p className="text-sm text-muted-foreground">Upload contracts, emails, financial statements and transcripts for AI analysis</p>
      </div>

      {/* Drop zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-10 text-center mb-6 transition-colors cursor-pointer ${
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
      >
        <Upload className={`w-10 h-10 mx-auto mb-3 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
        <p className="text-sm text-muted-foreground mb-1">
          Drag and drop files here, or <span className="text-primary font-semibold cursor-pointer">browse</span>
        </p>
        <p className="text-xs text-muted-foreground/60">Supports PDF, DOCX, XLSX, EML, JPG, PNG — up to 50MB per file</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Files", value: files.length },
          { label: "Total Pages", value: files.reduce((a, f) => a + f.pages, 0) },
          { label: "Status", value: "All Parsed" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-card border border-border p-3 text-center">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="font-body text-lg font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* File list */}
      <div className="space-y-2">
        <AnimatePresence>
          {files.map((file) => (
            <motion.div
              key={file.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <file.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.size} · {file.pages} pages</p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                {file.status}
              </span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => setFiles(files.filter((f) => f.id !== file.id))}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex gap-3">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Upload className="w-4 h-4 mr-2" /> Run Analysis
        </Button>
      </div>
    </div>
  );
};

export default UploadPage;