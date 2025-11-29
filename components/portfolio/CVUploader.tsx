"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CVUploaderProps {
  onParsed: (data: any) => void;
  onClose?: () => void;
}

export default function CVUploader({ onParsed, onClose }: CVUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError("");
    setFile(selectedFile);

    // Extract text from file
    try {
      const text = await extractTextFromFile(selectedFile);
      setExtractedText(text);
    } catch (err: any) {
      setError(err.message || "Failed to read file");
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    // For PDF files, send directly to backend
    if (file.type === "application/pdf") {
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/ai/parse-pdf', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to parse PDF');
        }
        
        const data = await response.json();
        return data.text || '';
      } catch (error) {
        console.error('PDF parsing error:', error);
        throw new Error("Could not parse PDF. Please copy the text from your PDF and paste it in the text area below.");
      }
    }

    // For text files, read directly
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content || '');
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  };

  const handleParse = async () => {
    if (!extractedText) {
      setError("No text to parse");
      return;
    }

    setParsing(true);
    setError("");

    try {
      const response = await fetch("/api/ai/parse-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText: extractedText }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to parse CV");
      }

      const data = await response.json();
      setSuccess(true);
      
      // Wait a moment to show success animation
      setTimeout(() => {
        onParsed(data);
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Failed to parse CV");
    } finally {
      setParsing(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setExtractedText(e.target.value);
    setError("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] overflow-auto"
      >
        <Card className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Upload Your CV/Resume</h2>
              <p className="text-sm text-muted-foreground mt-1">
                AI will extract all information and generate your portfolio
              </p>
            </div>
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Success State */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">CV Parsed Successfully!</h3>
                <p className="text-muted-foreground">Generating your portfolio...</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!success && (
            <>
              {/* File Upload */}
              <div className="mb-6">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.doc,.docx,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">
                    {file ? file.name : "Click to upload CV"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supported formats: TXT, DOC, DOCX, PDF
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-sm text-muted-foreground">OR</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Text Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Paste Your CV/Resume Text
                </label>
                <textarea
                  value={extractedText}
                  onChange={handleTextChange}
                  placeholder="Paste your resume content here..."
                  className="w-full h-64 px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Tip: Include all sections - experience, education, skills, projects, etc.
                </p>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-500">Error</p>
                      <p className="text-sm text-red-500/80">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {extractedText.length} characters
                </p>
                <div className="flex gap-3">
                  {onClose && (
                    <Button variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                  )}
                  <Button
                    onClick={handleParse}
                    disabled={!extractedText || parsing}
                    className="gap-2 bg-linear-to-r from-[#06B6D4] to-[#3B82F6]"
                  >
                    {parsing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Parsing CV...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4" />
                        Generate Portfolio
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
}
