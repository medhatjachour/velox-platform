import { useState } from "react";

interface GenerateBioInput {
  name: string;
  title: string;
  skills: string[];
  experience?: string;
}

interface GenerateHeadlineInput {
  name: string;
  title: string;
  keywords?: string[];
}

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateBio = async (input: GenerateBioInput): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/ai/generate-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate bio");
      }

      const data = await response.json();
      return data.bio;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateHeadline = async (input: GenerateHeadlineInput): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/ai/generate-headline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate headline");
      }

      const data = await response.json();
      return data.headline;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generateBio,
    generateHeadline,
  };
}
