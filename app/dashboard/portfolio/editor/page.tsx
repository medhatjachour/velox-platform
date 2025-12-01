"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdvancedPortfolioEditor from "@/components/portfolio/AdvancedPortfolioEditor";
import { PortfolioConfig } from "@/types/portfolio-editor.types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function AdvancedEditorPage() {
  const router = useRouter();
  const [config, setConfig] = useState<Partial<PortfolioConfig>>();
  const [loading, setLoading] = useState(false);

  const handleSave = async (portfolioConfig: PortfolioConfig) => {
    setLoading(true);
    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: portfolioConfig,
          template: portfolioConfig.design.template,
          published: portfolioConfig.published,
        }),
      });

      if (response.ok) {
        alert("Portfolio saved successfully!");
      } else {
        alert("Failed to save portfolio");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving portfolio");
    } finally {
      setLoading(false);
    }
  };

  const handleAIGenerate = async () => {
    // This could open a modal to collect CV/GitHub data
    // For now, just a placeholder
    alert("AI generation modal would open here");
  };

  return (
    <div className="min-h-screen">
      <AdvancedPortfolioEditor
        initialConfig={config}
        onSave={handleSave}
      />
    </div>
  );
}
