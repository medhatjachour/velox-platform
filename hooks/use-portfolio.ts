import { useState, useEffect } from "react";

interface Portfolio {
  id?: string;
  title: string;
  bio: string | null;
  headline: string | null;
  theme: any;
  slug: string;
  isPublished: boolean;
  projects: Project[];
}

interface Project {
  id: string | number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string | null;
  url: string | null;
  featured: boolean;
  order?: number;
}

export function usePortfolio() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user's portfolios
  const fetchPortfolios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/portfolio");
      if (!response.ok) throw new Error("Failed to fetch portfolios");
      const data = await response.json();
      setPortfolios(data.portfolios);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Create portfolio
  const createPortfolio = async (data: Partial<Portfolio>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create portfolio");
      }
      const result = await response.json();
      setPortfolios([...portfolios, result.portfolio]);
      return result.portfolio;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update portfolio
  const updatePortfolio = async (id: string, data: Partial<Portfolio>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update portfolio");
      const result = await response.json();
      setPortfolios(
        portfolios.map((p) => (p.id === id ? result.portfolio : p))
      );
      return result.portfolio;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete portfolio
  const deletePortfolio = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete portfolio");
      setPortfolios(portfolios.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Publish/unpublish portfolio
  const togglePublish = async (id: string, isPublished: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/portfolio/${id}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished }),
      });
      if (!response.ok) throw new Error("Failed to update publish status");
      const result = await response.json();
      setPortfolios(
        portfolios.map((p) => (p.id === id ? result.portfolio : p))
      );
      return result.portfolio;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add project
  const addProject = async (portfolioId: string, project: Partial<Project>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/portfolio/${portfolioId}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      if (!response.ok) throw new Error("Failed to add project");
      const result = await response.json();
      return result.project;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update project
  const updateProject = async (projectId: string, data: Partial<Project>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/portfolio/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update project");
      const result = await response.json();
      return result.project;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const deleteProject = async (projectId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/portfolio/projects/${projectId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete project");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    portfolios,
    loading,
    error,
    fetchPortfolios,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    togglePublish,
    addProject,
    updateProject,
    deleteProject,
  };
}
