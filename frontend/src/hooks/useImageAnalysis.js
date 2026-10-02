import { useState } from "react";
import { predictImage } from "../services/api";

export function useImageAnalysis() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const analyzeImage = async (file) => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await predictImage(file);
      setResult(response);
    } catch (error) {
      console.error("Image analysis error:", error);

      setError(
        error.message ||
          "Unable to analyze the image. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setError("");
  };

  return {
    loading,
    result,
    error,
    analyzeImage,
    resetAnalysis,
  };
}
